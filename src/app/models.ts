export class Room {
  userId: string;
  roomId?: string;
  playlistUri?: string;
  accessToken?: string;
}

export class Camera {
  cameraConnected: boolean;
}

export class FaceAttributes {
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