import rugs from "./rugs";
import tableware from "./tableware";
import bags from "./bags";
import readyToDeliver from "./readyToDeliver";

import { DISCOUNT } from "./config";

const products = [...rugs, ...tableware, ...bags];

const productsData = {
  products,
  readyToDeliver,
  DISCOUNT,
};

export default productsData;
