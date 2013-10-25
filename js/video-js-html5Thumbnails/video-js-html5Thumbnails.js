/**
* register the html5Thumbnails plugin
*/
(function(){
	var defaults = {}, extend;
	extend = function(obj){
		var arg, prop, source;
		for (arg in arguments) {
			source = arguments[arg];
			for (prop in source) {
				if (source[prop] && typeof source[prop] === 'object') {
					obj[prop] = extend(obj[prop] || {}, source[prop]);
				} else {
					obj[prop] = source[prop];
				}
			}
		};
		return obj;
	};

	videojs.plugin('html5Thumbnails', function(options) {
		var addEventListener, div, settings, canvas, player, progressControl, duration, loader, scaleFactor, loaderSize;
		settings = extend(defaults, options);
		scaleFactor = settings.scale || 0.35;
		loaderSize = settings.loaderSize || 32;

		player = this;

		if(!settings.id){
			throw new Error("Invalid Parameter: an object containing the video ID is required. Example: video.html5Thumbnails({id:'video'})");
		}

		var video = document.getElementById(settings.id).getElementsByTagName("video")[0].cloneNode(true);
		video.className = "";
		video.removeAttribute("data-setup");
		video.muted = true;
		video.id = "vjs-thumbnail-video";

		// create the thumbnail
		div = document.createElement('div');
		div.className = 'vjs-thumbnail-holder';

		var w = player.width();
		var h = player.height();
		div.height = (h * scaleFactor > 32 ? h * scaleFactor : 32);
		div.width = (w * scaleFactor > 32 ? w * scaleFactor : 32);
		div.style.width = div.width;
		div.style.height = div.height;
		div.style.opacity = 0;
		video.height = div.height;
		video.width = div.width;

		div.appendChild(video);
		div.style.top = div.style.top - div.height;
		div.style.position = "absolute";

		loader = document.createElement('div');
		loader.style.position = "absolute";

		loader.style.width = loader.style.height = loader.width = loader.height = loaderSize;
		
		loader.className = "vjs-thumbnail-spinner";
		loader.style.left = (div.width / 2) - ((loader.width) / 2);
		loader.style.top = (div.height / 2) - ((loader.height) / 2);

		div.appendChild(loader);
	
		// add the thumbnail to the player
		progressControl = player.controlBar.progressControl;
		progressControl.el().appendChild(div);
		
		var timeout, hideInterval;

		var eventHandler = video.addEventListener ? "addEventListener" : "attachEvent";

		video[eventHandler]("seeked", function(){
			loader.style.display = 'none';
		});
		video[eventHandler]("timeupdate", function(){
			loader.style.display = 'none';
		});

		progressControl.el()[eventHandler]('mouseover', function(event) {
			clearInterval(hideInterval);
			div.style.opacity = '1';
			div.style.display = 'block';
			loader.style.display = 'block';

			if(settings.autoPlay){
				video.play(); //make sure the video doesn't continue downloading on mouse out.
			}

			var x = event.clientX;
			var percentX = x / w;

			if(timeout){
				clearTimeout(timeout);
			}
			timeout = setTimeout(function(){
				video.currentTime = player.duration() * percentX;
			}, 25);
		}, false);

		progressControl.el()[eventHandler]('mousemove', function(event) {
			clearInterval(hideInterval);
			var x = event.clientX;
			var percentX = x / w;

			div.style.opacity = '1';
			div.style.display = 'block';
			loader.style.display = 'block';

			if(x + (div.width / 2) > w){
				div.style.left = w - div.width;
			}else{
				if(x - (div.width / 2) < 0){
					div.style.left = 0;
				}else{
					div.style.left = x - (div.width / 2);
				}
			}

			if(timeout){
				clearTimeout(timeout);
			}
			timeout = setTimeout(function(){
				video.currentTime = parseInt(player.duration() * percentX);
			}, 25);
		}, false);


		progressControl.el()[eventHandler]('mouseout', function(){
			if(settings.autoPlay){
				video.pause(); //make sure the video doesn't continue downloading on mouse out.
			}
			hideInterval = setInterval(function(){
				if(div.style.opacity <= 0){
					clearInterval(hideInterval);
				}
				div.style.opacity = +(div.style.opacity)-.02;
			}, 10);
		}, false);
	});
})();