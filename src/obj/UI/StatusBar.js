
export default class StatusBar extends Phaser.GameObjects.Container {
  constructor(scene) {
    super(scene)
    scene.add.existing(this)
    this.player = scene.player
    this.coins = this.player.status.coins
    this.setDepth(100);
    this.setScrollFactor(0);



    this.text = new Phaser.GameObjects.Text(scene, 0, window.innerHeight - 30, "Coins: " + this.coins.toString(), { fontFamily: "Arial", fontSize: "30px" });
    this.add(this.text);

    this.healthBarWidth = window.innerWidth / 2
    this.healthBarHeight = 25;
    console.log()
    this.border = new Phaser.GameObjects.Rectangle(scene, this.healthBarWidth / 2, this.healthBarHeight / 2, this.healthBarWidth, this.healthBarHeight, 0x000000, 1);
    this.healthBar = new Phaser.GameObjects.Rectangle(scene, this.healthBarWidth / 2, this.healthBarHeight / 2, this.healthBarWidth, this.healthBarHeight, 0xc2c20e, 1);
    this.add(this.border);
    this.add(this.healthBar);
  }

  update() {
    this.coins = this.player.status.coins
    this.text.setText("Coins: " + this.coins.toString())
    this.healthBar.width = this.healthBarWidth * (this.player.status.hp / 1000.0);

  }
}
