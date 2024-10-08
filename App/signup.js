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
import { Picker } from "@react-native-picker/picker";
import { Link, router } from "expo-router";

SplashScreen.preventAutoHideAsync();
const lgooPath = require("../assets/LOGO.png");
export default function App() {
  // fonts
  const [loaded, error] = useFonts({
    lockerBold: require("../assets/fonts/LockerBold.ttf"),
    lockerLight: require("../assets/fonts/LockerLight.ttf"),
  });
  const [getEmail, setEmail] = useState("");
  const [getName, setName] = useState("");
  const [getMobile, setMobile] = useState("");
  const [getPassword, setPassword] = useState("");
  const [getHome, SetHome] = useState("0");
  const [getselectHome, setSeelctHome] = useState("");

  const [getHomeList, setHomeList] = useState([]);

  useEffect(() => {
    async function FetchHomeData() {
      let response = await fetch(
        process.env.EXPO_PUBLIC_URL + "/wlanlocker/LoadHomeList"
      );
      if (response.ok) {
        let json = await response.json();
        if (json.success) {
          let HomeArray = json.homeArray;
          setHomeList(HomeArray);
        } else {
          Alert.alert("Somethign Wrong Please try again later");
        }
      }
    }
    FetchHomeData();
  }, []);

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
      <StatusBar style="hide" backgroundColor="black" />
      <View style={stylessheet.view1}>
        <Image source={lgooPath} style={stylessheet.LogoImage} />
        <Text style={stylessheet.LogoText}>OurWlanLocker</Text>
      </View>

      {/* SignIN */}
      <View style={stylessheet.view2}>
        <Text style={stylessheet.normalText}>Create Your Account</Text>
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
          <Text style={stylessheet.LableText}>Name</Text>
          <TextInput
            style={stylessheet.TextInput}
            inputMode="text"
            onChangeText={(text) => {
              setName(text);
            }}
          />
        </View>
        <View style={stylessheet.view3}>
          <Text style={stylessheet.LableText}>Mobile</Text>
          <TextInput
            style={stylessheet.TextInput}
            inputMode="mobile"
            onChangeText={(text) => {
              setMobile(text);
            }}
          />
        </View>
        <View style={stylessheet.view3}>
          <Text style={stylessheet.LableText}>Password</Text>
          <TextInput
            style={stylessheet.TextInput}
            inputMode="password"
            onChangeText={(text) => {
              setPassword(text);
            }}
          />
        </View>
        <View style={stylessheet.view3}>
          <Picker
            selectedValue={getHome}
            style={stylessheet.HomePicker}
            onValueChange={(itemValue) => SetHome(itemValue)}
          >
            {getHomeList.map((home, index) => {
              return (
                <Picker.Item
                  key={index}
                  label={home.homeName}
                  value={home.id}
                />
              );
            })}
          </Picker>
        </View>
        <View style={stylessheet.view3}>
          <Pressable style={stylessheet.mainPressableButton}>
            <Text
              style={stylessheet.buttonText}
              onPress={async () => {
                let response = await fetch(
                  process.env.EXPO_PUBLIC_URL + "/wlanlocker/SignUp",
                  {
                    method: "POST",
                    body: JSON.stringify({
                      email: getEmail,
                      name: getName,
                      mobile: getMobile,
                      password: getPassword,
                      home_id: getHome,
                    }),
                  }
                );
                if (response.ok) {
                  let jsonResponse = await response.json();
                  console.log(jsonResponse.message);
                  if (jsonResponse.success) {
                    Alert.alert("Success", jsonResponse.message);
                  } else {
                    Alert.alert("Error", jsonResponse.message);
                  }
                } else {
                  Alert.alert("NO");
                }
              }}
            >
              SiGnUp
            </Text>
          </Pressable>
        </View>
        <Pressable
          onPress={() => {
            router.back("/index");
          }}
        >
          <Text style={stylessheet.normalText2}>
            Already Have Account? Signin
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const stylessheet = StyleSheet.create({
  container: {
    flex: 2,
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
    fontSize: 35,
    fontFamily: "lockerLight",
  },
  normalText2: {
    width: "100%",
    color: "white",
    fontSize: 15,
    fontFamily: "lockerLight",
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
  HomePicker: {
    width: 350,
    height: 50,
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 50,
    paddingLeft: 20,
    borderColor: "white",
    color: "white",
    backgroundColor: "#1B1B1B",
  },
});
