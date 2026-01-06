const { readDB, writeDB } = require('../utils/db');

exports.getBreedInfo = (req, res) => {
    const db = readDB();
    const breedName = req.params.breed;
    const data = db.breedData[breedName] || db.breedData['Default'];
    res.json({ breed: breedName, ...data });
};

exports.getCommunityPosts = (req, res) => {
    const db = readDB();
    const breedName = req.params.breed;

    const posts = (db.communityPosts || [])
        .filter(p => p.breed === breedName)
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    res.json(posts);
};

exports.createPost = (req, res) => {
    const db = readDB();
    const user = db.users.find(u => u.id === req.userId);

    if (!db.communityPosts) db.communityPosts = [];

    const newPost = {
        id: Date.now(),
        breed: req.body.breed,
        userId: req.userId,
        userName: user ? user.name : "Anonymous",
        content: req.body.content,
        timestamp: new Date().toISOString(),
        likes: 0
    };

    db.communityPosts.push(newPost);
    writeDB(db);
    res.status(201).json({ success: true, post: newPost });
};
