import React, {useState, useEffect, useRef} from 'react';
import {
  Image,
  ImageBackground,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Button,
  Animated,
} from 'react-native';
import {fish} from '../data/fish';
import {useWindowDimensions} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo'; // home
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'; // fish-fins
import AntDesign from 'react-native-vector-icons/AntDesign'; // profile
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {uid} from 'uid';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FishingScreen = ({navigation}) => {
  const {height, width} = useWindowDimensions();
  const [modalClose, setModalClose] = useState(false);
  const [initialFishing, setInitialFishing] = useState(fish);
  const [modalAddFishIsOpen, setModalAddFishIsOpen] = useState(false);
  const [selectPhoto, setSelectPhoto] = useState(null);
  const [fishingName, setFishingName] = useState('');
  const [fishingDiscription, setFishingDiscription] = useState('');
  const [newFishArray, setNewFishArray] = useState([]);
  console.log('newFishArray==>', newFishArray);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setData();
  }, [newFishArray]);
  //, selectPhoto
  const setData = async () => {
    try {
      const data = {
        newFishArray,
      };

      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem(`FishingScreen`, jsonData);
      console.log('Дані збережено в AsyncStorage');
      //console.log('55', jsonData);
    } catch (e) {
      console.log('Помилка збереження даних:', e);
    }
  };

  const getData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem(`FishingScreen`);
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        console.log('parsedData==>', parsedData);
        setNewFishArray(parsedData.newFishArray);
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

  const ModalCloce = () => {
    setModalAddFishIsOpen(!modalAddFishIsOpen);
    setSelectPhoto(null);
    setFishingName('');
    setFishingDiscription('');
  };

  const handleSaveNewFish = () => {
    let newFish = {
      id: uid(),
      name: fishingName,
      inform: fishingDiscription,
      image: selectPhoto,
    };

    setNewFishArray([newFish, ...newFishArray]);
    ModalCloce();
  };

  return (
    <View style={{flex: 1}}>
      <ImageBackground source={require('../assets/bgr.jpeg')} style={{flex: 1}}>
        <Animated.View
          style={{
            opacity: appearingAnim,
            position: 'relative',
            flex: 1,
            marginTop: 40,
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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

            {/**Btn Add Fish */}
            <TouchableOpacity
              onPress={() => setModalAddFishIsOpen(!modalAddFishIsOpen)}
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

          <View style={{alignItems: 'center'}}>
            <ScrollView>
              {newFishArray.map(fish => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('OneFishingScreen', {fish: fish});
                    }}
                    style={{
                      alignItems: 'center',
                      width: width * 0.9,
                      marginBottom: 15,
                      borderWidth: 2,
                      borderColor: '#ffe260',
                      borderRadius: 10,
                      backgroundColor: '#f3f6fd',
                    }}
                    key={fish.id}>
                    <Image
                      source={{uri: fish.image}}
                      style={{
                        height: 160,
                        width: width * 0.9,
                        borderTopRightRadius: 10,
                        borderTopLeftRadius: 10,
                      }}
                    />
                    <Text style={{fontWeight: 'bold', fontSize: 20}}>
                      {fish.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}

              {initialFishing.map(fish => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('OneFishingScreen', {fish: fish});
                    }}
                    style={{
                      alignItems: 'center',
                      width: width * 0.9,
                      marginBottom: 15,
                      borderWidth: 2,
                      borderColor: '#ffe260',
                      borderRadius: 10,
                      backgroundColor: '#f3f6fd',
                    }}
                    key={fish.id}>
                    <Image
                      source={fish.image}
                      style={{
                        width: width * 0.9,
                        borderTopRightRadius: 10,
                        borderTopLeftRadius: 10,
                      }}
                    />
                    <Text style={{fontWeight: 'bold', fontSize: 20}}>
                      {fish.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
              <View style={{height: 150}}></View>
            </ScrollView>
          </View>

          {/** Modal add fish */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalAddFishIsOpen} //modalIsOpen
          >
            <View
              style={{
                position: 'relative',
                alignItems: 'center',
                paddingTop: 40,
                backgroundColor: '#414147',
                flex: 1,
                //marginRight: '5%',
                //marginLeft: '5%',
                marginTop: '15%',
                marginBottom: '15%',
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
                Add fish
              </Text>

              {/**CloseModal */}
              <TouchableOpacity
                onPress={() => {
                  ModalCloce();
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
                  placeholder="Enter the fish..."
                  value={fishingName}
                  onChangeText={setFishingName}
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
                    borderBottomColor: '#ffd97a',
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

                <TextInput
                  placeholderTextColor="rgba(255, 217, 122, 0.3)"
                  placeholder="Enter the discription..."
                  multiline={true}
                  value={fishingDiscription}
                  onChangeText={setFishingDiscription}
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
                    borderBottomColor: '#ffd97a',
                    color: '#ffd97a',
                    backgroundColor: '#414147',
                    width: 280,
                    height: 100,
                    shadowColor: '#000',
                    shadowOffset: {width: 0, height: 10},
                    shadowOpacity: 0.9,
                    shadowRadius: 10,
                  }}
                />

                {!selectPhoto ? (
                  <Button
                    title="Add photo"
                    onPress={() => {
                      ImagePicer();
                    }}
                  />
                ) : (
                  <TouchableOpacity
                    style={{
                      shadowColor: '#000',
                      shadowOffset: {width: 20, height: 5},
                      shadowOpacity: 0.5,
                      shadowRadius: 5,
                    }}
                    onPress={() => {
                      ImagePicer();
                    }}>
                    <Image
                      source={{uri: selectPhoto}}
                      style={{
                        borderRadius: 15,
                        height: 200,
                      }}
                    />
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  onPress={() => {
                    handleSaveNewFish();
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

export default FishingScreen;
