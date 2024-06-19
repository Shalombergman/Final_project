


    const doctorName = document.getElementById("doctorName")
    const det = JSON.parse(localStorage.getItem("doctor"))
    // console.log(det);
    doctorName.innerText = `your doctor is:${det.name}`




document.addEventListener("DOMContentLoaded", () => {
    const doctorName = document.getElementById("doctorSpecialty")
    const det = JSON.parse(localStorage.getItem("doctor"))
    doctorName.innerText = `expert for:${det.
        specialization}`
});



async function getTime(e) {
    let day = e.target.value
    // console.log(day);
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



function makeListTime(listHuers) {
    const ul = document.getElementById("listTime")
    for (let i = 8; i < 18; i++) {
        let isT;
        isT = listHuers.find((meet) => { 
            
           return Number(meet.meetTime) == i
         })
        console.log(isT);
        if (isT) {
            ul.innerHTML += `<li>${i}:00 akipide</li>`
        }
        else { ul.innerHTML += `<li>${i}:00<button id ="${i}">Scheduled</button></li>` }
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
     console.log(res);
}



// Dummy data for unavailable slots
//  const unavailableSlots = {
//     "2024-06-20": ["09:00", "10:00", "14:00"],
//     "2024-06-21": ["11:00", "13:00"],
//     "2024-06-22": ["09:00", "12:00", "15:00"],
// };

// document.addEventListener('DOMContentLoaded', () => {
//     const selectedValue = localStorage.getItem('selectedValue');
//     const [doctorName, doctorSpecialty] = selectedValue.split('\n');

//     document.getElementById('doctorName').innerText = doctorName.trim();
//     document.getElementById('doctorSpecialty').innerText = doctorSpecialty.trim();

//     const dateInput = document.getElementById('date');
//     const unavailableList = document.getElementById('unavailableList');

//     dateInput.addEventListener('change', () => {
//         const selectedDate = dateInput.value;
//         unavailableList.innerHTML = '';

//         if (unavailableSlots[selectedDate]) {
//             unavailableSlots[selectedDate].forEach(time => {
//                 const listItem = document.createElement('li');
//                 listItem.innerText = `${selectedDate} ${time}`;
//                 listItem.classList.add('unavailable');
//                 unavailableList.appendChild(listItem);
//             });
//         }
//     });

//     document.getElementById('scheduleForm').addEventListener('submit', function(event) {
//         event.preventDefault();
//         const date = document.getElementById('date').value;
//         const time = document.getElementById('time').value;

//         if (unavailableSlots[date] && unavailableSlots[date].includes(time)) {
//             alert('The selected date and time are unavailable. Please choose another slot.');
//         } else {
//             alert(`Appointment scheduled on ${date} at ${time} with ${doctorName}`);
//             // כאן תוכל להוסיף קוד לשליחת הנתונים לשרת או לטפל במידע כפי שתרצה
//         }
//     });
// });