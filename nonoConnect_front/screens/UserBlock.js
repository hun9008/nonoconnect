import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';

const UserBlock = ({ user }) => {
  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={{ flexDirection: 'row', margin: 10, width: screenWidth / 2 , height: 50, backgroundColor: 'white', borderRadius: 10 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 10 }}>
          <Image source={require('../assets/userIcon.png')} style={{ width: 30, height: 30 }} />
        </View>
      <View style={{ marginLeft: 10 }}>
        <Text style={{ fontSize: 20 }}>{user.name}</Text>
        <Text style={{ fontSize: 16 }}>{user.info}</Text>
      </View>
    </View>
  );
};

export default UserBlock;
