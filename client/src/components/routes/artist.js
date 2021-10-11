import { useEffect, useState } from 'react';
import { useDataHandlerValue } from '../contextapi/DataHandler';
import MoreVertIcon from '@material-ui/icons//MoreVert';
import ColorThief from '../../../node_modules/colorthief/dist/color-thief.mjs';
import './styling/styling.css';
import Album from '../templates/album';
import Artists from '../templates/artists';
import ScheduleTwoToneIcon from '@material-ui/icons/ScheduleTwoTone';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import SpotifyWebApi from 'spotify-web-api-node';
import PlayFromList from '../utils/playfromlist';
const spotify = new SpotifyWebApi({
  clientId: 'cbb93bd5565e430a855458433142789f',
});
function Artist(props) {
  const id = props?.match?.params?.id;
  //console.log(props?.match?.params?.id);
  const [{ playlist, token }, dispatch] = useDataHandlerValue();
  spotify.setAccessToken(token);
  const [artist, setArtist] = useState();
  const [albums, setAlbums] = useState();
  const [toptracks, setToptracks] = useState();
  const [related, setRelated] = useState();
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    // Get an artist
    spotify.getArtist(id).then(
      function (data) {
        console.log('Artist information', data.body);
        setArtist({ ...artist, info: data.body });
      },
      function (err) {
        console.error(err);
      }
    );
    // Get albums by a certain artist
    spotify.getArtistAlbums(id, { limit: 50 }).then(
      function (data) {
        //console.log('Artist albums', data.body.items);
        setAlbums(data.body.items);
      },
      function (err) {
        console.error(err);
      }
    );
    // Get an artist's top tracks
    spotify.getArtistTopTracks(id, 'IN').then(
      function (data) {
        //console.log(data.body);
        setToptracks(data.body.tracks);
      },
      function (err) {
        console.log('Something went wrong!', err);
      }
    );

    // Get artists related to an artist
    spotify.getArtistRelatedArtists(id).then(
      function (data) {
        //console.log(data.body);
        setRelated(data.body.artists);
      },
      function (err) {
        console.log(id);
      }
    );

    /* Check if a user is following an artist */
    let artistsId = [id];
    spotify.isFollowingArtists(artistsId).then(
      function (data) {
        let isFollowing = data.body;
        setFollowing(isFollowing?.[0]);
      },
      function (err) {
        console.log('Something went wrong!', err);
      }
    );
  }, [id]);

  const getColor = (id, index) => {
    //console.log('here', id);
    const colorThief = new ColorThief();
    const img = document.getElementById(id);
    var color;
    if (img.complete) {
      color = colorThief.getColor(img);
    } else {
      img.addEventListener('load', function () {
        color = colorThief.getColor(img);
      });
    }
    document.getElementById(
      'choose1'
    ).style.background = `linear-gradient(360deg, rgb(${color[0]},${color[1]},${color[2]}), transparent)`;
  };
  const follow = () => {
    if (following) {
      /* Unfollow an artist */
      spotify.unfollowArtists([id]).then(
        function (data) {
          setFollowing(false);
        },
        function (err) {
          console.log('Something went wrong!', err);
        }
      );
    } else {
      /* Follow an artist */
      spotify.followArtists([id]).then(
        function (data) {
          setFollowing(true);
        },
        function (err) {
          console.log('Something went wrong!', err);
        }
      );
    }
  };
  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return seconds === 60
      ? minutes + 1 + ':00'
      : minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }

  const addToQueue = (uri) => {
    console.log('hj');

    /*let list = playlist;
    dispatch({
      type: 'SET_PLAYLIST',
      playlist: list.push(uri),
    });*/
  };

  function MoreBtn({ item }) {
    const [show, setShow] = useState(false);

    return (
      <div className="more-btn-div">
        <button className="more-btn" onClick={() => setShow(!show)}>
          <MoreVertIcon style={{ color: 'grey' }} />
        </button>

        <div className={'more-options ' + (show && 'd-block')}>
          <ul className="more-options-list">
            <li>
              <button
                className="more-options-btn"
                onClick={() => addToQueue(item.uri)}
              >
                <PlaylistAddIcon style={{ color: 'gray' }} />
                <span className="ms-2">Add to queue</span>
              </button>
            </li>
            <li>
              <button className="more-options-btn">
                <QueueMusicIcon style={{ color: 'gray' }} />
                <span className="ms-2">Add to Playlist</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingBottom: '8rem' }}>
      <div
        className="a-info"
        style={{
          background: `url(${artist?.info?.images[0]?.url}) no-repeat center center / cover`,
          borderRadius: '20px',
        }}
      >
        <div className="artist-l">
          <div className="a-data w-100 px-3" id="choose1">
            <span className="artist-name">{artist?.info?.name}</span>
            <div className="d-md-flex d-block justify-content-between">
              <div className="font-1">
                <span className="h3 text-light me-2">
                  {artist?.info?.followers?.total}
                </span>
                <span className="text-light">followers</span>
              </div>
              <button
                className="outline-none bg-transparent text-light border rounded px-3 py-2 mt-2"
                onClick={follow}
              >
                {following ? 'UNFOLLOW' : 'FOLLOW'}
              </button>
            </div>
          </div>
        </div>
        <div className="artist-r">
          <img
            src={artist?.info?.images[1]?.url}
            id={artist?.info?.id}
            crossOrigin="anonymous"
            alt={artist?.info?.name}
            onLoad={() => getColor(id)}
            style={{ borderRadius: '15px', width: '100%' }}
          />
        </div>
      </div>
      <div>
        <h2 className="section-heading p-3">Popular</h2>
        <div className="d-flex">
          <div className="p-tracks-pic text-left text-secondary"></div>
          <div className="p-tracks-info d-inline-block p-1 ms-2 text-left text-secondary">
            <span className="p-heading">TITLE</span>
          </div>
          <div className="p-tracks-album d-lg-inline-block d-none p-1 text-left text-secondary">
            <span className="p-heading">ALBUM</span>
          </div>
          <div className="p-tracks-btn text-center text-secondary">
            <ScheduleTwoToneIcon style={{ color: 'rgb(0, 255, 127)' }} />
          </div>
        </div>

        {toptracks?.map((item, index) => (
          <div key={index} className="p-t-container">
            <div className="p-tracks-pic">
              <img
                src={item?.album?.images[2].url}
                style={{ borderRadius: '10px' }}
              />
            </div>
            <div className="p-tracks-info font-1 ms-2">
              <span className="text-light h5 mb-0">{item?.name}</span>
              <span className="text-secondary">
                {item?.artists.map(
                  (item, index) => (index ? ', ' : '') + item.name
                )}
              </span>
            </div>
            <div className="p-tracks-album font-1">
              <span className="text-secondary h6">{item?.album?.name}</span>
            </div>
            <div className="p-tracks-btn">
              <MoreBtn item={item} />
              <span className="text-secondary d-lg-block d-none">
                {millisToMinutesAndSeconds(item?.duration_ms)}
              </span>
              <PlayFromList index={index} list={toptracks} type="small" />
            </div>
          </div>
        ))}
      </div>
      <div>
        <Album list={albums} />
      </div>
      <div className="mt-3">
        <Artists show={related} listName={'Fans also love'} />
      </div>
    </div>
  );
}
export default Artist;
