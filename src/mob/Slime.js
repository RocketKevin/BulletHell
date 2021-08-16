import Mob from "./Mob.js";

export default class Slime extends Mob
{
    constructor(scene, x, y, sprite)
    {
        super(scene, x, y, sprite);
        super.mobConfig({
            damage: 100,
            defaultSpeed: 30,
        })
        this.ai = this.ai = new SlimeController(this, {
            player: this.player,
            animations: "",
            slimes: [],
        });
    }

    update(deltaT)
    {

    }
}