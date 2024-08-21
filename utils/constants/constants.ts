import grandmaBookImage from "../../../public/grandmaBookImage.svg";
import premiumBookImage from "../../../public/premiumBookImage.svg";
import standardBookImage from "../../../public/standardBookImage.svg";

import { createBasicArray, createPremiumArray, createStandardArray } from "../stripeFlowObjects";

export const imageMapping = {
  Basic: grandmaBookImage,
  Standard: standardBookImage,
  Premium: premiumBookImage,
};

export const categoryArrayMapping = {
  Basic: createBasicArray,
  Standard: createStandardArray,
  Premium: createPremiumArray,
};
