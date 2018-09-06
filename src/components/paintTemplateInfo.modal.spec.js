import React from 'react';
import { shallow, mount } from 'enzyme';
import PaintTemplateInfo from './paintTemplateInfo.modal';

describe('PaintTemplateInfo test suit', () => {
    it('renders without crashing', () => {
        const props = {
            currentTemplate: {},
            isOpen: true,
            handleClose: jest.fn(),
            handleSubmit: jest.fn()
        }
        shallow(<PaintTemplateInfo {...props} />);
    });

    it('renders template informations', () => {
        const props = {
            currentTemplate: {},
            isOpen: true,
            handleClose: jest.fn(),
            handleSubmit: jest.fn()
        }
        const wrapper = shallow(<PaintTemplateInfo {...props} />);
        expect(wrapper.find('#label').prop('value')).toEqual('');

        wrapper.setProps({
            currentTemplate: {
                label: 'test'
            },
            isOpen: false,
        });
        expect(wrapper.find('#label').prop('value')).toEqual('test');
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
            handleSubmit: jest.fn()
        }

        const wrapper = shallow(<PaintTemplateInfo {...props} />);
        wrapper.setProps(props);

        wrapper.find('form').simulate('submit', { preventDefault () {} });
        expect(props.handleSubmit.mock.calls[0][0]).toEqual(props.currentTemplate);

        wrapper.find('.modal-footer .btn-link').simulate('click');
        expect(props.handleClose.mock.calls.length).toBe(1);
    });
});