;(function(){
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    function loadImage(url, callback){
	var image = new Image();
	image.onload = function(){
	    callback(this);
	}
	image.src = url;
    }

    loadImage('/image/sample.jpg', function(image){
	context.drawImage(image, 0, 0);
    });
})()
