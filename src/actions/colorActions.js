import { getPaintList } from '../models/paint';

export const LIST_COLOR_SUCCESS = 'LIST_COLOR_SUCCESS';
export const LIST_COLOR_ERROR = 'LIST_COLOR_ERROR';

export const listColors = () => {
    return dispatch => {
        return getPaintList()
            .then(json => {
                dispatch({
                    type: LIST_COLOR_SUCCESS,
                    payload: json
                });
                return json;
            }).catch(error => {
                dispatch({
                    type: LIST_COLOR_ERROR,
                    payload: error
                });
                return error;
            });
    }
}
