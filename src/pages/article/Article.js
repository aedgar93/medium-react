// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useParams } from 'react-router-dom'
import useArticle from 'hooks/articles/useArticle'
import styles from './Article.module.css'
import ArticleHeader from 'components/articleHeader'
import ArticleReactions from 'components/articleReactions'
import Comment from 'components/comment'
import Button from 'components/button'
import useAuth from 'hooks/auth/useAuth'


const Article = () => {
  const { id } = useParams()
  const articleQuery = useArticle(id)
  const auth = useAuth()
  const [comment, setComment] = useState("")

  const handleCommentUpdate = (event) => {
    setComment(event.target.value)
  }

  const handleSubmitComment = () => {
    if(!comment || !auth.user) return //TODO: set error
    articleQuery.comment(comment, auth.user._id)
    .catch(error => {
      //TODO: set error
    })
    .then((() => setComment("")))
  }

  const renderArticle = (article) => {
    return (
      <div className={styles.article}>
        { article.feature_img ? <div className={styles.imgContainer}><img src={article.feature_img} alt="article" className={styles.img}/></div> : "" }
        <h1 className={styles.title}>{article.title}</h1>
        <p className={styles.content} dangerouslySetInnerHTML={{__html: article.text}}></p>
        <ArticleReactions article={article} onClick={articleQuery.clap} />
        {
          auth.user ?
          <div className={styles.comment}>
            <textarea value={comment} onChange={handleCommentUpdate} placeholder="Write a comment..."/>
            <Button onClick={handleSubmitComment} className={styles.commentButton}>Comment</Button>
            <div className={styles.clearFix}></div>
          </div>
          : null
        }
        {
          article.comments.map(comment => {
            return <Comment comment={comment} key={comment._id}/>
          })
        }
      </div>
    )
  }

  const render = () => {
    if(articleQuery.isLoading) return <div>Loading...</div>
    else if(articleQuery.isError) return <div>Oh no! Something went wrong</div>
    else if(articleQuery.data) return (
      <>

        { <ArticleHeader author={articleQuery.data.author} createdAt={articleQuery.data.createdAt} /> }
        { renderArticle(articleQuery.data) }
      </>
    )
    else return <div>Nothing to see here</div>
  }

  return (
    <div className={styles.wrapper}>
      {render()}
    </div>
  );
}

export default Article
