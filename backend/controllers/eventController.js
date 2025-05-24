const db = require('../models')
const Event = db.event
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const storage = multer.diskStorage({
    destination : function (req, file, cb) {
        cb(null, path.join(__dirname, "../public"))
    },
    filename : function (req, file, cb) {
        cb(
            null, file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
})

// upload
const upload = multer({storage : storage})


exports.addEvent = [
  upload.single('file'),
  async (req, res) => {
    try {
      const { judul, deskripsi, tanggal, waktu, lokasi } = req.body;
      const file = req.file;

      if (!file) {
        return res.status(400).json({ msg: 'No file uploaded' });
      }

      const filesize = file.size;
      const ext = path.extname(file.originalname).toLowerCase();
      const filename = file.filename;
      const url = `${req.protocol}://${req.get('host')}/public/${filename}`;

      const allowedTypes = ['.png', '.jpg', '.jpeg'];
      if (!allowedTypes.includes(ext)) {
        return res.status(422).json({ msg: 'The file extension must be png, jpg, or jpeg' });
      }

      if (filesize > 5_000_000) {
        return res.status(422).json({ msg: 'The file must be less than 5MB' });
      }

      const event = await Event.create({
        judul,
        deskripsi,
        tanggal,
        waktu,
        lokasi,
        gambar: url,
      });

      res.status(201).json(event);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
];

exports.getallEvent = async(req,res) => {
    try {
        const events = await Event.findAll();
        res.status(200).json(events)
    } catch (error) {
        res.status(500).json({ messsage : error.message})
    }
}

exports.getOneEvent = async (req,res) => {
    try {
        const id = req.params.id
        const event = await Event.findOne({where : {id:id}})
        res.status(200).json(event)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

exports.deleteEvent = async (req,res) => {
    try {
        const id = req.params.id
        await Event.destroy({where : {id:id}})
        res.status(200).json({message : 'delete succesfully'})
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

exports.updateEvent = [upload.single('file'), async (req, res) => {
    
        const id = req.params.id;
        const { judul, deskripsi, tanggal, waktu, lokasi } = req.body;
        const file = req.file;
    try {

        const event = await Event.findOne({ where: { id } });
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }

        let url = event.gambar;

        if (file) {
            const filesize = file.size;
            const ext = path.extname(file.originalname);
            const filename = file.filename;
                        url = `${req.protocol}://${req.get('host')}/public/${filename}`;
            const allowedTypes = ['.png', '.jpg', '.jpeg'];


            if (!allowedTypes.includes(ext.toLowerCase())) {
                return res.status(422).json({ msg: 'The file extension must be png, jpg, or jpeg' });
            }

            if (filesize > 5000000) {
                return res.status(422).json({ msg: 'The file must be less than 5MB' });
            }

            if (event.gambar) {
                const oldImage = event.gambar.split('/').pop();
                const oldPath = `./public/${oldImage}`;
                if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
            }


        }

        const updated = await Event.update({
            judul,
            deskripsi,
            tanggal,
            waktu,
            lokasi,
            gambar: url
        }, { where: { id } });
        res.status(200).json({updated})
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}];