import { PROVIDER_GOOGLE , Marker} from 'react-native-maps';
import MapView from 'react-native-maps';
import {View, Dimensions, TouchableOpacity, Text, Alert} from 'react-native';
import * as Location from "expo-location";
import React, { useState } from 'react';


const GoogleMap = ({onMapClose}) => {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const [isLoading, setIsLoading] = useState(true);
  const [Latitude, setLatitude] = useState(37.28452617085025);
  const [Longitude, setLongitude] = useState(127.04598613080317);


  const getLocation = async () => {
  
    try {
    
      await Location.requestForegroundPermissionsAsync();
      
      const {
        coords: {  latitude: currentLatitude, longitude: currentLongitude  },
      } = await Location.getCurrentPositionAsync();

      console.log(currentLatitude);
      console.log(currentLongitude);
      setLatitude(currentLatitude);
      setLongitude(currentLongitude);
      setIsLoading(false);
      
    } catch (e) {
      Alert.alert("위치정보를 가져올 수 없습니다.");
    }
    
  };

  getLocation();
 
  return(
  <View style={{flex:1}}>
  	  <MapView 
        style={{width: screenWidth, height : screenHeight}}
        initialRegion={{
                // latitude: 37.28452617085025,
                // longitude: 127.04598613080317,
                latitude: Latitude,
                longitude: Longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            provider={PROVIDER_GOOGLE}
        > 
    	<Marker
            coordinate={{
            latitude: 37.27935557505588,
            longitude: 127.04820433059999,
          }}
            pinColor="#FFDB0F"
            title="요청자 위치"
            description="여기로 와주세요."
          />
      <Marker
            coordinate={{
            // latitude: 37.28297959090133,
            // longitude: 127.04345927462181,
            latitude: Latitude,
            longitude: Longitude,
          }}
            pinColor="#FF0000"
            title="사용자 위치"
            description="지금 여기에요."
          />
    
      </MapView>
      <Text style={{ position: 'absolute', top: screenHeight * 0.1 ,fontSize: 15, textAlign: 'center', width: screenWidth, fontWeight: 'bold'}}>길 찾기를 하려면 아래 Google을 눌러 주세요!</Text>
              {/* close button */}
      <TouchableOpacity onPress={onMapClose} style={{ position: 'absolute', right: 20, bottom: 30, width: 70, height: 30, backgroundColor: '#FFDB0F', borderColor: 'black', borderWidth: 1, borderRadius: 5, justifyContent: 'center' }}>
        <Text style={{color: 'black', textAlign: 'center'}}>닫기</Text>
      </TouchableOpacity>
  </View>
  )
  
}

export default GoogleMap


  