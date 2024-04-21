(function() {
    'use strict';

    let globalData;
    let numDataPoints;
    async function getData(){
        const myFood = await fetch('./data/food.json');
        const data = await myFood.json();
        const dataPoints = Object.keys(data);
        globalData = Object.values(data);
        numDataPoints = dataPoints.length;
    }


    function showFoodInfo(point, data){
        const rating = ['like absolute rubbish!', 'boring & bland.', 'decent.', 'pretty good.', 'delicious!', 'like Gordon Ramsey made it!'];
        const foodImages = [
            '<img src= "./images/day1.png" alt="food images" width="400" height="403">',
            '<img src= "./images/day2.png" alt="food images" width="400" height="403">',
            '<img src= "./images/day3.png" alt="food images" width="400" height="403">',
            '<img src= "./images/day4.png" alt="food images" width="400" height="403">',
            '<img src= "./images/day5.png" alt="food images" width="400" height="403">',
            '<img src= "./images/day6.png" alt="food images" width="400" height="403">',
            '<img src= "./images/day7.png" alt="food images" width="400" height="403">',
            '<img src= "./images/day8.png" alt="food images" width="400" height="403">'
        ];

        
        document.querySelector('#time').innerHTML = data[point].time;
        document.querySelector('#meal').innerHTML = `I ate ${data[point].food}.`;

        document.querySelector('#foodimages').innerHTML = foodImages[point];


        document.querySelector('#statement').innerHTML = `I rate it a ${data[point].review} out of 5 because it tasted ${rating[data[point].review]}`;
    }


    document.addEventListener('mousemove', reportPos);

    let prevLoc = 0;

    function reportPos(event) {
        const windowSize = window.innerWidth;

        const timeSection = windowSize / numDataPoints;
        const xPos = event.clientX;
        const changeTime = Math.floor(xPos / timeSection);


        if (changeTime !== prevLoc) {
            showFoodInfo(changeTime, globalData);
            prevLoc = changeTime;
        }
    }

    getData();

})()