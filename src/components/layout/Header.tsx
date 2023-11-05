import foodLogo from "../../assets/choking.png";
import CartButton from "../cart/CartButton";
export default function Header() {
  return (
    <header className=" mx-auto flex h-32 w-[90%] items-center justify-between  py-8 sm:w-[80%] md:h-40 md:w-[70%] ">
      <div className="flex items-center gap-4">
        <img
          src={foodLogo}
          alt="Food-logo"
          className="w-24 rounded-full border-2 border-stone-100 md:w-32 xl:w-36"
        />
        <h1 className="hidden text-3xl font-extrabold uppercase text-stone-100 md:block xl:text-4xl">
          Choking cooking
        </h1>
      </div>
      <CartButton />
    </header>
  );
}
