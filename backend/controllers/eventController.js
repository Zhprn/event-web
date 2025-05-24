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
        const {judul, deskripsi, tanggal, waktu, lokasi} = req.body
        const file = req.file



        const filesize = file.size;
        const ext = path.extname(file.originalname);
        const filename = file.filename
        const url = `${req.protocol}//${req.get('host')}/public/${filename}`

        const allowedTypes = ['.png', '.jpg', 'jpeg'];

        if(!allowedTypes.includes(ext.toLocaleLowerCase())) {
            res.status(422).json({msg : 'the file ext must png, jpg, and jpeg'})
        }

        if(filesize > 5000000) {
            res.status(422).json({msg : 'the file must be less 5mb'})
        }

        const event = await Event.create({
            judul,
            deskripsi,
            tanggal,
            waktu,
            lokasi,
            gambar : url
        });
        res.status(200).json({event})
        
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}]