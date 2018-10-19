import React from 'react';
import Modal from 'react-modal';

const PaintTemplateDelete = ({ isOpen, currentTemplate, handleDelete, handleClose }) => {

    return (
        <Modal className="modal active" isOpen={isOpen}>
            <div className="modal-overlay"></div>
            <div className="modal-container">
                <div className="modal-header">
                    <div className="modal-title h5">{currentTemplate.label}</div>
                </div>
                <div className="modal-body">
                    <p>Do you want to delete this template </p>
                </div>
                <div className="modal-footer">
                    <button id="submitModal" className="btn btn-primary" onClick={()=>handleDelete(currentTemplate)}>Delete</button>
                    <button id="closeModal" className="btn btn-link" onClick={()=>handleClose()}>Close</button>
                </div>
            </div>
        </Modal >
    )
}

export default PaintTemplateDelete;