import { useEffect } from "react";
import { UseUi } from "../../../hook/UseUi";
import Button from "./Button";

const PopUpImage = ({ ratio = 'dark:bg-slate-950/96 bg-slate-200/90', image, imageTag }) => {

  const { setShowPopUp } = UseUi();

  // Cerrar con Esc
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setShowPopUp(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setShowPopUp]);

  // Bloquear scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const closePopUp = () => setShowPopUp(false);

  return (
    <main
      className={`${ratio} pt-14 w-screen gap-2 h-screen flex flex-col items-center justify-center fixed inset-0`}
      onClick={closePopUp} // click fuera cierra
    >
      <div
        className="inline-block w-[30vw]"
        onClick={(e) => e.stopPropagation()} // click dentro no cierra
      >
        <img
          src={image}
          alt="PopUp"
          className="object-contain mx-auto"
        />
      </div>
      <aside className="flex gap-3 items-center">
        <Button
          buttonText={<i className="bi bi-x" />}
          ratio={'px-1'}
          action={closePopUp}
        />
        <h4 className="text-sm mt-2 text-center">{imageTag}</h4>
      </aside>
    </main>
  );
};

export default PopUpImage;
