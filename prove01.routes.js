
const fs = require('fs');
const users = [
    {name: 'Aaron Ameny', username: 'kihonhappo', status: 'Active'},
    {name: 'Jennifer Spencer', username: 'jspense', status: 'Active'},
    {name: 'John Brooke', username: 'jbrooke', status: 'Blocked'},
    {name: 'Will Brown', username: 'wbrown', status: 'Active'},
    {name: 'Dina Moreno Guevara', username: 'dmguevara', status: 'Blocked'}
]

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    let html = '';
    switch(url){
        case '/':
            res.setHeader('Content-Type', 'text/html');
            html = `
                <html>
                    <head>
                        <title>CSE 341 Prove W01</title>
                        <style>
                            .input-frm{margin-top: 100px; width: 300px; padding: 10px; margin: 0 auto; height: 200px; border: 1px solid black; text-align: center; marign-top: 50%;}
                            .controls{width: 95%; padding: 10px;}
                            .controls label{display: block; margin-bottom: 10px;}
                            .controls input[type=text]{width: 150px; padding: 5px; margin-bottom: 20px;}
                            .btn{border: 1px solid black; padding-top: 5px; padding-bottom: 5px; padding-left: 5px; padding-right: 5px;}
                            .list-cont-lft{}
                        </style>
                    </head>
                    <body>
                        <form class="input-frm" action="/create-user" method="POST">
                            <div class="controls">
                                <label>Please Enter a Name</label>
                                <input name="name" type="text" class="control-input" />
                                <label>Please Enter a Username</label>
                                <input name="username" type="text" class="control-input" />
                            </div>
                            <button type="submit" class="btn">Submit</button>
                        </form>
                    </body>
                </html>
            `;
            
            res.write(html);
            break;
        case '/users':
            res.setHeader('Content-Type', 'text/html');
            html = `
                <html>
                    <head>
                        <title>CSE 341 Users</title>
                        <style>
                            .user-table{
                                width: 100%;
	                            border-collapse: collapse; 
                            }
                            .user-table th{
                                background: #D6D6D6;
                                font-size: 1rem;
                                font-weight: 400;
                                color: #474443;
                                border-bottom: solid thin #C1C1C1;
                                border-right: solid thin #C1C1C1;
                                border-top: solid thin #D6D6D6;
                                border-left: solid thin #D6D6D6; 
                                padding: 10px;
                                
                            }
                            .user-table td{
                                padding: 6px 10px;
                                font-size: 1rem;
                                font-weight: 400;
                                color: #474443;
                                border-bottom: solid thin #C1C1C1;
                                border-right: solid thin #C1C1C1;
                                border-top: solid thin #D6D6D6;
                                border-left: solid thin #D6D6D6;
                            }

                            .user-table tr:nth-child(odd) {
                                background: #FFFFFF;
                                border-bottom: solid thin #C1C1C1;
                                border-right: solid thin #C1C1C1;
                                border-top: solid thin #D6D6D6;
                                border-left: solid thin #D6D6D6;
                            }

                            h3{text-align: center;}
                            .content{
                                margin-top: 100px;
                                width: 500px; margin: 0px auto; padding: 10px; height: 300px; border: 1px solid black;}
                            .status{font-weight: bold;}
                            .active{color: green;}
                            .blocked{color: red;}
                            .pending{color: orange;}
                        </style>
                    </head>
                    <body>
                        <main class="content">
                            <h3>User Manager</h3>
                            <table class="user-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Username</th>
                                        <th>Status</th>
                                </thead>
                                <tbody>
                                `;
            
            users.forEach((user) => {
                html += `<tr>
                            <td>${user.name}</td>
                            <td>${user.username}</td>
                            <td><span class="status ${user.status}">${user.status}</span></td>
                        </tr>`;
            });
            
            html +=  `          </tbody>
                            </table>
                        </main>
                    </body>
                </html>
            `;
            res.write(html);
            break;
        case '/create-user':
            const body = [];
            req.on('data', (chunk) => {
                body.push(chunk);
            });
            req.on('end', () => {
                const parsedBody = Buffer.concat(body).toString();
                let user = {};
                let vars = parsedBody.split('&');
                user.name = vars[0].split('=')[1].replace('+', ' ');
                user.username = vars[1].split('=')[1];
                user.status = 'Pending';
                console.log(parsedBody);
                console.log(user.name + ' ' + user.username);
                users.push(user);

            });
            res.statusCode = 302;
            res.setHeader('Location', '/users');

            break;
    }

    res.end();
};

module.exports = requestHandler;