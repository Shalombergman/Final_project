document.getElementById("form").addEventListener("submit",async function(event){
    event.preventDefault();

    

    const username = document.getElementById("newUsername").value;
    const password = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("PasswordAuthentication").value;

    if(password !== confirmPassword) {
        alert("sorry password do not match.");
        return;
    }

    const fatch = await fetch('http://localhost:8080/api/paietnt/',{
        method: 'POST',
        headers : {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username,password})
    })
    if(fatch.status == 201){
       alert("The create was successfully set")
       window.location.href = "index1.html"
    }
    else if(fatch.status == 404){
        alert("you already exist in the system")
        location.reload();
    }

    
        
    
})

