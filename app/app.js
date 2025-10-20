import React, { useEffect } from 'react';
import TrackPlayer, { Capability } from 'react-native-track-player';
import Index from './index';

async function setupTrackPlayer() {
  await TrackPlayer.setupPlayer();
  await TrackPlayer.updateOptions({
    stopWithApp: false,
    capabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.SkipToNext,
      Capability.SkipToPrevious,
      Capability.SeekTo
    ],
    compactCapabilities: [Capability.Play, Capability.Pause]
  });
}

export default function App() {
  useEffect(() => {
    setupTrackPlayer();
    return () => {
      TrackPlayer.destroy();
    };
  }, []);

  return <Index />;
}
