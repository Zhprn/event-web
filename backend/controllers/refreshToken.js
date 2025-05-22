const db = require('../models')
const User = db.user
const jwt = require('jsonwebtoken')

exports.refreshToken = async(req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken
        if(!refreshToken) return res.status(401); 
        const user = await User.findAll({
            where : {
                refresh_token : refreshToken
            }
        });
        if (!user[0]) return res.sendStatus(403);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if(err) return res.sendStatus(403);
            const userId = user[0].id;
            const username = user[0].username;
            const email = user[0].email;
            const accesToken = jwt.sign({userId, username, email}, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn : '15s' 
            });
            res.json({ accesToken })

        });
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}