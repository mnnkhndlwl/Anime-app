import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StatusBar,
  ScrollView,
  View,
  Text,
} from "react-native";
import { AxiosInstance } from "../../../API";
import { AnimeDetails } from "./AnimeDetails";
import MainCharacters from "./MainCharacters";
import Reviews from "./Reviews";
import Loading from "../../utils/Loading";

const Anime = ({ route, navigation }) => {
  const id = route?.params?.id;
  console.log(id);
  const [animeData, setAnimeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const query = `query ($id: Int, $totalReviews: Int) {
        Media(id: $id) {
          id
          title {
            english
            native
          }
          description
          coverImage {
            color
            large
          }
          startDate {
            year
            month
            day
          }
          endDate {
            year
            month
            day
          }
          episodes
          status
          genres
          averageScore
          reviews(page: 1, perPage: $totalReviews) {
            nodes {
              summary
              rating
              user {
                name
              }
            }
          }

          characters {
            nodes {
              id
              image {
                medium
              }
              name {
                first
                last
              }
            }
          }
        }
      }`;

      const variables = {
        id: id,
        totalReviews: 10, // Example: Fetching 10 reviews
      };

      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
      };

      try {
        const response = await AxiosInstance({
          method: "post",
          data: {
            query,
            variables,
          },
          headers,
        });
        setAnimeData(response.data);
        console.log(animeData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <SafeAreaView>
      {
        loading ? <Loading /> : <>
        <ScrollView>
          <AnimeDetails data={animeData?.data?.Media} /> 
          <MainCharacters characters={animeData?.data?.Media.characters} />
          <Reviews reviews={animeData?.data?.Media?.reviews} />
        </ScrollView>
        </>
      }
      </SafeAreaView>
    </>
  );
};

export default Anime;
