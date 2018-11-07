import React from 'react';
import colorReducer from './colorReducer';
import { LIST_COLOR_SUCCESS, LIST_COLOR_ERROR } from '../actions/colorActions';

describe('colorReducer test suit', () => {
    it('list colors', () => {
        const colorList = [
            {
                "id": 1,
                "label": "Abaddon Black",
                "type": "Base",
                "color": "#231F20"
            }
        ];

        const colorListByType = {
            'Base': colorList
        }
        expect(colorReducer(colorList, { type: LIST_COLOR_SUCCESS, payload: colorList })).toEqual(colorListByType);
    });
});