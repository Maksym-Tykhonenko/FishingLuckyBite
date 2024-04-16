import React, {useState} from 'react';
import {
  ImageBackground,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

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
            onPress={() => setModalClose(true)}
            style={{position: 'absolute', top: 50, left: 20}}>
            <Text>Bar</Text>
          </TouchableOpacity>

          <Modal animationType="fade" transparent={true} visible={modalClose}>
            <View
              style={{
                backgroundColor: '#0f8ab4',
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
