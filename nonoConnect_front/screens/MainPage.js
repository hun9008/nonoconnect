import React, { useState, useRef, useCallback } from 'react';
import { SafeAreaView, ScrollView, Animated, View, Dimensions, Image } from 'react-native';
import Block from './Block.js';
import SideBar from './SideBar.js';

const MainPage = () => {

  const [blocks, setBlocks] = useState([
    { title: 'Block 1', content: 'Block 1 Content', isVisible: true, user: { image: 'assets/userIcon.png', name: 'User Name 1', info: 'User Info 1' } },
    { title: 'Block 2', content: 'Block 2 Content', isVisible: true, user: { image: 'assets/userIcon.png', name: 'User Name 2', info: 'User Info 2' } },
    { title: 'Block 3', content: 'Block 3 Content', isVisible: true, user: { image: 'assets/userIcon.png', name: 'User Name 3', info: 'User Info 3' }  },
    { title: 'Block 4', content: 'Block 4 Content', isVisible: true, user: { image: 'assets/userIcon.png', name: 'User Name 4', info: 'User Info 4' }  },
    // ...
  ]);

  const [isSidebarExpanded, setSidebarExpanded] = useState(false);

  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const sidebarAnim = useRef(new Animated.Value(0)).current;

  const [acceptedUser, setAcceptedUser] = useState(null); // 수락된 사용자 정보 상태


  const handleBlockAccept = useCallback((user) => {
    setAcceptedUser(user);
    setSidebarVisible(true);
    Animated.timing(sidebarAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
    // added
    const index = blocks.findIndex(block => block.user.name === user);
    if (index !== -1) {
      const newBlocks = [...blocks];
      newBlocks[index].isVisible = false;
      setBlocks(newBlocks);
    }
  }, [sidebarAnim, blocks]);

  // const handleBlockAccept = useCallback((userName) => {
  //   // Find the accepted block
  //   const block = blocks.find(block => block.user.name === userName);
  //   if (block !== undefined) {
  //     // Save the accepted block's info
  //     setAcceptedUser(block);
    
  //     // Hide the accepted block
  //     const index = blocks.findIndex(block => block.user.name === userName);
  //     if (index !== -1) {
  //       const newBlocks = [...blocks];
  //       newBlocks[index].isVisible = false;
  //       setBlocks(newBlocks);
  //     }
  //   }
  
  //   // Show the sidebar
  //   setSidebarVisible(true);
  //   Animated.timing(sidebarAnim, {
  //     toValue: 1,
  //     duration: 300,
  //     useNativeDriver: false,
  //   }).start();
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
    const index = blocks.findIndex(block => block.user.name === acceptedUser);
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
      toValue: isSidebarExpanded ? 200 : 400, // Toggle height
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
          {blocks.map((block, index) => <Block key={index} title={block.title} content={block.content} user={block.user} isVisible={block.isVisible} onAccept={() => handleBlockAccept(block.user.name)} onReject={() => handleBlockReject(block.user.name)} />)}
      </ScrollView>
       {/* sideBar */}
       {isSidebarVisible && (
        <Animated.View style={{ position: 'absolute', bottom: 0, left: marginLeftRight, width: sidebarWidth, height: sidebarHeight }}>
          <SideBar user={acceptedUser} onExpand={handleExpandSidebar} isExpanded={isSidebarExpanded} onReject={handleSidebarReject}/>
        </Animated.View>
      )}
    </SafeAreaView>
  );
};

export default MainPage;


// import * as React from "react";
// import { Image } from "expo-image";
// import { StyleSheet, Text, View, ScrollView } from "react-native";
// import { FontFamily, Color } from "../GlobalStyles";

// const MainPage = () => {
//   return (
//     <ScrollView>
//       <View style={styles.mainPage}>
//         <Image
//           style={[styles.userIcon, styles.iconLayout]}
//           contentFit="cover"
//           source={require("../assets/user.png")}
//         />
//         <Image
//           style={styles.iconfillType90}
//           contentFit="cover"
//           source={require("../assets/iconfill-type90.png")}
//         />
//         <View style={styles.newReqButten}>
//           <Image
//             style={[styles.containerIcon, styles.iconLayout]}
//             contentFit="cover"
//             source={require("../assets/container.png")}
//           />
//           <Image
//             style={[styles.iconcontentadd, styles.actionPosition]}
//             contentFit="cover"
//             source={require("../assets/iconcontentadd.png")}
//           />
//           <Text style={[styles.action, styles.actionPosition]}>요청 등록</Text>
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   iconLayout: {
//     maxHeight: "100%",
//     overflow: "hidden",
//     maxWidth: "100%",
//     position: "absolute",
//   },
//   actionPosition: {
//     top: "50%",
//     position: "absolute",
//   },
//   userIcon: {
//     height: "129.83%",
//     width: "94.88%",
//     top: "9.23%",
//     right: "2.56%",
//     bottom: "-39.06%",
//     left: "2.56%",
//   },
//   iconfillType90: {
//     width: "6.98%",
//     top: 46,
//     right: "8.14%",
//     left: "84.88%",
//     height: 30,
//     overflow: "hidden",
//     maxWidth: "100%",
//     position: "absolute",
//   },
//   containerIcon: {
//     top: -9,
//     right: -10,
//     bottom: -11,
//     left: -10,
//     borderRadius: 10,
//   },
//   iconcontentadd: {
//     marginTop: -12,
//     left: 12,
//     width: 24,
//     height: 24,
//     overflow: "hidden",
//   },
//   action: {
//     marginTop: -8,
//     left: 48,
//     fontSize: 16,
//     letterSpacing: 1,
//     lineHeight: 16,
//     textTransform: "uppercase",
//     fontWeight: "700",
//     fontFamily: FontFamily.robotoBold,
//     color: Color.whiteHighEmphasis,
//     textAlign: "center",
//     width: 82,
//   },
//   newReqButten: {
//     width: "34.88%",
//     right: "6.98%",
//     bottom: 12,
//     left: "58.14%",
//     height: 40,
//     position: "absolute",
//   },
//   mainPage: {
//     backgroundColor: "#f5f5f5",
//     flex: 1,
//     width: "100%",
//     height: 932,
//   },
// });

// export default MainPage;

