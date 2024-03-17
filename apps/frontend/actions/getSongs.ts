import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import { Song } from '@/types';
import { getRequest } from '@/lib/fetch';

const getSongs = async (): Promise<Song[]> => {
    const onGetSongs = async () => {
        const songs = await getRequest({
            endPoint: `/api/song`,
        });
        return songs;
    };
    const res = await onGetSongs();
    console.log('🚀 ~ getSongs ~ res:', res);

    return res?.data || [];
};

export default getSongs;
