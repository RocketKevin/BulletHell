export class Mob extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, player, sprite) {
        super(scene, x, y, sprite);
        this.mobAlive = true;
        this.player = player
        console.log("here")
        this.sprite = scene.physics.add.sprite(x, y, sprite);
        //this.spawnX = x;
        //this.spawnY = y;
        this.health = 500;
        this.damage = 100;
    }

    getMobAlive() {
        return this.mobAlive;
    }
    setMobDead() {
        this.mobAlive = false;
    }
    update() {//movement and stuff
        // console.log(this.player.getX())
        if (this.active) {
            if (this.sprite.body.x < this.player.getX()) {
                this.sprite.setVelocityX(40)
                this.setVelocityX(this.sprite.body.velocity.x)
            }
            if (this.sprite.body.x >= this.player.getX()) {
                this.sprite.setVelocityX(-40)
                this.setVelocityX(this.sprite.body.velocity.x)
            }
            if (this.sprite.body.y < this.player.getY()) {
                this.sprite.setVelocityY(40)
                this.setVelocityY(this.sprite.body.velocity.y)
            }
            if (this.sprite.body.y > this.player.getY()) {
                this.sprite.setVelocityY(-40)
                this.setVelocityY(this.sprite.body.velocity.y)
            }

            if (this.sprite.body.velocity.x > 0) {
                this.sprite.play("slime_right", true);
                this.setVelocityX(this.sprite.body.velocity.x)
            } else if (this.sprite.body.velocity.x < 0) {
                this.sprite.play("slime_left", true);
                this.setVelocityX(this.sprite.body.velocity.x)
            } else if (this.sprite.body.velocity.y < 0) {
                this.sprite.play("slime_up", true);
                this.setVelocityY(this.sprite.body.velocity.y)
            } else if (this.sprite.body.velocity.y > 0) {
                this.sprite.play("slime_down", true);
                this.setVelocityY(this.sprite.body.velocity.y)
            }
            if (this.health <= 0) {
                this.sprite.setVelocityX(0);
                this.sprite.setVelocityY(0);
                this.setVelocityX(0);
                this.setVelocityY(0);

                this.sprite.setVisible(false)
                this.destroy()
            }
        }
    }
}
