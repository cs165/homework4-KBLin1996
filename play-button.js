// This class will represent the play button in the MusicScreen. Clicking on
// it toggles audio playback.
//
// See HW4 writeup for more hints and details.
class PlayButton {
  constructor(player) {

      this.player = player ;
      this.button = document.querySelector('.btn');
      this.P = true ;
      this.Btnstate = this.Btnstate.bind(this);
      this.button.addEventListener('click',this.Btnstate);
    // TODO(you): Implement the constructor and add fields as necessary.
  }

    Btnstate()
    {
        console.log('click');

        if(this.P === false)
        {
            this.button.src = "images/pause.png" ;
            this.player.play();
            this.P = true ;
        }
        else
        {
            this.button.src = "images/play.png" ;
            this.player.pause();
            this.P = false ;
        }
    }
}
