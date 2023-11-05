import { useCartContext } from "../../context/CartContext";
import { FoodType } from "../../helpers/types";
import Button from "../ui/Button";

export default function FoodItem({ food }: { food: FoodType }) {
  const { addItemToCart } = useCartContext();

  function handleAdd() {
    const data = {
      id: food.id,
      name: food.name,
      price: Number(food.price),
      quantity: 1,
    };
    addItemToCart(data);
  }

  return (
    <li className="flex flex-col items-center justify-between gap-2 rounded-xl bg-stone-950 pb-4 shadow-xl">
      <img
        src={`http://localhost:3000/${food.image}`}
        alt={food.name}
        className="rounded-t-xl"
      />
      <h2 className="text-xl font-bold">{food.name}</h2>
      <p className="italic">${food.price}</p>
      <p className="px-4">{food.description}</p>

      <Button type="button" onClick={handleAdd}>
        Add to cart
      </Button>
    </li>
  );
}
