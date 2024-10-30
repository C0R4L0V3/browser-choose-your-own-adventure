
//-- autoplay plays audio media--
audioElement.play("#gameMusic");    

//=============== Constants ===============

//--link files to pull form object arrays--
const enemies = require('./data');
const characterRace = require('./data');
const armors = require('./data');
const weapons = require('.data');


//--query selectors for imgages
const charImg = document.querySelector("#imgContainerChar")
const enemyImg = document.querySelector("#imgContainerEnemy")
const storyImg= document.querySelector("#imgContainerStory")

//--query selectors for story texts--
const  reaction = document.querySelector("#storyReaction")
const  prompt = document.querySelector("#storyPrompt")

//--query selectors for each button & Input--
const choice1Btn = document.querySelector("#choice1");
const choice2Btn = document.querySelector("#choice2");
const choice3Btn = document.querySelector("#choice3");


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
    inventory: [
        { name: "Potion", quantity: 0,},
        { name: "Arrows", quantity: 0,},
        { name: null, quantity: null,},
    ],
};

//=============== Functions ===============

//Dice generator, can be used for damage or healing
const randomDice = (min, max) => {
    const minDice = Math.ceil(min)
    const maxDice = Math.floor(max)
    return Math.floor(Math.random() * (maxDice + minDice) + minDice)
};
