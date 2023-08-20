import React, {useState} from 'react';
import { View, Text , TouchableOpacity, TextInput, Image, Dimensions, Alert} from 'react-native';
import { selectedText } from './RequestPopup';
import { selectedId } from './RequestPopup';
import * as ImagePicker from 'expo-image-picker';

const RequestAdd = ({onMoveMain, onMoveBack, blocks, setBlocks, user_id}) => {

    // const [buffer, setbuffer] = useState([
    //     { title: '', content: '', isVisible: true, user: { image: 'assets/userIcon.png', name: 'User Name 1', info: 'User Info 1' }, req_img: require('') },
    //     // status(삭제) = isVisible
    //   ]);
    const screenWidth = Dimensions.get('window').width;


    const predefinedTexts = {
        1: '키오스크에 관한 상세 설명입니다...',
        2: '기차 예매 방법에 대한 상세 설명입니다...',
        3: '가구 옮기기에 관한 상세 설명입니다...',
        4: '다른 요청에 대한 상세 설명입니다...'
    };

    const [title, setTitle] = useState(selectedText);
    const clearTitle = () => {
        setTitle('');
    };
    const [content, setContent] = useState(predefinedTexts[selectedId] || '');
    const clearContent = () => {
        setContent('');
    };

    const [imageSource, setImageSource] = useState(null);

    const chooseImage = async () => {
        try {
            // 갤러리 접근 권한을 요청 (선택적)
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
                return;
            }
    
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            // setImageSource(result.assets.uri);

            // console.log(result.assets);  // result 객체의 내용을 출력
            // setImageSource(result.assets[0].uri);
            // console.log(imageSource);
    
            if (!result.canceled) { 
                if (result.assets && result.assets.length > 0) {  // "assets" 배열을 사용하여 이미지 정보 접근
                    setImageSource(result.assets[0].uri);  // 첫 번째 자산의 uri 사용
                    console.log(imageSource);
                }
            }
        } catch (error) {
            console.error("Error picking image:", error);
        }
    }

    // const [Latitude, setLatitude] = useState(37.28452617085025);
    // const [Longitude, setLongitude] = useState(127.04598613080317);
  
  
    // const getLocation = async () => {
    
    //   try {
      
    //     await Location.requestForegroundPermissionsAsync();
        
    //     const {
    //       coords: {  latitude: currentLatitude, longitude: currentLongitude  },
    //     } = await Location.getCurrentPositionAsync();
  
    //     console.log(currentLatitude);
    //     console.log(currentLongitude);
    //     setLatitude(currentLatitude);
    //     setLongitude(currentLongitude);
    //     setIsLoading(false);
        
    //   } catch (e) {
    //     Alert.alert("위치정보를 가져올 수 없습니다.");
    //   }
      
    // };
  
    // getLocation();

    const handleAddBlock = () => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('context', content);
        formData.append('longitude', 137);  // 예시 위도
        formData.append('latitude', 38);    // 예시 경도
        formData.append('user_id', user_id);        // 예시 사용자 ID
    
        // 이미지 추가
        if (imageSource) {
            let uriParts = imageSource.split('.');
            let fileType = uriParts[uriParts.length - 1];
            formData.append('FILES', {
                uri: imageSource,
                name: `photo.${fileType}`,
                type: `image/${fileType}`,
            });
            console.log(formData.image);
        }
    
        fetch("http://192.168.0.26:8000/posting/feed/add", {
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data",
            },
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error("Error:", error);
        });
    
        onMoveMain();
    };
    

    return (
        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' ,backgroundColor: 'white'}}>
            <Text style={{fontSize:20, marginTop: 60}}>요청서</Text>
           
            <View style={{ flex:2 , justifyContent: 'center'}}>
                {/* title */}
                <Text style={{fontSize:20, textAlign: 'left', margin: 10}}>제목</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', width: screenWidth * 0.9, height: 42, marginBottom: 50 ,borderBlockColor: 'black', borderWidth: 1, borderRadius: 5}}>
                    <TextInput
                        style={{ width: screenWidth * 0.78, height: 40, marginLeft: 10}}
                        onChangeText={setTitle}
                        value={title}
                        placeholder="제목을 입력해 주세요."
                    />
                    {title ? (
                        <TouchableOpacity onPress={clearTitle} style={{ padding: 8 }}>
                            <Image source={require('../assets/close.png')} style={{ width: 25, height: 25 }} />
                        </TouchableOpacity>
                    ) : null}

                </View>
                {/* content */}
                <Text style={{fontSize:20, textAlign: 'left', margin: 10}}>요청사항 및 위치</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', width: screenWidth * 0.9, height: 82, marginBottom: 50, borderBlockColor: 'black', borderWidth: 1, borderRadius: 5}}>
                    <TextInput
                        style={{ width: screenWidth * 0.78, height: 150, marginLeft: 10}}
                        onChangeText={setContent}
                        value={content}
                        placeholder="요청사항을 입력해 주세요."
                    />
                    {content ? (
                        <TouchableOpacity onPress={clearContent} style={{ padding: 8 }}>
                            <Image source={require('../assets/close.png')} style={{ width: 25, height: 25 }} />
                        </TouchableOpacity>
                    ) : null}

                </View>
                {/* Image */}
                <Text style={{fontSize:20, textAlign: 'left', margin: 10}}>요청 세부 사진</Text>
                <View style={{ width: screenWidth * 0.9, height: 200, justifyContent: 'center', alignItems: 'center', borderBlockColor: 'black', borderWidth: 1 , borderRadius: 5}}>
                    {/* ... (기타 JSX 코드) */}
                    
                    {imageSource ? null : (
                        <TouchableOpacity onPress={chooseImage}>
                        <Image source={require('../assets/addImage.png')} style={{ width: 25, height: 25 }} />
                        </TouchableOpacity>
                    )}
                    {/* <TouchableOpacity onPress={chooseImage}>
                        <Image source={require('../assets/addImage.png')} style={{ width: 25, height: 25 }} />
                    </TouchableOpacity> */}
                    
                    {imageSource && typeof imageSource === 'string' && (
                        <Image source={{ uri: imageSource }} style={{ width: screenWidth * 0.85, height: 150, resizeMode: 'cover'}} />
                    )}

                    {imageSource && (
                        <TouchableOpacity 
                            style={{ position: 'absolute', top: 0, right: 0 }}  
                            onPress={() => setImageSource(null)} 
                        >
                            <Image source={require('../assets/close.png')} style={{ width: 25, height: 25 }} />
                        </TouchableOpacity>
                    )}


                </View>
            </View>

            <TouchableOpacity onPress={onMoveBack} style={{ position: 'absolute', right: 20, bottom: 30, width: 70, height: 30, backgroundColor: '#FFDB0F', borderColor: 'black', borderWidth: 1, borderRadius: 5, justifyContent: 'center' }}>
            <Text style={{color: 'black', textAlign: 'center'}}>돌아가기</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleAddBlock}  style={{ position: 'absolute', right: 100, bottom: 30, width: 70, height: 30, backgroundColor: '#FFDB0F', borderColor: 'black', borderWidth: 1, borderRadius: 5, justifyContent: 'center' }}>
                <Text style={{color: 'black', textAlign: 'center'}}>등록하기</Text>
            </TouchableOpacity>

        </View>
    );
};

export default RequestAdd;
