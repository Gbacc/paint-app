import React from 'react';
import { shallow, mount } from 'enzyme';
import PaintTemplateComponent from './paintTemplateComponent';

describe('PaintTemplateComponent test suit', () => {
    it('renders without crashing', () => {
        const props = {
            currentComponent: {}
        }
        mount(<PaintTemplateComponent {...props} />);
    });

    it('renders template informations', () => {
        // const props = {
        //     currentComponent: {
        //         "id": 1,
        //         "label": "Test component",
        //         "colors": [
        //             {
        //                 "id": 21,
        //                 "label": "Mephiston Red",
        //                 "type": "Base",
        //                 "color": "#9A1115"
        //             }
        //         ]
        //     }
        // }
        // const wrapper = mount(<PaintTemplateComponent {...props} />);
        // expect(wrapper.contains(<h5>Test component</h5>)).toBe(true);
        // expect(wrapper.contains(<div className="tile-title">Mephiston Red</div>)).toBe(true);
        // expect(wrapper.contains(<div className="tile-subtitle text-gray">Base</div>)).toBe(true);
        // expect(wrapper.find('.avatar').prop('style').backgroundColor).toEqual("#9A1115");
    });
});