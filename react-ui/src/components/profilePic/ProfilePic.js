// eslint-disable-next-line no-unused-vars
import React from 'react';
import styles from './ProfilePic.module.css'

const ProfilePic = ({ user, size = "sm" }) => {

  return (
    <div className={styles.profilePic} data-size={size}>
      { user.provider_pic ? <img src={user.provider_pic} alt="profile"/> : <div className={styles.authorCircle}>{user.name.charAt(0)}</div> }
    </div>
  );
}

export default ProfilePic
