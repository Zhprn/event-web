const db = require('../models')
const User = db.user
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.getUser = async(req, res) => {
    try {
        const users = await User.findAll({
            attributes : ['id', 'username', 'email']
        });
        res.status(200).json({users});
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

exports.register = async(req, res) => {
    try {
    const {username, email, password} = req.body;
    const salt = await bcrypt.genSalt();
    const haspassword = await bcrypt.hash(password, salt)
        const users = await User.create({
            username : username,
            email : email,
            password : haspassword
        })
        res.status(200).json({users})
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

exports.login = async (req, res) => {
    try {
        const user = await User.findAll({
            where : {
                email : req.body.email
            }
        })
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if(!match) return res.status(400).json({message : "wrong password!!"})
        const userId = user[0].id;
        const username = user[0].username;
        const email = user[0].email;
        const accestoken = jwt.sign({userId, username, email}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn : '20s'
        });
        const refreshtoken = jwt.sign({userId, username, email}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn : '1d'
        });
        await User.update({'refresh_token' : refreshtoken},{
            where: {
                id : userId
            }
        });
        res.cookie('refreshToken', refreshtoken, {
            httpOnly : true,
            maxAge : 24 * 60 * 60 * 1000
        });
        res.json({ accestoken })
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

exports.logout = async(req, res) => {
    try {
        
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.status(204);
    const user = await User.findAll({
        where : { 
            refresh_token : refreshToken
        },
    });
    if(!user[0]) return res.status(204);
    const userId = user[0].id;
    await User.update({refresh_token : null}, {
        where : {
            id : userId
        }
    });
    res.clearCookie('refreshToken');
    return res.status(200).json('logout succesfully');
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}