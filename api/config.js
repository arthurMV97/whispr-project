let pass = require('../personalData.json')
module.exports = {
    'secret': pass.USER_SECRET_CODE,
    'admin-secret': pass.ADMIN_SECRET_CODE
}