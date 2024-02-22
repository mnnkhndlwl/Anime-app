import React from "react";
import {
  SafeAreaView,
  Image,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export const AnimeDetails = ({data}) => {
  const dynamicStyles = styles(data.Media.coverImage.color);
  return (
    <>
      <SafeAreaView>
          <Image
            style={dynamicStyles.ImageHeader}
            source={{ uri: data.Media.coverImage.large }}
          />
          <View style={dynamicStyles.AnimeHeaderContainer}>
            <View>
              <Text style={dynamicStyles.AnimeTitle}>
                {data.Media.title.english?.length > 30
                  ? data.Media.title.english.slice(0, 15)
                  : data.Media.title.english}
              </Text>
              <Text style={dynamicStyles.AnimeTitle}>{data.Media.title.native}</Text>
              <Text style={dynamicStyles.AnimeStatus}>
                Episodes : {data.Media.episodes}
              </Text>
              <Text style={dynamicStyles.AnimeStatus}>
                Status : {data.Media.status}
              </Text>
              <Text style={dynamicStyles.AnimeStatus}>
                Genre : {data.Media.genres.slice(0, 2).join(",")}
              </Text>
            </View>
            <View style={dynamicStyles.AnimeScoreContainer}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                {data.Media.averageScore} +
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "normal",
                  color: "white",
                }}
              >
                Score
              </Text>
            </View>
          </View>
          <View style={{
            paddingLeft:10,
            paddingRight:10
          }}>
            <Text style={dynamicStyles.AnimeStatus} >
                {data.Media.description}
            </Text>
          </View>
      </SafeAreaView>
    </>
  );
};

const styles = (color) =>
  StyleSheet.create({
    ImageHeader: {
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height * 0.3,
    },
    AnimeHeaderContainer: {
      padding: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    AnimeTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: "black",
    },
    AnimeStatus: {
      fontSize: 18,
      fontWeight: "normal",
      color: "black",
      textAlign:"justify"
    },
    AnimeScoreContainer: {
      width: 50,
      height: 50,
      backgroundColor: color,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 10,
      flexDirection: "column",
    },
  });
