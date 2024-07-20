import * as React from "react";
import { TextInput } from "react-native";
import { FieldError, ValidationMode } from "react-hook-form";

interface ValidationMap {
  [key: string]: ValidationMode;
}

interface ErrorMap {
  [key: string]: FieldError | undefined;
}

interface Props {
  children: JSX.Element | JSX.Element[];
  register: ({ name }: { name: string }, validation: ValidationMode) => void;
  errors: ErrorMap;
  validation: ValidationMap;
  setValue: (name: string, value: string, validate?: boolean) => void;
}

const Form = ({ register, errors, setValue, validation, children }: Props) => {
  React.useEffect(() => {
    (Array.isArray(children) ? [...children] : [children]).forEach((child) => {
      if (child.props.name)
        register({ name: child.props.name }, validation[child.props.name]);
    });
  }, [register]);

  return (
    <>
      {(Array.isArray(children) ? [...children] : [children]).map((child) => {
        return child.props.name
          ? React.createElement(child.type, {
              ...{
                ...child.props,
                onChangeText: (v: string) =>
                  setValue(child.props.name, v, true),
                key: child.props.name,
                error: errors[child.props.name],
              },
            })
          : child;
      })}
    </>
  );
};

export default Form;
