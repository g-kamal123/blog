import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons'
import classes from './Styles/Feed.module.css'
import { Storage } from './Storage'
import CreateModal from './CreateModal'

function Feed() {
  const detail = useContext(Storage)
  const modalHandler = (val)=>{
    detail.editPost(val)
  }
  return (
    <div>
      {detail.modal &&  <CreateModal />}
      {detail.post.map((item)=>
       <div className={classes.feedItem}>
       <h2>Title:{item.title}</h2>
       <div className={classes.delEdit}> 
       <h4>category:{item.category}</h4>
       <span>
        <button onClick={()=>modalHandler(item)}>Edit</button> 
        <button onClick={()=>detail.delPost(item)}>delete</button>
        </span>
        </div>
       <hr />
       <p>{item.content}</p>
       <hr />
       <div className={classes.like_comment}>
           <p><FontAwesomeIcon icon={faHeart} className={`${classes.icons}  ${detail.like && 'active'}`} style={{color:`${detail.like? 'red':'rgb(175, 152, 152)'} `}} onClick={detail.likefun}/><span>0</span></p>
           <p><FontAwesomeIcon icon={faComment} className={classes.icons}
           onClick={()=>detail.commentfun(item)} /><span>0</span></p>
       </div>
       {/* {console.log(detail.post[0].comment)} */}
       {detail.comment && <div className={classes.showcomments}>
       <div className={classes.comment}>
        <textarea ></textarea>
        <button>Reply</button>
       </div>
       <div className={classes.parentcomment}>

       {item.comment.map((item1)=>
       <div className={classes.allcommentItem}>
        <p>{item1}</p>
        <button>delete</button>
        </div>)}

       </div>

    </div>}

       </div>

      )}
      {/* {console.log(detail.post)} */}
    </div>
  )
}

export default Feed