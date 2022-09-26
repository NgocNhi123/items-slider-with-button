import "./slider.css";
import React, { useState, useEffect, useCallback, useRef } from "react";
import SliderItem from "./sliderItem";
import SliderButton, { buttonType } from "./sliderButton";

const delayTime = 20;
const slideLength = 10;

export default function Slider() {
  const [listOfItems, setListOfItems] = useState<JSX.Element[]>();
  const [curPos, setCurPos] = useState(0);
  const [longPress, setLongPress] = useState<buttonType | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [sliderWidth, setSliderWidth] = useState(0);
  const [currentScreenWidth, setCurrentScreenWidth] = useState(
    window.innerWidth
  );

  const renderItems = useCallback((): JSX.Element[] => {
    const arr = [];
    for (let i = 0; i < 8; i++) {
      arr.push(
        <div key={i}>
          <SliderItem imageSrc={`/images/image-${i}.jpg`} curPos={curPos} />
        </div>
      );
    }
    return arr;
  }, [curPos]);

  const onButtonPress = useCallback(
    (timerId: any) => {
      if (longPress === "left" && curPos < 0) {
        timerId = setTimeout(() => {
          setCurPos(curPos + slideLength);
        }, delayTime);
      } else if (longPress === "right" && curPos > sliderWidth) {
        timerId = setTimeout(() => {
          setCurPos(curPos - slideLength);
        }, delayTime);
      } else {
        clearTimeout(timerId);
      }
    },
    [curPos, longPress, sliderWidth]
  );

  useEffect(() => {
    function handleResize() {
      const difference = window.innerWidth - currentScreenWidth;
      if (
        (difference > 0 && curPos < 0) ||
        (difference < 0 && curPos > sliderWidth)
      ) {
        setCurPos(curPos + difference);
      } else {
        setCurPos(curPos - difference);
      }
      setCurrentScreenWidth(window.innerWidth);
      setLongPress(null);
      setListOfItems(renderItems());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [renderItems, curPos, sliderWidth, currentScreenWidth]);

  useEffect(() => {
    setListOfItems(renderItems());
  }, [renderItems, curPos]);

  useEffect(() => {
    if (!sliderRef.current?.scrollWidth || !sliderRef.current?.clientWidth)
      return;
    const width = sliderRef.current.clientWidth - sliderRef.current.scrollWidth;
    setSliderWidth(width);
  }, [listOfItems]);

  useEffect(() => {
    let timerId: any;
    onButtonPress(timerId);
    return () => {
      clearTimeout(timerId);
    };
  }, [curPos, longPress, onButtonPress, sliderWidth]);

  return (
    <div className="container">
      <SliderButton
        label="<"
        status="left"
        setLongPress={setLongPress}
        disabled={curPos >= 0}
      />
      <div className="slider" ref={sliderRef}>
        {listOfItems}
      </div>
      <SliderButton
        label=">"
        status="right"
        setLongPress={setLongPress}
        disabled={curPos <= sliderWidth}
      />
    </div>
  );
}
