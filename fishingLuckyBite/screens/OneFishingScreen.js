import React, {useState, useEffect} from 'react';
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

const OneFishingScreen = ({navigation, route}) => {
  const {height, width} = useWindowDimensions();
  const {fish} = route.params;
  //console.log('fish==>', fish);

  const [informAboutFish, setInformAboutFish] = useState(true);
  const [selectPhoto, setSelectPhoto] = useState([]);
  console.log('selectPhoto.langth==>', selectPhoto.length);

  //////////////////////time picker
  const [visibleModal, setVisibleModal] = useState(false);
  const [timeSelected, setTimeSelected] = useState();
  console.log('timeSelected==>', timeSelected);
  const [showePhotoBlock, setShowePhotoBlock] = useState(true);
  console.log('showePhotoBlock==>', showePhotoBlock);

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
  console.log('allFishInTime==>', allFishInTime);

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
        //console.log('response==>', response.assets[0].uri);
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
          <View
            style={{
              flex: 1,
              width: width * 0.9,
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: 20,
            }}>
            <ScrollView>
              <View style={{alignItems: 'center'}}>
                <Text style={{fontWeight: 'bold', fontSize: 35}}>
                  {fish.name}
                </Text>
              </View>
              <Image
                source={fish.image}
                style={{borderRadius: 20, width: width * 0.9}}
              />

              {/**informAboutFish */}
              {informAboutFish ? (
                <View style={{marginHorizontal: 5}}>
                  <Button
                    title="Hide fish information"
                    onPress={() => setInformAboutFish(!informAboutFish)}
                  />
                  <Text style={{fontSize: 25}}>{fish.inform}</Text>
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
          </View>

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
