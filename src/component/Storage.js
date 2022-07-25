import React, { useContext, useState } from 'react'
const Storage = React.createContext()
const Title = React.createContext()
const Category = React.createContext()
const Content = React.createContext()
const Print = React.createContext()
const Render = React.createContext()

export const usePosts =()=>{
    return useContext(Storage)
}
export const useTitle =()=>{
    return useContext(Title)
}
export const useCategory =()=>{
    return useContext(Category)
}
export const useContent =()=>{
    return useContext(Content)
}
export const usePrint =()=>{
    return useContext(Print)
}
export const useRender =()=>{
    return useContext(Render)
}
export function Post(props) {
    const [title,setTitle]= useState('')
    const [category,setCategory]= useState('')
    const [content,setContent]= useState('')
    const [post,setPost]= useState([])
    const [renderfeed,setRenderfeed] = useState(false)
    const addPost = (event)=>{
        event.preventDefault()
        // alert('post')
        var currentPost = {
            title:title,
            category:category,
            content:content
        }
        // var arr = [...post,currentPost]
        setPost(prePost => [...prePost,currentPost])
        setRenderfeed(true)
    }
  return (
    <>
    <Title.Provider value={(event)=>setTitle(event.target.value)}>
        <Category.Provider value={(event)=>setCategory(event.target.value)}>
            <Content.Provider value={(event)=>setContent(event.target.value)}>
            <Storage.Provider value={addPost}>
               {props.children}
            </Storage.Provider>
            </Content.Provider>
        </Category.Provider>
    </Title.Provider>
    <Print.Provider value={post}>
        <Render.Provider value={renderfeed}>
            {props.children}
        </Render.Provider>
    </Print.Provider>
    </>
  )
}