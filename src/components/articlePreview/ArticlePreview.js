// eslint-disable-next-line no-unused-vars
import React, { useRef } from 'react';
import styles from './ArticlePreview.module.css'
import { Link } from 'react-router-dom'
import ArticleHeader from 'components/articleHeader'
import ArticleReactions from 'components/articleReactions'
import { useHistory } from 'react-router-dom'


const ArticlePreview = ({ article, showAuthorInfo = true }) => {
  const history = useRef(useHistory())

  const navigateToArticle = () => {
    history.current.push(`/articles/${article._id}`)
  }

  return (
    <div key={article._id} className={styles.articleContainer}>
      { showAuthorInfo && <ArticleHeader author={article.author} createdAt={article.createdAt} /> }
      <div className={styles.article} onClick={navigateToArticle}>
        { article.feature_img && <div className={styles.imgContainer}><img src={article.feature_img} alt="article" className={styles.articleImg}/></div> }
        <h3 className={styles.title}>{article.title}</h3>
        <div dangerouslySetInnerHTML={{__html: article.description}} className={styles.description}></div>
        <Link to={`/articles/${article._id}`} className={styles.readMore}>Read more</Link>
        <ArticleReactions article={article}/>
      </div>
    </div>
  );
}

export default ArticlePreview
