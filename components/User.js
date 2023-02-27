import { Button, View, Text } from "react-native";

const User = ({ navigation }) => {
  return (
    <View
      style={{
        justifyContent: "center",
        height: "100%",
      }}
    >
      <View style={{margin: 10}}>
        <Button
          title="Đăng nhập"
          onPress={() => {
            navigation.navigate("Login");
          }}
        />
      </View>
      <View style={{margin: 10}}>
        <Button
          title="Đăng ký"
          onPress={() => {
            navigation.navigate("Register");
          }}
        />
      </View>
    </View>
  );
};

export default User;
