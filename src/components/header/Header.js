// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import logo from 'assets/logo.svg';
import { Link } from 'react-router-dom'
import useAuth from 'hooks/auth/useAuth'
import GoogleLogin from 'react-google-login'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import Button from 'components/button'
import styles from './Header.module.css'


const Header = () => {
  const auth = useAuth()
  const [popupVisible, setPopupVisible] = useState(false)

  const handleSignIn = (res) => {
    auth.signIn('google', res)
    .then(() => setPopupVisible(false))
    .catch((error) => alert(error))
  }

  const renderPopup = () => {
    return (
      <div className={`${styles.popup} ${popupVisible ? styles.popupVisible : ""}`}>

        <div className={styles.popupTitle}>Sign In / Sign Up</div>
        <GoogleLogin
            clientId={auth.googleClientId}
            onSuccess={handleSignIn}
            render={props => (
              <Button {...props} className={styles.googleButton}><FontAwesomeIcon icon={faGoogle}/><span> Sign In with Google</span></Button>
            )}>

        </GoogleLogin>
        <FontAwesomeIcon icon={faTimes} className={styles.popupClose} color="dimgray" onClick={() => setPopupVisible(false)}/>
      </div>
    )
  }

  const renderAuthOptions = () => {
    if(auth.isLoading) return <span>...</span>
    else if(auth.user) {
      return (
        <div className={styles.buttonWrapper}>
          <Link to="/editor"><Button variant={"primary"} className={styles.headerButton}>Write a Story</Button></Link>
          <Button onClick={auth.signOut} variant={"warning"} className={styles.headerButton}>Sign Out</Button>
        </div>
      )
    }
    else return <Button variant="primary" onClick={() => setPopupVisible(true)} className={styles.headerButton}>Sign In / Sign Up</Button>
  }

  return (
    <>
      <header className={styles.outer}>

        <div className={styles.wrapper}>
          <Link to="/"><img src={logo} alt="logo" className={styles.logo}/></Link>

          { renderAuthOptions() }
        </div>
      </header>
      { renderPopup() }
    </>
  );
}

export default Header
