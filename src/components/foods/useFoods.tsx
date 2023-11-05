import { useEffect, useState } from "react";
import { FoodType } from "../../helpers/types";
export default function useFoods() {
  const [foods, setFoods] = useState<FoodType[]>([]);
  const [isError, setIsError] = useState<null | { message: string }>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(function () {
    async function getFoods() {
      setIsLoading(true);
      try {
        const res = await fetch("http://localhost:3000/meals");
        if (!res.ok) {
          throw new Error("Ops. Something went wrong.");
        }
        const data = await res.json();
        setFoods(data);
      } catch (error) {
        setIsError({ message: "Ops. Something went wrong." });
      } finally {
        setIsLoading(false);
      }
    }
    getFoods();
  }, []);

  return { foods, isError, isLoading };
}
