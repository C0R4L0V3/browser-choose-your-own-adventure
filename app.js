//link files to pull form object arrays

audioElement.play("#gameMusic");

const enemies = require('./data')
const characterRace = require('./data')
const armors = require('./data')
const weapons = require('.data')


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

}

//Dice generator, can be used for damage or healing
const randomDice = (min, max) => {
    const minDice = Math.ceil(min)
    const maxDice = Math.floor(max)
    return Math.floor(Math.random() * (maxDice + minDice) + minDice)
}
