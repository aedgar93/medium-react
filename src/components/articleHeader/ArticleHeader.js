// eslint-disable-next-line no-unused-vars
import React from 'react';
import moment from 'moment'
import { Link } from 'react-router-dom'
import styles from './ArticleHeader.module.css'
import ProfilePic from 'components/profilePic'

const ArticleHeader = ({ author, createdAt }) => {

  return (
    <div className={styles.author}>
      <ProfilePic user={author} />
      <div className={styles.authorInfo}>
        <Link to={`/profile/${author._id}`} className={styles.authorName}>{author.name}</Link>
        <div className={styles.publishDate}>{createdAt ? `Published • ${moment(createdAt).fromNow()}` : author.email}</div>
      </div>
    </div>
  );
}

export default ArticleHeader
