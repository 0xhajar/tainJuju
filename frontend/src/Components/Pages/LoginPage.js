import Navigate from "../Router/Navigate";

const LoginPage = () => {
    const main = document.querySelector('main');
    main.innerHTML = `<form><div class="container">
    <label for="uname"><b>Username</b></label>
    <input type="text" id="username" placeholder="Enter Username" name="uname" required>

    <label for="psw"><b>Password</b></label>
    <input type="password" id="password" placeholder="Enter Password" name="psw" required>

    <button type="submit">Login</button>
    </div></form>`
    document.addEventListener("submit", (e) => {
        e.preventDefault();
        login();
    });
};

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const data = {
        username,
        password,
    }
    fetch('http://localhost:3000/auths/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    }).then(response => {
        if (response.status !== 200) {
            throw new Error("Login failed");
        } else {
            return response.json();
        }
    }).then((result) => {
        localStorage.setItem("token", result.token);
        Navigate("/");
    })
}
export default LoginPage;