//====== Combat Logic ================

const randomDice = (min, max) => {
    const minDice = Math.ceil(min)
    const maxDice = Math.floor(max)
    return Math.floor(Math.random() * (maxDice + minDice) + minDice)
};

const battle = (fight) => {

    let firstMove = randomDice(1, 7)

    console.log(fight.target)
    console.log(fight.target.innerText)

    game.enemies.forEach((mob)=>{
        if(fight.target === choice1Btn && mob.encountered === true && mob.defeated === false){
            // console.log(mob)
                if(firstMove > 0){
                    playerTurn = true
                    console.log('PLAYER TURN = ' + playerTurn)
                }      
                mob.fighting = true
                evalPhase()
        }
        else if (fight.target === choice3Btn){
            console.log(fight.target);
            enemyImg.style.visibility = "hidden"
            enemyStats.style.visibility = "hidden"
            oldChurchDir()  
        }
        
        btns.forEach((btn) => {
            btn.removeEventListener('click', battle)
        })
    })
}

const evalPhase = () => {

    game.enemies.forEach((mob) =>{
        if(mob === 0 && mob.encountered === true && mob.defeated === false){
            encounterBear() 
        }
        else if (mob === 1 && mob.encountered === true && mob.defeated === false){
            encounterSkel() 
        }
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


const playerTurnHandler = (player) => {

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

export const mobTurnHandler = () => {

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


 const encounterSkel = () => {

    enemyStats.style.visibility="visible"
    enemyImg.style.visibility = "visible"
    enemyImg.style.backgroundImage = `url(./images/skeleton.png)`
    enemyName.innerText = "Name: " + game.enemies[1].name
    enemyHP.innerText = "HP: " + game.enemies[1].hp
    enemyAtt.innerText = "Attack: " + game.enemies[1].attack
    enemyDef.innerText = "Defense: " + game.enemies[1].defense
    
    storyImg.style.backgroundImage = `url(./images/churchinner.jpg)`

    game.enemies.forEach((mob) =>{
    
        if(mob.fighting === false && mob.defeated === false){

            visibility2()

            game.enemies[1].encountered = true

                if(questQued === true && game.enemies[1].defeated === false){

                    reaction.innerText = `Apon entering the crypt, you encountered a re-animated skeleton.\n You must defeat it before you can continue on.`
                }
                else if (questQued === false && game.enemies[1].defeated === false){
                    reaction.innerText = `Apon entering the crypt You've encountered a re-animated skeleton.`
                }

            storyPrompt.innerText = "Begin Battle?"

            choice1Btn.innerText = "Fight"
            choice3Btn.innerText = "Flee"

            console.log('echo')

            btns.forEach((btn) => {
                btn.addEventListener('click', battle)
            })
        }
        else if (mob.fighting === true && playerTurn === true) {
        

            console.log('will this hit!? player')
            visibility3()
        
            storyPrompt.innerText = `Your Move`
    
            choice1Btn.style.visibility = "Attack"
            choice2Btn.innerText = "Heal"
            choice3Btn.style.visibility = "Defend"

        
            btns.forEach((btn) => {
                btn.addEventListener('click', playerTurnHandler)
            })       
        }
        else if (mob.fighting === true && playerTurn === false) {

            console.log('will mob hit?');
            
        
        visibility1()

            storyPrompt.innerText = `${mob.name}'s Move`

        
            choice1Btn.style.visibility = "hidden"
            choice2Btn.innerText = "Next"
            choice3Btn.style.visibility = "hidden"

            btns.forEach((btn) => {
                btn.addEventListener('click', mobTurnHandler)
            })       
        }

        else if(mob.hp === 0 && playerTurn == false){

            visibility1()

            mob.fighting = false 
            mob.defeated = true

            reaction.innerText = `You have laid the ${mob.name} to rest.`

            storyImg.style.backgroundImage = 'url(./images/churchinner.jpg)'

                if(questQued === true){
                    storyPrompt.innerText - " you continue you search for the grave"
        
                    choice2Btn.innerText = " continue"
                }
                else {
                    storyPrompt.innerText - " You see nothing of worth"
                
                    choice2Btn.innerText = " Leave"
                }

            btns.forEach((btn) => {
                btn.addEventListener('click', churchHandler)
            })
        }

        else if (game.character.hp === 0 && playerTurn === true) { //skeleton defeat
            visibility1()

            game.character.attack = 0
            userAtt.innerText = "Attack: " + 0  // adjust and displays values

            game.character.defense = 0
            userDef.innerText = "Defence: " + 0


            reaction.innerText = " Oh No! You failed to defeat the skeleton!\n you are forever apart of the undead army. "

            storyImg.style.backgroundImage = 'url(./images/undeadarmy.jpg)'
            
            storyPrompt.innerText - " Try Again?"
        
            choice2Btn.innerText = " Restart"

            gameOver()
        }
    })

}
