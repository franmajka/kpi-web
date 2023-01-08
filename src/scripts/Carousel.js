class Carousel {
  constructor(root) {
    /**
     * @type {HTMLElement}
     * @private
     */
    this.root = root;

    /**
     * @type {number}
     * @private
     */
    this.imagesCount = +root.dataset.imagesCount;

    /**
     * @type {string[]}
     * @private
     */
    this.images = JSON.parse(root.dataset.images);

    /**
     * @type {number}
     * @private
     */
    this.offset = 0;

    this.init();
    this.render();
  }

  init() {
    this.root.addEventListener('click', e => {
      if (e.target.classList.contains('recipe-preview__image')) {
        return this.setActiveImage(+e.target.dataset.idx);
      } else if (e.target.classList.contains('carousel__arrow')) {
        return this.moveImages(e.target.classList.contains('carousel__arrow_right') ? 1 : -1);
      }
    })
  }

  moveImages(shift) {
    this.offset += shift % (this.images.length - 1);

    if (this.offset < 0) {
      this.offset = this.images.length - 1 + this.offset;
    } else if (this.offset >= this.images.length - 1) {
      this.offset = this.offset % (this.images.length - 1);
    }

    this.render();
  }

  setActiveImage(idx) {
    const currActive = this.images[0];
    this.images[0] = this.images[idx];
    this.images[idx] = currActive;

    this.render();
  }

  render() {
    this.root.innerHTML = '';
    const visibleSmallImages = [];

    let idx = this.offset + 1;
    do {
      visibleSmallImages.push([this.images[idx], idx]);

      idx = (idx + 1) % this.images.length || 1;
    }  while (
      visibleSmallImages.length !== this.imagesCount ||
      idx === this.offset + 1
    );

    this.root.insertAdjacentHTML('afterbegin', `
      <img
        src="${this.images[0]}"
        alt="pizza-big"
        class="recipe-preview__image_big"
      >

      <div class="recipe-preview__images">
        <span class="carousel__arrow carousel__arrow_left">&#9668;</span>
        ${
          visibleSmallImages.map(([src, idx]) => `
            <img
              src="${src}"
              alt="${src.split('/').pop().split('.').shift()}"
              class="recipe-preview__image"
              style="width: calc((100% - (var(--gap) * ${this.imagesCount - 1})) / ${this.imagesCount});"
              data-idx="${idx}"
            >
          `).join('')
        }
        <span class="carousel__arrow carousel__arrow_right">&#9658;</span>
      </div>
    `)
  }
}

window.addEventListener('load', () => {
  document.querySelectorAll('.carousel').forEach(el => new Carousel(el))
})
