import React from 'react';
import { shallow } from 'enzyme';
import { PaintTemplateList } from './paintTemplateList';
import PaintTemplateListItem from '../components/paintTemplateListItem';
import PaintTemplateDelete from '../components/paintTemplateDelete.modal';

describe('PaintTemplateList test suit', () => {
    it('renders without crashing', () => {
        const props = {
            listTemplate: jest.fn(),
            removeTemplate: jest.fn(),
            paintTemplates: []
        }
        
        shallow(<PaintTemplateList {...props} />);
        expect(props.listTemplate).toBeCalled();
    });

    it('renders template informations', () => {
        const props = {
            listTemplate: jest.fn(),
            removeTemplate: jest.fn(),
            paintTemplates: []
        }

        const wrapper = shallow(<PaintTemplateList {...props} />);

        // No template shown
        expect(wrapper.find(PaintTemplateListItem).length).toBe(0);
        expect(wrapper.find('.panel-subtitle').text()).toMatch(/0/);

        // One template shown
        wrapper.setProps({
            paintTemplates: [
                {
                    id: 1,
                    label: 'test',
                    type: 'miniature'
                }
            ]
        });
        expect(wrapper.find(PaintTemplateListItem).length).toBe(1);
        expect(wrapper.find('.panel-subtitle').text()).toMatch(/1/);
    });

    it('can remove a template', () => {
        const props = {
            listTemplate: jest.fn(),
            removeTemplate: jest.fn(),
            paintTemplates: [{
                id: 1,
                label: 'test',
                type: 'miniature'
            }]
        }

        const wrapper = shallow(<PaintTemplateList {...props} />);

        // Confirm modal is closed
        expect(wrapper.find(PaintTemplateDelete).props().isOpen).toBe(false);

        // Confirm modal is open
        wrapper.instance().askForDelete(props.paintTemplates[0]);
        expect(wrapper.find(PaintTemplateDelete).props().isOpen).toBe(true);

        // Confirm modal is closed and removeTemplate action is called
        wrapper.instance().handleDelete(props.paintTemplates[0]);
        expect(wrapper.find(PaintTemplateDelete).props().isOpen).toBe(false);
        expect(props.removeTemplate.mock.calls[0][0]).toEqual(props.paintTemplates[0].id);
    });
});