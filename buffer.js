var http = require('http');
var fs = require('fs');
var path = require('path');

function handle_incoming_request(req, res) {
    if (req.method.toLowerCase() == 'get' && req.url.substring(0, 9) == '/content/') {
        serve_static_file(req.url.substring(9), res);
    } else {
        res.writeHead(404,{'Content-type':'application/json'});
        var out = {
            error:'not_found',
            message:req.url+'not found'
        }
        res.end(JSON.stringify(out) + '\n');
    }
}

function serve_static_file(file,res){
    var rs = fs.createReadStream(file);
    var ct = content_type_for_path(file);
    res.writeHead(200,{'content-type':ct});
    rs.pipe(res)
    rs.on('readable',function(){
        var d = rs.read();
        if(d){
            if(typeof d == 'string'){
                res.write(d);
            }else if(typeof d =='object' && d instanceof Buffer){
                res.write(d.toString('utf8'));
            }
        }
    });
    rs.on('end', function(){
        res.end();
    });
    rs.on('error', function(){
        res.writeHead(404,{'Content-type' : 'application/json'});
        var out = {
            error:'not_found',
            message:file+ 'not found'
        }
        res.end(JSON.stringify(out)+'\n');
        return;
    });
}

function content_type_for_path(file){
    var ext = path.extname(file);
    switch(ext.toLowerCase()){
        case '.html' : return 'text/html';
        case '.js' : return 'text/javascript';
        case '.css' : return 'text/css';
        case '.jpg' : 
        case '.jpeg' : return 'image/jpeg';
        default: return 'text/plain';
    }
}

var s = http.createServer(handle_incoming_request);
s.listen(8080);