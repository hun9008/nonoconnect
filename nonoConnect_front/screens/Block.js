
import React, { useState } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import UserBlock from './UserBlock';

const Block = ({ title, user, content, onAccept }) => {
  const [isVisible, setIsVisible] = useState(true);
  const screenWidth = Dimensions.get('window').width;

  if (!isVisible) {
    return null;
  }

  const handleAccept = () => {
    setIsVisible(false);
    onAccept && onAccept();
  };

  const handlePress = () => {
    setIsVisible(false);
  };

  return (
    <View style={{ margin: 10, width: screenWidth - 20, height: 200, backgroundColor: 'white', borderRadius: 10, padding: 10 }}>
      {user && <UserBlock user={user} />}
      <Text style={{ fontSize: 20, textAlign: 'left', marginTop: 10 }}>{title}</Text>
      <Text style={{ fontSize: 16, textAlign: 'left', marginTop: 5 }}>{content}</Text>
      <View style={{ flexDirection: 'row', position: 'absolute', right: 10, bottom: 10 }}>
        <TouchableOpacity onPress={handleAccept} style={{ marginRight: 10, padding: 10, backgroundColor: '#FFDB0F', borderColor: 'black', borderWidth: 1, borderRadius: 5 }}>
          <Text>수락</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePress} style={{ padding: 10, borderColor: 'black', borderWidth: 1, borderRadius: 5 }}>
          <Text>거절</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Block;




