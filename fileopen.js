var fs = require('fs');

function FileObject() {
    this.filename = '';
    this.file_exists = function(cb) {
        var that = this;
        console.log('About to open:' + this.filename);
        fs.open(this.filename, 'r', function(err, handle) {
            if (err) {
                console.log('Cant open:' + that.filename);
                cb(err);
                return;
            }
            fs.close(handle, function() {});
            cb(null, true);
        })
    }
}

var fo = new FileObject();
fo.filename = 'b.txt';
fo.file_exists(function(err,results){
    if(err){
        console.log('Aw,bummer:' + JSON.stringify(err));
        return;
    }
    console.log('file exists!!!');
})