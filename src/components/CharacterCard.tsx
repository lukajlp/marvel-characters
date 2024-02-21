import { Character } from "@/types/marvels";
import { FC } from "react";
import Image from "next/image";

interface CharacterCardProps {
  character: Character;
}

const CharacterCard: FC<CharacterCardProps> = ({ character }) => {
  return (
    <div className="card w-full bg-base-200 shadow-xl">
      <figure>
        <Image
          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          alt={character.name}
          width={500}
          height={400}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{character.name}</h2>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Detail {character.name}</button>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
