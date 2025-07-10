const staticMap = ({ lat, lng, zoom = 10, width = 220, height = 180 }) => {
  const url = `https://staticmap.openstreetmap.de/staticmap.php?center=${lat},${lng}&zoom=${zoom}&size=${width}x${height}&maptype=mapnik`;

  return (
    <img
      src={url}
      alt="OpenStreetMap Static Map"
      className="rounded"
    />
  );
};

export default staticMap;
