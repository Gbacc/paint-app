import React from 'react';
import PropTypes from 'prop-types';

const PaintTemplateComponent = ({ currentComponent }) => {

    let colorList = [];
    if (currentComponent.colors && currentComponent.colors.length) {
        colorList = currentComponent.colors.map((color, index) => {
            return (
                <div key={index} className="tile tile-centered">
                    <div className="tile-icon">
                        <figure className="avatar" style={{ backgroundColor: color.color }}>
                        </figure>
                    </div>
                    <div className="tile-content">
                        <div className="tile-title">{color.label}</div>
                        <div className="tile-subtitle text-gray">{color.type}</div>
                    </div>
                    <div className="tile-action">
                        <button className="btn btn-link"></button>
                    </div>
                </div >
            )
        });
    }

    return (
        <div className="mt-2">
            <h5>{currentComponent.label}</h5>
            {colorList}
        </div>
    )
}

PaintTemplateComponent.propTypes = {
    currentComponent: PropTypes.object
};

export default PaintTemplateComponent;