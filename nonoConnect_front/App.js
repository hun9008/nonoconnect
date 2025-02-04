// const Stack = createNativeStackNavigator();
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import {useState} from 'react';
import MainPage from "./screens/MainPage";
import Login from "./screens/login";
import SignUp from "./screens/SignUp";

// import RequestPopup from './screens/RequestPopup';
// import RequestAdd from './screens/RequestAdd';



const Stack = createNativeStackNavigator();

// import { createNativeStackNavigator } from "@react-navigation/native-stack";

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);  // State to manage login
  const [nickname, setNickname] = useState("");
  const [hideSplashScreen, setHideSplashScreen] = React.useState(true);
  const [fontsLoaded, error] = useFonts({
    "Roboto-Bold": require("./assets/fonts/NotoSansKR-Bold.ttf"),
  });

  if (!fontsLoaded && !error) {
    return null;
  }

  const handleLoginSuccess = () => {
      setIsLoggedIn(true);
  }


  return (
    <>
    
    <NavigationContainer>
        <Stack.Navigator initialRouteName={isLoggedIn ? "MainPage" : "Login"}>
            <Stack.Screen name="Login" options={{ headerShown: false }}>
                {(props) => <Login {...props} onLoginSuccess={handleLoginSuccess} setUserNickname={setNickname} />}
            </Stack.Screen>
            <Stack.Screen name="SignUp" component={SignUp} options={{ title: '회원가입' }} />
            <Stack.Screen name="MainPage" component={MainPage} initialParams={{ nickname: nickname }} />
        </Stack.Navigator>
    </NavigationContainer>


    

    </>
    
  );
};
export default App;

/* <ScrollView style={styles.container}>
<View style={styles.textContainer}>
<Text style= fstyles.textstyle) > 영역을 충분히 갖는 텍스트 입니다! </Text>
</View>
<View style=<styles.textContainer}>
<Text style= (styles.textStyle)>영역을 충분히 갖는 텍스트 입니다! </Text>
</View>
<View style= {styles.textContainer}>
<Text style={styles.textStyle} >영역을 충분히 갖는 텍스트 입니다!</Text>
</View>
<View style={styles.textContainer} >
<Text style={styles. textStyle )> 영역을 충분히 갖는 텍스트 입니다!</Text>
</View>
MICA ETWEET192. CNCS Te) 활력을 충분히 갖는 텍스트 입니다 S Text.
</View>
<View style={styles.textContainer}>
<Text style=<styles.textStyle)>영역을 충분히 갖는 텍스트 입니다! </Text>
</View>
<View style={styles.textContainer}>
<Text style= (styles. textStyle )> 영역을 충분히 갖는 텍스트 입니다! </Text>
</View>
</ScrollView>
*/