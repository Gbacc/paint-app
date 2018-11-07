import { LIST_COLOR_SUCCESS, LIST_COLOR_ERROR } from '../actions/colorActions';

const initialState = {};

export default function (state = initialState, action) {
    switch (action.type) {
        case LIST_COLOR_SUCCESS:
            let colorListByType = {};
            action.payload.forEach(colorItem => {
                if (!colorListByType[colorItem.type]) {
                    colorListByType[colorItem.type] = [];
                }
                colorListByType[colorItem.type].push(colorItem);
            });

            return colorListByType;
        case LIST_COLOR_ERROR:
            return {};
        default:
            return state;
    }
}