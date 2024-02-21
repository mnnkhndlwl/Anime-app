import React from "react";
import { SafeAreaView, StatusBar, ScrollView } from "react-native";
import AnimeCard from "./AnimeCard"; // Import the AnimeCard component
import { animeList } from "../../constants/animeList";

export const Home = () => {
  return (
    <>
      <StatusBar backgroundColor="#f01f1f" />
      <SafeAreaView style={{
        alignItems:"center",
        padding: 10
      }} >
        <ScrollView>
          {animeList.data.Page.media.map((anime, index) => (
            <AnimeCard key={index} anime={anime} />
          ))}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
