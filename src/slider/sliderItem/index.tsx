import "./sliderItem.css";

interface Props {
  curPos: number;
  imageSrc: string;
}

export default function SliderItem(props: Props) {
  return (
    <img
      className="items"
      style={{ transform: `translateX(${props.curPos}px)` }}
      src={props.imageSrc}
      alt="Slider item"
      width="148px"
      height="150px"
    />
  );
}
