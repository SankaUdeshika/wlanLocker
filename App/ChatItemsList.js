import { StatusBar } from "expo-status-bar";
import { Alert, Text, View, StyleSheet, Pressable } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

SplashScreen.preventAutoHideAsync();
const lgooPath = require("../assets/user.png");
const LockImagePath = require("../assets/1home.png");

export default function App() {
  const item = useLocalSearchParams();
  const [getChatBox, setChatBox] = useState([]);

  // Fonts
  const [loaded, error] = useFonts({
    lockerBold: require("../assets/fonts/LockerBold.ttf"),
    lockerLight: require("../assets/fonts/LockerLight.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  useEffect(() => {
    async function loadHomeChats() {
      try {
        let jsonuserObject = await AsyncStorage.getItem("user");
        let UserObject = JSON.parse(jsonuserObject);

        let response = await fetch(
          process.env.EXPO_PUBLIC_URL +
            "/wlanlocker/LoadHomesChats?homeID=" +
            item.homeID +
            "&loggedUser_id=" +
            UserObject.id
        );

        if (response.ok) {
          let chatResponse = await response.json();

          if (chatResponse.success) {
            // Set the chat array to state
            setChatBox(chatResponse.ChatArray);
            console.log("Chat data loaded:", chatResponse.ChatArray);
          } else {
            Alert.alert("Error", chatResponse.message);
          }
        } else {
          Alert.alert("Something went wrong, Please Try again later");
        }
      } catch (error) {
        console.log("Error fetching chat data:", error);
      }
    }

    loadHomeChats();
  }, []);

  if (!loaded && error) {
    return null;
  }

  return (
    <View style={stylessheet.container}>
      <StatusBar style="hide" backgroundColor="black" />
      <View style={stylessheet.body}>
        <LinearGradient
          colors={["black", "#1B1B1B"]}
          style={stylessheet.LockStatus}
        >
          <Image source={LockImagePath} style={{ width: 100, height: 100 }} />
          <Text style={stylessheet.WelcomeText}>{item.homeName} Members</Text>
          {getChatBox.map((chatItem, index) => (
            <Pressable
              onPress={() => {
                router.push({pathname:"/ChatFrame", params:chatItem});
                // console.log(chatItem.user_ID);
              }}
            >
              <View key={index} style={stylessheet.homeRow}>
                <View style={stylessheet.imageCover}>
                  <Image source={lgooPath} style={stylessheet.HomeImage} />
                </View>
                <View style={stylessheet.HomeDetails}>
                  <Text style={stylessheet.ChatName}>{chatItem.userName}</Text>
                  <View style={stylessheet.HomeStatus}>
                    <Text style={stylessheet.lockStatus}>
                      {chatItem.lastMessage}
                    </Text>
                  </View>
                  <View style={stylessheet.chatDate}>
                    <Text style={{ color: "gray" }}>{chatItem.dateTime}</Text>
                  </View>
                </View>
              </View>
            </Pressable>
          ))}
        </LinearGradient>
      </View>
    </View>
  );
}

const stylessheet = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  header: {
    flex: 1,
    width: "100%",
  },
  body: {
    flex: 4,
    backgroundColor: "white",
    width: "100%",
    flexDirection: "column",
  },
  navigation: {
    flex: 1,
    backgroundColor: "black",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  mainHeader: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  profileCover: {
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  profileDetails: {
    width: "100%",
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  WelcomeText: {
    justifyContent: "center",
    alignSelf: "center",
    color: "white",
    fontSize: 25,
    fontFamily: "lockerBold",
  },
  noramlText: {
    justifyContent: "center",
    alignSelf: "center",
    color: "white",
    fontSize: 14,
    fontFamily: "lockerLight",
  },
  LockStatus: {
    backgroundColor: "yellow",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  ChatCategory: {
    backgroundColor: "red",
    flex: 1,
  },
  LinearGradientView: {
    width: "100%",
    height: "100%",
  },
  mainPressableButton: {
    width: "60%",
    height: 50,
    paddingLeft: 50,
    paddingRight: 50,
    borderRadius: 10,
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "white",
  },
  HomeList: {
    width: "100%",
    flexDirection: "column",
  },
  homeRow: {
    width: "100%",
    flexDirection: "row",
    paddingStart: 20,
    marginTop: 25,
  },
  imageCover: {
    backgroundColor: "white",
    borderRadius: 40,
  },
  HomeImage: {
    width: 80,
    height: 80,
  },
  HomeDetails: {
    flexDirection: "column",
    paddingLeft: 20,
    width: "75%",
  },
  ChatName: {
    color: "white",
    fontSize: 25,
    fontFamily: "lockerLight",
  },
  HomeStatus: {
    flexDirection: "row",
    marginTop: 5,
  },
  lockStatus: {
    fontSize: 15,
    color: "white",
    textShadowColor: "white",
    textShadowOffset: { width: 2, height: 2 }, // 1st shadow
    textShadowRadius: 5,
    textShadowColor: "white",
    shadowOffset: { width: 3, height: 3 }, // 2nd shadow
    shadowRadius: 6,
    shadowColor: "white",
    shadowOffset: { width: 4, height: 5 }, // 3rd shadow
    shadowRadius: 6,
  },
  chatDate: {
    alignSelf: "flex-end",
  },
});
