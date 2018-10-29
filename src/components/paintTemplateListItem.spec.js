import React from 'react';
import { shallow } from 'enzyme';
import PaintTemplateListItem from './paintTemplateListItem';

describe('PaintTemplateListItem test suit', () => {
    it('renders without crashing', () => {
        const props = {
            currentTemplate: {}
        }
        
        shallow(<PaintTemplateListItem {...props} />);        
    });

    it('renders template informations', () => {
        const props = {
            currentTemplate: {},
            handleEdit: jest.fn(),
            handleSelect: jest.fn(),
            askForDelete: jest.fn()
        }

        const wrapper = shallow(<PaintTemplateListItem {...props} />);

        // Empty informations
        expect(wrapper.find('.tile-title').text()).toEqual('');
        expect(wrapper.find('.tile-subtitle').text()).toEqual('');

        // Non empty informations
        wrapper.setProps({
            currentTemplate: {
                id: 1,
                label: 'test',
                type: 'miniature'
            }
        });
        expect(wrapper.find('.tile-title').text()).toEqual('test');
        expect(wrapper.find('.tile-subtitle').text()).toEqual('miniature');
    });

    it('callback works as expected', () => {
        const props = {
            currentTemplate: {
                id: 1,
                label: 'test',
                type: 'miniature'
            },
            handleEdit: jest.fn(),
            handleSelect: jest.fn(),
            askForDelete: jest.fn()
        }

        const wrapper = shallow(<PaintTemplateListItem {...props} />);

        wrapper.find('#editTemplate').simulate('click');
        expect(props.handleEdit.mock.calls[0][0]).toEqual(props.currentTemplate);

        wrapper.find('#selectTemplate').simulate('click');
        expect(props.handleSelect.mock.calls[0][0]).toEqual(props.currentTemplate);

        wrapper.find('#deleteTemplate').simulate('click');
        expect(props.askForDelete.mock.calls[0][0]).toEqual(props.currentTemplate);
    });
});