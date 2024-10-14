// import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import StackNavigator from './navigation/StackNavigator';
import { Provider } from "react-redux";
import store from "./store";
import Toast from 'react-native-toast-message';
import { UserContext } from './UserContext';

export default function App() {
  return (
    <Provider store={store}>
      <UserContext>
        <View style={styles.container}>
          <StackNavigator />
          <Toast ref={(ref) => Toast.setRef(ref)} />
        </View>
      </UserContext>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
