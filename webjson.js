var http = require('http');

function hand_incoming_request(req,res){
    console.log('INCOMING REQUEST:' + req.method + ' ' + req.url);
    res.writeHead(200,{'content-type':'application/json'});
    res.end(JSON.stringify({error:null}) + '\n');
}

var s = http.createServer(hand_incoming_request);
s.listen(8080);