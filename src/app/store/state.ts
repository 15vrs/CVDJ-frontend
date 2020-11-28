export interface AppState {
  CameraState: CameraState,
  MusicState: MusicState,
  FaceApiState: FaceApiState
}

export interface CameraState {
  connectCamera: boolean,
  // connecting: boolean,
  image?: string,
}

export interface FaceApiState {
  anger: any,
  contempt: any,
  disgust: any,
  fear: any,
  happiness: any,
  neutral: any,
  sadness: any,
  surprise: any
}

export interface MusicState {
  playing: boolean,
  previouslyPlayed?: string,
  currentlyPlaying?: string,
  upNext?: string
}
