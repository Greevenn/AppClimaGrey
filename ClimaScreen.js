import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';


//componente ClimaScreen como una función que devuelve la
//interfaz de usuario de la lista con el estado del clima de los países.
function ClimaScreen() {
    const [climaData, setClimaData] = useState(null);
    const countries = [
        'Nicaragua',
        'Guatemala',
        'Costa Rica',
        'Honduras',
        'El Salvador'
        
        
    ];

    useEffect(() => {
        const fetchClimaData = async () => {
            try {
                const responsePromise = countries.map(country =>
                    axios.get(
                        `http://api.weatherapi.com/v1/current.json?key=7be239563a974f70b6c195854233006&q=${country}&lang=es`,
                    ),
                );
                const responses = await Promise.all(responsePromise);
                const climaDataArray = responses.map(response => response.data);
                setClimaData(climaDataArray);
            } catch (error) {
                console.error(error);
            }
        };
        fetchClimaData();
    }, []);

    if (!climaData) {
        return (
            <View>
                <Text>
                    Cargando...
                </Text>
            </View>
        );
    }
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.containerTitle}>
            <Text style={styles.title}>Clima de países Centroamericanos</Text>
            </View>
            {climaData.map((clima, index) => (
                <View key={index}>
                   <Text style={styles.condition}>
                       ----------------------------
                    </Text>
                   
                    <Text style={styles.region}>
                        Ubicacion: {clima.location.region}
                    </Text>
                    <Text style={styles.country}>
                        Ubicacion: {clima.location.country}
                    </Text>
                    <Text style={styles.temp_c}>
                        Temperatura: {clima.current.temp_c} C°
                    </Text>
                    <Text style={styles.temp_f}>
                        Temperatura: {clima.current.temp_f} F°
                    </Text>
                    <Text style={styles.condition}>
                        Condicion del Clima: {clima.current.condition.text}
                    </Text>
                    <Text style={styles.condition}>
                       ----------------------------
                    </Text>
                    
                    
                </View>
                
                
            ))}
        </ScrollView>
    );

}
const styles = StyleSheet.create({
    containerTitle: {
      fontSize: 24,
      textAlign: 'center',
      marginTop: 20,
      marginBottom: 10,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    container: {
      padding: 20,
      alignItems: 'center',
      marginTop: 20,
      marginBottom: 10,
    },
    ubicacion: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    region: {
      fontSize: 20,
      marginBottom: 4,
    },
    country: {
      fontSize: 20,
      marginBottom: 4,
    },
    temperature: {
      fontSize: 24,
      marginBottom: 4,
    },
    condition: {
      fontSize: 20,
      marginBottom: 4,
    },
  });
  
  

export default ClimaScreen;