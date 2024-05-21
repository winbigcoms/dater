import { useRef } from "react";
import { RefCallBack } from "react-hook-form";
import {
  Animated,
  ReturnKeyTypeOptions,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { COLOR_PALETTE } from "style/color";

interface CustomTextInputProps {
  onSubmitEditing?: () => void;
  value: string;
  onChangeText: (value: string) => void;
  returnKeyType?: ReturnKeyTypeOptions;
  placeholder?: string;
  controllerRef: RefCallBack;
  titleText?: string;
}

export const CustomTextInput = (props: CustomTextInputProps) => {
  const {
    controllerRef,
    onChangeText,
    onSubmitEditing,
    value,
    returnKeyType,
    placeholder,
    titleText,
  } = props;

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View>
      {titleText && (
        <Animated.Text
          style={[
            CustomTextInputStyle.inputBoxText,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          {titleText}
        </Animated.Text>
      )}
      <TextInput
        ref={controllerRef}
        placeholder={placeholder}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
        onChangeText={onChangeText}
        value={value}
        style={CustomTextInputStyle.inputBox}
        onFocus={fadeIn}
        onBlur={fadeOut}
      />
    </View>
  );
};

const CustomTextInputStyle = StyleSheet.create({
  inputBoxText: {
    position: "absolute",
    fontSize: 10,
    top: -7,
    left: 15,
    zIndex: 1,
    color: COLOR_PALETTE.darkGray,
    backgroundColor: COLOR_PALETTE.pink,
    borderRadius: 1,
  },
  inputBox: {
    borderColor: COLOR_PALETTE.gray,
    borderWidth: 1,
    paddingVertical: 10,
    paddingLeft: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
});
