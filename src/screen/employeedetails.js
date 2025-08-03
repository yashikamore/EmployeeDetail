import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EmployeeDetails = ({ navigation }) => {
  const [empID, setEmpID] = useState('');
  const [empName, setEmpName] = useState('');
  const [empSalary, setEmpSalary] = useState('');
  const [empCompany, setEmpCompany] = useState('');
  const [empAddress, setEmpAddress] = useState('');
  const [userData, setUserData] = useState([]);

  const empNameRef = useRef();
  const empSalaryRef = useRef();
  const empCompanyRef = useRef();
  const empAddressRef = useRef();

  useEffect(() => {
    getDataFromAsync();
  }, []);

  const getDataFromAsync = async () => {
    const jsonValue = await AsyncStorage.getItem('Employee');
    if (jsonValue) {
      setUserData(JSON.parse(jsonValue));
    } else {
      setUserData([]);
    }
  };

  const saveValueFunction = async () => {
    const data = {
      empID,
      empName,
      empSalary,
      empCompany,
      empAddress,
    };

    const updatedData = [...userData, data];
    setUserData(updatedData);
    await AsyncStorage.setItem('Employee', JSON.stringify(updatedData));

    setEmpID('');
    setEmpName('');
    setEmpSalary('');
    setEmpCompany('');
    setEmpAddress('');

    Alert.alert('Success', 'Employee data saved successfully!');
  };

  const handlePress = () => {
    if (!empID || !empName || !empSalary || !empCompany || !empAddress) {
      Alert.alert('Validation', 'Please fill all the fields');
      return;
    }
    saveValueFunction();
    navigation.navigate('Employee');
  };

  const renderInput = (
    label,
    placeholder,
    value,
    onChangeText,
    ref = null,
    onSubmitEditing = null,
  ) => (
    <>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        ref={ref}
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#888"
        value={value}
        onChangeText={onChangeText}
        returnKeyType="next"
        onSubmitEditing={onSubmitEditing}
      />
    </>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'handled'}
      >
        <Text style={styles.header}>Employee Registration Form</Text>

        {renderInput(
          'Employee ID',
          'Enter your Employee ID',
          empID,
          setEmpID,
          null,
          () => empNameRef.current.focus(),
        )}
        {renderInput(
          'Employee Name',
          'Enter your Name',
          empName,
          setEmpName,
          empNameRef,
          () => empSalaryRef.current.focus(),
        )}
        {renderInput(
          'Salary',
          'Enter your Salary',
          empSalary,
          setEmpSalary,
          empSalaryRef,
          () => empCompanyRef.current.focus(),
        )}
        {renderInput(
          'Company Name',
          'Enter your Company Name',
          empCompany,
          setEmpCompany,
          empCompanyRef,
          () => empAddressRef.current.focus(),
        )}
        {renderInput(
          'Address',
          'City, Scheme, State',
          empAddress,
          setEmpAddress,
          empAddressRef,
        )}

        <TouchableOpacity style={styles.submitBtn} onPress={handlePress}>
          <Text style={styles.submitText}>SUBMIT</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default EmployeeDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f4f7',
    padding: 15,
  },
  header: {
    fontSize: 22,
    fontWeight: '800',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#34495e',
    marginLeft: 5,
  },
  input: {
    borderColor: '#3498db',
    borderWidth: 1.5,
    marginVertical: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  submitBtn: {
    alignItems: 'center',
    backgroundColor: '#2980b9',
    padding: 15,
    marginTop: 20,
    borderRadius: 10,
    elevation: 3,
  },
  submitText: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
  },
});
