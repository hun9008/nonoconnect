import React, { useState, useRef, useCallback, useEffect } from 'react';
import { FlatList ,SafeAreaView, ScrollView, Animated, View, Dimensions, Image, TouchableOpacity, Modal, Text } from 'react-native';
import Block from './Block.js';
import SideBar from './SideBar.js';
import RequestPopup from './RequestPopup.js';
import RequestAdd from './RequestAdd.js';
import {Asset} from 'expo-asset';
import GoogleMap from './Maps.js';
import * as Updates from 'expo-updates';


const MainPage = ({route, navigation}) => {
  console.log(route.params.nickname);  
  const image1 = Asset.fromModule(require('../assets/images/user_1.png')).uri;
  const image2 = Asset.fromModule(require('../assets/images/user_2.jpeg')).uri;
  const image3 = Asset.fromModule(require('../assets/images/user_3.jpg')).uri;
  const image4 = Asset.fromModule(require('../assets/images/user_4.jpg')).uri;

  // const [blocks, setBlocks] = useState([
  //   { title: 'Block 1', content: 'Block 1 Content', isVisible: true, user: { image: 'assets/userIcon.png', name: 'User Name 1', info: 'User Info 1' }, req_img: image1 },
  //   { title: 'Block 2', content: 'Block 2 Content', isVisible: true, user: { image: 'assets/userIcon.png', name: 'User Name 2', info: 'User Info 2' }, req_img: image2 },
  //   { title: 'Block 3', content: 'Block 3 Content', isVisible: true, user: { image: 'assets/userIcon.png', name: 'User Name 3', info: 'User Info 3' }, req_img: image3  },
  //   { title: 'Block 4', content: 'Block 4 Content', isVisible: true, user: { image: 'assets/userIcon.png', name: 'User Name 4', info: 'User Info 4' }, req_img: image4  },
  //   // status(삭제) = isVisible
  // ]);

  const DummyData = [
    // { title: '이건 어떻게 쓰는건가요?', content: 'Block 1 Content', isVisible: true, user: { image: 'assets/userIcon.png', name: 'Apocalypse', info: '수원시 팔달구' }, req_img: image1 },
    // { title: '이건 어디서 살 수 있죠?', content: 'Block 2 Content', isVisible: true, user: { image: 'assets/userIcon.png', name: 'Babylon', info: '수원시 영통구' }, req_img: image2 },
    // { title: '가구 옮기는 걸 도와주세요.', content: 'Block 3 Content', isVisible: true, user: { image: 'assets/userIcon.png', name: 'Chromium', info: '수원시 동천동' }, req_img: image3  },
    // { title: '길 찾는걸 도와주세요.', content: 'Block 4 Content', isVisible: true, user: { image: 'assets/userIcon.png', name: 'Dante', info: '수원시 메탄동' }, req_img: image4  },
  ];

  // 백에서 데이터 받아오는 부분.

  const [blocks, setBlocks] = useState(DummyData);
  const [backBlocks, setBackBlocks] = useState([]);  // New state for storing data from backend
  const [refreshing, setRefreshing] = useState(false);

  const BASE_URL = 'http://192.168.0.26:8000';

  // Transform backBlocks data to the exact blocks format
  const transformExactData = (data) => {
    return data.feeds.map(item => ({
      title: item.title,
      content: item.context,
      isVisible: true,  // Renamed from status to isVisible
      user: {
        image: 'assets/userIcon.png', 
        name: item.nickname,
        info: item.nickname + ' Info',
      },
      req_img: BASE_URL + item.req_img,  // Use req_img directly
      feed_id: item.id,
      comment_list: item.comment_list ? item.comment_list.map(comment => ({
        user_id: comment.user_id,
        comment_id: comment.comment_id,
        user_nickname: comment.user_nickname,
        context: comment.context,
      })) : [],  
    }));
  };
  
const usingUser = route.params.nickname; 

const [userId, setUserId] = useState(5);

  useEffect(() => {
        fetch("http://192.168.0.26:8000/account/login", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            if (data.user_id) {
                setUserId(data.user_id);  // user_id 값을 상태에 저장
            } else {
                console.error("Error:", data.message);
            }
        })
        .catch(error => {
            console.error("Network error:", error);
        });
  }, []);

  // Fetch blocks data from the backend server when the component mounts ?user_id=${user_id}
  // useEffect(() => {
  //   const user_id = userId;
  //   fetch(`http://192.168.0.26:8000/posting/feed/main/?user_id=${user_id}`, {
  //     method: 'GET',
  //     headers: {
  //       'Accept': 'application/json',
  //     },
  //   })
  //     .then(response => response.json())
  //     // .then((response) => {
  //     //   console.log(response); // 응답 로깅
  //     //   return response.json();
  //     // })
  //     .then(data => {
  //       // setBackBlocks(data);
  //           // 백엔드 데이터와 DummyData를 병합
  //         const combinedData = [...DummyData, ...transformExactData(data)];
  //         setBlocks(combinedData);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching blocks:', error);
  //     });
  // }, [forceUpdate, userId]);  

  const loadData = async () => {
    try {
        const user_id = userId;
        const response = await fetch(`http://192.168.0.26:8000/posting/feed/main/?user_id=${user_id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        });
        const data = await response.json();
        const combinedData = [...DummyData, ...transformExactData(data)];
        setBlocks(combinedData);
    } catch (error) {
        console.error('Error fetching blocks:', error);
    }
};

useEffect(() => {
  loadData();
}, []);


  const logoutUser = async () => {
    const url = "http://192.168.0.26:8000/account/logout";
    console.log("startinglogout");

    const logoutData = {
        nickname: usingUser, // This can be dynamically set based on the logged in user
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(logoutData)
        });

        if(response.status === 200) {
            console.log("로그아웃 성공!");
            navigation.navigate('Login');
            // Here, you can also update the state or navigate to the login screen
        } else {
            console.error("로그아웃 실패:", response.statusText);
        }
    } catch (error) {
        console.error("Error:", error);
    }
  };


  const [isSidebarExpanded, setSidebarExpanded] = useState(false);

  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const sidebarAnim = useRef(new Animated.Value(0)).current;

  const [acceptedUser, setAcceptedUser] = useState(null); // 수락된 사용자 정보 상태

  const [isPopupVisible, setPopupVisible] = useState(false); // 요청 등록
  const [isAddVisible, setAddVisible] = useState(false);

  const [isMapVisible, setMapVisible] = useState(false);


  const handleBlockAccept = useCallback((userName) => {
    // Find the accepted block
    const block = blocks.find(block => block.user.name === userName);
    if (block !== undefined) {
        // Save the accepted block's info
        setAcceptedUser(block);  // Save the entire block information instead of just user info

        // Hide the accepted block
        const index = blocks.findIndex(block => block.user.name === userName);
        if (index !== -1) {
            const newBlocks = [...blocks];
            newBlocks[index].isVisible = false;
            setBlocks(newBlocks);
        }
    }
    // Show the sidebar
    setSidebarVisible(true);
    Animated.timing(sidebarAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
    }).start();
  }, [sidebarAnim, blocks]);

  const handleBlockReject = useCallback((userName) => {
    const index = blocks.findIndex(block => block.user.name === userName);
    if (index !== -1) {
      const newBlocks = [...blocks];
      newBlocks[index].isVisible = false;
      setBlocks(newBlocks);
    }
  }, [blocks]);

  //added
  const handleSidebarReject = useCallback(() => {
    // Hide the sidebar
    setSidebarVisible(false);
  
    // Show the block of the rejected user
    const index = blocks.findIndex(block => block.user.name === acceptedUser.user.name);
    if (index !== -1) {
      const newBlocks = [...blocks];
      newBlocks[index].isVisible = true;
      setBlocks(newBlocks);
    }
  
    // Clear the accepted user
    setAcceptedUser(null);
  }, [blocks, acceptedUser]);

  const handleOpenPopup = () => {
    setPopupVisible(true);
  };
  
  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  const handleMoveAdd = () => {
    setPopupVisible(false);
    setAddVisible(true);
  }

  const handleGoBackPopup = () => {
    setAddVisible(false);
    setPopupVisible(true);
  }

  const handleGoMain = () => {
    setAddVisible(false);
    setPopupVisible(false);
    // Updates.reloadAsync(); //리로드 부분
  }

  const handleMap = () => {
    setMapVisible(true);
  }

  const closeMap = () => {
    setMapVisible(false);
  }

  const owner = 'jeong';
  const owner_img = 'assets/userIcon.png';


  const screenWidth = Dimensions.get('window').width;
  const sidebarWidth = screenWidth * 0.95; // 사이드바 너비를 화면 너비의 80%로 설정
  const marginLeftRight = (screenWidth - sidebarWidth) / 2; // 왼쪽과 오른쪽 마진 계산
  const sidebarHeight = useRef(new Animated.Value(200)).current; // Initial height


  const handleExpandSidebar = () => {
    Animated.timing(sidebarHeight, {
      toValue: isSidebarExpanded ? 200 : 600, // Toggle height
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setSidebarExpanded(!isSidebarExpanded);
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <ScrollView>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 10 }}>
          <TouchableOpacity onPress={logoutUser} style={{position: 'absolute', left:10,top:15, width:70, height: 30, justifyContent: 'center' }}>
            <Text>로그아웃</Text>
          </TouchableOpacity>
          <Image source={require('../assets/userInfo.png')} style={{ width: 30, height: 30 }} />
        </View>
          {blocks.map((block, index) => <Block key={index} title={block.title} content={block.content} user={block.user} isVisible={block.isVisible} req_img={block.req_img} owner={usingUser} owner_img={owner_img} onAccept={() => handleBlockAccept(block.user.name)} onReject={() => handleBlockReject(block.user.name)} feed_id={block.feed_id} comment_list={block.comment_list} user_id={userId}/>)}
      </ScrollView> */}

      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 10 }}>
          <TouchableOpacity onPress={logoutUser} style={{position: 'absolute', left:10, top:15, width:70, height: 30, justifyContent: 'center' }}>
              <Text>로그아웃</Text>
          </TouchableOpacity>
          <Image source={require('../assets/userInfo.png')} style={{ width: 30, height: 30 }} />
      </View>
      
      <FlatList
          data={blocks}
          renderItem={({ item, index }) => (
              <Block
                  key={index}
                  title={item.title}
                  content={item.content}
                  user={item.user}
                  isVisible={item.isVisible}
                  req_img={item.req_img}
                  owner={usingUser}
                  owner_img={owner_img}
                  onAccept={() => handleBlockAccept(item.user.name)}
                  onReject={() => handleBlockReject(item.user.name)}
                  feed_id={item.feed_id}
                  comment_list={item.comment_list}
                  user_id={userId}
              />
          )}
          keyExtractor={(item, index) => index.toString()}
          refreshing={refreshing}
          onRefresh={() => {
              setRefreshing(true);
              loadData().then(() => {
                  setRefreshing(false);
              });
          }}
      />


       {/* sideBar */}
       {isSidebarVisible && (
        <Animated.View style={{ position: 'absolute', bottom: 0, left: marginLeftRight, width: sidebarWidth, height: sidebarHeight }}>
          <SideBar BlockInfo={acceptedUser} onExpand={handleExpandSidebar} isExpanded={isSidebarExpanded} onReject={handleSidebarReject} sideWidth={sidebarWidth} onMap={handleMap}/>
        </Animated.View>
      )}
      {/* new request */}
      <View>
          <TouchableOpacity onPress={handleOpenPopup} style={{ position: 'absolute', left: 20, bottom: 20, width: 100, height: 30, backgroundColor: '#FFDB0F', borderColor: 'black', borderWidth: 1, borderRadius: 5, justifyContent: 'center' }}>
            <Text style={{color: 'black', textAlign: 'center'}}>+  요청등록</Text>
          </TouchableOpacity>
        

        <Modal visible={isPopupVisible} animationType="slide" transparent={true}>
          <RequestPopup onClose={handleClosePopup} onMove={handleMoveAdd}/>
        </Modal>

        <Modal visible={isAddVisible} animationType="slide" transparent={true}>
          <RequestAdd onMoveMain={handleGoMain} onMoveBack={handleGoBackPopup} blocks={blocks} setBlocks={setBlocks} user_id={userId}/>
        </Modal>

        <Modal visible={isMapVisible} animationType="slide" transparent={true}>
          <GoogleMap onMapClose={closeMap}/>
        </Modal>
      </View>
    </SafeAreaView>
    
  );
};

export default MainPage;
