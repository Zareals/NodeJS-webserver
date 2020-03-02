const http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');

// Array of Mime Types;
var mimeTypes = {
    "html" : "text/html",
    "jpeg" : "image/jpeg",
    "jpg" : "image/jpeg",
    "png" : "image/png",
    "js" : "text/javascript",
    "css" : "text/css"
};

//Create Server
http.createServer((req, res)=>{
    const uri = url.parse(req.url).pathname;
    const FileName = path.join(process.cwd(),unescape(uri));
    console.log('Loading '+ uri);
    const stats;
    try{
    stats= fs.lstatSync(FileName);
    } catch(e){
        res.writeHead(404, {'Content-type': 'text/plain'});
        res.write('404 Not Found\n');
        res.end();
        return;
    }

    //Check

    if (stats.isFile()){
        var mimeType = mimeTypes[path.extname(FileName).split(".").reverse()[0]];
        res.writeHead(400, {'Content-type': mimeType});
        res.write('Jawek Bahi :)\n');
        var filestream = fs.createReadStream(FileName);
        filestream.pipe(res);

    }else if (stats.isDirectory()){
        res.writeHead(303, {
            'Location' : 'index.html'
        });
        res.end();
    }else {
        res.writeHead(500, {'Content-type': 'text/plain'});
        res.write('Jawek mouch Bahi :)\n');
        res.end();
    }
}).listen(3000);