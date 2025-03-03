const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    if (await User.findOne({ email })) {
      return res.status(409).json({ msg: 'User already exists' });
    }

    var salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({ email, password: hashedPassword, role });

    const token = jwt.sign(
      { user: { id: user.id, role: user.role } },
      process.env.JWT_SECRET,
      { expiresIn: '5h' }
    );

    res.status(201).json({ token });
  } catch (err) {
    console.error('Register Error:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const emailLower = email.toLowerCase();
    const user = await User.findOne({ email: emailLower });
    if (!user) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }

    if (!(await bcrypt.compare(password, user.password))) {

      return res.status(401).json({ msg: 'Invalid password' });
    }
    const token = jwt.sign(
      { user: { id: user.id, role: user.role } },
      process.env.JWT_SECRET,
      { expiresIn: '5h' }
    );

    res.json({ token, user});
  } catch (err) {
    console.error('Login Error:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};