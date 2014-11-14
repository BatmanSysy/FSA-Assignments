#!/usr/bin/env node

var fs = require('fs');
var util = require('util');
var _ = require('lodash');

var parseString = require('xml2js').parseString;

var argv = require('yargs')
    .usage('Usage: $0 --file [input xml path] --split [split xml node]  --db [database name] --table [table name]')
    .demand(['file','split', 'db', 'table'])
    .argv;

// connect to mysql
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : ''
});

fs.readFile(argv.file, 'utf-8', function (err, data) {
 	if (err) throw err;

  var parseOptions = { 
    explicitArray: false, 
    explicitRoot: false,
    attrkey: '_type',  
    charkey: '_value' 
  };

  parseString(data, parseOptions, function (err, result) {
    if (err) throw err;

    connection.connect();

    connection.query('CREATE DATABASE IF NOT EXISTS '+ argv.db, function(err) {
      if (err) throw err;

      connection.query('use ' + argv.db, function(err){
        if (err) throw err;
        
        var queryCreateTable = util.format("CREATE TABLE IF NOT EXISTS %s ",  argv.table);
        var subQuery = [];
        var insertQuery = util.format("INSERT INTO %s (%s) values ", argv.table, _.keys(result[argv.split][0]).join(', '));
        var subInsertQuery = [];
        var x = [];
        _.each(result[argv.split], function(item, idx) {

          _.each(_.keys(item), function(key){
            var value = item[key]._value;
            var dataType = item[key]._type['data-type'];
            var dataSize = item[key]._type['data-size'] || 11;

            if(idx == 0) {
              subQuery.push(
                  util.format((dataType == 'string') ? " %s varchar(%d) " : " %s int(%d) ", key, dataSize)
              );
            }

            subInsertQuery.push(
              util.format((dataType == 'string') ? " '%s' " : " %d ", value)
            );

          });
          
          x.push('(' + subInsertQuery.join(',') + ')');
          
          subInsertQuery = [];

        });

        insertQuery = insertQuery.concat(x.join(', '));

        queryCreateTable = queryCreateTable.concat('(', subQuery.join(', '), ')');

        connection.query(queryCreateTable, function(err){
          if (err) throw err;

          console.log('Create Database');

          connection.query(insertQuery, function(err){
            if (err) throw err;

            console.log('Insert Data');

            connection.end();

          });

        });
      
      });
    
    });

	});
  	
  	
});
