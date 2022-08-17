import React, { useContext, useState } from "react";
import classes from "./Styles/CreateModal.module.css";
import { Storage } from "./Storage";

function CreateModal(props) {
  const gotit = useContext(Storage);
  const [image, setImage] = useState("");
  const uploadImage = (event) => {
    if (event.target.files && event.target.files[0])
      setImage(URL.createObjectURL(event.target.files[0]));
  };
  return (
    <div className={classes.modal}>
      <p>
        <span>Blog!</span>
        <span className={classes.close} onClick={gotit.closeModal}>
          &times;
        </span>
      </p>
      <form onSubmit={(event)=>{gotit.addPost(event,image)
         setImage('')}}>
        {gotit.postError && (
          <span style={{ color: "red" }}>{gotit.postError}</span>
        )}
        <input
          placeholder="title"
          value={gotit.title}
          onChange={gotit.newtitle}
        />
        <input
          placeholder="category"
          value={gotit.category}
          onChange={gotit.newcategory}
        />
        <textarea value={gotit.content} onChange={gotit.newcontent}></textarea>
        <div>
          <label htmlFor="input-file">
            <i
              className="fa-regular fa-image"
              style={{ color: "blue", fontSize: "2rem",cursor:'pointer' }}
            ></i>
            <img src={image?image:gotit.image1?gotit.image1:image} alt="" style={{ maxHeight: "2rem", maxWidth: "2rem" }} />
          </label>
          <input type="file" id="input-file" onChange={uploadImage} hidden />
        </div>
        <button type="submit">Post</button>
      </form>
      <div></div>
    </div>
  );
}

export default CreateModal;
