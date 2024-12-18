export const Spinner = ({
  color = "primary",
  size = "sm",
  position,
}: {
  color?: string;
  size?: "xs" | "sm" | "md" | "lg";
  position?: "absolute" | "fixed";
}) => {
  return <span className={`loading loading-spinner loading-${size} ${position}`}></span>;
};