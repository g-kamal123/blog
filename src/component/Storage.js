import React, { useState } from "react";
import { useNavigate } from "react-router";
export const Storage = React.createContext();

export function Post(props) {
  const [user, setUser] = useState("");
  const [password,setPassword] = useState('')
  const [enteredUser, setEnteredUser] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const nav = useNavigate();
  const [post, setPost] = useState([
    {
      user: "dummyuser1",
      title: "demo1",
      category: "demo",
      content:
        "Create a beautiful blog that fits your style. Choose from a selection of easy-to-use templates – all with flexible layouts and hundreds of background images – or design something new.",
      like: 0,
      comment: [{ dummyuser1: "comm1" }, { dummyuser2: "comm2" }],
      showcomm: false,
      liked: {},
    },

    {
      user: "dummyuser2",
      title: "demo2",
      category: "dummy",
      content:
        "Create a beautiful blog that fits your style. Choose from a selection of easy-to-use templates – all with flexible layouts and hundreds of background images – or design something new.",
      like: 0,
      comment: [{ dummyuser1: "comm22" }, { dummyuser2: "comm24" }],
      showcomm: false,
      liked: {},
    },
  ]);
  const [renderfeed, setRenderfeed] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editIndex, setEditIndex] = useState("");
  const [modal, setModal] = useState(false);
  const [currcomment, setCurrComment] = useState("");
  const navigate = useNavigate();

  const inputUser = (event) => {
    setEnteredUser(event.target.value);
  };

  const aboutUser = (event) => {
    event.preventDefault();

    setUser(enteredUser);
    navigate("/");
  };

  const addLike = (val) => {
    let index = post.indexOf(val);
    console.log(index + "index");
    let arr = [...post];
    Object.keys(arr[index].liked).map((item) => {
      if (item === user) {
        if (arr[index].liked[item] === 1) {
          arr[index].liked[item] = 0;
          console.log("yes");
        } else if (arr[index].liked[item] === 0) {
          arr[index].liked[item] = 1;
          console.log("no");
        }
        const sumlike = Object.keys(arr[index].liked).reduce(
          (sum, item) => sum + arr[index].liked[item],
          0
        );
        arr[index].like = sumlike;
        setPost(arr);
      }
    });
    arr[index].liked = { [user]: 1, ...arr[index].liked };
    const sumlike = Object.keys(arr[index].liked).reduce(
      (sum, item) => sum + arr[index].liked[item],
      0
    );
    // console.log(sumlike)
    arr[index].like = sumlike;
    setPost(arr);
  };

  const addComment = (val) => {
    let index = post.indexOf(val);
    let arr = [...post];
    arr[index].comment = [{ [user]: currcomment }, ...arr[index].comment];
    setPost(arr);
    setCurrComment('')
  };

  const delComment = (val, val1) => {
    let index1 = post.indexOf(val1);
    let index = post[index1].comment.indexOf(val);
    let arr = [...post];
    arr[index1].comment.splice(index, 1);
    setPost(arr);
  };

  const newComment = (val, event) => {
    setCurrComment(event.target.value);
  };

  const commentopener = (val) => {
    let index = post.indexOf(val);
    let arr = [...post];
    if (arr[index].showcomm) arr[index].showcomm = false;
    else arr[index].showcomm = true;
    setPost(arr);
  };
  const closeModal = (event) => {
    setModal(false);
  };
  const openModal = () => {
    setModal(true);
  };
  const addPost = (event) => {
    event.preventDefault();

    if (edit) {
      let currentPost = {
        title: title,
        category: category,
        content: content,
        comment: [...post[editIndex].comment],
        showcomm: false,
        liked: { ...post[editIndex].liked },
        user: user,
      };
      let arr = [...post];
      arr.splice(editIndex, 1, currentPost);
      setPost(arr);
      setTitle("");
      setCategory("");
      setContent("");
      setRenderfeed(true);
      setModal(false);
    } else {
      let currentPost = {
        title: title,
        category: category,
        content: content,
        comment: [],
        showcomm: false,
        liked: {},
        user: user,
      };
      setPost((prePost) => [currentPost, ...prePost]);
      setTitle("");
      setCategory("");
      setContent("");
      setRenderfeed(true);
      setModal(false);
      nav("/feeds");
    }
  };
  const delPost = (val) => {
    // alert('del')
    let index = post.indexOf(val);
    let arr = [...post];
    arr.splice(index, 1);
    setPost(arr);
  };
  const editPost = (val) => {
    setModal(true);
    setTitle(val.title);
    setCategory(val.category);
    setContent(val.content);
    let index = post.indexOf(val);
    setEdit(true);
    setEditIndex(index);
  };
  return (
    <>
      <Storage.Provider
        value={{
          addPost: addPost,
          newtitle: (event) => setTitle(event.target.value),
          newcategory: (event) => setCategory(event.target.value),
          newcontent: (event) => setContent(event.target.value),
          title: title,
          category: category,
          content: content,
          renderfeed: renderfeed,
          post: post,
          modal: modal,
          closeModal: closeModal,
          openModal: openModal,
          editPost: editPost,
          delPost: delPost,
          commentopener: commentopener,
          newComment: newComment,
          addComment: addComment,
          addLike: addLike,
          inputUser: inputUser,
          aboutUser: aboutUser,
          user: user,
          delComment: delComment,
          currcomment:currcomment
        }}
      >
        {props.children}
      </Storage.Provider>
    </>
  );
}
