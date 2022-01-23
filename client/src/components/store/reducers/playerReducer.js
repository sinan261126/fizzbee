import {
  SET_TOKEN,
  SET_PLAYING,
  SET_SHUFFLE,
  SET_REPEAT,
  SET_DEVICE_ID,
  SET_POSITION,
  SET_CURRENT,
  SET_MUTED,
  SET_VC_LANG,
  SET_MIN_TYPE,
  SET_MAX_TYPE,
  SET_PLAYER_READY,
  SET_THEME,
  SET_LYRICS,
  SET_FONT,
  SET_CURRENT_TILE_ID,
} from '../actions/types';
export const initialState = {
  token: window.localStorage.getItem('token'),
  playing: false,
  position_ms: 0,
  isShuffle: false,
  repeatMode: 0,
  theme: 0,
  font: "'Shadows Into Light', cursive",
  lyrics: null,
  deviceId: null,
  playerReady: false,
  isMuted: false,
  vcLang: 'en-IN',
  current: null,
  currentTileId: null,
  minplayertype: 1,
  maxplayertype: 0,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    case SET_PLAYING: {
      return {
        ...state,
        playing: action.playing,
      };
    }
    case SET_SHUFFLE: {
      return {
        ...state,
        isShuffle: action.shuffle,
      };
    }
    case SET_REPEAT: {
      return {
        ...state,
        repeatMode: action.repeatMode,
      };
    }
    case SET_DEVICE_ID: {
      return {
        ...state,
        deviceId: action.deviceId,
      };
    }
    case SET_POSITION:
      return {
        ...state,
        position_ms: action.position,
      };
    case SET_CURRENT: {
      return {
        ...state,
        current: action.current,
      };
    }
    case SET_CURRENT_TILE_ID: {
      return {
        ...state,
        currentTileId: action.id,
      };
    }
    case SET_MUTED: {
      return {
        ...state,
        isMuted: action.isMuted,
      };
    }
    case SET_VC_LANG: {
      return {
        ...state,
        vcLang: action.lang,
      };
    }
    case SET_MIN_TYPE:
      return {
        ...state,
        minplayertype: action.minplayertype,
      };
    case SET_MAX_TYPE:
      return {
        ...state,
        maxplayertype: action.maxplayertype,
      };
    case SET_PLAYER_READY:
      return {
        ...state,
        playerReady: action.playerReady,
      };
    case SET_THEME:
      return {
        ...state,
        theme: action.theme,
      };
    case SET_LYRICS:
      return {
        ...state,
        lyrics: action.lyrics,
      };
    case SET_FONT:
      return {
        ...state,
        font: action.font,
      };

    default: {
      return state;
    }
  }
}
