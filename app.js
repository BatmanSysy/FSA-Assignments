var Hapi = require('hapi'),
	Path = require('path');

// Create a server with a host and port
var server = new Hapi.Server('localhost', 8000);

server.views({
    engines: {
        html: require('handlebars')
    },
    path: Path.join(__dirname, 'public')
});

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {

        reply.view('index', {
            menus: [
                {
                    "name": "About",
                    "href": "#about"
                },
                {
                    "name": "Portfolio",
                    "href": "#portfolio"
                },
                {
                    "name": "Download",
                    "href": "#download"
                },
                {
                    "name": "Contact",
                    "href": "#contact"
                },
                {
                    "name": "Map",
                    "href": "#map"
                }
            ]
        });
    }
});

server.route({
    method: 'GET',
    path: '/portfolio',
    handler: function (request, reply) {
        reply([
            {
                "href": "#portfolioModal2",
                "src": "img/portfolio/cake.png"
            },
            {
                "href": "#portfolioModal4",
                "src": "img/portfolio/game.png"
            },
            {
                "href": "#portfolioModal6",
                "src": "img/portfolio/submarine.png"
            }
        ]);
    }
});

server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: 'public',
            listing: true
        }
    }
});

// Start the server
server.start(function () {
    console.log('Server running at:', server.info.uri);
});