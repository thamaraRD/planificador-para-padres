const { registerParent, loginParent, greeting, logout } = require("../controllers/parent.controller");
const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {
    app.post('/api/parent/register', registerParent);
    app.post('/api/parent/login', loginParent);
    app.get('/api/parent/greeting', authenticate, greeting);
    app.post('/api/parent/logout', logout);
};