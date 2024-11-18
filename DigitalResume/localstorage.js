
   
    var audio = document.getElementById("background-audio");

    if (localStorage.getItem("audioPlaying") === "true") {
        audio.play();  
    } else {
        audio.pause();  
    }
    audio.onplay = function() {
        localStorage.setItem("audioPlaying", "true"); 
    };

    audio.onpause = function() {
        localStorage.setItem("audioPlaying", "false");  
    };

