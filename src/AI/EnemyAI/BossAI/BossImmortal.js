import State from "../../StateMachine/State.js";

export default class BossImmortal extends State {
    onEnter() {
        this.regen = 1000;
    }


    onExit() {

    }


    update(deltaT) {
        let player = this.getStateMachine().player;
        let enemy = this.getStateMachine().sprite;
        this.regen -= deltaT
    }
}

