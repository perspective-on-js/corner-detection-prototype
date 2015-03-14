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

    function pointsOf(image){
	var gray = new jsfeat.matrix_t(image.width, image.height, jsfeat.U8_t | jsfeat.C1_t);
	jsfeat.imgproc.grayscale(image.data, image.width, image.height, gray, jsfeat.COLOR_RGBA2GRAY);

	var threshold = 20;
	jsfeat.fast_corners.set_threshold(threshold);

	var corners = [], border = 3;

	// you should use preallocated keypoint_t array
	for(var i = 0; i < image.width * image.height; ++i) {
	    corners[i] = new jsfeat.keypoint_t(0,0,0,0);
	}

	// perform detection
	// returns the amount of detected corners
	var count = jsfeat.fast_corners.detect(gray, corners, border);
	for (var index = 0; index < count; index++){
	    var point = corners[index];
	    context.beginPath();
	    context.arc(point.x, point.y, 5, 0, 2 * Math.PI, false);
	    context.fill();
	}
    }

    loadImage('/image/sample.jpg', function(image){
	context.drawImage(image, 0, 0);
	pointsOf(context.getImageData(0, 0, canvas.width, canvas.height));
    });

    window.canvas = canvas;
    window.context = context;
})()
