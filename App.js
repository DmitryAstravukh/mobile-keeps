import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Home, AddKeep, EditKeep } from './screens';


import { Provider } from 'react-redux';
import store from './redux/store';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer >
        <Stack.Navigator  initialRouteName='Home'
                          screenOptions={{
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

          <Stack.Screen name='AddKeep' options={{ title: 'Добавление заметки' }}>
            {props => <AddKeep {...props} />}
          </Stack.Screen>

          <Stack.Screen name='EditKeep' options={{ title: 'Редактирование заметки' }}>
            {props => <EditKeep {...props} />}
          </Stack.Screen> 

        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}


