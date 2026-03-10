import { Heal, DoDamage } from "./functions.js";

export function CharThreeAbilityOne(source, target){
    let x = DoDamage(source, target, 2, 2, 1.70, 50);
    
    //Deal Magical Damage to opponent equal to (170% of Magic Power + 50)
    let str = ("*" + source.getName() + " casts \"Fireball\" on " + target.getName() + " and deals " + x + " magical damage!");
    
    return str;
}

export function CharThreeAbilityTwo(source, target){
    let a = DoDamage(source, target, 2, 2, 0.60, 0);
    let b = DoDamage(source, target, 2, 2, 0.60, 0);
    let c = DoDamage(source, target, 2, 2, 0.60, 0);
    let d = DoDamage(source, target, 2, 2, 0.60, 0);
    let e = DoDamage(source, target, 2, 2, 0.60, 0);
    let f = a + b + c + d + e;
    
    //Deal Magical Damage to opponent equal to 60% of Magic Power five times
    let str = ("*" + source.getName() + " casts \"Bombard\" on " + target.getName() + " and deals " + a + ", " + b + ", " + c + ", " + d + ", " + e + ", for a total of " + f + " magical damage!");

    return str;
}

export function CharThreeAbilityThree(source, target){
    let x = Heal(source, 2, 0.32, 80);
    
    //Heal for (32% of Magic Power + 80)
    let str = ("*" + source.getName() + " casts \"Warming Flames\" and heals herself for " + x + " health!");
    

    return str;
}

export function CharThreeAbilityFour(source, target){
    //Null Ability
    let str = "";

    return str;
}

export function CharThreeAbilityUltimate(source, target){
    let x = DoDamage(source, target, 2, 1, 2.50, 0);
    target.setArmorRatio(target.getArmorRatio() - 0.35);
    target.setMagicResistRatio(target.getMagicResistRatio() - 0.35);
    if (target.getArmorRatio() < 0.00){
        target.setArmorRatio(0.00)
    }
    if (target.getMagicResistRatio() < 0.00){
        target.setMagicResistRatio(0.00)
    }
    
    //Deal Physical Damage to opponent equal to 250% of Magic Power, then permanently additively reduce the enemy's Armor, Magic Resist, by 35% 
    let str = ("*" + source.getName() + " casts \"Inferno\" on " + target.getName() + " and roasts them for " + x + " physical damage! The deathly flames also destroys all means of protection!");
    
    return str;
}