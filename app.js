
//-- autoplay plays audio media--
// audioElement.play("#gameMusic");    

btns.forEach((btn) => {
    if (choice1Btn.addEventListener('click', (event) => {

    }))
    else if (choice2Btn.addEventListener('click', (event) =>{

    }))
    else if (choice3Btn.addEventListener('click', (event) =>{
        
    }))

})

//=============== Constants ===============

//--link files to pull form object arrays--
// const enemies = require('./data');
// const characterRace = require('./data');     << improper method
// const armors = require('./data');
// const weapons = require('.data');


//--query selector for Character Stats--
const userName = document.querySelector("#userName");
const userHP = document.querySelector("#userHP");
const userRace = document.querySelector("#userRace");
const userArm = document.querySelector("#userArm");
const userWeap = document.querySelector("#userWeap");
const userAtt = document.querySelector("#userAtt");
const userDef = document.querySelector("#userDef");

//--query selector for Enemy Stats--
const enemyName = document.querySelector("#enemyName");
const enemyAtt = document.querySelector("#enemyAtt");
const enemyDef = document.querySelector("#enemyDef");

//--query selectors for imgages--
const charImg = document.querySelector("#imgContainerChar");
const enemyImg = document.querySelector("#imgContainerEnemy");
const storyImg= document.querySelector("#imgContainerStory");

//--query selectors for story texts--
const  reaction = document.querySelector("#storyReaction");
const  storyPrompt = document.querySelector("#storyPrompt");

//--query selectors for each button & Input--
const charName = document.querySelector("#charName");
const btns = document.querySelectorAll("storyChoice")
const choice1Btn = document.querySelector(".choice1");
const choice2Btn = document.querySelector(".choice2");
const choice3Btn = document.querySelector(".choice3");


//game object
const game = {
    character: { 
        username: null,
        race: null, 
        armor: null, 
        weapon: null, 
        hp: 20, 
        attack: 0, 
        defense: 0
    },
    inventory: [        //<<--- possible expansion
        { name: "Potion", quantity: 0,},
        { name: "Arrows", quantity: 0,},
        { name: null, quantity: null,},
    ],
    quests :[       //<<-- possible expansion
        {name: null, completed: false}
    ],
};

//=============== Functions ===============

//Dice generator, can be used for damage or healing
const randomDice = (min, max) => {
    const minDice = Math.ceil(min)
    const maxDice = Math.floor(max)
    return Math.floor(Math.random() * (maxDice + minDice) + minDice)
};


const raceDecision = () => {
    storyPrompt.innerText = "Please Select a Race";
    choice1Btn.style.visibility = "visible";
    choice1Btn.innerText = "Human\n(male)";
    event.target.innerText = "Elf\n(female)";
    choice3Btn.style.visibility = "visible";
    choice3Btn.innerText = "Dwarf\n(male)";
}



//=============== EventListeners ===============

choice2Btn.addEventListener('click', (event)=> {
    // console.dir(choice2Btn)
    // console.log ("clicked")
    if (event.target.innerText === 'Start Game'){
        raceDecision()
    }
})

btns.forEach((btn) => {
    if (choice1Btn.addEventListener('click', (event) => {

    }))
    else if (choice2Btn.addEventListener('click', (event) =>{

    }))
    else if (choice3Btn.addEventListener('click', (event) =>{
        
    }))

})
