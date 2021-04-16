require('dotenv').config();

const jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET = process.env.SECRET_KEY_TOKEN;

module.exports = {
    generateTokenForUser: function(userData) {
        return jwt.sign({
            userId: userData.id,
            isAdmin: userData.isAdmin
        },
        JWT_SIGN_SECRET,
        {
            expiresIn: '6h'
        })
    },
    parseAuthorization: function(authorization) {
        return (authorization != null) ? authorization.replace('Bearer ', '') : null;
    },
    getUserId: function(authorization) {
        let userId = -1;
        let token = module.exports.parseAuthorization(authorization);

        if (token != null) {
            try {
                let jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
                if(jwtToken != null)
                userId = jwtToken.userId;
            } catch(err) { }
        }
        return userId;
    }
}