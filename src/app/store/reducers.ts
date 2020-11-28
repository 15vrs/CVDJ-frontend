import { state } from '@angular/animations';
import {
  ActionReducerMap,
  createReducer,
  MetaReducer,
  on,
} from '@ngrx/store';
import { Action } from 'rxjs/internal/scheduler/Action';
import { environment } from '../../environments/environment';
import * as Actions from '../store/actions'
import { CameraState, MusicState, FaceApiState, AppState } from './state';


export const initialCameraState: CameraState = {
  connectCamera: false,
  // connecting: false,
  image: undefined
}

export const initialMusicState: MusicState = {
  playing: false,
  previouslyPlayed: undefined,
  currentlyPlaying: undefined,
  upNext: undefined
}

export const initialFaceApiState: FaceApiState = {
  anger: undefined,
  contempt: undefined,
  disgust: undefined,
  fear: undefined,
  happiness: undefined,
  neutral: undefined,
  sadness: undefined,
  surprise: undefined
}

export const initialState: AppState = {
  CameraState: initialCameraState,
  MusicState: initialMusicState,
  FaceApiState: initialFaceApiState
}
/**
 * Reducers update application state in the Store
 * by taking current state + action to return new state
 */
const cameraReducer = createReducer(
  initialState.CameraState,
  on(Actions.cameraConnect, state => ({ ...state, connectCamera: true})),
  on(Actions.cameraDisconnect, state => ({ ...state, connectCamera: false}))
);

const musicReducer = createReducer(
  initialState.MusicState,
  on(Actions.musicPlay, state => ({ ...state, playing: true})), //update currentlyPlaying here
  on(Actions.musicPause, state => ({ ...state, playing: false})),
  on(Actions.musicSkipForward, state => ({ ...state, playing: true, previouslyPlayed: state.currentlyPlaying})),
);

const faceApiReducer = createReducer(
  initialState.FaceApiState,
  on(Actions.updateFaceApi, (state, {payload}) => ({ 
    ...state, 
    FaceApiState: payload
  }))
);
export function CameraReducer(state: CameraState, action: Action) {
  return cameraReducer(state, action);
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
