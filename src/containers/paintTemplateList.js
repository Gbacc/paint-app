import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { listTemplate, removeTemplate, addTemplate, updateTemplate } from '../actions/paintTemplateActions';
import PaintTemplateDelete from '../components/paintTemplateDelete.modal';
import PaintTemplateListItem from '../components/paintTemplateListItem';

export class PaintTemplateList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentTemplate: {},
            modalIsOpen: false
        }

        this.handleEdit = this.handleEdit.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.askForDelete = this.askForDelete.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    componentDidMount() {
        this.props.listTemplate();
        //.then(result => console.log(result));
    }

    handleSelect(template) {
        this.props.history.push('/template/' + template.id+ '/show');
    }

    handleEdit(template) {
        this.props.history.push('/template/' + template.id + '/edit');
    }

    handleAdd() {
        this.props.history.push('/template/add');
    }

    askForDelete(template) {
        this.setState({
            currentTemplate: template,
            modalIsOpen: true
        })
    }

    handleDelete(template) {
        this.setState({
            currentTemplate: {},
            modalIsOpen: false
        })
        this.props.removeTemplate(template.id);
    }

    handleClose() {
        this.setState({
            currentTemplate: {},
            modalIsOpen: false
        });
    }

    render() {
        const paintTemplatesList = this.props.paintTemplates.map((templateItem, index) => {
            return <PaintTemplateListItem key={templateItem.id} currentTemplate={templateItem} handleEdit={this.handleEdit} askForDelete={this.askForDelete} handleSelect={this.handleSelect} />
        });
        return (
            <div>
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
                <PaintTemplateDelete currentTemplate={this.state.currentTemplate} isOpen={this.state.modalIsOpen} handleClose={this.handleClose} handleDelete={this.handleDelete} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { paintTemplates: state.paintTemplates };
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({ removeTemplate, listTemplate, updateTemplate, addTemplate }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(PaintTemplateList);