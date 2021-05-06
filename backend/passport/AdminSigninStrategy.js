const Strategy = require('passport-local').Strategy;
const User = require('..models/User');
const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);
