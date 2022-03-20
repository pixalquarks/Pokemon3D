// const Scene = require("Scene");
// const TouchGestures = require("TouchGestures");
// const R = require("Reactive");
// export const D = require("Diagnostics");

// const Pikachu = "Pikachu";
// const Greninja = "Greninja";
// const TapDetector = "TapDetector";
// const [initialSize, finalSize, initialAngle, finalAngle] = [0, 0.1, 0, 360];
// const duration = 1;

// let isHidden = false;

// async function main() {
//   const [pikachu, greninja, tapDetector] = await Promise.all([
//     Scene.root.findFirst(Pikachu),
//     Scene.root.findFirst(Greninja),
//     Scene.root.findFirst(TapDetector),
//   ]);

//   TouchGestures.onTap(tapDetector).subscribe(() => {
//     D.log("tapDetector plane was tapped");
//     HandleTap();
//     D.log(isHidden);
//     pikachu.hidden = R.val(isHidden);
//     greninja.hidden = R.val(!isHidden);
//   });
// }

// // function AnimateSpawn(obj: SceneObjectBase) {}

// function HandleTap() {
//   isHidden = !isHidden;
// }

// main();
