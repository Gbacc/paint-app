export const getTemplateById = (templateId) => {
    return fetch(window.location.origin + '/template.json')
        .then(response => response.json())
        .then(json => {
            const template = json.find((templateItem) => {
                return templateItem.id == templateId;
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

