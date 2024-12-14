const jwt = require('jsonwebtoken');
const JWT_SECRET = 'cd7faa8187cbfb97332a5313f8fe8baed1664a837644f92d58ba07f6e3bb0b460753f10a928f59eb6f38ca063cb7ba22ac68ed8fd1a78ade37494bbb1ca0513d'

const verifyAdminToken =  (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    // console.log(token)

    if (!token) {
        return res.status(401).json({ message: 'Access Denied. No token provided' });
    }
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid credientials' });
        }
        req.user = user;
        next();
    })

}

module.exports = verifyAdminToken;