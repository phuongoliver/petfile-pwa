const { readDB, writeDB } = require('../utils/db');

exports.login = (req, res) => {
    const { email, password } = req.body;
    const db = readDB();
    const user = db.users.find(u => u.email === email && u.password === password);

    if (user) {
        const { password, ...userWithoutPass } = user;
        res.json({ success: true, user: userWithoutPass, token: user.id });
    } else {
        res.status(401).json({ success: false, message: "Invalid email or password" });
    }
};

exports.register = (req, res) => {
    const db = readDB();
    const { name, email, password, phone, role } = req.body;

    const existingUser = db.users.find(u => u.email === email);
    if (existingUser) {
        return res.status(400).json({ success: false, message: "Email already in use!" });
    }

    const newUser = {
        id: Date.now(),
        email,
        password,
        name,
        phone,
        role: role || 'owner',
        membership: "Standard",
        createdAt: new Date().toISOString()
    };

    db.users.push(newUser);
    writeDB(db);

    res.status(201).json({ success: true, message: "Registration successful! Please login." });
};

exports.getProfile = (req, res) => {
    const db = readDB();
    const user = db.users.find(u => u.id === req.userId);
    if (user) res.json(user);
    else res.status(404).json({ success: false, message: "User not found" });
};
