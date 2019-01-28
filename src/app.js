import React from 'react';
import PaintTemplateList from './containers/paintTemplateList';
import PaintTemplateDetail from './containers/paintTemplateDetail';
import ColorPicker from './containers/colorPicker';
import { BrowserRouter as Router, Route } from "react-router-dom";

import './app.scss';

const App = () => {
    return (
        <Router>
            <div id="app" className="container grid-md">
                <div id="menu">
                    <i className="icon icon-menu icon-2x"></i>
                    <span className="spacer"></span>
                    <a className="btn btn-small" href="https://github.com/Gbacc/paint-app" target="_blank">GitHub</a>
                </div>
                <div id="container">
                    <Route exact path="/" component={PaintTemplateList} />
                    <Route path="/template/:templateId/:status" exact component={PaintTemplateDetail} />
                    <Route path="/template/:status" exact component={PaintTemplateDetail} />
                    <Route path="/color-picker" exact component={ColorPicker} />
                </div>
                <div id="footer">
                    <span className="text-center text-gray">Designed and built by <a href="https://github.com/Gbacc/paint-app" target="_blank">Gbacc</a></span>
                </div>
            </div>
        </Router>
    )
}

export default App;