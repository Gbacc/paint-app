import React, { Component } from 'react';
import { getTemplateById } from '../models/template';
import PaintTemplateComponent from '../components/paintTemplateComponent';
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

    handleSave() {
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
        let componentLabel = <span><figure className="avatar avatar-lg"><span className="icon icon-bookmark mt-2"></span></figure><div className="panel-title h5 mt-2 relative">{this.state.currentTemplate.label}</div></span>;
        let componentType = <div className="panel-subtitle">{this.state.currentTemplate.type}</div>;
        let addComponentBtn, saveBtn;

        if (this.state.isEditable) {
            componentLabel = <div className="form-group"><input className="form-input" type="text" id="templateLabel" placeholder="Label" value={this.state.currentTemplate.label} onChange={(event) => { this.handleTemplateLabelChange(event.target.value) }} /></div>;
            componentType = <div className="form-group"><select className="form-select" id="templateType" value={this.state.currentTemplate.type} onChange={(event) => this.handleTemplateTypeChange(event.target.value)}><option value="miniature">miniature</option><option value="base">base</option></select></div>
            addComponentBtn = <button className="btn col-12 tooltip" data-tooltip="Add a component" onClick={this.handleComponentAdd}>Add a component</button>;
            saveBtn = <button className="btn btn-primary column col-6 tooltip" data-tooltip="Save template" onClick={this.handleSave}>Save</button>;
        }

        if (this.state.currentTemplate.components && this.state.currentTemplate.components.length) {
            componentList = this.state.currentTemplate.components.map((component, index) => {
                return <PaintTemplateComponent key={component.id} isEditable={this.state.isEditable} currentComponent={component} handleComponentColorReorder={this.handleComponentColorReorder} handleComponentColorRemove={this.handleComponentColorRemove} askForComponentColorAdd={this.askForComponentColorAdd} handleComponentLabelChange={this.handleComponentLabelChange} handleComponentRemove={this.handleComponentRemove} />
            });
        }

        return (
            <div className="panel">
                <div className="panel-header text-center">
                    {componentLabel}
                    {componentType}
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
                <Modal className="modal active" isOpen={this.state.modalIsOpen}>
                    <div className="modal-overlay"></div>
                    <div className="modal-container">
                        <div className="modal-header">
                            <a className="btn btn-clear float-right" href="#modals" aria-label="Close" onClick={this.handleComponentColorModalClose}></a>
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