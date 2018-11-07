import React from 'react';
import PaintTemplateComponent from '../components/paintTemplateComponent';
import { shallow } from 'enzyme';
import { PaintTemplateDetail } from './paintTemplateDetail';
import Modal from 'react-modal';

// import fetchMock from 'fetch-mock'
// fetchMock.get(`*`, JSON.stringify({Rick: `I turned myself into a pickle, Morty!`}))

const fetchPromise = Promise.resolve({
    json: () => Promise.resolve([{
        "id": 2,
        "label": "Rubricae",
        "type": "miniature",
        "components": [
            {
                "id": 1,
                "label": "Base armor",
                "colors": [
                    {
                        "id": 21,
                        "label": "Mephiston Red",
                        "type": "Base",
                        "color": "#9A1115",
                        "order": 1
                    }
                ]
            }
        ]
    }])
})
global.fetch = () => fetchPromise

describe('PaintTemplateDetail test suit', () => {
    it('renders without crashing', () => {
        const props = {
            match: {
                params: {
                    templateId: 2
                }
            }
        }
        shallow(<PaintTemplateDetail {...props} />);
    });

    it('renders template informations', async () => {
        const props = {
            match: {
                params: {
                    templateId: 2
                }
            }
        }
        const wrapper = shallow(<PaintTemplateDetail {...props} />);

        await wrapper.instance().componentDidMount()
        await new Promise(resolve => setTimeout(resolve, 1000))

        expect(wrapper.find('.panel-title').text()).toEqual('Rubricae');
        expect(wrapper.contains(<div className="panel-subtitle">miniature</div>)).toEqual(true);
    });

    it('can update a template', async () => {
        const props = {
            match: {
                params: {}
            }
        }
        const wrapper = shallow(<PaintTemplateDetail {...props} />);

        // Change label
        wrapper.instance().handleTemplateLabelChange('test');
        expect(wrapper.state().currentTemplate.label).toEqual('test');

        // Change type
        wrapper.instance().handleTemplateTypeChange('base');
        expect(wrapper.state().currentTemplate.type).toEqual('base');
    });

    it('can add/update/remove a component', () => {
        const props = {
            match: {
                params: {}
            }
        }
        const wrapper = shallow(<PaintTemplateDetail {...props} />);

        // Add a component
        wrapper.instance().handleComponentAdd();
        expect(wrapper.find(PaintTemplateComponent).length).toEqual(1);

        const newComponent = wrapper.state().currentTemplate.components[0];
        expect(newComponent.state).toEqual('new');

        // Change label
        wrapper.instance().handleComponentLabelChange(newComponent.id, 'test');
        const updatedComponent = wrapper.state().currentTemplate.components[0];
        expect(updatedComponent.label).toEqual('test');

        // Remove component
        wrapper.instance().handleComponentRemove(updatedComponent.id);
        expect(wrapper.find(PaintTemplateComponent).length).toEqual(0);
    });

    it('can add/remove/reorder a color inside a component', async () => {
        const props = {
            match: {
                params: {
                    templateId: 2
                }
            }
        }

        const newColor = {
            "id": 7,
            "label": "Castellan Green",
            "type": "Base",
            "color": "#314821"
        };

        const wrapper = shallow(<PaintTemplateDetail {...props} />);

        await wrapper.instance().componentDidMount()
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Add color modal is closed
        expect(wrapper.find(Modal).props().isOpen).toBe(false);

        // Add color modal is open
        const firstComponent = wrapper.state().currentTemplate.components[0];
        wrapper.instance().askForComponentColorAdd(firstComponent.id);
        expect(wrapper.find(Modal).props().isOpen).toBe(true);

        // Confirm modal is closed and removeTemplate action is called
        wrapper.instance().handleComponentColorAdd(newColor);
        const updatedComponent = wrapper.state().currentTemplate.components[0];
        expect(wrapper.find(Modal).props().isOpen).toBe(false);
        expect(updatedComponent.colors.length).toEqual(2);

        // TODO : component reorder

        // Delete a color
        wrapper.instance().handleComponentColorRemove(updatedComponent.id, updatedComponent.colors[0].id, 0);
        const updatedColorComponent = wrapper.state().currentTemplate.components[0].colors;
        expect(updatedColorComponent.length).toEqual(1);
    });
});