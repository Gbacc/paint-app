import React from 'react';
import PaintTemplateList from './containers/paintTemplateList';
import PaintTemplateDetail from './containers/paintTemplateDetail';
import ColorPicker from './containers/colorPicker';
import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
    return (
        <Router>
            <div className="container grid-sm">
                <Route exact path="/" component={PaintTemplateList} />
                <Route path="/template/:templateId/:status" exact component={PaintTemplateDetail} />
                <Route path="/template/:status" exact component={PaintTemplateDetail} />
                <Route path="/color-picker" exact component={ColorPicker} />
            </div>
        </Router>
    )
}

export default App;