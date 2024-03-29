import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import { getImage } from '../../utils/helperFunctions';
import { useSelector } from 'react-redux';
const MinPlayer1 = ({ handlePlayPause }) => {
  const { current, playing } = useSelector((state) => state.player);
  const albumSM = getImage(current?.album?.images, 'sm');

  return (
    <>
      <div className="minimised-player">
        <div className="min-left">
          <img
            src={albumSM ? albumSM : '/bg3.png'}
            alt="album-art-mini"
            className="mini-album-art"
          />
        </div>
        <div
          className={'min-mid ' + (current?.name.length > 30 && 'text-anim')}
        >
          <span className="np-name-min">
            {' '}
            {current ? current.name : 'Music track'}
          </span>
          <div className="np-by-outer">
            <span className="np-by-min">
              {current
                ? current?.artists?.map(
                    (item, index) => (index ? ', ' : '') + item.name
                  )
                : 'by..'}
            </span>
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
        <div className="barr">
          <div className="buttonn"></div>
        </div>
      </div>
    </>
  );
};
export default MinPlayer1;
