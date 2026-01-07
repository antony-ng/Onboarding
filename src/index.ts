import { Application, Container, GAUSSIAN_VALUES, Sprite, Texture } from 'pixi.js';
import { AssetLoader } from './AssetLoader';
import { Reel } from './Reel';
import { GameResources } from './GameResources';
import { GameDefine } from './GameDefine';
import { RollButton } from './RollButton';

(async () => {
    const app = new Application();
    await app.init({ background: '#5599bb', resizeTo: window });

    document.body.appendChild(app.canvas);

    GameDefine.App = app;


    // Asset & Background
    await AssetLoader.Ins.LoadBackground(app);
    var background = Sprite.from(GameResources.background);
    background.width = app.screen.width;
    background.height = app.screen.height;

    // app.stage.addChild(background);

    await AssetLoader.Ins.LoadItems(app);
    var items = [
        Texture.from("item-1"),
        Texture.from("item-2"),
        Texture.from("item-3"),
        Texture.from("item-4"),
    ];
    // #endregion

    // Container
    var reelContainer = new Container();
    app.stage.addChild(reelContainer);

    reelContainer.x = (app.screen.width - GameDefine.REEL_WIDTH * GameDefine.REEL_COUNT) / 2;
    reelContainer.y = GameDefine.SYMBOL_SIZE;
    console.log("Reel Container", reelContainer.x, reelContainer.y);

    // Reels

    var reels: Reel[] = [];
    for (let i = 0; i < GameDefine.REEL_COUNT; i++) {
        const reel = new Reel();
        reel.container.x = i * GameDefine.REEL_WIDTH;
        console.log("Reel", reel.container.x, reel.container.y);
        reel.Init(items, randomInitData());
        reels.push(reel);
        reelContainer.addChild(reel.container);
    }

    // Rool button
    var rollBtn = new RollButton();
    rollBtn.setPosition((app.screen.width - 100) / 2, app.screen.height - 100);
    app.stage.addChild(rollBtn.container);

    // Add button callback behaviour
    rollBtn.onClick = () => {
        console.log("Button callback");
        spinTheReels();
    };

    // region Support functions
    function randomInitData() {
        let data: number[] = [];
        for (let i = 0; i < GameDefine.DISPLAYED_SYMBOLS; i++) {
            let randomIndex = Math.floor(Math.random() * items.length);
            data.push(randomIndex);
        }
        return data;
    }

    function spinTheReels() {
        for (let i = 0; i < reels.length; i++) {
            var speed = 0.1;
            var target = Math.floor(3 + i * 3 + Math.random() * 3);
            console.log("Target spin " + i + ": " + target)
            reels[i].Spin(target, speed);
            
        }
    }
    //#endregion

    app.ticker.add((delta) => {
        reels.forEach((reel) => {
            reel.Update();
        })
    })
})();