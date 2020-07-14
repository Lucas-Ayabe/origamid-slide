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

    setTransition(active) {
        this.slides.style.transition = active
            ? "transform .3s ease-in-out"
            : "";
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
        this.setTransition(false);
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
        this.changeSlideOnEnd();
        this.setTransition(true);
    }

    changeSlideOnEnd() {
        if (this.distances.movement > 120 && this.index.next !== null) {
            this.activeNextSlide();
        } else if (this.distances.movement < -120 && this.index.prev !== null) {
            this.activePrevSlide();
        } else {
            this.changeSlide(this.index.active);
        }
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

    activePrevSlide() {
        if (this.index.prev !== null) {
            this.changeSlide(this.index.prev);
        }
    }

    activeNextSlide() {
        if (this.index.next !== null) {
            this.changeSlide(this.index.next);
        }
    }

    init(startIndex = 0) {
        this.bindEvents();
        this.addEvents();
        this.slidesConfig();
        this.changeSlide(startIndex);
        this.setTransition(true);
        return this;
    }
}
