import { Heal, DoDamage } from "./functions.js";

export function CharNineAbilityOne(source, target){
    let x = DoDamage(source, target, 1, 1, (1.60 * (1.0 + 0.4 * source.getRipjawStarveStacks())), ((300 + (target.getHealth() * 0.3)) * (1.0 + 0.4 * source.getRipjawStarveStacks())));
    source.setRipjawStarveStacks(0);

    //Bite the enemy, dealing (160% Attack Damage + 300 + 30% of opponent's maximum health) Physical Damage, the whole damage additively increases by 40% per stack of "Starve"
    //and consumes all stacks
    let str = ("*" + source.getName() + " casts \"Bite\", dealing " + x + " physical damage on " + target.getName() + "! You have " + source.getRipjawStarveStacks() + " \"Starve\" stacks left!");

    return str;
}

export function CharNineAbilityTwo(source, target){
    source.setMagicPowerRatio(source.getMagicPowerRatio() + 0.08);
    source.setAttackRatio(source.getAttackRatio() + 0.08);
    source.setRipjawStarveStacks(source.getRipjawStarveStacks() + 1);
    
    //Permanently additively increase Attack Damage by 8% and Magic Power by 8%, also gaining a stack of "Starve". Other abilities consume all stacks
    //of "Starve" and will be enhanced respectively
    let str = ("*" + source.getName() + " casts \"Starve\", the hunger for food makes " + source.getName() + " more fierce, especially when he next bites on food! You have " + source.getRipjawStarveStacks() + " \"Starve\" stacks left!");

    return str;
}

export function CharNineAbilityThree(source, target){
    let x = DoDamage(source, target, 1, 2, (1.20 * (1.0 + 0.4 * source.getRipjawStarveStacks())), (100 * (1.0 + 0.4 * source.getRipjawStarveStacks())));
    let y = Heal(source, 2, (0.15 * (1.0 + 0.6 * source.getRipjawStarveStacks())), (50 * (1.0 + 0.6 * source.getRipjawStarveStacks())));
    source.setArmorRatio(source.getArmorRatio() + (0.06 * (1.0 + 0.25 * source.getRipjawStarveStacks())));
    source.setMagicResistRatio(source.getMagicResistRatio() + (0.10 * (1.0 + 0.25 * source.getRipjawStarveStacks())));
    source.setRipjawStarveStacks(0);

    //Bite off and devour the flesh of the enemy, dealing (120% Attack Damage + 100) Magical Damage, and heals for (15% Magic Power + 50) health.
    //Additionally, permanently additively increase Armor by 6% and Magic Resist by 10%. Consume all stacks of "Starve", for each stack the damage is
    //additively increased by 40%, the heal by 60%, and the permanent defenses by 25%.
    let str = ("*" + source.getName() + " casts \"Devour\" on " + target.getName() + ", eating their flesh and dealing " + x + " magical damage! Eating also heals " + source.getName() + " for " + y + " health and buffed resistances! You have " + source.getRipjawStarveStacks() + " \"Starve\" stacks left!");

    return str;
}

export function CharNineAbilityFour(source, target){
    let a = DoDamage(source, target, 1, 1, (0.36 * (1.0 + 0.5 * source.getRipjawStarveStacks())), 30 * (1.0 + 0.5 * source.getRipjawStarveStacks()));
    let b = DoDamage(source, target, 1, 1, (0.36 * (1.0 + 0.5 * source.getRipjawStarveStacks())), 30 * (1.0 + 0.5 * source.getRipjawStarveStacks()));
    let c = DoDamage(source, target, 1, 1, (0.36 * (1.0 + 0.5 * source.getRipjawStarveStacks())), 30 * (1.0 + 0.5 * source.getRipjawStarveStacks()));
    let d = DoDamage(source, target, 1, 1, (0.36 * (1.0 + 0.5 * source.getRipjawStarveStacks())), 30 * (1.0 + 0.5 * source.getRipjawStarveStacks()));
    let e = DoDamage(source, target, 1, 1, (0.36 * (1.0 + 0.5 * source.getRipjawStarveStacks())), 30 * (1.0 + 0.5 * source.getRipjawStarveStacks()));
    let f = DoDamage(source, target, 1, 1, (0.36 * (1.0 + 0.5 * source.getRipjawStarveStacks())), 30 * (1.0 + 0.5 * source.getRipjawStarveStacks()));
    source.setRipjawStarveStacks(0);
    let g = a + b + c + d + e + f;

    //Chew on the enemy, dealing (36% Attack Damage + 30) Physical Damage six times, the damage additively increases by 50% per stack of "Starve" and consumes all stacks
    let str = ("*" + source.getName() + " casts \"Chew\" on " + target.getName() + ", repeatedly biting and chomping on them and dealing " + a + ", " + b + ", " + c + ", " + d + ", " + e + ", " + f + ", for a total of " + g + " physical damage! You have " + source.getRipjawStarveStacks() + " \"Starve\" stacks left!");

    return str;
}

export function CharNineAbilityUltimate(source, target){
    let threshold = 0.4 * source.getAttack() * source.getAttackRatio();
    if (threshold > 800){
        threshold = 800;
    }
    let x = 0;
    let str = " ";

    if (target.getCurrentHealth() > threshold){
        x = DoDamage(source, target, 1, 2, (1.90 * (1.0 + 0.3 * source.getRipjawStarveStacks())), (((target.getHealth() - target.getCurrentHealth()) * 0.5) * (1.0 + 0.3 * source.getRipjawStarveStacks())));
        source.setRipjawStarveStacks(0);
        str = ("*" + source.getName() + " casts \"Swallow\" on " + target.getName() + ", despite failing in swallowing them, this still deals " + x + " magical damage! You have " + source.getRipjawStarveStacks() + " \"Starve\" stacks left!");
    } else{
        target.setCurrentHealth(-100000);
        source.setRipjawStarveStacks(0);
        str = ("*" + source.getName() + " casts \"Swallow\" on " + target.getName() + " who is too weak to resist and is eaten alive!");
    }

    //Attempts to swallow the enemy completely, dealing (190% Attack Damage + 50% of opponent's lost health) Magical Damage, the whole damage additively increases by 30% per stack of "Starve"
    //and consumes all stacks. Additionally, if the enemy's current health is below the threshold of 40% Attack Damage, succeed in swallowing them and instantly kills them. The threshold is capped at 800.

    return str;
}