import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

const Employee = ({ navigation }) => {
  const [empData, setEmpData] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      employeeData();
    }
  }, [isFocused]);

  const employeeData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('Employee');
      const data = JSON.parse(jsonValue) || [];
      setEmpData(data);
    } catch (e) {
      console.log(e);
    }
  };

  const removeEmpDetail = async index => {
    try {
      const jsonValue = await AsyncStorage.getItem('Employee');
      const data = JSON.parse(jsonValue) || [];
      const updatedData = data.filter((_, i) => i !== index);
      await AsyncStorage.setItem('Employee', JSON.stringify(updatedData));
      employeeData();
    } catch (e) {
      console.log(e);
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.card}>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{item.empName}</Text>
          <Text style={styles.company}>{item.empCompany}</Text>
          <Text style={styles.salary}>💰 {item.empSalary}</Text>
        </View>
        <View style={styles.rightSection}>
          <Text style={styles.empID}>#{item.empID}</Text>

          <View style={styles.btnRow}>
            <TouchableOpacity
              style={[styles.actionBtn, { backgroundColor: '#e74c3c' }]}
              onPress={() => removeEmpDetail(index)}
            >
              <Text style={styles.btnText}>Delete</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionBtn, { backgroundColor: '#3498db' }]}
              onPress={() => {
                navigation.navigate('EmployeeForm', { item });
              }}
            >
              <Text style={styles.btnText}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Employee Details</Text>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => navigation.navigate('EmployeeForm')}
        >
          <Text style={styles.addText}>+ Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={empData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default Employee;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f4f7',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
    margin: 10,
    padding: 15,
    backgroundColor: '#2ecc71',
    borderRadius: 15,
    elevation: 3,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: '800',
    color: 'white',
  },
  addBtn: {
    backgroundColor: '#27ae60',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  card: {
    flexDirection: 'row',
    marginHorizontal: 15,
    marginVertical: 8,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  name: {
    fontSize: 20,
    fontWeight: '800',
    color: '#2c3e50',
  },
  company: {
    fontSize: 16,
    fontWeight: '500',
    color: '#7f8c8d',
    marginVertical: 2,
  },
  salary: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f39c12',
  },
  empID: {
    fontSize: 16,
    fontWeight: '700',
    color: '#16a085',
    marginBottom: 10,
    textAlign: 'right',
  },
  rightSection: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginLeft: 10,
  },
  btnRow: {
    flexDirection: 'row',
    gap: 10,
  },
  actionBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  btnText: {
    color: 'white',
    fontWeight: '700',
  },
});
