import Slider from "./Slider.js";

export default class SliderNav extends Slider {
    constructor(slides, slider) {
        super(slides, slider);

        this.bindeControlEvents();
    }

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

    createControl(
        wrapperClass = "slider__pagination",
        itemClass = "slider__pagination-item",
        bulletClass = "slider__bullet"
    ) {
        const control = document.createElement("ul");
        control.dataset.control = "slide";
        control.classList.add(wrapperClass);

        this.slideArray.forEach((_, index) => {
            control.innerHTML += `<li class="${itemClass}">
                <a class="${bulletClass}" href="#slide${index + 1}">${
                index + 1
            }</a>
            </li>`;
        });

        this.slider.appendChild(control);

        return control;
    }

    activeControlItem() {
        this.controlArray.forEach((bullet) => {
            bullet.classList.remove(this.activeClass);
        });

        this.controlArray[this.index.active].classList.add(this.activeClass);
    }

    eventControl(item, index) {
        item.addEventListener("click", (event) => {
            event.preventDefault();
            this.changeSlide(index);
            this.activeControlItem();
        });

        this.slider.addEventListener("changeEvent", this.activeControlItem);
    }

    addControl(customControl) {
        this.control =
            document.querySelector(customControl) || this.createControl();
        this.controlArray = [...this.control.children];

        this.activeControlItem();
        this.controlArray.forEach(this.eventControl);
    }

    bindeControlEvents() {
        this.eventControl = this.eventControl.bind(this);
        this.activeControlItem = this.activeControlItem.bind(this);
    }
}
