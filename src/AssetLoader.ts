import { Application, Assets, Color, Renderer } from "pixi.js";
import { GameResources } from "./GameResources";

export class AssetLoader {
    static Ins: AssetLoader = new AssetLoader();

    async Initialize(app: Application) {
        AssetLoader.Ins = this;
    }

    async LoadBackground(app: Application) {
        await Assets.load(GameResources.background);
    }

    async LoadItems(app: Application) {
        await Assets.load(GameResources.item);
    }
}