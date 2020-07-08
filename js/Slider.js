export default class Slider {
    constructor(slides, slider) {
        this.slides = document.querySelector(slides);
        this.slider = document.querySelector(slider);

        this.distances = {
            finalPosition: 0,
            startX: 0,
            movement: 0,
            movePosition: 0,
        };
    }

    onStart(event) {
        event.preventDefault();
        this.distances.startX = event.clientX;
        this.slider.addEventListener("mousemove", this.onMove);
    }

    onMove(event) {
        const finalPosition = this.updatePosition(event.clientX);
        this.moveSlide(finalPosition);
    }

    onEnd() {
        this.slider.removeEventListener("mousemove", this.onMove);
        this.distances.finalPosition = this.distances.movePosition;
    }

    updatePosition(clientX) {
        this.distances.movement = (this.distances.startX - clientX) * 1.6;
        return this.distances.finalPosition - this.distances.movement;
    }

    moveSlide(distX) {
        this.distances.movePosition = distX;
        this.slides.style.transform = `translate3d(${distX}px, 0, 0)`;
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
