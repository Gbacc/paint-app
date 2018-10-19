import { getTemplateList } from '../models/template';

export const LIST_TEMPLATE_SUCCESS = 'LIST_TEMPLATE_SUCCESS';
export const LIST_TEMPLATE_ERROR = 'LIST_TEMPLATE_ERROR';
export const ADD_TEMPLATE = 'ADD_TEMPLATE';
export const UPDATE_TEMPLATE = 'UPDATE_TEMPLATE';
export const REMOVE_TEMPLATE = 'REMOVE_TEMPLATE';

export const listTemplate = () => {
    return dispatch => {
        return getTemplateList()
            .then(json => {
                dispatch({
                    type: LIST_TEMPLATE_SUCCESS,
                    payload: json
                });
                return json;
            }).catch(error => {
                dispatch({
                    type: LIST_TEMPLATE_ERROR,
                    payload: error
                });
                return error;
            });
    }
}

export const addTemplate = (template) => {
    // POST 
    template.id = new Date().valueOf();
    return {
        type: ADD_TEMPLATE,
        payload: template
    }
}

export const updateTemplate = (template) => {
    // PUT
    return {
        type: UPDATE_TEMPLATE,
        payload: template
    }
}

export const removeTemplate = (templateId) => {
    // DELETE
    return {
        type: REMOVE_TEMPLATE,
        payload: templateId
    }
}