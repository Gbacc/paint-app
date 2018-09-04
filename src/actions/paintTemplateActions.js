export const LIST_TEMPLATE_SUCCESS = 'LIST_TEMPLATE_SUCCESS';
export const LIST_TEMPLATE_ERROR = 'LIST_TEMPLATE_ERROR';
export const ADD_TEMPLATE = 'ADD_TEMPLATE';
export const UPDATE_TEMPLATE = 'UPDATE_TEMPLATE';
export const REMOVE_TEMPLATE = 'REMOVE_TEMPLATE';

const listTemplateSuccess = (templateList) => {
    return {
        type: LIST_TEMPLATE_SUCCESS,
        payload: templateList
    }
}

const listTemplateError = (error) => {
    return {
        type: LIST_TEMPLATE_ERROR,
        payload: error
    }
}

export const listTemplate = () => {
    return dispatch => {
        return fetch('template.json')
            .then(response => response.json())
            .then(json => {
                dispatch(listTemplateSuccess(json));
                return json;
            }).catch(error => {
                dispatch(listTemplateError(error));
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

export const removeTemplate = (template) => {
    // DELETE
    return {
        type: REMOVE_TEMPLATE,
        payload: template
    }
}