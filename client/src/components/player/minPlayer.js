import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import { useDataHandlerValue } from '../contextapi/DataHandler';

function MinPlayer({ maxPlayer, handlePlayPause, bg }) {
  const [{ user, deviceId, item, playing }, dispatch] = useDataHandlerValue();

  return (
    <div className="minimised-player" onClick={maxPlayer}>
      <div className="min-left">
        <img
          src={item ? item?.item?.album?.images?.[2].url : bg}
          alt="album-art-mini"
          className="mini-album-art"
        />
      </div>
      <div className="min-mid">
        {item ? (
          <span className="np-name"> {item.item.name}</span>
        ) : (
          'Music track'
        )}
        <div className="np-by-outer">
          {item
            ? item?.item?.artists.map((x, index) => (
                <span key={index} className="np-by">
                  {x.name}
                  {' , '}
                </span>
              ))
            : 'by..'}
        </div>
      </div>
      <div className="min-right">
        <div className="pp-mini-outer">
          <div className="pp-mini">
            <button className="mini-play-container" onClick={handlePlayPause}>
              {playing ? (
                <PauseIcon fontSize="large" />
              ) : (
                <PlayArrowIcon fontSize="large" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MinPlayer;