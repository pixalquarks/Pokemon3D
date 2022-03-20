import S from "Scene";
import D from "Diagnostics";
import Patches from 'Patches';

import { spawnAnim } from "./Animation";

const TouchGestures = require("TouchGestures");

const TapDetector = "TapDetector";

let isHidden = false;

async function main() {
    const [tapDetector] = await Promise.all([
    S.root.findFirst(TapDetector),
  ]);
  Patches.outputs.getPulse('onTargetDetected')
  .then(onDetect => {
    onDetect.subscribe(() => {
      spawnAnim.setPokemonHidden();
      spawnAnim.throwPokeball();
    })
  })
  Patches.outputs.getPulse('onTargetLost')
  .then(onLost => {
    onLost.subscribe(() => {
      spawnAnim.retievePokemon();
    })
  })
  TouchGestures.onTap(tapDetector).subscribe(() => {
      spawnAnim.retievePokemon();
      D.log("Tapped");
      HandleTap();
  })
}

function HandleTap() {
  isHidden = !isHidden;
}

main();
