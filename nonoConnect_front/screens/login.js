import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';

const Login = ({ onLoginSuccess ,setUserNickname, navigation }) => {
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");

    const loginUser = async () => {
        const url = "http://192.168.0.26:8000/account/login";

        const loginData = {
            nickname: nickname,
            password: password,
        };

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });

            const data = await response.json();

            if(response.status === 200) {
                console.log("로그인 성공!");
                setUserNickname(loginData.nickname); 
                onLoginSuccess();
                navigation.navigate('MainPage');  
            } else {
                console.error("로그인 실패:", data.message);
                Alert.alert("로그인 실패", data.message);
            }
        } catch (error) {
            console.error("Error:", error);
            Alert.alert("오류 발생", "서버와의 통신 중 오류가 발생했습니다.");
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TextInput
                style={{ width: 200, height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
                placeholder="Nickname"
                onChangeText={text => setNickname(text)}
                value={nickname}
            />
            <TextInput
                style={{ width: 200, height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={text => setPassword(text)}
                value={password}
            />
            <Button title="로그인" onPress={loginUser} />
            <Button title="회원가입" onPress={() => navigation.navigate('SignUp')} />
        </View>
    );
}

export default Login;