function enrollmentFunction (){
    window.location.href = 'index0.html'
}
function footerDoctors (){
    window.location.href = 'index2.html'
}
function footerAppointments (){
    window.location.href = 'appointment.html'
}
function goToLocatioPage (){
    window.location.href = 'index5.html'
}
document.getElementById('footerEnrollment').addEventListener('click',enrollmentFunction)
document.getElementById('footerDoctors').addEventListener('click',footerDoctors)
document.getElementById('footerAppointments').addEventListener('click',footerAppointments)
document.getElementById('footerLocation').addEventListener('click',goToLocatioPage)

