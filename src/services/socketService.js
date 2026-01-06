const { readDB, writeDB } = require('../utils/db');

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('New client connected to Tele-Vet');

        const db = readDB();
        socket.emit('load_history', db.chatHistory || []);

        socket.on('send_message', (data) => {
            let db = readDB();
            if (!db.chatHistory) db.chatHistory = [];

            // Wizard of Oz
            if (data.text.startsWith("::")) {
                const vetText = data.text.substring(2).trim();

                const vetMessage = {
                    id: Date.now(),
                    text: vetText,
                    sender: 'vet',
                    vetName: "Dr. Nguyen An",
                    timestamp: new Date().toISOString()
                };

                db.chatHistory.push(vetMessage);
                writeDB(db);

                io.emit('receive_message', vetMessage);
                return;
            }

            // User Message
            const userMessage = {
                id: Date.now(),
                text: data.text,
                sender: 'user',
                vetName: data.vetName,
                timestamp: new Date().toISOString()
            };

            db.chatHistory.push(userMessage);
            writeDB(db);

            io.emit('receive_message', userMessage);

            // Bot Auto-Reply
            const lowerText = data.text.toLowerCase();

            setTimeout(() => {
                let autoReply = null;

                if (lowerText.includes('hello') || lowerText.includes('chao') || lowerText.includes('hi')) {
                    autoReply = "Chào bạn! Tôi là Dr. Nguyen. Tôi có thể giúp gì cho bé cưng của bạn?";
                } else if (lowerText.includes('bệnh') || lowerText.includes('sick') || lowerText.includes('dau')) {
                    autoReply = "Bạn bình tĩnh nhé. Bạn có thể mô tả kỹ hơn triệu chứng không? (Nôn, bỏ ăn, lừ đừ...)";
                }

                if (autoReply) {
                    const botMsg = {
                        id: Date.now() + 1,
                        text: autoReply,
                        sender: 'vet',
                        vetName: "Dr. Nguyen An (Auto)",
                        timestamp: new Date().toISOString()
                    };

                    let currentDb = readDB();
                    if (!currentDb.chatHistory) currentDb.chatHistory = [];
                    currentDb.chatHistory.push(botMsg);
                    writeDB(currentDb);
                    io.emit('receive_message', botMsg);
                }
            }, 1500);
        });
    });
};
