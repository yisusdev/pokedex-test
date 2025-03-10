import { PokemonStats } from "@/interfaces/Pokemon";
import { Text, View } from "react-native";
import { ProgressBar } from "react-native-paper";
import { mapColor } from "@/utils/pokemonColorPalette";

export function PokemonStat({ stat, type, top }: { stat: PokemonStats, type: string, top: number }) {
    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                top: top,
                position: 'absolute',
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 10,
                    borderRightWidth: 1,
                    borderRightColor: '#E0E0E0',
                    width: 50,
                }}
            >
                <Text style={{
                    color: mapColor(type),
                    fontSize: 12,
                    fontFamily: 'Poppins',
                }}>
                    {stat.name}
                </Text>
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 10,
                    marginLeft: 10,
                }}
            >
                <Text style={{
                    color: '#666666',
                    fontSize: 12,
                    fontFamily: 'Poppins',
                }}>
                    {stat.base_stat}
                </Text>
            </View>
            <View
                style={{
                    flexDirection: 'column',
                    marginTop: 10,
                    marginLeft: 10,
                    width: 200,
                }}
            >
                <ProgressBar
                    progress={stat.base_stat / 100}
                    color={mapColor(type)}
                />
            </View>
        </View>
    )
}