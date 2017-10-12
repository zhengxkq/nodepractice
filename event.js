var events = require('events');

function DownLoader(){

}

DownLoader.prototype = new events.EventEmitter();
DownLoader.prototype.__proto__ = events.EventEmitter.prototype;
DownLoader.prototype.url = null;
DownLoader.prototype.download_url = function(path){
    var self = this;
    self.url = path;
    self.emit('start',path);
    setTimeout(function(){
        self.emit('end',path);
    },2000);
};
var d = new DownLoader();
d.on('start',function(path){
    console.log('started downloading: ' + path);
});
d.on('end', function(path){
    console.log('finished downloading: ' + path);
});
d.download_url('http://marcwan.com')