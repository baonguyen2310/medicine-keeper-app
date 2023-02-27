import * as React from "react";
import { useState } from "react";
import { Alert, Button, TextInput, View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HOST } from "../App";

const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const data = {
      username: username,
      password: password,
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
  };

  return (
    <View
      style={{
        justifyContent: "center",
        height: "100%",
      }}
    >
      <View style={{ margin: 10 }}>
        <Text>Tài khoản:</Text>
        <TextInput
          placeholder="username"
          value={username}
          onChangeText={(newText) => setUsername(newText)}
          style={{ backgroundColor: "#fff", height: 50, fontSize: 16 }}
        />
      </View>
      <View style={{ margin: 10 }}>
        <Text>Mật khẩu:</Text>
        <TextInput
          placeholder="password"
          value={password}
          onChangeText={(newText) => setPassword(newText)}
          style={{ backgroundColor: "#fff", height: 50, fontSize: 16 }}
        />
      </View>
      <View style={{ margin: 10 }}>
        <Button title="Đăng nhập" onPress={handleLogin} />
      </View>
    </View>
  );
};

export default Login;
