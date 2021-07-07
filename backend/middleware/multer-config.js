const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
};

const MIME_TYPES_AVATAR = {
    'avatar/jpg': 'jpg',
    'avatar/jpeg': 'jpg',
    'avatar/png': 'png',
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

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
module.exports = multer({ storage: storage }).single('images');