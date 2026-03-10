import { Heal, DoDamage } from "./functions.js";

export function CharSevenAbilityOne(source, target){
    source.setMonkRetaliation(1);
    source.setMonkHealthTracker(source.getCurrentHealth());
    source.setArmorRatio(source.getArmorRatio() + 0.08);
    source.setMagicResistRatio(source.getMagicResistRatio() + 0.08);
    
    //Goes into a retaliatory defensive stance, at the beginning of next round, deal Physical damage equal to the amount of damage received during this time, then deal
    //the same amount of magical damage. Also, immediately permanently additively increase Armor and Magic Resist by 8%
    let str = ("*" + source.getName() + " casts \"Retaliation\", going into a defensive stance that will return the damage received to the attacker! This also permanently buffs defenses!");

    return str;
}

export function CharSevenAbilityTwo(source, target){
    let x = DoDamage(source, target, 1, 1, 1.50, 0.4 * target.getCurrentHealth());
    
    //Deal Physical Damage to opponent equal to (150% of Attack Damage + 40% of target's current HP)
    let str = ("*" + source.getName() + " casts \"Qi Burst\" on " + target.getName() + " and deals " + x + " physical damage!");

    return str;
}

export function CharSevenAbilityThree(source, target){
    let x = DoDamage(source, target, 2, 2, 1.60, 0.6 * target.getMagicPower() * target.getMagicPowerRatio());
    
    //Deal Magical Damage to opponent equal to (160% of Magic Power + 60% of target's Magic Power)
    let str = ("*" + source.getName() + " casts \"Energy Feedback\" on " + target.getName() + ", turning their own powers on themselves and deals " + x + " magical damage!");

    return str;
}

export function CharSevenAbilityFour(source, target){
    //Null Ability
    let str = "";

    return str;
}

export function CharSevenAbilityUltimate(source, target){
    source.setAttackRatio(source.getAttackRatio() + 0.18);
    source.setArmorRatio(source.getArmorRatio() + 0.18);
    source.setMagicResistRatio(source.getMagicResistRatio() + 0.18);
    source.setMagicPowerRatio(source.getMagicPowerRatio() + 0.18);
    
    if (source.getMonkDivine() == 0){
        source.setArmor(source.getArmor() + 10000);
        source.setMagicResist(source.getMagicResist() + 10000);
    }
    source.setMonkDivine(2);
    
    //Permanently additively gains 18% Armor, Magic Resist, Attack Damage and Magic Power. Also gain incredible amounts of Armor and Magic Resist for 2 rounds, this effect cannot stack
    let str = ("*" + source.getName() + " casts \"Divine\", gaining permanent superhuman powers, and godly defenses for 2 rounds!");

    return str;
}