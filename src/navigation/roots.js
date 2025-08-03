// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Employee from '../screen/employee';
import EmployeeDetails from '../screen/employeedetails';

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Employee"
        component={Employee}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EmployeeForm"
        component={EmployeeDetails}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default function Roots() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
