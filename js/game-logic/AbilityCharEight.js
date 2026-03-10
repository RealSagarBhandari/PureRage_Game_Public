import { Heal, DoDamage } from "./functions.js";

export function CharEightAbilityOne(source, target){
    let x = DoDamage(source, target, 2, 2, 1.30, 150);
    let y = Heal(source, 2, 0.25, 20);
    target.setHemoStacks(target.getHemoStacks() + 1);
    
    //Drains the enemy of their blood, dealing Magical Damage to opponent equal to (130% Magic Power + 150), and heal for (25% of Magic Power + 20).
    //Additionally, this ability causes the enemy to bleed for (2% of Current Health per stack) True Damage every round permanently, stacking infinitely and additively
    let str = ("*" + source.getName() + " casts \"Hemoplague\", dealing " + x + " magical damage on " + target.getName() + " and heals self for " + y + " health! This ability also causes " + target.getName() + " to bleed!");

    return str;
}

export function CharEightAbilityTwo(source, target){
    let x = Heal(source, 2, 0.10, 100);
    source.setMagicPowerRatio(source.getMagicPowerRatio() + 0.25);
    source.setBloodRageStacks(source.getBloodRageStacks() + 1);
    
    //Heals for (10% Magic Power + 100) and permanently additively gain 25% Magic Power. However, this will cause self to bleed for 
    //(2% of Current Health per stack) True Damage every round permanently, stacking infinitely and additively
    let str = ("*" + source.getName() + " casts \"Blood Rage\", healing for " + x + " health and gains much Magic Power! However, this evil ability causes himself to bleed!");

    return str;
}

export function CharEightAbilityThree(source, target){
    let x = DoDamage(source, target, 2, 1, 1.20, (120 * target.getHemoStacks()));
    
    //Deal Physical Damage to opponent equal to (120% of Magic Power + 120 per stack of Hemoplague bleed effect on the opponent)
    let str = ("*" + source.getName() + " casts \"Blood Burn\" on " + target.getName() + ", igniting their plagued blood and deals " + x + " physical damage!");

    return str;
}

export function CharEightAbilityFour(source, target){
    //Null Ability
    let str = "";

    return str;
}

export function CharEightAbilityUltimate(source, target){
    target.setHemoStacks(target.getHemoStacks() + source.getBloodRageStacks());
    let x = Heal(source, 2, 0, (100 * source.getBloodRageStacks()));
    source.setBloodRageStacks(0);

    //Heals for (100 per stack of Blood Rage bleed effect on self), then increase the number of stacks of Hemoplague bleed effect on the opponent by 
    //the number of Blood Rage bleed effect stacks on self. Then, clear all stacks of Blood Rage bleed effect on self
    let str = ("*" + source.getName() + " casts \"Grand Transfusion\", healing for " + x + " health and transferring his own cursed vile blood to " + target.getName() + "!");

    return str;
}