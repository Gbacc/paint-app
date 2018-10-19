import React from 'react';
import { shallow, mount } from 'enzyme';
import PaintTemplateDelete from './PaintTemplateDelete.modal';

describe('PaintTemplateDelete test suit', () => {
    it('renders without crashing', () => {
        const props = {
            currentTemplate: {},
            isOpen: true,
            handleClose: jest.fn(),
            handleDelete: jest.fn()
        }
        shallow(<PaintTemplateDelete {...props} />);
    });

    it('renders template informations', () => {
        const props = {
            currentTemplate: {},
            isOpen: true,
            handleClose: jest.fn(),
            handleDelete: jest.fn()
        }
        const wrapper = shallow(<PaintTemplateDelete {...props} />);
        expect(wrapper.find('.modal-title').text()).toEqual('');

        wrapper.setProps({
            currentTemplate: {
                label: 'test'
            },
            isOpen: false,
        });
        expect(wrapper.find('.modal-title').text()).toEqual('test');
    });

    it('callback works as expected', () => {
        const props = {
            currentTemplate: {
                id: 1,
                label: 'test',
                type: 'miniature'
            },
            isOpen: true,
            handleClose: jest.fn(),
            handleDelete: jest.fn()
        }

        const wrapper = shallow(<PaintTemplateDelete {...props} />);
        wrapper.setProps(props);

        wrapper.find('#submitModal').simulate('click');
        expect(props.handleDelete.mock.calls[0][0]).toEqual(props.currentTemplate);

        wrapper.find('#closeModal').simulate('click');
        expect(props.handleClose.mock.calls.length).toBe(1);
    });
});