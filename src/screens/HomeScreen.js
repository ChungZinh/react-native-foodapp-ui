import {
  View,
  Text,
  StatusBar,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import axios from "axios";
import Recipes from "../components/Recipes";

const HomeScreen = () => {
  const [active, setActive] = useState("Beef");
  const [categories, setCategories] = useState([]);
  const [recipes, setRecipes] = useState([]);

  const getCategores = async () => {
    try {
      const res = await axios.get(
        "https://themealdb.com/api/json/v1/1/categories.php"
      );
      if (res && res.data) {
        setCategories(res.data.categories);
      }
      // console.log(res.data.categories);
    } catch (error) {
      console.log(error);
    }
  };


  const getRecipes = async (category = "Beef") => {
    try {
      const res = await axios.get(
        `https://themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      if (res && res.data) {
        setRecipes(res.data.meals);
      }
    //   console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeCategory = (category) => {
    getRecipes(category);
    setActive(category);
    setRecipes([]);
  }


  useEffect(() => {
    getCategores();
    getRecipes();
  }, []);


 

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle={"dark-content"} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className=" pt-14"
      >
        {/* HEADER */}
        <View className="mx-4 flex-row justify-between items-center mb-2">
          <Image
            style={{ width: wp(10), height: wp(10) }}
            source={require("../../assets/img/avatar.png")}
          />
          <BellIcon size={wp(8)} color="gray" />
        </View>

        {/*  */}

        <View className="mx-4 space-y-2 mb-2">
          <Text style={{ fontSize: wp(3.5) }} className="text-neutral-600">
            Hello, Vinh!
          </Text>

          <Text
            style={{ fontSize: wp(7) }}
            className="font-semibold text-neutral-600"
          >
            Make your own food,
          </Text>
          <Text
            style={{ fontSize: wp(7) }}
            className="font-semibold text-neutral-600"
          >
            stay at
            <Text className="text-amber-400"> home</Text>
          </Text>
        </View>

        {/* SEARCH BAR */}

        <View className="mx-4 my-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
          <TextInput
            placeholder="Seach any recipe"
            placeholderTextColor={"gray"}
            style={{ fontSize: wp(3.5) }}
            className="flex-1 text-base mb-1 pl-3 tracking-wider"
          />

          <TouchableOpacity className="bg-white rounded-full p-3">
            <MagnifyingGlassIcon size={wp(5)} strokeWidth={3} color="gray" />
          </TouchableOpacity>
        </View>

        {/* CATEGORIES */}

        <View className='px-3'>
          {categories.length > 0 && (
            <Categories
              categories={categories}
              active={active}
              handleChangeCategory={handleChangeCategory}
            />
          )}
        </View>



        <View>
            <Recipes meals={recipes} categories={categories}/>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
