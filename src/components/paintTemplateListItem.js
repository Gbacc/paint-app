import React from 'react';
import PropTypes from 'prop-types';

const PaintTemplateListItem = ({ currentTemplate, handleEdit, askForDelete, handleSelect }) => {
    return (
        <div className="tile tile-centered">
            <div className="tile-icon">
                <div className="btn btn-primary">
                    <i className="icon icon-photo centered"></i>
                </div>
            </div>
            <div id="selectTemplate" className="tile-content" onClick={() => handleSelect(currentTemplate)}>
                <div className="tile-title">{currentTemplate.label}</div>
                <div className="tile-subtitle text-gray">{currentTemplate.type}</div>
            </div>
            <div className="tile-action">
                <button id="editTemplate" className="btn btn-link tooltip tooltip-left" data-tooltip="Edit template" onClick={() => { handleEdit(currentTemplate) }}>
                    <i className="icon icon-edit"></i>
                </button>
                <button id="deleteTemplate" className="btn btn-link tooltip tooltip-left" data-tooltip="Delete template" onClick={() => { askForDelete(currentTemplate) }}>
                    <i className="icon icon-delete"></i>
                </button>
            </div>
        </div>
    )
}

PaintTemplateListItem.propTypes = {
    currentTemplate: PropTypes.object,
    handleEdit: PropTypes.func,
    askForDelete: PropTypes.func,
    handleSelect: PropTypes.func
};

export default PaintTemplateListItem;