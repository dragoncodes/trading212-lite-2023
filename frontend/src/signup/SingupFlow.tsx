import { CountryT, SignupRequestPayloadT } from "customer-commons"
import React, { useCallback, useContext, useEffect, useState } from "react"
import {
  Button,
  NativeSyntheticEvent,
  TextInput,
  TextInputChangeEventData,
  View,
} from "react-native"
import { AppConfig } from "../config"
import { CountriesDropdown } from "./CountriesDropdown.web"
import { EpicTextInput } from "./EpicTextInput"
import { SignupFlowContext } from "./SignupFlowContext"

function SingupFlowStepCustomerDetails(props: { onNextPress: () => void }) {
  const [countries, setCountries] = useState<CountryT[]>([])

  const [_, setUserData] = useContext(SignupFlowContext)

  const fetchCountries = useCallback(async () => {
    const response = await fetch(`${AppConfig.customerServiceUrl}/countries`)

    const countries = await response.json()

    setCountries(countries)
  }, [])

  useEffect(() => {
    fetchCountries()
  }, [])

  const [selectedCountryCode, setSelectedCountryCode] = useState("")

  const [givenName, setGivenName] = useState("")

  const [lastName, setLastName] = useState("")

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

    if (!givenName) {
      alert("Please enter your given name")

      return
    }

    if (!lastName) {
      alert("Please enter your last name")

      return
    }

    setUserData({
      countryCode: selectedCountryCode,
      givenName,
      lastName,
    })

    props.onNextPress()
  }, [selectedCountryCode, lastName, givenName, props.onNextPress, countries])

  return (
    <View>
      <CountriesDropdown countries={countries} onPress={onCountryPress} />

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

      <EpicTextInput
        label="Last name"
        onChangeText={(text) => {
          setLastName(text)
        }}
        textInputProps={{
          textContentType: "name",
          autoCapitalize: "words",
        }}
        style={{
          marginVertical: 40,
        }}
      />
      <Button title="Next" onPress={onPress} />
    </View>
  )
}

function SignupFlowStepLoginDetails(props: {
  onSubmit: (email: string, password: string) => void
}) {
  const [email, setEmail] = useState<string | undefined>(undefined)

  const [password, setPassword] = useState<string | undefined>(undefined)

  const [repeatPassword, setRepeatPassword] = useState<string | undefined>(
    undefined
  )

  const onPress = useCallback(() => {
    if (!email) {
      alert("Please enter your email")

      return
    }

    if (!password) {
      alert("Please enter your password")

      return
    }

    if (password.length < 5) {
      alert("Password not secure enough")

      return
    }

    if (!repeatPassword) {
      alert("Please enter your password again")

      return
    }

    if (password !== repeatPassword) {
      alert("Passwords do not match")

      return
    }

    props.onSubmit(email, password)
  }, [email, password, repeatPassword, props.onSubmit])

  const onEmailChange = useCallback(
    (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
      setEmail(e.nativeEvent.text)
    },
    []
  )
  const onPasswordChange = useCallback(
    (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
      setPassword(e.nativeEvent.text)
    },
    []
  )
  const onRepeatPasswordChange = useCallback(
    (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
      setRepeatPassword(e.nativeEvent.text)
    },
    []
  )

  return (
    <View>
      <TextInput
        onChange={onEmailChange}
        textContentType="emailAddress"
        placeholder="Email"
      />

      <TextInput
        onChange={onPasswordChange}
        textContentType="password"
        secureTextEntry
        placeholder="Password"
      />

      <TextInput
        onChange={onRepeatPasswordChange}
        textContentType="password"
        secureTextEntry
        placeholder="Repeat Password"
      />

      <Button title="Sign up" onPress={onPress} />
    </View>
  )
}

export function SignupFlow() {
  const [currentStep, setCurrentStep] = useState(0)

  const [userData] = useContext(SignupFlowContext)

  const onNextPress = useCallback(() => {
    setCurrentStep(currentStep + 1)
  }, [currentStep])

  const onSubmit = useCallback(
    async (email: string, password: string) => {
      const givenName = userData.givenName
      const lastName = userData.lastName
      const countryCode = userData.countryCode

      if (!lastName || !givenName || !countryCode) {
        alert("Unkonwn error, please try again")

        return
      }

      const signupPayload: SignupRequestPayloadT = {
        givenNames: givenName,
        lastName,
        countryCode,
        email,
        password,
      }

      try {
        const signupResponse = await fetch(
          `${AppConfig.customerServiceUrl}/customers`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(signupPayload),
          }
        )

        const signupResponseBody = await signupResponse.json()

        console.log(signupResponseBody)
      } catch (err: any) {
        console.log("Error", err)
      }

      // TODO make a request to our backend
    },
    [userData]
  )

  return (
    <View>
      {currentStep === 0 ? (
        <SingupFlowStepCustomerDetails onNextPress={onNextPress} />
      ) : null}

      {currentStep === 1 ? (
        <SignupFlowStepLoginDetails onSubmit={onSubmit} />
      ) : null}
    </View>
  )
}
