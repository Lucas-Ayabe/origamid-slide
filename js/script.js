import Slider from "./SliderNav.js";

const slider = new Slider(".slider__slides", ".slider");
slider.init();
slider.addArrow(".slider__prev", ".slider__next");
