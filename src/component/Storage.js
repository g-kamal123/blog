
import React, { useState } from "react";
import { useNavigate } from "react-router";
export const Storage = React.createContext();

export function Post(props) {
  const [user, setUser] = useState("");
  const [error,setError] = useState('')
  const [postError,setPostError] = useState('')
  // const [password,setPassword] = useState('')
  const [registerArray,setRegisterArray] =useState([{email:'kamal',pass:'1234'},{email:'kamal1',pass:'1234'}]);
  // const [enteredUser, setEnteredUser] = useState("");
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
  const [editIndex, setEditIndex] = useState(-1);
  const [modal, setModal] = useState(false);
  const [currcomment, setCurrComment] = useState("");
  const navigate = useNavigate();


  const aboutUser = (email,pass) => {
    let arr = registerArray.some((item)=>item.email===email && item.pass===pass)
    if(arr){
      setError('')
      setPostError('')
      setUser(email)
    navigate("/");
    }
    else{
      setError('user and password did not match')
    }
  };

  const addLike = (val) => {
    if(user===''){
      setPostError('Login first')
      return
    }
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
    if(user===''){
      setPostError('Login first')
      return
    }
    if(currcomment===''){
      setCurrComment('Add some comment')
      return
    }
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
    if(user===''){
      setPostError('Login first')
      return
    }
    if(title==='' || category==='' || content ===''){
      setPostError('All fields are mandatory')
      return
    }
    if (editIndex>-1) {
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
      console.log(arr);
      setEditIndex(-1)
      setPost([...arr]);
      setTitle("");
      setCategory("");
      setContent("");
      setRenderfeed(true);
      setModal(false);
      setPostError('')
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
      setPostError('')
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
    // delPost(val)
    setModal(true);
    setTitle(val.title);
    setCategory(val.category);
    setContent(val.content);
    let index = post.indexOf(val);
    setEdit(true);
    setEditIndex(index);
    document.documentElement.scrollTop = 4;
  };
  const register =(email1,pass1,cnfpass1)=>{
    let toAdd = {email:email1,pass:pass1,cnfpass:cnfpass1}
    setRegisterArray([...registerArray,toAdd])
  }
  const logout =()=>{
    setUser('')
  }
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
          aboutUser: aboutUser,
          user: user,
          delComment: delComment,
          currcomment:currcomment,
          register:register,
          error:error,
          postError:postError,
          logout:logout
        }}
      >
        {props.children}
      </Storage.Provider>
    </>
  );
}
