import React from 'react';
import { shallow, mount } from 'enzyme';
import PaintTemplateDetailHeader from './paintTemplateDetailHeader';

describe('PaintTemplateDetailHeader test suit', () => {
    const props = {
        isEditable: true,
        currentTemplate: {
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
        },
        handleTemplateLabelChange: jest.fn(),
        handleTemplateTypeChange: jest.fn()
    }

    it('renders readonly template informations', async () => {
        const readonlyProps = Object.assign({}, props, { isEditable: false });
        const wrapper = shallow(<PaintTemplateDetailHeader {...readonlyProps} />);

        expect(wrapper.find('.panel-title').text()).toEqual('Rubricae');
        expect(wrapper.contains(<div className="panel-subtitle">miniature</div>)).toEqual(true);
    });

    it('renders editable template informations', async () => {
        const wrapper = shallow(<PaintTemplateDetailHeader {...props} />);

        expect(wrapper.find('#templateLabel').length).toEqual(1);
        expect(wrapper.find('#templateType').length).toEqual(1);
    });

    it('callback works as expected', () => {
        const wrapper = mount(<PaintTemplateDetailHeader {...props} />);

        // Change label
        const newLabel = 'truc';
        wrapper.find('#templateLabel').simulate('change', { target: { value: newLabel } });
        expect(props.handleTemplateLabelChange.mock.calls[0][0]).toEqual(newLabel);

        const newType = 'base';
        wrapper.find('#templateType').simulate('change', { target: { value: newType } });
        expect(props.handleTemplateTypeChange.mock.calls[0][0]).toEqual(newType);
    });
});
