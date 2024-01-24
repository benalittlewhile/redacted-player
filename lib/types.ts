export interface PlaybackInfo {
  shuffle_state: boolean;
  progress_ms: number;
  is_playing: boolean;
  item: {
    duration_ms: number;
  };
}

export const DefaultPlaybackInfo: PlaybackInfo = {
  shuffle_state: false,
  progress_ms: 0,
  is_playing: false,
  item: {
    duration_ms: 0,
  },
};
