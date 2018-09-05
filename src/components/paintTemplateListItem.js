import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class PaintTemplateListItem extends Component {

    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    handleDelete() {
        this.props.handleDelete(this.props.currentTemplate);
    }

    handleEdit() {
        this.props.handleEdit(this.props.currentTemplate);
    }

    render() {
        return <div className="tile tile-centered">
            <div className="tile-icon">
                <div className="btn btn-primary">
                    <i className="icon icon-photo centered"></i>
                </div>
            </div>
            <div className="tile-content">
                <div className="tile-title">{this.props.currentTemplate.label}</div>
                <div className="tile-subtitle text-gray">{this.props.currentTemplate.type}</div>
            </div>
            <div className="tile-action">
                <button className="btn btn-link tooltip tooltip-left" data-tooltip="Edit template" onClick={this.handleEdit}>
                    <i className="icon icon-edit"></i>
                </button>
                <button className="btn btn-link tooltip tooltip-left" data-tooltip="Delete template" onClick={this.handleDelete}>
                    <i className="icon icon-delete"></i>
                </button>
            </div>
        </div>
    }
}


PaintTemplateListItem.propTypes = {
    currentTemplate: PropTypes.object,
    handleDelete: PropTypes.func,
    handleEdit: PropTypes.func,
};

function mapStateToProps(state) {
    return {};
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(PaintTemplateListItem);