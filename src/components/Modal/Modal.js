import './Modal.css';

function Modal({title,setShowModal,form,btnText}){
    return(
        <div id="myModal" className="modal">

            <div className="modal-content">
                <div className="modal-header">
                    <span onClick={()=>setShowModal(false)} className="close">&times;</span>
                    <h2>{title}</h2>
                </div>
                <div className="modal-body">

                    {form}

                </div>
                <div className="modal-footer">
                    <button>{btnText}</button>
                </div>
            </div>

        </div>
    )
}
export default Modal;