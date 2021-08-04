export class HitBox{
    constructor(scene, player) {
        this.sprite = scene.physics.add.sprite(player.x, player.y);
        this.sprite.setSize(40,100);
        this.sprite.setScale(0.5);
        this.sprite.setOrigin(0,0);
        this.sprite.setOffset(5,1);
        this.follower = player;
    }
    update() {
        if(this.sprite.active) {
            this.sprite.x = this.follower.x;
            this.sprite.y = this.follower.y;
        }
    }
}