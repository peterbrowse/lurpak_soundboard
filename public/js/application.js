var debug = true,
	audio_debug = false,
	loader_one,
	num_of_tracks,
	first_loaded = false;

$(document).ready(function(){
	sound_init();
});

//SOUND SETUP
function sound_init(){
	soundManager.setup({
		url: "/js/swf/",
		useHTML5Audio: true,
		preferFlash: false,
		flashVersion: 9,
		useHighPerformance: true,
		debugMode: audio_debug,
		debugFlash: false,
		flashLoadTimeout: 1000
	});
	
	soundManager.ontimeout(function(status) {
		soundManager.flashLoadTimeout = 0;
  		soundManager.onerror = {};
    	soundManager.reboot(); 
	});

	soundManager.onready(function() {
		preload();
	});
	
	function preload(){
		var loader_one = new PxLoader();
		
		
		loader_one.addSound(first_track_id,track_url_list[0]);
		
		loader_one.addProgressListener(function(e) { 
			if(debug){
				console.log("Loader One: " + log_percentage + "%");
			}
		});
		
		loader_one.addCompletionListener(function(e) {
		    first_loaded = true;
		});
	}
}

//FIXING FOREACH IN IE8
if (typeof Array.prototype.forEach != 'function') {
    Array.prototype.forEach = function(callback){
      for (var i = 0; i < this.length; i++){
        callback.apply(this, [this[i], i, this]);
      }
    };
}