import { StyleSheet, Dimensions } from 'react-native';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

screenHeight = Dimensions.get('window').height;


const styles = StyleSheet.create({

  SafeAreaView: {
    width: "100%",
    flex: 1,
    backgroundColor: "white",
  },

  GoBackBar: {
    width: "100%",
    paddingHorizontal: 10,
    paddingTop: 5,
    alignItems: "flex-start",
    justifyContent: "center",
  },

  HomepageTopbar: {
    width: "100%",
    minHeight: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1161a8",
    borderBottomWidth: 1,
    borderBottomColor: "white",
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
  },

  LoginBar: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 75,
    padding: 5,
    marginTop: 15,
  },

  SozlesmeBar: {
    width: "100%",
    padding: 5,
    paddingHorizontal: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },

  HizmetTipiStateBar: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    padding: 5,
  },

  RequesterLogin: {
    width: "100%",
    flex: 1,
  },

  RequestOpenerLogin: {
    width: "100%",
    flex: 1,
  },

  EmailPasswordContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 25,
    rowGap: 10,
  },

  LoginInputContainer: {
    width: "100%",
    padding: 5,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    color: "grey",
    columnGap: 10,
    alignItems: "center",
  },

  RememberForgotPasswordContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 25,
  },

  LoginButtonContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 25,
    marginTop: 10,
    rowGap: 5,
  },

  LoginButton: {
    width: "100%",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#a6026b",
    borderRadius: 10,
  },

  RegisterButton: {
    width: "100%",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 10,
  },

  //SIGNUP******************

  EmailPasswordContainerSignUp: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 25,
    marginTop: 10,
    rowGap: 15,
  },

  SignupInputContainer: {
    width: "100%",
    padding: 5,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    color: "grey",
    columnGap: 10,
    alignItems: "center",
  },

  SignUpBar: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 55,
  },

  SignUpButtonContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    marginTop: 10,
    rowGap: 5,
  },

  ScrollHolderViewHomepage: {
    flex: 1,
    width: "100%",
    height: 125,
    alignItems: "center",
    justifyContent: "center",
  },

  scrollView: {
    flexDirection: 'row',
  },
  childView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#8BC34A",
    columnGap: 5,
    paddingHorizontal: 10,


  },
  text: {
    fontSize: 16,
    color: 'black',
  },

  SearchBarHomepage: {
    width: "100%",
    marginHorizontal: 10,
    padding: 15,
  },

  SearchBarCategories: {
    width: "100%",
    padding: 15,
    paddingHorizontal: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },

  MainCategoriesContainer: {

    flex: 3,
    width: "100%",
    padding: 10,
    rowGap: 20,
    paddingVertical: 25,


  },

  TouchableMainCategory: {
    flex: 1,
    width: "100%",
    borderRadius: 10,
    minHeight: 120,
  },

  MainCategories: {
    flex: 1,
    width: "100%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    padding: 10,

  },


  MessageComponentContainer: {
    width: "100%",
    minHeight: 60,
    flexDirection: "row",
    alignItems: "center",

    borderRadius: 5,
    marginBottom: 10,

  },

  MessageImageContainer: {

    width: 50,
    height: 50,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,


  },

  personNameText: {
    fontSize: 17.5,
    fontWeight: "bold",


  },

  ProfileOptionsContainer: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 35,
    rowGap: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  ProfileOptionsContainerEdit: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 35,
    rowGap: 25,
    alignItems: "center",
    marginVertical: 20,
  },

  DeleteAccountContainer: {
    width: "100%",
    paddingHorizontal: 35,
    rowGap: 25,
    alignItems: "center",
    marginBottom: 25,
  },

  ProfileOptions: {
    width: "100%",
    //borderBottomWidth: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingVertical: 10,
    borderRadius: 10,
    paddingHorizontal: 2.5,
  },

  EditProfileOptions: {
    width: "100%",
    //borderBottomWidth: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingVertical: 10,
    borderRadius: 10,
    paddingHorizontal: 2.5,
    backgroundColor: "#f5f5f599",
  },

  ProfileOptionsDelete: {
    width: "100%",
    borderBottomWidth: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    paddingVertical: 5,
    borderBottomColor: "red",
  },

  ProfileTypeContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  ProfileType: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },

  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center"


  },

  CardContent: {
    width: "100%",
  },


  SearchBarComponent: {
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },

  CategoryListItemContainer: {
    width: "100%",
    maxHeight: 135,
    flex: 1,
    flexWrap: "wrap",
    backgroundColor: "#6badc999",
    borderRadius: 10,
    minHeight: 80,
    flexDirection: "row",
    columnGap: 10,
    paddingHorizontal: 15,
    padding: 10,
    alignItems: "center",
    justifyContent: "center"


  },

  CategoryListItemContainerExpanded: {
    width: "100%",
    height: 140,
    flex: 1,
    flexWrap: "wrap",
    backgroundColor: "#6badc999",
    borderRadius: 10,
    flexDirection: "row",
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,


  },

  ChatScreen: {
    flex: 1,
    padding: 15,
    width: "100%",
    alignItems: "center",

  },

  ChatInput: {
    width: "99%",
    borderWidth: 1,
    height: 40,
    alignItems: "center",
    flexDirection: "row",
    columnGap: 10,
    paddingHorizontal: 10,
    borderRadius: 100,
    bottom: 5,
    alignSelf: "center"
  },

  container2: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",

  },
  card2: {
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    backgroundColor: "white",
    height: screenHeight * 0.8,
    marginVertical: 20,
  },
  text2: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent"
  },

  cardContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: screenHeight * 0.8,
    marginTop: "5%",
    paddingTop: 10,

  },
  companyLogo: {
    width: 120,
    height: 120,
    borderRadius: 100,
    marginBottom: 20,
  },
  companyInfo: {
    alignItems: 'center',

  },
  companyName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  companyDescription: {
    fontSize: 13,
    textAlign: 'center',
    color: '#666',
    paddingHorizontal: 10,
  },

  CreateContentContainer: {
    width: "95%",
    borderWidth: 1,
    justifyContent: "center",
    borderRadius: 10,
    padding: 5

  },


});

export default styles;
