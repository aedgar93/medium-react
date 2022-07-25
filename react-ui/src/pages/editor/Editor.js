// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useRef } from 'react';
import styles from './Editor.module.css'
import { Editor as Draft } from 'react-draft-wysiwyg';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import useAuth from 'hooks/auth/useAuth'
import useCreateArticle from 'hooks/articles/useCreateArticle'
import { useHistory } from 'react-router-dom'
import ArticleHeader from 'components/articleHeader'
import Button from 'components/button'
import draftToHtml from 'draftjs-to-html';
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const Editor = () => {
  const [content, setContent] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [title, setTitle] = useState("")
  const [image, setImage] = useState({})
  const imgRef = useRef(null)
  const createArticleQuery = useCreateArticle()

  const auth = useAuth()
  const history = useRef(useHistory())
  const options = ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'emoji']

  useEffect(() => {
    if(auth.isLoading) setIsLoading(true)
    else if(auth.user) setIsLoading(false)
    else history.current.push('/')
  }, [auth.user, auth.isLoading])


  const handlePublish = () => {
    //TODO: client side validation (needs title and content, max length for title)
    const text = draftToHtml(content)
    createArticleQuery.publish({text, image: image.data, title}, auth.user._id)
    .then(data => {
      if(data) {
        history.current.push('/', {reload: true})
      }
    })
  }

  const previewImg = () => {
    const file = imgRef.current.files[0]
    var reader = new FileReader()
    reader.onload = function (e) {
      setImage({data: file, preview: e.target.result})
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className={styles.wrapper}>
      {/* TODO: error styling */}
      { isLoading ? <div>...</div> :
        <>
          <ArticleHeader author={auth.user}/>
          { createArticleQuery.isError ? <div className={styles.error}>{createArticleQuery.errorMessage ? createArticleQuery.errorMessage : 'Oh no! Something went wrong. Please try again.'}</div> : null}
          <Button variant="primary" className={styles.publish} onClick={handlePublish} disabled={createArticleQuery.isLoading}>{createArticleQuery.isLoading ? 'Publishing...' : 'Publish'}</Button>
          <div style={{display: 'none'}}>
              <input type="file" onChange={ ()=> previewImg()} id="file" ref={imgRef}/>
          </div>
          <div style={{position: 'relative'}} className={styles.titleAndImage}>
          { image.preview ? (
            <div className={styles.imagePreviewWrapper}>
              <img src={image.preview} alt="article" className={styles.imagePreview}/>
            </div>
           ) : ""}
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" className={styles.title}/>
            <button onClick={() => imgRef.current.click()} className={styles.upload}><FontAwesomeIcon icon={faCamera} color="silver"/></button>
           </div>
          <Draft
            editorClassName={styles.editor}
            toolbar={{options}}
            onContentStateChange={setContent}/>
        </>
      }
    </div>
  );
}

export default Editor
