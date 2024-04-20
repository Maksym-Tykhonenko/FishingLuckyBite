import React, {useState, useEffect, useRef} from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Button,
  Modal,
  Dimensions,
  StyleSheet,
  Animated,
} from 'react-native';
import {useWindowDimensions} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DatePicker, {
  ModernDateTimePickerConfig,
  ModernDateTimePickerOptions,
} from 'react-native-tx-modern-datetimepicker';
import {uid} from 'uid';
import CustomBarChart from './test';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OneFishingScreen = ({navigation, route}) => {
  const {height, width} = useWindowDimensions();
  const {name, image, inform} = route.params.fish;

  const [informAboutFish, setInformAboutFish] = useState(true);
  const [selectPhoto, setSelectPhoto] = useState([]);

  //////////////////////time picker
  const [visibleModal, setVisibleModal] = useState(false);
  const [timeSelected, setTimeSelected] = useState();
  const [showePhotoBlock, setShowePhotoBlock] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setData();
  }, [allFishInTime, selectPhoto]);

  const setData = async () => {
    try {
      const data = {
        allFishInTime,
        selectPhoto,
      };

      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem(`OneFishingScreen${name}`, jsonData);
      console.log('Дані збережено в AsyncStorage');
    } catch (e) {
      console.log('Помилка збереження даних:', e);
    }
  };

  const getData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem(`OneFishingScreen${name}`);
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        console.log('parsedData==>', parsedData);
        setAllFishInTime(parsedData.allFishInTime);
        setSelectPhoto(parsedData.selectPhoto);
      }
    } catch (e) {
      console.log('Помилка отримання даних:', e);
    }
  };

  //////////// LOADER
  const appearingAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(appearingAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, []);

  //////////////Time Picker
  const pickerOptions = {
    mainColor: '#0057FF',
    daysAnimationDistance: 300,
    headerAnimationDistance: 200,
    borderColor: '#dde',
    textDayNamesStyle: {
      fontWeight: '600',
      color: '#888',
      fontSize: 13,
    },
    viewDaysNameStyle: {
      borderBottomWidth: 3,
    },
    viewHeaderItemStyle: {
      borderWidth: 1,
      borderRadius: 16,
    },
    textDayStyle: {
      fontSize: 15,
    },
    textTodayStyle: {
      fontSize: 17,
      fontWeight: '600',
    },
    textHeaderStyle: {
      fontSize: 17,
    },
    viewMonthItemSelectedStyle: {
      borderRadius: 16,
      backgroundColor: '#345678',
      paddingVertical: 8,
    },
    imageArrow: {},
  };

  const pickerConfig = {
    dateFormat: 'YYYYMMDD',
    selectedFormat: 'YYYYMMDD',
    textSeparatorMonthYear: ' | ',
    timeFormat: 'HH:mm',
  };

  ////////////////////////
  const [allFishInTime, setAllFishInTime] = useState([]);

  useEffect(() => {
    if (timeSelected) {
      setAllFishInTime([...allFishInTime, timeSelected]);
    }
  }, [timeSelected]);

  /////////////////ImagePicer
  const ImagePicer = () => {
    let options = {
      storageOptios: {
        path: 'image',
      },
    };

    launchImageLibrary(options, response => {
      if (!response.didCancel) {
        setSelectPhoto([response.assets[0].uri, ...selectPhoto]);
      } else {
        console.log('Вибір скасовано');
      }
    });
  };

  return (
    <View style={{flex: 1}}>
      <ImageBackground source={require('../assets/bgr.jpeg')} style={{flex: 1}}>
        <SafeAreaView
          style={{position: 'relative', flex: 1, alignItems: 'center'}}>
          <Animated.View
            style={{
              opacity: appearingAnim,
              flex: 1,
              width: width * 0.9,
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: 20,
            }}>
            <ScrollView>
              <View style={{alignItems: 'center'}}>
                <Text style={{fontWeight: 'bold', fontSize: 35}}>{name}</Text>
              </View>

              {image.length > 3 ? (
                <Image
                  source={{uri: image}}
                  style={{borderRadius: 20, width: width * 0.9, height: 170}}
                />
              ) : (
                <Image
                  source={image}
                  style={{borderRadius: 20, width: width * 0.9, height: 170}}
                />
              )}

              {/**informAboutFish */}
              {informAboutFish ? (
                <View style={{marginHorizontal: 5}}>
                  <Button
                    title="Hide fish information"
                    onPress={() => setInformAboutFish(!informAboutFish)}
                  />
                  <Text style={{fontSize: 25}}>{inform}</Text>
                </View>
              ) : (
                <Button
                  title="Show fish information"
                  onPress={() => setInformAboutFish(!informAboutFish)}
                />
              )}
              {/**BTN Open time picker */}
              <View style={{alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() => setVisibleModal(true)}
                  style={{
                    borderWidth: 3,
                    borderRadius: 20,
                    borderColor: '#ffe260',
                    height: 60,
                    width: width * 0.75,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#ffe26080',
                  }}>
                  <Text style={{fontSize: 22, fontWeight: 'bold'}}>
                    When I caught a fish
                  </Text>
                </TouchableOpacity>
              </View>

              {/**FishInTime block */}
              {allFishInTime.map(time => {
                return (
                  <Text
                    style={{fontSize: 24, fontWeight: 'bold', marginLeft: 10}}
                    key={uid()}>
                    {time}
                  </Text>
                );
              })}

              {/**BTN Open ImagePicer */}
              <View style={{alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() => ImagePicer()}
                  style={{
                    borderWidth: 3,
                    borderRadius: 20,
                    borderColor: '#ffe260',
                    marginTop: 10,
                    height: 60,
                    width: width * 0.75,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#ffe26080',
                  }}>
                  <Text style={{fontSize: 22, fontWeight: 'bold'}}>
                    Add photo
                  </Text>
                </TouchableOpacity>
              </View>

              {/**Hide/Show photo BTN*/}
              {selectPhoto.length > 0 ? (
                <Button
                  title={showePhotoBlock ? 'Hide photo' : 'Show photo'}
                  onPress={() => setShowePhotoBlock(!showePhotoBlock)}
                />
              ) : (
                <></>
              )}

              {/**Photo block */}
              {showePhotoBlock && (
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    marginTop: 15,
                  }}>
                  {selectPhoto.map(photo => {
                    return (
                      <Image
                        source={{uri: photo}}
                        style={{
                          width: width * 0.4,
                          height: width * 0.4,
                          marginLeft: 15,
                          marginBottom: 15,
                          borderRadius: 20,
                        }}
                        key={uid()}
                      />
                    );
                  })}
                </View>
              )}
            </ScrollView>
          </Animated.View>

          {/**Modal time picker */}
          <Modal visible={visibleModal} transparent animationType={'slide'}>
            <View
              style={{
                flex: 1,
                backgroundColor: '#00000022',
                justifyContent: 'flex-end',
              }}>
              <View
                style={{
                  height: 500,
                  backgroundColor: 'white',
                }}>
                <View style={{alignItems: 'flex-end'}}>
                  <TouchableOpacity
                    style={{marginRight: 20, marginTop: 10}}
                    onPress={() => setVisibleModal(!visibleModal)}>
                    <Text
                      style={{
                        fontSize: 40,
                        fontWeight: 'bold',
                      }}>
                      X
                    </Text>
                  </TouchableOpacity>
                </View>

                <DatePicker
                  selected={'12:00'}
                  mode={'time'}
                  minuteInterval={5}
                  onTimeChange={d => {
                    console.log('onTimeChange', d);
                    setTimeSelected(d);
                    setVisibleModal(false);
                  }}
                  configs={pickerConfig}
                  options={{
                    ...pickerOptions,
                    viewButtonActionSelectTimeStyle: {
                      backgroundColor: 'green',
                      borderRadius: 50,
                      width: width - 100,
                      marginHorizontal: 32,
                      marginVertical: 30,
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 48,
                    },
                    textActionTimeStyle: {
                      fontSize: 26,
                      fontWeight: '500',
                    },
                  }}
                />
              </View>
            </View>
          </Modal>

          {/**BTN Back */}
          <TouchableOpacity
            onPress={() => navigation.navigate('FishingScreen')}
            style={{
              position: 'absolute',
              bottom: 20,
              right: 20,
              borderWidth: 2,
              width: 60,
              height: 60,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
              borderColor: '#ffe260',
            }}>
            <Image
              style={{width: 50, height: 50}}
              source={require('../assets/free-icon-backwards-4822153.png')}
            />
          </TouchableOpacity>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default OneFishingScreen;
