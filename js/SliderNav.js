import Slider from "./Slider.js";

export default class SliderNav extends Slider {
    addArrow(prev, next) {
        this.prevElement = document.querySelector(prev);
        this.nextElement = document.querySelector(next);

        if (this.nextElement && this.prevElement) {
            this.addArrowEvent();
        }
    }

    addArrowEvent() {
        this.prevElement.addEventListener("click", this.activePrevSlide);
        this.nextElement.addEventListener("click", this.activeNextSlide);
    }
}
