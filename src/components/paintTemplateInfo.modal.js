import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

class PaintTemplateInfo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentTemplate: {
                label: ''
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            currentTemplate: nextProps.currentTemplate
        });
    }

    handleChange(event) {
        let currentTemplate = Object.assign({}, this.state.currentTemplate);
        currentTemplate[event.target.name] = event.target.value;

        this.setState({
            currentTemplate: currentTemplate
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.handleSubmit(this.state.currentTemplate);
    }

    render() {
        return <Modal className="modal active" isOpen={this.props.isOpen}>
            <div className="modal-overlay"></div>
            <div className="modal-container">
                <form onSubmit={this.handleSubmit}>
                    <div className="modal-header">
                        <div className="modal-title h5">Template info</div>
                    </div>
                    <div className="modal-body">
                        <div className="content">
                            <div className="form-group">
                                <label className="form-label" htmlFor="label">Label</label>
                                <input className="form-input" type="text" id="label" name="label" value={this.state.currentTemplate.label} onChange={this.handleChange}></input>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="submit" className="btn btn-primary">Submit</button>
                        <button className="btn btn-link" onClick={this.props.handleClose}>Close</button>
                    </div>
                </form>
            </div>
        </Modal >
    }
}

PaintTemplateInfo.propTypes = {
    currentTemplate: PropTypes.object,
    isOpen: PropTypes.bool,
    handleClose: PropTypes.func,
    handleSubmit: PropTypes.func
};

export default PaintTemplateInfo;