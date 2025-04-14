import { ActivityIndicator, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigation } from './navigation/app';
import { useFonts, Chewy_400Regular } from "@expo-google-fonts/chewy";
import { useStores } from './stores';
import { observer } from 'mobx-react';


const App = observer(() => {
  let [fontsLoaded, error] = useFonts({
    Chewy_400Regular,
  });

  const { colorStore } = useStores();
  const { background } = colorStore.colors;
  const { theme } = colorStore;


  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <StatusBar
        animated={true}
        backgroundColor={background}
        hidden={false}
        barStyle={theme =='light' ? 'dark-content' : 'light-content'}
      />
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    </SafeAreaProvider>
  );
});

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
