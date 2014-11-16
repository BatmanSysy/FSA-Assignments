#### FSA Assignments ( 1 - 4 ) 
<sup>*The Full-Stack Academy (FSA)*</sup>

- [x] Git / Github
- Add .gitignore file.
- Create branch '**feature/assignments/1-4**' for assignments
  
  
- [x] Hapi
- Create simple route for index page.
  >
  ```javascript
  server = new Hapi.Server('localhost', 8000);
  server.route({
      method: 'GET',
      path: '/',
      handler: function (request, reply) {
          reply.view('index');
      }
  });
  ```

- [x] jQuery
- Use jQuery.ajax to fetch data from Hapi server and manipulate DOM
  >
  ```javascript
  $(function() {
    var portfolioAPI = "http://localhost:8000/portfolio";
    $.getJSON(portfolioAPI, {
        format: "json"
    })
    .done(function( data ) {
        $.each( data, function( i, item ) {
            var div = $( "<div />", { "class": "col-sm-4 portfolio-item" });
            var a = $( "<a />", { 
                "href": item.href,
                "class": "portfolio-link", 
                "data-toggle": "modal",
                "html": "<div class='caption'><div class='caption-content'><i class='fa fa-search-plus fa-3x'></i></div></div>"
            });
            var img = $( "<img>", { "src": item.src, "class": "img-responsive" });
            $(img).appendTo(a);
            $(a).appendTo(div);
            $(div).appendTo( "#portfolio-list" );
        });
    });
  });
  ```

- [x] Bootstrap
- Use `<button type="button" class="btn btn-default" >` for button
- Use `<ul class="nav navbar-nav">` for menu bar


---


#### FSA Assignments ( 5 - 8 ) 
<sup>*The Full-Stack Academy (FSA)*</sup>


- [x] Node.js file handling
- Create a command-line program that can be run as follows; `node xml2json.js -i source.xml -o output.json`
- Use `yargs` to handle flags/params.


- [x] Linux
- Install and configure a simple virtual host on `nginx`
- Setup `reverse-proxy` in virtual host to Hapi server 

  >
  ```javascript
  upstream nodeapp {
      server 127.0.0.1:8001;
  }
  ```
  >
  ```javascript
  server {
      listen       80;
      server_name  localhost;
      location / {
          proxy_pass http://nodeapp/;
      }
  }
  ```


- [x] Hapi + Joi + Mongoose
- Create a new route `/register` in Hapi and design a form using Bootstrap
  
  > GET 
  ```javascipt
  server.route({
    method: 'GET',
    path: '/register',
    handler: function (request, reply) {
        reply.view('register', { name: "batman" });
    }
  });
  ```
  
  > POST
  ```javascipt
  server.route({
    method: 'POST',
    path: '/register',
    handler: function (request, reply) {
    .
    .  /* validate and save data */
    .
    }
  });
  ```
  
- Use validation on server-side with 'Joi'
  >
  ```javascript
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
  ```
  
- Save the data in a `Mongoose` model
  > Schema
  ```javascript
  var memberSchema = new Mongoose.Schema({
      firstName : { type: String },
      lastName : { type: String },
      email : { type: String },
      password : { type: String },
      created: { type: Date, "default": Date.now },
      updated: { type: Date, "default": Date.now }
  });
  ```
  > Model
  ```javascript
  var memberModel = new MemberModel(request.payload);
  memberModel.save(function (err , newMember) {
      if (err) {
          throw err;
      } else {
          reply.redirect('/');  // redirect to Home
      }
  });
  ```

- [x] XML to MySQL
- Create a command-line program that can be run as follows; `node xml2db.js --file source.xml --split post --db test --table input_data`
- Use `lodash` to find keys from array; `_.keys(item)`
- Use `mysql` for database
- Use `data-type` and `data-size` attributes to config column `type` and `size`

  >
  ```HTML
  <?xml version="1.0" encoding="UTF-8"?>
  <doc>
    <post>
      <name data-type='string' data-size='255'>Ace</name>
      <age data-type='integer' >20</age>
    </post>
    <post>
      <name data-type='string' data-size='255'>Base</name>
      <age data-type='integer'>30</age>
    </post>
  </doc>
  ```
  
 

