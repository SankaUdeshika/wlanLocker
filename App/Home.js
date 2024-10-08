import { StatusBar } from "expo-status-bar";
import {
  Alert,
  Button,
  Pressable,
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
  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  useEffect(() => {
    async function LoadHomes() {
      let response = await fetch(
        process.env.EXPO_PUBLIC_URL + "/wlanlocker/LoadHomesData"
      );

      if (response.ok) {
        Alert.alert("OK");
      } else {
        Alert.alert("Something Worng, Please Try again later");
      }
    }
    LoadHomes();
  }, []);

  if (!loaded && error) {
    return null;
  }

  return (
    <View style={stylessheet.container}>
      <StatusBar style="hide" />
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
        <View style={stylessheet.ChatCategory}>
          <LinearGradient
            colors={["#1B1B1B", "black"]}
            style={stylessheet.LockStatus}
          >
            <View style={stylessheet.HomeList}>
              <View style={stylessheet.homeRow}>
                <View style={stylessheet.imageCover}>
                  <Image source={lgooPath} style={stylessheet.HomeImage} />
                </View>
                <View style={stylessheet.HomeDetails}>
                  <Text style={stylessheet.HomeOwnerName}>Tiron's Home</Text>
                  <View style={stylessheet.HomeStatus}>
                    <View style={{ marginRight: 10 }}>
                      <Text style={stylessheet.lockStatus}>Unlocked</Text>
                    </View>
                    <View style={{ marginRight: 10 }}>
                      <FontAwesome6
                        name="person"
                        style={{ color: "white", fontSize: 15 }}
                      />
                      <Text style={{ color: "white" }}>6</Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={stylessheet.homeRow}>
                <View style={stylessheet.imageCover}>
                  <Image source={lgooPath} style={stylessheet.HomeImage} />
                </View>
                <View style={stylessheet.HomeDetails}>
                  <Text style={stylessheet.HomeOwnerName}>Tiron's Home</Text>
                  <View style={stylessheet.HomeStatus}>
                    <View style={{ marginRight: 10 }}>
                      <Text style={stylessheet.lockStatus}>Unlocked</Text>
                    </View>
                    <View style={{ marginRight: 10 }}>
                      <FontAwesome6
                        name="person"
                        style={{ color: "white", fontSize: 15 }}
                      />
                      <Text style={{ color: "white" }}>6</Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={stylessheet.homeRow}>
                <View style={stylessheet.imageCover}>
                  <Image source={lgooPath} style={stylessheet.HomeImage} />
                </View>
                <View style={stylessheet.HomeDetails}>
                  <Text style={stylessheet.HomeOwnerName}>Tiron's Home</Text>
                  <View style={stylessheet.HomeStatus}>
                    <View style={{ marginRight: 10 }}>
                      <Text style={stylessheet.lockStatus}>Unlocked</Text>
                    </View>
                    <View style={{ marginRight: 10, justifyContent: "center" }}>
                      <FontAwesome6
                        name="person"
                        style={{ color: "white", fontSize: 15 }}
                      />
                      <Text style={{ color: "white" }}>6</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </LinearGradient>
        </View>
      </View>
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
    flex: 2,
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
  lockStatus: {
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
});
