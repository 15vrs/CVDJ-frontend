export class Room {
  userId: string;
  roomId?: string;
  playlistUri?: string;
  accessToken?: string;
}

export class Camera {
  cameraConnected: boolean;
}

export class faceAttributes {
  emotion: FacialEmotions;
}

export class FacialEmotions {
  anger: any;
  contempt: any;
  disgust: any;
  fear: any;
  happiness: any;
  neutral: any;
  sadness: any;
  surprise: any;
}

export class Music {
  playing: boolean;
  previouslyPlayed?: string;
  currentlyPlaying?: string;
  upNext?: string;
  skipForward: boolean;
  skipBackward: boolean;
}