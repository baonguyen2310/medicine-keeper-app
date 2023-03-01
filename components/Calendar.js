import { View, Text, TouchableOpacity } from "react-native";

const days = [
  "Thứ hai",
  "Thứ ba",
  "Thứ tư",
  "Thứ năm",
  "Thứ sáu",
  "Thứ bảy",
  "Chủ nhật",
  "Mỗi ngày"
];
const colors = [
  "#5e5473",
  "#E96479",
  "#5dd1e3",
  "#7DB9B6",
  "#eda65a",
  "#85c78f",
  "#B08BBB",
  "#F0A04B"
];

const Calendar = ({ navigation }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        height: "100%",
        alignContent: "center",
      }}
    >
      {days.map((day, index) => {
        return (
          <TouchableOpacity key={index} onPress={ () => { navigation.navigate("Home", {day: day, color: colors[index]}) } }>
            <View
              style={{
                width: 100,
                height: 100,
                backgroundColor: colors[index],
                margin: 10,
                justifyContent: "center",
                borderRadius: 5,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 24,
                  color: "white",
                }}
              >
                {day}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Calendar;
