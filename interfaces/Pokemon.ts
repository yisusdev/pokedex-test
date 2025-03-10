export interface Pokemon {
    id: number;
    name: string;
    url: string;
    sprites: {
        front_default: string;
        other: {
            dream_world: {
                front_default: string;
            };
        };
    };
    height: number;
    weight: number;
    species: {
        name: string;
        url: string;
    };
    types: {
        type: {
            name: string;
        };
    }[];
    abilities: {
        ability: {
            name: string;
        };
    }[];
    stats: {
        base_stat: number;
        stat: {
            name: string;
        };
    }[];
}

export interface PokemonStats {
    name: string;
    base_stat: number;
    top: number;
}