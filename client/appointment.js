
const username = document.getElementById("h2")
const det = JSON.parse(localStorage.getItem("user"))
username.innerText = `Hi ${det.username}`



async function getListappointments(){
    const get = JSON.parse(localStorage.getItem("user"))._id
    const fatch = await fetch(`http://localhost:8080/api/appointment/patientId/${get}`)
    const data =  await fatch.json()
    makeMeesge(data)
 }
 
 function makeMeesge(data) {
    
    const ch = document.getElementById("uy")
    data.sort(function(a,b){
        return a.date.localeCompare(b.date);
    })
    for(let i in data){
        let d = data[i].therapistId
        let h = data[i].date
        let g = data[i].meetTime
        ch.innerHTML += `<li class = "fg">therapistId:${d} date:${h} meetTime:${g} <button id = "${i}a" class = "re">delete</button></li>`    
    }
    for(let i in data ){
        document.getElementById(`${i}a`).addEventListener("click",function(event){
            deleteAppointment(data[i]._id)
        })
    }
 }
 getListappointments();


 async function deleteAppointment(appointmentId){
    
    
        const result = confirm("are you sure you want to delete?")
        if(result){
            const fatch = await fetch(`http://localhost:8080/api/appointments/${appointmentId}`,{
                method: "DELETE",
            })
            if(fatch.status == 204){
            alert("The delete was successfully set")
            location.reload();
        }   
       
   


    }
        
    
}

document.getElementById("gol").addEventListener("click",function(){
    window.location.href = "index2.html"
})
