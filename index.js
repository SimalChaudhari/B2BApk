import 'react-native-gesture-handler'; // Gesture handler ko import karein
import { AppRegistry } from 'react-native';
import App from './App'; // Aapki App component
import { name as appName } from './app.json'; // App name from app.json

AppRegistry.registerComponent(appName, () => App); // Register karein
