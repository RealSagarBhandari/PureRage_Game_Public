import { Heal, DoDamage } from "./functions.js";

export function CharFourAbilityOne(source, target){
    let x = DoDamage(source, target, 1, 1, 1.40, 150);
    let y = Heal(source, 1, 0.12, 60);
    
    //Deal Physical Damage to opponent equal to (140% of Attack Damage + 150), and heal for (12% of Attack Damage + 60)
    let str = ("*" + source.getName() + " jumps into battle, casting \"Rampage\" on " + target.getName() + " and deals " + x + " physical damage! Also healing for " + y + " health!");

    return str;
}

export function CharFourAbilityTwo(source, target){
    let x = DoDamage(source, target, 1, 1, 0.90, 0);
    source.setAttackRatio(source.getAttackRatio() + 0.16);
    
    //Deal Physical Damage to opponent equal to 90% of Attack Damage, then permanently additively increase Attack Damage by 16% 
    let str = ("*" + source.getName() + " jumps into battle, casting \"Frenzy\" on " + target.getName() + " and deals " + x + " physical damage! The battle boils " + source.getName() + "'s blood and increases his attack damage!");

    return str;
}

export function CharFourAbilityThree(source, target){
    source.setAttack(1600);
    source.setArmor(50);
    source.setMagicResist(150);
    let x = DoDamage(source, target, 1, 1, 0.80, 0);
    
    //Permanently halves Armor and Magic Resist, and doubles Attack Damage, without stacking, then deal Physical Damage to opponent equal to 80% of Attack Damage
    let str = ("*" + source.getName() + " goes all out, casting \"Berserk\" on " + target.getName() + ", giving up any defense for destructive offensive power and deals " + x + " physical damage!");

    return str;
}

export function CharFourAbilityFour(source, target){
    //Null Ability
    let str = "";

    return str;
}

export function CharFourAbilityUltimate(source, target){
    let x = DoDamage(source, target, 1, 1, 2.40, 500);
    
    //Deal Physical Damage to opponent equal to (240% of Attack Damage + 500)
    let str = ("*" + source.getName() + " swings his axe with all his might, casting \"Execution!\" on " + target.getName() + " and deals " + x + " physical damage!");

    return str;
}