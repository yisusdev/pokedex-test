import {View, Text, ImageBackground, Pressable} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pokemon, PokemonStats } from '@/interfaces/Pokemon';
import { SvgUri } from 'react-native-svg';
import { mapColor } from '@/utils/pokemonColorPalette';
import { Capitalize, FromNumberToId } from "@/utils/util";
import Icon from "react-native-vector-icons/MaterialIcons";
import IconCm from "react-native-vector-icons/MaterialCommunityIcons";
import { PokemonStat } from "@/components/PokemonStat";

export default function Detail() {
    const { name } = useLocalSearchParams();
    const [pokemon, setPokemon] = useState<Pokemon>();
    const [pokemonColor, setPokemonColor] = useState<string>('');
    const [pokemonStats, setPokemonStats] = useState<PokemonStats[]>();

    useEffect(() => {
        if (!name) return;
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .then((response) => response.json())
            .then((data) => {
                let top = 320;
                const stats: PokemonStats[] = data.stats.map((stat: { stat: { name: string; }; base_stat: number; }, index: number) => {
                    top += index === 0 ? 0 : 20;

                    return ({
                        name: getStatAbreviation(stat.stat.name),
                        base_stat: stat.base_stat,
                        top: top,
                    });
                });

                setPokemonStats(stats);
                setPokemon(data);
            });
    }, [name]);

    useEffect(() => {
        if (!pokemon) return;

        const type = pokemon.types[0].type.name;
        const color = mapColor(type);

        setPokemonColor(color);
    }, [pokemon]);

    if (!pokemon) return <Text style={{ textAlign: 'center', marginTop: 10, fontSize: 20, color: 'black' }}>Loading...</Text>;

    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 4,
            paddingHorizontal: 4,
            backgroundColor: pokemonColor,
        }}>
            <ImageBackground
                source={require('../../assets/images/Pokeball_lg.png')}
                resizeMode="stretch"
                style={{
                    position: 'absolute',
                    top: 15,
                    right: 15,
                    height: 208,
                    width: 206,
                    opacity: 0.1,
                }}
            >
            </ImageBackground>
            <View
                style={{
                    padding: 20,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                }}
            >
                <Pressable
                    onPress={() => router.back()}
                >
                    <Icon name={'arrow-back'} size={32} color={'white'} style={{ marginRight: 10 }} />
                </Pressable>
                <Text style={{
                    color: 'white',
                    fontSize: 32,
                    fontWeight: 'bold',
                    fontFamily: 'Poppins',
                }}>
                    {Capitalize(pokemon.name)}
                </Text>
                <Text style={{
                    color: 'white',
                    fontSize: 16,
                    fontWeight: 'bold',
                    fontFamily: 'Poppins',
                    position: 'absolute',
                    right: 28,
                    lineHeight: 32,
                }}>
                    #{FromNumberToId(pokemon.id)}
                </Text>
            </View>
            <View
                style={{
                    position: 'absolute',
                    top: 80,
                    padding: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    zIndex: 1,
                }}
            >
                <SvgUri
                    width="200"
                    height="200"
                    uri={pokemon?.sprites?.other?.dream_world?.front_default}
                />
            </View>
            <View
                style={{
                    position: 'absolute',
                    top: 224,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#FFFFFF',
                    borderRadius: 8,
                    width: '100%',
                    height: '100%',
                    marginHorizontal: 5,
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        top: 90,
                        position: 'absolute',
                    }}
                >
                    {pokemon.types.map((type, index) => (
                        <View
                            key={index}
                            style={{
                                backgroundColor: mapColor(type.type.name),
                                borderRadius: 16,
                                paddingVertical: 4,
                                paddingHorizontal: 8,
                                margin: 8,
                            }}
                        >
                            <Text
                                style={{
                                    color: '#FFFFFF',
                                    fontSize: 14,
                                    fontWeight: 'bold',
                                    fontFamily: 'Poppins',
                                }}
                            >
                                {Capitalize(type.type.name)}
                            </Text>
                        </View>
                    ))}
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        top: 145,
                        position: 'absolute',
                    }}
                >
                    <Text style={{
                        color: mapColor(pokemon.types[0].type.name),
                        fontSize: 22,
                        fontWeight: 'bold',
                        fontFamily: 'Poppins'
                    }}>
                        About
                    </Text>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        top: 190,
                        position: 'absolute',
                    }}
                >
                    <View
                        style={{
                            borderRightWidth: 1,
                            borderRightColor: '#E0E0E0',
                            paddingLeft: 20,
                            paddingRight: 20,
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: 16,
                            }}
                        >
                            <IconCm
                                name={'weight-kilogram'}
                                size={24}
                                color={'#1D1D1D'}
                                style={{ marginRight: 8 }}
                            />
                            <Text style={{
                                color: '#000000',
                                fontSize: 14,
                                fontFamily: 'Poppins',
                                lineHeight: 20,
                            }}>
                                {pokemon.weight / 10}kg
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Text style={{
                                color: '#666666',
                                fontSize: 12,
                                fontFamily: 'Poppins',
                            }}>
                                Weight
                            </Text>
                        </View>
                    </View>
                    <View
                        style={{
                            borderRightWidth: 1,
                            borderRightColor: '#E0E0E0',
                            paddingLeft: 20,
                            paddingRight: 20,
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: 16,
                            }}
                        >
                            <Icon
                                name={'height'}
                                size={24}
                                color={'#1D1D1D'}
                                style={{ marginRight: 8 }}
                            />
                            <Text style={{
                                color: '#000000',
                                fontSize: 14,
                                fontFamily: 'Poppins',
                                lineHeight: 20,
                            }}>
                                {pokemon.height / 10}m
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Text style={{
                                color: '#666666',
                                fontSize: 12,
                                fontFamily: 'Poppins',
                            }}>
                                Height
                            </Text>
                        </View>
                    </View>
                    <View
                        style={{
                            paddingLeft: 20,
                            paddingRight: 20,
                        }}
                    >
                        {pokemon.abilities.map((ability, index) => (
                            <View
                                key={index}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Text>
                                    {Capitalize(ability.ability.name)}
                                </Text>
                            </View>
                        ))}
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: 5,
                            }}
                        >
                            <Text style={{
                                color: '#666666',
                                fontSize: 12,
                                fontFamily: 'Poppins',
                            }}>
                                Moves
                            </Text>
                        </View>
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        top: 280,
                        position: 'absolute',
                    }}
                >
                    <Text style={{
                        color: mapColor(pokemon.types[0].type.name),
                        fontSize: 22,
                        fontWeight: 'bold',
                        fontFamily: 'Poppins'
                    }}>
                        Base Stats
                    </Text>
                </View>
                {pokemonStats && pokemonStats.map((stat, index) => (
                    <PokemonStat
                        key={index}
                        stat={stat}
                        top={stat.top}
                        type={pokemon.types[0].type.name}
                    />
                ))}
            </View>
        </View>
    );
}

function getStatAbreviation(name: string) {
    switch (name) {
        case 'hp':
            return 'HP';
        case 'attack':
            return 'ATK';
        case 'defense':
            return 'DEF';
        case 'special-attack':
            return 'SATK';
        case 'special-defense':
            return 'SDEF';
        case 'speed':
            return 'SPD';
        default:
            return '';
    }
}