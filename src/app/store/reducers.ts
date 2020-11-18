import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as Actions from '../store/actions'


export interface State {
  CameraState: CameraState,
  MusicState: MusicState
}

export interface CameraState {
  connectCamera: boolean,
  // connecting: boolean,
  image?: string,
}

export interface MusicState {
  playing: boolean,
  previouslyPlayed?: string,
  currentlyPlaying?: string,
  upNext?: string
}

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


export const initialState: State = {
  CameraState: initialCameraState,
  MusicState: initialMusicState
}

const cameraReducer = createReducer(
  initialState,
  on(Actions.cameraConnect, state => ({ ...state, connectCamera: true})),
  on(Actions.cameraDisconnect, state => ({ ...state, connectCamera: false}))
)
const musicReducer = createReducer(
  initialState,
  on(Actions.musicPlay, state => ({ ...state, playing: true})), //update currentlyPlaying here
  on(Actions.musicPause, state => ({ ...state, playing: false})),
  on(Actions.musicSkipForward, state => ({ ...state, playing: true, previouslyPlayed: state.MusicState.currentlyPlaying})),
)

export const reducers: ActionReducerMap<State> = {
  return cameraReducer(state, action);
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
