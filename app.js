var Hapi = require('hapi'),
    Path = require('path'),
    Joi = require('joi'),
    Mongoose = require('mongoose');


var menuItems = {
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
        },
        {
            "name": "Register",
            "href": "/register"
        }
    ]
};

// Create a server with a host and port
var server = new Hapi.Server('localhost', 8001);

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
        
        reply.view('index', menuItems);
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

server.route({
    method: 'GET',
    path: '/register',
    handler: function (request, reply) {
        
        reply.view('register', { name: "batman" });
        
    }
});

server.route({
    method: 'POST',
    path: '/register',
    handler: function (request, reply) {
        
        Mongoose.connect('mongodb://localhost/grayscaledb');
        
        var db = Mongoose.connection;
        
        db.on('error', console.error.bind(console, 'connection error'));
        
        db.once('open', function callback() {
            
            console.log("Connection with database succeeded.");
        });
        
        var memberSchema = new Mongoose.Schema({
            firstName : { type: String },
            lastName : { type: String },
            email : { type: String },
            password : { type: String },
            created: { type: Date, "default": Date.now },
            updated: { type: Date, "default": Date.now }
        });
        
        var MemberModel = Mongoose.model('member', memberSchema, 'members');
        
        if (request.payload) {
            
            var memberModel = new MemberModel(request.payload);
            
            memberModel.save(function (err , newMember) {
                if (err) {
                    throw err;
                } else {
                    
                    reply.redirect('/'); //(newMember);
                }
            });

        } else {
            reply(false);
        }
    },
    config: {
        validate: {
            payload : {
                firstName : Joi.string().required(),
                lastName : Joi.string().required(),
                email : Joi.string().required(),
                password : Joi.string().required()
            }
        }
    }
});

// Start the server
server.start(function () {
    console.log('Server running at:', server.info.uri);
});