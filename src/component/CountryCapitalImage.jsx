import { useEffect, useRef, useState } from "react";
import getCapitalImage from "../service/wikipedia/getCapitalImage";
import Loading from "./particle/molecule/Loading";
import { UseNotification } from "../hook/UseNotification";
import { UseFetchStatus } from "../hook/UseFetchStatus";

const CountryCapitalImage = ({ capital, id }) => {
  const { notify } = UseNotification();
  const { runFetch, getStatus } = UseFetchStatus()

  const [imgUrl, setImgUrl] = useState(null);
  const imageCache = useRef({});

  const { isLoading, dataLoaded, fetchFailed, didFetch } = getStatus(capital);

  useEffect(() => {
    if (!capital) return;

    if (imageCache.current[capital]) {
      setImgUrl(imageCache.current[capital]);
      return;
    }
    
    setImgUrl(null);

    runFetch(
      capital,
      () => {
        if (!didFetch)
        notify({
          id: `${capital}`,
          notificationTag: `Fetching image for ${capital}...`,
          duration: 3000,
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
          setImgUrl(null)
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
  }, [capital, id, isLoading, didFetch, imgUrl]);

  return (
    <div className="country-image-container w-full">
      {dataLoaded && !isLoading && imgUrl !== null && didFetch && <img src={imgUrl} alt={`Image of ${capital}`} className="rounded" />}
      {!isLoading && imgUrl && <h2 className="text-sm my-2">{capital}</h2>}
      {isLoading && <Loading/>}
      {fetchFailed && <p className="text-sm text-gray-500">No image Available</p>}
    </div>
  );
};

export default CountryCapitalImage;
