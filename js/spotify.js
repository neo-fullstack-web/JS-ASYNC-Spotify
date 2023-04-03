const clientSecret = "7436f80bb31547fea5e55a559e463d12";
const clientId = "a0a8ccf350274261b71c7e757c584c18";

const spotifyAPI = 'https://api.spotify.com/v1';
const spotifyAuth = 'https://accounts.spotify.com/api/token';

async function getToken() {
    try {
        const response = await axios.post('https://accounts.spotify.com/api/token', null, {
            params: {
              grant_type: 'client_credentials',
              client_id: clientId,
              client_secret: clientSecret,
            },
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          });
          console.log(response)
          return response.data.access_token;
    } catch (error) {
        console.log(error)
    }
}

const getTopTracks = async () => {
    try {

        const accessToken = await getToken(); 
        if(!accessToken) return;

        const topTracks = await axios.get(`${spotifyAPI}/browse/new-releases`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
    
        renderCards(topTracks.data.albums.items);
    } catch (error) {
        console.log(error)
    }
}

function renderCards(tracks) {
    console.log(tracks)
    tracks.forEach(track => {
        const card = document.createElement('div');
        card.classList.add('col-12', 'col-md-6', 'col-lg-4');
        
        card.innerHTML = `  <div class="card">
                                <img src="${track.images[0].url}" class="card-img-top" alt="${track.name}">
                                <div class="card-body">
                                    <h5 class="card-title">${track.name}</h5>
                                    <p class="card-text">
                                        ${track.artists.map(artist => artist.name).join(', ')}
                                    </p>
                                    <a href="${track.external_urls.spotify}" class="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>`;

        document.getElementById('card-container').appendChild(card);
    });
    
}

getTopTracks();

