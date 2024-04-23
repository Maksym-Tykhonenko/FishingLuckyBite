import React, {useState, useEffect, useRef} from 'react';
import {
  ImageBackground,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo'; // home
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'; // fish-fins
import AntDesign from 'react-native-vector-icons/AntDesign'; // profile

const HomeScreen = ({navigation}) => {
  const [modalClose, setModalClose] = useState(false);

  //////////// LOADER
  const appearingAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(appearingAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, []);

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

          <ScrollView>
            <View style={{paddingHorizontal: 20}}>
              <Text style={{fontSize: 25, color: '#ffe260'}}>
                Welcome to the exciting world of fishing! Our app is not just a
                tool, it is your reliable companion in all your fishing
                adventures. With us, you will be able to keep a diary of your
                fishing trips, learn new types of fish and their features, as
                well as enrich your experience and skills. Join us and
                experience the magic of the moment when the fish bites and you
                begin your fight against the incredible force of nature. Fishing
                is not just a hobby, but a lifestyle that inspires new
                experiences and adventures. With us you will always be one step
                ahead, ready for new challenges and achievements!
              </Text>
            </View>
            <View style={{height: 150}}></View>
          </ScrollView>

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

export default HomeScreen;
