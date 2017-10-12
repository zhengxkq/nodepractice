var http = require('http');

function process_request(req, res) {
    var body = 'thanks for calling\n';
    var content_length = body.lengthd;
    res.writeHead(200, {
        'content_length':content_length,
        'content_type':'text/plain'
    });
    res.end(body);
}

var s = http.createServer(process_request);
s.listen(8080);