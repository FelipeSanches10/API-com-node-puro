//index.js

const http = require('http');

const { URL } = require('url');
const routes = require('./routes');

const server = http.createServer((request, response) => {
    const parsedUrl = new URL(`http://localhost:3000${request.url}`);
    console.log(`Request method: ${request.method} | Endpoint: ${parsedUrl.pathname}`);

    //Utilizando a função split para separar por uma barra os valores que estão dentro do array de rota:
    let { pathname } = parsedUrl;

    let id = null;

    const splitEndpoint = pathname.split('/').filter(Boolean);

    if (splitEndpoint.length > 1) {
        pathname = `/${splitEndpoint[0]}/:id`;
        id = splitEndpoint[1]; 1
    }

    const route = routes.find((typeRoute) => (
        typeRoute.endpoint === pathname && typeRoute.method === request.method
    ));

    if (route) {
        request.query = Object.fromEntries(parsedUrl.searchParams);
        request.params = { id };

        //Passando o método send para facilitar o uso dos statuscode e do body:
        response.send = (statuscode, body) => {
            response.writeHead(statuscode, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify(body));

        };

        route.handler(request, response);

    } else {
        response.writeHead(404, { 'Content-Type': 'text/html' });
        response.end(`Cannot ${request.method} ${parsedUrl.pathname}`);
    }

});

server.listen(3000, () => console.log('🔥 Server start at http://localhost:3000'));



