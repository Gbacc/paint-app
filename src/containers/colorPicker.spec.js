import React from 'react';
import { shallow } from 'enzyme';
import { ColorPicker } from './colorPicker';

describe('ColorPicker test suit', () => {
    it('renders without crashing', () => {
        const props = {
            listColors: jest.fn()
        }
        shallow(<ColorPicker {...props} />);

        expect(props.listColors).toBeCalled();
    });

    it('renders template informations', () => {
        const props = {
            listColors: jest.fn(),
            colorList: {
                'Base': [
                    {
                        "id": 1,
                        "label": "Abaddon Black",
                        "type": "Base",
                        "color": "#231F20"
                    }
                ]
            }
        }
        const wrapper = shallow(<ColorPicker {...props} />);

        expect(wrapper.find('.tab-item').length).toEqual(2);
        expect(wrapper.find('.tile').length).toEqual(1);
        expect(wrapper.find('.tile-title').text()).toEqual('Abaddon Black');
        expect(wrapper.find('.tile-subtitle').text()).toEqual('#231F20');
    });

    it('can filter colors', () => {
        const props = {
            listColors: jest.fn(),
            colorList: {
                'Base': [
                    {
                        "id": 1,
                        "label": "Abaddon Black",
                        "type": "Base",
                        "color": "#231F20"
                    }, {
                        "id": 2,
                        "label": "Averland Sunset",
                        "type": "Base",
                        "color": "#FDB825"
                    }
                ]
            }
        }
        const wrapper = shallow(<ColorPicker {...props} />);

        // All elements shown
        expect(wrapper.find('.tile').length).toEqual(2);

        // Filter elements
        wrapper.setState({ filterColorLabel: 'black' });
        expect(wrapper.find('.tile').length).toEqual(1);
    });

    it('callback works as expected', () => {
        const props = {
            listColors: jest.fn(),
            handleComponentColorAdd: jest.fn(),
            colorList: {
                'Base': [
                    {
                        "id": 1,
                        "label": "Abaddon Black",
                        "type": "Base",
                        "color": "#231F20"
                    }
                ]
            }
        }
        const wrapper = shallow(<ColorPicker {...props} />);
        
        // Select a color
        wrapper.find('.tile').simulate('click');
        expect(props.handleComponentColorAdd.mock.calls[0][0]).toEqual(props.colorList['Base'][0]);
    });
});