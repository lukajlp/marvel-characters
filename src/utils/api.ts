import { CharacterDataWrapper } from "@/types/marvels";
import md5 from "md5";

const API_BASE_URL = "https://gateway.marvel.com/v1/public";
const API_PUBLIC_KEY = "05e7f4b1cfa592d122f2e9a2cfda985d";
const API_PRIVATE_KEY = "f698036e8809d234ed5b65fe8c3d1a8f422f65a1";

const getTimeStamp = () => Date.now().toString();
const getHash = (timestamp: string) => md5(timestamp+API_PRIVATE_KEY+API_PUBLIC_KEY);

const timestamp = getTimeStamp();
const hash = getHash(timestamp);
const query = `ts=${timestamp}&apikey=${API_PUBLIC_KEY}&hash=${hash}`;

const handleResponse = async <T>(response: Response) => {
    if(!response.ok) {
        throw new Error(response.statusText);
    }
    const data = await response.json();
    return data.data as T;
};

export const getCharacters = async (): Promise<CharacterDataWrapper> => {
  const url = `${API_BASE_URL}/characters?${query}`;
  const response = await fetch(url);
  return handleResponse<CharacterDataWrapper>(response);
};

export const detailCharacters = async (characterId: string): Promise<CharacterDataWrapper> => {
  const url = `${API_BASE_URL}/characters/${characterId}?${query}`;
  const response = await fetch(url);
  return handleResponse<CharacterDataWrapper>(response);
};

export const searchCharacters = async (querySearch: string | null): Promise<CharacterDataWrapper> => {
  const url = `${API_BASE_URL}/characters?nameStartsWith=${querySearch}&limit=99&${query}`;
  const response = await fetch(url);
  return handleResponse<CharacterDataWrapper>(response);
};
