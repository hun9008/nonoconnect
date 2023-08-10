import React from 'react';
import { View, Text, TouchableOpacity ,navigation, Dimensions} from 'react-native';
export let selectedText = '';
export let selectedId = '';

const RequestPopup = ({ onClose , onMove}) => {

    const handleBlockPress = (item) => {
        selectedText = item.text;
        selectedId = item.id;
        onMove();
      };

    const blockTexts = [{ id: 1, text: '키오스크 사용법을 알려주세요.', emoji: '🖥️'}, 
                        { id: 2, text: '기차 예매 방법을 알려주세요.', emoji: '🚝'}, 
                        { id: 3, text: '가구 옮기는걸 도와주세요.', emoji: '💪'}, 
                        { id: 4, text: '그 외 다른 요청사항이 있어요.', emoji: '🎸'}];

    const screenWidth = Dimensions.get('window').width;
    const blockWidth = (screenWidth) * 0.9;
    const screenHeight = Dimensions.get('window').height;
    const blockHeight = (screenHeight / 4) * 0.7;

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' ,backgroundColor: 'white'}}>
        <Text style={{color: 'gray'}}>다음 예시 중 하나를 고르거나 새로운 요청을 작성해주세요.</Text>
        {blockTexts.map(item => (
        <TouchableOpacity key={item.text} onPress={() => handleBlockPress(item)} style={{ flexDirection:'row', height: blockHeight, width: blockWidth ,borderColor: 'black', borderWidth: 1, borderRadius: 10, margin: 10 , justifyContent: 'center',  alignItems: 'center'}}>
            <Text style={{textAlign: 'center', fontSize: screenHeight * 0.1, marginRight: 15}}>{item.emoji}</Text>
            <Text style={{textAlign: 'center', fontSize: screenHeight * 0.02, fontWeight:'bold'}}>{item.text}</Text>
        </TouchableOpacity>
        ))}
        {/* close button */}
        <TouchableOpacity onPress={onClose} style={{ position: 'absolute', right: 20, bottom: 30, width: 70, height: 30, backgroundColor: '#FFDB0F', borderColor: 'black', borderWidth: 1, borderRadius: 5, justifyContent: 'center' }}>
            <Text style={{color: 'black', textAlign: 'center'}}>닫기</Text>
        </TouchableOpacity>
        </View>
    );
};

export default RequestPopup;
