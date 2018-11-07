import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';

const PaintTemplateComponent = ({ isEditable, currentComponent, handleComponentColorReorder, handleComponentColorRemove, askForComponentColorAdd, handleComponentLabelChange, handleComponentRemove }) => {

    let colorList = [];
    let componentLabel = <h5 className="col-10 col-mr-auto">{currentComponent.label}</h5>;
    let addColorBtn;
    let removeComponentBtn;

    // Ajout des couleurs
    if (isEditable) {
        componentLabel = <div className="form-group"><input className="form-input" type="text" id="componentLabel" placeholder="Label" value={currentComponent.label} onChange={(event) => { handleComponentLabelChange(currentComponent.id, event.target.value) }} /></div>;
        addColorBtn = <button id="addColor" className="btn btn-link tooltip tooltip-left col-ml-auto" data-tooltip="Add color" onClick={() => { askForComponentColorAdd(currentComponent.id) }}>
            <i className="icon icon-plus"></i>
        </button>;
        removeComponentBtn = <button id="removeComponent" className="btn btn-link tooltip tooltip-left" data-tooltip="Remove component" onClick={() => { handleComponentRemove(currentComponent.id) }}><i className="icon icon-delete"></i></button>;
    }

    if (currentComponent.colors && currentComponent.colors.length) {

        colorList = currentComponent.colors.map((color, index) => {
            return (
                <Draggable key={index} draggableId={index} index={index} isDragDisabled={!isEditable}>
                    {(provided, snapshot) => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="tile tile-centered">
                            <div className="tile-icon">
                                <figure className="avatar" style={{ backgroundColor: color.color }}>
                                </figure>
                            </div>
                            <div className="tile-content">
                                <div className="tile-title">{color.label}</div>
                                <div className="tile-subtitle text-gray">{color.type}</div>
                            </div>
                            <div className="tile-action">
                                {isEditable && <button id="deleteColor" className="btn btn-link tooltip tooltip-left" data-tooltip="Delete color" onClick={() => { handleComponentColorRemove(currentComponent.id, color.id, index) }}>
                                    <i className="icon icon-delete"></i>
                                </button>}
                            </div>
                        </div >
                    )}
                </Draggable>
            )
        });
    }

    return (
        <div className="mt-2 container">
            <div className="columns col-gapless">
                {componentLabel}
                {addColorBtn}
                {removeComponentBtn}
            </div>
            <DragDropContext onDragEnd={(event) => handleComponentColorReorder(currentComponent.id, event)}>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div ref={provided.innerRef}>
                            {colorList}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    )
}

PaintTemplateComponent.propTypes = {
    isEditable: PropTypes.bool,
    currentComponent: PropTypes.object,
    handleComponentColorReorder: PropTypes.func,
    handleComponentColorRemove: PropTypes.func,
    askForComponentColorAdd: PropTypes.func,
    handleComponentLabelChange: PropTypes.func,
    handleComponentRemove: PropTypes.func
};

export default PaintTemplateComponent;