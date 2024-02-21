import CharacterCard from "@/components/CharacterCard";
import { getCharacters } from "@/utils/api";

export default async function Home() {
  const characters = await getCharacters();

  return (
    <main>
      <div className="container text-center mt-10">
        <h1 className="text-3xl font-bold underline">All Characters Marvel</h1>
      </div>
      <div className="grid gap-4 mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {characters.results.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
    </main>
  );
}
