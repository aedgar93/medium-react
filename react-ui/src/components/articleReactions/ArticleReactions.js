// eslint-disable-next-line no-unused-vars
import React from 'react';
import styles from './ArticleReactions.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons'

const ArticleReactions = ({ onClick, article }) => {

  return (
    <div>
      <div className={styles.reactions}>
        <div className={`${styles.icon} ${onClick ? styles.clickable : ''}`}>
          <FontAwesomeIcon icon={faHeart} onClick={onClick} color="#00ab6b" />
        </div>
        <span>{article.claps}</span>
      </div>
      <div className={styles.reactions}>
        <div className={styles.icon}>
          <FontAwesomeIcon icon={faComment} />
        </div>
        <span>{article.comments.length}</span>
      </div>
    </div>
  );
}

export default ArticleReactions
