import React, { useState } from 'react'
 export const Storage = React.createContext()

export function Post(props) {
    const [title,setTitle]= useState('')
    const [category,setCategory]= useState('')
    const [content,setContent]= useState('')
    const [post,setPost]= useState([{title:'mybg',category:'just',content:'Create a beautiful blog that fits your style. Choose from a selection of easy-to-use templates – all with flexible layouts and hundreds of background images – or design something new.',comment:['comm1','comm2']},{title:'myblog',category:'just',content:'Create a beautiful blog that fits your style. Choose from a selection of easy-to-use templates – all with flexible layouts and hundreds of background images – or design something new.',comment:['comm22','comm24']}])
    const [renderfeed,setRenderfeed] = useState(false)
    const [edit,setEdit] = useState(false)
    const [editIndex,setEditIndex] = useState('')
    const [modal,setModal] = useState(false)

    const commentfun =(val)=>{
        // let index = post.indexOf(val)
        let arr = [,...val.comment]
        let arr1 = [...post]
        arr1.val.comment = arr
        setPost(arr1)
        console.log(val.comment)
    }
    const closeModal = (event) =>{
        setModal(false)
    }
    const openModal = ()=>{
        setModal(true)
    }
    const addPost = (event)=>{
        event.preventDefault()
        // alert('post')
        var currentPost = {
            title:title,
            category:category,
            content:content
        }
        // var arr = [...post,currentPost]
        if(edit){
            let arr = [...post]
            arr.splice(editIndex,1,currentPost) 
            setPost(arr)
        setTitle('')
        setCategory('')
        setContent('')
        setRenderfeed(true)
        setModal(false)
        }
        else{
        setPost(prePost => [currentPost,...prePost])
        setTitle('')
        setCategory('')
        setContent('')
        setRenderfeed(true)
        setModal(false)
        }
    }
    const delPost = (val)=>{
        // alert('del')
        let index = post.indexOf(val)
        let arr = [...post]
        arr.splice(index,1);
        setPost(arr)
    }
    const editPost = (val)=>{
        // alert('edit')
        setModal(true)
        setTitle(val.title)
        setCategory(val.category)
        setContent(val.content)
        let index = post.indexOf(val)
        setEdit(true)
        setEditIndex(index)
        // let arr = [...post]
    }
  return (
    <>
    <Storage.Provider value={{addPost:addPost,
        newtitle:(event)=>setTitle(event.target.value),
        newcategory:(event)=>setCategory(event.target.value),
        newcontent:(event)=>setContent(event.target.value), 
        title:title,
        category:category,
        content:content,
        renderfeed:renderfeed,
        post:post,
        modal:modal,
        closeModal:closeModal,
        openModal:openModal,
        editPost:editPost,
        delPost:delPost}}>
        {props.children}
    </Storage.Provider>
    </>
  )
}