import * as React from 'react';
import { useState } from 'react';
import { Alert, Button, TextInput, View } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HOST } from '../App';

const Login = ({navigation}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        const data = {
            username: username,
            password: password
        };
        fetch(`${HOST}/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }).then((res) => {
            if (res.status == 200) {
              res.json().then((data) => {
                AsyncStorage.setItem("accessToken", data.accessToken);
                Alert.alert("Đăng nhập thành công");
                navigation.navigate("Home");
              });
            } else {
              Alert.alert("Sai tên đăng nhập hoặc mật khẩu");
            }
          });
    }

    return (
        <View>
            <Button 
                title="Home"
                onPress={() => {
                    navigation.navigate('Home');
                }}
            />
            <TextInput 
                placeholder='username'
                value={username}
                onChangeText={(newText) => setUsername(newText)}
            />
            <TextInput 
                placeholder='password'
                value={password}
                onChangeText={(newText) => setPassword(newText)}
            />
            <Button 
                title="Đăng nhập"
                onPress={handleLogin}
            />
        </View>
    )
}

export default Login;