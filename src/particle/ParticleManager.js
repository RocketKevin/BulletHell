
export default class PartileManager
{
    /**
     * @type {Phaser.GameObjects.Group[]}
     */
    #groups;
    #scene;

    /**
     * Creates a new particle manager.
     * @param {Phaser.Scene} scene - The current scene.
     */
    constructor(scene)
    {
        this.#groups = [];
        this.#scene = scene;
    }
 
    getParticleGroups()
    {
        return this.#groups;
    }

    /**
     * Adds a mob group to the mobManager.
     * @param {String} particleName - The name of the particle.
     * @param {Function} classType - The class of the particle.
     */
    addParticleGroup(particleName, classType)
    {
        const groupConfig = {
            classType: classType,
            visible: true,
            frameQuantity: 0,
        }
        let group = this.#scene.physics.add.group(groupConfig);
        group.name = particleName;
        this.#groups.push(group);
    }

    /**
     * Shoots out particles in random directions staring at the given origin.
     * @param {String} partileName - The name of the particle.
     * @param {*} x - The x origin of spray.
     * @param {*} y - The y origin of spray.
     * @param {*} amount - The amount of particles to spray.
     */
    sprayParticle(partileName, x, y, amount = 5)
    {
        let particleGroup = null;
        for(let group of this.#groups) //first search for the particle group.
        {
            if(group.name === partileName)
            {
                particleGroup = group;
                break;
            }
        }
        if(particleGroup)
        {
            let Vec = Phaser.Math.Vector2;
            for(let i = 0; i < amount; i++)
            {
                let dir = new Vec(1, 0);
                dir.rotate(Math.random() * 2 * Math.PI);
                let particle = particleGroup.get(x, y);
                particle.setX(x);
                particle.setY(y);
                particle.active = true;
                particle.setAlpha(1);
                this.#scene.tweens.add({
                    targets: particle,
                    repeat: 0,
                    duration: 1000,
                    y: y + dir.y * 20,
                    x: x + dir.x * 20,
                    ease: "Power1",
                    onComplete: (tween, targets) => {
                        for(let target of targets)
                        {
                            target.active = false;
                        }
                    }
                });
                this.#scene.tweens.add({
                    targets: particle,
                    repeat: 0,
                    delay: 500,
                    duration: 500,
                    alpha: 0,
                    ease: "Power1",
                });
            }
        }
    }
}

