import React from "react";
import {
  ScrollView,
  Image,
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const MainCharacters = ({ characters }) => {
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const dynamicstyles = styles(width,height);
  const navigation = useNavigation();
  return (
    <View
      style={{
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        backgroundColor:"white"
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        Main Characters
      </Text>
      <ScrollView horizontal>
        {characters?.nodes?.map((character, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                navigation.navigate("Character", {
                  id: character?.id,
                });
              }}
            >
              <View style={dynamicstyles.CharacterCard}>
                <Image
                  style={dynamicstyles.CharacterImage}
                  source={{ uri: character.image.medium }}
                />
                <Text style={dynamicstyles.CharacterName}>
                  {character.name.first
                    ? character.name.first?.slice(0, 10)
                    : character.name.last?.slice(0, 10)}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default MainCharacters;

const styles = (width,height) => StyleSheet.create({
  CharacterCard: {
    marginRight: 15,
    width: width * 0.3,
    height: height * 0.28,
    elevation: 5,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 5,
    marginBottom: 1,
  },
  CharacterImage: {
    width: width * 0.3,
    height: height * 0.25,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  CharacterName: {
    fontSize: 12,
    fontWeight: "normal",
    color: "black",
  },
});
