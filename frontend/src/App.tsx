import React from "react"
import { StyleSheet, View } from "react-native"
import { SignupFlow } from "./signup/SingupFlow"

export default function App() {
  return (
    <View style={styles.container}>
      <SignupFlow />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
})
