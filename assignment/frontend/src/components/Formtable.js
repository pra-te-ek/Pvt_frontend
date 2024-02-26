import React from 'react'
import "../App.css"
import { MdClose } from 'react-icons/md'

const Formtable = ({handleSubmit,handleOnChange,handleclose,rest}) => {
  return (
    <div className="addContainer">
            <form onSubmit={handleSubmit}>
            <div className="close-btn" onClick={handleclose}><MdClose/></div>
              <label htmlFor="id">id : </label>
              <input type="text" id="id" name="id" onChange={handleOnChange} value={rest.id}/>

              <label htmlFor="product">product : </label>
              <input type="text" id="productl" name="product" onChange={handleOnChange} value={rest.product}/>

              <label htmlFor="description">description : </label>
              <input type="text" id="description" name="description" onChange={handleOnChange} value={rest.description}/>

              <button className="btn">Submit</button>
            </form>
    </div>
  )
}

export default Formtable