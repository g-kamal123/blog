import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons'
import classes from './Styles/Feed.module.css'

function Feed() {
  return (
    <div>
        <div className={classes.feedItem}>
            <h2>Title:even when the text overflows</h2>
            <h4>category</h4>
            <hr />
            <p> I am now wondering how you would set it so that there is no scrollbar in the, even when the text overflows. To scroll down with this, you would use the arrow keys or the mouse to navigate through the text.</p>
            <hr />
            <div className={classes.like_comment}>
                <p><FontAwesomeIcon icon={faHeart} className={classes.icons}/><span>1</span></p>
                <p><FontAwesomeIcon icon={faComment} className={classes.icons}/><span>0</span></p>
            </div>
        </div>
    </div>
  )
}

export default Feed