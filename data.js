// ===== game database ======

const enemies = [
    { name: "bear", hp: 15, attack: 0, defense: 0, loot: []},
    { name: "skeleton", hp: 10, attack: 0, defense: 0, loot: []},
    { name: null, hp: 0, attack: 0, defense: 0, loot: []},

];

const characterRace =[
    {name: "Human", attack: 0, defense: 0,},
    {name: "Elf", attack: 0, defense: 0,},
    {name: "Dwarf", attack: 0, defense: 0,},
    // {name: "Orc", attack: 0, defense: 0,},  limiting to three to make thing simplier
]

const armors = [
    {name: "Leather Armor", defense: 0,},
    {name: "Cloth Robe", defense: 0,},
    {name: "Plate Armor", defense: 0,},
];
 
const weapons = [
    {name: "Sword and Sheild", attack: 0, defense: 0},
    {name: "Bow", attack: 0,},
    {name: "Great Hammer", attack: 0},
];

// const consumables = [
//     {name: "potions"},
//     {name: "arrows"},        //dont think I'll need this object array
// ]

mainMenu = () => {
    
}