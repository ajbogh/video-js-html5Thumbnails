video-js-html5Thumbnails
========================

A plugin for video.js to add thumbnail previews when hovering the mouse over the progress bar.

Setup
-----

Include the CSS

    <link href="js/video-js-html5Thumbnails/video-js-html5Thumbnails.css" rel="stylesheet">

Include the html5Thumbnails plugin

    <script type="text/javascript" src="js/video-js-html5Thumbnails/video-js-html5Thumbnails.js"></script>

Using HTML5 Thumbnails with Video.js
------------------------------------

Set up your video as you normally would with Video.js

    <video id="video" class="video-js vjs-default-skin"
        controls preload="auto" width="640" height="264"
        poster="http://video-js.zencoder.com/oceans-clip.png"
        data-setup='{"example_option":true}'>
        <source src="http://video-js.zencoder.com/oceans-clip.mp4" type='video/mp4' />
        <source src="http://video-js.zencoder.com/oceans-clip.webm" type='video/webm' />
        <source src="http://video-js.zencoder.com/oceans-clip.ogv" type='video/ogg' />
    </video>

Using Javascript, initialize Video.js

    <script>
        // initialize video.js on a video
        var video = videojs('video');

Then, initialize the plugin with the same video element ID.

        // initialize the html5Thumbnails plugin.
        // plugin requires the video id.
        video.html5Thumbnails({id:'video'});

Additional Options
------------------

The HTML5 Thumbnails plugin accepts some additional options during setup. Add these to the object which contains the video ID.

**id** - (string, required) The ID of the original video element.

**scale** - (decimal, optional) A number from 0 to 1 where 1 is 100% of the original video size and 0 is 0%. A default value of 0.35 is used.

**loaderSize** - (integer, optional) The number of pixels to make the loading spinner. If no value is present then the default of 32 pixels is used.

Example:

    video.html5Thumbnails({
        id:'video', 
        scale: 0.25,
        loaderSize: 25
    });
