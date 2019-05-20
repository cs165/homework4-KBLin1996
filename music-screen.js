// This class will represent the music visualizer screen, i.e. the screen that
// you see after you select a song.
//
// This class should create and own:
//   - 1 AudioPlayer
//   - 1 GifDisplay
//   - 1 PlayButton
//
// See HW4 writeup for more hints and details.
class MusicScreen {
  constructor(containerElement) {
    // TODO(you): Implement the constructor and add fields as necessary.
    this.containerElement = containerElement;
    this.gifboxElement = containerElement.querySelector("#gifbox");
    this.playElement = containerElement.querySelector("#play");
    this.exitElement = containerElement.querySelector("#exit");
    this.audioPlayer = null;
    this.gifDisplay = null;
    this.playButton = new PlayButton(this.playElement);
    this.status = false;

    this._Status = this._Status.bind(this);

    document.addEventListener("Status", this._Status);
    
    this._onExit();
  }
  // TODO(you): Add methods as necessary.
  preload(imgURL, songURL) {
    this.gifDisplay = new GifDisplay(this.gifboxElement, imgURL);
    this.audioPlayer = new AudioPlayer();
    this.audioPlayer.setSong(songURL);
    this.audioPlayer.setKickCallback( () => {
      document.dispatchEvent(new CustomEvent("Kick"));
    });
    this.playButton.reset();
  }
  show() {
    this.containerElement.classList.remove('inactive');
  }

  hide() {
    this.containerElement.classList.add('inactive');
    this.status = false;
    this.audioPlayer.pause();
  }

  _onExit() {
    this.exitElement.addEventListener('click', () => {
      document.dispatchEvent(new CustomEvent("Exit"));
    });
  }

  _Status() {
    if(this.status) { //to pause
      this.status = false;
      this.audioPlayer.pause();
    }else { //to play
      this.status = true;
      this.audioPlayer.play();
    }
  }
}
