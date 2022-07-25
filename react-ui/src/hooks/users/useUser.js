// eslint-disable-next-line no-unused-vars
import React, { useCallback, useEffect, useReducer } from 'react'
import axios from 'axios'

const apiRoot = process.env.REACT_APP_API


export const fetchUser = (id) =>
axios.get(`${apiRoot}/user/profile/${id}`).then(res => res.data)

export default function useUser(id) {
  const [state, setState] = useReducer((_, action) => action, {
    isLoading: true,
  })


  const fetch = useCallback(async () => {
    setState({ isLoading: true })
    try {
      const data = await fetchUser(id)
      setState({ isSuccess: true, data })
    } catch (error) {
      setState({ isError: true, error })
    }
  }, [id])

  useEffect(() => {
    fetch()
  }, [fetch])

  return {
    ...state,
    fetch,
  }
}
