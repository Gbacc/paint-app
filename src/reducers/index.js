import { combineReducers } from 'redux';
import paintTemplatesReducer from './paintTemplatesReducer';
import colorReducer from './colorReducer';

const allReducers = combineReducers({
    paintTemplates: paintTemplatesReducer,
    colorList: colorReducer
});

export default allReducers