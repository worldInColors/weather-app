import InfoGridItem from "./InfoGridItem";

function InfoGrid() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <InfoGridItem text="Feels like" value="18°" />
      <InfoGridItem text="Humidity" value="60%" />
      <InfoGridItem text="Wind" value="5 km/h" />
      <InfoGridItem text="Chance of Rain" value="20%" />
    </div>
  );
}

export default InfoGrid;
