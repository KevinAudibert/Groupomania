const multer = require('multer');

const MIME_TYPES_AVATAR = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif',
};

const avatarStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'avatars');
    },
    filename: (req, file, callback) => {
        const nameAvatar = file.originalname.split(' ').join('_');
        const extensionAvatar = MIME_TYPES_AVATAR[file.mimetype];
        callback(null, nameAvatar + Date.now() + '.' + extensionAvatar)
    }
});

module.exports = multer({ storage: avatarStorage }).single('avatar');