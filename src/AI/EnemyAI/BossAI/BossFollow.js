import State from "../../StateMachine/State.js";

export default class BossFollow extends State {
    onEnter() {

    }


    onExit() {

    }


    update(deltaT) {
        //when the player gets too far away stop following.
        //when the player gets out of visiion stop following.
        //change to another state. Go back to idle.
        // console.log("following player.");


        let player = this.getStateMachine().player;
        let enemy = this.getStateMachine().sprite;

        // console.log(enemy.body.x)

        let velocityX = player.x - enemy.body.x;
        let velocityY = player.y - enemy.body.y;

        let distance = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
        velocityX = velocityX / distance * enemy.getSpeed();
        velocityY = velocityY / distance * enemy.getSpeed();

        enemy.setVelocityX(velocityX);
        enemy.setVelocityY(velocityY);
        // if (Math.abs(velocityY) < Math.abs(velocityX)) {
        //     if (enemy.body.velocity.x > 0) {
        //         enemy.flipX = false
        //         enemy.anims.play("goblin_right", true);
        //         enemy.setVelocityX(enemy.body.velocity.x)
        //     } else if (enemy.body.velocity.x < 0) {
        //         enemy.flipX = true
        //         enemy.play("goblin_right", true);
        //         enemy.setVelocityX(enemy.body.velocity.x)
        //     }
        // }

        // else if (Math.abs(velocityX) <= Math.abs(velocityY)) {
        //     // if (Math.abs(velocityX) <= this.speed / 2) {
        //     if (player.x - enemy.x > 0) {
        //         enemy.flipX = false
        //         enemy.play("goblin_right", true);
        //     } else if (player.x - enemy.x < 0) {
        //         enemy.flipX = true
        //         enemy.play("goblin_right", true);
        //     }
        // }
    }
}

