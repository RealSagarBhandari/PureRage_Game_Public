export function Heal(source, sourcetype, ratio, value){
    let actualHeal = 0;
    switch(sourcetype){
        case 1:
            actualHeal = Math.floor(Math.random() * (Math.round(source.getAttack() * source.getAttackRatio() * 1.1) - Math.round(source.getAttack() * source.getAttackRatio() * 0.9) + 1)) + Math.round(source.getAttack() * source.getAttackRatio() * 0.9);
            break;
        case 2:
            actualHeal = Math.floor(Math.random() * (Math.round(source.getMagicPower() * source.getMagicPowerRatio() * 1.1) - Math.round(source.getMagicPower() * source.getMagicPowerRatio() * 0.9) + 1)) + Math.round(source.getMagicPower() * source.getMagicPowerRatio() * 0.9);
            break;
        default:
    }

    actualHeal = Math.round(actualHeal * ratio + value);

    source.setCurrentHealth(source.getCurrentHealth() + actualHeal);
    if (source.getCurrentHealth() > source.getHealth()){
        source.setCurrentHealth(source.getHealth());
    }

    return actualHeal;
}

export function DoDamage(source, target, sourcetype, defensetype, ratio, value){
    let actualAttack = 0;
    switch(sourcetype){
        case 1:
            actualAttack = Math.floor(Math.random() * (Math.round(source.getAttack() * source.getAttackRatio() * 1.1) - Math.round(source.getAttack() * source.getAttackRatio() * 0.9) + 1)) + Math.round(source.getAttack() * source.getAttackRatio() * 0.9);
            break;
        case 2:
            actualAttack = Math.floor(Math.random() * (Math.round(source.getMagicPower() * source.getMagicPowerRatio() * 1.1) - Math.round(source.getMagicPower() * source.getMagicPowerRatio() * 0.9) + 1)) + Math.round(source.getMagicPower() * source.getMagicPowerRatio() * 0.9);
            break;
        default:
    }
    //console.log("Random attack: " + actualAttack);

    actualAttack = actualAttack * ratio + value;
    //1 is Physical, 2 is Magical.
    //These uses the formula that randomizing an integer evenly between 2 integers is: floor(random * (max - min + 1)) + min
    //Math.random() gives a random real value between 0 and 1.
    //The ratio is good for calculating buffs and debuffs later on, without affecting the base value.

    let actualDefense = 0;
    switch(defensetype){
        case 1:
            actualDefense = Math.floor(Math.random() * (Math.round(target.getArmor() * target.getArmorRatio() * 1.1) - Math.round(target.getArmor() * target.getArmorRatio() * 0.9) + 1)) + Math.round(target.getArmor() * target.getArmorRatio() * 0.9);
            break;
        case 2:
            actualDefense = Math.floor(Math.random() * (Math.round(target.getMagicResist() * target.getMagicResistRatio() * 1.1) - Math.round(target.getMagicResist() * target.getMagicResistRatio() * 0.9) + 1)) + Math.round(target.getMagicResist() * target.getMagicResistRatio() * 0.9);
            break;
        default:

    }
    //1 is Physical, 2 is Magical

    let Damage = Math.round((((actualAttack * 10) / (actualDefense + 20)) - 3) * 10);
    if (Damage > Math.round(actualAttack - 1)){
        Damage = Math.round(actualAttack - 1);
    }
    if (Damage < 1){
        Damage = 1;
    }
    //Does the calculations with a maximum damage of (full damage - 1) and minimum damage of 1.

    target.setCurrentHealth(target.getCurrentHealth() - Damage);

    //console.log("-" + Damage);
    //console.log(actualAttack + " " + actualDefense + " ,-" + Damage);
    return Damage;
}


