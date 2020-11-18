import { createAction } from '@ngrx/store';

export const cameraConnect = createAction('Camera - connect');
export const cameraDisconnect = createAction('Camera - disconnect');
export const musicPlay = createAction('Spotify - play music');
export const musicPause = createAction('Spotify - pause music');
export const musicSkipForward = createAction('Spotify - skip forward');
export const musicSkipBackward = createAction('Spotify - skip backward');