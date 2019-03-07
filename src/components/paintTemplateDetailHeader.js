import React from 'react';
import PropTypes from 'prop-types';

const paintTemplateDetailHeader = ({ isEditable, currentTemplate, handleTemplateLabelChange, handleTemplateTypeChange }) => {

    let componentLabel = <span><figure className="avatar avatar-lg"><span className="icon icon-bookmark mt-2"></span></figure><div className="panel-title h5 mt-2 relative">{currentTemplate.label}</div></span>;
    let componentType = <div className="panel-subtitle">{currentTemplate.type}</div>;

    // Ajout des couleurs
    if (isEditable) {
        componentLabel = <div className="form-group"><input className="form-input" type="text" id="templateLabel" placeholder="Label" value={currentTemplate.label} onChange={(event) => { handleTemplateLabelChange(event.target.value) }} required /></div>;
        componentType = <div className="form-group"><select className="form-select" id="templateType" value={currentTemplate.type} onChange={(event) => handleTemplateTypeChange(event.target.value)}><option value="miniature">miniature</option><option value="base">base</option></select></div>;
    }

    return (
        <div>
            {componentLabel}
            {componentType}
        </div>
    )
}

paintTemplateDetailHeader.propTypes = {
    isEditable: PropTypes.bool,
    currentTemplate: PropTypes.object,
    handleTemplateLabelChange: PropTypes.func,
    handleTemplateTypeChange: PropTypes.func
};

export default paintTemplateDetailHeader;