import './Modal.css';
import {useState} from "react";

function Modal({title,setShowModal,form,btnText}){
    const [modalContentClass,setModalContentClass] = useState('modal-content');
    const hideModal = () => {
        setModalContentClass('modal-content-hidden');
        setTimeout(()=>{
            setShowModal(false);
        },400)
    }
    return(
        <div id="myModal" className="modal">

            <div className={modalContentClass}>
                <div className="modal-header">
                    <span onClick={hideModal} className="close">&times;</span>
                    <h2>{title}</h2>
                </div>
                <div className="modal-body">

                    {form}

                </div>
                <div className="modal-footer">
                    <button form="modalForm">{btnText}</button>
                </div>
            </div>

        </div>
    )
}
export default Modal;