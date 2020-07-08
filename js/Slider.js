export default class Slider {
    constructor(slides, slider) {
        this.slides = document.querySelector(slides);
        this.slider = document.querySelector(slider);
    }

    onStart(event) {
        event.preventDefault();
        this.slider.addEventListener("mousemove", this.onMove);

        console.log(this);
        console.log("active");
    }

    onMove(event) {
        console.log("moveu");
    }

    onEnd(event) {
        this.slider.removeEventListener("mousemove", this.onMove);
        console.log("acabou");
    }

    bindEvents() {
        this.onStart = this.onStart.bind(this);
        this.onMove = this.onMove.bind(this);
        this.onEnd = this.onEnd.bind(this);
    }

    addEvents() {
        this.slider.addEventListener("mousedown", this.onStart);
        this.slider.addEventListener("mouseup", this.onEnd);
    }

    init() {
        this.bindEvents();
        this.addEvents();

        return this;
    }
}
