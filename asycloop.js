var fs = require('fs');
var http = require('http');

function load_album_list(callback) {
    fs.readdir('albums', function(err, files) {
        if (err) {
            callback(err);
            return;
        }
        var only_dirs = [];
        (function iterator(index) {
            if (index == files.length) {
                callback(null, only_dirs);
                return;
            }
            fs.stat('albums/' + files[index], function(err, stats) {
                if (err) {
                    callback(err);
                    return;
                }
                if (stats.isDirectory()) {
                    only_dirs.push(files[index]);
                }
                iterator(index + 1)
            });
        })(0);

        // callback(null, files);
    })
}

function handle_incoming_request(req, res) {
    console.log('INCOMING REQUEST:' + req.method + ' ' + req.url);
    load_album_list(function(err, albums) {
        if (err) {
            res.writeHead(503, { 'content-type': 'application/json' });
            res.end(JSON.stringify(err) + '\n');
            return;
        }
        var out = {
            err: null,
            data: {
                albums: albums
            }
        }
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(JSON.stringify(out) + '\n');
    })
}

var s = http.createServer(handle_incoming_request);
s.listen(8080);