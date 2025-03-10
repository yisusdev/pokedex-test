import {View, Text, TextInput, FlatList, TouchableOpacity, Image, Pressable, StyleSheet} from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { Pokemon } from '@/interfaces/Pokemon';
import Animated, {useAnimatedStyle, useSharedValue, withSpring} from "react-native-reanimated";
import 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Capitalize, FromUrlToId } from '@/utils/util';

export default function Home() {
    const shadowOpacity = useSharedValue(0.15);
    const elevation = useSharedValue(5);
    const [search, setSearch] = useState('');
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
    const router = useRouter();

    const animatedStyle = useAnimatedStyle(() => ({
        shadowOpacity: shadowOpacity.value,
        elevation: elevation.value,
    }));

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon?limit=50')
            .then((response) => response.json())
            .then((data) => setPokemonList(data.results));
    }, []);

    return (
        <View style={{ backgroundColor: '#DC0A2D', flex: 1 }}>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    padding: 12,
                }}
            >
                <Image
                    source={require('../assets/images/Pokeball.png')}
                    style={{ width: 24, height: 24, marginRight: 16 }}
                />
                <Text
                    style={{
                        color: 'white',
                        fontFamily: 'Poppins',
                        fontStyle: 'normal',
                        fontWeight: '700',
                        fontSize: 24,
                        lineHeight: 32,
                    }}
                >
                    Pokédex
                </Text>
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingBottom: 30,
                    paddingHorizontal: 16,
                }}
            >
                <View style={styles.container}>
                    <TextInput
                        style={styles.input}
                        placeholder="Search"
                        placeholderTextColor="#666666"
                        value={search}
                        onChangeText={setSearch}
                    />
                    <Icon name="search" size={20} color="#DC0A2D" style={styles.icon} />
                    <Icon
                        name="close"
                        size={20}
                        color="#DC0A2D"
                        style={[styles.closeIcon, { display: search ? 'flex' : 'none' }]}
                        onPress={() => setSearch('')}
                    />
                </View>
                <Pressable
                    onPressIn={() => {
                        shadowOpacity.value = withSpring(0.3);
                        elevation.value = withSpring(10);
                    }}
                    onPressOut={() => {
                        shadowOpacity.value = withSpring(0.15);
                        elevation.value = withSpring(5);
                    }}
                >
                    <Animated.View style={[styles.filterContainer, animatedStyle]}>
                        <Icon name="sort" size={20} color="#DC0A2D" />
                    </Animated.View>
                </Pressable>
            </View>
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#FFFFFF',
                    borderRadius: 8,
                    paddingTop: 24,
                    marginHorizontal: 5,
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.15,
                    shadowRadius: 2.62,
                    elevation: 2,
                }}
            >
                <FlatList
                    data={pokemonList.filter(p => p.name.includes(search.toLowerCase()))}
                    keyExtractor={(item) => item.name}
                    numColumns={3}
                    style={{ padding: 5, marginBottom: 30 }}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={{
                                backgroundColor: 'white',
                                borderRadius: 10,
                                marginBottom: 8,
                                marginHorizontal: 5,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            onPress={() => router.push(`/detail/${item.name}`)}
                        >
                            <View
                                style={{
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'space-around',
                                    width: 104,
                                    height: 108,
                                    borderRadius: 10,
                                    shadowColor: '#000',
                                    shadowOffset: {
                                        width: 0,
                                        height: 2,
                                    },
                                    shadowOpacity: 0.15,
                                    shadowRadius: 2.62,
                                    elevation: 2,
                                    backgroundColor: 'white',
                                }}
                            >
                                {/* Pokemon id */}
                                <Text
                                    style={{
                                        color: '#666666',
                                        fontFamily: 'Poppins',
                                        fontStyle: 'normal',
                                        fontSize: 12,
                                        position: 'absolute',
                                        top: 0,
                                        right: 0,
                                        marginRight: 6,
                                    }}
                                >
                                    {`#${FromUrlToId(item.url)}`}
                                </Text>
                                {/* Pokemon image */}
                                <Image
                                    source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${item.url.split('/')[6]}.png`}}
                                    style={{ width: 72, height: 72, position: 'absolute', top: 0, zIndex: 1 }}
                                />
                                {/* Pokemon name */}
                                <View
                                    style={{
                                        backgroundColor: '#EFEFEF',
                                        borderBottomLeftRadius: 10,
                                        borderBottomRightRadius: 10,
                                        width: '100%',
                                        height: 55,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        paddingTop: 20,
                                        paddingLeft: 5,
                                        paddingRight: 5,
                                        bottom: 0,
                                        marginTop: 53,
                                        borderTopLeftRadius: 10,
                                        borderTopRightRadius: 10,
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: '#1D1D1D',
                                            fontFamily: 'Poppins',
                                            fontStyle: 'normal',
                                            fontSize: 14,
                                        }}
                                    >
                                        {Capitalize(item.name)}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 8,
        height: 45,
        width: '80%',
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#666666',
        backgroundColor: 'white',
        marginLeft: 30,
        width: '100%',
    },
    icon: {
        position: 'absolute',
        left: 16,
    },
    closeIcon: {
        position: 'absolute',
        right: 16,
    },
    filterContainer: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 6,
    },
});