
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import TrackPlayer, { State, usePlaybackState } from 'react-native-track-player';

const TRACK = {
  id: 'track1',
  url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  title: 'Sample Song',
  artist: 'SoundHelix',
  artwork: 'https://dummyimage.com/300x300/000/fff&text=Album+Art',
  duration: 300
};

export default function Index() {
  const playbackState = usePlaybackState();
  const [trackAdded, setTrackAdded] = useState(false);

  const addTrack = async () => {
    await TrackPlayer.reset();
    await TrackPlayer.add([TRACK]);
    setTrackAdded(true);
  };

  const play = async () => {
    await TrackPlayer.play();
  };

  const pause = async () => {
    await TrackPlayer.pause();
  };

  // playbackState can be a number or an object depending on the version, so handle both
  const state = typeof playbackState === 'object' && playbackState !== null && 'state' in playbackState
    ? playbackState.state
    : playbackState;

  const getStatusText = () => {
    switch (state) {
      case State.Playing:
        return 'Playing';
      case State.Paused:
        return 'Paused';
      case State.Stopped:
        return 'Stopped';
      case State.Buffering:
        return 'Buffering';
      case State.Loading:
        return 'Loading';
      case State.Ready:
        return 'Ready';
      case State.Ended:
        return 'Ended';
      default:
        return 'Idle';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{TRACK.title}</Text>
      <Text style={styles.artist}>{TRACK.artist}</Text>
      <Button title="Add Track" onPress={addTrack} disabled={trackAdded} />
      <View style={styles.controls}>
        <Button title="Play" onPress={play} disabled={!trackAdded || state === State.Playing} />
        <Button title="Pause" onPress={pause} disabled={!trackAdded || state !== State.Playing} />
      </View>
      <Text style={styles.status}>Status: {getStatusText()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  artist: {
    fontSize: 18,
    marginBottom: 16,
  },
  controls: {
    flexDirection: 'row',
    gap: 16,
    marginVertical: 16,
  },
  status: {
    marginTop: 16,
    fontSize: 16,
  },
});
