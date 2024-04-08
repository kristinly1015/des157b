(function() {
    'use strict';

    const button = document.querySelector('button');
    const body = document.querySelector('body');
    const banner = document.querySelector('#banner');
    const sections = document.querySelectorAll('section');
    const sad = document.getElementById('sad');
    let mode = 'dark';


    button.addEventListener('click', function() {
        if (mode === 'dark') {
            body.className = 'switch';
            banner.className = 'switch';
            button.className = 'switch';

            for (const section of sections) {
                section.className = 'switch';
            }
            sad.src = "./images/happy.jpg";
            mode = 'light';
        } else {
            body.removeAttribute('class');
            banner.removeAttribute('class');
            button.removeAttribute('class');
            for (const section of sections) {
                section.removeAttribute('class');
            }
            sad.src = "./images/sad.jpg";
            mode = 'dark';

        }

    })


    button.addEventListener('mouseover', function(){
        sad.src = "./images/medium.jpg";
        document.querySelector('#text').innerHTML= "<p>TRANSFORM!</p>";
    })

    button.addEventListener('mouseout', function(){
        document.querySelector('#text').innerHTML= "";
        if (mode === 'dark') {
            sad.src = "./images/sad.jpg";
        } else {
            sad.src = "./images/happy.jpg";
        }
        if (mode === 'light') {
            sad.src = "./images/happy.jpg";
        } else {
            sad.src = "./images/sad.jpg";
        }
    })
})()