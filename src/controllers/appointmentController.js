const { readDB, writeDB } = require('../utils/db');

exports.getAppointmentsByPet = (req, res) => {
    const db = readDB();
    const appointments = (db.appointments || [])
        .filter(a => a.petId === req.params.petId && a.userId === req.userId)
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    res.json(appointments);
};

exports.createAppointment = (req, res) => {
    const db = readDB();

    const mockVets = ["Dr. Nguyen An", "Dr. Sarah Smith", "Dr. Tran Minh"];
    const assignedVet = mockVets[Math.floor(Math.random() * mockVets.length)];

    const newAppointment = {
        id: `apt_${Date.now()}`,
        userId: req.userId,
        status: 'upcoming',
        vetName: assignedVet,
        ...req.body
    };

    db.appointments.push(newAppointment);
    writeDB(db);
    res.status(201).json({ success: true, message: "Appointment booked!", data: newAppointment });
};
