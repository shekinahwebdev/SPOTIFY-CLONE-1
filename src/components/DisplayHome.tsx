import { albumsData, songsData } from "../assets/assets";
import AlbumItem from "./AlbumItem";
import NavBar from "./NavBar";
import SongItems from "./SongItems";

const DisplayHome = () => {
  return (
    <>
      <NavBar />
      <div className="mb-4">
        <div className="mb-2">
          <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
          <div className="flex overflow-auto">
            {albumsData.map((album, index) => (
              <AlbumItem
                key={index}
                name={album.name}
                image={album.image}
                desc={album.desc}
                id={album.id}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="mb-4">
        <div className="mb-2">
          <h1 className="my-5 font-bold text-2xl">Today's biggest hits</h1>
          <div className="flex overflow-auto">
            {songsData.map((album, index) => (
              <SongItems
                key={index}
                name={album.name}
                image={album.image}
                desc={album.desc}
                id={album.id}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DisplayHome;
