import S from 'Scene';
import R from 'Reactive';
import D from 'Diagnostics';

import Patches from 'Patches';
import Animation from 'Animation';
import Time from 'Time';


const Gas = 'Gas';
const PokeBall = 'pokeball';
const Pikachu = "Pikachu";
const Greninja = "Charizard";

const duration = 1000
const initialSize = 0.0;
const finalSize = 0.1;

const timeDriverParameters = {
    durationMilliseconds: duration,
    loopCount: 1,
    mirror: false
};



class SpawnAnimation {
    gas;
    pokeball;
    pokemon1;
    pokemon2
    timeDriver: TimeDriver
    p1;

    constructor() {
        this.timeDriver = Animation.timeDriver(timeDriverParameters);
        this.p1 = true;
    }

    async getObjects() {
        [this.gas, this.pokeball, this.pokemon1, this.pokemon2] = await Promise.all([
            S.root.findFirst(Gas),
            S.root.findFirst(PokeBall),
            S.root.findFirst(Pikachu),
            S.root.findFirst(Greninja),
        ]);
        this.gas.hidden = R.val(true);
        this.pokeball.hidden = R.val(true);
    }

    setGasHidden(hidden: boolean) {
        this.gas.hidden = R.val(hidden);
    }

    setPokemonHidden() {
        this.pokemon1.hidden = R.val(true);
        this.pokemon2.hidden = R.val(true);
    }

    throwPokeball() {
        Patches.inputs.setPulse('resetAnim', R.once())
        D.log(this.pokeball.name);
        this.setGasHidden(true);
        Patches.inputs.setPulse('trigBallAnim', R.once())
        this.pokeball.hidden = R.val(false);
        Patches.outputs.getPulse('onAnimComplete')
        .then(onComplete => {
            onComplete.subscribe(() => {
                spawnAnim.setGasHidden(false);
                this.pokemon1.hidden = R.val(!this.p1);
                this.pokemon2.hidden = R.val(this.p1);
                this.spawnPokemon();
                Time.setTimeout(async () => {
                    spawnAnim.setGasHidden(true);
                    this.pokeball.hidden = R.val(true);
                  }, 1000);
            })
        })
    }

    spawnPokemon() {
        this.animateSpawn(this.p1? this.pokemon1 : this.pokemon2);
    }

    retievePokemon() {
        this.setGasHidden(false);
        this.animateRetrieve();
        this.pokeball.hidden = R.val(false);
    }

    animateSpawn(obj: SceneObjectBase) {
        const sizeSampler = Animation.samplers.easeInOutBounce(initialSize, finalSize);
    const sizeAnimation = Animation.animate(this.timeDriver, sizeSampler);
    obj.transform.scaleX = sizeAnimation;
    obj.transform.scaleY = sizeAnimation;
    obj.transform.scaleZ = sizeAnimation;
    this.timeDriver.reset();
    this.timeDriver.start();
    }

    animateRetrieve() {
        let obj = this.p1? this.pokemon1 : this.pokemon2;
        this.p1 = !this.p1;
        const sizeSampler = Animation.samplers.easeInOutBounce(finalSize, initialSize);
        const sizeAnimation = Animation.animate(this.timeDriver, sizeSampler);
        obj.transform.scaleX = sizeAnimation;
        obj.transform.scaleY = sizeAnimation;
        obj.transform.scaleZ = sizeAnimation;
        this.setGasHidden(false);   
        this.timeDriver.reset();
        this.timeDriver.start();
        Time.setTimeout(() => {
                this.throwPokeball();
        }, duration);
    }
}

export const spawnAnim = new SpawnAnimation();
spawnAnim.getObjects();
