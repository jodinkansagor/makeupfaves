const request = require('superagent');

const URL = 'http://makeup-api.herokuapp.com/api/v1/products.json';

module.exports = {
    async getComputedStyle(search, page) {
        page = page || 1;
        search = search || '';

        const response = await request
            .get(URL)
            .query({ page, search });

        return response.body.map(transformMakeup);
    }
};

function transformMakeup(makeup) {
    makeup.isFavorite = false;
    makeup.id = makeup.idMakeup;
    return makeup;
}