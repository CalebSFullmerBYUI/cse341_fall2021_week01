let users = ['Ryan', 'Michael', 'Jim', 'Stanley'];

const routesHandler = (req, res) => {
    if (req.url == '/') {
        res.write('<html>');
        res.write('<body>');
        res.write('<p>Hello user, this is a greeting.</p>');
        res.write('<form action="/create-user" method="POST"><input type="text" name="newUser"><input type="submit" value="Add User"></form>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
    }

    if (req.url == '/users') {
        res.write('<html>');
        res.write('<body>');
        res.write('<H2>Users</H2>');
        res.write('<ul>');

        for (user of users) {
            res.write('<li>' + user + '</li>');
        }

        res.write('</ul>');
        res.write('<a href="/"><button>Home Page</button></a>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
    }

    if (req.url == '/create-user' && req.method == 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });

        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const newUser = parsedBody.split('=')[1].replace('+', ' ');
            console.log('New user submitted: ' + newUser);
            users.push(newUser);
        });

        res.statusCode = 302;
        res.setHeader('Location', '../users');
        return res.end();
    }

    res.end();
};

module.exports = routesHandler;