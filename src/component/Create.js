import React, { useState } from 'react'
import CreateModal from './CreateModal'
import classes from './Styles/Create.module.css'

function Create() {
    const [modal,setModal] = useState(false)
    const createHandler = (event)=>{
        setModal(true)
    }
    const modalCloser = ()=>{
        setModal(false)
    }
  return (
    <div className={classes.create}>
        {modal &&  <CreateModal closeModal={modalCloser}/>}
        {!modal &&  <button onClick={createHandler}>Create Your Blog</button>}
    </div>
  )
}

export default Create