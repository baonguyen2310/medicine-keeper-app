import { View, Text, TouchableOpacity, TextInput, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRef } from "react";

const Medicine = () => {
  const modalRef = useRef();

  const handlePlus = () => {
    modalRef.current.setNativeProps({ transform: [{ scale: 1 }] });
  };

  const handleAdd = () => {
    modalRef.current.setNativeProps({ transform: [{ scale: 0 }] });
  };

  return (
    <View
      style={{
        justifyContent: "center",
        height: "100%",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 24 }}>Thêm đơn thuốc</Text>
      <TouchableOpacity
        onPress={() => {
          handlePlus();
        }}
      >
        <Ionicons name="add-circle" size={56} color="black" />
      </TouchableOpacity>
      <View ref={modalRef} style={{ backgroundColor: "white", transform: [{ scale: 0 }] }}>
        <View style={{ margin: 10, flexDirection: "row", alignItems: "center" }}>
          <Text>Tên thuốc: </Text>
          <TextInput
            placeholder="Tên thuốc"
            style={{ backgroundColor: "#fff", height: 50, fontSize: 16, width: "70%" }}
          />
        </View>
        <View style={{ margin: 10, flexDirection: "row", alignItems: "center" }}>
          <Text>Liều lượng: </Text>
          <TextInput
            placeholder="mg/lần"
            style={{ backgroundColor: "#fff", height: 50, fontSize: 16, width: "70%" }}
          />
        </View>
        <View style={{ margin: 10, flexDirection: "row", alignItems: "center" }}>
          <Text>Buổi: </Text>
          <TextInput
            placeholder="sáng/chiều/tối"
            style={{ backgroundColor: "#fff", height: 50, fontSize: 16, width: "70%" }}
          />
        </View>
        <View style={{ margin: 10 }}>
          <Button title="Thêm" onPress={() => {handleAdd()}} />
        </View>
      </View>
    </View>
  );
};

export default Medicine;
