import { Heal, DoDamage } from "./functions.js";

export function CharOneAbilityOne(source, target){
    let x = DoDamage(source, target, 2, 1, 1.90, 100);
    
    //Deal Physical Damage to opponent equal to (190% of Magic Power + 100)
    let str = ("*" + source.getName() + " casts \"Rock Smash\" on " + target.getName() + " and deals " + x + " physical damage!");
    
    return str;
}

export function CharOneAbilityTwo(source, target){
    let x = DoDamage(source, target, 2, 2, 1.80, 100);
    
    //Deal Magical Damage to opponent equal to (180% of Magic Power + 100)
    let str = ("*" + source.getName() + " casts \"Earthquake\" on " + target.getName() + " and deals " + x + " magical damage!");
    
    return str;
}

export function CharOneAbilityThree(source, target){
    let x = DoDamage(source, target, 1, 1, 0.00, 550);
    target.setArmorRatio(target.getArmorRatio() - 0.09);
    target.setMagicResistRatio(target.getMagicResistRatio() - 0.09);
    if (target.getArmorRatio() < 0.00){
        target.setArmorRatio(0.00)
    }
    if (target.getMagicResistRatio() < 0.00){
        target.setMagicResistRatio(0.00)
    }
    
    //Deal 550 Physical Damage, then permanently additively reduce the enemy's Armor, Magic Resist, by 9%
    let str = ("*" + source.getName() + " casts \"Shatter!\" on " + target.getName() + " and deals " + x + " physical damage! Additionally, " + target.getName() + "'s defences are broken!");
    
    return str;
}

export function CharOneAbilityFour(source, target){
    let x = Heal(source, 2, 0.08, 180);
    let y = Heal(source, 1, 0.08, 0);
    let z = x + y;
    
    //Heal for (8% of Magic Power + 8% of Attack Damage + 180)
    let str = ("*" + source.getName() + " casts \"Unbreaking Earth\" and heals for " + z + " health!");
    
    return str;
}

export function CharOneAbilityUltimate(source, target){
    let x = DoDamage(source, target, 1, 1, 0.60, 1200);
    
    //Deal Physical Damage to opponent equal to (60% of Attack Damage + 1200)
    let str = ("*" + source.getName() + " casts \"Obliteration\" on " + target.getName() + ", bringing total destruction and deals " + x + " physical damage!");
    
    return str;
}