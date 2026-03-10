import { Heal, DoDamage } from "./functions.js";

export function CharTwoAbilityOne(source, target){
    let x = DoDamage(source, target, 1, 1, 2.10, 100);
    
    //Deal Physical Damage to opponent equal to (210% of Attack Damage + 100)
    let str = ("*" + source.getName() + " casts \"Murder\" on " + target.getName() + " and deals " + x + " physical damage!");
    
    return str;
}

export function CharTwoAbilityTwo(source, target){
    let x = DoDamage(source, target, 1, 2, 1.20, 100);
    let y = Heal(source, 2, 0.20, 50);
    
    //Deal Magical Damage to opponent equal to (120% of Attack Damage + 100), and heal for (20% of Magic Power + 50)
    let str = ("*" + source.getName() + " casts \"Bloodthirst\" on " + target.getName() + " and deals " + x + " magical damage! Also healing for " + y + " health!");
    
    return str;
}

export function CharTwoAbilityThree(source, target){
    let x = DoDamage(source, target, 1, 2, 0.70, 300);
    let y = DoDamage(source, target, 1, 1, 0.70, 300);
    
    //Deal Magical Damage to opponent equal to (70% of Attack Damage + 300), and then the same amount of Physical Damage
    let str = ("*" + source.getName() + " casts \"Twin Blades\" on " + target.getName() + " and deals " + x + " magical damage and " + y + " physical damage!");
    
    return str;
}

export function CharTwoAbilityFour(source, target){
    //Null Ability
    let str = "";

    return str;
}

export function CharTwoAbilityUltimate(source, target){
    let a = DoDamage(source, target, 1, 1, 0.44, 88);
    let b = DoDamage(source, target, 1, 1, 0.44, 88);
    let c = DoDamage(source, target, 1, 1, 0.44, 88);
    let d = DoDamage(source, target, 1, 1, 0.44, 88);
    let e = DoDamage(source, target, 1, 1, 0.44, 88);
    let f = DoDamage(source, target, 1, 1, 0.44, 88);
    let g = DoDamage(source, target, 1, 1, 0.44, 88);
    let h = DoDamage(source, target, 1, 1, 0.44, 88);
    let i = a + b + c + d + e + f + g + h;
    
    //Deal Physical Damage to opponent equal to (44% of Attack Damage + 88) eight times
    let str = ("*" + source.getName() + " casts \"Ravage\" on " + target.getName() + ", cutting through any flesh and inflicting mortal wounds, dealing " + a + ", " + b + ", " + c + ", " + d + ", " + e + ", " + f + ", " + g + ", " + h + ", for a total of " + i + " physical damage!");
    
    return str;
}