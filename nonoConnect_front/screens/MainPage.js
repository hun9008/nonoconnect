import React, { useState, useRef, useCallback } from 'react';
import { SafeAreaView, ScrollView, Animated, View, Dimensions, Image } from 'react-native';
import Block from './Block.js';
import SideBar from './SideBar.js';

const MainPage = () => {

  const [blocks, setBlocks] = useState([
    { title: 'Block 1', content: 'Block 1 Content', isVisible: true, user: { image: 'assets/userIcon.png', name: 'User Name 1', info: 'User Info 1' }, req_img: require('../assets/images/user_1.png') },
    { title: 'Block 2', content: 'Block 2 Content', isVisible: true, user: { image: 'assets/userIcon.png', name: 'User Name 2', info: 'User Info 2' }, req_img: require('../assets/images/user_2.jpeg') },
    { title: 'Block 3', content: 'Block 3 Content', isVisible: true, user: { image: 'assets/userIcon.png', name: 'User Name 3', info: 'User Info 3' }, req_img: require('../assets/images/user_3.jpg')  },
    { title: 'Block 4', content: 'Block 4 Content', isVisible: true, user: { image: 'assets/userIcon.png', name: 'User Name 4', info: 'User Info 4' }, req_img: require('../assets/images/user_4.jpg')  },
    // status(삭제) = isVisible
  ]);

  const [isSidebarExpanded, setSidebarExpanded] = useState(false);

  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const sidebarAnim = useRef(new Animated.Value(0)).current;

  const [acceptedUser, setAcceptedUser] = useState(null); // 수락된 사용자 정보 상태

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


  // const handleBlockAccept = useCallback((user) => {
  //   setAcceptedUser(user);
  //   setSidebarVisible(true);
  //   Animated.timing(sidebarAnim, {
  //     toValue: 1,
  //     duration: 300,
  //     useNativeDriver: false,
  //   }).start();
  //   // added
  //   const index = blocks.findIndex(block => block.user.name === user);
  //   if (index !== -1) {
  //     const newBlocks = [...blocks];
  //     newBlocks[index].isVisible = false;
  //     setBlocks(newBlocks);
  //   }
  // }, [sidebarAnim, blocks]);

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
      <ScrollView>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 10 }}>
          <Image source={require('../assets/userInfo.png')} style={{ width: 30, height: 30 }} />
        </View>
          {blocks.map((block, index) => <Block key={index} title={block.title} content={block.content} user={block.user} isVisible={block.isVisible} req_img={block.req_img} onAccept={() => handleBlockAccept(block.user.name)} onReject={() => handleBlockReject(block.user.name)} />)}
      </ScrollView>
       {/* sideBar */}
       {isSidebarVisible && (
        <Animated.View style={{ position: 'absolute', bottom: 0, left: marginLeftRight, width: sidebarWidth, height: sidebarHeight }}>
          <SideBar BlockInfo={acceptedUser} onExpand={handleExpandSidebar} isExpanded={isSidebarExpanded} onReject={handleSidebarReject} sideWidth={sidebarWidth}/>
        </Animated.View>
      )}
    </SafeAreaView>
  );
};

export default MainPage;
