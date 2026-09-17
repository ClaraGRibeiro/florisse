import tapetes from "./tapetes";
import mesaPosta from "./mesaposta";
import bolsas from "./bolsa";

export const DISCOUNT = 0.9;

const products = [
  ...tapetes,
  ...mesaPosta,
  ...bolsas,
];

export default { products, DISCOUNT };