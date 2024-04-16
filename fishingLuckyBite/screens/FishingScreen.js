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

const FishingScreen = ({navigation}) => {
  const {height, width} = useWindowDimensions();
  const [modalClose, setModalClose] = useState(false);
  const [initialFishing, setInitialFishing] = useState(fish);
  console.log('initialFishing==>', initialFishing);
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
          <Text>Fishing Screen!!!</Text>
          <TouchableOpacity
            onPress={() => setModalClose(true)}
            style={{position: 'absolute', top: 50, left: 20}}>
            <Text>Bar</Text>
          </TouchableOpacity>

          <View style={{marginTop: 40}}>
            <ScrollView>
              {initialFishing.map(fish => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('OneFishingScreen', {fish: fish});
                    }}
                    style={{
                      alignItems: 'center',
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

export default FishingScreen;
