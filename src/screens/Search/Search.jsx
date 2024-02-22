import React, { useState } from "react";
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  ScrollView,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import AnimeCard from "../Home/AnimeCard";
import {
  MagnifyingGlassIcon,
  ArrowLeftIcon,
} from "react-native-heroicons/outline";
import { animeList } from "../../constants/animeList";
import { AxiosInstance } from "../../../API";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [data,setData] = useState({});

  const handleSearch = async () => {
    const query = `query ($page: Int, $perPage: Int, $search: String) {
        Page(page: $page, perPage: $perPage) {
          pageInfo {
            total
            perPage
          }
          media(search: $search,type: ANIME, sort: FAVOURITES_DESC) {
            id
            bannerImage
            title {
              english
              native
            }
            averageScore
          }
        }
      }
      `;

    let variables = {
      search: searchQuery,
      page: 1,
      perPage: 3,
    };

    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    const result = await AxiosInstance({
      method: "post",
      data: {
        query,
        variables,
      },
      headers,
    }).catch((err) => console.log(err));

    setData(result.data);
  };

  return (
    <>
      <StatusBar backgroundColor="#f01f1f" />
      <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
        <View
          style={{ padding: 10, flexDirection: "row", alignItems: "center" }}
        >
          <TextInput
            style={{
              height: 40,
              width: Dimensions.get("window").width * 0.8,
              borderColor: "gray",
              borderWidth: 1,
              borderTopWidth: 0,
              borderLeftWidth: 0,
              borderRightWidth: 0,
              paddingHorizontal: 10,
              marginBottom: 10,
            }}
            placeholder="Search anime..."
            onChangeText={(text) => setSearchQuery(text)}
            value={searchQuery}
          />
          <TouchableOpacity onPress={handleSearch}>
            <MagnifyingGlassIcon size="24" color="black" />
          </TouchableOpacity>
        </View>
        <ScrollView>
          {data?.data?.Page?.media?.map((anime, index) => (
            <AnimeCard key={index} anime={anime} />
          ))}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Search;
