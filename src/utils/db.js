const fs = require('fs');
const path = require('path');

// Go up two levels from src/utils/ to root
const DB_PATH = path.join(__dirname, '../../db.json');

const readDB = () => {
    try {
        const data = fs.readFileSync(DB_PATH, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error("Error reading DB:", err);
        return { users: [], pets: [], appointments: [], healthLogs: [], chatHistory: [], communityPosts: [], breedData: {} };
    }
};

const writeDB = (data) => {
    try {
        fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
    } catch (err) {
        console.error("Error writing DB:", err);
    }
};

module.exports = { readDB, writeDB };
