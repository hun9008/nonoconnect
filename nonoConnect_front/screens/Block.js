
import React, { useState } from 'react';
import { View, Text, Dimensions, Image, TouchableOpacity } from 'react-native';
import UserBlock from './UserBlock';

const Block = ({ title, user, content, isVisible, req_img, onAccept ,onReject }) => {

  // const [isVisible, setIsVisible] = useState(true);
  const screenWidth = Dimensions.get('window').width;

  if (!isVisible) {
    return null;
  }

  const handleAccept = () => {
    onAccept && onAccept();
  };

  const handleReject = () => {
    onReject && onReject();
  };

  return (
    <View style={{ margin: 10, width: screenWidth - 20, height: 500, backgroundColor: 'white', borderRadius: 10, padding: 10 }}>
      {user && <UserBlock user={user} />}
      <Text style={{ fontSize: 20, textAlign: 'left', marginTop: 10 ,marginLeft: 10}}>{title}</Text>
      <Text style={{ fontSize: 16, textAlign: 'left', marginTop: 5 ,marginLeft: 10}}>{content}</Text>
      <Image source={req_img} style={{width: screenWidth * 0.9, height: 150, marginTop:20}}/>
      <View style={{ flexDirection: 'row', position: 'absolute', right: 10, bottom: 10 }}>
        <TouchableOpacity onPress={handleAccept} style={{ marginRight: 10, padding: 10, backgroundColor: '#FFDB0F', borderColor: 'black', borderWidth: 1, borderRadius: 5 }}>
          <Text>수락</Text> 
        </TouchableOpacity>
        <TouchableOpacity onPress={handleReject} style={{ padding: 10, borderColor: 'black', borderWidth: 1, borderRadius: 5 }}>
          <Text>거절</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Block;




