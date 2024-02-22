import { Character } from "@/types/marvels";
import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

interface CharacterCardProps {
  character: Character;
}

const CharacterCard: FC<CharacterCardProps> = ({ character }) => {
  return (
    <div className="card w-full bg-base-200 shadow-xl items-center justify-center align-middle">
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
        <div className="card-actions items-center justify-center">
          <Link href={`character/${character.id}`} className="btn btn-primary">
            Detail {character.name}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
