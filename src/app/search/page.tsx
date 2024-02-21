"use client";
import CharacterCard from "@/components/CharacterCard";
import Loadingbars from "@/components/Loadingbars";
import { Character } from "@/types/marvels";
import { searchCharacters } from "@/utils/api";
import { useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";

const SearchPage: FC = () => {
  const searchParams = useSearchParams();
  const querySearch = searchParams.get("q");
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await searchCharacters(querySearch);
        setCharacters(data.results);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };
    if (querySearch) {
      fetchData();
    }
  }, [querySearch]);

  return (
    <div className="container text-center mt-10">
      <h1 className="text-3xl font-bold">
        Search for <span>&quot;{querySearch}&quot;</span>
      </h1>
      {isLoading ? (
        <div className="mt-10">
          <Loadingbars />
        </div>
      ) : (
        <div className="grid gap-4 mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {characters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
