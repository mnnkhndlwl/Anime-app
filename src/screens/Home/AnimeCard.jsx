import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { StarIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";

const AnimeCard = ({ anime }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      key={anime?.id}
      onPress={() => {
        navigation.navigate("Anime", {
          id: anime?.id,
        });
      }}
    >
      <View style={styles.card}>
        <Image
          style={styles.image}
          source={{ uri: anime.bannerImage }}
          resizeMode="cover"
        />
        <View style={styles.details}>
          <View>
            <Text style={styles.title}>
              {anime.title.english?.length > 30
                ? anime.title.english.slice(0, 13)
                : anime.title.english}
            </Text>
            <Text style={styles.description}>{anime.title.native}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={styles.title}>{anime.averageScore / 10}</Text>
            <StarIcon color="#FFD700" size="20" style={{ marginBottom: 5 }} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").height * 0.3,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: "70%",
  },
  details: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
  },
});

export default AnimeCard;
