function InfoGridItem({ text, value }) {
  return (
    <div className="w-full h-full bg-neutral-800 p-4 rounded-xl">
      <h2>{text}</h2>
      <p className="mt-2 text-2xl font-thin">{value}</p>
    </div>
  );
}

export default InfoGridItem;
