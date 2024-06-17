//const submit = document.getElementById("submit")
//const reset = document.getElementById("reset")

const { log } = require("console");

// מערך מדומה של שמות משתמשים וסיסמאות
const users = [
    { username: 'user1', password: 'pass1' },
    { username: 'user2', password: 'pass2' },
    { username: 'user3', password: 'pass3' }
];
console.log()
document.getElementById('submit').addEventListener('click', function(event) {
    event.preventDefault(); // מניעת שליחת הטופס בצורה הרגילה

    const username = document.getElementById('Username').value;
    const password = document.getElementById('password').value;

    // בדיקה אם שם המשתמש והסיסמה קיימים במערכת
    const userExists = users.some(user => user.username === username && user.password === password);

    if (userExists) {
        window.location.href = "index2.html";
    } else {
        alert('Invalid username or password.');
    }
});


fetch('http://localhost:8080/666ead62617c725ba8f9cd43/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
})
.then(response => response.json())
.then(data => {
    if (data.message === 'Login successful!') {
        window.location.href = 'newPage.html';
    } else {
        document.getElementById('message').textContent = data.message;
        document.getElementById('message').style.color = 'red';
    }
})
.catch(error => {
    document.getElementById('message').textContent = 'Server error, please try again later.';
    document.getElementById('message').style.color = 'red';
});