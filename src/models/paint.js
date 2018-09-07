export const getPaintById = (paintId) => {
    return fetch(window.location.origin + '/paints.json')
        .then(response => response.json())
        .then(json => {
            const paint = json.find((paintItem) => {
                return parseInt(paintItem.id, 10) === parseInt(paintId, 10);
            });
            return paint;
        })
}

export const getPaintList = () => {
    return fetch(window.location.origin + '/paints.json')
        .then(response => response.json())
        .then(json => {
            return json;
        })
}

