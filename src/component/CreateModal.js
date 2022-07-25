import React from 'react'
import classes from './Styles/CreateModal.module.css'
import {useCategory, useContent, usePosts, useTitle} from './Storage'

function CreateModal(props) {
    // const gotit = usePosts()
  return (
    <div className={classes.modal}>
        <p>
            <span>Blog!</span>
            <span className={classes.close} onClick={props.closeModal}>&times;</span>
        </p>
        <form onSubmit={usePosts()}>
        <input placeholder='title' onChange={useTitle()}/>
        <input placeholder='category' onChange={useCategory()}/>
        <textarea onChange={useContent()}></textarea>
        <button type='submit'>Post</button>
        </form>
    </div>
  )
}

export default CreateModal