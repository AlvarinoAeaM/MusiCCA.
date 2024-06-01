const previous = document.querySelector('#previous');
const play = document.querySelector('#play');
const next = document.querySelector('#next');

const title = document.querySelector('#title');
const image = document.querySelector('#image');

const track = document.createElement('audio');

let index = 0;
let playingSong = false;

let songs = [
    {
        name: 'Flowers',
        path: 'https://p.scdn.co/mp3-preview/9fbe346e805ed219204f53324f94557ab557b6d3?cid=9950ac751e34487dbbe027c4fd7f8e99',
        image: 'https://i.scdn.co/image/ab67616d0000b273f429549123dbe8552764ba1d',
    },
    {
        name: 'Pay Phone',
        path: './songs/payphone.mp3',
        image: './images/audio2.jpg',
    },
    {
        name: 'Intentions',
        path: './songs/intentions.mp3',
        image: './images/audio3.jpg',
    },
    {
        name: 'Without Me',
        path: 'https://p.scdn.co/mp3-preview/35fc7456c892c11867fe1513b92dc44e9664eaba?cid=9950ac751e34487dbbe027c4fd7f8e99',
        image: 'https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4',
    },
    {
        name: 'I Ain\'t Worried',
        path: 'https://p.scdn.co/mp3-preview/20d702edf937db0248603243a310404923d5bffb?cid=9950ac751e34487dbbe027c4fd7f8e99',
        image: 'https://i.scdn.co/image/ab67616d0000b273ec96e006b8bdfc582610ec13',
    },
    {
        name: 'Anti',
        path: 'https://p.scdn.co/mp3-preview/8587a38f3496e9b17e33d89c322c4b69ba899d69?cid=9950ac751e34487dbbe027c4fd7f8e99',
        image: 'https://i.scdn.co/image/ab67616d0000b273bb54dde68cd23e2a268ae0f5',
    },
    {
        name: 'Shape of You',
        path: 'https://p.scdn.co/mp3-preview/7339548839a263fd721d01eb3364a848cad16fa7?cid=9950ac751e34487dbbe027c4fd7f8e99',
        image: 'https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96',
    },
    {
        name: 'vampire',
        path: 'https://p.scdn.co/mp3-preview/f0e20e86946a0f01d0352ce0371faff987455d73?cid=9950ac751e34487dbbe027c4fd7f8e99',
        image: 'https://i.scdn.co/image/ab67616d0000b2731e5e75dc1d878a0007cb6525',
    },
    {
        name: 'lovely',
        path: 'https://p.scdn.co/mp3-preview/18b3cbbad11e488c24c76d0c697cec8618c15f96?cid=9950ac751e34487dbbe027c4fd7f8e99',
        image: 'https://i.scdn.co/image/ab67616d0000b2738a3f0a3ca7929dea23cd274c',
    },
    {
        name: 'Dance The Night',
        path: 'https://p.scdn.co/mp3-preview/acaea048f50a3b30ca24b348c84a6047373baabb?cid=9950ac751e34487dbbe027c4fd7f8e99',
        image: 'https://i.scdn.co/image/ab67616d0000b2737dd3ba455ee3390cb55b0192',
    },
    {
        name: 'Style',
        path: 'https://p.scdn.co/mp3-preview/5ed0bbbc40dda2bce0e008fe02949cd254f0ea69?cid=9950ac751e34487dbbe027c4fd7f8e99',
        image: 'https://i.scdn.co/image/ab67616d0000b27352b2a3824413eefe9e33817a',
    },
    {
        name: 'Viva La Vida',
        path: 'https://p.scdn.co/mp3-preview/fb9f4a9b0887326776b4fb7c6d331acd167a7778?cid=9950ac751e34487dbbe027c4fd7f8e99',
        image: 'https://i.scdn.co/image/ab67616d0000b273e21cc1db05580b6f2d2a3b6e',
    },
    {
        name: 'Starboy',
        path: 'https://p.scdn.co/mp3-preview/57c1238d183c40da3157c2892346f58445b1377c?cid=9950ac751e34487dbbe027c4fd7f8e99',
        image: 'https://i.scdn.co/image/ab67616d0000b2734718e2b124f79258be7bc452',
    },
    {
        name: 'Lover',
        path: 'https://p.scdn.co/mp3-preview/aad996e106de5278d8387dc838e8f08105dcd588?cid=9950ac751e34487dbbe027c4fd7f8e99',
        image: 'https://i.scdn.co/image/ab67616d0000b273e787cffec20aa2a396a61647',
    },
    {
        name: 'Believer',
        path: 'https://p.scdn.co/mp3-preview/7d2f1ec114c44ecfa8b9017ad1c01cb041c8e613?cid=9950ac751e34487dbbe027c4fd7f8e99',
        image: 'https://i.scdn.co/image/ab67616d0000b2735675e83f707f1d7271e5cf8a',
    },
    {
        name: 'Blank Space',
        path: 'https://p.scdn.co/mp3-preview/a4930adb3f973bf4b162940844b8ccc46277dc16?cid=9950ac751e34487dbbe027c4fd7f8e99',
        image: 'https://i.scdn.co/image/ab67616d0000b27352b2a3824413eefe9e33817a',
    },
    {
        name: 'Locked out of Heaven',
        path: 'https://p.scdn.co/mp3-preview/5a0318e6c43964786d22b9431af35490e96cff3d?cid=9950ac751e34487dbbe027c4fd7f8e99',
        image: 'https://i.scdn.co/image/ab67616d0000b273926f43e7cce571e62720fd46',
    },
    {
        name: 'Save Your Tears',
        path: 'https://p.scdn.co/mp3-preview/4bb5ee4441a2342502372f80f78a92cf3fe22549?cid=9950ac751e34487dbbe027c4fd7f8e99',
        image: 'https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36',
    },
    {
        name: 'Sunflower',
        path: 'https://p.scdn.co/mp3-preview/801a664529525b366fa6fb8f6cacd5dd83928272?cid=9950ac751e34487dbbe027c4fd7f8e99',
        image: 'https://i.scdn.co/image/ab67616d0000b273e2e352d89826aef6dbd5ff8f',
    },
    {
        name: 'Yellow',
        path: 'https://p.scdn.co/mp3-preview/c0d9119dc69cae75baf6463e21e43f433fdf5ff4?cid=9950ac751e34487dbbe027c4fd7f8e99',
        image: 'https://i.scdn.co/image/ab67616d0000b2733d92b2ad5af9fbc8637425f0',
    },
    {
        name: 'Miracle',
        path: 'https://p.scdn.co/mp3-preview/48a88093bc85e735791115290125fc354f8ed068?cid=9950ac751e34487dbbe027c4fd7f8e99',
        image: 'https://i.scdn.co/image/ab67616d0000b273c58e22815048f8dfb1aa8bd0',
    },
    {
        name: 'Blinding Lights',
        path: 'https://p.scdn.co/mp3-preview/51c08d92815cce4ac2de94a7335a430b81234624?cid=9950ac751e34487dbbe027c4fd7f8e99',
        image: 'https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36',
    },
    {
    name: 'Perfect',
    path: 'https://p.scdn.co/mp3-preview/4e30857a3c7da3f8891483643e310bb233afadd2?cid=9950ac751e34487dbbe027c4fd7f8e99',
    image: 'https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96',
    },
    {
        name: "I'm Good (Blue)",
        path: 'https://p.scdn.co/mp3-preview/c1de960c1a98f7ab652331e5223c50baba75c460?cid=9950ac751e34487dbbe027c4fd7f8e99',
        image: 'https://i.scdn.co/image/ab67616d0000b273933c036cd61cd40d3f17a9c4',
    },
    {
        name: 'Circles',
        path: 'https://p.scdn.co/mp3-preview/193a0924b0f73d211131bf2fb0bddb7202176202?cid=9950ac751e34487dbbe027c4fd7f8e99',
        image: 'https://i.scdn.co/image/ab67616d0000b2739478c87599550dd73bfa7e02',
    },
    {
        name: 'When I Was Your Man',
        path: 'https://p.scdn.co/mp3-preview/159fc05584217baa99581c4821f52d04670db6b2?cid=9950ac751e34487dbbe027c4fd7f8e99',
        image: 'https://i.scdn.co/image/ab67616d0000b273926f43e7cce571e62720fd46',
    },
    {
        name: "Baby Don't Hurt Me",
        path: 'https://p.scdn.co/mp3-preview/a8f2e176e17e0f6298b42ef8e96118318fdd2b89?cid=9950ac751e34487dbbe027c4fd7f8e99',
        image: 'https://i.scdn.co/image/ab67616d0000b2730b4ef75c3728599aa4104f7a',
    }
    ];

function loadTrack(index) {
    track.src = songs[index].path;
    title.innerHTML = songs[index].name;
    image.src = songs[index].image;
    track.load();
}

loadTrack(index);

function playSong() {
    track.play();
    playingSong = true;
    play.innerHTML = '<i class="fas fa-pause"></i>';
}

function pauseSong() {
    track.pause();
    playingSong = false;
    play.innerHTML = '<i class="fas fa-play"></i>';
}

function nextSong() {
    if (index < songs.length - 1) {
        index += 1;
        loadTrack(index);
        playSong();
    } else {
        index = 0;
        loadTrack(index);
        playSong();

    }
}

function previousSong() {
    if (index > 0) {
        index -= 1;
        loadTrack(index);
        playSong();

    } else {
        index = songs.length;
        loadTrack(index);
        playSong();
    }
}

function justPlay() {
    if (playingSong == false) {
        playSong();

    } else {
        pauseSong();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const songElements = document.querySelectorAll('.song');
    const title = document.querySelector('#title');
    const image = document.querySelector('#image');
    const play = document.querySelector('#play');

    let playingSong = false;

    songElements.forEach(function(songElement) {
        songElement.addEventListener('click', function() {
            const songIndex = this.getAttribute('data-index');
            const selectedSong = songs[songIndex];
            title.innerText = selectedSong.name;
            image.src = selectedSong.image;
            loadTrack(songIndex);
            playSong();
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const csvFilePath = './b/Base.csv';

    
    Papa.parse(csvFilePath, {
        download: true,
        header: true,
        complete: function(results) {
          
            const songs = results.data;
            loadSongs(songs);
        }
    });

        function loadSongs(songs) {
        const songsContainer = document.querySelector('.songs');
        songs.forEach(song => {
            const songElement = document.createElement('div');
            songElement.classList.add('song');
            
            songElement.innerHTML = `
                <img src="${song.image}" alt="" class="song-img">
                <div class="song-title">
                    <span>${song.title}</span>
                    <span>${song.artist}</span>
                </div>
                <span class="song-time">${song.duration}</span>
                <a href="#" class="btn-song-play"><i class="far fa-play-circle"></i></a>
            `;

            songsContainer.appendChild(songElement);
        });
    }
});

// script.js
document.addEventListener('DOMContentLoaded', () => {
    fetch('http://127.0.0.1/id22225728_musicca')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('data-container');
            data.forEach(item => {
                const div = document.createElement('div');
                div.classList.add('data-item');
                div.innerHTML = `
                    <h3>${item.nombre}</h3>
                    <p>${item.valor}</p>
                `;
                container.appendChild(div);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});

/////

// server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 1433;

app.use(cors());

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'id22225728_cca',
  password: 'A20142511a',
  database: 'id22225728_cca'
});

db.connect(err => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
    return;
  }
  console.log('Conexión a la base de datos exitosa.');
});

// Ruta para obtener datos
app.get('/data', (req, res) => {
  const query = 'SELECT * FROM tu_tabla';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err);
      res.status(500).send('Error en el servidor');
      return;
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

