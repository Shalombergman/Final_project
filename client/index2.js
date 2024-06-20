const username = document.getElementById("h2")
const det = JSON.parse(localStorage.getItem("user"))
username.innerText = `Hi ${det.username}`

function searchDoctors() {
    const searchTerm = document.getElementById('doctorSearch').value.toLowerCase();
    filterTable('doctorsTable', searchTerm, 0); // Search only in the first column (Doctor's Name)
}

function selectSpecialty() {
    const selectedSpecialty = document.getElementById('specialtySelect').value.toLowerCase();
    filterTable('doctorsTable', selectedSpecialty, 1); // Search only in the second column (Specialty)
}

function filterTable(tableId, searchTerm, columnIndex) {
    const table = document.getElementById(tableId);
    const rows = table.getElementsByTagName('tr');
    let counter = 1
    for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        const cell = cells[columnIndex];
        if (cell && cell.innerText.toLowerCase().includes(searchTerm)) {
            rows[i].style.display = '';
        } else {
            rows[i].style.display = 'none';
            counter ++
        }
    }
    if(counter == rows.length){
        alert("no such doctor")
    }
} async function getdoc() {
    const data = await fetch('http://localhost:8080/api/therapists')
    const duc = await data.json()
    pushDuc(duc);
    pushSpecialization(duc);
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

getdoc();



function pushDuc(doc) {
    const Ductors = document.getElementById("duc")
    for (let i in doc) {
        // console.log(doc[i].name);
        d = doc[i].name
        a = doc[i].specialization
        Ductors.innerHTML += `<tr><td>${d}</td><td>${a}</td><td><a  id = "${i}" href="index3.html">to make an Appointment</a></td></tr>`
    }
    for (let i in doc) {
        let y = document.getElementById(i);
        if (y) {
            y.addEventListener("click", function (event) {
                event.preventDefault(); 
                save(doc[i]); 
            });
        } else {
            console.error(`not found ${i}` );
        }
    }



}
function pushSpecialization(doc) {
    const spe = document.getElementById("specialtySelect")
    doc.sort(function(a,b){
        return a.specialization.localeCompare(b.specialization);
    })
    for (let i in doc) {
        let a = doc[i].specialization
        spe.innerHTML += `<option value=${a}>${a}</option>`
    }

}
function save(doctor) {
    localStorage.setItem("doctor", JSON.stringify(doctor))
    window.location.href = "index3.html"
}





// async function getListappointments(){
//     const get = JSON.parse(localStorage.getItem("user"))._id
//     const fatch = await fetch(`http://localhost:8080/api/appointment/patientId/${get}`)
//     const data =  await fatch.json()
//     makeMeesge(data)
//  }
 
//  function makeMeesge(data) {
    
//     const ch = document.getElementById("uy")
//     for(let i in data){
//         let d = data[i].therapistId
//         let h = data[i].date
//         let g = data[i].meetTime
//         ch.innerHTML += `<li class = "fg">therapistId:${d} date:${h} meetTime:${g} <button id = "${i}a" class = "re">delete</button></li>`    
//     }
//     for(let i in data ){
//         document.getElementById(`${i}a`).addEventListener("click",function(event){
//             deleteAppointment(data[i]._id)
//         })
//     }
//  }
//  getListappointments();


//  async function deleteAppointment(appointmentId){
//     const fatch = await fetch(`http://localhost:8080/api/appointments/${appointmentId}`,{
//         method: "DELETE",
//     })
//     if(fatch.status == 204){
//        alert("The delete was successfully set")
//     location.reload();


//     }
        
    
// }


   

