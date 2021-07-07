const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const multer = require('../middleware/multer-config-avatar')

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/me', userCtrl.getUserProfile)
router.get('/allusers', userCtrl.getAllUser)
router.put('/me/update', multer, userCtrl.updateUserProfile)
router.put('/me/updatepassword', userCtrl.updatePassword)
router.delete('/me/delete', userCtrl.deleteUserProfile)
router.delete('/allusers/:id', userCtrl.deleteUserProfileForAdmin)

module.exports = router;