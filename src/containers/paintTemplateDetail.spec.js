import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import { PaintTemplateDetail } from './paintTemplateDetail';

// import fetchMock from 'fetch-mock'
// fetchMock.get(`*`, JSON.stringify({Rick: `I turned myself into a pickle, Morty!`}))

const fetchPromise = Promise.resolve({
    json: () => Promise.resolve([{
        "id": 2,
        "label": "Rubricae",
        "type": "miniature",
        "components": []
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
});