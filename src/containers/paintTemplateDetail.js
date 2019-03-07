import React, { Component } from 'react';
import { getTemplateById } from '../models/template';
import PaintTemplateDetailComponent from '../components/paintTemplateDetailComponent';
import PaintTemplateDetailHeader from '../components/paintTemplateDetailHeader';
import ColorPicker from './colorPicker';
import Modal from 'react-modal';

export class PaintTemplateDetail extends Component {

    constructor(props) {
        super(props)

        this.state = {
            currentTemplate: {
                components: [],
                label: ''
            },
            modalIsOpen: false,
            isEditable: false,
            currentComponent: null
        }

        this.handleSave = this.handleSave.bind(this);
        this.handleReturn = this.handleReturn.bind(this);
        this.handleComponentColorReorder = this.handleComponentColorReorder.bind(this);
        this.handleComponentColorRemove = this.handleComponentColorRemove.bind(this);
        this.askForComponentColorAdd = this.askForComponentColorAdd.bind(this);
        this.handleComponentColorModalClose = this.handleComponentColorModalClose.bind(this);
        this.handleComponentColorAdd = this.handleComponentColorAdd.bind(this);
        this.handleComponentAdd = this.handleComponentAdd.bind(this);
        this.handleComponentRemove = this.handleComponentRemove.bind(this);
        this.handleComponentLabelChange = this.handleComponentLabelChange.bind(this);
        this.handleTemplateLabelChange = this.handleTemplateLabelChange.bind(this);
        this.handleTemplateTypeChange = this.handleTemplateTypeChange.bind(this);
    }

    componentDidMount() {
        if (this.props.match.params.templateId) {
            getTemplateById(this.props.match.params.templateId).then(result => {
                this.setState({
                    currentTemplate: result
                })
            });
        }

        if (this.props.match.params.status === 'edit' || this.props.match.params.status === 'add') {
            this.setState({ isEditable: true });
        }
    }

    handleReturn() {
        this.props.history.push('/');
    }

    handleSave(event) {
        event.preventDefault();
        console.log(this.state.currentTemplate);
    }

    handleComponentColorReorder(componentId, dragEndEvent) {
        const component = this.state.currentTemplate.components.find(componentItem => componentItem.id === componentId);
        const colors = [...component.colors];
        const startIndex = dragEndEvent.source.index;
        const endIndex = dragEndEvent.destination.index;

        const [removed] = colors.splice(startIndex, 1);
        colors.splice(endIndex, 0, removed);

        this.setState({
            currentTemplate: Object.assign({}, this.state.currentTemplate, {
                components: this.state.currentTemplate.components.map(componentItem => {
                    if (componentItem.id === componentId) {
                        return Object.assign({}, componentItem, { colors: colors });
                    }
                    return componentItem;
                })
            })
        });
    }

    handleComponentColorRemove(componentId, colorId, index) {
        const component = this.state.currentTemplate.components.find(componentItem => componentItem.id === componentId);
        const colors = component.colors.filter((colorItem, indexItem) => indexItem !== index);

        this.setState({
            currentTemplate: Object.assign({}, this.state.currentTemplate, {
                components: this.state.currentTemplate.components.map(componentItem => {
                    if (componentItem.id === componentId) {
                        return Object.assign({}, componentItem, { colors: colors });
                    }
                    return componentItem;
                })
            })
        });
    }

    askForComponentColorAdd(componentId) {
        this.setState({
            modalIsOpen: true,
            currentComponent: componentId
        })
    }

    handleComponentColorModalClose() {
        this.setState({
            modalIsOpen: false,
            currentComponent: null
        });
    }

    handleComponentColorAdd(colorItem) {
        const component = this.state.currentTemplate.components.find(componentItem => componentItem.id === this.state.currentComponent);
        const colors = [...component.colors, colorItem];

        this.setState({
            currentTemplate: Object.assign({}, this.state.currentTemplate, {
                components: this.state.currentTemplate.components.map(componentItem => {
                    if (componentItem.id === this.state.currentComponent) {
                        return Object.assign({}, componentItem, { colors: colors });
                    }
                    return componentItem;
                })
            }),
            modalIsOpen: false,
            currentComponent: null
        });
    }

    handleComponentLabelChange(componentId, label) {
        this.setState({
            currentTemplate: Object.assign({}, this.state.currentTemplate, {
                components: this.state.currentTemplate.components.map(componentItem => {
                    if (componentItem.id === componentId) {
                        return Object.assign({}, componentItem, { label: label });
                    }
                    return componentItem;
                })
            })
        })
    }

    handleComponentAdd() {
        const newComponent = {
            id: new Date().getUTCMilliseconds(),
            label: "",
            colors: [],
            state: 'new'
        }

        this.setState({
            currentTemplate: Object.assign({}, this.state.currentTemplate, {
                components: [...this.state.currentTemplate.components, newComponent]
            })
        });
    }

    handleComponentRemove(componentId) {
        this.setState({
            currentTemplate: Object.assign({}, this.state.currentTemplate, {
                components: this.state.currentTemplate.components.filter(componentItem => {
                    return componentItem.id !== componentId;
                })
            })
        });
    }

    handleTemplateLabelChange(newLabel) {
        this.setState({
            currentTemplate: Object.assign({}, this.state.currentTemplate, {
                label: newLabel
            })
        });
    }

    handleTemplateTypeChange(newType) {
        this.setState({
            currentTemplate: Object.assign({}, this.state.currentTemplate, {
                type: newType
            })
        });
    }

    render() {
        let componentList = [];        
        let addComponentBtn, saveBtn;

        if (this.state.isEditable) {
            addComponentBtn = <button className="btn col-12 tooltip" data-tooltip="Add a component" onClick={this.handleComponentAdd}>Add a component</button>;
            saveBtn = <input type="submit" value="Save" className="btn btn-primary column col-6 tooltip" data-tooltip="Save template"/>;
        }

        if (this.state.currentTemplate.components && this.state.currentTemplate.components.length) {
            componentList = this.state.currentTemplate.components.map((component, index) => {
                return <PaintTemplateDetailComponent key={component.id} isEditable={this.state.isEditable} currentComponent={component} handleComponentColorReorder={this.handleComponentColorReorder} handleComponentColorRemove={this.handleComponentColorRemove} askForComponentColorAdd={this.askForComponentColorAdd} handleComponentLabelChange={this.handleComponentLabelChange} handleComponentRemove={this.handleComponentRemove} />
            });
        }

        return (
            <div className="panel">
                <form onSubmit={(event) => this.handleSave(event)}>
                    <div className="panel-header text-center">
                        <PaintTemplateDetailHeader isEditable={this.state.isEditable} currentTemplate={this.state.currentTemplate} handleTemplateLabelChange={this.handleTemplateLabelChange} handleTemplateTypeChange={this.handleTemplateTypeChange}></PaintTemplateDetailHeader>
                    </div>
                    <div className="panel-body">
                        {componentList}
                    </div>
                    <div className="panel-footer">
                        <div className="mb-2">
                            {addComponentBtn}
                        </div>
                        <div className="columns col-gapless">
                            {saveBtn}
                            <button className="btn btn-link column tooltip" data-tooltip="Return to list" onClick={this.handleReturn}>Return</button>
                        </div>
                    </div>
                </form>
                <Modal className="modal active" isOpen={this.state.modalIsOpen}>
                    <div className="modal-overlay"></div>
                    <div className="modal-container">
                        <div className="modal-header">
                            <span className="btn btn-clear float-right" href="#modals" aria-label="Close" onClick={this.handleComponentColorModalClose}></span>
                            <div className="modal-title h5">Select a color</div>
                        </div>
                        <div className="modal-body">
                            <ColorPicker handleComponentColorAdd={this.handleComponentColorAdd}></ColorPicker>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}
export default PaintTemplateDetail;