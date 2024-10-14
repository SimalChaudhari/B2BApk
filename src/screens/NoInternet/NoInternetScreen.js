import { View } from "react-native";
import { Text } from "react-native-paper";

const NoInternetScreen = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Please connect to the internet</Text>
      </View>
    );
  };
  
  export default NoInternetScreen;
  