import tapetes from "./tapetes";
import mesaPosta from "./mesaposta";
import bolsas from "./bolsa";
import prontaEntrega from "./prontaEntrega";

import { DISCOUNT } from "./config";

const products = [
  ...tapetes,
  ...mesaPosta,
  ...bolsas,
];

export default {
  products,
  prontaEntrega,
  DISCOUNT,
};