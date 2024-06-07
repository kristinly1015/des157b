const ageSlider = document.getElementById('ageslider');
const screenTimeSlider = document.getElementById('screenTimeSlider');
const character = document.getElementById('character');
const healthBar = document.getElementById('health');
const healthIcon = document.querySelector('.fa-heartbeat');
const capturedValue = document.getElementById('capturedvalue');
const capturedValue2 = document.getElementById('capturedvalue2');
const closer = document.querySelector('.close');
const detailPanel = document.getElementById('detailpanel');

const healthData = {
    ageEffect: [
        { age: 0, health: 100 },
        { age: 20, health: 80 },
        { age: 40, health: 70 },
        { age: 60, health: 50 },
        { age: 80, health: 0 },
        { age: 100, health: 0 }
    ],
    screenTimeEffect: [
        { hours: 0, health: 100 },
        { hours: 4, health: 70 },
        { hours: 8, health: 60 },
        { hours: 12, health: 40 },
        { hours: 16, health: 20 },
        { hours: 20, health: 0 },
        { hours: 24, health: 0 }
    ]
};

const lifeStages = [
    { name: 'Child', range: [0, 13] },
    { name: 'Teen', range: [14, 21] },
    { name: 'Adult', range: [22, 60] },
    { name: 'Senior', range: [61, 100] }
];

const characterData = {
    Child: {
        healthy: { imgSrc: 'images/child1.png', story: 'Bob is a young, energetic child but loves to spend his time on his iPad. His parents allow him some internet access for education, and he is learning new intellectual topics through fun and interactive app games. Life is amazing!', color: 'green' },
        moderate: { imgSrc: 'images/child2.png', story: 'Bob believes his iPad is his whole entire world. He cannot stay off of the internet for more than 5 minutes at a time. His parents get upset with his low attention span and at how often he gets emotionally upset when they take his device.', color: 'yellow' },
        unhealthy: { imgSrc: 'images/child3.png', story: 'Bob is growing more addicted to his iPad and throws angry tantrums at his parents when they threaten to take the device from him. He considers reality boring and cannot feel content unless he is chronically on his iPad. He has very little friends and has trouble talking to his peers.', color: 'orange' },
        critical: { imgSrc: '', story: '', color: 'red' }
    },
    Teen: {
        healthy: { imgSrc: 'images/teen1.png', story: 'Bob limits his screen time and only uses his phone to maintain his education and social life. He is able to healthily balance out his homework, time with his family, and playing sports with friends for enjoyment. Bob has gotten a lot of positive recognition from teachers for his excellent academic performance.', color: 'green' },
        moderate: { imgSrc: 'images/teen2.png', story: 'Bob struggles with paying attention in class and feels the urge to always check his phone. His social relationships are dying and he prefers to stay in his room to be on the internet. He is addicted to endlessly scrolling through videos and feels uninterested in outdoor activities. His grades have slipped and he has developed ADHD and anxiety. He also questions his value and attractiveness based on social media standards.', color: 'yellow' },
        unhealthy: { imgSrc: 'images/teen3.png', story: 'Bob avoids speaking to his parents and gives up on all of his school assignments. He has developed low self esteem, severe ADHD, anxiety, and depression, and feels like no one in real life can understand him. This is because he lacks social cues and only has internet friends. He also got diagnosed with insomnia and has grown more confused with his sense of time and reality.', color: 'orange' },
        critical: { imgSrc: '', story: '', color: 'red' }
    },
    Adult: {
        healthy: { imgSrc: 'images/adult1.png', story: 'Bob is mainly off of his phone and social media, and has focused more on his career goals and relationships. He loves spending time with his significant other and visits his friends and family often. His research job at Kaiser Health is very fulfilling since he is able to connect to many people and help others on a daily basis.', color: 'green' },
        moderate: { imgSrc: 'images/adult2.png', story: 'Bob finds it hard to be productive at his job with his screen addiction and slacks off to go on his phone. He ignores his romantic partner and friendships because he prefers be alone to play video games and be on social media in his free time. His eye sight is deteriorating since he stares at his screen and stays up til 3 am on a daily basis. He also distracts himself from his depression and anxiety by staying in bed to watch Netflix as much as he can.', color: 'yellow' },
        unhealthy: { imgSrc: 'images/adult3.png', story: 'Bob\'s significant other and friends have all left him due to his lack of attention to their lives. He was also fired from his job for his excessive phone use and cognitive impairment. He is now required to wear high-prescription glasses due to vision damage and is at high risk for obesity with his low physical activity. Bob feels unfit for society\'s standards and believes he will never find love or a purpose in life.', color: 'orange' },
        critical: { imgSrc: '', story: '', color: 'red' }
    },
    Senior: {
        healthy: { imgSrc: '', story: '', color: 'green' },
        moderate: { imgSrc: 'images/old1.png', story: 'Bob is now retired from his healthcare job of 30 years and is enjoying many vacations with his lovely wife and kids. He primarily uses his phone to capture memories and to keep up with all of his loved ones. He has developed back and joint pain due to his low bone density but uses a walker to help him moving. Although he has typical health issues due to old age, he is happy with his life achievements and has no regrets.', color: 'green', color: 'yellow' },
        unhealthy: { imgSrc: 'images/old2.png', story: 'Bob has developed severe obesity and he is now imobilized with additional heart disease. He is also diagnosed with Alzheimer\'s Disease and requires an in-home nurse for daily function. He can no longer see nor hear properly due to always blasting music into his earbuds his entire life. His past loved ones have also forgotten about him so he clings onto his phone to escape his lonely reality. Bob no longer smiles and desperately wishes he could recall fonder moments from his lifetime.', color: 'orange' },
        critical: { imgSrc: 'images/old3.png', story: 'Bob is at the brink of death with his heart disease taking a toll on his body. His bone density is so fragile that he can easily break a bone with the wrong step. His eyesight and hearing are basically nonexistent and his memory loss has reduced his conscious awareness. His screen time use has exceeded all the energy he has left. Bob truly regrets his life decisions and knows that he will have to eventually pass unhappy and alone.', color: 'red' }
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
    character.style.transform = `scale(${health > 75 ? 0.9 : health > 50 ? 1 : health > 25 ? 1.05 : 1.1})`;
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
        <h2><i class="fas fa-male"></i> &nbsp; Life Stage: ${stage}</h2>
        <h3><i class="fas fa-briefcase-medical"></i> &nbsp; Health Status: ${healthStatus.charAt(0).toUpperCase() + healthStatus.slice(1)}</h3>
        <h3><i class="fas fa-book-open"></i> &nbsp; Story: ${data.story}</h3>
    `;
}

function updateHealth() {
    const age = parseInt(ageSlider.value);
    const screenTime = parseInt(screenTimeSlider.value);
    const health = getHealth(age, screenTime);

    healthBar.style.width = `${health}%`;
    capturedValue.textContent = `${screenTime} hours`;
    capturedValue2.textContent = `${age} years old`;

    const stage = highlightLifeStage(age);
    updateCharacterAppearance(health, stage);
    updateDetailPanel(stage, health);

    if (health === 0) {
        document.querySelector('#overlay3').className = 'showing';
    } else if (health>0){
        document.querySelector('#overlay3').className = 'hidden';
    }
}

ageslider.addEventListener('input', updateHealth);
screenTimeSlider.addEventListener('input', updateHealth);


updateHealth();
