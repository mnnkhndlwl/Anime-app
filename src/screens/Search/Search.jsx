import React, { useState, useRef } from "react";
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
import Loading from "../../utils/Loading";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const scrollViewRef = useRef();

  const handleSearch = async () => {
    setLoading(true);
    setCurrentPage(1);
    const result = await fetchData(1);
    setData(result);
    setLoading(false);
  };

  const fetchData = async (page) => {
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
      page: page,
      perPage: 4,
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
    }).catch((err) => {
      console.log(err);
      setLoading(false);
    });

    return result?.data?.data?.Page?.media || [];
  };

  const handleLoadMore = async () => {
    const nextPage = currentPage + 1;
    const newData = await fetchData(nextPage);
    setData((prevData) => [...prevData, ...newData]);
    setCurrentPage(nextPage);
  };

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 20;
    if (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    ) {
      handleLoadMore();
    }
  };

  return (
    <>
      <StatusBar backgroundColor="#FFCAD4" />
      <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
        {loading ? (
          <Loading />
        ) : (
          <>
            <View
              style={{
                padding: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
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
            <ScrollView
              ref={scrollViewRef}
              onScroll={handleScroll}
              scrollEventThrottle={16}
            >
              {data.map((anime, index) => (
                <AnimeCard key={index} anime={anime} />
              ))}
            </ScrollView>
          </>
        )}
      </SafeAreaView>
    </>
  );
};

export default Search;
