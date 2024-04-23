import React, {useState, useEffect, useRef} from 'react';
import {Text, View, Animated, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import HomeScreen from './screens/HomeScreen';
import FishingScreen from './screens/FishingScreen';
import ProfileScreen from './screens/ProfileScreen';
import OneFishingScreen from './screens/OneFishingScreen';
//import CustomBarChart from './screens/test';
import {useWindowDimensions} from 'react-native';

const App = () => {
  const {height, width} = useWindowDimensions();
  //////////// LOADER
  const [louderIsEnded, setLouderIsEnded] = useState(false);

  const appearingAnim = useRef(new Animated.Value(0)).current;
  const appearingSecondAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(appearingAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      Animated.timing(appearingSecondAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }).start();
      //setLouderIsEnded(true);
    }, 1500);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLouderIsEnded(true);
    }, 3500);
  }, []);

  return (
    <NavigationContainer>
      {!louderIsEnded ? (
        <View
          style={{
            position: 'relative',
            flex: 1,
            //backgroundColor: 'rgba(225, 7, 6, 255)',
          }}>
          <Animated.Image
            source={require('./assets/rediz/louder/loader1.jpg')} // Special animatable View
            style={{
              //...props.style,
              opacity: appearingAnim,
              height: height,
              width: width,
              position: 'absolute', // Bind opacity to animated value
            }}
          />
          <Animated.Image
            source={require('./assets/rediz/louder/loader2.jpg')} // Special animatable View
            style={{
              //...props.style,
              opacity: appearingSecondAnim,
              height: height,
              width: width,
              position: 'absolute', // Bind opacity to animated value
            }}
          />
        </View>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="FishingScreen"
            component={FishingScreen}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="ProfileScreen"
            component={ProfileScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="OneFishingScreen"
            component={OneFishingScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;
