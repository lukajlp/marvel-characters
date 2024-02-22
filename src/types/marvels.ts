export interface Character {
    id: number;
    name: string;
    description: string;
    thumbnail: {
        path: string;
        extension: string;
    };
}

export interface CharacterDataWrapper {
    results: Character[];
}

export interface Comic {
    id: number;
    title: string;
    characters: CharacterList;
}

export interface ComicDataWrapper {
    results: Comic[];
}

export interface Serie {
    id: number;
    title: string;
    characters: CharacterList;
}

export interface SerieDataWrapper {
    results: Serie[];
}

export interface Event {
    id: number;
    title: string;
    characters: CharacterList;
}

export interface EventDataWrapper {
    results: Event[];
}

export interface CharacterList {
    available?: number;
    returned?: number;
    collectionURI?: string;
    items?: CharacterSummary[];
}

export interface CharacterSummary {
    resourceURI?: string;
    name?: string;
    role?: string;
}