let db;

initSqlJs({
    locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/${file}`
}).then(SQL => {
    db = new SQL.Database();
    db.run(`
        CREATE TABLE users (
            id INTEGER PRIMARY KEY,
            username TEXT,
            password TEXT,
            balance REAL
        );
    `);
    
    db.run(`
        INSERT INTO users (username, password, balance) VALUES
        ('bob', 'pass', 69.00),
        ('admin', 'letmein', 999999.99);
    `);
});

document.getElementById("actuallogin").addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorBox = document.getElementById("error-box");
    const queryBox = document.getElementById("query-box");

    const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}';`;

    queryBox.textContent = query;

    let result;
    try {
        result = db.exec(query);
    } catch (err) {
        errorBox.innerHTML = `<p class="error">SQL error: ${err.message}</p>`;
        return;
    }

    if (result.length > 0 && result[0].values.length > 0) {
        const row = result[0].values[0];

        const loggedInUsername = row[1];
        const balance = row[3];


        sessionStorage.setItem("username", loggedInUsername);
        sessionStorage.setItem("balance", balance);

        window.location.href = "profile.html";
    } else {
        errorBox.innerHTML = `<p class="error">Invalid username or password.</p>`;
    }
});