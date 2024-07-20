import { Image, StyleSheet, Platform, Alert, Button } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Form, Input } from "@/components/form";
import { Controller, useForm } from "react-hook-form";
import { validation } from "@/utils";
import { useCallback, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FlatList } from "react-native-gesture-handler";
import { Card } from "@/components/Card";

export default function HomeScreen() {
  type FormData = {
    search: string;
  };

  const {
    control,
    getValues,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>({
    defaultValues: {
      search: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    refetch();
  };

  const handleRender = useCallback(
    ({ field: { onChange, onBlur, value } }: any) => (
      <Input name="search" label="Search" onChange={onChange} onBlur={onBlur} />
    ),
    []
  );

  const fetchAPI = async () => {
    const { search } = getValues();

    if (!search) {
      throw Error;
    }

    const res = await axios.get(
      `https://newsapi.org/v2/everything?q=${search}&from=2024-07-01&sortBy=popularity&apiKey=55b08268585d4cee8a72e5e92b5628b3`
    );

    console.log(res);

    return res;
  };

  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ["pokemon"],
    queryFn: fetchAPI,
  });

  useEffect(() => {
    console.log(data?.data);
  }, [data, isLoading]);

  type Article = {
    source: String;
    author: String;
    description: String;
    title: String;
  };

  const renderItem = useCallback(({ item }: { item: Article }) => {
    return <Card title={item.title} description={item.description} />;
  }, []);

  return (
    <ThemedView>
      <ThemedText>News Search</ThemedText>
      <Controller
        control={control}
        rules={{
          maxLength: 100,
        }}
        render={handleRender}
        name="search"
      />

      <Button title="Search" onPress={handleSubmit(onSubmit)} />

      {isLoading && <ThemedText>Loading...</ThemedText>}

      {error && <ThemedText>{error.message}</ThemedText>}

      {data && <FlatList data={data.data.articles} renderItem={renderItem} />}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
