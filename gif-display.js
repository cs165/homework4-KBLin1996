// This class will represent the gif display area. It keeps track of which gif
// is being shown and can select a new random gif to be shown.
// 
// See HW4 writeup for more hints and details.
class GifDisplay {
  constructor() {
    // TODO(you): Implement the constructor and add fields as necessary.
      this.front = document.querySelector('.front');
      this.back = document.querySelector('.back');
      this.Gifofjson ;
      this.dataLength ;
      this.Gimage = [] ;
      this.pre ;
      this.enough = false ;
      this.GetGif = this.GetGif.bind(this);
      this.SetGifarray = this.SetGifarray.bind(this);
      this.ChangeGif = this.ChangeGif.bind(this);

      document.querySelector('.screen').addEventListener('click',this.ChangeGif);
      console.log('GIF');
  }
  // TODO(you): Add methods as necessary.

  GetGif(theme , Gifenough) {
      let GifAPT = "https://api.giphy.com/v1/gifs/search" + "?q=" + theme + "&api_key=RtwDHQyEoyDZ5iVv1hUwDnLKIsaDzXDE&limit=25&rating=g";

      console.log('API = ' + GifAPT) ;

      fetch(GifAPT)
          .then(Response => {
              return Response.json();
          })

          .then(image => {

              this.dataLength = image.data.length;
              if (this.dataLength >= 2) {
                  this.Gifofjson = image;
              }

              console.log(this.Gifofjson);
              console.log(this.dataLength);
              //Function ;
              this.SetGifarray();
          })
    
          .catch(err => {
              console.log(err);
              this.SetGifarray(Gifenough);
          })
  }

  SetGifarray(Gifenough)
  {
    if(this.dataLength >= 2)
    {
      for(let i=0; i < this.dataLength; i++)
      {
        this.Gimage[i] = new Image() ;
        this.Gimage[i].src = this.Gifofjson.data[i].images.downsized.url ;
      }
      this.front.style.backgroundImage = "url('"+this.Gimage[0].src+"')";
      this.back.style.backgroundImage = "url('"+this.Gimage[1].src+"')";
      this.pre = 1 ;
      this.enough = true ;
    }
    else
    {
        console.log("not enough GIF");
        this.enough = false ;
    }
    Gifenough();
  }

  ChangeGif()
  {
      let random = Math.floor(Math.random() * this.Gimage.length);

      this.front.classList.add('back');
      this.front.classList.remove('front');
      this.back.classList.add('front');
      this.back.classList.remove('back');

      this.front = document.querySelector('.front');
      this.back = document.querySelector('.back');

      while(true)
      {
          random = Math.floor(Math.random() * this.Gimage.length);

          if(random !== this.pre)
          {
              break ;
          }
      }
      this.pre = random ;
      this.back.style.backgroundImage = "url('"+this.Gimage[random].src+"')";
  }
}
