import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  Dimensions,
  ScrollView,
} from "react-native";
import Loading from "../../utils/Loading";
import { AxiosInstance } from "../../../API";

const Character = ({ route, navigation }) => {
  const id = route?.params?.id;
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const query = `query ($id: Int) {
          Character(id:$id) {
            id
            name {
              first
              last
            }
            image {
              large
            }
            description
          }
        }
        `;

      const variables = {
        id: id,
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
        setData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log("character data ======>", data);

  return (
    <>
      <StatusBar translucent backgroundColor="black" />
      <SafeAreaView style={{ flex: 1 }}>
        {loading ? (
          <Loading />
        ) : data ? ( // Check if data is not null
          <>
            {/* Background image */}
            <Image
              source={{ uri: data.Character.image.large }}
              style={{
                position: "absolute",
                right: 0,
                left: 0,
                bottom: 0,
                objectFit: "cover",
                flex: 1,
                width: width,
                height: height,
              }}
            />
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0,0,0,0.5)",
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  backgroundColor: "white",
                  borderRadius: 10,
                  padding: 10,
                  height: height * 0.8,
                  width: width * 0.8,
                }}
              >
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
                    alignItems: "center",
                    justifyContent: "center",
                    height: height * 0.6,
                    padding: 10,
                    width: width * 0.8,
                  }}
                >
                  <Text
                    style={{
                      color: "black",
                      fontWeight: "bold",
                      fontSize: 20,
                      marginTop: 5,
                      padding: 2,
                    }}
                  >
                    {data.Character.name.first} {data.Character.name.last}
                  </Text>
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <Text
                      style={{
                        color: "black",
                        fontSize: 16,
                      }}
                    >
                      {data.Character.description}
                    </Text>
                  </ScrollView>
                </View>
              </View>
            </View>
          </>
        ) : (
          <Text>No data available</Text> // Placeholder UI if data is null
        )}
      </SafeAreaView>
    </>
  );
};

export default Character;
