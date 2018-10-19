import React from 'react';
import paintTemplatesReducer from './paintTemplatesReducer';
import { ADD_TEMPLATE, UPDATE_TEMPLATE, REMOVE_TEMPLATE, LIST_TEMPLATE_SUCCESS, LIST_TEMPLATE_ERROR } from '../actions/paintTemplateActions';

describe('paintTemplatesReducer test suit', () => {
    it('list templates', () => {
        const templateList = [
            { "id": 1, "label": "Blood Angel", "type": "miniature" }
        ];
        expect(paintTemplatesReducer(templateList, { type: LIST_TEMPLATE_SUCCESS, payload: templateList })).toEqual(templateList);
    });

    it('adds a template', () => {
        const paintTemplatesBeforeReduce = [
            { "id": 1, "label": "Blood Angel", "type": "miniature" }
        ];
        const newTemplate = { "id": 2, "label": "Test", "type": "miniature" };
        const paintTemplatesAfterReduce = [
            { "id": 1, "label": "Blood Angel", "type": "miniature" },
            { "id": 2, "label": "Test", "type": "miniature" }
        ];
        expect(paintTemplatesReducer(paintTemplatesBeforeReduce, { type: ADD_TEMPLATE, payload: newTemplate })).toEqual(paintTemplatesAfterReduce);
    });

    it('removes a template', () => {
        const paintTemplatesBeforeReduce = [
            { "id": 1, "label": "Blood Angel", "type": "miniature" },
            { "id": 2, "label": "Test", "type": "miniature" }
        ];
        const removeTemplateId = 2;
        const paintTemplatesAfterReduce = [
            { "id": 1, "label": "Blood Angel", "type": "miniature" }
        ];
        expect(paintTemplatesReducer(paintTemplatesBeforeReduce, { type: REMOVE_TEMPLATE, payload: removeTemplateId })).toEqual(paintTemplatesAfterReduce);
    });

    it('updates a template', () => {
        const paintTemplatesBeforeReduce = [
            { "id": 1, "label": "Blood Angel", "type": "miniature" },
            { "id": 2, "label": "Test", "type": "miniature" }
        ];
        const updateTemplate = { "id": 2, "label": "Test2", "type": "base" };
        const paintTemplatesAfterReduce = [
            { "id": 1, "label": "Blood Angel", "type": "miniature" },
            { "id": 2, "label": "Test2", "type": "base" }
        ];
        expect(paintTemplatesReducer(paintTemplatesBeforeReduce, { type: UPDATE_TEMPLATE, payload: updateTemplate })).toEqual(paintTemplatesAfterReduce);
    });
});