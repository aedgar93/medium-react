// eslint-disable-next-line no-unused-vars
import React from 'react';
import styles from './Comment.module.css'
import ProfilePic from 'components/profilePic'

const Comment = ({ comment }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.author}>
        <ProfilePic user={comment.author} />
      </div>
      <div className={styles.content}>
        <div className={styles.name}>{comment.author.name}</div>
        <div className={styles.text}>{ comment.text }</div>
      </div>
    </div>
  );
}

export default Comment
