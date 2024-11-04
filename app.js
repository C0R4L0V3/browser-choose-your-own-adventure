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
const enemyStats = document.querySelector("#enemyStats")
const enemyName = document.querySelector("#enemyName");
const enemyHP = document.querySelector("#enemyHP")
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
    enemies: [
        { name: "bear", hp: 50, attack: 6, defense: 5, encountered: false, fighting: false, defeated: false, loot: []},
        { name: "skeleton", hp: 20, attack: 4, defense: 3, encountered: true, fighting: false, defeated: true, loot: []},
        { name: null, hp: 0, attack: 0, defense: 0, loot: []},
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

let playerTurn = null
let playerDefending = false

let mobDefending = false

//============== Combat Mechanics =============

// const randomDice = (min, max) => {
//     const minDice = Math.ceil(min)
//     const maxDice = Math.floor(max)
//     return Math.floor(Math.random() * (maxDice + minDice) + minDice)
// };

// const battle = (fight) => {

//     let firstMove = randomDice(1, 7)

//     console.log(fight.target)
//     console.log(fight.target.innerText)

//     game.enemies.forEach((mob)=>{
//         if(fight.target === choice1Btn && mob.encountered === true && mob.defeated === false){
//             // console.log(mob)
//                 if(firstMove > 0){
//                     playerTurn = true
//                     console.log('PLAYER TURN = ' + playerTurn)
//                 }      
//                 mob.fighting = true
//                 evalPhase()
//         }
//         else if (fight.target === choice3Btn){
//             console.log(fight.target);
//             enemyImg.style.visibility = "hidden"
//             enemyStats.style.visibility = "hidden"
//             oldChurchDir()  
//         }
        
//         btns.forEach((btn) => {
//             btn.removeEventListener('click', battle)
//         })
//     })
// }

// const evalPhase = () => {

//     game.enemies.forEach((mob) =>{
//         if(mob === 0 && mob.encountered === true && mob.defeated === false){
//             encounterBear() 
//         }
//         else if (mob === 1 && mob.encountered === true && mob.defeated === false){
//             encounterSkel() 
//         }
//     })

// }

// const playerDefend = () => {
//     playerDefending = true
//     game.character.defense *= 2
//     userDef.innerText = "Defense: " + game.character.defense
//     reaction.innerText = `You are bracing for an attack! \n defence increased to ${game.character.defense}`
// }

// const playerAttack = () => {

//     game.enemies.forEach((mob) =>{
//         if (mob.fighting === true){
//             damage = (randomDice(1, 9) + game.character.attack) - mob.defense //<<-- damage total
//             mob.hp -= damage
//                 if(mob.hp < 0) {
//                     mob.hp = 0
//                 }
//             reaction.innerText = `${mob.name} took ${damage} damage!` //<<-- changes the prompt
//             enemyHP.innerText ="HP: " + mob.hp//-- changes enemy hp display
//         }
//     })
// }

// const playerTurnHandler = (player) => {

//     console.log(player.target.innerText);
//     console.log('test');   


//     if (player.target === choice1Btn){     //<<--- attack choice

//         game.enemies.forEach((mob)=>{ //<<-- loops through enemy array
//                 if(playerTurn === true && mob.fighting === true){     //<<---determines which mob being faces
//                     if (mobDefending = true)
//                         playerAttack()
//                         mob.defense /= 2
//                         mobDefending = false
//                         enemyDef.innerText = "Defense: " + mob.defense
//                 } else {
//                     playerAttack()
//                 }
//             })
//         }

//     else if (playerTurn === true && player.target === choice2Btn){ //-- handles healing choice

//         if (game.character.race === "Human"){   //<<-- determines picked race for hp values

//             if (game.character.hp < 35){        
//                 game.character.hp += randomDice(1, 9)

//                 reaction.innerText = `You recovered some HP`
//                 userHP.innerText ="HP: " + game.character.hp 

//                 if (game.character.hp > 35){    //<<-- if healing exceeds race max, adjusts the hp back to max
//                     game.character.hp = 35
//                     userHP.innerText = "HP: " + game.character.hp 
//                 }
//             }
//             else if (game.character.hp === 35){ //<<-- if hp is maxed invalidates option and loops back through
//                 storyPrompt.innerText = "Invalid choice \n Please try again."
//                 encounterSkel()

//                 btns.forEach((btn) => {
//                     btn.removeEventListener('click', playerTurnHandler)
//                 })
//             }
//         }
//         else if (game.character.race === "Elf"){

//             if (game.character.hp < 30){
//                 game.character.hp += randomDice(1, 9)

//                 reaction.innerText = `You recovered some HP`
//                 userHP.innerText = "HP: " + game.character.hp 

//                 if (game.character.hp > 30){
//                     game.character.hp = 30
//                     userHP.innerText = "HP: " + game.character.hp 
//                 }
//             }
//             else if (game.character.hp === 30){
//                 storyPrompt.innerText = "Invalid choice \n Please try again."
//                encounterSkel()

//                btns.forEach((btn) => {
//                 btn.removeEventListener('click', playerTurnHandler)
//             })
//             }
//         }

//         else if (game.character.race === "Dwarf"){
//             if (game.character.hp < 40){
//                 game.character.hp += randomDice(1, 9)

//                 reaction.innerText = `You recovered some HP`
//                 userHP.innerText ="HP: " + game.character.hp 

//                 if (game.character.hp > 40){
//                     game.character.hp = 40
//                     userHP.innerText ="HP: " + game.character.hp 
//                 }
//             }
//             else if (game.character.hp === 40){
//                 storyPrompt.innerText = "Invalid choice \n Please try again."
//                 encounterSkel()

//                 btns.forEach((btn) => {
//                     btn.removeEventListener('click', playerTurnHandler)
//                 })
//             }
//         }
//     }

//     else if (playerTurn === true && player.target === choice3Btn){
//                     //-- increases defense stat for 1 turn
//         playerDefend()
//     }

//     btns.forEach((btn) => {
//         btn.removeEventListener('click', playerTurnHandler)
//     })

//     playerTurn = false
//     evalPhase()

// }

// const mobAttack = () => {
//     damage = (randomDice(1, 9) + mob.attack) - game.character.defense
//     game.character.hp -= damage
//         if(game.character.hp < 0 ) {
//             game.character.hp = 0
//         }
//     userHP.innerText = "HP: "+ game.character.hp
//     reaction.innerText = `You took ${damage} damage`  
// }

// const mobDefend = () => {
//     mobDefending = true
//     mob.defense *= 2
//     enemyDef.innerText = "Defense: " + mob.defense
//     reaction.innerText = `${mob.name}'s defense has gone up.`
// }

// const mobTurnHandler = () => {

//     visibility1()
 
//      game.enemies.forEach((mob) => {
//          if(mob.fighting === true){
//              if (randomDice(1, 7) >= 4){
//                  if(playerDefending === true){
//                      damage = (randomDice(1, 9) + mob.attack) - game.character.defense
//                      game.character.hp -= damage
//                          if(game.character.hp < 0 ) {
//                              game.character.hp = 0
//                          }
//                      userHP.innerText = "HP: "+ game.character.hp
//                      reaction.innerText = `You took ${damage} damage`  
//                      game.character.defense /= 2
//                      playerDefending = false
//                      userDef.innerText = "Defense: " + game.character.defense
//                  }
//                  else{
//                      damage = (randomDice(1, 9) + mob.attack) - game.character.defense
//                      game.character.hp -= damage
//                          if(game.character.hp < 0 ) {
//                              game.character.hp = 0
//                          }
//                      userHP.innerText = "HP: "+ game.character.hp
//                      reaction.innerText = `You took ${damage} damage`  
//                  }
//              }
//              else {
//                  mobDefending = true
//                  mob.defense *= 2
//                  enemyDef.innerText = "Defense: " + mob.defense
//                  reaction.innerText = `${mob.name}'s defense has gone up.`
//              }
//          }   
//      })
 
//      btns.forEach((btn) => {
//          btn.removeEventListener('click', mobTurnHandler)
//      })
     
//      playerTurn = true
//      evalPhase()
//  }
//=============== Game Start & Char Creation ===============

const controller = new AbortController()    //imported function
const {signal} = controller

const init = () => {
      
    btns.forEach((btn, idx) => {
        btn.addEventListener('click',(event)=>{
        initClose(event, idx)
        }, {signal})   
    
    })
}

init()

const initClose = (event, idx) => {
    console.log (idx)
        if(event.target.innerText === 'Play' && startGame === false){
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
            controller.abort()
            advenStart() 
        }
    }


// ============== Game Over ============

const gameOver = () => {

    visibility1()

    storyPrompt.innerText - " Try Again?"

    choice2Btn.innerText = " Restart"

    choice2Btn.addEventListener(()=>{
        location.reload()
    })

}

//===========button visiblity =====

const visibility1 = () => {
    choice1Btn.style.visibility = "hidden"
    choice2Btn.style.visibility = "visible"
    choice3Btn.style.visibility = "hidden"
}

const visibility2 = () => {
    choice1Btn.style.visibility = "visible"
    choice2Btn.style.visibility = "hidden"
    choice3Btn.style.visibility = "visible"
}

const visibility3 = () => {
    choice1Btn.style.visibility = "visible"
    choice2Btn.style.visibility = "visible"
    choice3Btn.style.visibility = "visible"
}

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
}

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
    console.log(armorPicked)
    
}

//================= Meadow Functions & Handler ======================

const meadowHandler = (meadow) => {
    console.log(meadow.target.innerText)
    if(meadow.target === choice1Btn){
        townDir()
    }
    else if(meadow.target === choice2Btn){
        oldChurchDir()
    }
    else if(meadow.target === choice3Btn){
        forestDir()    
    }

    controller.abort()
    btns.forEach((btn)=> {
    btn.removeEventListener('click', meadowHandler)
    })
    
}


const advenStart = () => {

    visibility3()

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

    visibility3()

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

    controller.abort()

    btns.forEach((btn)=> {
    btn.removeEventListener('click', townHandler)
    })
} 



const townDir = ()=> {

    visibility3()

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
    else {innHand.target === choice3Btn
        townDir()  

    }

    controller.abort()

    btns.forEach((btn)=> {
        btn.removeEventListener('click', innHandler)
        })
}

const innDir = () => {

    visibility3()

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

const roomHandler = (room) => {

    console.log(room.target.innerText)
    if(room.target === choice1Btn){
        ignoreInn()

    }
    else if(room.target === choice3Btn){
        choice2Btn.style.visibility = "visible"
        innDir()
    }

    controller.abort()
    
    btns.forEach((btn) => {
        btn.addEventListener('click', roomHandler)
    })
} 

const roomRent = () => {

    visibility2()

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

const ingnoreHandler = (ignore) => {

    controller.abort()

    if(ignore.target === choice2Btn){
        location.reload()
        }  
}


const ignoreInn = () => {

   visibility1()

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

    choice2Btn.addEventListener('click', ingnoreHandler)
}


//================================ QUEST =====================================================

const questHandler = (quest) => {

    console.log(quest.target.innerText)

    if (questBegan === false){
        if(quest.target === choice1Btn){
            innDir()

            btns.forEach((btn) => {
                btn.removeEventListener('click', questHandler)
            })
        }
        else if (quest.target === choice3Btn){
            questBegan = true
            questMain()
        }
    } 

    else if (questBegan === true && questQued === false){
        if(quest.target === choice1Btn){
            innDir() 

        } 
        else if (quest.target == choice3Btn){
            innDir() 

        }
        questQued = true
        console.log(questQued);
        btns.forEach((btn) => {
            btn.removeEventListener('click', questHandler)
        })

    } 

    else if (questQued === true && questCompleted === false){
        innDir()
        btns.forEach((btn) => {
            btn.removeEventListener('click', questHandler)
        })

    }

    else if (questCompleted === true && questCompletePost === false){
        
        // if(quest.target === choice1Btn){
        game.character.gold += 100
        userGold.innerText = "Gold: " + game.character.gold
        questCompletePost = true
        innDir() 
        
        btns.forEach((btn) => {
            btn.removeEventListener('click', questHandler)
        })

    }

    else if (questCompletePost === true){
        // if(quest.target === choice2Btn){
            innDir()
        // }
        btns.forEach((btn) => {
            btn.removeEventListener('click', questHandler)
        })
    }
    
}

const questMain = () =>{

    if (questBegan === false){
        visibility2()

        reaction.innerText = 'The woman notices you approaching. and she says, "Oh! you wouldnt happen to be an Adventurer? I could really use your help with something involing the old church.'

        storyImg.style.backgroundImage = `url(./images/Inngirl.jpg)`

        storyPrompt.innerText = "Will you help me?"

        choice1Btn.innerText = "Leave me alone, you Wench! \n (Leave)"
        choice3Btn.innerText = "Of course fair maiden!\n (Accept Quest)"

    }
    else if (questBegan === true && questQued === false){

        visibility2()

        reaction.innerText = `"Oh Thank you Adventurer! I promise to pay you handsomely!"`

        storyImg.style.backgroundImage = `url(./images/Inngirl.jpg)`

        storyPrompt.innerText = `"Will you please take my ring to my husband's grave in the crypt in the Old Church?"`

        
        choice1Btn.innerText = "Sure, whatever.\nThis better pay well.\n (Leave)"
        choice3Btn.innerText = "Say no more!\n You can count on me \n (leave)"

    }
    else if (questQued === true && questCompleted === false){

        visibility2()

        reaction.innerText = `"Oh Adventurer you've returned!` 

        storyImg.style.backgroundImage = `url(./images/Inngirl.jpg)`

        storyPrompt.innerText = `"Have you taken my ring to my husband's grave?"`
        
        choice1Btn.innerText = "Leave me alone, you Wench! \n (Leave)"
        choice3Btn.innerText = "Not yet fair Maiden \n (Leave"
        
    }

    else if (questCompleted === true && questCompletePost === false){

        visibility2()

        reaction.innerText = `"Oh Adventurer you've returned!` 

        storyImg.style.backgroundImage = `url(./images/Inngirl.jpg)`

        storyPrompt.innerText = `"Have you taken my ring to my husband's grave?"`


        choice1Btn.innerText = "Yes. Now pay up!\n(+100 Gold)\n(Leave)"
        choice3Btn.innerText = "Yes. May your husband rest in peace\n(+100 Gold)\n(Leave"

    }

    else if (questCompletePost === true){

        visibility1()

        reaction.innerText = `"Thank you again Adventurer"` 

        storyImg.style.backgroundImage = `url(./images/Inngirl.jpg)`

        storyPrompt.innerText = `"Safe travels!"`

        choice2Btn.innerText = "Leave"
        
    }
    btns.forEach((btn) => {
        btn.addEventListener('click', questHandler)
    })

}

//======================================= BLACK SMITH ===========================

const blacksmithHandler = (smith) => {

    console.log(smith.target.innerText);
    

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
            townDir()
        }

        btns.forEach((btn)=> {
            btn.removeEventListener('click', blacksmithHandler)
        })
}

const blackSmithDir = () => {

    visibility2()

    reaction.innerText = "As you enter the Blacksmith's shop, the smell of smoke and the sounds of metal clashing fills the air. The shop master is a Dwarf. And he has a ring for sale."

    storyImg.style.backgroundImage = `url(./images/blacksmith.jpg)`

    storyPrompt.innerText = "What would you like to do?"

    choice1Btn.innerText = "Buy ring\n(200 gold)"
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
        
        townDir()  
    }
    btns.forEach((btn)=> {
        btn.removeEventListener('click', perkHandler)
    })
    
}

const dwarfPerk = () => {

    visibility2()

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

};

const notEnoughGoldBS = () => {

    visibility1()

    reaction.innerText = `"GET OUT OF HERE YOU CHEAPSKATE!"`
    storyImg.style.backgroundImage = `url(./images/blacksmith.jpg)`
    storyPrompt.innerText = "You're being kick out!"
    
    choice2Btn.innerText = "Leave"
    
    btns.forEach((btn) => {
        btn.addEventListener('click', poorHandler)
    }) 

};

const ringHandler = (ring) => {

    console.log(ring.target.innerText)

    if(ring.target === choice2Btn){
    location.reload()
    }
};

const boughtRing = () => {

    visibility1()

    reaction.innerText = `WOW, it was Ring of WINNING?! What kinda dumb dwarf would give this away for so cheap!?`
    storyImg.style.backgroundImage = `url(./images/ring.jpg)`
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
};

//=========================+ OLD CHURCH Handlers and Functions ===============================


const churchHandler = (church) => {
    
    console.log(church.target.innerText)

    if(church.target === choice1Btn && questQued === true && game.enemies[1].defeated === false){
        encounterSkel()  
    }
    else if(church.target === choice1Btn && questQued === true && game.enemies[1].defeated === true){
        findGrave()
    }
    else if (church.target === choice1Btn && questQued === false && game.enemies[1].defeated === false){
        encounterSkel() 
    }
    else if (church.target === choice2Btn){
        meadowDir()
    }
    btns.forEach((btn)=> {
        btn.removeEventListener('click', churchHandler)
    })
};


const oldChurchDir = () =>{

    if(questQued === true && game.enemies[1].defeated === false){

        visibility2()

        reaction.innerText = `You have reached the old church the woman from the Inn spoke of. \nAside from the lack of upkeep on these hollow ground, an eariness lingers.\n You may want to prepare yourself for anything`
        
        storyImg.style.backgroundImage = `url(./images/oldchurch.jpg)`
        
        storyPrompt.innerText = "Do you want to go further?"
        
        choice1Btn.innerText = "Explore and look for the grave"
        choice3Btn.innerText = "Yeea....\nI dont think so \n (Leave)"
    }
    
    else if(questQued === true && game.enemies[1].defeated === true && questCompleted === false){

        visibility2()
        
        reaction.innerText = `You have reached the old church the woman from the Inn spoke of. \n You've already cleansed these hollow grounds.`
        
        storyImg.style.backgroundImage = `url(./images/oldchurch.jpg)`
        
        storyPrompt.innerText = "Do you want to go further?"
        
        choice1Btn.innerText = "Explore and look for the grave"
        choice3Btn.innerText = "I got better things to do. (Leave)"
    }

    else if (questQued === false && game.enemies[1].defeated === false){

        visibility2()

        reaction.innerText = `You have reached the old church and \naside from the lack of upkeep on these hollowed ground, an eariness lingers.\n You may want to prepare yourself for anything`
        
        storyImg.style.backgroundImage = `url(./images/oldchurch.jpg)`
        
        storyPrompt.innerText = "Do you want to go further?"
        
        choice1Btn.innerText = "Explore old church"
        choice3Btn.innerText = "Yeea....\nI dont think so \n (Leave)"
    }

    else if (questQued === false && game.enemies[1].defeated === true || questCompleted === true){

        visibility1()
        
        reaction.innerText = `You have reached the old church and \n You've already cleansed these hollowed grounds.`
        
        storyImg.style.backgroundImage = `url(./images/oldchurch.jpg)`
        
        storyPrompt.innerText = "There is nothing left of interest here."
        
      
        choice2Btn.innerText = "Why am I here?. (Leave)"
        
    }

    btns.forEach((btn)=>{
        btn.addEventListener('click', churchHandler)
    })
}

const graveHandler = (grave) => {

    console.log(grave.target.innerText)

    questCompleted = true

    if (grave.target === choice2Btn){
        meadowDir()
    }

    btns.forEach((btn)=>{
        btn.removeEventListener('click', graveHandler)
    })

}

const findGrave = () => {

    visibility1()

        

        reaction.innerText = `After searching for awhile,\nyou finally reach the tomb of the widow's husband \n you place the ring she gave you on the tomb.`

        storyImg.style.backgroundImage = `url(./images/crypt.jpg)`
        
        storyPrompt.innerText = "You should head back to the widow\n for your reward"
        
        choice1Btn.innerText = ""
        choice2Btn.innerText = "Leave"
        choice3Btn.innerText = ""

       
        btns.forEach((btn)=>{
            btn.addEventListener('click', graveHandler)
        })

            console.log(questCompletePost)
            console.log(questCompleted);
            
}


// const encounterSkel = () => {

//     enemyStats.style.visibility="visible"
//     enemyImg.style.visibility = "visible"
//     enemyImg.style.backgroundImage = `url(./images/skeleton.png)`
//     enemyName.innerText = "Name: " + game.enemies[1].name
//     enemyHP.innerText = "HP: " + game.enemies[1].hp
//     enemyAtt.innerText = "Attack: " + game.enemies[1].attack
//     enemyDef.innerText = "Defense: " + game.enemies[1].defense
    
//     storyImg.style.backgroundImage = `url(./images/churchinner.jpg)`

//     game.enemies.forEach((mob) =>{
    
//         if(mob.fighting === false && mob.defeated === false){

//             visibility2()

//             game.enemies[1].encountered = true

//                 if(questQued === true && game.enemies[1].defeated === false){

//                     reaction.innerText = `Apon entering the crypt, you encountered a re-animated skeleton.\n You must defeat it before you can continue on.`
//                 }
//                 else if (questQued === false && game.enemies[1].defeated === false){
//                     reaction.innerText = `Apon entering the crypt You've encountered a re-animated skeleton.`
//                 }

//             storyPrompt.innerText = "Begin Battle?"

//             choice1Btn.innerText = "Fight"
//             choice3Btn.innerText = "Flee"

//             console.log('echo')

//             btns.forEach((btn) => {
//                 btn.addEventListener('click', battle)
//             })
//         }
//         else if (mob.fighting === true && playerTurn === true) {
        

//             console.log('will this hit!? player')
//             visibility3()
        
//             storyPrompt.innerText = `Your Move`
    
//             choice1Btn.style.visibility = "Attack"
//             choice2Btn.innerText = "Heal"
//             choice3Btn.style.visibility = "Defend"

        
//             btns.forEach((btn) => {
//                 btn.addEventListener('click', playerTurnHandler)
//             })       
//         }
//         else if (mob.fighting === true && playerTurn === false) {

//             console.log('will mob hit?');
            
        
//         visibility1()

//             storyPrompt.innerText = `${mob.name}'s Move`

        
//             choice1Btn.style.visibility = "hidden"
//             choice2Btn.innerText = "Next"
//             choice3Btn.style.visibility = "hidden"

//             btns.forEach((btn) => {
//                 btn.addEventListener('click', mobTurnHandler)
//             })       
//         }

//         else if(mob.hp === 0 && playerTurn == false){

//             visibility1()

//             mob.fighting = false 
//             mob.defeated = true

//             reaction.innerText = `You have laid the ${mob.name} to rest.`

//             storyImg.style.backgroundImage = 'url(./images/churchinner.jpg)'

//                 if(questQued === true){
//                     storyPrompt.innerText - " you continue you search for the grave"
        
//                     choice2Btn.innerText = " continue"
//                 }
//                 else {
//                     storyPrompt.innerText - " You see nothing of worth"
                
//                     choice2Btn.innerText = " Leave"
//                 }

//             btns.forEach((btn) => {
//                 btn.addEventListener('click', churchHandler)
//             })
//         }

//         else if (game.character.hp === 0 && playerTurn === true) { //skeleton defeat
//             visibility1()

//             game.character.attack = 0
//             userAtt.innerText = "Attack: " + 0  // adjust and displays values

//             game.character.defense = 0
//             userDef.innerText = "Defence: " + 0


//             reaction.innerText = " Oh No! You failed to defeat the skeleton!\n you are forever apart of the undead army. "

//             storyImg.style.backgroundImage = 'url(./images/undeadarmy.jpg)'
            
//             storyPrompt.innerText - " Try Again?"
        
//             choice2Btn.innerText = " Restart"

//             gameOver()
//         }
//     })

// }


const forestDir = () => {
    
    visibility1()

        reaction.innerText = `You find yourself in an enchated forest.`

        storyImg.style.backgroundImage = `url(./images/forest.jpg)`
        
        storyPrompt.innerText = "It's rather quite pieceful"
        
        choice1Btn.innerText = ""
        choice2Btn.innerText = "leave"
        choice3Btn.innerText = ""

       
        btns.forEach((btn)=>{
            btn.addEventListener('click', forestHandler)
        })

}

const forestHandler = (forest) => {

    console.log(forest.target.innerText);
    
    if (forest.target === choice2Btn){
        meadowDir()
    }
    btns.forEach((btn)=>{
        btn.removeEventListener('click', forestHandler)
    })
}






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


//=================== Weapon Fuctions & Handler =====================


// const evalPhase = () => {
    // game.enemies.forEach((mob)=>{
    //     if(game.character.hp < 1 && playerTurn === true ){
            
    //         game.character.attack = 0
    //         userAtt.innerText = "Attack: " + 0  // adjust and displays values

    //         game.character.defense = 0
    //         userDef.innerText = "Defence: " + 0

    //     }
    //     else if (mob.hp < 1 && mob.fighting === true && playerTurn == false){  
    //     }
    //     else if (game.character.hp >= 1 && playerTurn === true){   
    //     }  
    //     else if (mob.hp >= 1 && playerTurn === false){
        
    //     }

//         turn()
//     })
// }

// reaction.innerText = " Oh No! You failed to defeat the skeleton!\n you are forever apart of the undead army. "

// storyImg.style.backgroundImage = 'url(./images/undeadarmy.jpg)'
// storyPrompt.innerText - " Try Again?"

// choice1Btn.style.visibility = " hidden"
// choice2Btn.style.visibility = " visible"
// choice1Btn.style.visibility = " hidden"

// choice2Btn.addEventListener(()=>{
//     location.reload()



// const forestDir = () => {

// }

// const pickWeap = ()=>{

//     storyPrompt.innerText = "Please Select a Weapon";
//     choice1Btn.innerText = "Sword & Shield\n +1 Att / +2 Def";
//     choice2Btn.innerText = "Bow \n +2 Att / +1 Def";
//     choice3Btn.innerText = "Great Hammer\n +3 Att / +0 Def";
// };

// const weapHandler = (num) => {
   
//     game.character.weapon = game.weapons[num].name;
//     userWeap.innerText = "Weapon: " + game.character.weapon;
    
//     game.character.attack += game.weapons[num].attack;
//     userAtt.innerText = "Attack: " + game.character.attack;

//     game.character.defense += game.weapons[num].defense;
//     userDef.innerText = "Defense: " + game.character.defense;


//     weapPicked = true;
// }

// //=================== Armor Fuctions & Handler ======================

// const pickArm = () => {

//     storyPrompt.innerText = "Please Select a Armor";
//     choice1Btn.innerText = "Leather\n +2 Att / +1 Def";
//     choice2Btn.innerText = "Chain Mail \n +1 Att / +2 Def";
//     choice3Btn.innerText = "Plate Armor\n +0 Att / +3 Def";
// };

// const armHandler = (num) => {

//     game.character.armor = game.armors[num].name;
//     userArm.innerText = "Armor: " + game.character.armor;

//     game.character.attack += game.armors[num].attack;
//     userAtt.innerText = "Attack: " + game.character.attack;

//     game.character.defense += game.armors[num].defense;
//     userDef.innerText = "Defense: " + game.character.defense;

//     armorPicked = true;
    
// }

//=============== EventListeners ===============

//-- Game Start Char Creation --

//there is a minor bug here keeping the event listener always active





// const init = () => {
 
//     btns.forEach((btn, idx) => {
//         btn.addEventListener('click', (event) => {
//             console.log("start game", event.target.innerText)
//             if(event.target.innerText === 'Play' && startGame === false){
//                 startGame = true
//                 console.log(startGame)
//                 pickChar()
//             }
//             else if (startGame === true && charsPicked === false){
//                 charHandler(idx)
//                 console.log(charsPicked)
//                 pickWeap()
//             }  
//             else if (charsPicked === true && weapPicked === false) {
//                 weapHandler(idx)
//                 pickArm()
                    
//             }
//             else if(weapPicked == true && charComplete === false){
//                 armHandler(idx)
//                 charComplete = true 
//                 // btn.removeEventListener('click', (event))
//                 advenStart()
                
//             }
//             btns.forEach((btn)=> {
//                 btn.removeEventListener('click', (event))
//             }) 
//         })
//     })
// }  

// init()


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


