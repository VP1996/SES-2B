const express = require('express');
const router = express.Router();

// Load User model
const User = require('../../models/User');

router.get('/user', async (req, res) => {
	res.send('user route testing!');
});

router.get('/getUsers', (req, res) => {
	User.find()
		.then((users) => res.json(user))
		.catch((err) => res.status(404).json({ nouserfound: 'No users found' }));
});

router.post('/addUser', async (req, res) => {
	const user = new User({
		fullName: req.body.fullName,
		password: req.body.password,
		campusLocation: req.body.campusLocation,
		isTeacher: req.body.isTeacher,
		isAdmin: req.body.isAdmin,
		isStudent: req.body.isStudent,
		emailID: req.body.emailID,
		userID: req.body.userID,
	});
	await user.save();
	res.send(user);
});

router.get('/getStudents', (req, res) => {
	User.find({ isStudent: true })
		.then((user) => res.json(user))
		.catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
