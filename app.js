//-- query selector for Character Stats --
const userInfo = document.querySelector("#charStats");
const userName = document.querySelector("#userName");
const userHP = document.querySelector("#userHP");
const userRace = document.querySelector("#userRace");
const userArm = document.querySelector("#userArm");
const userWeap = document.querySelector("#userWeap");
const userAtt = document.querySelector("#userAtt");
const userDef = document.querySelector("#userDef");

//-- query selector for Enemy Stats --
const enemyName = document.querySelector("#enemyName");
const enemyAtt = document.querySelector("#enemyAtt");
const enemyDef = document.querySelector("#enemyDef");

//-- query selectors for imgages --
const charImg = document.querySelector("#imgContainerChar");
const enemyImg = document.querySelector("#imgContainerEnemy");
const storyImg= document.querySelector("#imgContainerStory");

//-- query selectors for story texts --
const  reaction = document.querySelector("#storyReaction");
const  storyPrompt = document.querySelector("#storyPrompt");

//-- query selectors for each button & Input--
const charName = document.querySelector("#charName");
const btns = document.querySelectorAll(".btn");
const choice1Btn = document.querySelector(".choice1");
const choice2Btn = document.querySelector(".choice2");
const choice3Btn = document.querySelector(".choice3");

//-- query selctor for audio --
const vol = document.querySelector("audio");
vol.volume = 0.2;

//-- Game Object -- 

const game = {
    character: {
        name: null,
        race: null,
        hp: 0,
        armor: null,
        weapon: null,
        attack: 0,
        defense: 0,
    },
    races: [
        {race: "Human", hp: 35, attack: 2, defense: 2},
        {race: "Elf", hp: 30, attack: 3, defense: 1},
        {race: "Dwarf", hp: 40, attack: 1, defense: 3},
    ],
    weapons: [
        {name: "Sword and Sheild", attack: 1, defense: 2},
        {name: "Bow", attack: 2, defense: 1},
        {name: "Great Hammer", attack: 3, defense: 0},
    ],
    armors: [
        {name: "Leather", attack: 2, defense: 1,},
        {name: "Chain Mail", attack: 1, defense: 2,},
        {name: "Plate Armor", attack: 0, defense: 3,},
    ],
};

const gameStatus = []

let startGame = false
let racePicked = false
let weapPicked = false      //<<--- put in an array
let armorPicked = false
let charComplete = false

//=============== Functions ===============

//Dice generator, can be used for damage or healing
const randomDice = (min, max) => {
    const minDice = Math.ceil(min)
    const maxDice = Math.floor(max)
    return Math.floor(Math.random() * (maxDice + minDice) + minDice)
};

//================================ HELPERS =========================

//=================== Character Race Fuctions & Handler ======================

const pickRace = () => {
    reaction.innerText = "Who are you?"
    storyPrompt.innerText = "Please Select a Character";
    choice1Btn.style.visibility = "visible";
    choice1Btn.innerText = "Human\nHp: 35\n+2 att / + 2 Def";
    choice2Btn.innerText = "Elf\nHp: 35\n+3 att / + 1 Def";
    choice3Btn.style.visibility = "visible";
    choice3Btn.innerText = "Dwarf\nHp: 35\n+1 att / + 3 Def";

};

const charHandler = (num) => {
    console.log('race')
    charImg.style.visibility = "visible";
    charImg.style.backgroundImage = `url(./images/${game.races[num].race.toLowerCase()}.jpeg)`;
    
    userInfo.style.visibility = "visible";

    userRace.innerText = "Race: " + game.races[num].race
    game.character.race = game.races[num].race

    userHP.innerText = "HP: " + game.races[num].hp
    game.character.hp = game.races[num].hp

    userAtt.innerText = "Attack: " + game.races[num].attack
    game.character.attack = game.races[num].attack

    userDef.innerText = "Defence: " + game.races[num].defense
    game.character.defense = game.races[num].defense

    console.log(game.character)
}

//=================== Weapon Fuctions & Handler =====================

const pickWeap = ()=>{
    storyPrompt.innerText = "Please Select a Weapon";
    choice1Btn.innerText = "Sword & Shield\n +1 Att / +2 Def";
    choice2Btn.innerText = "Bow \n +2 Att / +1 Def";
    choice3Btn.innerText = "Great Hammer\n +3 Att / +0 Def";
};

const weapHandler = (num) => {
    console.log('weap')
    userWeap.innerText = "Weapon: " + game.weapons[num].name;
    game.character.weapon = game.weapons[num].name

    userAtt.innerText = "Attack: " + (game.weapons[num].attack + game.character.attack);
    game.character.attack = game.weapons[num].attack + game.character.attack;

    userDef.innerText = "Defense: " + (game.weapons[num].defense + game.character.defense);
    game.character.defense = game.weapons[num].defense + game.character.defense;

    weapPicked = true
}

//=================== Armor Fuctions & Handler ======================

const pickArm = () => {

    storyPrompt.innerText = "Please Select a Armor";
    choice1Btn.innerText = "Leather\n +2 Att / +1 Def";
    choice2Btn.innerText = "Chain Mail \n +1 Att / +2 Def";
    choice3Btn.innerText = "Plate Armor\n +0 Att / +3 Def";
}



//=============== EventListeners ===============

//-- Game Start Char Creation --

btns.forEach((btn, idx) => {
    btn.addEventListener('click', (event) => {
        console.log(event.target.innerText)
        if(event.target.innerText === 'Start Game' && startGame === false){
            startGame = true
            console.log(startGame)
            pickRace()
        }
        else if (startGame === true && racePicked === false){
            charHandler(idx)
            racePicked = true
            console.log(racePicked)
            pickWeap()
        }  
        else if (racePicked === true && weapPicked === false) {
            weapHandler(idx)
            weapPicked = true
            console.log(weapPicked)
            reaction.innerText = ""
            storyPrompt.innerHTML = ""
            choice1Btn.innerText = ""
            choice2Btn.innerText = ""
            choice3Btn.innerText = ""
             
        } else {
         
        }


        // else if (weapPicked === true && armorPicked === false){
        //     pickArm()
        //     armHandler(idx)
        // }
        })
    
    })

//== debug smoketest==

    // reaction.innerText = ""
    // storyPrompt.innerHTML = ""
    // choice1Btn.innerText = ""
    // choice2Btn.innerText = ""
    // choice3Btn.innerText = ""


console.log(startGame)
console.log(racePicked)
console.log(weapPicked)


























///==================== GRAVEYARD ======================

//-- autoplay plays audio media--
// audioElement.play("#gameMusic");    

// import {characterRace} from "./data";



//=============== Constants ===============

//--link files to pull form object arrays--
// const enemies = require('./data');
// const characterRace = require('./data');     << improper method
// const armors = require('./data');
// const weapons = require('.data');


// btns.forEach((btn, idx) => {
//     btn.addEventListener('click', (event) => {
//         console.log(event.target.innerText)
//         if (event.target.innerText === 'Start Game'){
//             pickRace()
//         } else {
//             console.log('racecheck')
//             charRaceHelper(idx)
//         }
//     })
// })


// const races=[
//     {race: "Human", hp: 35, attack: 2, defense: 2},
//     {race: "Elf", hp: 30, attack: 3, defense: 1},
//     {race: "Dwarf", hp: 40, attack: 1, defense: 3},
// ];

// const weapons = [
//     {name: "Sword and Sheild", attack: 1, defense: 2},
//     {name: "Bow", attack: 2, defense: 1},
//     {name: "Great Hammer", attack: 3, defense: 0},
// ];


// choice2Btn.addEventListener('click', (event)=> {
//     // console.dir(choice2Btn)
//     // console.log ("clicked")
//     // if (event.target.innerText === 'Start Game'){
//     //     pickRace()
//     // }
// })

// else if (event.target.classList.contains("choice2") && event.target.innerText === "Elf") {
//     console.log("I'm an elf");
//     charImg.style.backgroundImage = "url(./images/Elf.jpeg)";
//     charRaceHelper(idx)
//      }

// else if (event.target.classList.contains("choice3") && event.target.innerText === "Dwarf") {
    //     console.log("I'm a dwarf")
    //     charImg.style.backgroundImage = "url(./images/dwarf.jpeg)";
    //     charRaceHelper(idx)
    //     }

        //-- race output --
        // btns.forEach((btn) => {
//     btn.addEventListener('click', (event) => {
//     if (event.target.classList.contains("choice1") && event.target.innerText === 'Human') {
//         console.log("I'm human")
//         charImg.style.backgroundImage = "url(./images/human.jpeg)"
//         charRaceHelper(0)
     
//          }

//     else if (event.target.classList.contains("choice2") && event.target.innerText === "Elf") {
//         console.log("I'm an elf");
//         charImg.style.backgroundImage = "url(./images/Elf.jpeg)";
//         charRaceHelper(1)
//          }

//     else if (event.target.classList.contains("choice3") && event.target.innerText === "Dwarf") {
//         console.log("I'm a dwarf")
//         charImg.style.backgroundImage = "url(./images/dwarf.jpeg)";
//         charRaceHelper(2)
    
//         }
//     else {
//         return null;
//     }
         
//     })
// })

// else if (choice2Btn.addEventListener('click', (event) =>{

    // }))
    // else if (choice3Btn.addEventListener('click', (event) =>{
        
    // }))


