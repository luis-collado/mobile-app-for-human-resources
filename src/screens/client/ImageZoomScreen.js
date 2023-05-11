import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

import styles from '../../styles/client/ImageZoomStyles';

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


export default ImageZoomScreen;
