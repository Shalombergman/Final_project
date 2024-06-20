


    const doctorName = document.getElementById("doctorName")
    const det = JSON.parse(localStorage.getItem("doctor"))
    doctorName.innerText = `your doctor is:${det.name}`




document.addEventListener("DOMContentLoaded", () => {
    const doctorName = document.getElementById("doctorSpecialty")
    const det = JSON.parse(localStorage.getItem("doctor"))
    doctorName.innerText = `expert for:${det.
        specialization}`
});



async function getTime(e) {
    let day = e.target.value
    try {
        const det = JSON.parse(localStorage.getItem("doctor"))
        const response = await fetch(`http://localhost:8080/api/appointments/${det._id}/${day}`)
        const data = await response.json()
        makeListTime(data)
        console.log(data);
    }
    catch (error) {
        console.log(error);
    }

}

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



function makeListTime(listHuers) {
    const ul = document.getElementById("listTime")
    for (let i = 8; i < 18; i++) {
        let isT;
        isT = listHuers.find((meet) => { 
            
           return Number(meet.meetTime) == i
         })
        console.log(isT);
        if (isT) {
            ul.innerHTML += `<li class = "ruvi">${i}:00 <b><mark>occupied</mark></b></li>`
        }
        else { ul.innerHTML += `<li class = "fg">${i}:00<button id ="${i}" class = "re">Scheduled</button></li>` }
    }
    for (let i = 8; i < 18; i++) {
        let y = document.getElementById(i);
        if (y) {
            y.addEventListener("click", function (event) {
                event.preventDefault();
                add(i);

            });
        } else {
           
        }
    }
}
async function add(houer) {
    const data = {
        therapistId:JSON.parse(localStorage.getItem("doctor"))._id,
        date:document.getElementById("date").value,
        meetTime:houer,
        patientId:JSON.parse(localStorage.getItem("user"))._id
    }
    const response = await fetch('http://localhost:8080/api/appointments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
     const res = await response.json()
     if(response.status == 201){
        alert("The appointment was successfully set")
        location.reload();
     }
    
}