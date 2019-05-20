// This class will represent the menu screen that you see when you first load
// the music visualizer.
//
// See HW4 writeup for more hints and details.
class MenuScreen {
  constructor(element) {
      // TODO(you): Implement the constructor and add fields as necessary.

      this.element = element;
      this.nowurl = null ;
      this.SEL = document.querySelector('#song-selector');
      this.input = document.querySelector('#query-input');

      //op.textContent = 'test';
      console.log(this.SEL);
      //this.SEL.appendChild(op);

      this.Submit = this.Submit.bind(this);
      this.themeinput = this.themeinput.bind(this);

      const form = document.querySelector('form');
      form.addEventListener('submit', this.Submit);
      document.querySelector("#query-input").addEventListener('input',this.themeinput);

      fetch('https://fullstackccu.github.io/homeworks/hw4/songs.json')
          .then(Response => {
              return Response.json()
          })

          .then(data => {
              this.list = Object.entries(data)

              console.log(this.list[0][1].title);
              console.log(this.list);

              for (let i of this.list) {
                  console.log(i);
                  var op = document.createElement("option");
                  op.innerText = "" + i[0] + ' --- by' + i[1].artist + "";
                  op.setAttribute("data-url", i[1].songUrl);
                  op.setAttribute("data-title", i[1].title);
                  op.setAttribute("data-artist", i[1].artist);
                  this.SEL.appendChild(op);
              }

          });

      this.theme = ['candy','charlie brown','computers','dance','donuts','hello kitty','flowers','nature','turtles','space'] ;
      let random = Math.floor(Math.random() * Math.floor(this.theme.length));
      document.querySelector('#query-input').value = this.theme[random];


  }

  hide()
  {
    this.element.classList.add('inactive');
  }

  show()
  {
    this.element.classList.remove('inactive');
  }


    Submit(event) {
        event.preventDefault();

        let choice=document.querySelectorAll('option');

        var music;
        for(var i of choice)
            if(i.selected)
                music=i;

        console.log('submit : ' + music.dataset.url);
        console.log('input : ' + this.input.value);

        this.nowurl = music.dataset.url ;
        let keyword = new CustomEvent('keyword' , {detail:{Theme : this.input.value}});
        document.dispatchEvent(keyword);
    }

    themeinput()
    {
        document.querySelector('#error').classList.add('inactive');

    }

    // TODO(you): Add methods as necessary.
}
