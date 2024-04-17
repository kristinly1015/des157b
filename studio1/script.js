(function(){
    'use strict';

            const loading = document.querySelector('.fa-paw');
            const myVideo = document.querySelector('#myVideo');
            const fs = document.querySelector('.fa-expand-alt');
            const playToggle = document.querySelector('.fa-play');
            const volToggle = document.querySelector('.fa-volume-up');
            const volLevel = document.querySelector('#volumeLevel');
            let playing = false;  
            
            playToggle.addEventListener('click', function() {
            if (!playing) {
                myVideo.play();
                playToggle.className = 'fa-solid fa-pause';
                playing = true;
            } else {
                myVideo.pause();
                playToggle.className = 'fa-solid fa-play';
                playing = false;
            }
            });

            volToggle.addEventListener('click', function() {
            if (volToggle.className === 'fas fa-volume-up') {
                volToggle.className = 'fas fa-volume-mute';
                myVideo.muted = true;
            } else {
                volToggle.className = 'fas fa-volume-up';
                myVideo.muted = false;
            }

            volLevel.addEventListener('change', function() {
            changeVolume(volLevel.value);
            })

            function changeVolume(value) {
            myVideo.volume = value / 100;
            console.log('volume is ' + myVideo.volume);
            }
            });

            const line1 = document.querySelector('#line1');
            const line2 = document.querySelector('#line2');
            const line3 = document.querySelector('#line3');
            const line4 = document.querySelector('#line4');

            const poem = {
                start: [0, 3, 6, 9],
                stop: [2, 5, 8, 11],
                line: [line1, line2, line3, line4]
            }

            myVideo.addEventListener('playing', function() {
                loading.style.display = 'none';
            })

            const intervalID = setInterval(checkTime, 1000);

            function checkTime() {
                for (let i = 0; i < poem.start.length; i++) {
                    if (poem.start[i] < myVideo.currentTime && myVideo.currentTime < poem.stop[i]) {
                        poem.line[i].className = "showing";
                    } else {
                        poem.line[i].className = "hidden";
                    }
                }
            }

            fs.addEventListener('click', function() {
                if (!document.fullscreenElement) {
                    document.documentElement.requestFullscreen();
                } else {
                    document.exitFullscreen();
                }
            });

            const moon = document.querySelector('.fa-moon');
            const sun = document.querySelector('.fa-sun');

            moon.addEventListener('click',function(){
                myVideo.src= "./media/cat2.mp4";
                myVideo.setAttribute('poster',"./images/thumbnail2.jpg");
                line1.innerHTML= "It's nights like this";
                line1.style.fontFamily= "Kaushan Script";
                line2.style.fontFamily= "Kaushan Script";
                line3.style.fontFamily= "Kaushan Script";
                line4.style.fontFamily= "Kaushan Script";
            });

            sun.addEventListener('click',function(){
                myVideo.src= "./media/cat1.mp4";
                myVideo.setAttribute('poster',"./images/thumbnail.jpg");
                line1.innerHTML= "It's days like this";
                line1.style.fontFamily= "Kalam";
                line2.style.fontFamily= "Kalam";
                line3.style.fontFamily= "Kalam";
                line4.style.fontFamily= "Kalam";
            });

})();