import React from 'react';
import { shallow, mount } from 'enzyme';
import PaintTemplateDetailComponent from './paintTemplateDetailComponent';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

describe('PaintTemplateDetailComponent test suit', () => {
    it('renders without crashing', () => {
        const props = {
            isEditable: false,
            currentComponent: {},
            handleComponentColorReorder: jest.fn(),
            handleComponentColorRemove: jest.fn(),
            handleComponentLabelChange: jest.fn(),
            handleComponentRemove: jest.fn(),
            askForComponentColorAdd: jest.fn()
        }

        shallow(<PaintTemplateDetailComponent {...props} />);
    });

    it('renders template informations', () => {
        const props = {
            isEditable: false,
            currentComponent: {},
            handleComponentColorReorder: jest.fn(),
            handleComponentColorRemove: jest.fn(),
            handleComponentLabelChange: jest.fn(),
            handleComponentRemove: jest.fn(),
            askForComponentColorAdd: jest.fn()
        }

        const wrapper = mount(<PaintTemplateDetailComponent {...props} />);

        // Empty informations
        expect(wrapper.find('.tile-title').length).toBe(0);
        expect(wrapper.find('.tile-subtitle').length).toBe(0);

        // Non empty informations
        wrapper.setProps({
            currentComponent: {
                "id": 1,
                "label": "Metals",
                "colors": [
                    {
                        "id": 18,
                        "label": "Leadbelcher (Metal)",
                        "type": "Base",
                        "color": "#888D8F"
                    }
                ]
            }
        });
        expect(wrapper.find('.tile-title').text()).toEqual('Leadbelcher (Metal)');
        expect(wrapper.find('.tile-subtitle').text()).toEqual('Base');
    });

    it('can show or add/edit data', () => {
        const props = {
            isEditable: false,
            currentComponent: {
                "id": 1,
                "label": "Metals",
                "colors": [
                    {
                        "id": 18,
                        "label": "Leadbelcher (Metal)",
                        "type": "Base",
                        "color": "#888D8F"
                    }
                ]
            },
            handleComponentColorReorder: jest.fn(),
            handleComponentColorRemove: jest.fn(),
            handleComponentLabelChange: jest.fn(),
            handleComponentRemove: jest.fn(),
            askForComponentColorAdd: jest.fn()
        }

        const wrapper = mount(<PaintTemplateDetailComponent {...props} />);

        // Show mode
        expect(wrapper.find('h5').text()).toMatch(props.currentComponent.label);
        expect(wrapper.find('#addColor').length).toBe(0);
        expect(wrapper.find('#removeComponent').length).toBe(0);
        expect(wrapper.find('#deleteColor').length).toBe(0);

        // Edit mode
        wrapper.setProps({
            isEditable: true
        });
        expect(wrapper.find('#componentLabel').type()).toEqual('input');
        expect(wrapper.find('#addColor').length).toBe(1);
        expect(wrapper.find('#removeComponent').length).toBe(1);
        expect(wrapper.find('#deleteColor').length).toBeGreaterThanOrEqual(1);
    });

    it('callback works as expected', () => {
        const props = {
            isEditable: true,
            currentComponent: {
                "id": 1,
                "label": "Metals",
                "colors": [
                    {
                        "id": 18,
                        "label": "Leadbelcher (Metal)",
                        "type": "Base",
                        "color": "#888D8F"
                    }
                ]
            },
            handleComponentColorReorder: jest.fn(),
            handleComponentColorRemove: jest.fn(),
            handleComponentLabelChange: jest.fn(),
            handleComponentRemove: jest.fn(),
            askForComponentColorAdd: jest.fn()
        }

        const wrapper = mount(<PaintTemplateDetailComponent {...props} />);

        // Add a color
        wrapper.find('#addColor').simulate('click');
        expect(props.askForComponentColorAdd.mock.calls[0][0]).toEqual(props.currentComponent.id);

        // Remove the component
        wrapper.find('#removeComponent').simulate('click');
        expect(props.askForComponentColorAdd.mock.calls[0][0]).toEqual(props.currentComponent.id);

        // Change label
        const newLabel = 'truc';
        wrapper.find('#componentLabel').simulate('change', { target: { value: newLabel } });
        expect(props.handleComponentLabelChange.mock.calls[0][0]).toEqual(props.currentComponent.id);
        expect(props.handleComponentLabelChange.mock.calls[0][1]).toEqual(newLabel);

        // Delete a color
        wrapper.find('#deleteColor').simulate('click');
        expect(props.handleComponentColorRemove.mock.calls[0][0]).toEqual(props.currentComponent.id);
        expect(props.handleComponentColorRemove.mock.calls[0][1]).toEqual(props.currentComponent.colors[0].id);

        // TODO reorder with react-beautiful-dnd
    });
});
