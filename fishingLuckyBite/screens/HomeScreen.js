import React, {useState} from 'react';
import {
  ImageBackground,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo'; // home
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'; // fish-fins
import AntDesign from 'react-native-vector-icons/AntDesign'; // profile

const HomeScreen = ({navigation}) => {
  const [modalClose, setModalClose] = useState(false);
  return (
    <View style={{flex: 1}}>
      <ImageBackground source={require('../assets/bgr.jpeg')} style={{flex: 1}}>
        <View
          style={{
            position: 'relative',
            flex: 1,
            marginTop: 40,
          }}>
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
            }}>
            <FontAwesome name="bars" style={{fontSize: 50, color: '#ffe260'}} />
          </TouchableOpacity>

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

export default HomeScreen;
