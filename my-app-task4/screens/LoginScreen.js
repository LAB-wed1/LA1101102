import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { loginUser } from '../api/firebase';
import { useAuth } from '../context/AuthContext';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    setErrorMessage('');
    
    if (!email || !password) {
      setErrorMessage('กรุณากรอกอีเมลและรหัสผ่าน');
      return;
    }

    setLoading(true);
    try {
      const { user, error } = await loginUser(email, password);
      
      if (error) {
        setErrorMessage(error);
        return;
      }
      
      // No need to navigate manually - the app navigator will handle this
    } catch (error) {
      setErrorMessage(error.message || 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ กรุณาลองอีกครั้ง');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      
      {errorMessage ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      ) : null}
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setErrorMessage('');
          }}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setErrorMessage('');
          }}
          secureTextEntry
        />
      </View>
      
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>
      
      <View style={styles.linkContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.link}>Don't have an account? Register</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => navigation.navigate('Forgot')}>
          <Text style={styles.link}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  link: {
    color: '#007BFF',
    fontSize: 16,
    marginVertical: 5,
  },
  errorContainer: {
    backgroundColor: '#FFE8E8',
    borderWidth: 1,
    borderColor: '#FF0000',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  errorText: {
    color: '#FF0000',
    textAlign: 'center',
    fontSize: 14,
  },
});

export default LoginScreen;
