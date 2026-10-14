import { Crop } from '../types';
import { CEREALS_CROPS } from './crops/cereals';
import { PULSES_CROPS } from './crops/pulses';
import { OILSEEDS_CROPS } from './crops/oilseeds';
import { COMMERCIAL_CROPS } from './crops/commercial';
import { VEGETABLES_CROPS } from './crops/vegetables';
import { FRUITS_CROPS } from './crops/fruits';
import { SPICES_CROPS } from './crops/spices';

export const INITIAL_CROPS: Crop[] = [
  ...CEREALS_CROPS,
  ...PULSES_CROPS,
  ...OILSEEDS_CROPS,
  ...COMMERCIAL_CROPS,
  ...VEGETABLES_CROPS,
  ...FRUITS_CROPS,
  ...SPICES_CROPS
];

export const CROPS_DATA = INITIAL_CROPS;
export const CROPS_DATABASE = INITIAL_CROPS;
