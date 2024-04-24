import React, {useState, useEffect, useRef} from 'react';
import {Text, View, Animated, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import HomeScreen from './screens/HomeScreen';
import FishingScreen from './screens/FishingScreen';
import ProfileScreen from './screens/ProfileScreen';
import OneFishingScreen from './screens/OneFishingScreen';
import Prodact from './screens/Product';
import {useWindowDimensions} from 'react-native';

const App = () => {
  const [route, setRoute] = useState();
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
    }, 4500);
  }, []);

  ///////// useEffect що виріш який шлях включати
  useEffect(() => {
    const checkUrl = `https://football.ua/`;

    const targetData = new Date('2024-03-14T12:00:00'); //дата з якої поч працювати webView
    const currentData = new Date(); //текущая дата

    if (currentData <= targetData) {
      setRoute(false);
    } else {
      fetch(checkUrl)
        .then(r => {
          if (r.status === 200) {
            setRoute(true);
          } else {
            setRoute(false);
          }
        })
        .catch(e => {
          console.log('errar', e);
          setRoute(false);
        });
    }
  }, []);

  ////////// Route
  const Route = ({isFatch}) => {
    if (isFatch) {
      return (
        <Stack.Navigator>
          <Stack.Screen
            //initialParams={{idfa: idfa}}
            name="Prodact"
            component={Prodact}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      );
    }
    return (
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
    );
  };

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
        <Route isFatch={route} />
      )}
    </NavigationContainer>
  );
};

export default App;
