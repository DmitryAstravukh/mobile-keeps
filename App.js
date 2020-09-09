import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Home, AddKeep, EditKeep } from './screens';

import { fromLeft } from 'react-navigation-transitions';

const Stack = createStackNavigator();

// const transitionConfig = () => {
//   return {
//     transitionSpec: {
//       duration: 750,
//       easing: Easing.out(Easing.poly(4)),
//       timing: Animated.timing,
//       useNativeDriver: true,
//     },
//     screenInterpolator: sceneProps => {
//       const { position, layout, scene } = sceneProps

//       const thisSceneIndex = scene.index
//       const width = layout.initWidth

//       const translateX = position.interpolate({
//         inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
//         outputRange: [width, 0, 0]
//       })

//       const slideFromRight = { transform: [{ translateX }] }

//       return slideFromRight
//     },
//   }
// }

export default function App() {
  return (
    <NavigationContainer >
      <Stack.Navigator  initialRouteName='Home'
                        screenOptions={{
                          // headerShown: false,
                          headerStyle: {
                            backgroundColor: '#8529e4',
                          },
                          headerTintColor: '#ffffff',
                          headerTitleStyle: {
                            fontWeight: 'bold'
                          },
                        }}>

        <Stack.Screen name='Home' options={{ title: 'Заметки' }}>
          {props => <Home {...props} />}
        </Stack.Screen> 

        <Stack.Screen name='AddKeep' options={{ title: 'Добавление заметки', transitionConfig: () => fromLeft() }}>
          {props => <AddKeep {...props} />}
        </Stack.Screen>

        <Stack.Screen name='EditKeep' options={{ title: 'Редактирование заметки' }}>
          {props => <EditKeep {...props} />}
        </Stack.Screen> 

      </Stack.Navigator>
    </NavigationContainer>
  );
}


