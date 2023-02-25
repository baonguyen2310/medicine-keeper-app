import * as React from "react";
import { useState } from "react";
import { Alert, Button, TextInput, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HOST } from "../App";

const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [ESPCODE, setESPCODE] = useState("");

  const handleLogin = () => {
    const data = {
      username: username,
      password: password,
      ESPCODE: ESPCODE,
    };
    fetch(`${HOST}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.status == 200) {
        Alert.alert("Đăng ký thành công");
        navigation.navigate("Login");
      } else {
        Alert.alert("Tên đăng nhập hoặc ESPCODE đã được sử dụng");
      }
    });
  };

  return (
    <View>
      <Button
        title="Home"
        onPress={() => {
          navigation.navigate("Home");
        }}
      />
      <TextInput
        placeholder="username"
        value={username}
        onChangeText={(newText) => setUsername(newText)}
      />
      <TextInput
        placeholder="password"
        value={password}
        onChangeText={(newText) => setPassword(newText)}
      />
      <TextInput
        placeholder="ESPCODE"
        value={ESPCODE}
        onChangeText={(newText) => setESPCODE(newText)}
      />
      <Button title="Đăng ký" onPress={handleLogin} />
    </View>
  );
};

export default Login;
