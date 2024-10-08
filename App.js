import './gesture-handler';
import React, { useState, useEffect, useCallback } from 'react'
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';

import MealsNavigator from './navigation/MealsNavigator';
import store from './store/store';


SplashScreen.preventAutoHideAsync();

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
}

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await fetchFonts;
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setFontLoaded(true);
      }
    }
    prepare();
  }, []);

  const onLayOutRootView = useCallback(async () => {
    if (fontLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontLoaded]);


  if (!fontLoaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <NavigationContainer onReady={onLayOutRootView}>
        <MealsNavigator />
      </NavigationContainer>
    </Provider>
  )
}
