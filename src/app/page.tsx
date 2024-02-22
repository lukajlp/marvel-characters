"use client";
import { useState, useEffect } from "react";
import CharacterCard from "@/components/CharacterCard";
import { getCharacters, getComics, getEvents, getSeries } from "@/utils/api";
import {
  Character,
  ComicDataWrapper,
  EventDataWrapper,
  SerieDataWrapper,
} from "@/types/marvels";

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [comicsData, setComicsData] = useState<ComicDataWrapper | null>(null);
  const [seriesData, setSeriesData] = useState<SerieDataWrapper | null>(null);
  const [eventsData, setEventsData] = useState<EventDataWrapper | null>(null);
  const [page, setPage] = useState(1);

  const [selectedComicId, setSelectedComicId] = useState<number | undefined>(
    undefined
  );
  const [selectedSeriesId, setSelectedSeriesId] = useState<number | undefined>(
    undefined
  );
  const [selectedEventId, setSelectedEventId] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    const fetchData = async () => {
      const [comics, series, events] = await Promise.all([
        getComics(),
        getSeries(),
        getEvents(),
      ]);
      setComicsData(comics);
      setSeriesData(series);
      setEventsData(events);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchCharacters = async () => {
      const charactersData = await getCharacters(
        selectedComicId,
        selectedSeriesId,
        selectedEventId,
        page
      );
      if (page > 1) {
        setCharacters((prevCharacters) => [
          ...prevCharacters,
          ...charactersData.results,
        ]);
      } else {
        setCharacters(charactersData.results);
      }
    };

    fetchCharacters();
  }, [selectedComicId, selectedSeriesId, selectedEventId, page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop <
        document.documentElement.offsetHeight - 500
      )
        return;
      setPage((prevPage) => prevPage + 1);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleComicChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedComicId(Number(event.target.value));
    setPage(1);
  };

  const handleSeriesChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSeriesId(Number(event.target.value));
    setPage(1);
  };

  const handleEventChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedEventId(Number(event.target.value));
    setPage(1);
  };

  const clearFilters = () => {
    setSelectedComicId(undefined);
    setSelectedSeriesId(undefined);
    setSelectedEventId(undefined);
    setPage(1);
  };

  return (
    <main>
      <div className="container flex flex-grow gap-10 items-center justify-center mt-10">
        <select
          className="select select-ghost w-full max-w-xs"
          value={selectedComicId || ""}
          onChange={handleComicChange}
        >
          <option disabled value="" className="text-center">
            Comic
          </option>
          {comicsData?.results.map((comic) => (
            <option key={comic.id} value={comic.id}>
              {comic.title}
            </option>
          ))}
        </select>
        <select
          className="select select-ghost w-full max-w-xs"
          value={selectedSeriesId || ""}
          onChange={handleSeriesChange}
        >
          <option disabled value="" className="text-center">
            Serie
          </option>
          {seriesData?.results.map((serie) => (
            <option key={serie.id} value={serie.id}>
              {serie.title}
            </option>
          ))}
        </select>
        <select
          className="select select-ghost w-full max-w-xs"
          value={selectedEventId || ""}
          onChange={handleEventChange}
        >
          <option disabled value="" className="text-center">
            Event
          </option>
          {eventsData?.results.map((event) => (
            <option key={event.id} value={event.id}>
              {event.title}
            </option>
          ))}
        </select>
        <button className="button button-ghost" onClick={clearFilters}>
          Limpar filtros
        </button>
      </div>
      <div className="grid gap-4 mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
    </main>
  );
}
