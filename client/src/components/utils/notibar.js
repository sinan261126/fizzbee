import './styling.css';
import { useDataHandlerValue } from '../contextapi/DataHandler';
import HighlightOff from '@material-ui/icons/HighlightOff';
import { useEffect } from 'react';

function Notibar() {
  const [{ playerReady, notibar }, dispatch] = useDataHandlerValue();

  const timeout = document.getElementsByClassName('n-outer n-success');
  useEffect(() => {
    if (playerReady) {
      setTimeout(() => {
        closeNotibar();
      }, 7000);
    }
  }, [playerReady]);

  function closeNotibar() {
    timeout[0].style.display = 'none';
    dispatch({ type: 'SET_NOTIBAR', errorMsg: null, errorType: false });
  }
  return (
    <div className={'n-outer ' + (notibar.errorType ? 'n-success' : 'n-error')}>
      {notibar.errorType ? (
        <div className="n-text-holder">
          <span>{notibar.errorMsg}</span>
          <button className="c-success t-btn" onClick={closeNotibar}>
            <HighlightOff />
          </button>
        </div>
      ) : (
        <div className="n-text-holder">
          <span>{notibar.errorMsg}</span>
          <button className="c-success t-btn" onClick={closeNotibar}>
            <HighlightOff />
          </button>
        </div>
      )}
    </div>
  );
}
export default Notibar;
