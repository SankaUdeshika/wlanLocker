import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import {
  StatusBar,
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { sortRoutes } from "expo-router/build/sortRoutes";

SplashScreen.preventAutoHideAsync();
export default function chat() {
  // get params
  const item = useLocalSearchParams();
  //   console.log(parameters.other_user_id);

  // sotre ChatArray
  const [getChatArray, setChatArray] = useState([]);

  //   to store chat Word
  const [getChatText, setChatText] = useState("");

  const [loaded, error] = useFonts({
    // fontBold: require("../assets/fonts/NotoSansTC-Bold.ttf"),
    // fontlight: require("../assets/fonts/NotoSansTC-Light.ttf"),
    // fontsans: require("../assets/fonts/NotoSansTC-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  // fetch Chat Array from server
  useEffect(() => {
    async function fetchChatArray() {
      let userJson = await AsyncStorage.getItem("user");
      let user = JSON.parse(userJson);
      let response = await fetch(
        process.env.EXPO_PUBLIC_URL +
          "//wlanlocker/LoadConversations?logged_user_id=" +
          user.id +
          "&other_user_id=" +
          item.user_ID
      );
      if (response.ok) {
        let chatArray = await response.json();
        // console.log(chatArray);
        setChatArray(chatArray);
      }
    }
    fetchChatArray();
    setInterval(() => {
      fetchChatArray();
    }, 5000);
  }, []);

  if (!loaded && error) {
    return null;
  }

  return (
    <LinearGradient colors={["black", "gray"]} style={stylesheet.view1}>
      <StatusBar hidden={true} />
      <View style={stylesheet.view2}>
        <View>
          <Text style={stylesheet.text2}>{item.other_user_name}</Text>
          <Text style={stylesheet.text3}>
            {item.other_user_status == 1 ? "Online" : "Offline"}
          </Text>
        </View>
      </View>

      <View style={stylesheet.center_View}>
        <FlashList
          data={getChatArray}
          renderItem={({ item }) => (
            <View
              style={
                item.side == "right" ? stylesheet.view5_1 : stylesheet.view5_2
              }
            >
              <Text style={stylesheet.text3}>{item.message}</Text>
              <View style={stylesheet.view6}>
                <Text style={stylesheet.text4}>{item.datetime}</Text>
                {item.side == "right" ? (
                  <FontAwesome6
                    color={item.status == 1 ? "green" : "red"}
                    size={20}
                    name={"check"}
                  />
                ) : null}
              </View>
            </View>
          )}
          estimatedItemSize={200}
        />
      </View>
      <View style={stylesheet.view7}>
        <TextInput
          style={stylesheet.input1}
          placeholder="Type your message"
          value={getChatText}
          onChangeText={(text) => {
            setChatText(text);
          }}
        />
        <Pressable
          style={stylesheet.pressable1}
          onPress={async () => {
            if (getChatText.length == 0) {
              Alert.alert("Error", "Please Enter Your Message");
            } else {
              let userJson = await AsyncStorage.getItem("user");
              let user = JSON.parse(userJson);

              console.log(item.user_ID);

              let response = await fetch(
                process.env.EXPO_PUBLIC_URL +
                  "/wlanlocker//SendMessage?logged_user_id=" +
                  user.id +
                  "&other_user_id=" +
                  item.user_ID +
                  "&message=" +
                  getChatText
              );

              if (response.ok) {
                let json = await response.json();

                if (json.success) {
                  console.log("Message sent");
                  setChatText("");
                }
              }
            }
          }}
        >
          <FontAwesome6 color={"white"} size={20} name={"paper-plane"} />
        </Pressable>
      </View>
    </LinearGradient>
  );
}

const stylesheet = StyleSheet.create({
  view1: {
    flex: 1,
  },
  view2: {
    marginTop: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    columnGap: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  view3: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "dashed",
    borderColor: "red",
    borderWidth: 2,
    backgroundColor: "white",
  },
  view5_1: {
    backgroundColor: "white",
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 15,
    padding: 10,
    justifyContent: "center",
    alignSelf: "flex-end",
    rowGap: 5,
    width: "auto",
  },
  view5_2: {
    backgroundColor: "white",
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 15,
    padding: 10,
    justifyContent: "center",
    alignSelf: "flex-start",
    rowGap: 5,
    width: "auto",
  },
  image1: {
    width: 70,
    height: 70,
    borderRadius: 25,
  },
  text1: {
    fontSize: 50,
  },
  text2: {
    fontSize: 22,
    color: "white",
  },
  text3: {
    fontSize: 16,
    color: "Black",
    fontWeight: "bold",
  },
  view6: {
    flexDirection: "row",
    columnGap: 10,
  },
  text4: {
    fontSize: 14,
  },

  view7: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    columnGap: 10,
    paddingHorizontal: 20,
    margin: 10,
    justifyContent: "flex-end",
  },
  input1: {
    height: 30,
    borderRadius: 10,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "white",
    fontSize: 20,
    flex: 1,
    paddingStart: 10,
    fontWeight: "bold",
  },
  pressable1: {
    backgroundColor: "lightblue",
    borderRadius: 15,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  center_View: {
    flex: 1,
  },
});
