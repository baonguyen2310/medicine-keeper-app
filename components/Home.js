import * as React from "react";
import { Button, View, Text, Switch, Alert, Platform } from "react-native";
import { Audio } from 'expo-av';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useState, useEffect, useRef } from "react";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { HOST } from "../App";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Đã quá 5 phút mà người bệnh chưa uống thuốc",
      body: 'Hãy nhắc nhở người thân của bạn uống thuốc',
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}

let accessToken;

const Home = ({ navigation }) => {
  const [alarm1, setAlarm1] = useState(new Date());
  const [alarm2, setAlarm2] = useState(new Date());
  const [alarm3, setAlarm3] = useState(new Date());
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [isTook1, setIsTook1] = useState(false);
  const [isTook2, setIsTook2] = useState(false);
  const [isTook3, setIsTook3] = useState(false);
  
  //Refresh
  const [isRefresh, setIsRefresh] = useState(false);
  
  const handleRefresh = async () => {
    accessToken = await AsyncStorage.getItem("accessToken");
    setIsRefresh((prev) => !prev);
  }

  //Notification
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const handleSwitch1 = async () => {
    setChecked1(!checked1);
    const newChecked1 = !checked1; //dùng biến tạm vì checked1 vẫn chưa chắc được set
    const data = {
      checked1: newChecked1,
      checked2: checked2,
      checked3: checked3,
      alarm1: alarm1,
      alarm2: alarm2,
      alarm3: alarm3,
    };
    console.log(data);
    const accessToken = await AsyncStorage.getItem("accessToken");

    fetch(`${HOST}/alarm`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    });
  };

  const handleSwitch2 = async () => {
    setChecked2(!checked2);
    const newChecked2 = !checked2; //dùng biến tạm vì checked1 vẫn chưa chắc được set
    const data = {
      checked1: checked1,
      checked2: newChecked2,
      checked3: checked3,
      alarm1: alarm1,
      alarm2: alarm2,
      alarm3: alarm3,
    };
    console.log(data);
    const accessToken = await AsyncStorage.getItem("accessToken");

    fetch(`${HOST}/alarm`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    });
  };

  const handleSwitch3 = async () => {
    setChecked3(!checked3);
    const newChecked3 = !checked3; //dùng biến tạm vì checked1 vẫn chưa chắc được set
    const data = {
      checked1: checked1,
      checked2: checked2,
      checked3: newChecked3,
      alarm1: alarm1,
      alarm2: alarm2,
      alarm3: alarm3,
    };
    console.log(data);
    const accessToken = await AsyncStorage.getItem("accessToken");

    fetch(`${HOST}/alarm`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    });
  };

  const handleAlarm = (event, selectedDate, alarm) => {
    if (alarm == "alarm1") {
      setAlarm1(selectedDate);
      setChecked1(false);
    } else if (alarm == "alarm2") {
      setAlarm2(selectedDate);
      setChecked2(false);
    } else {
      setAlarm3(selectedDate);
      setChecked3(false);
    }
  };

  const showMode = (currentMode, alarm) => {
    let value;
    if (alarm == "alarm1") {
      value = alarm1;
    } else if (alarm == "alarm2") {
      value = alarm2;
    } else {
      value = alarm3;
    }

    DateTimePickerAndroid.open({
      value: value,
      onChange: (event, selectedDate) =>
        handleAlarm(event, selectedDate, alarm),
      mode: currentMode,
      is24Hour: false,
    });
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = (alarm) => {
    showMode("time", alarm);
  };

  //Mỗi lần mở ứng dụng lên sẽ cập nhật giờ lần đầu
  //Trong khi sử dụng ứng dụng thì sẽ dùng socket để đồng bộ: lười
  //hoặc button đồng bộ
  //dùng useContext thì tốt hơn: lười
  //phát thông báo nền: lười
  useEffect(() => {
    //const accessToken = AsyncStorage.getItem("accessToken");
    console.log(accessToken)
    let timer1IsTook;
    let timer2IsTook;
    let timer3IsTook;
    fetch(`${HOST}/alarm`, {
        headers: {Authorization: `Bearer ${accessToken}`}
    })
        .then(res => res.json())
        .then((data) => {
            data.alarm1 = new Date(data.alarm1);
            data.alarm2 = new Date(data.alarm2);
            data.alarm3 = new Date(data.alarm3);
            const date = new Date();

            setAlarm1(data.alarm1);
            setAlarm2(data.alarm2);
            setAlarm3(data.alarm3);
            setChecked1(data.checked1);
            setChecked2(data.checked2);
            setChecked3(data.checked3);
            setIsTook1(data.isTook1);
            setIsTook2(data.isTook2);
            setIsTook3(data.isTook3);
            
            let offset1 = data.alarm1.getHours() - date.getHours() + data.alarm1.getMinutes()/60 - date.getMinutes()/60;
            let offset2 = data.alarm2.getHours() - date.getHours() + data.alarm2.getMinutes()/60 - date.getMinutes()/60;
            let offset3 = data.alarm3.getHours() - date.getHours() + data.alarm3.getMinutes()/60 - date.getMinutes()/60;
            if (offset1 < 0){
                offset1 += 1440 //cộng thêm 24 tiếng = 24*60 phút
            }
            if (offset2 < 0){
                offset2 += 1440 //cộng thêm 24 tiếng = 24*60 phút
            }
            if (offset3 < 0){
                offset3 += 1440 //cộng thêm 24 tiếng = 24*60 phút
            }
            timer1IsTook = setTimeout(() => {
                fetch(`${HOST}/alarm`, {
                    headers: {Authorization: `Bearer ${accessToken}`}
                })
                    .then(res => res.json())
                    .then((data) => {
                        if (data.checked1 == true && data.isTook1 == false) {
                          Alert.alert("Đã quá 5 phút chưa uống thuốc");
                          schedulePushNotification();
                        }
                    })
            }, offset1*60*1000 + 2*60*1000);
            timer2IsTook = setTimeout(() => {
                fetch(`${HOST}/alarm`, {
                    headers: {Authorization: `Bearer ${accessToken}`}
                })
                    .then(res => res.json())
                    .then((data) => {
                        if (data.checked2 == true && data.isTook2 == false) {
                          Alert.alert("Đã quá 5 phút chưa uống thuốc");
                          schedulePushNotification();
                        }
                    })
            }, offset2*60*1000 + 5*60*1000);
            timer3IsTook = setTimeout(() => {
                fetch(`${HOST}/alarm`, {
                    headers: {Authorization: `Bearer ${accessToken}`}
                })
                    .then(res => res.json())
                    .then((data) => {
                        if (data.checked3 == true && data.isTook3 == false) {
                          Alert.alert("Đã quá 5 phút chưa uống thuốc");
                          schedulePushNotification();
                        }
                    })
            }, offset3*60*1000 + 5*60*1000);
        })
    return () => {
        clearTimeout(timer1IsTook);
        clearTimeout(timer2IsTook);
        clearTimeout(timer3IsTook);
    }
}, [isRefresh])

  return (
    <View>
      <Text>Hộp thuốc hẹn giờ</Text>
      <Button
        title="Đăng nhập"
        onPress={() => {
          navigation.navigate("Login");
        }}
      />
      <Button
        title="Đăng ký"
        onPress={() => {
          navigation.navigate("Register");
        }}
      />
      {/* <Button onPress={showDatepicker} title="Show date picker!" /> */}
      {/* Morning */}
      <View
        style={{
          flexDirection: "row",
          margin: 2,
        }}
      >
        <View style={{ width: "60%" }}>
          <Button
            onPress={() => showTimepicker("alarm1")}
            title="Hẹn giờ buổi sáng"
          />
        </View>
        <View style={{ width: "20%" }}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            {alarm1.getHours()} : {alarm1.getMinutes()}
          </Text>
        </View>
        <View style={{ width: "20%" }}>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            onValueChange={handleSwitch1}
            value={checked1}
          />
        </View>
      </View>
      {/* Afternoon */}
      <View
        style={{
          flexDirection: "row",
          margin: 2,
        }}
      >
        <View style={{ width: "60%" }}>
          <Button
            onPress={() => showTimepicker("alarm2")}
            title="Hẹn giờ buổi chiều"
          />
        </View>
        <View style={{ width: "20%" }}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            {alarm2.getHours()} : {alarm2.getMinutes()}
          </Text>
        </View>
        <View style={{ width: "20%" }}>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            onValueChange={handleSwitch2}
            value={checked2}
          />
        </View>
      </View>
      {/* Evening */}
      <View
        style={{
          flexDirection: "row",
          margin: 2,
        }}
      >
        <View style={{ width: "60%" }}>
          <Button
            onPress={() => showTimepicker("alarm3")}
            title="Hẹn giờ buổi tối"
          />
        </View>
        <View style={{ width: "20%" }}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            {alarm3.getHours()} : {alarm3.getMinutes()}
          </Text>
        </View>
        <View style={{ width: "20%" }}>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            onValueChange={handleSwitch3}
            value={checked3}
          />
        </View>
      </View>
      <Button
        title="Refresh"
        onPress={handleRefresh}
      />
      <Button
        title="Press to schedule a notification"
        onPress={async () => {
          await schedulePushNotification();
        }}
      />
    </View>
  );
};

export default Home;
