import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigation } from './navigation/app';
import { useFonts, Chewy_400Regular } from "@expo-google-fonts/chewy";
import { useStores } from './stores';


export default function App() {
  let [fontsLoaded] = useFonts({
    Chewy_400Regular,
  });
  const {colorStore} = useStores()
  
  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <SafeAreaProvider>
        <NavigationContainer>
          <AppNavigation/>
        </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
