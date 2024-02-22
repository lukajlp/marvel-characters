import { CharacterDataWrapper, ComicDataWrapper, EventDataWrapper, SerieDataWrapper } from "@/types/marvels";
import md5 from "md5";

const API_BASE_URL = "https://gateway.marvel.com/v1/public";
const API_PUBLIC_KEY = process.env.NEXT_PUBLIC_API_PUBLIC_KEY;
const API_PRIVATE_KEY = process.env.NEXT_PUBLIC_API_PRIVATE_KEY;

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

export const getCharacters = async (
  comics?: number | null,
  series?: number | null,
  events?: number | null,
  page: number = 1
): Promise<CharacterDataWrapper> => {
  const limit = 20;
  const offset = (page - 1) * limit;  
  let url = `${API_BASE_URL}/characters?limit=${limit}&offset=${offset}&${query}`;
  if (comics) url += `&comics=${comics}`;
  if (series) url += `&series=${series}`;
  if (events) url += `&events=${events}`;
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

export const getComics = async (): Promise<ComicDataWrapper> => {
  const url = `${API_BASE_URL}/comics?${query}`;
  const response = await fetch(url);
  return handleResponse<ComicDataWrapper>(response);
};

export const getSeries = async (): Promise<SerieDataWrapper> => {
  const url = `${API_BASE_URL}/series?${query}`;
  const response = await fetch(url);
  return handleResponse<SerieDataWrapper>(response);
};

export const getEvents = async (): Promise<EventDataWrapper> => {
  const url = `${API_BASE_URL}/events?${query}`;
  const response = await fetch(url);
  return handleResponse<EventDataWrapper>(response);
};