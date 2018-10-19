import { ADD_TEMPLATE, UPDATE_TEMPLATE, REMOVE_TEMPLATE, LIST_TEMPLATE_SUCCESS, LIST_TEMPLATE_ERROR } from '../actions/paintTemplateActions';

const initialState = [];

export default function (state = initialState, action) {
    switch (action.type) {
        case LIST_TEMPLATE_SUCCESS:
            return action.payload;
        case LIST_TEMPLATE_ERROR:
            return [];
        case ADD_TEMPLATE:
            return [...state, action.payload];
        case UPDATE_TEMPLATE:
            const updatedItems = state.map(templateItem => {
                if (templateItem.id === action.payload.id) {
                    return Object.assign({}, action.payload);
                }
                return templateItem;
            })
            return updatedItems;
        case REMOVE_TEMPLATE:
            const leftItems = state.filter(templateItem => {
                if (templateItem.id !== action.payload) {
                    return templateItem;
                }
                return null;
            })
            return leftItems
        default:
            return state;
    }
}