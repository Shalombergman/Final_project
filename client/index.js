//const submit = document.getElementById("submit")
//const reset = document.getElementById("reset")

// מערך מדומה של שמות משתמשים וסיסמאות
// const users = [
//     { username: 'user1', password: 'pass1' },
//     { username: 'user2', password: 'pass2' },
//     { username: 'user3', password: 'pass3' }
// ];

document.getElementById('submit').addEventListener('click', function(event) {
    event.preventDefault(); // מניעת שליחת הטופס בצורה הרגילה
    
    const username = document.getElementById('Username').value;
    const password = document.getElementById('password').value;
    getUserName(username,password)
    // בדיקה אם שם המשתמש והסיסמה קיימים במערכת
    // const userExists = users.some(user => user.username === username && user.password === password);

    // if (userExists) {
    //     window.location.href = "index2.html";
    // } else {
    //     alert('Invalid username or password.');
    // }
});


async function getUserName(username, password){
    fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.username ) {
            window.location.href = 'index2.html';
        } else {
            alert('Invalid username or password.');
            // document.getElementById('message').textContent = data.message;
            // document.getElementById('message').style.color = 'red';
        }
    })
    .catch(error => {
        alert('Invalid username or password.');
        //  document.getElementById('message').textContent = 'Server error, please try again later.';
        // document.getElementById('message').style.color = 'red';
    });
}