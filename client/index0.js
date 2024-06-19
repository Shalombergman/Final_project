async function createUser(){
    const fatch = await fetch('http://localhost:8080/api/paietnt/',{
        method: 'POST',
        headers : {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const res = await response.json()
    if(response.status == 201){
       alert("The create was successfully set")
       window.location.href = "index1.html"
    }
        
    
}