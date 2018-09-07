import React, { Component } from 'react';
import { getTemplateById } from '../models/template';
// import { getPaintList } from '../models/paint';
import PaintTemplateComponent from '../components/paintTemplateComponent';
// import PaintTemplateInfo from '../components/paintTemplateInfo.modal';

export class PaintTemplateDetail extends Component {

    constructor(props) {
        super(props)

        this.state = {
            currentTemplate: {
                components: []
            },
            modalIsOpen: false
        }


        // getPaintList().then(result => {
        //     console.log(result)
        // });
        this.handleReturn = this.handleReturn.bind(this);
        // this.handleModalInfoEdit = this.handleModalInfoEdit.bind(this);
        // this.handleModalInfoClose = this.handleModalInfoClose.bind(this);
        // this.handleModalInfoSubmit = this.handleModalInfoSubmit.bind(this);
    }
    componentDidMount() {
        getTemplateById(this.props.match.params.templateId).then(result => {
            this.setState({
                currentTemplate: result
            })
        });
    }

    handleReturn() {
        this.props.history.push('/');
    }

    // handleModalInfoEdit() {
    //     this.setState({
    //         currentTemplate: this.state.currentTemplate,
    //         modalIsOpen: true
    //     })
    // }

    // handleModalInfoClose() {
    //     this.setState({
    //         modalIsOpen: false
    //     });
    // }

    // handleModalInfoSubmit(templateItem) {
    //     this.setState({
    //         currentTemplate: { ...this.state.currentTemplate, label: templateItem.label, type: templateItem.type }
    //     });
    //     console.log(this.state.currentTemplate)
    //     this.handleModalInfoClose();
    // }

    render() {

        let componentList = [];
        if (this.state.currentTemplate.components && this.state.currentTemplate.components.length) {
            componentList = this.state.currentTemplate.components.map((component, index) => {
                return <PaintTemplateComponent key={index} currentComponent={component} />
            });
        }

        return (
            <div className="container grid-sm">
                <div className="panel">
                    <div className="panel-header text-center">
                        <figure className="avatar avatar-lg"><span className="icon icon-bookmark mt-2"></span></figure>
                        <div className="panel-title h5 mt-2 relative">
                            {this.state.currentTemplate.label}
                            {/* <button className="btn btn-sm absolute" onClick={this.handleModalInfoEdit}><i className="icon icon-edit"></i></button> */}
                        </div>
                        <div className="panel-subtitle">{this.state.currentTemplate.type}</div>

                    </div>
                    <div className="panel-body">
                        {componentList}
                    </div>
                    <div className="panel-footer">
                        <button className="btn btn-primary col-6 tooltip" data-tooltip="Save template" onClick={this.handleSave}>Save</button>
                        <button className="btn btn-link col-6 tooltip" data-tooltip="Return to list" onClick={this.handleReturn}>Return</button>
                    </div>
                </div>
                {/* <PaintTemplateInfo currentTemplate={this.state.currentTemplate} isOpen={this.state.modalIsOpen} handleClose={this.handleModalInfoClose} handleSubmit={this.handleModalInfoSubmit} /> */}
            </div>
        )
    }
}
export default PaintTemplateDetail;