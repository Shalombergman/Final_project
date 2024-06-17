const mongoose = require('mongoose');
const { error } = require('server/router');
const Schema = mongoose.Schema;

const dbName = 'therapyDB';

async function main() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/' + dbName, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Connection error', error);
    }
}

const therapistSchema = new Schema({
    name: { type: String, required: true },
    specialization: { type: String, required: true },
    contact: { type: String, required: true }
});
const patientsSchema = new Schema ({
    name: { type: String, required: true},
    password: { type: String, required: true}
})

const appointmentSchema = new Schema({
    therapistId: { type: mongoose.Types.ObjectId, ref: 'Therapist', required: true },
    date: { type: Date, required: true, unique: true },
    patientName: { type: String, required: true }
});

const Therapist = mongoose.model('Therapist', therapistSchema);
const Patients = mongoose.model('patients', patientsSchema);
const Appointment = mongoose.model('Appointment', appointmentSchema);   


async function getTherapists() {
    return await Therapist.find();
}

async function getTherapistById(therapistId) {
    return await Therapist.findById(therapistId);
}

async function createTherapist(newTherapist) {
    return await Therapist.create(newTherapist);
}

async function updateTherapist(therapistId, updatedFields) {
    const result = await Therapist.updateOne({ _id: therapistId }, { $set: updatedFields });
    return result.modifiedCount === 1;
}

async function deleteTherapist(therapistId) {
    const result = await Therapist.deleteOne({ _id: therapistId });
    return result.deletedCount === 1;
}

async function getAppointments() {
    return await Appointment.find().populate('therapistId');
}

async function getAppointmentById(appointmentId) {
    return await Appointment.findById(appointmentId).populate('therapistId');
}

async function createAppointment(newAppointment) {
    try{
        return await Appointment.create(newAppointment);
    }catch(error){
        if (error.code === 11000){
            throw new error(`appointment solt already booked`);
        }
        throw error;

    }
}

async function updateAppointment(appointmentId, updatedFields) {
    const result = await Appointment.updateOne({ _id: appointmentId }, { $set: updatedFields });
    return result.modifiedCount === 1;
}

async function deleteAppointment(appointmentId) {
    const result = await Appointment.deleteOne({ _id: appointmentId });
    return result.deletedCount === 1;
}
async function getPitientsName() {
    return await Patients.find();
}

async function getPitientsNameById(pitientsNameId) {
    return await Patients.findById(pitientsNameId);
}

async function createPitientsName(newPitientsName) {
    return await Patients.create(newPitientsName);
}

async function updatePitientsName(pitientsNameId, updatedFields) {
    const result = await Patients.updateOne({ _id: pitientsNameId }, { $set: updatedFields });
    return result.modifiedCount === 1;
}

async function deletePitientsName(pitientsNameId) {
    const result = await Patients.deleteOne({ _id: pitientsNameId });
    return result.deletedCount === 1;
}

main();

module.exports = {
    getTherapists,
    getTherapistById,
    createTherapist,
    updateTherapist,
    deleteTherapist,
    getAppointments,
    getAppointmentById,
    createAppointment,
    updateAppointment,
    deleteAppointment,
    getPitientsName,
    getPitientsNameById,
    createPitientsName,
    updatePitientsName,
    deletePitientsName

};
