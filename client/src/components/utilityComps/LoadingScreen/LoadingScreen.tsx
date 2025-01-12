import styles from "./LoadingScreen.module.scss";
import loader from "../../../assets/loaders/spin_orange.svg";

const LoadingScreen = () => {
  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.loaderContainer}`}>
        <img className={`${styles.loader}`} src={loader} />
      </div>
    </div>
  );
};

export default LoadingScreen;