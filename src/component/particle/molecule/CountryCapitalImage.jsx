import { useContext, useEffect, useRef, useState } from "react";
import getCapitalImage from "../../../service/getCapitalImage";
import { UseNotification } from "../../../hook/UseNotification";
import { FetchStatusContext } from "../../../context/FetchStatusContext";

const CountryCapitalImage = ({ capital, currentCountry }) => {
  const { notify } = UseNotification();
  const { runFetch, getStatus } = useContext(FetchStatusContext);

  const [imgUrl, setImgUrl] = useState(null);
  const imageCache = useRef({});

  const { isLoading, dataLoaded, fetchFailed, didFetch } = getStatus(capital);

  useEffect(() => {
    if (!capital) return;

    if (imageCache.current[capital]) {
      setImgUrl(imageCache.current[capital]);
      return;
    }

    // evitar fetch repetido si ya lo hiciste (aunque no haya imagen)
    if (didFetch && (dataLoaded || fetchFailed)) return;

    setImgUrl(null);

    runFetch(
      capital,
      () => {
        notify({
          id: `${capital}`,
          notificationTag: `Fetching image for ${capital}...`,
          duration: 5000,
        });
        return getCapitalImage(capital);
      },
      (url) => {
        if (url) {
          imageCache.current[capital] = url;
          setImgUrl(url);
        } else {
          notify({
            id: `${capital}`,
            notificationTag: `No image found for ${capital}`,
            duration: 2000,
            withProgress: false,
          });
        }
      }
    ).catch((err) => {
      notify({
        id: `${capital}`,
        notificationTag: `Error obtaining image for ${capital}: ${err.message}`,
        duration: 2000,
        withProgress: false,
      });
    });
  }, [capital, currentCountry]);

  if (!isLoading && !imgUrl) return null;

  return (
    <div className="country-image-container w-full">
      {imgUrl && <img src={imgUrl} alt={`Image of ${capital}`} className="rounded" />}
      {!isLoading && imgUrl && <h2 className="text-sm my-2">{capital}</h2>}
      {isLoading && !imgUrl && <h2 className="text-sm my-2">Loading...</h2>}
      {!isLoading && !imgUrl && <p className="text-sm text-gray-500">No image Available</p>}
    </div>
  );
};

export default CountryCapitalImage;
