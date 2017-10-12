$(function(){
    var tmpl,
        tdata = {};
    
    var initPage = function(){

        $.get('/templates/home.html', function(d){
            tmpl = d;
        });

        $.get('/albums.json', function(d){
            $.extend(tdata,d.data);
        });

        $(document).ajaxStop(function(){
            var renderedPage = Mustache.to_html(tmpl, tdata);
            $('body').html(renderedPage);
        });
    }();
});