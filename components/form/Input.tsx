import * as React from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextStyle,
  TextInputProps,
} from "react-native";
import { FieldError } from "react-hook-form";

interface Props extends TextInputProps {
  ref?: React.LegacyRef<TextInput>;
  name: string;
  label?: string;
  labelStyle?: TextStyle;
  error?: FieldError | undefined;
}

const Input = ({ label, labelStyle, error, ref, ...inputProps }: Props) => {
  return (
    <View style={styles.container}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <TextInput
        autoCapitalize="none"
        ref={ref}
        style={[
          styles.inputContainer,
          { borderColor: error ? "#fc6d47" : "#c0cbd3" },
        ]}
        {...inputProps}
      />
      <Text style={styles.textError}>{error && error.message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  label: {
    fontStyle: "normal",
  },
  textError: {
    backgroundColor: "green",
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "black",
  },
});

export default Input;
