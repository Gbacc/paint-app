import React from 'react';
import PropTypes from 'prop-types';
import './paintTemplateListItem.scss';

const PaintTemplateListItem = ({ currentTemplate, handleEdit, askForDelete, handleSelect }) => {
    const primaryColors = currentTemplate.components ? currentTemplate.components.map(component => component.colors[0]) : [];
    let primaryColorsIcon = [];
    for (let i = 0; i < 4; i++) {
        const color = primaryColors[i] ? primaryColors[i].color : '#FFF';
        primaryColorsIcon.push(<div className="tile-icon-grid-box" style={{ backgroundColor: color }} key={i}>&nbsp;</div>);
    }
    return (
        <div className="tile tile-centered">
            <div className="tile-icon tile-icon-grid-wrapper">
                {primaryColorsIcon}
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