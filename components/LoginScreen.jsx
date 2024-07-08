import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        // setLoading(true);
        try {
            const response = await axios.post(
                'https://smp.obifyconsulting.com/wp-json/jwt-auth/v1/token',
                JSON.stringify({ username, password })
            );

            if (response.data.token) {
                console.log(response.data.token)
                await AsyncStorage.setItem('token', response.data.token);
                Alert.alert('Login successful');
            } else {
                Alert.alert('Login failed', 'Invalid credentials');
            }
        } catch (error) {
            Alert.alert('Error', 'Something went wrong');
            console.log(error)
        }
        // finally {
        //     setLoading(false);
        // }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Login" onPress={handleLogin} disabled={loading} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginBottom: 16,
        borderRadius: 4,
    },
});

export default LoginScreen;
