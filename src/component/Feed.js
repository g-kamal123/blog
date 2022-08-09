import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons";
import classes from "./Styles/Feed.module.css";
import { Storage } from "./Storage";
import CreateModal from "./CreateModal";

function Feed() {
  const detail = useContext(Storage);
  const modalHandler = (val) => {
    detail.editPost(val);
  };
  return (
    <div>
      {detail.modal && <CreateModal />}
      {detail.post.map((item) => (
        <div className={classes.feedItem}>
          <h2>Title:{item.title}</h2>
          <span>by:{item.user}</span>
          <div className={classes.delEdit}>
            <h4>category:{item.category}</h4>

            {item.user === detail.user && (
              <span>
                <button
                  className={classes.button}
                  onClick={() => modalHandler(item)}
                >
                  Edit
                </button>
                <button
                  className={classes.button}
                  onClick={() => detail.delPost(item)}
                >
                  delete
                </button>{" "}
              </span>
            )}
          </div>
          <hr />
          <p>{item.content}</p>
          <hr />
          <div className={classes.like_comment}>
            <p>
              <FontAwesomeIcon
                icon={faHeart}
                className={`${classes.icons}  ${
                  item.liked[detail.user] && classes.active
                }`}
                onClick={() => detail.addLike(item)}
              />
              <span>{item.like}</span>
            </p>
            <p>
              <FontAwesomeIcon
                icon={faComment}
                className={classes.icons}
                onClick={() => detail.commentopener(item)}
              />
              <span>{item.comment.length}</span>
            </p>
          </div>
          {detail.postError && (
            <span style={{ color: "red" }}>{detail.postError}</span>
          )}
          {item.showcomm && (
            <div className={classes.showcomments}>
              <div className={classes.comment}>
                <textarea
                  onChange={(event) => detail.newComment(item, event)}
                  value={detail.currcomment}
                ></textarea>
                <button
                  className={classes.button}
                  onClick={() => detail.addComment(item)}
                >
                  Reply
                </button>
              </div>
              <div className={classes.parentcomment}>
                {item.comment.map((item1, key) => (
                  <div className={classes.allcommentItem}>
                    {Object.keys(item1).map((it) => (
                      <>
                        <span className={classes.comm}>{it}</span>
                        <p>{item1[it]} </p>
                        {it === detail.user && (
                          <button
                            onClick={() => detail.delComment(item1, item)}
                          >
                            delete
                          </button>
                        )}
                      </>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
      {/* {console.log(detail.post)} */}
    </div>
  );
}

export default Feed;
