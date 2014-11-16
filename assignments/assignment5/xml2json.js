#!/usr/bin/env node

var fs = require('fs');

var parseString = require('xml2js')
	.parseString;

var argv = require('yargs')
    .usage('Usage: $0 -i [input xml path] -o [output json path]')
    .alias('i', 'input')
    .alias('o', 'output')
    .demand(['i','o'])
    .argv;

fs.readFile(argv.i, 'utf-8', function (err, data) {
 	if (err) throw err;

  	parseString(data, function (err, result) {

	    fs.writeFile(argv.o, JSON.stringify(result, null, 3), function(err){
	    	if (err) throw err;
	    });

	});
  	
  	
});



// console.log(__dirname);