import getSongs from '@/actions/getSongs';
import Header from '@/components/Header';
import ListItem from '@/components/ListItem';
import Recommendation from './Recommendation';
import getRandomSongs from '@/actions/getRandomSongs';

export const revalidate = 0;

// eslint-disable-next-line @next/next/no-async-client-component
export default async function Home() {
  const songs = await getSongs();
  const newestSongs = songs.slice(0, 5);

  const randomSongs = await getRandomSongs();
  const vietnameseSongs = randomSongs
    .filter((song) => song.genre && song.genre.includes('v-pop'))
    .slice(0, 5);
  const indieSongs = randomSongs
    .filter((song) => song.genre && song.genre.includes('indie-pop'))
    .slice(0, 5);
  const representedBySongs = randomSongs
    .filter((song) => song.author && song.author.includes('Mỹ Tâm'))
    .slice(0, 5);

  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-h-auto custom-scroll">
      <Header>
        <div className="mb-2">
          <h1 className="text-white text-3xl font-semibold">Welcome back</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
            <ListItem image="/images/liked.jpg" name="Liked Songs" href="liked" />
          </div>
        </div>
      </Header>
      <Recommendation
        newestSongs={newestSongs}
        vietnameseSongs={vietnameseSongs}
        representedBySongs={representedBySongs}
        indieSongs={indieSongs}
      />
    </div>
  );
}
