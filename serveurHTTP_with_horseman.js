/**
 * Created by daviddupont on 29/06/2016.
 */
//var url = require('url')
var Express = require('express');
var Horseman = require('node-horseman');
var app = Express();
var horseman = new Horseman();
//var url_parts = url.parse(request.url, true);
//var query = url_parts.query;

// routes will go here
app.get('/api/snapshot', function(req, res) {
    var url = req.query.url;
    var width = req.query.width;
    var height = req.query.height;
    var format = req.params.format;
    var zoom = req.params.zoom;



horseman.viewport(1024,726)
    .open(url)
    .wait(10000)
    /*.do(function(done){
        console.log('Waiting 20 secondes before screenshot...');
        setTimeout(done,10000);
        console.log('...Done');
    })*/
    .screenshotBase64('PNG')
    .then(function(imageBase64){
        var img = new Buffer(imageBase64, 'base64');
        console.log('Snapshot url:'+url+' taille:'+img.length);
        res.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': img.length
        });
        res.end(img);
        //res.setHeader('Content-Type', 'image/png');
        //res.end("<img src='"+imageBase64+" alt='+url+'/>");
    });
 });

app.listen(8080);
