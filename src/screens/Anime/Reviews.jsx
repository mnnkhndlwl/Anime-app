import { View, Text,Dimensions } from 'react-native'
import React from 'react'
import { UserCircleIcon } from "react-native-heroicons/outline";

const Reviews = ({reviews}) => {
  return (
    <View
            style={{
              paddingLeft: 10,
              paddingRight: 10,
              backgroundColor:"white"
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              Reviews
            </Text>
            {
              reviews.nodes.map((review,index)=> {
                return <View style={{
                  flexDirection:"row",
                  marginBottom:10,
                  justifyContent:"space-between",
                  alignItems:"flex-start"
                }} key={index}>
                <UserCircleIcon size="40" color="black" />
                <View style={
                  {
                    width:Dimensions.get('window').width*0.82
                  }
                } >
                  <Text style={{
                    fontWeight:"bold"
                  }} >{review.user.name}</Text>
                  <Text style={{
                    textAlign:"justify"
                  }} >{review.summary}</Text>
                  <Text>Rating : {String(review.rating).slice(0,2)  / 10} / 5 🌟</Text>
                </View>
                </View>
              })
            }
          </View>
  )
}

export default Reviews