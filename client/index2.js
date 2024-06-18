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
    for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        const cell = cells[columnIndex];
        if (cell && cell.innerText.toLowerCase().includes(searchTerm)) {
            rows[i].style.display = '';
        } else {
            rows[i].style.display = 'none';
        }
    }
}async function getdoc(){
    const data = await fetch('http://localhost:8080/api/therapists')
    const duc = await data.json()
    pushDuc(duc);
    pushSpecialization(duc);
    }

 getdoc();



function pushDuc(doc){
    const Ductors = document.getElementById("duc")
    for(let i in doc){
        // console.log(doc[i].name);
        d = doc[i].name
        a = doc[i].specialization
        Ductors.innerHTML += `<tr><td>${d}</td><td>${a}</td><td><a href="index3.html">to make an Appointment</a></td></tr>` 
    }
}
function pushSpecialization(doc){
    const spe = document.getElementById("specialtySelect")
    for(let i in doc){
        let a = doc[i].specialization
        spe.innerHTML += `<option value=${a}>${a}</option>`
    }

}

