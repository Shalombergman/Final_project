const express = require('express');
const cors = require('cors');
const db = require('./db');
const path = require('path')
const app = express();

app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index1.html'));
});

app.get('/screen/2', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index2.html'));
});

app.get('/screen/3', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index3.html'));
});

app.get('/api/therapists/', async (req, res) => {
    try {
        const therapists = await db.getTherapists();
        res.send(therapists);
    } catch (error) {
        res.status(500).send(error.message);
    }
});
console.log("yigkujh")
app.get('/api/therapists/:id/', async (req, res) => {
    try {
        const therapist = await db.getTherapistById(req.params.id);
        if (!therapist) return res.status(404).send('Therapist not found');
        res.send(therapist);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post('/api/therapists/', async (req, res) => {
    try {
        const therapist = await db.createTherapist(req.body);
        res.status(201).send(therapist);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.put('/api/therapists/:id/', async (req, res) => {
    try {
        const result = await db.updateTherapist(req.params.id, req.body);
        if (!result) return res.status(404).send('Therapist not found');
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.delete('/api/therapists/:id/', async (req, res) => {
    try {
        const result = await db.deleteTherapist(req.params.id);
        if (!result) return res.status(404).send('Therapist not found');
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Appointment routes
app.get('/api/appointments/', async (req, res) => {
    try {
        const appointments = await db.getAppointments();
        res.send(appointments);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/api/appointments/:id/', async (req, res) => {
    try {
        const appointment = await db.getAppointmentById(req.params.id);
        if (!appointment) return res.status(404).send('Appointment not found');
        res.send(appointment);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post('/api/appointments/', async (req, res) => {
    try {
        const appointment = await db.createAppointment(req.body);
        res.status(201).send(appointment);
    } catch (error) {
        if (error.message === `appointment solt already booked`) {
            res.status(409).send(error.message);
        }else {
        res.status(500).send(error.message);
        }
    }
});

app.put('/api/appointments/:id/', async (req, res) => {
    try {
        const result = await db.updateAppointment(req.params.id, req.body);
        if (!result) return res.status(404).send('Appointment not found');
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.delete('/api/appointments/:id/', async (req, res) => {
    try {
        const result = await db.deleteAppointment(req.params.id);
        if (!result) return res.status(404).send('Appointment not found');
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Patients routes
app.get('/api/patients/', async (req, res) => {
    try {
        const patients = await db.getPitientsName();
        res.send(patients);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/api/patients/:id/', async (req, res) => {
    try {
        const patients = await db.getPitientsNameById(req.params.id);
        if (!patients) return res.status(404).send('Patients not found');
        res.send(patients);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post('/api/patients/', async (req, res) => {
    try {
        const patients = await db.createPitientsName(req.body);
        res.status(201).send(patients);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.put('/api/patients/:id/', async (req, res) => {
    try {
        const result = await db.updatePitientsName(req.params.id, req.body);
        if (!result) return res.status(404).send('Patients not found');
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.delete('/api/patients/:id/', async (req, res) => {
    try {
        const result = await db.deletePitientsName(req.params.id);
        if (!result) return res.status(404).send('Patients not found');
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
});


const port = 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));