const ageSlider = document.getElementById('ageslider');
const screenTimeSlider = document.getElementById('screenTimeSlider');
const character = document.getElementById('character');
const healthBar = document.getElementById('health');
const healthIcon = document.querySelector('.fa-heartbeat');
const capturedValue = document.getElementById('capturedvalue');
const capturedValue2 = document.getElementById('capturedvalue2');
const closer = document.querySelector('.close');
const detailPanel = document.getElementById('detailpanel');
const redo = document.getElementById('reset');
const warning = document.getElementById('warning');
const deathage = document.getElementById('deathage');
const deathtime = document.getElementById('hoursspent');


const healthData = {
    ageEffect: [
        { age: 0, health: 100 },
        { age: 20, health: 80 },
        { age: 40, health: 70 },
        { age: 60, health: 50 },
        { age: 80, health: 20 },
        { age: 90, health: 0 },
        { age: 100, health: 0 }
    ],
    screenTimeEffect: [
        { hours: 0, health: 100 },
        { hours: 4, health: 90 },
        { hours: 8, health: 70 },
        { hours: 12, health: 30 },
        { hours: 16, health: 10 },
        { hours: 20, health: 0 },
        { hours: 24, health: 0 }
    ]
};

const lifeStages = [
    { name: 'Child', range: [0, 13] },
    { name: 'Teen', range: [14, 21] },
    { name: 'Adult', range: [22, 59] },
    { name: 'Senior', range: [60, 100] }
];

const characterData = {
    Child: {
        healthy: { imgSrc: 'images/child1.png', story: 'Bob is a young, energetic child but loves to spend his time on his iPad. His parents allow him some internet access for education, and he is learning new intellectual topics through fun and interactive app games. Life is amazing!', color: 'green' },
        moderate: { imgSrc: 'images/child2.png', story: 'Bob believes his iPad is his whole entire world. He can\'t stay off of the internet for more than 5 minutes at a time. His parents get upset with his low attention span and at how often he gets emotionally upset when they take his device.', color: 'yellow' },
        unhealthy: { imgSrc: 'images/child3.png', story: 'Bob is growing more addicted to his iPad and throws angry tantrums at his parents when they threaten to take the device from him. He considers reality boring and cannot feel content unless he is chronically on his iPad. He has very little friends and has trouble talking to his peers.', color: 'orange' },
        critical: { imgSrc: '', story: '', color: 'red' }
    },
    Teen: {
        healthy: { imgSrc: 'images/teen1.png', story: 'Bob limits his screen time and only uses his phone to maintain his education and social life. He is able to healthily balance out his homework, time with his family, and playing sports with friends for enjoyment. Bob has gotten a lot of positive recognition from teachers for his excellent academic performance.', color: 'green' },
        moderate: { imgSrc: 'images/teen2.png', story: 'Bob\'s grades slipped as he struggles to focus in class with his phone use. His friendships are dying while he stays in his room to be on the internet. He\'s addicted to scrolling through videos and is uninterested in anything else. He also questions his worth based on social media standards.', color: 'yellow' },
        unhealthy: { imgSrc: 'images/teen3.png', story: 'Bob avoids his parents and gives up on his school assignments. He\'s developed low self esteem, ADHD, anxiety & depression. He feels like no one understands him because he lacks social cues and only has internet friends. He also has insomnia and is more confused with his sense of time and reality.', color: 'orange' },
        critical: { imgSrc: '', story: '', color: 'red' }
    },
    Adult: {
        healthy: { imgSrc: 'images/adult1.png', story: 'Bob is hardly on his phone and focuses more on his career goals and relationships. He loves spending time with his partner and visits his friends and family often. His research job at Kaiser Health is very fulfilling since he\'s able to connect to many people and help others on a daily basis.', color: 'green' },
        moderate: { imgSrc: 'images/adult2.png', story: 'Bob lacks productivity at his job with his screen addiction. He ignores his loved ones because he prefers to play games in his free time. His eye sight is worsening since he stays up using his screen til 3 am. He also distracts himself from his depression and anxiety by staying in bed to watch TV often.', color: 'yellow' },
        unhealthy: { imgSrc: 'images/adult3.png', story: 'Bob\'s relationships fell apart and he was fired for his excessive phone use and cognitive impairment. He needs high-prescription glasses due to vision damage and is at risk for obesity with his low physical activity. Bob feels unfit for society\'s standards and believes he will never find purpose in life.', color: 'orange' },
        critical: { imgSrc: '', story: '', color: 'red' }
    },
    Senior: {
        healthy: { imgSrc: 'images/old0.png', story: 'Bob is still active with great health. He prefers playing word puzzles for entertainment over using his phone and has a strong memory. He happily spends his time with his wonderful family with all the money he made over the years.', color: 'green' },
        moderate: { imgSrc: 'images/old1.png', story: 'Bob retired from his job of 30 years and is enjoying vacations with his family. He only uses his phone to keep up with his relationships. He\'s developed back & joint pain due to low bone density, but uses a walker for help. Although he has some health issues due to old age, he\'s happy with his life outcome and has no regrets.', color: 'green', color: 'yellow' },
        unhealthy: { imgSrc: 'images/old2.png', story: 'Bob has severe obesity, heart disease & Alzheimer\'s Disease. He can no longer see nor hear properly due to always blasting music on his earbuds his entire life. Everyone forgot about him so he stick to his phone to escape his loneliness. Bob no longer smiles and wishes he could recall fonder moments from his life.', color: 'orange' },
        critical: { imgSrc: 'images/old3.png', story: 'Bob\'s at the brink of death with his heart disease taking a toll on his body. His bone density\'s so fragile that he can easily break a bone with the wrong step. His sight and hearing are almost nonexistent and his memory is too far gone. Bob regrets his life decisions and knows that he\'ll have to pass away unhappy and alone.', color: 'red' }
    }
};

function findHealthValue(value, data, key) {
    for (let i = 0; i < data.length - 1; i++) {
        if (value >= data[i][key] && value <= data[i + 1][key]) {
            return data[i].health;
        }
    }
    return data[data.length - 1].health;
}

function getHealth(age, screenTime) {
    const ageHealth = findHealthValue(age, healthData.ageEffect, 'age');
    const screenTimeHealth = findHealthValue(screenTime, healthData.screenTimeEffect, 'hours');
    return (ageHealth + screenTimeHealth) / 2;
}

function highlightLifeStage(age) {
    let currentStage = '';
    for (const stage of lifeStages) {
        if (age >= stage.range[0] && age <= stage.range[1]) {
            currentStage = stage.name;
            break;
        }
    }
    return currentStage;
}

closer.addEventListener('click', function(event){
    event.preventDefault();
    document.querySelector('#overlay').className = 'hidden'; 
    document.querySelector('#overlay2').className = 'showing'; 
});

document.querySelector('.close2').addEventListener('click', function(event){
    event.preventDefault();
    document.querySelector('#overlay2').className = 'hidden'; 
});


document.querySelector('.close3').addEventListener('click', function(event){
    event.preventDefault();
    document.querySelector('#overlay3').className = 'hidden'; 
});


document.querySelector('h4').addEventListener('click', function(event){
    event.preventDefault();
    document.querySelector('#overlay4').className = 'showing'; 
});

document.querySelector('.close4').addEventListener('click', function(event){
    event.preventDefault();
    document.querySelector('#overlay4').className = 'hidden'; 
});



function updateCharacterAppearance(health, stage) {
    let healthStatus = 'healthy';
    if (health > 75) {
        healthStatus = 'healthy';
    } else if (health > 50) {
        healthStatus = 'moderate';
    } else if (health > 25) {
        healthStatus = 'unhealthy';
    } else {
        healthStatus = 'critical';
    }

    const data = characterData[stage][healthStatus];
    character.style.transform = `scale(${health > 75 ? 0.9 : health > 50 ? 0.95 : health > 25 ? 1 : 1.1})`;
    const characterImage = document.getElementById('characterimg');
    characterImage.src = data.imgSrc;
    healthBar.style.backgroundColor = data.color;
    healthIcon.style.color = data.color;
}

function updateDetailPanel(stage, health) {
    let healthStatus = 'healthy';
    if (health > 75) {
        healthStatus = 'healthy';
    } else if (health > 50) {
        healthStatus = 'moderate';
    } else if (health > 25) {
        healthStatus = 'unhealthy';
    } else {
        healthStatus = 'critical';
    }

    const data = characterData[stage][healthStatus];
    detailPanel.innerHTML = `
        <span id="heading3">Bob's Status</span>
        <h2><i class="fas fa-male"></i> Life Stage: <span class= "sub"> ${stage} </span> </h2>

        <h2><i class="fas fa-briefcase-medical"></i> Health Status: <span class= "sub"> ${healthStatus.charAt(0).toUpperCase() + healthStatus.slice(1)}</span></h2>

        <h2><i class="fas fa-book-open"></i> Story: <span class= "sub">${data.story} </span></h2>`;
}

redo.addEventListener('click', function(event){
    event.preventDefault();
    ageSlider.value = 0;
    screenTimeSlider.value = 8;
    capturedValue.textContent = `${screenTimeSlider.value} hours`;
    updateHealth();
});


function updateHealth() {
    const age = parseInt(ageSlider.value);
    const screenTime = parseInt(screenTimeSlider.value);
    const health = getHealth(age, screenTime);

    healthBar.style.width = `${health}%`;
    capturedValue.textContent = `${screenTime} hours`;
    capturedValue2.textContent = `${age} years`;

    const stage = highlightLifeStage(age);
    updateCharacterAppearance(health, stage);
    updateDetailPanel(stage, health);

    if (health <= 25) {
        warning.style.display = 'block';
    } else {
        warning.style.display = 'none';
    }

    deathage.textContent = age;
    deathtime.textContent = screenTime;

    if (health === 0) {
        document.querySelector('#overlay3').className = 'showing';
    } else if (health>0){
        document.querySelector('#overlay3').className = 'hidden';
    }

}

ageslider.addEventListener('input', updateHealth);
screenTimeSlider.addEventListener('input', updateHealth);


updateHealth();
