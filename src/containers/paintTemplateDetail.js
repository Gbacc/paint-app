import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getTemplateById } from '../models/template';

export class PaintTemplateDetail extends Component {

    constructor(props) {
        super(props)

        this.state = {
            currentTemplate: {}
        }

        getTemplateById(this.props.match.params.templateId).then(result => {
            this.setState({
                currentTemplate: result
            })
        });

        this.handleReturn = this.handleReturn.bind(this);
    }

    handleReturn() {
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="container grid-sm">
                <div className="panel">
                    <div className="panel-header text-center">
                        <figure className="avatar avatar-lg"><span className="icon icon-bookmark mt-2"></span></figure>
                        <div className="panel-title h5 mt-2">{this.state.currentTemplate.label}</div>
                        <div className="panel-subtitle">{this.state.currentTemplate.type}</div>
                    </div>
                    <div className="panel-body">
                    </div>
                    <div className="panel-footer">
                        <button className="btn btn-primary col-6 tooltip" data-tooltip="Save template" onClick={this.handleSave}>Save</button>
                        <button className="btn btn-link col-6 tooltip" data-tooltip="Return to list" onClick={this.handleReturn}>Return</button>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { paintTemplates: state.paintTemplates };
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(PaintTemplateDetail);