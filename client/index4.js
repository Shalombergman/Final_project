 async function getListappointments(){
    const get = JSON.parse(localStorage.getItem("user"))._id
    const fatch = await fetch(`http://localhost:8080/api/appointment/patientId/${get}`)
    const data =  await fatch.json()
    makeMeesge(data)
 }
 
 function makeMeesge(data) {
    
    const ch = document.getElementById("ul")
    for(let i in data){
        let d = data[i].therapistId
        let h = data[i].date
        let g = data[i].meetTime
        ch.innerHTML += `<li>therapistId:${d} date:${h} meetTime:${g}</li>`
    }
 }
 getListappointments();


   