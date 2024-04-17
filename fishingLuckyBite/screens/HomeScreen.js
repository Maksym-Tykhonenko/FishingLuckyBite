import React, {useState} from 'react';
import {
  ImageBackground,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const HomeScreen = ({navigation}) => {
  const [modalClose, setModalClose] = useState(false);
  return (
    <View style={{flex: 1}}>
      <ImageBackground source={require('../assets/bgr.jpeg')} style={{flex: 1}}>
        <View
          style={{
            position: 'relative',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text>Home Screen!!!</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Test');
            }}>
            <Text>Test Screen!!!</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setModalClose(true)}
            style={{
              position: 'absolute',
              top: 50,
              left: 20,
              borderWidth: 2,
              width: 60,
              height: 60,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
              borderColor: '#ffe260',
            }}>
            <FontAwesome name="bars" style={{fontSize: 50, color: '#ffe260'}} />
          </TouchableOpacity>

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
                    style={{}}>
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
                    style={{}}>
                    <Text
                      style={{
                        fontSize: 40,
                        fontWeight: 'bold',
                        color: '#ffe260',
                      }}>
                      Home
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('FishingScreen');
                      setModalClose(false);
                    }}
                    style={{}}>
                    <Text
                      style={{
                        fontSize: 40,
                        fontWeight: 'bold',
                        color: '#ffe260',
                      }}>
                      Fish
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('ProfileScreen');
                      setModalClose(false);
                    }}
                    style={{}}>
                    <Text
                      style={{
                        fontSize: 40,
                        fontWeight: 'bold',
                        color: '#ffe260',
                      }}>
                      Prifile
                    </Text>
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
