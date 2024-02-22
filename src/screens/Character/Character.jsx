import React from "react";
import {
  View,
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  Dimensions,
  ScrollView,
} from "react-native";
import { singleCharacter } from "../../constants/singleCharacter";

const Character = ({ route, navigation }) => {
  const id = route?.params?.id;
  const data = singleCharacter.data;
  const width =  Dimensions.get("window").width;
  const height =  Dimensions.get("window").height;

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <SafeAreaView style={{ flex: 1 }}>
        {/* Background image */}
        <Image
          source={{ uri: data.Character.image.large }}
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            objectFit: "cover",
            flex: 1,
            width: width,
            height: height,
          }}
        />

        {/* Container for details */}
        <View
          style={{
            flex:1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View style={{
            alignItems:"center",
            backgroundColor: "white",
                borderRadius: 10,
                padding:10,
                height:height*0.8,
                width:width*0.8
          }} >
            <Image
              source={{ uri: data.Character.image.large }}
              style={{
                height: height * 0.2,
                width: width * 0.4,
                borderRadius: 70,
              }}
            />
            <View
              style={{
                alignItems:"center",
                justifyContent:"center",
                height:height*0.6,
                padding:10,
                width:width*0.8
              }}
            >
              <Text
                style={{
                  color: "black",
                  fontWeight: "bold",
                  fontSize: 20,
                  marginTop: 5,
                  padding:2
                }}
              >
                {data.Character.name.first} {data.Character.name.last}
              </Text>
              <ScrollView showsVerticalScrollIndicator={false} >
                <Text style={{
                    color:"black",
                    fontSize:16,
                }} >
                    {data.Character.description}
                </Text>
              </ScrollView>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Character;
