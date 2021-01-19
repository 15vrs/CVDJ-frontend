export class Room {
  userId: string;
  roomId?: string;
}

export class Camera {
  cameraConnected: boolean;
  imageUrl?: Blob;
}

export class Face {
  faceAttributes: faceAttributes;
  faceId: any;
  faceRectangle: faceRectangle;
}

export class faceAttributes {
  emotion: FacialEmotions;
}

export class faceRectangle {
  height: any;
  left: any;
  top: any;
  width: any;
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
  currentlyPlayed?: string;
  upNext?: string;
  skipForward: boolean;
  skipBackward: boolean;
}