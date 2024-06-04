const ageSlider = document.getElementById('ageslider');
const screenTimeSlider = document.getElementById('screenTimeSlider');
const character = document.getElementById('character');
const healthBar = document.getElementById('health');
const healthIcon = document.querySelector('.fa-heartbeat');
const capturedValue = document.getElementById('capturedvalue');
const closer = document.querySelector('.close');


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
    { name: 'Child', range: [0, 25] },
    { name: 'Teen', range: [26, 51] },
    { name: 'Adult', range: [52, 77] },
    { name: 'Senior', range: [78, 100] }
];

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
    document.querySelectorAll('.agelabels span').forEach(label => label.classList.remove('active'));
    for (const stage of lifeStages) {
        if (age >= stage.range[0] && age <= stage.range[1]) {
            document.getElementById(stage.name.toLowerCase() + 'Label').classList.add('active');
            break;
        }
    }
}

closer.addEventListener('click',function(event){
    event.preventDefault();
    document.querySelector('#overlay').className=
    'hidden'; 
    document.querySelector('#overlay2').className=
    'showing'; 
});

document.querySelector('.close2').addEventListener('click',function(event){
    event.preventDefault();
    document.querySelector('#overlay2').className=
    'hidden'; 
});

function updateCharacterAppearance(health) {
    if (health > 75) {
        character.style.transform = 'scale(1)';
        character.textContent = '😊';
        healthBar.style.backgroundColor = 'green';
        healthIcon.style.color = 'green';
    } else if (health > 50) {
        character.style.transform = 'scale(0.9)';
        character.textContent = '😐';
        healthBar.style.backgroundColor = 'yellow';
        healthIcon.style.color = 'yellow';
    } else if (health > 25) {
        character.style.transform = 'scale(0.8)';
        character.textContent = '😟';
        healthBar.style.backgroundColor = 'orange';
        healthIcon.style.color = 'orange';
    } else {
        character.style.transform = 'scale(0.7)';
        character.textContent = '😢';
        healthBar.style.backgroundColor = 'red';
        healthIcon.style.color = 'red';
    }
}

function updateHealth() {
    const age = parseInt(ageSlider.value);
    const screenTime = parseInt(screenTimeSlider.value);
    const health = getHealth(age, screenTime);

    healthBar.style.width = `${health}%`;
    capturedValue.textContent = `${screenTime} hours`;

    highlightLifeStage(age);
    updateCharacterAppearance(health);

}

ageslider.addEventListener('input', updateHealth);
screenTimeSlider.addEventListener('input', updateHealth);

updateHealth();

