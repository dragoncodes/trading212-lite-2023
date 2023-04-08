import { CountryT } from "customer-commons"
import { useCallback, useMemo, useRef, useState } from "react"
import {
  Animated,
  FlatList,
  ListRenderItemInfo,
  Pressable,
  StyleProp,
  Text,
  View,
  ViewStyle,
} from "react-native"

export function CountriesDropdown(props: { countries: CountryT[] }) {
  const [isCountriesListVisible, setIsCountriesListVisible] = useState(false)

  const dropdownFadeAnimationValue = useRef(new Animated.Value(0)).current

  const onPress = useCallback(() => {
    setIsCountriesListVisible(!isCountriesListVisible)

    Animated.timing(dropdownFadeAnimationValue, {
      toValue: !isCountriesListVisible ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }, [isCountriesListVisible])

  const onCountryPress = useCallback(() => {}, [])

  const countryItemStyle = useMemo(
    (): StyleProp<ViewStyle> => ({
      borderWidth: 1,
      borderColor: "##747980",
      zIndex: 100,
    }),
    []
  )

  // TODO figure out how to use Modal
  // TODO Better styling of the country item

  const renderCountryItem = useCallback(
    (countryRow: ListRenderItemInfo<CountryT>) => (
      <Pressable onPress={onCountryPress} style={countryItemStyle}>
        <Text>{countryRow.item.code}</Text>
      </Pressable>
    ),
    []
  )

  const countriesContainerStyle = useMemo(
    (): StyleProp<ViewStyle> => ({
      position: "absolute",
      maxHeight: 400,
      zIndex: 1337,
      left: 0,
      right: 0,
      top: 20,
    }),
    []
  )

  const maybeRenderList = useCallback(() => {
    return (
      <Animated.View
        style={[
          countriesContainerStyle,
          {
            opacity: dropdownFadeAnimationValue,
          },
        ]}
      >
        <FlatList
          data={props.countries}
          renderItem={renderCountryItem}
          keyExtractor={(country) => country.code}
        />
      </Animated.View>
    )
  }, [props.countries, isCountriesListVisible])

  return (
    <View>
      <Pressable onPress={onPress}>
        <Text>Select country</Text>
      </Pressable>

      {maybeRenderList()}
    </View>
  )
}
