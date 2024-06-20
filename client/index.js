

document.getElementById('submit').addEventListener('click', function(event) {
    event.preventDefault(); 
    
    const username = document.getElementById('Username').value;
    const password = document.getElementById('Password').value;
    getUserName(username,password)
    
});
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

async function getUserName(username, password) {
    try {
        const response = await fetch('http://localhost:8080/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (data.username) {
            localStorage.setItem("user", JSON.stringify(data));
            window.location.href = 'appointment.html';
        } else {
            alert('Invalid username or password.');
        }
    } catch (error) {
        // console.error('Error:', error);
        alert('Invalid username or password.');
        location.reload();
    }
}
