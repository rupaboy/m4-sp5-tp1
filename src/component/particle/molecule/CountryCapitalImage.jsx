import { useEffect, useState, useRef } from "react";
import getCapitalImage from "../../../service/getCapitalImage";
import { UseNotification } from "../../../hook/UseNotification";

const CountryCapitalImage = ({ capital, currentCountry }) => {
  const { notify } = UseNotification();
  const [imgUrl, setImgUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const imageCache = useRef({}); //Saves previously loaded img

  useEffect(() => {
    if (!capital) return;

    if (imageCache.current[capital] && imgUrl === null) {
    setImgUrl(imageCache.current[capital]);
    setIsLoading(false); //Using cache instead.
    return;
  }
    
    setImgUrl(null);
    setIsLoading(true);

    notify({
      id: `loading-${capital}`,
      notificationTag: `Fetching image for ${capital}...`,
      duration: 2000,
      withProgress: false,
    });

    getCapitalImage(capital)
      .then((url) => {
        if (url) {
          imageCache.current[capital] = url //Saving Cache
          setImgUrl(url);
        } else {
          notify({
            id: `loading-${capital}`,
            notificationTag: `No image found for ${capital}`,
            duration: 2000,
            withProgress: false,
          });
        }
      })
      .catch((err) => {
        notify({
          id: `loading-${capital}`,
          notificationTag: `Error obtaining image for ${capital}: ${err.message}`,
          duration: 2000,
          withProgress: false,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [capital, currentCountry]);


  if (!isLoading && !imgUrl) return null;

  return (
    <div className="country-image-container w-full">
      {imgUrl && (
        <img
          src={imgUrl}
          alt={`Image of ${capital}`}
          className="rounded"
        />
      )}

      {!isLoading && imgUrl &&
        <h2 className="text-sm my-2">{capital}</h2>
      }

      {isLoading && !imgUrl &&
        <h2 className="text-sm my-2">{'Loading...'}</h2>
      }

      {!isLoading && !imgUrl && (
        <p className="text-sm text-gray-500">No image Available</p>
      )}
    </div>
  );

};

export default CountryCapitalImage;
