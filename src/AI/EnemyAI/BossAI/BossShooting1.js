import State from "../../StateMachine/State.js";

export default class BossShooting1 extends State {
    onEnter() {
        let player = this.getStateMachine().player;
        let enemy = this.getStateMachine().sprite;
        enemy.alpha = 0.5
    }


    onExit() {

    }


    update(deltaT) {
        let player = this.getStateMachine().player;
        let enemy = this.getStateMachine().sprite;
        this.time.addEvent({
            delay: 30000,
            callback: () => { this.player.alpha = 1 },
            callbackScope: this,
            loop: false
        });
    }
}

