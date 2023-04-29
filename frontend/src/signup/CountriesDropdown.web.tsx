import { CountryT } from "customer-commons"
import { useCallback } from "react"
import { Text, View } from "react-native"

export function CountriesDropdown(props: {
  countries: CountryT[]
  onPress: (countryCode: CountryT["code"]) => void
}) {
  const onCountryPress = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      props.onPress(event.target.value)
    },
    [props.onPress]
  )

  const renderCountriesList = useCallback(() => {
    return (
      <View>
        <select onChange={onCountryPress}>
          {props.countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.code}
            </option>
          ))}
        </select>
      </View>
    )
  }, [props.countries])

  return (
    <View>
      <Text>Select country</Text>

      {renderCountriesList()}
    </View>
  )
}
