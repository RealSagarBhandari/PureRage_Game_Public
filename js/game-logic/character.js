import { Heal, DoDamage } from "./functions.js";
import { CharOneAbilityOne, CharOneAbilityTwo, CharOneAbilityThree, CharOneAbilityFour, CharOneAbilityUltimate } from "./AbilityCharOne.js";
import { CharTwoAbilityOne, CharTwoAbilityTwo, CharTwoAbilityThree, CharTwoAbilityFour, CharTwoAbilityUltimate } from "./AbilityCharTwo.js";
import { CharThreeAbilityOne, CharThreeAbilityTwo, CharThreeAbilityThree, CharThreeAbilityFour, CharThreeAbilityUltimate } from "./AbilityCharThree.js";
import { CharFourAbilityOne, CharFourAbilityTwo, CharFourAbilityThree, CharFourAbilityFour, CharFourAbilityUltimate } from "./AbilityCharFour.js";
import { CharFiveAbilityOne, CharFiveAbilityTwo, CharFiveAbilityThree, CharFiveAbilityFour, CharFiveAbilityUltimate } from "./AbilityCharFive.js";
import { CharSixAbilityOne, CharSixAbilityTwo, CharSixAbilityThree, CharSixAbilityFour, CharSixAbilityUltimate } from "./AbilityCharSix.js";
import { CharSevenAbilityOne, CharSevenAbilityTwo, CharSevenAbilityThree, CharSevenAbilityFour, CharSevenAbilityUltimate } from "./AbilityCharSeven.js";
import { CharEightAbilityOne, CharEightAbilityTwo, CharEightAbilityThree, CharEightAbilityFour, CharEightAbilityUltimate } from "./AbilityCharEight.js";
import { CharNineAbilityOne, CharNineAbilityTwo, CharNineAbilityThree, CharNineAbilityFour, CharNineAbilityUltimate } from "./AbilityCharNine.js";

export class Character{
    constructor(id){
        this.Health = 1000;
        this.Armor = 500;
        this.MagicResist = 500;
        this.Attack = 500;
        this.MagicPower = 500;
        this.ID = id;
        this.AttackRatio = 1.0;
        this.PowerRatio = 1.0;
        this.ArmorRatio = 1.0;
        this.ResistRatio = 1.0;
        this.Rage = 50;
        this.Name = "";
        this.AbOne = 0;
        this.AbTwo = 0;
        this.AbThree = 0;
        this.AbFour = 0; //A value of zero for the AbNum variables suggests that the character does not possess an ability. i.e. Null Ability
        switch(this.ID){
            case 1:
                this.Health = 1600;
                this.Armor = 500;
                this.MagicResist = 600;
                this.Attack = 200;
                this.MagicPower = 400;
                this.Name = "Golem";
                this.AbOne = 1;
                this.AbTwo = 1;
                this.AbThree = 1;
                this.AbFour = 1;
                break;
                //Golem
            case 2:
                this.Health = 1200;
                this.Armor = 300;
                this.MagicResist = 300;
                this.Attack = 700;
                this.MagicPower = 600;
                this.Name = "Blade Mantis";
                this.AbOne = 1;
                this.AbTwo = 1;
                this.AbThree = 1;
                this.AbFour = 0;
                break;
                //Assassin (Mantis)
            case 3:
                this.Health = 1000;
                this.Armor = 300;
                this.MagicResist = 700;
                this.Attack = 200;
                this.MagicPower = 800; 
                this.Name = "Pyromancer";
                this.AbOne = 1;
                this.AbTwo = 1;
                this.AbThree = 1;
                this.AbFour = 0;
                break;
                //Mage  
            case 4:
                this.Health = 2000;
                this.Armor = 100;
                this.MagicResist = 300;
                this.Attack = 800; 
                this.MagicPower = 300;  
                this.Name = "Berserker";
                this.AbOne = 1;
                this.AbTwo = 1;
                this.AbThree = 1;
                this.AbFour = 0;
                break; 
                //Berserker
            case 5:
                this.Health = 1200;
                this.Armor = 500;
                this.MagicResist = 400;
                this.Attack = 600; 
                this.MagicPower = 400;  
                this.Name = "Grand Duelist";
                this.AbOne = 1;
                this.AbTwo = 1;
                this.AbThree = 1;
                this.AbFour = 1;
                break;   
                //Blade Master
            case 6:
                this.Health = 1600;
                this.Armor = 700;
                this.MagicResist = 700;
                this.Attack = 100;
                this.MagicPower = 200;  
                this.Name = "Mammoth Turtle";
                this.AbOne = 1;
                this.AbTwo = 1;
                this.AbThree = 1;
                this.AbFour = 1;
                break;
                //Turtle  
            case 7:
                this.Health = 1600;
                this.Armor = 400;
                this.MagicResist = 400;
                this.Attack = 500;
                this.MagicPower = 400;  
                this.Name = "Monk";
                this.AbOne = 1;
                this.AbTwo = 1;
                this.AbThree = 1;
                this.AbFour = 0;
                break;
                //Monk      
            case 8:
                this.Health = 2000;
                this.Armor = 300;
                this.MagicResist = 400;
                this.Attack = 200;
                this.MagicPower = 600;  
                this.Name = "Hemomancer";
                this.AbOne = 1;
                this.AbTwo = 1;
                this.AbThree = 1;
                this.AbFour = 0;
                break;
                //Hemomancer    
            case 9:
                this.Health = 1400;
                this.Armor = 400;
                this.MagicResist = 100;
                this.Attack = 900;
                this.MagicPower = 400;  
                this.Name = "Ripjaw";
                this.AbOne = 1;
                this.AbTwo = 1;
                this.AbThree = 1;
                this.AbFour = 1;
                break;
                //Ripjaw   
            default:

        }
        this.CurrentHealth = this.Health;

        this.MonkRetaliation = 0;
        this.MonkHealthTracker = 0;
        this.MonkDivine = 0;
        this.HemoStacks = 0;
        this.BloodRageStacks = 0;
        this.RipjawStarveStacks = 0;
    }
    //Constructs the character, the switch statement distinguishes between characters.
    //The ID is basically an internal determinant that is dependent on player's/AI's selection.
    //Health is basically maximum health.

    getHealth(){
        return this.Health;
    }
    getArmor(){
        return this.Armor;
    }
    getMagicResist(){
        return this.MagicResist;
    }
    getAttack(){
        return this.Attack;
    }
    getMagicPower(){
        return this.MagicPower;
    }
    getID(){
        return this.ID;
    }
    getCurrentHealth(){
        return this.CurrentHealth;
    }
    getArmorRatio(){
        return this.ArmorRatio;
    }
    getMagicResistRatio(){
        return this.ResistRatio;
    }
    getAttackRatio(){
        return this.AttackRatio;
    }
    getMagicPowerRatio(){
        return this.PowerRatio;
    }
    getRage(){
        return this.Rage;
    }
    getName(){
        return this.Name;
    }
    getAbOne(){
        return this.AbOne;
    }
    getAbTwo(){
        return this.AbTwo;
    }
    getAbThree(){
        return this.AbThree;
    }
    getAbFour(){
        return this.AbFour;
    }
    getMonkRetaliation(){
        return this.MonkRetaliation;
    }
    getMonkHealthTracker(){
        return this.MonkHealthTracker;
    }
    getMonkDivine(){
        return this.MonkDivine;
    }
    getHemoStacks(){
        return this.HemoStacks;
    }
    getBloodRageStacks(){
        return this.BloodRageStacks;
    }
    getRipjawStarveStacks(){
        return this.RipjawStarveStacks;
    }
    //All of the accessors.

    setHealth(x){
        this.Health = x;
    }
    setArmor(x){
        this.Armor = x;
    }
    setMagicResist(x){
        this.MagicResist = x;
    }
    setAttack(x){
        this.Attack = x;
    }
    setMagicPower(x){
        this.MagicPower = x;
    }
    setCurrentHealth(x){
        this.CurrentHealth = x;
    }
    setArmorRatio(x){
        this.ArmorRatio = x;
    }
    setMagicResistRatio(x){
        this.ResistRatio = x;
    }
    setAttackRatio(x){
        this.AttackRatio = x;
    }
    setMagicPowerRatio(x){
        this.PowerRatio = x;
    }
    setRage(x){
        this.Rage = x;
    }
    setName(x){
        this.Name = x;
    }
    setAbOne(x){
        this.AbOne = x;
    }
    setAbTwo(x){
        this.AbTwo = x;
    }
    setAbThree(x){
        this.AbThree = x;
    }
    setAbFour(x){
        this.AbFour = x;
    }
    setMonkRetaliation(x){
        this.MonkRetaliation = x;
    }
    setMonkHealthTracker(x){
        this.MonkHealthTracker = x;
    }
    setMonkDivine(x){
        this.MonkDivine = x;
    }
    setHemoStacks(x){
        this.HemoStacks = x;
    }
    setBloodRageStacks(x){
        this.BloodRageStacks = x;
    }
    setRipjawStarveStacks(x){
        this.RipjawStarveStacks = x;
    }
    //All of the mutators.

    output(){
        //console.log("ID: " + this.ID);
        console.log("Name: " + this.Name);
        console.log("HP: " + this.CurrentHealth + "/" + this.Health);
        console.log("Rage: " + this.Rage + "/100");
        console.log("Attack: " + Math.round(this.Attack * this.AttackRatio));
        console.log("Magic Power: " + Math.round(this.MagicPower * this.PowerRatio));
        console.log("Armor: " + Math.round(this.Armor * this.ArmorRatio));
        console.log("Magic Resist: " + Math.round(this.MagicResist * this.ResistRatio));
        console.log("----------------------------------------");
        console.log(" ");
    }

    AttackEnemy(target){
        let x = DoDamage(this, target, 1, 1, 1.0, 0);
        this.setRage(this.getRage() + 5);
        if (this.getRage() > 100){
            this.setRage(100);
        }
        
        let str = ("*" + this.getName() + " attacks " + target.getName() + " and deals " + x + " physical damage!");
        return str;
    }

    //The following are round passives.
    IncreaseRage(){
        this.setRage(this.getRage() + 10);
        if (this.getRage() > 100){
            this.setRage(100);
        }
    }
    //Should be cast once at the beginning of every round.
    //Abilities cost 20 Rage to cast, Ultimates cost 80 Rage to cast, Normal Attacks cost 0 Rage to cast and gains an extra 5 Rage.

    MonkRetalRound(target){
        let value = this.getMonkHealthTracker() - this.getCurrentHealth();
        if (value < 1){
            value = 1;
        }

        let x = DoDamage(this, target, 1, 1, 0, value);
        let y = DoDamage(this, target, 1, 2, 0, value);
        this.setMonkRetaliation(0);
        
        let str = ("*" + this.getName() + " retaliates " + target.getName() + " and deals " + x + " physical damage and " + y + " magical damage!");
        return str;
    }
    //Should be cast once automatically before character's action, if the variable MonkRetalition is 1.

    MonkDivineRound(){
        if (this.getMonkDivine() > 0){
            this.setMonkDivine(this.getMonkDivine() - 1);
            if (this.getMonkDivine() == 0){
                this.setArmor(this.getArmor() - 10000);
                this.setMagicResist(this.getMagicResist() - 10000);
            }
        }
    }
    //Used to check if Monk's Divine has expired, if so remove the buff.

    HemoplagueRound(source){
        let x = Math.round(this.getCurrentHealth() * 0.02 * this.getHemoStacks());
        if (x < 1){
            x = 1;
        }
        this.setCurrentHealth(this.getCurrentHealth() - x);

        let str = ("*" + source.getName() + "'s " + this.getHemoStacks() + " \"Hemoplague\" stacks continuously damages " + this.getName() + " and deals " + x + " true damage!");
        return str;
    }
    //Used to check if this character has a bleed effect from enemy's Hemoplague ability.

    BloodRageRound(){
        let x = Math.round(this.getCurrentHealth() * 0.02 * this.getBloodRageStacks());
        if (x < 1){
            x = 1;
        }
        this.setCurrentHealth(this.getCurrentHealth() - x);

        let str = ("*" + this.getName() + "'s " + this.getBloodRageStacks() + " \"Blood Rage\" stacks continuously damages themselves and receives " + x + " true damage!");
        return str;
    }
    //Used to check if this character has a bleed effect from their own Blood Rage ability.

    //This calls all of the round passives one by one.
    RoundPassive(target){
        let source = target;

        let str = " "; //Used to take in the string returns from the functions to output to the textbox battle log.

        this.IncreaseRage();

        if (this.getMonkRetaliation() == 1){
            str = this.MonkRetalRound(target);
            console.log(str);
        }

        this.MonkDivineRound();

        if (this.getHemoStacks() > 0){
            str = this.HemoplagueRound(source);
            console.log(str);
        }

        if (this.getBloodRageStacks() > 0){
            str = this.BloodRageRound();
            console.log(str);
        }
    }

    //This checks if the characters are dead.
    checkDead(){
        if (this.getCurrentHealth() <= 0){
            return 1;
        } else{
            return 0;
        }
    }

    //All of the abilities.
    AbilityOne(target){
        let str = "";
        switch(this.ID){
            case 1:
                str = CharOneAbilityOne(this, target);
                break;
            case 2:
                str = CharTwoAbilityOne(this, target);
                break;
            case 3:
                str = CharThreeAbilityOne(this, target);
                break;
            case 4:
                str = CharFourAbilityOne(this, target);
                break;
            case 5:
                str = CharFiveAbilityOne(this, target);   
                break;
            case 6:
                str = CharSixAbilityOne(this, target);
                break;
            case 7:
                str = CharSevenAbilityOne(this, target);
                break;
            case 8:
                str = CharEightAbilityOne(this, target);
                break;    
            case 9:
                str = CharNineAbilityOne(this, target);
                break;    
            default:

        }
        return str;
    }

    AbilityTwo(target){
        let str = "";
        switch(this.ID){
            case 1:
                str = CharOneAbilityTwo(this, target);
                break;
            case 2:
                str = CharTwoAbilityTwo(this, target);
                break;
            case 3:
                str = CharThreeAbilityTwo(this, target);  
                break; 
            case 4:
                str = CharFourAbilityTwo(this, target); 
                break;
            case 5:
                str = CharFiveAbilityTwo(this, target);
                break;
            case 6:
                str = CharSixAbilityTwo(this, target);      
                break;    
            case 7:
                str = CharSevenAbilityTwo(this, target);
                break; 
            case 8:
                str = CharEightAbilityTwo(this, target);
                break;
            case 9:
                str = CharNineAbilityTwo(this, target);
                break;                 
            default:

        }
        return str;
    }

    AbilityThree(target){
        let str = "";
        switch(this.ID){
            case 1:
                str = CharOneAbilityThree(this, target);
                break;
            case 2:
                str = CharTwoAbilityThree(this, target);
                break;
            case 3:
                str = CharThreeAbilityThree(this, target); 
                break;
            case 4:
                str = CharFourAbilityThree(this, target);  
                break;
            case 5:
                str = CharFiveAbilityThree(this, target);
                break;
            case 6:
                str = CharSixAbilityThree(this, target);   
                break;  
            case 7:
                str = CharSevenAbilityThree(this, target);
                break;      
            case 8:
                str = CharEightAbilityThree(this, target);
                break;
            case 9:
                str = CharNineAbilityThree(this, target);
                break;             
            default:

        }
        return str;
    }

    AbilityFour(target){
        let str = "";
        switch(this.ID){
            case 1:
                str = CharOneAbilityFour(this, target);
                break;
            case 2:
                str = CharTwoAbilityFour(this, target);
                break;
            case 3:
                str = CharThreeAbilityFour(this, target);
                break;    
            case 4:
                str = CharFourAbilityFour(this, target); 
                break;
            case 5:
                str = CharFiveAbilityFour(this, target);
                break;
            case 6:
                str = CharSixAbilityFour(this, target);  
                break;
            case 7:
                str = CharSevenAbilityFour(this, target);
                break;
            case 8:
                str = CharEightAbilityFour(this, target);
                break;
            case 9:
                str = CharNineAbilityFour(this, target);
                break;                         
            default:

        }
        return str;
    }

    AbilityUltimate(target){
        let str = "";
        switch(this.ID){
            case 1:
                str = CharOneAbilityUltimate(this, target);
                break;
            case 2:
                str = CharTwoAbilityUltimate(this, target);
                break;
            case 3:
                str = CharThreeAbilityUltimate(this, target);
                break;
            case 4:
                str = CharFourAbilityUltimate(this, target); 
                break;  
            case 5:
                str = CharFiveAbilityUltimate(this, target);
                break;
            case 6:
                str = CharSixAbilityUltimate(this, target);   
                break;
            case 7:
                str = CharSevenAbilityUltimate(this, target);
                break;
            case 8:
                str = CharEightAbilityUltimate(this, target);
                break;
            case 9:
                str = CharNineAbilityUltimate(this, target);
                break;                  
            default:

        }
        return str;
    }
}

/** 
//console.log("Hllo Geek, Welcome to GFG!");
const char1 = new Character(3);
const char2 = new Character(5);
char1.output();
char2.output();

let strr = "";
//console.log("char 1 uses ability one");
char1.IncreaseRage();
strr = char1.AbilityOne(char2);
console.log(strr);
console.log(" ");
//char1.output();
//char2.output();

//console.log("char 2 uses ability one");
char2.IncreaseRage();
strr = char2.AbilityOne(char1);
console.log(strr);
console.log(" ");
//char1.output();
//char2.output();

//console.log("char 1 uses ability two");
char1.IncreaseRage();
strr = char1.AbilityTwo(char2);
console.log(strr);
console.log(" ");
//char1.output();
//char2.output();

//console.log("char 2 uses ability two");
char2.IncreaseRage();
strr = char2.AbilityTwo(char1);
console.log(strr);
console.log(" ");
//char1.output();
//char2.output();

//console.log("char 1 uses ability three");
char1.IncreaseRage();
strr = char1.AbilityThree(char2);
console.log(strr);
console.log(" ");
//char1.output();
//char2.output();

//console.log("char 2 uses ability three");
char2.IncreaseRage();
strr = char2.AbilityThree(char1);
console.log(strr);
console.log(" ");
//har1.output();
//char2.output();

//console.log("char 1 uses ability four");
char1.IncreaseRage();
strr = char1.AbilityFour(char2);
console.log(strr);
console.log(" ");
//char1.output();
//char2.output();

//console.log("char 2 uses ultimate");
char2.IncreaseRage();
strr = char2.AbilityUltimate(char1);
console.log(strr);
console.log(" ");
//char1.output();
//char2.output();

//console.log("char 1 uses ultimate");
char1.IncreaseRage();
strr = char1.AbilityUltimate(char2);
console.log(strr);
console.log(" ");
//char1.output();
//char2.output();

//console.log("char 2 uses ultimate");
char2.IncreaseRage();
strr = char2.AbilityUltimate(char1);
console.log(strr);
console.log(" ");
//char1.output();
//char2.output();

//console.log("char 1 uses attack");
char1.IncreaseRage();
strr = char1.AttackEnemy(char2);
console.log(strr);
console.log(" ");
//char1.output();
//char2.output();

//console.log("char 2 uses attack");
char2.IncreaseRage();
strr = char2.AttackEnemy(char1);
console.log(strr);
console.log(" ");
//char1.output();
//char2.output();

char1.output();
char2.output();

**/