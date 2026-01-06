const { readDB, writeDB } = require('../utils/db');

exports.createHealthLog = (req, res) => {
    const db = readDB();
    if (!db.healthLogs) db.healthLogs = [];
    const newLog = {
        id: `log_${Date.now()}`,
        userId: req.userId,
        petId: req.body.petId,
        symptom: req.body.symptom,
        severity: req.body.severity,
        answers: req.body.answers,
        date: new Date().toISOString()
    };
    db.healthLogs.push(newLog);
    writeDB(db);
    res.status(201).json({ success: true, message: "Health log recorded!", data: newLog });
};

exports.getHealthLogsByPet = (req, res) => {
    const db = readDB();
    const logs = (db.healthLogs || [])
        .filter(l => l.petId === req.params.petId && l.userId === req.userId)
        .sort((a, b) => new Date(b.date) - new Date(a.date));
    res.json(logs);
};
