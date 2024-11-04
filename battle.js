//====== Combat Logic ================
 export const randomDice = (min, max) => {
    const minDice = Math.ceil(min)
    const maxDice = Math.floor(max)
    return Math.floor(Math.random() * (maxDice + minDice) + minDice)
};

export const battle = (fight) => {

    game.enemies.forEach((mob)=>{

        if(fight.target === choice1Btn && mob.encountered === true && mob.defeated === false){
            firstMove = randomDice(1, 7)
            // console.log(mob)
                if(firstMove > 0){
                    playerTurn = true
                    console.log('PLAYER TURN = ' + playerTurn)
                    
                    playerTurn = true
                    encounterSkel()

                }   
                else {
                    playerTurn = false
                    encounterSkel()

                }
                console.log(fight.taget);
                mob.fighting = true
        }
        else if (fight.target === choice3Btn){
            console.log(fight.taget);
            enemyImg.style.visibility = "hidden"
            enemyStats.style.visibility = "hidden"
            oldChurchDir()  
        }

        console.log(fight.taget);
        
        btns.forEach((btn) => {
            btn.removeEventListener('click', battle)
        })
    })
}


//==============player turn handler================

const playerDefend = () => {
    playerDefending = true
    game.character.defense *= 2
    userDef.innerText = "Defense: " + game.character.defense
    reaction.innerText = `You are bracing for an attack! \n defence increased to ${game.character.defense}`
}

const playerAttack = () => {

    game.enemies.forEach((mob) =>{
        if (mob.fighting === true){
            damage = (randomDice(1, 9) + game.character.attack) - mob.defense //<<-- damage total
            mob.hp -= damage
                if(mob.hp < 0) {
                    mob.hp = 0
                }
            reaction.innerText = `${mob.name} took ${damage} damage!` //<<-- changes the prompt
            enemyHP.innerText ="HP: " + mob.hp//-- changes enemy hp display
        }
    })
}


export const playerTurnHandler = (player) => {

    console.log(player.target.innerText);
    console.log('test');   


    if (player.target === choice1Btn){     //<<--- attack choice

        game.enemies.forEach((mob)=>{ //<<-- loops through enemy array
                if(playerTurn === true && mob.fighting === true){     //<<---determines which mob being faces
                    if (mobDefending = true)
                        playerAttack()
                        mob.defense /= 2
                        mobDefending = false
                        enemyDef.innerText = "Defense: " + mob.defense
                } else {
                    playerAttack()
                }
            })
        }

    else if (playerTurn === true && player.target === choice2Btn){ //-- handles healing choice

        if (game.character.race === "Human"){   //<<-- determines picked race for hp values

            if (game.character.hp < 35){        
                game.character.hp += randomDice(1, 9)

                reaction.innerText = `You recovered some HP`
                userHP.innerText ="HP: " + game.character.hp 

                if (game.character.hp > 35){    //<<-- if healing exceeds race max, adjusts the hp back to max
                    game.character.hp = 35
                    userHP.innerText = "HP: " + game.character.hp 
                }
            }
            else if (game.character.hp === 35){ //<<-- if hp is maxed invalidates option and loops back through
                storyPrompt.innerText = "Invalid choice \n Please try again."
                encounterSkel()

                btns.forEach((btn) => {
                    btn.removeEventListener('click', playerTurnHandler)
                })
            }
        }
        else if (game.character.race === "Elf"){

            if (game.character.hp < 30){
                game.character.hp += randomDice(1, 9)

                reaction.innerText = `You recovered some HP`
                userHP.innerText = "HP: " + game.character.hp 

                if (game.character.hp > 30){
                    game.character.hp = 30
                    userHP.innerText = "HP: " + game.character.hp 
                }
            }
            else if (game.character.hp === 30){
                storyPrompt.innerText = "Invalid choice \n Please try again."
               encounterSkel()

               btns.forEach((btn) => {
                btn.removeEventListener('click', playerTurnHandler)
            })
            }
        }

        else if (game.character.race === "Dwarf"){
            if (game.character.hp < 40){
                game.character.hp += randomDice(1, 9)

                reaction.innerText = `You recovered some HP`
                userHP.innerText ="HP: " + game.character.hp 

                if (game.character.hp > 40){
                    game.character.hp = 40
                    userHP.innerText ="HP: " + game.character.hp 
                }
            }
            else if (game.character.hp === 40){
                storyPrompt.innerText = "Invalid choice \n Please try again."
                encounterSkel()

                btns.forEach((btn) => {
                    btn.removeEventListener('click', playerTurnHandler)
                })
            }
        }
    }

    else if (playerTurn === true && player.target === choice3Btn){
                    //-- increases defense stat for 1 turn
        playerDefend()
    }

    btns.forEach((btn) => {
        btn.removeEventListener('click', playerTurnHandler)
    })

    playerTurn = false
    evalPhase()

}


//===================  MOB TURN ====================

const mobAttack = () => {
    damage = (randomDice(1, 9) + mob.attack) - game.character.defense
    game.character.hp -= damage
        if(game.character.hp < 0 ) {
            game.character.hp = 0
        }
    userHP.innerText = "HP: "+ game.character.hp
    reaction.innerText = `You took ${damage} damage`  
}

const mobDefend = () => {
    mobDefending = true
    mob.defense *= 2
    enemyDef.innerText = "Defense: " + mob.defense
    reaction.innerText = `${mob.name}'s defense has gone up.`
}

export const mobTurnHandler= () => {

    visibility1()
 
     game.enemies.forEach((mob) => {
         if(mob.fighting === true){
             if (randomDice(1, 7) >= 4){
                 if(playerDefending === true){
                     damage = (randomDice(1, 9) + mob.attack) - game.character.defense
                     game.character.hp -= damage
                         if(game.character.hp < 0 ) {
                             game.character.hp = 0
                         }
                     userHP.innerText = "HP: "+ game.character.hp
                     reaction.innerText = `You took ${damage} damage`  
                     game.character.defense /= 2
                     playerDefending = false
                     userDef.innerText = "Defense: " + game.character.defense
                 }
                 else{
                     damage = (randomDice(1, 9) + mob.attack) - game.character.defense
                     game.character.hp -= damage
                         if(game.character.hp < 0 ) {
                             game.character.hp = 0
                         }
                     userHP.innerText = "HP: "+ game.character.hp
                     reaction.innerText = `You took ${damage} damage`  
                 }
             }
             else {
                 mobDefending = true
                 mob.defense *= 2
                 enemyDef.innerText = "Defense: " + mob.defense
                 reaction.innerText = `${mob.name}'s defense has gone up.`
             }
         }   
     })
 
     btns.forEach((btn) => {
         btn.removeEventListener('click', mobTurnHandler)
     })
     
     playerTurn = true
     evalPhase()
 }
