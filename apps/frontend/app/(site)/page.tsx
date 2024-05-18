import getSongs from '@/actions/getSongs';
import Header from '@/components/Header';
import ListItem from '@/components/ListItem';
import PageContent from './components/PageContent';
import getRecommendedSongs from '@/actions/getRecommendedSongs';

export const revalidate = 0;

export default async function Home() {
  const songs = await getSongs();
  const newestSongs = songs.slice(0, 5);
  // const recommendedSongs = await getRecommendedSongs('0cFfCyaHAOFJF8W4JyTuJn');
  const vietnameseSongs = songs.slice(5, 10);

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
      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">Newest Songs</h1>
        </div>
        <div>
          <PageContent songs={newestSongs} />
        </div>
      </div>

      {/* <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">Recommended Songs</h1>
        </div>
        <div>
          <PageContent songs={recommendedSongs} />
        </div>
      </div> */}

      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">Vietnamese Songs</h1>
        </div>
        <div>
          <PageContent songs={vietnameseSongs} />
        </div>
      </div>
    </div>
  );
}
