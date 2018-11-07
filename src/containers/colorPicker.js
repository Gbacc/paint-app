import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { listColors } from '../actions/colorActions';
import PropTypes from 'prop-types';
import './colorPicker.scss';

export class ColorPicker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedColorType: null,
            filterColorLabel: ''
        }

        this.selectColorType = this.selectColorType.bind(this);
    }

    componentDidMount() {
        this.props.listColors();
    }

    selectColorType(colorType) {
        this.setState({
            selectedColorType: colorType
        })
    }

    filterColorByName(colorName) {
        this.setState({
            filterColorLabel: colorName.toLowerCase()
        })
    }

    render() {
        let paintListToShow;
        const colorTypes = Object.keys(this.props.colorList || {});
        const selectedColorType = this.state.selectedColorType || colorTypes[0];

        if (this.props.colorList && this.props.colorList[selectedColorType]) {
            const filteredPaintList = this.props.colorList[selectedColorType].filter(color => color.label.toLowerCase().includes(this.state.filterColorLabel));

            paintListToShow = filteredPaintList.map(color => {
                return <div key={color.id} className="tile tile-centered col-4 col-sm-6 c-hand" onClick={() => this.props.handleComponentColorAdd(color)}>
                    <div className="tile-icon">
                        <figure className="avatar" style={{ backgroundColor: color.color }}>
                        </figure>
                    </div>
                    <div className="tile-content">
                        <div className="tile-title">{color.label}</div>
                        <div className="tile-subtitle text-gray">{color.color}</div>
                    </div>
                    <div className="tile-action">
                        <button className="btn btn-link">
                            <i className="icon icon-check"></i>
                        </button>
                    </div>
                </div>
            })
        }

        return (
            <div id="colorPicker">
                <ul className="tab">
                    {
                        colorTypes.map(colorTypeItem => {
                            return <li key={colorTypeItem} className={'tab-item ' + (selectedColorType === colorTypeItem ? 'active' : '')}>
                                <a href={'#' + colorTypeItem} onClick={() => this.selectColorType(colorTypeItem)}>{colorTypeItem}</a>
                            </li>
                        })
                    }
                    <li className="tab-item tab-action">
                        <div className="input-group input-inline">
                            <input className="form-input input-sm" type="text" placeholder="search" onChange={(event) => this.filterColorByName(event.target.value)} />
                            <button className="btn btn-primary btn-sm input-group-btn">Search</button>
                        </div>
                    </li>
                </ul>
                <div className="columns mt-2">
                    {paintListToShow}
                </div>
            </div>
        )
    }
}

ColorPicker.propTypes = {
    handleComponentColorAdd: PropTypes.func
};

function mapStateToProps(state) {
    return { colorList: state.colorList };
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({ listColors }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(ColorPicker);