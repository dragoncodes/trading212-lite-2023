import React, { useCallback, useEffect, useState } from "react"
import { Button, TextInput, View } from "react-native"
import { AppConfig } from "../config"
import { CountriesDropdown } from "./CountriesDropdown"
import { EpicTextInput } from "./EpicTextInput"
import { SignupFlowConfig } from "./SignupFlow"

function SingupFlowStepCustomerDetails(props: { onNextPress: () => void }) {
  const [countries, setCountries] = useState([])

  const fetchCountries = useCallback(async () => {
    const response = await fetch(`${AppConfig.CUSTOMER_SERVICE_URL}/countries`)

    const countries = await response.json()

    setCountries(countries)
  }, [])

  useEffect(() => {
    fetchCountries()
  }, [])

  const onPress = useCallback(() => {
    props.onNextPress()
  }, [])

  const [firstName, setFirstName] = useState("")

  const [givenName, setGivenName] = useState("")

  return (
    <View>
      <CountriesDropdown countries={countries} />

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
    <View>
      {currentStep === 0 ? (
        <SingupFlowStepCustomerDetails onNextPress={onNextPress} />
      ) : null}

      {currentStep === 1 ? (
        <SignupFlowStepLoginDetails onNextPress={onNextPress} />
      ) : null}
    </View>
  )
}
