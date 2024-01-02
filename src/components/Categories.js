import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { FadeIn, FadeInDown, FadeOut } from "react-native-reanimated";
import { CachedImage } from "../helpers/image";
const Categories = ({ categories, active, handleChangeCategory }) => {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="space-x-4"
      >
        {categories.map((item) => {
          let isActive = item.strCategory == active;
          let activeButtonClass = isActive ? "bg-amber-400" : "bg-black/10";
          return (
            <TouchableOpacity
              onPress={() => {
                handleChangeCategory(item.strCategory);
              }}
              key={item.idCategory}
              className="flex items-center space-y-1"
            >
              <View className={"rounded-full p-[6px] " + activeButtonClass}>
                {/* <CachedImage
                  uri={item.strCategoryThumb}
                  className="rounded-full"
                  style={{ width: wp(12), height: wp(12) }}
                /> */}
                <Image
                  source={{ uri: item.strCategoryThumb }}
                  className="rounded-full"
                  style={{ width: wp(12), height: wp(12) }}
                />
              </View>
              <Text className="text-neutral-600">{item.strCategory}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
};

export default Categories;
