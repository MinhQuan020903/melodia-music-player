import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import { Song } from '@/types';
import { getRequest } from '@/lib/fetch';

const getSongs = async (): Promise<Song[]> => {
    const onGetSongsByUserId = async () => {
        const songs = await getRequest({
            endPoint: `/api`,
        });
        console.log('🚀 ~ onGetSongsByUserId ~ songs:', songs);
        return songs;
    };
    console.log('15:res: ' + JSON.stringify(onGetSongsByUserId()));
    const supabase = createServerComponentClient({
        cookies: cookies,
    });

    const { data, error } = await supabase
        .from('songs')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.log(error.message);
    }

    return (data as any) || [];
};

export default getSongs;
