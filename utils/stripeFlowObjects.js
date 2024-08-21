
export const createPricingCard = (t) => [
  {
    id: "basic",
    category: t("stripeFlow.pricePlanCard.TabPanel.category1"),
    price: "139",
    card: "1",
  },
  {
    id: "standard",
    category: t("stripeFlow.pricePlanCard.TabPanel.category2"),
    price: "179",
    card: "2",
  },
  {
    id: "primium",
    category: t("stripeFlow.pricePlanCard.TabPanel.category3"),
    price: "239",
    card: "3",
  },
]
export const createBasicArray = (t) => [
  {
    standardStatus: true,
    PrimuimStatus: true,
    basicStatus: true,
    dis: t("stripeFlow.pricePlanCard.pricingCardMapArray.dis1"),
  },
  {
    standardStatus: true,
    PrimuimStatus: true,
    basicStatus: true,
    dis: t("stripeFlow.pricePlanCard.pricingCardMapArray.dis2"),
  },
  {
    standardStatus: true,
    PrimuimStatus: true,
    basicStatus: true,
    dis: t("stripeFlow.pricePlanCard.pricingCardMapArray.dis3"),
  },
];

export const createStandardArray = (t) => [
  {
    standardStatus: true,
    PrimuimStatus: true,
    basicStatus: true,
    dis: t("stripeFlow.pricePlanCard.pricingCardMapArray.dis1"),
  },
  {
    standardStatus: true,
    PrimuimStatus: true,
    basicStatus: true,
    dis: t("stripeFlow.pricePlanCard.pricingCardMapArray.dis2"),
  },
  {
    standardStatus: true,
    PrimuimStatus: true,
    basicStatus: true,
    dis: t("stripeFlow.pricePlanCard.pricingCardMapArray.dis3"),
  },
  {
    standardStatus: true,
    PrimuimStatus: true,
    basicStatus: false,
    dis: t("stripeFlow.pricePlanCard.pricingCardMapArray.dis4"),
  },
  {
    standardStatus: true,
    PrimuimStatus: true,
    basicStatus: false,
    dis: t("stripeFlow.pricePlanCard.pricingCardMapArray.dis5"),
  },
  {
    standardStatus: true,
    PrimuimStatus: true,
    basicStatus: false,
    dis: t("stripeFlow.pricePlanCard.pricingCardMapArray.dis6"),
  },
];

export const createPremiumArray = (t) => [
  {
    standardStatus: true,
    PrimuimStatus: true,
    basicStatus: true,
    dis: t("stripeFlow.pricePlanCard.pricingCardMapArray.dis1"),
  },
  {
    standardStatus: true,
    PrimuimStatus: true,
    basicStatus: true,
    dis: t("stripeFlow.pricePlanCard.pricingCardMapArray.dis2"),
  },
  {
    standardStatus: true,
    PrimuimStatus: true,
    basicStatus: true,
    dis: t("stripeFlow.pricePlanCard.pricingCardMapArray.dis3"),
  },
  {
    standardStatus: true,
    PrimuimStatus: true,
    basicStatus: false,
    dis: t("stripeFlow.pricePlanCard.pricingCardMapArray.dis4"),
  },
  {
    standardStatus: true,
    PrimuimStatus: true,
    basicStatus: false,
    dis: t("stripeFlow.pricePlanCard.pricingCardMapArray.dis5"),
  },
  {
    standardStatus: true,
    PrimuimStatus: true,
    basicStatus: false,
    dis: t("stripeFlow.pricePlanCard.pricingCardMapArray.dis6"),
  },
  {
    standardStatus: false,
    PrimuimStatus: true,
    basicStatus: false,
    dis: t("stripeFlow.pricePlanCard.pricingCardMapArray.dis7"),
  },
  {
    standardStatus: false,
    PrimuimStatus: true,
    basicStatus: false,
    dis: t("stripeFlow.pricePlanCard.pricingCardMapArray.dis8"),
  },
  {
    standardStatus: false,
    PrimuimStatus: true,
    basicStatus: false,
    dis: t("stripeFlow.pricePlanCard.pricingCardMapArray.dis9"),
  },
];
export const createCheckArray = (t) => [
  {
    standardStatus: true,
    PrimuimStatus: true,
    basicStatus: true,
    dis: t("stripeFlow.pricePlanCard.pricingCardMapArray.dis1"),
  },
  {
    standardStatus: true,
    PrimuimStatus: true,
    basicStatus: true,
    dis: t("stripeFlow.pricePlanCard.pricingCardMapArray.dis2"),
  },
  {
    standardStatus: true,
    PrimuimStatus: true,
    basicStatus: true,
    dis: t("stripeFlow.pricePlanCard.pricingCardMapArray.dis3"),
  },
  {
    standardStatus: true,
    PrimuimStatus: true,
    basicStatus: false,
    dis: t("stripeFlow.pricePlanCard.pricingCardMapArray.dis4"),
  },
  {
    standardStatus: true,
    PrimuimStatus: true,
    basicStatus: false,
    dis: t("stripeFlow.pricePlanCard.pricingCardMapArray.dis5"),
  },
  {
    standardStatus: true,
    PrimuimStatus: true,
    basicStatus: false,
    dis: t("stripeFlow.pricePlanCard.pricingCardMapArray.dis6"),
  },
  {
    standardStatus: false,
    PrimuimStatus: true,
    basicStatus: false,
    dis: t("stripeFlow.pricePlanCard.pricingCardMapArray.dis7"),
  },
  {
    standardStatus: false,
    PrimuimStatus: true,
    basicStatus: false,
    dis: t("stripeFlow.pricePlanCard.pricingCardMapArray.dis8"),
  },
  {
    standardStatus: false,
    PrimuimStatus: true,
    basicStatus: false,
    dis: t("stripeFlow.pricePlanCard.pricingCardMapArray.dis9"),
  },
];

export const createDropDownOptions = (t) => [
  { value: 0, label: t("stripeFlow.PurchaseForm.dropDown.value0.label"), hidden: true },
  { value: 1, label: t("stripeFlow.PurchaseForm.dropDown.value1.label"), price: t("stripeFlow.PurchaseForm.dropDown.value1.price"), color: "#e1693b" },
  { value: 2, label: t("stripeFlow.PurchaseForm.dropDown.value2.label"), price: t("stripeFlow.PurchaseForm.dropDown.value2.price"), color: "#e1693b" },
  { value: 3, label: t("stripeFlow.PurchaseForm.dropDown.value3.label"), price: t("stripeFlow.PurchaseForm.dropDown.value3.price"), color: "#e1693b" },
  { value: 4, label: t("stripeFlow.PurchaseForm.dropDown.value4.label"), price: t("stripeFlow.PurchaseForm.dropDown.value4.price"), color: "#e1693b" },
  { value: 5, label: t("stripeFlow.PurchaseForm.dropDown.value5.label"), price: t("stripeFlow.PurchaseForm.dropDown.value5.price"), color: "#e1693b" },
  { value: 6, label: t("stripeFlow.PurchaseForm.dropDown.value6.label"), price: t("stripeFlow.PurchaseForm.dropDown.value6.price"), color: "#e1693b" },
  { value: 7, label: t("stripeFlow.PurchaseForm.dropDown.value7.label"), price: t("stripeFlow.PurchaseForm.dropDown.value7.price"), color: "#e1693b" },
  { value: 8, label: t("stripeFlow.PurchaseForm.dropDown.value8.label"), price: t("stripeFlow.PurchaseForm.dropDown.value8.price"), color: "#e1693b" },
  { value: 9, label: t("stripeFlow.PurchaseForm.dropDown.value9.label"), price: t("stripeFlow.PurchaseForm.dropDown.value9.price"), color: "#e1693b" },
];
