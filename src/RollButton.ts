import { Container, Graphics, Text } from "pixi.js";

export class RollButton {
    container: Container;
    btn: Graphics | undefined;
    text: Text | undefined;

    onClick? : () => void;

    constructor() {
        this.container = new Container();
        this.btn = new Graphics().rect(0, 0, 100, 50).fill(0xffffff);
        this.container.addChild(this.btn);

        // Handle button events
        this.btn.eventMode = 'static';
        this.btn.cursor = 'pointer';
        this.btn.on('pointerdown', () => {
            this.onBtnClick();
        });

        this.text = new Text({ text: 'Roll' });
        this.btn.addChild(this.text);
        this.updateTextPosition();
    }

    setPosition(x: number, y: number) {
        this.container.x = x;
        this.container.y = y;
    }

    onBtnClick() {
        console.log("Roll button clicked");
        this.btn!.tint = 0xffff00;
        this.text!.text = "Rolling";
        this.onClick?.(); 
        this.updateTextPosition();
        this.btn?.eventMode
        setTimeout(() => {
            this.resetBtn();
        }, 1500);
    }

    resetBtn() {
        this.btn!.tint = 0xffffff;
        this.text!.text = "Roll";
        this.updateTextPosition();
    }

    updateTextPosition() {
        this.text!.x = this.btn!.width / 2 - this.text!.width / 2;
        this.text!.y = this.btn!.height / 2 - this.text!.height / 2;
    }
}