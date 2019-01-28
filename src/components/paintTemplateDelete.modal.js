import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

const PaintTemplateDelete = ({ isOpen, currentTemplate, handleDelete, handleClose }) => {

    return (
        <Modal className="modal active" isOpen={isOpen}>
            <div className="modal-overlay"></div>
            <div className="modal-container">
                <div className="modal-header">
                    <span className="btn btn-clear float-right" href="#modals" aria-label="Close" onClick={handleClose}></span>
                    <div className="modal-title h5">{currentTemplate.label}</div>
                </div>
                <div className="modal-body">
                    <p>Do you want to delete this template </p>
                </div>
                <div className="modal-footer">
                    <button id="submitModal" className="btn btn-primary" onClick={() => handleDelete(currentTemplate)}>Delete</button>
                    <button id="closeModal" className="btn btn-link" onClick={() => handleClose()}>Close</button>
                </div>
            </div>
        </Modal >
    )
}

PaintTemplateDelete.propTypes = {
    isOpen: PropTypes.bool,
    currentTemplate: PropTypes.object,
    handleDelete: PropTypes.func,
    handleClose: PropTypes.func
};

export default PaintTemplateDelete;