import React from 'react';
import {Image, ImageBackground, Text, View} from 'react-native';
import {useWindowDimensions} from 'react-native';

const OneFishingScreen = ({navigation, route}) => {
  const {height, width} = useWindowDimensions();
  const {fish} = route.params;
  console.log('fish==>', fish);
  return (
    <View style={{flex: 1}}>
      <ImageBackground source={require('../assets/bgr.jpeg')} style={{flex: 1}}>
        <View style={{flex: 1, marginTop: 40, alignItems: 'center'}}>
          <Image source={fish.image} style={{width: width * 0.9}} />
          <Text>{fish.id}</Text>
          <Text>{fish.name}</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default OneFishingScreen;
