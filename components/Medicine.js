import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Medicine = () => {
  return (
    <View
      style={{
        justifyContent: "center",
        height: "100%",
        alignItems:"center"
      }}
    >
        <Text style={{fontSize: 24}}>Thêm đơn thuốc</Text>
      <TouchableOpacity>
        <Ionicons name="add-circle" size={56} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default Medicine;
