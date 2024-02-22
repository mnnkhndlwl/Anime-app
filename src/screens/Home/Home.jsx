import React, { useEffect,useState,useRef } from "react";
import { SafeAreaView, StatusBar, ScrollView } from "react-native";
import AnimeCard from "./AnimeCard"; 
import Loading from "../../utils/Loading";
import { AxiosInstance } from "../../../API";

export const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const scrollViewRef = useRef();

  const handleFetch = async () => {
    setLoading(true);
    setCurrentPage(1);
    const result = await fetchData(1);
    setData(result);
    setLoading(false);
  };

  useEffect(()=> {
    handleFetch();
  },[])

  const fetchData = async (page) => {
    const query = `query ($page: Int, $perPage: Int) {
        Page(page: $page, perPage: $perPage) {
          pageInfo {
            total
            perPage
          }
          media(type: ANIME, sort: FAVOURITES_DESC) {
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
    setLoading(false);
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
      <SafeAreaView
        style={{
          alignItems: "center",
          padding: 10,
          justifyContent:"center",
          alignItems:"center"
        }}
      >
        {loading ? (
          <Loading />
        ) : (
          <>
            <ScrollView
              ref={scrollViewRef}
              onScroll={handleScroll}
              scrollEventThrottle={16}
            >
              {data?.map((anime, index) => (
                <AnimeCard key={index} anime={anime} />
              ))}
            </ScrollView>
          </>
        )}
      </SafeAreaView>
    </>
  );
};
