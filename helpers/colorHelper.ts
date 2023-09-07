import genericHelpers from "./generic";

const { randomInteger } = genericHelpers;

const randomRgbColor = (): [r: number, g: number, b: number] => {
  let r = randomInteger(255);
  let g = randomInteger(255);
  let b = randomInteger(255);
  return [r, g, b];
};

const convertRGBToHex = (color: [r: number, g: number, b: number]) => {
  let [r, g, b] = randomRgbColor();
  let hr = r.toString(16).padStart(2, "0");
  let hg = g.toString(16).padStart(2, "0");
  let hb = b.toString(16).padStart(2, "0");
  return "#" + hr + hg + hb;
};

export default {
  randomRgbColor,
  convertRGBToHex,
};
