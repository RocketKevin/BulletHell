export default class Bullet extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.spawnX = x;
        this.spawnY = y;
        this.damage = 100;
    }
    setVelocity(startX, startY, targetX, targetY, camera, bulletSpeed){
        var dx = targetX + camera.scrollX - startX;
        var dy = targetY + camera.scrollY - startY;
        var hyp = Math.sqrt(dx * dx + dy * dy);
        this.body.setVelocityX(dx / hyp * bulletSpeed);//unit vector's x times some speed
        this.body.setVelocityY(dy / hyp * bulletSpeed);//unit vector's y times some speed
    }
}