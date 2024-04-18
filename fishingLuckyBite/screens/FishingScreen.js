import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {fish} from '../data/fish';
import {useWindowDimensions} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo'; // home
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'; // fish-fins
import AntDesign from 'react-native-vector-icons/AntDesign'; // profile

const FishingScreen = ({navigation}) => {
  const {height, width} = useWindowDimensions();
  const [modalClose, setModalClose] = useState(false);
  const [initialFishing, setInitialFishing] = useState(fish);
  const [modalAddFish, setModalAddFish] = useState(false);
  console.log('modalAddFish==>', modalAddFish);
  return (
    <View style={{flex: 1}}>
      <ImageBackground source={require('../assets/bgr.jpeg')} style={{flex: 1}}>
        <View
          style={{
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
              onPress={() => setModalAddFish(!modalAddFish)}
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
        </View>
      </ImageBackground>
    </View>
  );
};

export default FishingScreen;
