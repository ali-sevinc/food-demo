import Error from "../ui/Error";
import Loader from "../ui/Loader";
import FoodItem from "./FoodItem";
import useFoods from "./useFoods";

export default function Foods() {
  const { foods, isError, isLoading } = useFoods();

  if (isError) {
    return <Error title="An error occured" message={isError.message} />;
  }
  if (isLoading && !isError) {
    return <Loader />;
  }

  return (
    <ul className=" mx-auto mt-12 grid w-[90%] grid-cols-1 gap-4  text-stone-100 sm:w-[80%] md:w-[70%] md:grid-cols-2 xl:grid-cols-3 ">
      {foods.map((food) => (
        <FoodItem key={food.id} food={food} />
      ))}
    </ul>
  );
}
