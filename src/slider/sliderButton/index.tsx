import "./sliderButton.css";
import { useCallback } from "react";

export type buttonType = "left" | "right";

interface Props {
  label: string;
  status: buttonType;
  setLongPress: (value: buttonType | null) => void;
  disabled?: boolean;
}

export default function SliderButton(props: Props): JSX.Element {
  const start = useCallback(
    (status: buttonType) => {
      props.setLongPress(status);
    },
    [props]
  );
  const stop = useCallback(() => {
    props.setLongPress(null);
  }, [props]);
  return (
    <button
      onMouseDown={() => start(props.status)}
      onMouseUp={() => stop()}
      onMouseLeave={() => stop()}
      onTouchStart={() => start(props.status)}
      onTouchEnd={() => stop()}
      disabled={props.disabled}
    >
      {props.label}
    </button>
  );
}
