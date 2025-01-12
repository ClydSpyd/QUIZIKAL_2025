import styles from "./BoxIcon.module.scss";

interface Props {
  Icon: React.ElementType;
  border?: boolean;
  bgColor?: string
}
const BoxIcon = ({ Icon, border, bgColor = "transparent" }: Props) => {
  return (
    <div
      className={`${styles.boxIconContainer} ${border && styles.border}`}
      style={{ backgroundColor: bgColor }}
    >
      <Icon />
    </div>
  );
};

export default BoxIcon;
