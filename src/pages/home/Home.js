// eslint-disable-next-line no-unused-vars
import React from 'react';
import styles from './Home.module.css'
import useArticles from 'hooks/articles/useArticles'
import { Link, useLocation, useHistory } from 'react-router-dom'
import ArticlePreview from 'components/articlePreview'


const Home = () => {

  const articlesQuery = useArticles()
  const location = useLocation()
  const history = useHistory()

  if(location.state && location.state.reload) {
    articlesQuery.fetch()
    history.replace('/', {})
  }

  const renderTopArticle = (article) => {
    return (
      <li key={`top_${article._id}`} className={styles.topArticle}>
        <span className={styles.topInfo}>
          <Link to={`/articles/${article._id}`} className={styles.topTitle}>{article.title}</Link>
          <br/>
          <span className={styles.topAuthor}>{article.author.name}</span>
        </span>
      </li>
    )
  }

  const render = () => {
    if(articlesQuery.isLoading) return <div className={styles.wrapper}>Loading...</div>
    else if(articlesQuery.isError) return <div className={styles.wrapper}>Oh no! Something went wrong</div>
    else if(articlesQuery.data && articlesQuery.data.length > 0) {
      return (
        <div className={styles.wrapper}>
          <div className={styles.activityWrapper}>
            <div className={styles.activity}>
              <h4>Top Stories</h4>
              <ol>
                {articlesQuery.top.map(renderTopArticle)}
              </ol>
            </div>
          </div>
          <div className={styles.articles}>
            <h2>New Stories</h2>
            { articlesQuery.data.map((item) => <ArticlePreview article={item} key={item._id}/>) }
          </div>
        </div>
      )
    }
    else return <div>Nothing to see here</div>
  }

  return (
    <div>
      {
        render()
      }
    </div>
  );
}

export default Home
