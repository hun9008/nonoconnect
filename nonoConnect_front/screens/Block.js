
import React, { useState } from 'react';
import { View, Text, Dimensions, Image, TouchableOpacity, TextInput} from 'react-native';
import UserBlock from './UserBlock';

const Block = ({ title, user, content, isVisible, req_img, owner, onAccept ,onReject, feed_id, comment_list, user_id }) => {

  // const [isVisible, setIsVisible] = useState(true);
  const screenWidth = Dimensions.get('window').width;
  const [comment, setComment] = useState('');
  const [tempComment, setTempComment] = useState('');
  const [displayText, setDisplayText] = useState('');
  const [displayOwner, setDisplayOwner] = useState(false);
  console.log(feed_id);
  // console.log(comment_list);

  if (!isVisible) {
    return null;
  }

  const handleAccept = () => {
    onAccept && onAccept();
  };

  const handleReject = () => {
    onReject && onReject();
  };

  const createComment = async () => {
    try {
        const response = await fetch(`http://192.168.0.26:8000/posting/feed/${feed_id}/comment/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: user_id, // 이 부분은 실제 로그인된 유저의 ID로 변경해야 합니다.
                context: tempComment,
                feed_id: feed_id
            })
        });

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error creating comment:', error);
    }
};

  return (
    <View style={{ margin: 10, width: screenWidth - 20, height: 500, backgroundColor: 'white', borderRadius: 10, padding: 10 }}>
      {user && <UserBlock user={user} />}
      <Text style={{ fontSize: 20, textAlign: 'left', marginTop: 10 ,marginLeft: 10}}>{title}</Text>
      <Text style={{ fontSize: 16, textAlign: 'left', marginTop: 5 ,marginLeft: 10}}>{content}</Text>
      <Image source={{uri: req_img + '?' + new Date()}} style={{width: screenWidth * 0.9, height: 150, marginTop:20}}/>
      {/* displayOwner가 true일 때만 owner와 comment를 보여줍니다. */}
      {
        comment_list && comment_list.map(commentItem => (
          <View key={commentItem.comment_id} style={{ flexDirection: 'row', marginLeft: 10, marginTop: 20 }}>
            <Text style={{ fontSize: 16 }}>{commentItem.user_nickname}</Text>
            <Text style={{ marginLeft: 10, marginTop: 5 }}>{commentItem.context}</Text>
          </View>
        ))
      }

      {displayOwner && (
        <View style={{flexDirection: 'row', marginLeft: 10, marginTop: 20}}>
          <Text style={{fontSize: 16}}>{owner}</Text>
          <Text style={{marginLeft: 10, marginTop: 5}}>{comment}</Text>
        </View>
      )}
      <View style={{ flexDirection: 'row', position: 'absolute', right: 10, bottom: 10 }}>
        <TextInput
          style={{ width: screenWidth * 0.6, height: 30, marginLeft: 10}}
          onChangeText={setTempComment}
          value={tempComment}
          onSubmitEditing={() => { setComment(tempComment); setDisplayText(tempComment); setDisplayOwner(true); createComment();}}
          placeholder="댓글을 작성해주세요."
        />
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




