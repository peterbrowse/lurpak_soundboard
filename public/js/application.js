var debug = true,
	audio_debug = true,
	loader_one,
	first_loaded = false,
	fade_in = 1000,
	fade_out = 600;

$(document).ready(function(){
	sound_init();
	
	$('li').on("click", function(e){
		e.preventDefault();
		
		var id_to_play = $(this).attr("id");
		
		soundManager.play(id_to_play, {
			onplay: function(){
				$('#' + this.id).addClass("playing");
			},
			multiShotEvents: true,
			onfinish: function() {
				$('#' + this.id).removeClass("playing");
			}
		});
	});
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
		
		loader_one.addImage("/imgs/mushroom_bg.jpg");
		
		for (i = 0; i < number_of_songs; i++) {
			var track_id = "track_" + (i+1);
			
			if(Modernizr.audio.mp3) {
				var audio_format_key = ".mp3";
			} else if(Modernizr.audio.ogg) {
				var audio_format_key = ".ogg";
			}
			
			loader_one.addSound(track_id,"/audio/" + (i+1) + audio_format_key);
		}
		
		loader_one.addProgressListener(function(e) {
			var log_percentage = Math.round(e.completedCount / e.totalCount * 100);
			
			if(debug){
				console.log("Loader One: " + log_percentage + "%");
			}
		});
		
		loader_one.addCompletionListener(function(e) {
		    first_loaded = true;
		    
		    $('.preloader').fadeOut(fade_out, function(){
				$('.soundboard').css("display", "flex").hide().fadeIn(fade_in, function(){
					
				});
				
				var random_track = "track_" + getRandomInt(1, number_of_songs);  
					
					soundManager.play(random_track, {
						onplay: function(){
							$('#' + this.id).addClass("playing");
						},
						multiShotEvents: true,
						onfinish: function() {
							$('#' + this.id).removeClass("playing");
						}
					}); 
		    });
		    
		    
		    
		    if(debug){
				console.log("Loader One: Completed");
			}
		});
		
		$('.preloader').css("display", "flex").hide().fadeIn(fade_in, function() {
			loader_one.start();
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

//RANDOM NUMBER IN RANGE
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}