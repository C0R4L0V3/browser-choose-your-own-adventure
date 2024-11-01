//-- query selector for Character Stats --
const userInfo = document.querySelector("#charStats");
const userName = document.querySelector("#userName");
const userHP = document.querySelector("#userHP");
const userRace = document.querySelector("#userRace");
const userArm = document.querySelector("#userArm");
const userWeap = document.querySelector("#userWeap");
const userAtt = document.querySelector("#userAtt");
const userDef = document.querySelector("#userDef");
const userGold = document.querySelector("#userGold")

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
        gold: 100,
    },
    chars: [
        {name: "Inigo Montoya", race: "Human", hp: 35, attack: 2, defense: 2},
        {name: "Aerovera", race: "Elf", hp: 30, attack: 3, defense: 1},
        {name: "Bolgrom", race: "Dwarf", hp: 40, attack: 1, defense: 3},
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
    // gameScenes: [
    //     advenStart, meadowDir, townDir, innDir, roomRent, blackSmithDir, dwarfPerk, notEnoughGoldBS, boughtRing
    // ],

};


let startGame = false
let charsPicked = false
let weapPicked = false      //<<--- put in an array
let armorPicked = false      //<< putting this in an array in broke the game
let charComplete = false

let questBegan = false
let questQued = false
let questCompleted = false
let questCompletePost = false


//=============== Functions ===============

//Dice generator, can be used for damage or healing
const randomDice = (min, max) => {
    const minDice = Math.ceil(min)
    const maxDice = Math.floor(max)
    return Math.floor(Math.random() * (maxDice + minDice) + minDice)
};

//================================ HELPERS =========================

//=================== Character Race Fuctions & Handler ======================

const pickChar = () => {

    choice1Btn.style.visibility = "visible";
    choice3Btn.style.visibility = "visible";

    reaction.innerText = "Who are you?"
    storyPrompt.innerText = "Please Select a Character";
    choice1Btn.innerText = "Inigo Montoya\nHuman\nHp: 35\n+2 att / + 2 Def";
    choice2Btn.innerText = "Aerovera\nElf\nHp: 30\n+3 att / + 1 Def";
    choice3Btn.innerText = "Bolgrom\nDwarf\nHp: 40\n+1 att / + 3 Def";
};

const charHandler = (num) => {
    
    charImg.style.visibility = "visible";
    charImg.style.backgroundImage = `url(./images/${game.chars[num].race.toLowerCase()}.jpeg)`;
    
    userInfo.style.visibility = "visible";

    game.character.name = game.chars[num].name;
    userName.innerText = game.chars[num].name;

    game.character.race = game.chars[num].race;
    userRace.innerText = "Race: " + game.chars[num].race;

    game.character.hp += game.chars[num].hp;
    userHP.innerText = "HP: " + game.chars[num].hp;

    game.character.attack += game.chars[num].attack;
    userAtt.innerText = "Attack: " + game.chars[num].attack;

    userDef.innerText = "Defence: " + game.chars[num].defense;
    game.character.defense += game.chars[num].defense;

    charsPicked = true;

}

//=================== Weapon Fuctions & Handler =====================

const pickWeap = ()=>{

    storyPrompt.innerText = "Please Select a Weapon";
    choice1Btn.innerText = "Sword & Shield\n +1 Att / +2 Def";
    choice2Btn.innerText = "Bow \n +2 Att / +1 Def";
    choice3Btn.innerText = "Great Hammer\n +3 Att / +0 Def";
};

const weapHandler = (num) => {
   
    game.character.weapon = game.weapons[num].name;
    userWeap.innerText = "Weapon: " + game.character.weapon;
    
    game.character.attack += game.weapons[num].attack;
    userAtt.innerText = "Attack: " + game.character.attack;

    game.character.defense += game.weapons[num].defense;
    userDef.innerText = "Defense: " + game.character.defense;


    weapPicked = true;
}

//=================== Armor Fuctions & Handler ======================

const pickArm = () => {

    storyPrompt.innerText = "Please Select a Armor";
    choice1Btn.innerText = "Leather\n +2 Att / +1 Def";
    choice2Btn.innerText = "Chain Mail \n +1 Att / +2 Def";
    choice3Btn.innerText = "Plate Armor\n +0 Att / +3 Def";
};

const armHandler = (num) => {

    game.character.armor = game.armors[num].name;
    userArm.innerText = "Armor: " + game.character.armor;

    game.character.attack += game.armors[num].attack;
    userAtt.innerText = "Attack: " + game.character.attack;

    game.character.defense += game.armors[num].defense;
    userDef.innerText = "Defense: " + game.character.defense;

    armorPicked = true;
    
}

//=============== EventListeners ===============

//-- Game Start Char Creation --
const init = () => {
 
    btns.forEach((btn, idx) => {
        btn.addEventListener('click', (event) => {
            console.log("start game", event.target.innerText)
            if(event.target.innerText === 'Start Game' && startGame === false){
                startGame = true
                console.log(startGame)
                pickChar()
            }
            else if (startGame === true && charsPicked === false){
                charHandler(idx)
                console.log(charsPicked)
                pickWeap()
            }  
            else if (charsPicked === true && weapPicked === false) {
                weapHandler(idx)
                pickArm()
                    
            }
            else if(weapPicked == true && charComplete === false){
                armHandler(idx)
                charComplete = true 
                // btn.removeEventListener('click', (event))
                advenStart()
                
            }
            btns.forEach((btn)=> {
                btn.removeEventListener('click', (event))
            }) 
        })
    })
}  


init()

//thank you Ian for explain on how to do remove listener events

//================= Meadow Functions & Handler ======================

const meadowHandler = (meadow) => {
        if(meadow.target === choice1Btn){
            townDir()
        }
        // else if(meadow.target === choice2Btn){
        //     forestDir()
        // }
        // else {
        //     oldChurchDir()
        // }
    
    btns.forEach((btn)=> {
        btn.removeEventListener('click', meadowHandler)
    })
}

const advenStart = () => {

    userGold.innerText = "Gold: "+ game.character.gold

    reaction.innerText = "You wake up in field within the lands of Avalon. Feeling well rested, you are excited to see what adventures are in store. There is a town, an old abandoned church, and a forest nearby"
    reaction.style.fontSize = "16px";
    reaction.style.lineHeight = "17px";

    storyImg.style.backgroundImage = `url(./images/meadow.jpg)`

    storyPrompt.innerText = "Where would you like to go?"

    choice1Btn.innerText = "Town"
    choice2Btn.innerText = "Old Church"
    choice3Btn.innerText = "Forest"

    btns.forEach((btn) => {
        btn.addEventListener('click', meadowHandler) 
    })
}



const meadowDir = () => {

    reaction.innerText = "You find yourself back in the meadows. There is a town, an old abandoned church and a forest nearby"
    // reaction.style.fontSize = "16px";
    // reaction.style.lineHeight = "17px";

    storyImg.style.backgroundImage = `url(./images/meadow.jpg)`

    storyPrompt.innerText = "Where would you like to go?"

    choice1Btn.innerText = "Town"
    choice2Btn.innerText = "Old Church"
    choice3Btn.innerText = "Forest"

    btns.forEach((btn) => {
        btn.addEventListener('click', meadowHandler)
 
    })
}

//================== Town Handler & Function ======================


const townHandler = (town) => {
    console.log(town.target.innerText)
    if(town.target === choice1Btn){    
        innDir()
    }
    else if(town.target === choice2Btn){
        blackSmithDir()
    }
    else {
        meadowDir()
    } 

    btns.forEach((btn)=> {
    btn.removeEventListener('click', townHandler)
    })
}

const townDir = ()=> {

    reaction.innerText = " You are in the small town of a HoneyWood. There is an Inn and a BlackSmith in town."

    storyImg.style.backgroundImage = `url(./images/town.jpg)`

    storyPrompt.innerText = "Where would you Like to go?"

    choice1Btn.innerText = "Inn"
    choice2Btn.innerText = "Blacksmith's"
    choice3Btn.innerText = "Meadow"


    btns.forEach((btn) => {
        btn.addEventListener('click', townHandler)
   
})
}

//================= Inn  Handlers & Functions ======================

const innHandler = (innHand) => {

    console.log(innHand.target.innerText)
    if(innHand.target === choice1Btn){
        questMain()
    }
    else if(innHand.target === choice2Btn){
        roomRent()
    }
    else {
        townDir()  
    }
    btns.forEach((btn)=> {
        btn.removeEventListener('click', innHandler)
    })
}



const innDir = () => {

    reaction.innerText = "As you enter the Inn it is busy, even durning the day. You see a woman who is distrought, perhaps she need some help? You could also rent a room and stay in town for a bit"

    storyImg.style.backgroundImage = `url(./images/inn.jpg)`

    storyPrompt.innerText = "What would you like to do?"

    choice1Btn.innerText = "Talk to woman\n (Quest)"
    choice2Btn.innerText = "Rent a Room\n 15 gold"
    choice3Btn.innerText = "Leave"

    btns.forEach((btn) => {
        btn.addEventListener('click', innHandler)   
    })
}

//

const roomHandler = (innRoom) => {

    console.log(innRoom.target.innerText)
    if(innRoom.target === choice1Btn){
        ignoreInn()
    }
    else {
        innDir()  
    }
    btns.forEach((btn) => {
        btn.addEventListener('click', roomHandler)
    })

    choice2Btn.style.visibility = "visible"
} 

const roomRent = () => {

    choice2Btn.style.visibility = "hidden"

    reaction.innerText = "As you approach the Innkeeper, you get a weird feeling"

    storyImg.style.backgroundImage = `url(./images/innkeeper.png)`

    storyPrompt.innerText = "What would you like to do?"

    choice1Btn.innerText = "Ignore the feeling\nRent the room\n (15 gold)"
    choice2Btn.innerText = ""
    choice3Btn.innerText = "Leave"

    btns.forEach((btn) => {
        btn.addEventListener('click', roomHandler)
        })
   }

const ignoreInn = () => {

    choice1Btn.style.visibility = "hidden"
    choice3Btn.style.visibility = "hidden"

    reaction.innerText = "Listening to you instincts is one of the first rules to being an Adventurer. And unfortunatly for you, you wont be able to learn form this mistake."

    storyImg.style.backgroundImage = `url(./images/innroom.jpg)`

    storyPrompt.innerText = "GAME OVER\nYou were murdered in your sleep and robbed"

    choice2Btn.innerText = "Play Again?"

    game.character.hp = 0
    userHP.innerText = "HP: " + game.character.hp
    game.character.armor= "None"
    userArm.innerText = "Armor: " + game.character.armor
    game.character.weapon= "None"
    userWeap.innerText = "Weapon: " + game.character.weapon
    game.character.defense = 0
    userDef.innerText ="Defence: " + game.character.defense
    game.character.attack = 0
    userAtt.innerText = "Attack: " + game.character.attack
    game.character.gold = 0
    userGold.innerText = "Gold: " + game.character.gold

    choice2Btn.addEventListener('click', (event) =>{
            console.log(event.target.innerText)
            if(event.target === choice2Btn){
            location.reload()
            }
        })
}

//================================================================================================
//==================================== QUEST =====================================================

const questHandler = (quest) => {

    if (questBegan === false){
        console.log(quest.target.innerText)
            if(quest.target === choice1Btn){
                innDir()
                btns.forEach((btn) => {
                    btn.addEventListener('click', questHandler)
                });
                 choice2Btn.style.visibility = "visible"
            }
            else {
                questBegan = true
                questMain()

                choice2Btn.sty
                btns.forEach((btn) => {
                    btn.addEventListener('click', questHandler)
                }) 
                
            }
    } 

    else if (questBegan === true && questQued === false){
        console.log(quest.target.innerText)
            if(quest.target === choice1Btn){
                innDir() 
                btns.forEach((btn) => {
                    btn.addEventListener('click', questHandler)
                }) 
                choice2Btn.style.visibility = "visible"
            }

            innDir() 
            questQued = true
            btns.forEach((btn) => {
                btn.addEventListener('click', questHandler)
            })
             choice2Btn.style.visibility = "visible"
  
    } 

    else if (questQued === true && questCompleted === false || questCompleted === true && questCompletePost === false){
            if(quest.target === choice1Btn && questQued === true && questCompleted === false){
                innDir()

            }
            else if (quest.target === choice1Btn && questCompleted === true && questCompletePost === false){

                game.character.gold += 50
                userGold.innerText = "Golc: " + game.character.gold
                queryCompletePost = true
                innDir()
            
            }

            btns.forEach((btn) => {
                btn.addEventListener('click', questHandler)
            })
             choice2Btn.style.visibility = "visible"
    }

    else if (questCompletePost === true){

        innDir()
            
        btns.forEach((btn) => {
            btn.addEventListener('click', questHandler)
        })
        choice1Btn.style.visibility = "visible"
        choice3Btn.style.visibility = "visible"

    }
        
        // console.log(quest.target.innerText)

        // game.character.gold += 50
        // userGold.innerText = "Golc: " + game.character.gold
        // queryCompletePost = true
        // innDir()
    
        // btns.forEach((btn) => {
        //     btn.addEventListener('click', questHandler)
        // })
    }
    




const questMain = () =>{

    if (questBegan === false){
    choice2Btn.style.visibility = "hidden"

    reaction.innerText = 'The woman notices you approaching. and she says, "Oh! you wouldnt happen to be an Adventurer? I could really use your help with something involing the old church.'

    storyImg.style.backgroundImage = `url(./images/Inngirl.jpg)`

    storyPrompt.innerText = "Will you help me?"

    choice1Btn.innerText = "Leave me alone, you Wench! \n (Leave)"
    choice3Btn.innerText = "Of course fair maiden!\n (Accept Quest)"

    }
    else if (questBegan === true && questQued === false){

      

        reaction.innerText = `"Oh Thank you Adventurer! I promise to pay you handsomely!"`

        storyImg.style.backgroundImage = `url(./images/Inngirl.jpg)`

        storyPrompt.innerText = `"Will you please take my ring to my husbanb's grave in the crypt in the Old Church?"`

        
        choice1Btn.innerText = "Sure, whatever.\nThis better pay well.\n (Leave)"
        choice3Btn.innerText = "Say no more!\n You can count on me \n (leave)"

    }
    else if (questQued === true && questCompleted === false || questCompleted === true && questCompletePost){

        choice2Btn.style.visibility = "hidden"

        reaction.innerText = `"Oh Adventurer you've returned!` 

        storyImg.style.backgroundImage = `url(./images/Inngirl.jpg)`

        storyPrompt.innerText = `"Have you taken my ring to my husbands grave?"`
        
        if (questQued === true && questCompleted === false ){

            choice1Btn.innerText = "Leave me alone, you Wench! \n (Leave)"
            choice3Btn.innerText = "Not yet fair Maiden \n (Leave"
        }
        else if (questCompleted === true && questCompletePost){

        choice1Btn.innerText = "Yes. Now pay up!\n(+50 Gold)\n(Leave)"
        choice3Btn.innerText = "Yes. May your husband rest in peace\n(+50 Gold)\n(Leave"
        }
    }

    // else if (questCompleted === true && questCompletePost === faslse){

    //     choice2Btn.style.visibility = "hidden"

    //     reaction.innerText = `"Oh Adventurer you've returned!` 

    //     storyImg.style.backgroundImage = `url(./images/Inngirl.jpg)`

    //     storyPrompt.innerText = `"Have you taken my ring to my husbands grave?"`


    //     choice1Btn.innerText = "Yes. Now pay up!\n(+50 Gold)\n(Leave)"
    //     choice3Btn.innerText = "Yes. May your husband rest in peace\n(+50 Gold)\n(Leave"

    // }

    else if (queryCompletePost === true){
        choice1Btn.style.visibility = "hidden"
        choice3Btn.style.visibility = "hidden"

        reaction.innerText = `"Thank you again Adventurer` 

        storyImg.style.backgroundImage = `url(./images/Inngirl.jpg)`

        storyPrompt.innerText = `"Safe travels!"`

    }
    btns.forEach((btn) => {
        btn.addEventListener('click', questHandler)
    })
}

//======================================= BLACK SMITH ===========================

const blacksmithHandler = (smith) => {
    if (smith.target === choice1Btn){
            if(game.character.gold >= 200 && game.character.race === "Dwarf"){
                dwarfPerk()
            }
            else if (game.character.gold >= 200){
                game.character.gold -= 200
                userGold.innerText = game.character.gold
                boughtRing()
            }
            else {
                notEnoughGoldBS()
            }
        }
        else {
            choice2Btn.style.visibility = "visible"
            townDir()
        }
        btns.forEach((btn)=> {
            btn.removeEventListener('click', blacksmithHandler)
        })
     }


const blackSmithDir = () => {

    btns.forEach((btn)=> {
        btn.removeEventListener('click', (event))
        })

    choice2Btn.style.visibility = "hidden"

    reaction.innerText = "As you enter the Blacksmith's shop, the smell of smoke and the sounds of metal clashing fills the air. The shop master is a Dwarf. And he has a ring for sale."

    storyImg.style.backgroundImage = `url(./images/blacksmith.jpg)`

    storyPrompt.innerText = "What would you like to do?"

    choice1Btn.innerText = "Buy ring\n(120 gold)"
    choice2Btn.innerText = ""
    choice3Btn.innerText = "Leave"

    btns.forEach((btn) => {
        btn.addEventListener('click', blacksmithHandler)
       
    })
}


const perkHandler = (perk) => {

    console.log(perk.target.innerText)
    if(perk.target === choice1Btn){
        if(game.character.gold >= 140){
            game.character.gold -= 140
            userGold.innerText = "Gold: " + game.character.gold
            boughtRing()
        }
        else {
            notEnoughGoldBS()
        }           
    }
    else {
        choice2Btn.style.visibility = "visible"
        townDir()  
    }
    btns.forEach((btn)=> {
        btn.removeEventListener('click', perkHandler)
    })
}

const dwarfPerk = () => {

    reaction.innerText = `"Ah a fellow kinsmen! Rare in these parts! I'll give it to you for 30% off!"`   
    storyImg.style.backgroundImage = `url(./images/blacksmith.jpg)`
    storyPrompt.innerText = "What would you like to do?"

    choice1Btn.innerText = "Buy ring \n (140 gold)"
    choice2Btn.innerText = ""
    choice3Btn.innerText = "Leave"

    btns.forEach((btn) => {
        btn.addEventListener('click', perkHandler)
    })
}

const poorHandler = (poor) => {
    console.log(poor.target.innerText)
    if(poor.target === choice2Btn){
        choice2Btn.style.visibility = "visible"
        townDir()
    }
    btns.forEach((btn)=> {
        btn.removeEventListener('click', poorHandler)
    }) 
}


const notEnoughGoldBS = () => {

    choice2Btn.style.visibility = "visible"
    choice1Btn.style.visibility = "hidden"
    choice3Btn.style.visibility = "hidden"

    reaction.innerText = `"GET OUT OF HERE YOU CHEAPSKATE!"`
    storyImg.style.backgroundImage = `url(./images/blacksmith.jpg)`
    storyPrompt.innerText = "You're being kick out!"

    choice2Btn.innerText = "Leave"
    
    btns.forEach((btn) => {
        btn.addEventListener('click', poorHandler)
    }) 
}

const ringHandler = (ring) => {
    console.log(ring.target.innerText)
    if(ring.target === choice2Btn){
    location.reload()
    }
}



const boughtRing = () => {

    choice2Btn.style.visibility = "visible"
    choice1Btn.style.visibility = "hidden"
    choice3Btn.style.visibility = "hidden"

    reaction.innerText = `WOW, it was Ring of WINNING?! What kinda dumb dwarf would give this away for so cheap!?`
    storyImg.style.backgroundImage = `url(./images/blacksmith.jpg)`
    storyPrompt.innerText = "You won! \n Play Again?"

    choice2Btn.innerText = "Play Again?"

    btns.forEach((btn) => {
        btn.addEventListener('click', (event) =>{
            console.log(event.target.innerText)
            if(event.target === choice2Btn){
            location.reload()
            }
        })
    })
    btns.forEach((btn)=> {
        btn.removeEventListener('click', ringHandler)
    })     
}





// const forestDir = () => {

// }

// const oldChurchDir = () =>{

// }








//=== template ===

// btns.forEach((btn) => {
//         btn.addEventListener('click', (event) => {
//             console.log(event.target.innerText)
//             if(event.target = choice1Btn){
             
//             }
//             else if(event.target = choice2Btn){
                
//             }
//             else {
              
//             }
//         })
//     })














//== debug smoketest==

    // reaction.innerText = ""
    // storyPrompt.innerHTML = ""
    // choice1Btn.innerText = ""
    // choice2Btn.innerText = ""
    // choice3Btn.innerText = ""


// console.log(startGame)
// console.log(racePicked)
// console.log(weapPicked)


























///==================== GRAVEYARD ======================

// const charCreateStatus = []

// let startGame = false
// let racePicked = false
// let weapPicked = false      //<<--- put in an array
// let armorPicked = false
// let charComplete = false


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


