const db = require('../models')
const Event = db.event
const multer = require('multer')
const path = require('path')
const fs = require('fs')

// storage multer buat pertama
const storage = multer.diskStorage({
    destination : function (req, file, cb) {
        cb(null, path.join(__dirname, "/uploads"))
    },
    filename : function (req, file, cb) {
        cb(
            null, file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
})

// upload
const upload = multer({storage : storage})


exports.addEvent = [upload.single('file'), async(req, res) => {
    try {
        const file = req.file
        
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}]