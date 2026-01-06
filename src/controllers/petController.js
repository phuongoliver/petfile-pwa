const { readDB, writeDB } = require('../utils/db');
const { calculateAge } = require('../utils/helpers');

exports.getPets = (req, res) => {
    const db = readDB();
    const pets = db.pets.filter(p => p.userId === req.userId);
    res.json(pets);
};

exports.getPetById = (req, res) => {
    const db = readDB();
    const pet = db.pets.find(p => p.id === req.params.id && p.userId === req.userId);
    if (pet) res.json(pet);
    else res.status(404).json({ success: false, message: "Pet not found" });
};

exports.createPet = (req, res) => {
    const db = readDB();
    const { name, species, breed, dob, weight } = req.body;
    let icon = "🐾";
    let color = "--primary-gray";
    if (species === 'Dog') { icon = "🐶"; color = "--primary-orange"; }
    if (species === 'Cat') { icon = "🐱"; color = "--primary-purple"; }
    if (species === 'Rabbit') { icon = "🐰"; color = "--primary-green"; }

    const newPet = {
        id: `${name.toLowerCase().replace(/\s/g, '')}_${Date.now()}`,
        userId: req.userId,
        name, species, breed: breed || "N/A", dob,
        age: calculateAge(dob),
        weight: weight || "N/A",
        description: `A lovely ${species}.`,
        color: color, icon: icon,
    };
    db.pets.push(newPet);
    writeDB(db);
    res.status(201).json({ success: true, message: "Pet added!", data: newPet });
};

exports.deletePet = (req, res) => {
    const db = readDB();
    const petIndex = db.pets.findIndex(p => p.id === req.params.id && p.userId === req.userId);
    if (petIndex > -1) {
        db.pets.splice(petIndex, 1);
        writeDB(db);
        res.json({ success: true, message: "Pet deleted successfully." });
    } else {
        res.status(404).json({ success: false, message: "Pet not found." });
    }
};
