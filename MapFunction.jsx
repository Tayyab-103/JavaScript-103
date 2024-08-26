import ErrorMessage from "./components/ErrorMessage";
import FoodItems from "./components/FoodItems";

const MapFunction = () => {
  const listOfItems = ["Dal", "Green vagetables", "Roti", "Fruits", "Milk"];
  //   const listOfItems = [];

  return (
    <>
      <div>
        <h1>List Of Items</h1>
        <ErrorMessage items={listOfItems}/>
        <FoodItems  items={listOfItems}/>
      </div>
    </>
  );
};

export default MapFunction;
