import { CountryT } from "customer-commons"
import { createContext, useState } from "react"

type SignupFlowDataT = {
  countryCode: CountryT["code"]
  givenName: string
  lastName: string
}

type SignupFlowContextT = [
  Partial<SignupFlowDataT>,
  (userData: Partial<SignupFlowDataT>) => void
]

const initialContext: SignupFlowContextT = [{}, () => {}]

export const SignupFlowContext =
  createContext<SignupFlowContextT>(initialContext)

export function SignupFlowContextProvider(props: {
  children: React.ReactElement
}) {
  const [userData, setUserData] = useState<SignupFlowContextT[0]>({})

  return (
    <SignupFlowContext.Provider value={[userData, setUserData]}>
      {props.children}
    </SignupFlowContext.Provider>
  )
}
