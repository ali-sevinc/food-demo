export default function Error({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  return (
    <div className="mx-auto mt-20 text-center">
      <h2 className="py-4 text-2xl text-red-100">{title}</h2>
      <p className="py-2 text-xl text-red-100">{message}</p>
    </div>
  );
}
