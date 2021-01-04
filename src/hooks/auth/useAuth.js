import React, { useEffect, useReducer, createContext, useContext, useCallback, useRef } from 'react'
import { useGoogleLogout } from 'react-google-login'
import axios from 'axios'

const apiRoot = process.env.REACT_APP_API
const error = 'Sorry! Something went wrong'
const context = createContext()
const googleClientId = process.env.REACT_APP_GOOGLE_AUTH

export function AuthContext({children}) {
  const [state, setState] = useReducer((_, action) => action, {
    isLoading: true,
  })
  const initPromise = useRef(false)
  const googleSignOut = useGoogleLogout({ clientId: googleClientId })


  const init = useCallback(() => {
    if(localStorage.Auth) {
      var authJSON = JSON.parse(localStorage.Auth)
      if (authJSON) {
        var id = JSON.parse(localStorage.Auth)._id
        if(initPromise.current) return initPromise.current
        initPromise.current = axios.get(`${apiRoot}/user/${id}`).then((res)=>{
          return setState({user: res.data})
        })
        .catch(_error => {
          setState({user: false, isError: true})
        })
        return initPromise.current
      }
    }
    return setState({ user: false, isLoading: false})

  }, [])


  const signIn = (provider, res) => {
    setState({ isLoading: true })
    let postData
    switch(provider) {
      case 'google':
        if(!res || !res.profileObj) return Promise.reject(error)
        postData = {
            name: res.profileObj.name,
            provider: 'google',
            email: res.profileObj.email,
            provider_id: res.profileObj.googleId,
            token: res.access_token,
            provider_pic: res.profileObj.imageUrl
        }
        break;
      case 'facebook':
        postData = {
          name: res.name,
          provider: 'facebook',
          email: res.email,
          provider_id: res.userID,
          token: res.accessToken,
          provider_pic: res.picture  && res.picture.data ? res.picture.data.url : undefined
        }
        break;
      default:
        setState({ isError: true })
        return Promise.reject(error)
    }

    if(!postData) return Promise.reject(error)
    return axios.post(`${apiRoot}/user`,postData).then((res)=>{
      let user = res.data
      localStorage.setItem('Auth', JSON.stringify(user))
      setState({ user })
    }).catch(() => {
      setState({ isError: true })
      return Promise.reject()
    })

  }

  const signOut = () => {
    localStorage.setItem('Auth', null)
    googleSignOut.signOut()
    setState({ user: false })
  }

  return <context.Provider value={{state, init, signIn, signOut}}>{children}</context.Provider>
}

export default function useAuth() {
  const { state, init, signIn, signOut } = useContext(context)

  useEffect(() => {
    init()
  }, [init])

  return {
    ...state,
    signIn,
    signOut,
    googleClientId
  }
}
