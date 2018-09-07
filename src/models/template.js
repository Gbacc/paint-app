export const getTemplateById = (templateId) => {
    return fetch(window.location.origin + '/template.json')
        .then(response => response.json())
        .then(json => {
            const template = json.find((templateItem) => {
                return parseInt(templateItem.id, 10) === parseInt(templateId, 10);
            });
            return template;
        })
}

export const getTemplateList = () => {
    return fetch(window.location.origin + '/template.json')
        .then(response => response.json())
        .then(json => {
            return json;
        })
}

