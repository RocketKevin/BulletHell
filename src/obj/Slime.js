export class Slime extends Phaser.Physics.Arcade.Sprite {
    defaultHealth = 500;

    constructor(scene, x, y, player, sprite) {
        super(scene, x, y, sprite);
        scene.add.existing(this);
        this.mobAlive = true;
        this.player = scene.Player;
        console.log("here")
        //this = scene.physics.add.sprite(x, y, sprite);
        //this.spawnX = x;
        //this.spawnY = y;
        this.health = this.defaultHealth;
        this.damage = 100;
    }

    getMobAlive() {
        return this.mobAlive;
    }
    setMobDead() {
        this.mobAlive = false;
    }
    
    reset() {
        this.mobAlive = true;
        this.visible = true;
        this.active = true;
        this.health = this.defaultHealth;
    }

    update() {//movement and stuff
        //super.preUpdate();
        //console.log("This mob is updating")
        if (this.active) {
            if (this.body.x < this.player.getX()) {
                this.setVelocityX(40)
                this.setVelocityX(this.body.velocity.x)
            }
            if (this.body.x >= this.player.getX()) {
                this.setVelocityX(-40)
                this.setVelocityX(this.body.velocity.x)
            }
            if (this.body.y < this.player.getY()) {
                this.setVelocityY(40)
                this.setVelocityY(this.body.velocity.y)
            }
            if (this.body.y > this.player.getY()) {
                this.setVelocityY(-40)
                this.setVelocityY(this.body.velocity.y)
            }

            if (this.body.velocity.x > 0) {
                this.play("slime_right", true);
                this.setVelocityX(this.body.velocity.x)
            } else if (this.body.velocity.x < 0) {
                this.play("slime_left", true);
                this.setVelocityX(this.body.velocity.x)
            } else if (this.body.velocity.y < 0) {
                this.play("slime_up", true);
                this.setVelocityY(this.body.velocity.y)
            } else if (this.body.velocity.y > 0) {
                this.play("slime_down", true);
                this.setVelocityY(this.body.velocity.y)
            }
            if (this.health <= 0) {
                this.setVelocityX(0);
                this.setVelocityY(0);
                this.setVelocityX(0);
                this.setVelocityY(0);

                //this.setVisible(false)
                //this.destroy()
            }
        }
    }
}
