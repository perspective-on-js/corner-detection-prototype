;(function(){
    window.threshold = 20;
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var original;

    function loadImage(url, callback){
	var image = new Image();
	image.onload = function(){
	    callback(this);
	}
	image.src = url;
    }

    function pointsOf(image, options){
	var options = options || {};
	var gray = new jsfeat.matrix_t(image.width, image.height, jsfeat.U8_t | jsfeat.C1_t);
	jsfeat.imgproc.grayscale(image.data, image.width, image.height, gray, jsfeat.COLOR_RGBA2GRAY);

	var threshold = options.threshold || 20;
	jsfeat.fast_corners.set_threshold(threshold);

	var corners = [], border = 3;

	// you should use preallocated keypoint_t array
	for(var i = 0; i < image.width * image.height; ++i) {
	    corners[i] = new jsfeat.keypoint_t(0,0,0,0);
	}

	// perform detection
	// returns the amount of detected corners
	var count = jsfeat.fast_corners.detect(gray, corners, border);
	return {
	    count: count,
	    corners: corners
	}
    }

    function drawPoints(data, options){
	var options = options || {}
	context.fillStyle = options.color || '#00ff00';
	var count = data.count;
	var corners = data.corners;
	for (var index = 0; index < count; index++){
	    var point = corners[index];
	    context.beginPath();
	    context.arc(point.x, point.y, 5, 0, 2 * Math.PI, false);
	    context.fill();
	}

    }

    function drawPointsOnOriginal(){
	context.drawImage(original, 0, 0);
	var cornerData = pointsOf(context.getImageData(0, 0, canvas.width, canvas.height),{
	    threshold: window.threshold
	});
	drawPoints(cornerData);
	requestAnimationFrame(drawPointsOnOriginal);
    }

    loadImage('/image/sample.jpg', function(image){
	original = image;
	drawPointsOnOriginal();
    });

    var thresholdSlider = document.getElementById('threshold');
    thresholdSlider.value = window.threshold;
    thresholdSlider.addEventListener('change', function(){
	console.log(thresholdSlider.value);
	window.threshold = thresholdSlider.value;
    });

})()
