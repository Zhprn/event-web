module.exports = (sequelize, DataTypes) => {
    const event = sequelize.define('event', {
        judul : {
            type : DataTypes.STRING,
        },
        deskripsi : {
            type : DataTypes.STRING,
        },
        tanggal : { 
            type : DataTypes.DATEONLY,
        },
        waktu : {
            type : DataTypes.TIME,
        },
        lokasi : {
            type : DataTypes.STRING,
        },
        gambar : {
            type : DataTypes.STRING,
        }
    });
    return event;
}