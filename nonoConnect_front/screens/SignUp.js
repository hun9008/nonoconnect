import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';

const SignUp = ({navigation}) => {
    const [name, setName] = useState("");
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const signUpUser = async () => {
        const url = "http://192.168.0.26:8000/account/signup";

        const signUpData = {
            name: name,
            nickname: nickname,
            password: password,
            email: email,
            phone: phone
        };

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signUpData)
            });

            if(response.status === 200) {
                Alert.alert("회원가입 성공", "로그인 페이지로 이동합니다.");
                navigation.navigate('Login');
                // 여기서 로그인 페이지로 이동하거나 다른 작업을 수행할 수 있습니다.
            } else {
                const data = await response.json();
                Alert.alert("회원가입 실패", data.message);
            }
        } catch (error) {
            Alert.alert("오류 발생", "서버와의 통신 중 오류가 발생했습니다.");
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TextInput placeholder="Name" value={name} onChangeText={setName} style={{width: 200, height:30, textAlign:'left', borderBlockColor: 'black', borderWidth: 1, marginBottom: 10}} />
            <TextInput placeholder="Nickname" value={nickname} onChangeText={setNickname} style={{width: 200, height:30, textAlign:'left', borderBlockColor: 'black', borderWidth: 1, marginBottom: 10}}/>
            <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} style={{width: 200, height:30, textAlign:'left', borderBlockColor: 'black', borderWidth: 1, marginBottom: 10}}/>
            <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={{width: 200, height:30, textAlign:'left', borderBlockColor: 'black', borderWidth: 1, marginBottom: 10}}/>
            <TextInput placeholder="Phone" value={phone} onChangeText={setPhone} style={{width: 200, height:30, textAlign:'left', borderBlockColor: 'black', borderWidth: 1, marginBottom: 10}}/>
            <Button title="회원가입" onPress={signUpUser} />
        </View>
    );
}

export default SignUp;
