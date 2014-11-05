### FSA Assignments (1 - 4 )
*The Full-Stack Academy (FSA)*



- [x] Git / Github
- Add .gitignore file.
- Create branch '**feature/assignments/1-4**' for assignments
 
 
- [x] Hapi
- Create simple route for index page.
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
- use `<button type="button" class="btn btn-default" >` for button
- use `<ul class="nav navbar-nav">` for menu bar




