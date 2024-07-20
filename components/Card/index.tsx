import { StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";

interface CardProps {
  title: String;
  description: String;
}

export const Card = ({ title, description }: CardProps) => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>{title}</ThemedText>
      <ThemedText style={styles.description}>{description}</ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    borderWidth: 1,
    borderColor: "black",
  },
  title: {
    fontSize: 15,
  },
  description: {
    fontSize: 10,
  },
});
