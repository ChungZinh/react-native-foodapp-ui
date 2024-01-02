import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { CachedImage } from "../helpers/image";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import {
  ClockIcon,
  FireIcon,
  HeartIcon,
  Square3Stack3DIcon,
  UsersIcon,
} from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Loading from "../components/Loading";
import YouTubeIframe from "react-native-youtube-iframe";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
export default function RecipeDetailScreen(props) {
  const item = props.route.params;
  const [isFavourite, setIsFavourite] = useState(false);
  const navigation = useNavigation();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMealDate(item.idMeal);
  }, []);

  const getMealDate = async (id) => {
    try {
      const res = await axios.get(
        `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      if (res && res.data) {
        setMeal(res.data.meals[0]);
        setLoading(false);
      }
      // console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const ingredientsIndexs = (meal) => {
    if (!meal) return [];
    let indexs = [];
    for (let i = 1; i <= 20; i++) {
      if (meal["strIngredient" + i]) {
        indexs.push(i);
      }
    }
    return indexs;
  };

  const getYoutubeVideoId = (url) => {
    const regex = /[?&]v=([^&]+)/;
    const match = url.match(regex);
    if (match && match[1]) {
      return match[1];
    }
    return null;
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 30 }}
      className="bg-white flex-1"
    >
      <StatusBar style="light" />

      {/* RECIPE IMAGE */}

      <View className="justify-center flex-row">
        <Animated.Image
          source={{ uri: item.strMealThumb }}
          sharedTransitionTag={item.strMeal}
          style={{
            width: wp(100),
            height: hp(50),
            borderBottomRightRadius: 53,
            borderBottomLeftRadius: 53,
          }}
        />
      </View>

      {/* back button */}

      <Animated.View
        entering={FadeIn.delay(200).duration(1000)}
        className="w-full absolute flex-row justify-between items-center pt-14 "
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-2 rounded-full ml-5 bg-white"
        >
          <ChevronLeftIcon size={wp(8)} strokeWidth={4.5} color="#fbbf24" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsFavourite(!isFavourite)}
          className="p-2 rounded-full mr-5 bg-white"
        >
          <HeartIcon
            size={wp(8)}
            strokeWidth={4.5}
            color={isFavourite ? "red" : "gray"}
          />
        </TouchableOpacity>
      </Animated.View>

      {/* MEAL DESC */}

      {loading ? (
        <Loading size="large" className="mt-16" />
      ) : (
        <View className="px-4 flex justify-between space-y-4 pt-8">
          <Animated.View
            entering={FadeInDown.duration(700).springify().damping(12)}
            className="space-y-2"
          >
            <Text
              style={{ fontSize: wp(5) }}
              className="font-bold flex-1 text-neutral-600"
            >
              {meal?.strMeal}
            </Text>

            <Text
              style={{ fontSize: wp(3.5) }}
              className="font-medium flex-1 text-neutral-500"
            >
              {meal?.strArea}
            </Text>
          </Animated.View>

          {/* MISC */}

          <Animated.View entering={FadeInDown.duration(700).springify().damping(12)} className="flex-row justify-around">
            <View className="flex rounded-full bg-amber-300 p-2">
              <View className="bg-white rounded-full flex items-center justify-center">
                <ClockIcon size={wp(10)} strokeWidth={2.5} color="#fbbf24" />
              </View>

              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: wp(3) }}
                  className="font-bold text-neutral-700"
                >
                  35
                </Text>

                <Text
                  style={{ fontSize: wp(2) }}
                  className="font-bold text-neutral-700"
                >
                  Mins
                </Text>
              </View>
            </View>

            <View className="flex rounded-full bg-amber-300 p-2">
              <View className="bg-white p-2 rounded-full flex items-center justify-center">
                <UsersIcon size={wp(6)} strokeWidth={2.5} color="#fbbf24" />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: wp(3) }}
                  className="font-bold text-neutral-700"
                >
                  03
                </Text>

                <Text
                  style={{ fontSize: wp(2) }}
                  className="font-bold text-neutral-700"
                >
                  Servings
                </Text>
              </View>
            </View>

            <View className="flex rounded-full bg-amber-300 p-2">
              <View className="bg-white p-2 rounded-full flex items-center justify-center">
                <FireIcon size={wp(6)} strokeWidth={2.5} color="#fbbf24" />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: wp(3) }}
                  className="font-bold text-neutral-700"
                >
                  103
                </Text>

                <Text
                  style={{ fontSize: wp(2) }}
                  className="font-bold text-neutral-700"
                >
                  Cal
                </Text>
              </View>
            </View>

            <View className="flex rounded-full bg-amber-300 p-2">
              <View className="bg-white p-2 rounded-full flex items-center justify-center">
                <Square3Stack3DIcon
                  size={wp(6)}
                  strokeWidth={2.5}
                  color="#fbbf24"
                />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: wp(3) }}
                  className="font-bold text-neutral-700"
                ></Text>

                <Text
                  style={{ fontSize: wp(2) }}
                  className="font-bold text-neutral-700"
                >
                  Easy
                </Text>
              </View>
            </View>
          </Animated.View>

          {/* INGREDIENTS */}

          <Animated.View entering={FadeInDown.duration(700).springify().damping(12)}View className="space-y-4">
            <Text
              style={{ fontSize: wp(5) }}
              className="font-bold flex-1 text-neutral-700"
            >
              Ingredients
            </Text>
            <View className="space-y-2 ml-3">
              {ingredientsIndexs(meal).map((i) => {
                return (
                  <View key={i} className="flex-row space-x-4">
                    <View
                      style={{ height: hp(1.5), width: hp(1.5) }}
                      className="bg-amber-300 rounded-full"
                    ></View>
                    <View className="flex-row space-x-2">
                      <Text
                        style={{ fontSize: wp(3.5) }}
                        className="font-extrabold text-neutral-700"
                      >
                        {meal["strMeasure" + i]}
                      </Text>

                      <Text
                        style={{ fontSize: wp(3.5) }}
                        className="font-medium text-neutral-400"
                      >
                        {meal["strIngredient" + i]}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </Animated.View>

          {/* Instructions */}

          <Animated.View entering={FadeInDown.duration(700).springify().damping(12)} className="space-y-4">
            <Text
              style={{ fontSize: wp(5) }}
              className="font-bold flex-1 text-neutral-700"
            >
              Instructions
            </Text>
            <Text style={{ fontSize: wp(3) }} className="text-neutral-700">
              {meal?.strInstructions}
            </Text>
          </Animated.View>

          {/* YOUTUBE */}

          {meal.strYoutube && (
            <Animated.View entering={FadeInDown.duration(700).springify().damping(12)} className="space-y-4">
              <Text
                style={{ fontSize: wp(5) }}
                className="font-bold flex-1 text-neutral-700"
              >
                Recipe Video
              </Text>

              <View>
                <YouTubeIframe
                  videoId={getYoutubeVideoId(meal.strYoutube)}
                  height={hp(30)}
                />
              </View>
            </Animated.View>
          )}
        </View>
      )}
    </ScrollView>
  );
}
