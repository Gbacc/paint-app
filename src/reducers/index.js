import { combineReducers } from 'redux';
import paintTemplatesReducer from './paintTemplatesReducer';

const allReducers = combineReducers({
    paintTemplates: paintTemplatesReducer
});

export default allReducers