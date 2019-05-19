// This class will represent the menu screen that you see when you first load
// the music visualizer.
//
// See HW4 writeup for more hints and details.
class MenuScreen {
  constructor(containerElement) {
    // TODO(you): Implement the constructor and add fields as necessary.
    this.containerElement = containerElement;
    this.formElement = containerElement.querySelector('form');
    this.errorElement = containerElement.querySelector("#error");
    this.selectContainer = containerElement.querySelector('#song-selector');
    this.inputContainer = containerElement.querySelector('#query-input');
    this.THEME = ['candy', 'charlie brown', 'computers', 'dance', 'donuts', 'hello kitty', 'flowers', 'nature', 'turtles', 'space'];

    const songs = new Song(this.selectContainer);
    this.randomTheme();
    this._onSubmit();
    this._onKeydown();
  }
  // TODO(you): Add methods as necessary.
  randomTheme() {
    const index = Math.floor(Math.random() * this.THEME.length);
    this.inputContainer.value = this.THEME[index];
  }

  show() {
    this.containerElement.classList.remove('inactive');
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }

  showErrMsg(){
    this.errorElement.classList.remove('inactive');
  }

  hideErrMsg() {
    this.errorElement.classList.add('inactive');
  }

  _onSubmit() {
    this.formElement.addEventListener('submit', event => {
      event.preventDefault();
      document.dispatchEvent(new CustomEvent("Fetching", {
        detail: {
          songValue: this.selectContainer.options[this.selectContainer.selectedIndex].value,
          gifValue: this.inputContainer.value
        }
      }));
    });
  }

  _onKeydown() {
    this.inputContainer.addEventListener('keydown', () => {
      this.hideErrMsg();
    });
  }
}

class Song {
  constructor(containerElement) {
    this.songInfo = {};

    this._loadSongs(containerElement);
this._createSongs(containerElement);
  }

  _loadSongs(containerElement) {
    const JSON_PATH = 'https://fullstackccu.github.io/homeworks/hw4/songs.json';
 
    const onJsonReady = (json) => {
      this.songInfo = json;
      this._createSongs(containerElement);
    };

    fetch(JSON_PATH)
      .then(response => response.json())
      .then(onJsonReady);
  }

  _createSongs(containerElement) {
    const SONGS = Object.values(this.songInfo);
    for(let i=0; i<SONGS.length; i++) {
      const title = SONGS[i].artist + ': ' + SONGS[i].title;
      containerElement.options.add(new Option(title, SONGS[i].songUrl));
    }
  }
}
