import { Heal, DoDamage } from "./functions.js";

export function CharFiveAbilityOne(source, target){
    let a = DoDamage(source, target, 1, 1, 0.70, 0);
    let b = DoDamage(source, target, 1, 1, 0.70, 0);
    let c = DoDamage(source, target, 1, 1, 0.70, 0);
    let d = a + b + c;
    
    //Deal Physical Damage to opponent equal to 70% of Attack Damage three times
    let str = ("*" + source.getName() + " casts \"Blade Dance\" on " + target.getName() + " and deals " + a + ", " + b + ", " + c + ", for a total of " + d + " physical damage!");

    return str;
}

export function CharFiveAbilityTwo(source, target){
    let x = DoDamage(source, target, 1, 1, 1.10, 150);
    source.setAttackRatio(source.getAttackRatio() + 0.06);
    source.setArmorRatio(source.getArmorRatio() + 0.06);
    source.setMagicResistRatio(source.getMagicResistRatio() + 0.06);
    source.setMagicPowerRatio(source.getMagicPowerRatio() + 0.06);
    
    //Deal Physical Damage to opponent equal to (110% of Attack Damage + 150), then permanently additively increase Attack Damage, Magic Power, Armor, Magic Resist by 6% 
    let str = ("*" + source.getName() + " casts \"Strategic Strike\" on " + target.getName() + " and deals " + x + " physical damage! " + source.getName() + " also improved her posture and enpowers herself!");

    return str;
}

export function CharFiveAbilityThree(source, target){
    let x = DoDamage(source, target, 1, 2, 1.00, 120);
    let y = DoDamage(source, target, 2, 1, 1.00, 120);
    
    //Deals Physical Damage equal to (100% of Magic Power + 120), and deals Magical Damage equal to (100% of Attack Damage + 120)
    let str = ("*" + source.getName() + " casts \"En Garde!\" on " + target.getName() + " and deals " + y + " physical damage and " + x + " magical damage!");

    return str;
}

export function CharFiveAbilityFour(source, target){
    let x = DoDamage(source, target, 2, 2, 1.20, 400);
    
    //Deal Magical Damage to opponent equal to (120% of Magic Power + 400)
    let str = ("*" + source.getName() + " casts \"Enchanted Blade\" on " + target.getName() + " and deals " + x + " magical damage!");

    return str;
}

export function CharFiveAbilityUltimate(source, target){
    let a = DoDamage(source, target, 1, 2, 0.18, 40);
    let b = DoDamage(source, target, 1, 1, 0.18, 40);
    target.setArmorRatio(target.getArmorRatio() - 0.05);
    target.setMagicResistRatio(target.getMagicResistRatio() - 0.05);
    if (target.getArmorRatio() < 0.00){
        target.setArmorRatio(0.00)
    }
    if (target.getMagicResistRatio() < 0.00){
        target.setMagicResistRatio(0.00)
    }
    let c = a + b;

    let d = DoDamage(source, target, 1, 2, 0.18, 40);
    let e = DoDamage(source, target, 1, 1, 0.18, 40);
    target.setArmorRatio(target.getArmorRatio() - 0.05);
    target.setMagicResistRatio(target.getMagicResistRatio() - 0.05);
    if (target.getArmorRatio() < 0.00){
        target.setArmorRatio(0.00)
    }
    if (target.getMagicResistRatio() < 0.00){
        target.setMagicResistRatio(0.00)
    }
    let f = e + d;

    let g = DoDamage(source, target, 1, 2, 0.18, 40);
    let h = DoDamage(source, target, 1, 1, 0.18, 40);
    target.setArmorRatio(target.getArmorRatio() - 0.05);
    target.setMagicResistRatio(target.getMagicResistRatio() - 0.05);
    if (target.getArmorRatio() < 0.00){
        target.setArmorRatio(0.00)
    }
    if (target.getMagicResistRatio() < 0.00){
        target.setMagicResistRatio(0.00)
    }
    let i = g + h;

    let j = DoDamage(source, target, 1, 2, 0.18, 40);
    let k = DoDamage(source, target, 1, 1, 0.18, 40);
    target.setArmorRatio(target.getArmorRatio() - 0.05);
    target.setMagicResistRatio(target.getMagicResistRatio() - 0.05);
    if (target.getArmorRatio() < 0.00){
        target.setArmorRatio(0.00)
    }
    if (target.getMagicResistRatio() < 0.00){
        target.setMagicResistRatio(0.00)
    }
    let l = j + k;

    let m = DoDamage(source, target, 1, 2, 0.18, 40);
    let n = DoDamage(source, target, 1, 1, 0.18, 40);
    target.setArmorRatio(target.getArmorRatio() - 0.05);
    target.setMagicResistRatio(target.getMagicResistRatio() - 0.05);
    if (target.getArmorRatio() < 0.00){
        target.setArmorRatio(0.00)
    }
    if (target.getMagicResistRatio() < 0.00){
        target.setMagicResistRatio(0.00)
    }
    let o = m + n;

    let p = c + f + i + l + o;
    
    //Deal Magical Damage to opponent equal to opponent equal to (18% of Attack Damage + 40), then the same amount for Physical Damage, then 
    //permanently additively decrease enemy Armor and Magic resist by 5%, repeat the whole process 5 times
    let str = ("*" + source.getName() + " unleashes her \"Judgement Cut\" on " + target.getName() + ", shredding defenses with each strike and dealing " + c + ", " + f + ", " + i + ", " + l + ", " + o + ", for a total of " + p + " hybrid damage!");

    return str;
}