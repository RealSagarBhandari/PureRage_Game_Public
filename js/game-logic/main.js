import { Character } from "./character.js";

import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

/** 
rl.question('What is your name? ', (answer) => {
  console.log(`Hello, ${answer}!`);
  rl.close();
});
**/

const inp = await rl.question('Choose your character: 1 = Golem, 2 = Blade Mantis, 3 = Pyromancer, 4 = Berserker, 5 = Grand Duelist, 6 = Mammoth Turtle, 7 = Monk, 8 = Hemomancer, 9 = Ripjaw:   ');
let a = parseInt(inp, 10);
const char1 = new Character(a);
//Picks your own character

let b = a;
while (b == a){
    b = Math.floor(Math.random() * 9) + 1;
}
const char2 = new Character(b);
//Randomizes enemy character, different from the player's.
console.log("You picked " + char1.getName() + " and your oppoenent selected " + char2.getName());

let intc = 0;
let str = "";
let legitaction = 0;
let round = 0;

char1.output();
char2.output();

while((char1.checkDead() == 0) && (char2.checkDead() == 0)){
    round = round + 1;
    console.log("Round " + round);
    console.log("###################################");
    console.log(" ");
    
    char1.RoundPassive(char2);

    legitaction = 0;

    while (legitaction == 0){
        const inpu = await rl.question('Choose your action: 1 = Attack, 2 = Ability1, 3 = Ability2, 4 = Ability3, 5 = Ability4, 6 = Rage!!, 7 = Do Nothing:   ');
        intc = parseInt(inpu, 10);
        switch(intc){
            case 1:
                legitaction = 1;
                break;
            case 2:
                if ((char1.getRage() >= 20) && (char1.getAbOne() == 1)){
                    char1.setRage(char1.getRage() - 20);
                    legitaction = 1;
                } else{
                    if (char1.getAbOne() == 0){
                        console.log("#Error! You don't have an Ability 1, select again!");
                    } else if (char1.getRage() < 20){
                        console.log("#Error! Not enough Rage, select again!");
                    }
                }  
                break;
            case 3:
                if ((char1.getRage() >= 20) && (char1.getAbTwo() == 1)){
                    char1.setRage(char1.getRage() - 20);
                    legitaction = 1;
                } else{
                    if (char1.getAbTwo() == 0){
                        console.log("#Error! You don't have an Ability 2, select again!");
                    } else if (char1.getRage() < 20){
                        console.log("#Error! Not enough Rage, select again!");
                    }
                }  
                break;
            case 4:
                if ((char1.getRage() >= 20) && (char1.getAbThree() == 1)){
                    char1.setRage(char1.getRage() - 20);
                    legitaction = 1;
                } else{
                    if (char1.getAbThree() == 0){
                        console.log("#Error! You don't have an Ability 3, select again!");
                    } else if (char1.getRage() < 20){
                        console.log("#Error! Not enough Rage, select again!");
                    }
                }  
                break;
            case 5:            
                if ((char1.getRage() >= 20) && (char1.getAbFour() == 1)){
                    char1.setRage(char1.getRage() - 20);
                    legitaction = 1;
                } else{
                    if (char1.getAbFour() == 0){
                        console.log("#Error! You don't have an Ability 4, select again!");
                    } else if (char1.getRage() < 20){
                        console.log("#Error! Not enough Rage, select again!");
                    }
                }  
                break; 
            case 6:
                if ((char1.getRage() >= 80)){
                    char1.setRage(char1.getRage() - 80);
                    legitaction = 1;
                } else{
                    console.log("#Error! Not enough Rage, select again!");
                }
                break;
            case 7:
                legitaction = 1;
                break;
            default:

        }
    }
    //Allows the player to pick an action
    
    switch(intc){
        case 1:
            str = char1.AttackEnemy(char2);
            console.log(str);
            break;
        case 2:
            str = char1.AbilityOne(char2);
            console.log(str);
            break;
        case 3:
            str = char1.AbilityTwo(char2);
            console.log(str);
            break;
        case 4:
            str = char1.AbilityThree(char2);
            console.log(str);
            break;
        case 5:
            str = char1.AbilityFour(char2);
            console.log(str);
            break;
        case 6:
            str = char1.AbilityUltimate(char2);
            console.log(str);
            break;
        case 7:
            break;    
        default:

    }

    char2.RoundPassive(char1);
    legitaction = 0;
    
    while (legitaction == 0){
        intc = Math.floor(Math.random() * 6) + 1;

        switch(intc){
            case 1:
                legitaction = 1;
                break;
            case 2:
                if ((char2.getRage() >= 20) && (char2.getAbOne() == 1)){
                    char2.setRage(char2.getRage() - 20);
                    legitaction = 1;
                } 
                break;
            case 3:
                if ((char2.getRage() >= 20) && (char2.getAbTwo() == 1)){
                    char2.setRage(char2.getRage() - 20);
                    legitaction = 1;
                } 
                break;
            case 4:
                if ((char2.getRage() >= 20) && (char2.getAbThree() == 1)){
                    char2.setRage(char2.getRage() - 20);
                    legitaction = 1;
                } 
                break;
            case 5:            
                if ((char2.getRage() >= 20) && (char2.getAbFour() == 1)){
                    char2.setRage(char2.getRage() - 20);
                    legitaction = 1;
                } 
                break; 
            case 6:
                if ((char2.getRage() >= 80)){
                    char2.setRage(char2.getRage() - 80);
                    legitaction = 1;
                } 
                break;

            default:

        }
    }

    
    switch(intc){
        case 1:
            str = char2.AttackEnemy(char1);
            console.log(str);
            break;
        case 2:
            str = char2.AbilityOne(char1);
            console.log(str);
            break;
        case 3:
            str = char2.AbilityTwo(char1);
            console.log(str);
            break;
        case 4:
            str = char2.AbilityThree(char1);
            console.log(str);
            break;
        case 5:
            str = char2.AbilityFour(char1);
            console.log(str);
            break;
        case 6:
            str = char2.AbilityUltimate(char1);
            console.log(str);
            break;
        default:

    }
    
    console.log(" ");
    char1.output();
    char2.output();

}


char1.output();
char2.output();
console.log("Game Over! Hope you had fun! GG!");