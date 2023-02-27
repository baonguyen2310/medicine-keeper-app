import { View, Text, TouchableOpacity } from "react-native";

const days = [
  "Thứ hai",
  "Thứ ba",
  "Thứ tư",
  "Thứ năm",
  "Thứ sáu",
  "Thứ bảy",
  "Chủ nhật",
];
const colors = [
    "#4D455D",
    "#E96479",
    "#181D31",
    "#7DB9B6",
    "#F0A04B",
    "#183A1D",
    "#B08BBB"
]

const Calendar = () => {
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
          <View
            key={index}
            style={{
              width: 100,
              height: 100,
              backgroundColor: colors[index],
              margin: 10,
              justifyContent: "center"
            }}
          >
            <TouchableOpacity>
              <Text style={{
                textAlign: "center",
                fontSize: 24,
                color: "white",
              }}
              >
                {day}
            </Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

export default Calendar;
