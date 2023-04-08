import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
  Animated,
  Easing,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from "react-native"

const EpicTextInputHeight = 70
const TextInputComponentHeiht = 35

export function EpicTextInput(props: {
  label: string
  onChangeText: (text: string) => void
  style?: StyleProp<ViewStyle>
  textInputProps?: Omit<React.ComponentProps<typeof TextInput>, "onChangeText">
}) {
  // On mount
  useEffect(() => {
    // on did unmount
    return () => {
      cancelAnimation.current?.()
    }
  }, [])

  const cancelAnimation = useRef<(() => void) | undefined>(undefined)

  const containerStyle = useMemo(
    (): StyleProp<ViewStyle> => [
      {
        height: EpicTextInputHeight,
        justifyContent: "flex-end",
      },
      props.style,
    ],
    []
  )

  const textInputStyle = useMemo(
    () => ({
      height: TextInputComponentHeiht,
    }),
    []
  )

  const [isFocused, setIsFocused] = useState(false)

  const labelOffsetAnimation = useRef(new Animated.Value(0)).current

  const onFocus = useCallback(() => {
    setIsFocused(true)

    const animation = Animated.timing(labelOffsetAnimation, {
      toValue: 1,
      duration: 150,
      easing: Easing.linear,
      useNativeDriver: true,
    })

    cancelAnimation.current = animation.stop

    animation.start()
  }, [])

  const onBlur = useCallback(() => {
    setIsFocused(false)

    const animation = Animated.timing(labelOffsetAnimation, {
      toValue: 0,
      duration: 150,
      easing: Easing.linear,
      useNativeDriver: true,
    })

    animation.start()

    cancelAnimation.current = animation.stop
  }, [])

  const animatedStyle = useMemo(
    () => ({
      marginBottom: labelOffsetAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [-20, 10],
      }),
    }),
    []
  )

  return (
    <View style={containerStyle}>
      <Animated.View style={animatedStyle}>
        <Text>{props.label}</Text>
      </Animated.View>

      <TextInput
        onFocus={onFocus}
        onBlur={onBlur}
        style={textInputStyle}
        onChangeText={props.onChangeText}
        {...props.textInputProps}
      />

      <View
        style={{ backgroundColor: "#747980", height: StyleSheet.hairlineWidth }}
      />
    </View>
  )
}
