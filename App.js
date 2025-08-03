import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import EmployeeForm from './src/screen/employeedetails';
import Roots from './src/navigation/roots';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Roots />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
