;(function(){
    var canvas = document.getElementById('canvas');

    function loadImage(url, callback){
	var image = new Image();
	image.onload = function(){
	    callback(this);
	}
	image.src = url;
    }

    loadImage('/image/sample.jpg', function(image){
	var context = canvas.getContext('2d');
	context.drawImage(image, 0, 0);
    });
})()
