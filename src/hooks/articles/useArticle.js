// eslint-disable-next-line no-unused-vars
import React, { useCallback, useEffect, useReducer, useRef } from 'react'
import axios from 'axios'

const apiRoot = process.env.REACT_APP_API


export const fetchArticle = (id) =>
axios.get(`${apiRoot}/article/${id}`).then(res => res.data)

export default function useArticle(id) {
  const [state, setState] = useReducer((_, action) => action, {
    isLoading: true,
  })
  const activeClapping = useRef(false)

  const fetch = useCallback(async (silent = false, currentData = null) => {
    if(!silent) setState({ isLoading: true })
    try {
      const data = await fetchArticle(id)
      if(data.comments) data.comments = data.comments.reverse()
      setState({ isSuccess: true, data })
    } catch (error) {
      setState({ isError: true, error, data: currentData })
    }
  }, [id])

  const clap = () => {
    if(!state.data) return

    let claps = (state.data.claps || 0) + 1
    let newClaps = activeClapping.current && activeClapping.current.count ? activeClapping.current.count : 0
    newClaps++

    let data = {...state.data, claps}
    setState({ data })

    if(activeClapping.current) clearTimeout(activeClapping.current.timeout)
    let resolver = resolveClap
    let timeout = setTimeout(resolver, 5000)

    activeClapping.current = { timeout, count: newClaps, resolver }
  }

  const resolveClap = () => {
    return axios.post(`${apiRoot}/article/clap`, {article_id: id, count: activeClapping.current.count })
    .finally(() => {
      activeClapping.current = false
    })
  }

  const comment = (comment, authorId) => {
    return axios.post(`${apiRoot}/article/comment`, {comment, author_id: authorId, article_id: id})
    .then(() => fetch(true, state.data))
  }


  useEffect(() => {
    fetch()

    return function cleanup() {
      if(activeClapping.current) {
        clearTimeout(activeClapping.current.timeout)
        activeClapping.current.resolver()
      }
      activeClapping.current = false
    }
  }, [fetch])


  return {
    ...state,
    fetch,
    clap,
    comment
  }
}
