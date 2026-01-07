import { Container, RenderTargetSystem, Sprite, spritesheetAsset, Texture } from "pixi.js";
import { GameDefine } from "./GameDefine";


export class Reel {
    container: Container;
    symbols: Sprite[] = [];

    position = 0;
    previousPosition = 0;
    speed = 0;
    target = 0;
    spinning = false;

    private items: Texture[] = [];
    private counter: number;

    constructor() {
        this.container = new Container();
        this.counter = 0;
    }

    Init(items: Texture[], initData: number[]) {
        this.container.removeChildren();
        this.symbols.length = 0;
        this.items = items;

        for (let i = 0; i < initData.length; i++) {
            const texture = items[initData[i]];
            const sprite = new Sprite(texture);
            sprite.y = i * GameDefine.SYMBOL_SIZE
            sprite.x = Math.round((GameDefine.SYMBOL_SIZE - sprite.width) / 2);
            sprite.scale.set(0.8);
            this.symbols.push(sprite);
            this.container.addChild(sprite);
        }
    }

    Spin(target: number, speed: number) {
        this.counter = 0;
        this.speed = speed;
        this.target = target;
        this.spinning = true;
    }

    Update() {
        if (!this.spinning) return;

        this.previousPosition = this.position;
        this.position += this.speed;

        for (let i = 0; i < this.symbols.length; i++) {
            const sprite = this.symbols[i];
            const prevY = sprite.y;

            // Auto calculate y position of sprite. When over symbols.length, it will be set back to 0
            sprite.y = ((this.position + i) % this.symbols.length) * GameDefine.SYMBOL_SIZE;

            var borderBot = GameDefine.SYMBOL_SIZE;
            if (sprite.y < borderBot && prevY > GameDefine.SYMBOL_SIZE) {
                sprite.texture = this.randomTexture();
                this.counter++;

                // Stop the reel
                if (this.counter >= this.target) {
                    this.Stop();
                }
            }
        }
    }

    Stop() {
        this.spinning = false;
    }

    private randomTexture(): Texture {
        return this.items[
            Math.floor(Math.random() * this.items.length)
        ];
    }

    private fitSprite(sprite: Sprite) {
        const scale = Math.min(
            GameDefine.SYMBOL_SIZE / sprite.texture.width,
            GameDefine.SYMBOL_SIZE / sprite.texture.height
        );

        sprite.scale.set(scale);
        sprite.x = Math.round((GameDefine.REEL_WIDTH - sprite.width) / 2);
    }

}
