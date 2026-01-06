const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');

const authRoutes = require('./routes/authRoutes');
const petRoutes = require('./routes/petRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const healthRoutes = require('./routes/healthRoutes');
const communityRoutes = require('./routes/communityRoutes');
const breedRoutes = require('./routes/breedRoutes');
const vetRoutes = require('./routes/vetRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev')); // Logging
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use('/api', authRoutes); // /api/login, /api/register
app.use('/api/pets', petRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/health-logs', healthRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/breed-info', breedRoutes); // This handles /api/community and /api/community/breed-info/:breed? No wait, check routes
// My communityRoutes has /breed-info/:breed and /:breed and / 
// So I should probably mount it at /api/community for the POST and GET /:breed
// But for breed-info it might be weird if I mount at /api/community. 
// Let's check communityRoutes.js again.
// router.get('/breed-info/:breed'...) -> /api/community/breed-info/:breed
// That works.

app.use('/api/vets', vetRoutes);

// Error Handling Middleware
app.use(require('./middleware/errorHandler'));

// Fix for React/SPA routing (fallback to index.html)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

module.exports = app;
