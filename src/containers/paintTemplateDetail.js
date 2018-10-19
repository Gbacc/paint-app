import React, { Component } from 'react';
import { getTemplateById } from '../models/template';
import PaintTemplateComponent from '../components/paintTemplateComponent';

export class PaintTemplateDetail extends Component {

    constructor(props) {
        super(props)

        this.state = {
            currentTemplate: {
                components: []
            },
            modalIsOpen: false,
            isEditable: false
        }


        // getPaintList().then(result => {
        //     console.log(result)
        // });

        this.handleSave = this.handleSave.bind(this);
        this.handleReturn = this.handleReturn.bind(this);
        this.handleComponentColorReorder = this.handleComponentColorReorder.bind(this);
        this.handleComponentColorRemove = this.handleComponentColorRemove.bind(this);
        this.handleComponentColorAdd = this.handleComponentColorAdd.bind(this);
        this.handleComponentAdd = this.handleComponentAdd.bind(this);
        this.handleComponentRemove = this.handleComponentRemove.bind(this);
        this.handleComponentLabelChange = this.handleComponentLabelChange.bind(this);
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

    handleComponentColorRemove(componentId, colorId) {
        const component = this.state.currentTemplate.components.find(componentItem => componentItem.id === componentId);
        const colors = component.colors.filter(colorItem => colorItem.id !== colorId);

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

    handleComponentColorAdd(componentId, colorItem) {
        console.log(componentId, colorItem)
        // const component = this.state.currentTemplate.components.find(componentItem => componentItem.id === componentId);
        // const colors = [...component.colors, colorItem];

        // this.setState({
        //     currentTemplate: Object.assign({}, this.state.currentTemplate, {
        //         components: this.state.currentTemplate.components.map(componentItem => {
        //             if (componentItem.id === componentId) {
        //                 return Object.assign({}, componentItem, { colors: colors });
        //             }
        //             return componentItem;
        //         })
        //     })
        // });
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


    render() {
        let componentList = [];
        let addComponentBtn, saveBtn;

        if (this.state.isEditable) {
            addComponentBtn = <button className="btn col-12 tooltip" data-tooltip="Add a component" onClick={this.handleComponentAdd}>Add a component</button>;
            saveBtn = <button className="btn btn-primary column col-6 tooltip" data-tooltip="Save template" onClick={this.handleSave}>Save</button>;
        }

        if (this.state.currentTemplate.components && this.state.currentTemplate.components.length) {
            componentList = this.state.currentTemplate.components.map((component, index) => {
                return <PaintTemplateComponent key={index} isEditable={this.state.isEditable} currentComponent={component} handleComponentColorReorder={this.handleComponentColorReorder} handleComponentColorRemove={this.handleComponentColorRemove} handleComponentColorAdd={this.handleComponentColorAdd} handleComponentLabelChange={this.handleComponentLabelChange} handleComponentRemove={this.handleComponentRemove} />
            });
        }

        return (
            <div className="container grid-sm">
                <div className="panel">
                    <div className="panel-header text-center">
                        <figure className="avatar avatar-lg"><span className="icon icon-bookmark mt-2"></span></figure>
                        <div className="panel-title h5 mt-2 relative">
                            {this.state.currentTemplate.label}
                        </div>
                        <div className="panel-subtitle">{this.state.currentTemplate.type}</div>
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
                </div>
            </div>
        )
    }
}
export default PaintTemplateDetail;