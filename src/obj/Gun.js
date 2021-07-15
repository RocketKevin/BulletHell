//still need collision for bullets
export class Gun {
    cursor;//mouse
    bullets;//array of bullets
    constructor(bulletSpeed, bulletRange, fireRate, imageName, dude, input, physics, scene) {
        this.bulletSpeed = bulletSpeed;
        this.bulletRange = bulletRange;
        this.fireRate = fireRate;
        this.coolDown = fireRate;
        this.imageName = imageName;
        this.dude = dude;
        this.cursor = input.mousePointer;
        this.bullets = physics.add.group({
            classType: test
        });
        this.camera = scene.cameras.main;
        this.physics = physics;
    }
    create() {
    }
    update(time, delta) {
        //console.log("camera" + this.camera.scrollX + " " + this.camera.scrollY)
        //console.log("cooldown "+this.coolDown + " "+this.fireRate + " " + this.bulletSpeed + " " + this.bulletRange);
        //shoot bullets
        if (this.cursor.isDown) {
            if (this.coolDown <= 0.01) {//when cooldown <0.01 you can "shoot" again aka spawn bullets
                var bullet = this.bullets.get(this.dude.x + this.dude.width / 4.0, this.dude.y + this.dude.height / 4.0, this.imageName).setScale(0.3);
                var dx = this.cursor.x + this.camera.scrollX - this.dude.x;
                var dy = this.cursor.y + this.camera.scrollY - this.dude.y;
                var hyp = Math.sqrt(dx * dx + dy * dy);
                bullet.body.setVelocityX(dx / hyp * this.bulletSpeed);//bullet velocity
                bullet.body.setVelocityY(dy / hyp * this.bulletSpeed);
                bullet.spawnX = this.dude.x;
                bullet.spawnY = this.dude.y;
                this.coolDown = this.fireRate;
                // console.log("id: " + bullet.id);
            }
        }
        this.coolDown = this.coolDown - delta;
        //hide bullets when outof range
        this.bullets.children.iterate(child => {
            child.visible = true;
            child.active = true;
            var dx = child.x - child.spawnX;
            var dy = child.y - child.spawnY
            var dist = dx * dx + dy * dy;
            if (dist > this.bulletRange) {
                child.visible = false;
                child.active = false;
            }
        })
    }
}
class test extends Phaser.Physics.Arcade.Sprite {
    static increase = 1;
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.spawnX = x;
        this.spawnY = y;
        this.id = test.increase++;
        this.damage = 100;
    }
}