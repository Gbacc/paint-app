import React from 'react';
import PaintTemplateList from './containers/paintTemplateList';
import PaintTemplateDetail from './containers/paintTemplateDetail';
import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
    return (
        <Router>
            <div>
                <Route exact path="/" component={PaintTemplateList} />
                <Route path="/template/:templateId" component={PaintTemplateDetail} />
            </div>
        </Router>
    )
}

export default App;