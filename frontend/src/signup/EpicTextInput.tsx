import { useCallback, useMemo, useState } from "react"
import {
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

  const onFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  const onBlur = useCallback(() => {
    setIsFocused(false)
  }, [])

  return (
    <View style={containerStyle}>
      {isFocused ? null : (
        <Text style={{ marginBottom: -15 }}>{props.label}</Text>
      )}

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
