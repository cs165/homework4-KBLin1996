// This class will represent the music visualizer as a whole, similar to the
// role that the `App` class played in HW3.
//
// See HW4 writeup for more hints and details.
class App {
  constructor() {
    // TODO(you): Implement the constructor and add fields as necessary.
    const menuElement = document.querySelector("#menu");
    this.menuScreen = new MenuScreen(menuElement);

    this.loadingElement = document.querySelector("#loading");
    
    const musicElement = document.querySelector("#music");
    this.musicScreen = new MusicScreen(musicElement);

    //this.URL = "https://api.giphy.com/v1/gifs/search";
    this.LOADING = "Loading... ";

    this._Fetching = this._Fetching.bind(this);
    this._Loading = this._Loading.bind(this);
    this._Loaded = this._Loaded.bind(this);
    this._Exit = this._Exit.bind(this);

    document.addEventListener("Fetching", this._Fetching);
    document.addEventListener("Loading", this._Loading);
    document.addEventListener("Loaded", this._Loaded);
    document.addEventListener("Exit", this._Exit);
  }
   
  // TODO(you): Add methods as necessary.

  _Fetching(event) {
    const url = new URL('https://api.giphy.com/v1/gifs/search');
    
    url.search = new URLSearchParams({
      q: encodeURIComponent(event.detail.gifValue),
      limit: 25,
      rating: 'g',
      api_key: '6G9cMqqdAtg8AzzBNJQ4XcEb15XaM5jf',
    });
    fetch(url)
      .then(Response => Response.json())
      .then(json => {
        if (json.data.length < 2) return this.onError();
        const urls = json.data.map(value => value.images.downsized.url);
        this._preloadImg(urls);
      })
  }
  
  _preloadImg(urls) {
    this.allGifs = urls.map(value => {
      const img = new Image;
      img.src = value;
      img.addEventListener('load', this._afterLoaded.bind(this));
      return img
    })
  }

  _afterLoaded({ currentTarget }) {
    this.loadedGifs.push(currentTarget.src);
    if (this.loadedGifs.length >= 2 && this.started === false) {
      console.log('2 images preloaded. Music start!');
      this.started = true;
      this.changeImage();
      this.changeImage();
      this.onSuccess();
    }
  }
  
  _Loaded() {
    this.loadingElement.classList.add('inactive');
    this.musicScreen.show();
  }

  _Loading(event) {
    this.loadingElement.textContent = this.LOADING + event.detail.Index + '%';
  }

  _Exit() {
    this.loadingElement.textContent = this.LOADING;
    this.musicScreen.hide();
    this.menuScreen.show();
  }
}
