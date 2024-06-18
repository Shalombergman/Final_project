const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dbName = 'therapyDB';

async function main() {
    try {
        await mongoose.connect("mongodb://localhost:27017/" + dbName, {
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Connection error', error);
    }
}
const patientsSchema = new Schema({
    username:{type:String,required:true},
    password:{type:String,required:true}
})
const therapistSchema = new Schema({
    name: { type: String, required: true },
    specialization: { type: String, required: true },
});

const appointmentSchema = new Schema({
    therapistId: { type: String, required: true },
    date: { type: Date, required: true,unique: true },
    meetTime: {type:String,required:true},
    patientId: { type: String, required: true }
});

const Therapist = mongoose.model('Therapist', therapistSchema);
const Appointment = mongoose.model('Appointment', appointmentSchema);
const patients = mongoose.model("patientName",patientsSchema)


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
    }
    catch(error){
        if(error.code === 11000){
            throw new Error("Appointment slot already booked")
        }
        console.log(error);
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

async function getpaietnt(paietntName,password){
    return await patients.findOne({"username":paietntName,"password":password})
}
async function getPatientsName() {
    return await patients.find();
}

async function getPatientNameById(patientId) {
    return await patients.findById(patientId);
}

async function createPatientName(newPatientName) {
    return await patients.create(newPatientName);
}

async function updatePatientsName(patientId, newDetels) {
    const result = await patients.updateOne({ _id: patientId }, { $set: newDetels });
    return result.modifiedCount === 1;
}

async function deletePatientName(patientId) {
    const result = await patients.deleteOne({ _id: patientId });
    return result.deletedCount === 1;
}
main();
// createPatientName({name:"moshe",password:"345tyu"})
//  createAppointment({therapistName:"jkcob",date:new Date('2024-06-16T10:00:00Z'),patientName:"hri"})
// createTherapist({name:"Dr.smyth",specialization:"Cardiology"})




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
    getPatientsName,
    getPatientNameById,
    createPatientName,
    updatePatientsName,
    deletePatientName,
    getpaietnt
};