import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import { PaintTemplateList } from './paintTemplateList';

describe('PaintTemplateList test suit', () => {
    it('renders without crashing', () => {
        const props = {
            listTemplate : jest.fn(),
            removeTemplate : jest.fn(),
            paintTemplates: []
        }
        shallow(<PaintTemplateList {...props}/>);
    });
});