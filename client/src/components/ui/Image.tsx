import { useState } from "react";

interface Props {
  src: string;
  className: string;
  Placeholder: React.ElementType;
}

const Image = ({ src, className, Placeholder }: Props) => {
  const [isLoaded, toggleIsLoaded] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const handleLoaded = () => toggleIsLoaded(true);
  const handleError = () => setError(true);

  return (
    <div
      className={className}
      style={{ overflow: "hidden", position: "relative" }}
    >
      {!isLoaded && (
        <div
          style={{
            zIndex: "100",
            position: "absolute",
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Placeholder />
        </div>
      )}
      <img
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: isLoaded ? "1" : "0",
        }}
        src={src}
        onLoad={handleLoaded}
        onError={handleError}
      />
    </div>
  );
};

export default Image;
