import { useContext, type FC } from "react";
import { PlayerContext } from "../context/PlayerContext";

interface SongItemsProps {
  image: string;
  name: string;
  desc: string;
  id: number;
}

const SongItems: FC<SongItemsProps> = ({ image, name, desc, id }) => {
  const { playWithId } = useContext(PlayerContext);
  return (
    <div
      onClick={() => playWithId(id)}
      className="min-w-[250px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]"
    >
      <img className="rounded" src={image} alt={name} />
      <p className="font-bold mt-2 mb-2">{name}</p>
      <p className="text-slate-200 text-sm">{desc}</p>
    </div>
  );
};

export default SongItems;
