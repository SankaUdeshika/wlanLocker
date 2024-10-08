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
import AsyncStorage from "@react-native-async-storage/async-storage";

SplashScreen.preventAutoHideAsync();
const lgooPath = require("./assets/LOGO.png");
export default function App() {
  // fonts
  const [loaded, error] = useFonts({
    lockerBold: require("./assets/fonts/LockerBold.ttf"),
    lockerLights: require("./assets/fonts/LockerLight.ttf"),
  });

  const [getEmail, setEmail] = useState("");
  const [getpassword, setpassword] = useState("");

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && error) {
    return null;
  }

  return (
    <View style={stylessheet.container}>
      <StatusBar style="hide" />
      <View style={stylessheet.view1}>
        <Image source={lgooPath} style={stylessheet.LogoImage} />
        <Text style={stylessheet.LogoText}>OurWlanLocker</Text>
      </View>

      {/* SignIN */}
      <View style={stylessheet.view2}>
        <Text style={stylessheet.normalText}>
          If You Have a Account,Please Sign in Here
        </Text>
        <View style={stylessheet.view3}>
          <Text style={stylessheet.LableText}>Email</Text>
          <TextInput
            style={stylessheet.TextInput}
            placeholder="Email"
            inputMode="email"
            onChangeText={(text) => {
              setEmail(text);
            }}
          />
        </View>
        <View style={stylessheet.view3}>
          <Text style={stylessheet.LableText}>password</Text>
          <TextInput
            style={stylessheet.TextInput}
            inputMode="password"
            secureTextEntry={true}
            onChangeText={(text) => {
              setpassword(text);
            }}
          />
        </View>
        <View style={stylessheet.view3}>
          <Pressable
            style={stylessheet.mainPressableButton}
            onPress={async () => {
              let response = await fetch(
                process.env.EXPO_PUBLIC_URL + "/wlanlocker/Signin",
                {
                  method: "POST",
                  body: JSON.stringify({
                    email: getEmail,
                    password: getpassword,
                  }),
                }
              );

              if (response.ok) {
                let jsonObject = await response.json();
                if (jsonObject.success) {
                  let user = jsonObject.user;
                  await AsyncStorage.setItem("user", JSON.stringify(user));
                  Alert.alert("SignIn",jsonObject.message);
                }
              } else {
                Alert.alert("Something Wrong Please Try again later");
              }
            }}
          >
            <Text style={stylessheet.buttonText}>LoGiN</Text>
          </Pressable>
        </View>
        <Pressable>
          <Text style={stylessheet.normalText}>Or? Create Account</Text>
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
  },
  view1: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  view2: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    rowGap: 20,
  },
  view3: {
    width: "100%",
  },
  LogoImage: {
    width: 100,
    height: 100,
  },
  LogoText: {
    justifyContent: "center",
    alignSelf: "center",
    color: "white",
    fontSize: 50,
    fontFamily: "lockerBold",
  },
  normalText: {
    width: "100%",
    color: "white",
    fontSize: 15,
    fontFamily: "lockerLights",
  },
  TextInput: {
    width: 350,
    height: 50,
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 50,
    paddingLeft: 20,
    borderColor: "white",
    color: "white",
  },
  LableText: {
    color: "white",
    paddingLeft: 30,
    fontSize: 20,
  },
  buttonText: {
    width: "100%",
    color: "white",
    fontSize: 30,
    fontFamily: "lockerBold",
  },
  mainPressableButton: {
    backgroundColor: "#1B1B1B",
    width: "100%",
    height: 50,
    paddingLeft: 50,
    paddingRight: 50,
    borderRadius: 10,
  },
});
