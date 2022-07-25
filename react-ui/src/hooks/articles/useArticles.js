import React, { useEffect, useReducer, createContext, useContext, useRef, useCallback } from 'react'
import axios from 'axios'

const apiRoot = process.env.REACT_APP_API
const context = createContext()

export function ArticlesContext({children}) {
  const [state, setState] = useReducer((_, action) => action, {
    isLoading: true,
  })

  const activePromise = useRef(false)

  const fetch = useCallback(async () => {
    if(!activePromise.current) {
      activePromise.current = (async () => {
        setState({ isLoading: true })
        Promise.all([
          axios.get(`${apiRoot}/articles`).then(res => res.data),
          axios.get(`${apiRoot}/articles?sort=claps&sortCriteria=desc&limit=15`).then(res => res.data)])
        .then(([data, top]) => {
          setState({ isSuccess: true, data, top })
        })
        .catch(error => {
          setState({ isError: true, error })
        }).finally(() => {
          activePromise.current = false
        })
      })()
    }

    return activePromise.current
  }, [])

  return <context.Provider value={{state, fetch}}>{children}</context.Provider>
}

export default function useArticles() {
  const { state, fetch } = useContext(context)


  useEffect(() => {
    fetch()
  }, [fetch])


  return {
    ...state,
    fetch
  }
}
