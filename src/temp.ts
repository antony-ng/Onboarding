import { Application, Assets, Container, Sprite } from 'pixi.js';
// Asynchronous IIFE
(async () => {
    // Khởi tạo PixiJS application.
    const app = new Application();  
    // Cài đặt app với một số thuộc tính.
    await app.init({ background: '#1099bb', resizeTo: window });
    // Thả canvas của app vào body của HTML.
    document.body.appendChild(app.canvas);

    // Danh sách UnresolvedAsset
    const fishImgs = [
        { alias: 'fish1', src: 'https://pixijs.com/assets/tutorials/fish-pond/fish1.png' },
        { alias: 'fish2', src: 'https://pixijs.com/assets/tutorials/fish-pond/fish2.png' },
        { alias: 'fish3', src: 'https://pixijs.com/assets/tutorials/fish-pond/fish3.png' },
        { alias: 'fish4', src: 'https://pixijs.com/assets/tutorials/fish-pond/fish4.png' },
        { alias: 'fish5', src: 'https://pixijs.com/assets/tutorials/fish-pond/fish5.png' },
    ];
    // Tải background image

    const bgImageTexture = await Assets.load('https://pixijs.com/assets/tutorials/fish-pond/pond_background.jpg');

    // Tải fish images
    await Assets.load(fishImgs);

    const background = Sprite.from(bgImageTexture);
    const _FISH_COUNT = 5;
    const fishContainer = new Container();
    for (let i = 0; i < _FISH_COUNT; i++) {
        //tạo fish sprite từ texture alias
        const fish = Sprite.from(`fish${i + 1}`);
        //vị trí ngẫu nhiên
        fish.position.set(Math.random() * app.screen.width, Math.random() * app.screen.height);
        fishContainer.addChild(fish);
    }

    app.stage.addChild(background);
    app.stage.addChild(fishContainer);

    app.ticker.add((sticker) => {
        fishContainer.children.forEach((fish) => {
            fish.x -= 1;
            if (fish.x > app.screen.width) {
                fish.x = 0;
            }
        });
    });
})();