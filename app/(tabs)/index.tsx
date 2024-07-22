import { Button, StyleSheet } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Input } from "@/components/form";
import { Controller, useForm } from "react-hook-form";
import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FlatList } from "react-native-gesture-handler";
import { Card } from "@/components/Card";

type Article = {
  source: String;
  author: String;
  description: String;
  title: String;
};

export default function HomeScreen() {
  type FormData = {
    search: string;
  };

  const { control, getValues, handleSubmit } = useForm<FormData>({
    defaultValues: {
      search: "",
    },
  });

  const onSubmit = (data: FormData) => {
    refetch();
  };

  const handleRender = useCallback(
    ({ field: { onChange, onBlur, value } }: any) => (
      <Input
        name="search"
        label="Search"
        onChange={onChange}
        onBlur={onBlur}
        placeholder="Enter Article Here!"
      />
    ),
    []
  );

  const fetchArticles = async () => {
    const { search } = getValues();

    if (!search) {
      throw new Error("please enter a search term!");
    }

    const res = await axios.get(
      `https://newsapi.org/v2/everything?q=${search}&from=2024-07-01&sortBy=popularity&apiKey=55b08268585d4cee8a72e5e92b5628b3`
    );

    return res;
  };

  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ["article_search"],
    queryFn: fetchArticles,
  });

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

      {isError && <ThemedText>{error.message}</ThemedText>}

      <ThemedView>
        {data && (
          <FlatList
            style={styles.flatListContainer}
            data={data.data.articles}
            renderItem={renderItem}
          />
        )}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  flatListContainer: {
    display: "flex",
  },
});
