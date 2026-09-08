import tapetes from "./tapetes";
import mesaPosta from "./mesaposta";
import bolsas from "./bolsa";

const discount = 0.9;

const products = [
  ...tapetes,
  ...mesaPosta,
  ...bolsas,
];

export default { products, discount };