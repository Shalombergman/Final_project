

document.getElementById('submit').addEventListener('click', function(event) {
    event.preventDefault(); 
    
    const username = document.getElementById('Username').value;
    const password = document.getElementById('Password').value;
    getUserName(username,password)
    
});

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