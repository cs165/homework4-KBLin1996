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

    this.URL = "https://api.giphy.com/v1/gifs/search?q=";
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
  _Fetching(event)
  {
    this.loadingElement.classList.remove('inactive');
    const URL = this.URL + encodeURIComponent(event.detail.gifValue) + "&api_key=FjJaTP04iY5rAwcEASKET51wyx9VZ2V8&limit=25&rating=g";
    const onJsonReady = (json) => {
      let imgURL = [];
      if(json.data.length > 2) {
        for(let index in json.data) {
          const imgurl = json.data[index].images.downsized.url;           
          imgURL.push(imgurl);
        }
        this.menuScreen.hideErrMsg();
        this.menuScreen.hide();
        this.musicScreen.preload(imgURL, event.detail.songValue);
      }else {
        this.menuScreen.showErrMsg();
      }
    };

    fetch(URL)
      .then(response => response.json())
      .then(onJsonReady);
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
