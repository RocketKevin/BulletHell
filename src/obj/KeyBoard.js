export class KeyBoard {
    #keyboard
    #scene
    constructor(scene) {
        this.#scene = scene;
        this.#keyboard = scene.input.keyboard.addKeys("W, A, S, D, Q, E");
    }
    getKeyboard() {
        return this.#keyboard;
    }
    doorKey() {

    }
    update() {
        if (this.#scene.player != null && this.#scene.player.active) {
            if (this.#keyboard.D.isDown) {
                this.#scene.player.setVelocityX(128);
            }
            if (this.#keyboard.A.isDown) {
                this.#scene.player.setVelocityX(-128);
            }
            if (this.#keyboard.W.isDown) {
                this.#scene.player.setVelocityY(-128);
            }
            if (this.#keyboard.S.isDown) {
                this.#scene.player.setVelocityY(128);
            }
            if (this.#keyboard.A.isUp && this.#keyboard.D.isUp) {
                this.#scene.player.setVelocityX(0);
            }
            if (this.#keyboard.W.isUp && this.#keyboard.S.isUp) {
                this.#scene.player.setVelocityY(0);
            }
            if (this.#keyboard.A.isDown && this.#keyboard.W.isDown) {
                this.#scene.player.setVelocityY(-90);
                this.#scene.player.setVelocityX(-90);
            }
            if (this.#keyboard.W.isDown && this.#keyboard.D.isDown) {
                this.#scene.player.setVelocityY(-90);
                this.#scene.player.setVelocityX(90);
            }
            if (this.#keyboard.D.isDown && this.#keyboard.S.isDown) {
                this.#scene.player.setVelocityY(90);
                this.#scene.player.setVelocityX(90);
            }
            if (this.#keyboard.A.isDown && this.#keyboard.S.isDown) {
                this.#scene.player.setVelocityY(90);
                this.#scene.player.setVelocityX(-90);
            }
        }
        if(this.#scene.player != null && this.#scene.player.gunController != null) {
            if (this.#keyboard.Q.isDown) {
                if (this.#scene.player.switchGunCoolDown <= 0) {
                    this.#scene.player.gunController.nextGun();
                    this.#scene.player.switchGunCoolDown = 2000;
                }
                else {
                    console.log(this.#scene.player.switchGunCoolDown + " ms until gun can be swapped");
                }
                this.#keyboard.Q.isDown = false;
            }   
        }
    }
}