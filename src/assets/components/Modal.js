import React from "react";


const Modal = ({show, setShow, children})=>{
    return(
        <div className={show ? "modal show" : "modal"} onClick={()=>setShow(false)}>
            <div className="modal__content" onClick={(e)=> e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
} 

export default Modal;