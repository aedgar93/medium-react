// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useParams } from 'react-router-dom'
import styles from './Profile.module.css'
import useUser from 'hooks/users/useUser'
import ArticlePreview from 'components/articlePreview'
import ProfilePic from 'components/profilePic'

const Profile = () => {
  const { id } = useParams()
  const userQuery = useUser(id)

  if(userQuery.isLoading) return (<div className={styles.wrapper}>Loading...</div>) //TODO: better loading styles
  if(!userQuery.data) return (<div className={styles.wrapper}>Sorry! We couldn't find this profile</div>)
  return (
    <div className={styles.wrapper}>
      {
        userQuery.data.user &&
        <div className={styles.userInfo}>
          <ProfilePic user={userQuery.data.user} size="lg"/>
          <div>
            <div className={styles.name}>{userQuery.data.user.name}</div>
            <div>Total Stories: { userQuery.data.articles ? userQuery.data.articles.length : 0 }</div>
          </div>
        </div>
      }
      {
        userQuery.data.articles &&
        userQuery.data.articles.map(data => {
          let article = {...data, author: userQuery.data.user}
          return <ArticlePreview article={article} key={article._id} showAuthorInfo={false}/>
        })
      }
    </div>
  );
}

export default Profile
