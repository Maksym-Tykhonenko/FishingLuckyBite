import React, {useState, useEffect, useRef} from 'react';
import {
  Image,
  ImageBackground,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Animated,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo'; // home
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'; // fish-fins
import AntDesign from 'react-native-vector-icons/AntDesign'; // profile
import {useWindowDimensions} from 'react-native';
import {uid} from 'uid';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({navigation}) => {
  const {width} = useWindowDimensions();
  const [modalClose, setModalClose] = useState(false);
  const [selectPhoto, setSelectPhoto] = useState(null);
  const [onChangeName, setOnChangeName] = useState('');
  const [name, setName] = useState();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selected, setSelected] = useState('');
  const [fishingAdress, setFishingAdress] = useState('');
  const [fishingData, setFishingData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setData();
  }, [selectPhoto, name, fishingData]);
  //, selectPhoto
  const setData = async () => {
    try {
      const data = {
        name,
        selectPhoto,
        fishingData,
      };

      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem(`ProfileScreen`, jsonData);
      console.log('Дані збережено в AsyncStorage');
      //console.log('55', jsonData);
    } catch (e) {
      console.log('Помилка збереження даних:', e);
    }
  };

  const getData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem(`ProfileScreen`);
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        console.log('parsedData==>', parsedData);
        setName(parsedData.name);
        setSelectPhoto(parsedData.selectPhoto);
        setFishingData(parsedData.fishingData);
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
        setSelectPhoto(response.assets[0].uri);
      } else {
        console.log('Вибір скасовано');
      }
    });
  };
  /////////////////
  const handlSaveFishingData = () => {
    let newData = {
      id: uid(),
      date: selected,
      adress: fishingAdress,
    };

    setFishingData([...fishingData, newData]);

    setModalIsOpen(false);
    setFishingAdress('');
    setSelected('');
  };
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../assets/rediz/bcgr/backgr.jpg')}
        style={{flex: 1}}>
        <Animated.View
          style={{
            opacity: appearingAnim,
            position: 'relative',
            flex: 1,
            marginTop: 40,
          }}>
          <View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              {/**Btn Sidebar Open */}
              <TouchableOpacity
                onPress={() => setModalClose(true)}
                style={{
                  borderWidth: 2,
                  width: 60,
                  height: 60,
                  marginLeft: 10,
                  marginBottom: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                  borderColor: '#ffe260',
                  shadowColor: '#ffe260',
                  shadowOffset: {
                    width: 0,
                    height: 12,
                  },
                  shadowOpacity: 1,
                  shadowRadius: 8,
                }}>
                <FontAwesome
                  name="bars"
                  style={{fontSize: 50, color: '#ffe260'}}
                />
              </TouchableOpacity>

              {/**Btn Where I fished */}
              <TouchableOpacity
                onPress={() => setModalIsOpen(true)}
                style={{
                  borderWidth: 2,
                  width: 60,
                  height: 60,
                  marginRight: 10,
                  marginBottom: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                  borderColor: '#ffe260',
                  shadowColor: '#ffe260',
                  shadowOffset: {
                    width: 0,
                    height: 12,
                  },
                  shadowOpacity: 1,
                  shadowRadius: 8,
                }}>
                <FontAwesome
                  name="plus"
                  style={{fontSize: 50, color: '#ffe260'}}
                />
              </TouchableOpacity>
            </View>

            {/** Avatart Block */}
            <View style={{alignItems: 'center', marginTop: 0}}>
              {!selectPhoto ? (
                <TouchableOpacity
                  onPress={() => {
                    ImagePicer();
                  }}
                  style={{
                    width: 300,
                    height: 300,
                    borderRadius: 150,
                    borderWidth: 5,
                    borderColor: '#ffe260',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    shadowColor: '#ffe260',
                    shadowOffset: {
                      width: 0,
                      height: 12,
                    },
                    shadowOpacity: 1,
                    shadowRadius: 8,
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 40,
                      fontWeight: 'bold',
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 0,
                        height: 12,
                      },
                      shadowOpacity: 1,
                      shadowRadius: 8,
                    }}>
                    Tab for
                  </Text>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 40,
                      fontWeight: 'bold',
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 0,
                        height: 12,
                      },
                      shadowOpacity: 1,
                      shadowRadius: 8,
                    }}>
                    add photo
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    ImagePicer();
                  }}
                  style={{
                    width: 300,
                    height: 300,
                    borderRadius: 150,
                    borderWidth: 5,
                    borderColor: '#ffe260',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    shadowColor: '#ffe260',
                    shadowOffset: {
                      width: 0,
                      height: 12,
                    },
                    shadowOpacity: 1,
                    shadowRadius: 8,
                  }}>
                  <Image
                    source={{uri: selectPhoto}}
                    style={{
                      width: 300,
                      height: 300,
                      borderRadius: 150,
                      borderWidth: 5,
                      borderColor: '#ffe260',
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      alignItems: 'center',
                      justifyContent: 'center',
                      shadowColor: '#ffe260',
                      shadowOffset: {
                        width: 0,
                        height: 12,
                      },
                      shadowOpacity: 1,
                      shadowRadius: 8,
                    }}
                  />
                </TouchableOpacity>
              )}
            </View>

            {/** Name Block */}
            {!name ? (
              <View style={{alignItems: 'center', marginTop: 10}}>
                <TextInput
                  placeholderTextColor="rgba(255, 217, 122, 0.3)"
                  placeholder="Enter your name..."
                  value={onChangeName}
                  onChangeText={setOnChangeName}
                  style={{
                    elevation: 9,
                    marginTop: 5,
                    marginBottom: 15,
                    paddingLeft: 10,
                    fontSize: 20,
                    //borderRadius: 15,
                    borderWidth: 3,
                    borderColor: 'transparent',
                    borderBottomColor: '#ffe260',
                    color: '#ffe260',
                    //backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    width: width * 0.9,
                    height: 70,
                    shadowColor: '#ffe260',
                    shadowOffset: {
                      width: 0,
                      height: 12,
                    },
                    shadowOpacity: 1,
                    shadowRadius: 8,
                  }}
                />

                <TouchableOpacity
                  onPress={() => {
                    setName(onChangeName);
                  }}
                  style={{
                    width: 150,
                    height: 60,
                    borderWidth: 3,
                    borderRadius: 50,
                    borderColor: '#ffe260',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    shadowColor: '#ffe260',
                    shadowOffset: {
                      width: 0,
                      height: 12,
                    },
                    shadowOpacity: 1,
                    shadowRadius: 8,
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 30,
                      fontWeight: 'bold',
                      color: '#ffe260',
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 0,
                        height: 12,
                      },
                      shadowOpacity: 1,
                      shadowRadius: 8,
                    }}>
                    SAVE
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{alignItems: 'center', marginTop: 10}}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 40,
                    fontWeight: 'bold',
                    color: '#ffe260',
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 12,
                    },
                    shadowOpacity: 1,
                    shadowRadius: 8,
                  }}>
                  {name}
                </Text>
              </View>
            )}

            {/**Render fished place */}
            <ScrollView>
              <View style={{alignItems: 'center', marginTop: 20}}>
                {fishingData.map(data => {
                  return (
                    <View
                      style={{
                        width: width * 0.9,
                        marginBottom: 10,
                        paddingVertical: 5,
                        paddingHorizontal: 5,
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        borderRadius: 15,
                        borderWidth: 3,
                        borderColor: '#ffe260',
                        shadowColor: '#ffe260',
                        shadowOffset: {
                          width: 0,
                          height: 12,
                        },
                        shadowOpacity: 1,
                        shadowRadius: 8,
                      }}
                      key={uid()}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: 'bold',
                          color: '#ffe260',
                        }}>
                        Data:{' '}
                        <Text style={{fontWeight: 'normal'}}>{data.date}</Text>
                      </Text>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: 'bold',
                          color: '#ffe260',
                        }}>
                        Adress:{' '}
                        <Text style={{fontWeight: 'normal'}}>
                          {data.adress}
                        </Text>
                      </Text>
                    </View>
                  );
                })}
                <View style={{height: 150}}></View>
              </View>
            </ScrollView>

            {/** Modal add place */}
            <Modal
              animationType="fade"
              transparent={true}
              visible={modalIsOpen}>
              <View
                style={{
                  position: 'relative',
                  alignItems: 'center',
                  paddingTop: 40,
                  backgroundColor: '#414147',
                  flex: 1,
                  marginRight: '5%',
                  marginLeft: '5%',
                  marginTop: '35%',
                  marginBottom: '35%',
                  borderWidth: 5,
                  borderRadius: 15,
                  borderColor: '#ffd97a',
                }}>
                <Text
                  style={{
                    color: '#ffd97a',
                    fontWeight: 'bold',
                    fontSize: 28,
                    marginRight: 20,
                  }}>
                  Where I was fishing
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    setModalIsOpen(false);
                  }}
                  style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    borderWidth: 3,
                    borderRadius: 15,
                    borderColor: '#ffd97a',
                    backgroundColor: '#ffd97a',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: 10,
                    shadowColor: '#000',
                    shadowOffset: {width: 0, height: 10},
                    shadowOpacity: 0.9,
                    shadowRadius: 10,
                    width: 50,
                    height: 50,
                  }}>
                  <Text
                    style={{
                      fontSize: 30,
                      shadowOffset: {width: 0, height: 18},
                      shadowOpacity: 0.9,
                      shadowRadius: 20,
                    }}>
                    X
                  </Text>
                </TouchableOpacity>

                <ScrollView
                  style={{
                    marginTop: 10,
                  }}
                  showsVerticalScrollIndicator={false}>
                  <TextInput
                    placeholderTextColor="rgba(255, 217, 122, 0.3)"
                    placeholder="Enter the address..."
                    value={fishingAdress}
                    onChangeText={setFishingAdress}
                    style={{
                      shadowOffset: {width: 3, height: 4},
                      shadowOpacity: 0.8,
                      elevation: 9,
                      marginTop: 5,
                      marginBottom: 15,
                      paddingLeft: 10,
                      fontSize: 20,
                      borderWidth: 3,
                      borderColor: 'transparent',
                      borderBottomColor: '#ffe260',
                      color: '#ffd97a',
                      backgroundColor: '#414147',
                      width: 280,
                      height: 60,
                      shadowColor: '#000',
                      shadowOffset: {width: 0, height: 10},
                      shadowOpacity: 0.9,
                      shadowRadius: 10,
                    }}
                  />

                  <Calendar
                    style={{
                      borderRadius: 15,
                      shadowColor: '#000',
                      shadowOffset: {width: 0, height: 10},
                      shadowOpacity: 0.9,
                      shadowRadius: 10,
                    }}
                    onDayPress={day => {
                      setSelected(day.dateString);
                    }}
                    markedDates={{
                      [selected]: {
                        selected: true,
                        disableTouchEvent: true,
                        selectedDotColor: 'orange',
                      },
                    }}
                  />

                  <TouchableOpacity
                    onPress={() => {
                      handlSaveFishingData();
                    }}
                    style={{
                      marginTop: 15,
                      borderWidth: 3,
                      borderRadius: 15,
                      borderColor: '#ffd97a',
                      backgroundColor: '#ffd97a',
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingHorizontal: 10,
                      height: 60,
                      shadowColor: '#000',
                      shadowOffset: {width: 0, height: 10},
                      shadowOpacity: 0.9,
                      shadowRadius: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: 40,
                        fontFamily: 'Starnberg',
                        shadowColor: '#ffd97a',
                        shadowOffset: {width: 0, height: 18},
                        shadowOpacity: 0.9,
                        shadowRadius: 20,
                      }}>
                      Save
                    </Text>
                  </TouchableOpacity>
                  <View style={{height: 200}}></View>
                </ScrollView>
              </View>
            </Modal>
          </View>

          {/**Sidebar */}
          <Modal animationType="fade" transparent={true} visible={modalClose}>
            <View
              style={{
                flex: 1,
                marginRight: '30%',
                borderRightColor: '#fff',
                borderWidth: 1,
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
              }}>
              <ImageBackground
                source={require('../assets/images.jpg')}
                style={{flex: 1}}>
                <View style={{marginTop: 50, marginLeft: 10}}>
                  <TouchableOpacity
                    onPress={() => setModalClose(false)}
                    style={{marginBottom: 20}}>
                    <Text
                      style={{
                        fontSize: 40,
                        fontWeight: 'bold',
                        color: '#ffe260',
                      }}>
                      X
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      setModalClose(false);
                      navigation.navigate('HomeScreen');
                    }}
                    style={{marginBottom: 20}}>
                    <View style={{flexDirection: 'row'}}>
                      <Entypo
                        name="home"
                        style={{fontSize: 43, color: '#ffe260', marginRight: 5}}
                      />
                      <Text
                        style={{
                          fontSize: 40,
                          fontWeight: 'bold',
                          color: '#ffe260',
                        }}>
                        Home
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('FishingScreen');
                      setModalClose(false);
                    }}
                    style={{marginBottom: 20}}>
                    <View style={{flexDirection: 'row'}}>
                      <FontAwesome6
                        name="fish-fins"
                        style={{fontSize: 43, color: '#ffe260', marginRight: 5}}
                      />
                      <Text
                        style={{
                          fontSize: 40,
                          fontWeight: 'bold',
                          color: '#ffe260',
                        }}>
                        Fish
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('ProfileScreen');
                      setModalClose(false);
                    }}
                    style={{}}>
                    <View style={{flexDirection: 'row'}}>
                      <AntDesign
                        name="profile"
                        style={{fontSize: 43, color: '#ffe260', marginRight: 5}}
                      />
                      <Text
                        style={{
                          fontSize: 40,
                          fontWeight: 'bold',
                          color: '#ffe260',
                        }}>
                        Profile
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </View>
          </Modal>
        </Animated.View>
      </ImageBackground>
    </View>
  );
};

export default ProfileScreen;
