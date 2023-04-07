import { useCallback, useMemo, useState } from "react"
import {
  FlatList,
  ListRenderItemInfo,
  Pressable,
  StyleProp,
  Text,
  View,
  ViewStyle,
} from "react-native"
import { CountryT } from "./models/Country"

export function CountriesDropdown(props: { countries: CountryT[] }) {
  const [isCountriesListVisible, setIsCountriesListVisible] = useState(false)

  const onPress = useCallback(() => {
    setIsCountriesListVisible(!isCountriesListVisible)
  }, [isCountriesListVisible])

  const onCountryPress = useCallback(() => {}, [])

  const countryItemStyle = useMemo(
    (): StyleProp<ViewStyle> => ({
      borderWidth: 1,
      borderColor: "##747980",
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
  const maybeRenderList = useCallback(() => {
    return isCountriesListVisible ? (
      <FlatList
        data={props.countries}
        renderItem={renderCountryItem}
        keyExtractor={(country) => country.code}
      />
    ) : null
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
