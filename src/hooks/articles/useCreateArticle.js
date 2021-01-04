// eslint-disable-next-line no-unused-vars
import React, { useReducer } from 'react'
import axios from 'axios'

const apiRoot = process.env.REACT_APP_API

export default function useCreateArticle() {
  const [state, setState] = useReducer((_, action) => action, {
    isLoading: false,
    isError: false,
    errorMessage: '',
    isSuccess: false
  })

  //inputs should contain text, title, and image (optional)
  const publish = async (articleInfo, authorId) => {
    setState({ isLoading: true })
    const formData = new FormData()
    formData.append('text', articleInfo.text)
    formData.append('image', articleInfo.image)
    formData.append('title', articleInfo.title)
    formData.append('author_id', authorId)
    try {
      const data = await axios.post(`${apiRoot}/article`, formData)
      setState({ isSuccess: true, data })
      return data
    } catch (error) {
      let errorMessage = error.response && error.response.data
      if(errorMessage && errorMessage.indexOf("Internal Server Error") > -1) errorMessage = "";
      setState({ isError: true, errorMessage })
      return false
    }

  }

  return {
    ...state,
    publish,
  }
}
