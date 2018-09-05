import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { listTemplate, removeTemplate } from '../actions/paintTemplateActions';
import PaintTemplateInfo from '../components/paintTemplateInfo.modal';
import PaintTemplateListItem from '../components/paintTemplateListItem';

export class PaintTemplateList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentTemplate: {},
            modalIsOpen: false
        }

        this.props.listTemplate()
        //.then(result => console.log(result));

        this.handleEdit = this.handleEdit.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleDelete(templateItem) {
        this.setState({
            currentTemplate: {
                label: ''
            },
            modalIsOpen: false
        })
        this.props.removeTemplate(templateItem);
    }
    handleEdit(templateItem) {
        this.setState({
            currentTemplate: templateItem,
            modalIsOpen: true
        })
    }
    handleAdd() {
        this.setState({
            currentTemplate: {
                label: ''
            },
            modalIsOpen: true
        })
    }

    handleClose() {
        this.setState({
            modalIsOpen: false
        });
    }

    render() {
        const paintTemplatesList = this.props.paintTemplates.map((templateItem, index) => {
            return <PaintTemplateListItem key={index} currentTemplate={templateItem} handleEdit={this.handleEdit} handleDelete={this.handleDelete} />
        });
        return <div className="container grid-sm">
            <div className="panel">
                <div className="panel-header text-center">
                    <figure className="avatar avatar-lg"><span className="icon icon-bookmark mt-2"></span></figure>
                    <div className="panel-title h5 mt-2">Paint templates</div>
                    <div className="panel-subtitle">{this.props.paintTemplates.length} templates</div>
                </div>
                <div className="panel-body">
                    {paintTemplatesList}
                </div>
                <div className="panel-footer">
                    <button className="btn btn-primary btn-block tooltip" data-tooltip="Add new template" onClick={this.handleAdd}>New</button>
                </div>
            </div>
            <PaintTemplateInfo currentTemplate={this.state.currentTemplate} isOpen={this.state.modalIsOpen} handleClose={this.handleClose} />
        </div>;
    }
}

function mapStateToProps(state) {
    return { paintTemplates: state.paintTemplates };
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({ removeTemplate, listTemplate }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(PaintTemplateList);