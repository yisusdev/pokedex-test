import { Stack } from 'expo-router';
import { View } from 'react-native';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
        Poppins: require('../assets/fonts/Poppins-Regular.ttf'),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    return (
        <View style={{ flex: 1 }}>
            {/* Stack Navigation */}
            <Stack>
                <Stack.Screen name="index" options={{ title: 'Pokédex', headerShown: false }} />
                <Stack.Screen name="detail/[name]" options={{ title: 'Detalles', headerShown: false }} />
            </Stack>
        </View>
    );
}