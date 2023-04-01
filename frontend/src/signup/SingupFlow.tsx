import React, { useCallback, useState } from "react"
import { Button, Text, TextInput, View } from "react-native"
import { SignupFlowConfig } from "./SignupFlow"

function SingupFlowStepCustomerDetails(props: { onNextPress: () => void }) {
  const onPress = useCallback(() => {
    props.onNextPress()
  }, [])

  return (
    <View>
      <Text>Country</Text>
      <Text>First name</Text>
      <Text>Given names</Text>

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

      <Button title="Next" onPress={onPress} />
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
