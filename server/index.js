const express = require('express');
const cors = require('cors');
const db = require('./db');
const path = require('path')
const app = express();

app.use(express.json());
app.use(cors());


app.get('/api/therapists', async (req, res) => {
    try {
        const therapists = (await db.getTherapists());
        res.send(therapists);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/api/therapists/:id', async (req, res) => {
    try {
        const therapist = await db.getTherapistById(req.params.id);
        if (!therapist) return res.status(404).send('Therapist not found');
        res.send(therapist);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post('/api/therapists', async (req, res) => {
    try {
        const therapist = await db.createTherapist(req.body);
        res.status(201).send(therapist);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.put('/api/therapists/:id', async (req, res) => {
    try {
        const result = await db.updateTherapist(req.params.id, req.body);
        if (!result) return res.status(404).send('Therapist not found');
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.delete('/api/therapists/:id', async (req, res) => {
    try {
        const result = await db.deleteTherapist(req.params.id);
        if (!result) return res.status(404).send('Therapist not found');
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Appointment routes
app.get('/api/appointments', async (req, res) => {
    try {
        const appointments = await db.getAppointments();
        res.send(appointments);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/api/appointments/:id', async (req, res) => {
    try {
        const appointment = await db.getAppointmentById(req.params.id);
        if (!appointment) return res.status(404).send('Appointment not found');
        res.send(appointment);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


app.get('/api/appointments/:id/:day', async (req,res) => {
    try{
        const appointment = await db.getAppointmentsByDay(req.params.id,req.params.day)
        res.json(appointment);
    }catch(error){
        res.status(500).send(error.message)
    }
})

app.get('/api/appointment/patientId/:patientId',async (req,res) => {
    try{
        const appoin = await db.getAppoinmentsBypatientId(req.params.patientId)
        res.json(appoin)
    }
    catch(error){
        res.status(500).send(error.message)  
    }
})

app.post('/api/appointments', async (req, res) => {
    try {
        const appointment = await db.createAppointment(req.body);
        res.status(201).send(appointment);
    } catch (error) {
         console.log(error);
            res.status(500).send(error.message);
    }
})

app.put('/api/appointments/:id', async (req, res) => {
    try {
        const result = await db.updateAppointment(req.params.id, req.body);
        if (!result) return res.status(404).send('Appointment not found');
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.delete('/api/appointments/:id', async (req, res) => {
    try {
        const result = await db.deleteAppointment(req.params.id);
        if (!result) return res.status(404).send('Appointment not found');
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// paietnt routes

app.post("/api/login", async (req, res) => {
    try {
        const user = await db.getpaietnt(req.body.username, req.body.password)
        if (!user) {
            res.status(404).send("user not found")
            return
        }
        res.status(200).send(user)
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error.message)
    }

})

app.get("/api/paietnt/", async (req, res) => {
    try {
        const paietnt = await db.getPatientsName()
        res.send(paietnt)
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error.message)
    }
})

app.get('/api/paietnt/:id', async (req, res) => {
    try {
        const paietnt = await db.getPatientNameById(req.params.id);
        if (!paietnt) return res.status(404).send('paietnt not found');
        res.send(paietnt);
    } catch (error) {
        res.status(500).send(error.message);
    }
});
app.post('/api/paietnt/', async (req, res) => {
    try {
        const paietnt = await db.createPatientName(req.body);
        res.status(201).send(paietnt);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.put('/api/paietnt/:id', async (req, res) => {
    try {
        const result = await db.updatePatientsName(req.params.id, req.body);
        if (!result) return res.status(404).send('paietnt not found');
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
});


app.delete('/api/paietnt/:id', async (req, res) => {
    try {
        const result = await db.deletePatientName(req.params.id);
        if (!result) return res.status(404).send('paietnt not found');
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
});



const port = 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));