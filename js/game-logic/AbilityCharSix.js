import { Heal, DoDamage } from "./functions.js";

export function CharSixAbilityOne(source, target){
    let x = DoDamage(source, target, 1, 1, 0.75, 240);
    target.setArmorRatio(target.getArmorRatio() - 0.16);
    if (target.getArmorRatio() < 0.00){
        target.setArmorRatio(0.00)
    }
    
    //Deal Physical Damage to opponent equal to (75% of Attack Damage + 240), then permanently additively reduce enemy Armor by 16%
    let str = ("*" + source.getName() + " casts \"Shell Smash\" on " + target.getName() + " and deals " + x + " physical damage! Also, " + target.getName() + " lost much of their armor!");

    return str;
}

export function CharSixAbilityTwo(source, target){
    source.setArmor(1400);
    source.setMagicResist(1400);
    
    //Doubles self Armor and Magic Resist, does not stack
    let str = ("*" + source.getName() + " casts \"Indestructible\" and gained unimaginable amounts of armor and magic resist!");

    return str;
}

export function CharSixAbilityThree(source, target){
    source.setArmorRatio(source.getArmorRatio() + 0.1);
    source.setMagicResistRatio(source.getMagicResistRatio() - 0.06);
    if (source.getMagicResistRatio() < 0.00){
        source.setMagicResistRatio(0.00)
    }
    let x = Heal(source, 2, 0.0, 20);

    source.setRage(source.getRage() + 5);
    if (source.getRage() > 100){
        source.setRage(100);
    }
    
    //Permanently additively increase Armor by 10%, but decrease Magic Resist by 6%, heal for 20 health. Gain 5 rage back after the usage of this ability
    let str = ("*" + source.getName() + " casts \"Armor Prioritized\" and gained armor at the cost of some magic resist! This also allowed " + source.getName() + " to rest and gained " + x + " health and 5 rage!");

    return str;
}

export function CharSixAbilityFour(source, target){
    source.setMagicResistRatio(source.getMagicResistRatio() + 0.1);
    source.setArmorRatio(source.getArmorRatio() - 0.06);
    if (source.getArmorRatio() < 0.00){
        source.setArmorRatio(0.00)
    }
    let x = Heal(source, 2, 0.0, 20);

    source.setRage(source.getRage() + 5);
    if (source.getRage() > 100){
        source.setRage(100);
    }
    
    //Permanently additively increase Magic Resist by 10%, but decrease Armor by 6%, heal for 20 health. Gain 10 rage back after the usage of this ability
    let str = ("*" + source.getName() + " casts \"Magic Resist Prioritized\" and gained magic resist at the cost of some armor! This also allowed " + source.getName() + " to rest and gained " + x + " health and 5 rage!");

    return str;
}

export function CharSixAbilityUltimate(source, target){
    let x = Heal(source, 2, 0.8, 500);
    
    //Heal for (80% of Magic Power + 500) health
    let str = ("*" + source.getName() + " casts \"Supreme Regeneration\" and heals for " + x + " health! " + source.getName() + " is truly unkillable!");

    return str;
}