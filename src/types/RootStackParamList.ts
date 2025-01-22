export type RootStackParamList = {
  Details: { id: string | number; [key: string]: any };
  Payment: undefined;
  Cart: undefined;
  Tabs: undefined;
  Onboarding: undefined;
  LogIn: undefined;
  Register: undefined;
  ForgetPassword: undefined;
  Settings: undefined;
  GetStarted: undefined;
  About: undefined;
  Account: undefined;
};

export type DetailsScreenProps = {
  route: {
    params: RootStackParamList['Details'];
  };
  navigation: any;
};