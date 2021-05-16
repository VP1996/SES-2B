const router = require('express').Router();
const multer = require("multer");
const facialRecognitionHelper = require('../../helpers/facialReconition/facialRecognitionHelper');

const upload = multer({
    dest: './upload/references',
})
router.post('/verifyFace', upload.single('profile'), async (req, res) => {
    //username should probably come the jwt...
    var result = await facialRecognitionHelper.authoriseFace(req.query.username, req.file.filename);        
    res.send(result);
});

module.exports = router;