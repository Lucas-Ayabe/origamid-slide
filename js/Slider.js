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

        const moveType = `${event.type.substr(0, 5)}move`;
        const pointerPosition =
            event.type === "mousedown"
                ? event.clientX
                : event.changedTouches[0].clientX;

        this.distances.startX = pointerPosition;
        this.slider.addEventListener(moveType, this.onMove);
    }

    onMove(event) {
        const pointerPosition =
            event.type === "mousemove"
                ? event.clientX
                : event.changedTouches[0].clientX;

        this.moveSlide(this.updatePosition(pointerPosition));
    }

    onEnd(event) {
        const moveType = `${event.type.substr(0, 5)}move`;
        this.slider.removeEventListener(moveType, this.onMove);
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
        this.slider.addEventListener("touchstart", this.onStart);
        this.slider.addEventListener("mouseup", this.onEnd);
        this.slider.addEventListener("touchend", this.onEnd);
    }

    slidePosition(slide) {
        const margin = (this.slider.offsetWidth - slide.offsetWidth) / 2;
        return -(slide.offsetLeft - margin);
    }

    slidesConfig() {
        this.slideArray = [...this.slides.children].map((element) => ({
            element,
            position: this.slidePosition(element),
        }));
    }

    slidesIndexNav(index) {
        const lastIndex = this.slideArray.length - 1;
        this.index = {
            prev: index === 0 ? null : index - 1,
            active: index,
            next: index === lastIndex ? null : index + 1,
        };
    }

    changeSlide(index) {
        const activeSlide = this.slideArray[index];
        this.moveSlide(activeSlide.position);
        this.slidesIndexNav(index);
        this.distances.finalPosition = activeSlide.position;
    }

    init() {
        this.bindEvents();
        this.addEvents();
        this.slidesConfig();
        return this;
    }
}
