import { StatusBar } from "expo-status-bar";
import {
  Alert,
  Button,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { FontAwesome6 } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlashList } from "@shopify/flash-list";

SplashScreen.preventAutoHideAsync();
const lgooPath = require("./assets/LOGO.png");
const LockImagePath = require("./assets/Lock.png");

export default function App() {
  // fonts
  const [loaded, error] = useFonts({
    lockerBold: require("./assets/fonts/LockerBold.ttf"),
    lockerLight: require("./assets/fonts/LockerLight.ttf"),
  });
  const [getHomeList, setHomeList] = useState([]);

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  useEffect(() => {
    async function LoadHomes() {
      let userJson = await AsyncStorage.getItem("user");
      let userObject = JSON.parse(userJson);

      let response = await fetch(
        process.env.EXPO_PUBLIC_URL +
          "/wlanlocker/LoadHomesData?user_id=" +
          userObject.id
      );

      if (response.ok) {
        let ResponseObject = await response.json();
        let jsonObject = ResponseObject.HomeArray;
        console.log(jsonObject);

        setHomeList(jsonObject);
      } else {
        Alert.alert("Something Worng, Please Try again later");
      }
    }
    LoadHomes();
  }, []);

  if (!loaded && !error) {
    return null;
  }

  return (
    <View style={stylessheet.container}>
      <View style={stylessheet.header}>
        <View style={stylessheet.mainHeader}>
          <View style={stylessheet.profileCover}>
            {/* Image */}
            <Image source={lgooPath} style={{ width: 80, height: 80 }} />
          </View>
          <View style={stylessheet.profileDetails}>
            <Text style={stylessheet.noramlText}> Welcome</Text>
            <Text style={stylessheet.WelcomeText}> Sanka Udeshika</Text>
          </View>
        </View>
      </View>
      <View style={stylessheet.body}>
        <LinearGradient
          colors={["black", "#1B1B1B"]}
          style={stylessheet.LockStatus}
        >
          <Image source={LockImagePath} style={{ width: 100, height: 100 }} />
          <Text style={stylessheet.WelcomeText}>Locked</Text>
        </LinearGradient>
      </View>
      <ScrollView style={stylessheet.scrolView}>
        <FlashList
          data={getHomeList}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                console.log(item.homeID);
              }}
            >
              <View style={stylessheet.homeRow}>
                <View style={stylessheet.imageCover}>
                  <Image source={lgooPath} style={stylessheet.HomeImage} />
                </View>
                <View style={stylessheet.HomeDetails}>
                  <Text style={stylessheet.HomeOwnerName}>{item.homeName}</Text>
                  <View style={stylessheet.HomeStatus}>
                    <View style={{ marginRight: 10 }}>
                      {item.homeLockStatus == 1 ? (
                        <Text
                          style={
                            item.homeLockStatus == 1
                              ? stylessheet.lockStatus
                              : stylessheet.NotlockStatus
                          }
                        >
                          Unlocked
                        </Text>
                      ) : (
                        <Text
                          style={
                            item.homeLockStatus == 1
                              ? stylessheet.lockStatus
                              : stylessheet.NotlockStatus
                          }
                        >
                          Locked
                        </Text>
                      )}
                    </View>
                    <View style={{ marginRight: 10, justifyContent: "center" }}>
                      <FontAwesome6
                        name="person"
                        style={{ color: "white", fontSize: 15 }}
                      />
                      <Text style={{ color: "white" }}>
                        {item.homeMemberCounter}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </Pressable>
          )}
          estimatedItemSize={200}
        />
      </ScrollView>
      <View style={stylessheet.navigation}>
        <Pressable style={stylessheet.mainPressableButton}>
          <Text style={stylessheet.WelcomeText}>Lock the Gate</Text>
        </Pressable>
      </View>
    </View>
  );
}

const stylessheet = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  header: {
    marginTop: 50,
  },
  mainHeader: {
    flexDirection: "row",
  },
  profileCover: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  profileDetails: {
    flex: 2,
    marginTop: 20,
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
  scrolView: {
    backgroundColor: "black",
  },
  homeRow: {
    flexDirection: "row",
    paddingStart: 20,
    marginTop: 20,
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
  },
  HomeOwnerName: {
    color: "white",
    fontSize: 20,
    fontFamily: "lockerBold",
  },
  HomeStatus: {
    flexDirection: "row",
    marginTop: 5,
  },
  NotlockStatus: {
    fontSize: 13,
    color: "lightgreen",
    textShadowColor: "lightgreen",
    textShadowOffset: { width: 2, height: 2 }, // 1st shadow
    textShadowRadius: 5,
    textShadowColor: "lightgreen",
    shadowOffset: { width: 3, height: 3 }, // 2nd shadow
    shadowRadius: 6,
    shadowColor: "lightgreen",
    shadowOffset: { width: 4, height: 5 }, // 3rd shadow
    shadowRadius: 6,
  },
  lockStatus: {
    fontSize: 13,
    color: "red",
    textShadowColor: "red",
    textShadowOffset: { width: 2, height: 2 }, // 1st shadow
    textShadowRadius: 5,
    textShadowColor: "red",
    shadowOffset: { width: 3, height: 3 }, // 2nd shadow
    shadowRadius: 6,
    shadowColor: "red",
    shadowOffset: { width: 4, height: 5 }, // 3rd shadow
    shadowRadius: 6,
  },
  LockStatus: {
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  navigation: {
    flex: 1,
    backgroundColor: "black",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
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
});
