import React from "react";
import {
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { singleAnimeInfo } from "../../constants/singleAnime";
import { AnimeDetails } from "./AnimeDetails";
import MainCharacters from "./MainCharacters";
import Reviews from "./Reviews";

export const Anime = ({ route, navigation }) => {
  const id = route?.params?.id;
  const data = singleAnimeInfo.data;

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <SafeAreaView>
        <ScrollView>
          <AnimeDetails data={data} /> 
          <MainCharacters characters={data.Media.characters} />
          <Reviews reviews={data.Media.reviews} />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
