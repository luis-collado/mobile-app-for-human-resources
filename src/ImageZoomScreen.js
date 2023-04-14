import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const ImageZoomScreen = ({ route }) => {
  const { imageUrl } = route.params;

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: imageUrl }}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default ImageZoomScreen;
