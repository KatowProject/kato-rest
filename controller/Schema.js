const fs = require('fs');
const schemas = fs.readdirSync('./database/schema/').map(v => v.replace('.js', ''));

module.exports = (schema, res) => {
    const sc = schemas.find(x => x == schema);
    if (sc) {
        return require('../database/schema/' + sc);
    } else {
        return { success: false, message: 'Schema Not Found' };
    }
}