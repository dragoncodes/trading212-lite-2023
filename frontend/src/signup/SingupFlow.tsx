import { CountryT } from "customer-commons"
import React, { useCallback, useContext, useEffect, useState } from "react"
import { Button, TextInput, View } from "react-native"
import { AppConfig } from "../config"
import { CountriesDropdown } from "./CountriesDropdown.web"
import { EpicTextInput } from "./EpicTextInput"
import { SignupFlowConfig } from "./SignupFlow"
import {
  SignupFlowContext,
  SignupFlowContextProvider,
} from "./SignupFlowContext"

function SingupFlowStepCustomerDetails(props: { onNextPress: () => void }) {
  const [countries, setCountries] = useState<CountryT[]>([])

  const [_, setUserData] = useContext(SignupFlowContext)

  const fetchCountries = useCallback(async () => {
    const response = await fetch(`${AppConfig.CUSTOMER_SERVICE_URL}/countries`)

    const countries = await response.json()

    setCountries(countries)
  }, [])

  useEffect(() => {
    fetchCountries()
  }, [])

  const [firstName, setFirstName] = useState("")

  const [givenName, setGivenName] = useState("")

  const [selectedCountryCode, setSelectedCountryCode] = useState("")

  const onCountryPress = useCallback((countryCode: CountryT["code"]) => {
    setSelectedCountryCode(countryCode)
  }, [])

  const onPress = useCallback(() => {
    const country = countries.find(
      (country) => selectedCountryCode === country.code
    )

    if (!country) {
      alert("Unknown country!")

      return
    }

    if (!country.isSupported) {
      alert("Country not supported")

      return
    }

    if (!firstName) {
      alert("Please enter your first name")

      return
    }

    if (!givenName) {
      alert("Please enter your given name")

      return
    }

    setUserData({
      countryCode: selectedCountryCode,
      firstName,
      givenName,
    })

    props.onNextPress()
  }, [selectedCountryCode, firstName, givenName, props.onNextPress, countries])

  return (
    <View>
      <CountriesDropdown countries={countries} onPress={onCountryPress} />

      <EpicTextInput
        label="First name"
        onChangeText={(text) => {
          setFirstName(text)
        }}
        textInputProps={{
          textContentType: "name",
          autoCapitalize: "words",
        }}
        style={{
          marginVertical: 40,
        }}
      />

      <EpicTextInput
        label="Given name"
        onChangeText={(text) => {
          setGivenName(text)
        }}
        textInputProps={{
          textContentType: "givenName",
          autoCapitalize: "words",
        }}
        style={{
          marginBottom: 20,
        }}
      />

      <Button title="Next" onPress={onPress} />
    </View>
  )
}

function SignupFlowStepLoginDetails(props: { onNextPress: () => void }) {
  const onPress = useCallback(() => {
    props.onNextPress()
  }, [])

  const [userData, setUserData] = useContext(SignupFlowContext)

  console.log("UserData===========", userData)

  return (
    <View>
      <TextInput textContentType="emailAddress" placeholder="Email" />

      <TextInput textContentType="password" placeholder="Password" />

      <TextInput textContentType="password" placeholder="Repeat Password" />

      <Button title="Sign up" onPress={onPress} />
    </View>
  )
}

export function SignupFlow() {
  const [currentStep, setCurrentStep] = useState(0)

  const onNextPress = useCallback(() => {
    const newStep = currentStep + 1

    if (newStep >= SignupFlowConfig.maxSteps) {
      // TODO handle last step

      return
    }

    setCurrentStep(currentStep + 1)
  }, [currentStep])

  return (
    <SignupFlowContextProvider>
      <View>
        {currentStep === 0 ? (
          <SingupFlowStepCustomerDetails onNextPress={onNextPress} />
        ) : null}

        {currentStep === 1 ? (
          <SignupFlowStepLoginDetails onNextPress={onNextPress} />
        ) : null}
      </View>
    </SignupFlowContextProvider>
  )
}
