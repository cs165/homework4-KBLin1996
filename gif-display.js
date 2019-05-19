// This class will represent the gif display area. It keeps track of which gif
// is being shown and can select a new random gif to be shown.
// 
// See HW4 writeup for more hints and details.
class GifDisplay {
  constructor(containerElement, imgURL) {
    // TODO(you): Implement the constructor and add fields as necessary.
    this.containerElement = containerElement;
    this.foreground = containerElement.querySelector(".ground.fore");
    this.background = containerElement.querySelector(".ground.back");
    this.imgURL = imgURL;
    this.status = false;
    this.index = -1;
    
    this._onKick = this._onKick.bind(this);

    document.addEventListener("Kick", this._onKick);

    this._preload(0);
  }
  // TODO(you): Add methods as necessary.
  _preload(index) {
    if(index < this.imgURL.length) {
      const image = new Image();
      image.addEventListener("load", () => {
        index++;
        this._preload(index);
        document.dispatchEvent(new CustomEvent("Loading", {
          detail: {
            Index: (index/this.imgURL.length*100).toFixed(0)
          }
        }));
      });
      image.src = this.imgURL[index];
    }else {
      document.dispatchEvent(new CustomEvent("Loaded"));
      this.randomGif(this.foreground);
      this.randomGif(this.background);
    }
  }

  randomGif(containerElement) {
    let index;
    do {
      index = Math.floor(Math.random() * this.imgURL.length);
    }while(this.index === index);
    containerElement.style.backgroundImage = 'url(' + this.imgURL[index] + ')';
    this.index = index;
  }
  _onKick() {
    if(this.status) {
      this.status = false;
      this.randomGif(this.background);
    }else {
      this.status = true;
      this.randomGif(this.foreground);
    }
    this.containerElement.classList.toggle('show');
  }
}
