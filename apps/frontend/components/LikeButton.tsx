'use client';

import useAuthModal from '@/hooks/useAuthModal';
import { useUser } from '@/hooks/useUser';
import { Song } from '@/types';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

interface LikeButtonProps {
  song: Song;
}

const LikeButton: React.FC<LikeButtonProps> = ({ song }) => {
  const router = useRouter();
  const { supabaseClient } = useSessionContext();

  const authModal = useAuthModal();
  const { user } = useUser();

  const [isLiked, setIsLiked] = useState<boolean>(false);

  useEffect(() => {
    if (!user?.id) {
      return;
    }

    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from('liked_songs')
        .select('*')
        .eq('user_id', user.id)
        .eq('song_id', song.id)
        .single();

      if (!error && data) {
        setIsLiked(true);
      }
    };

    fetchData();
  }, [song.id, supabaseClient, user?.id]);

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  const handleLike = async () => {
    if (!user) {
      return authModal.onOpen();
    }

    if (isLiked) {
      const { error } = await supabaseClient
        .from('liked_songs')
        .delete()
        .eq('user_id', user.id)
        .eq('song_id', song.id);

      if (error) {
        toast.error(error.message);
      } else {
        setIsLiked(false);
      }

      const { error: updateLikeError } = await supabaseClient
        .from('songs')
        .update({ like: song.like - 1 })
        .eq('id', song.id);
    } else {
      // Add like the song
      const { error } = await supabaseClient.from('liked_songs').insert({
        song_id: song.id,
        user_id: user.id,
      });

      if (error) {
        toast.error(error.message);
      } else {
        setIsLiked(true);
        toast.success('Liked');
      }

      //Update song likes count

      const { error: updateLikeError } = await supabaseClient
        .from('songs')
        .update({ like: song.like + 1 })
        .eq('id', song.id);
    }

    router.refresh();
  };
  return (
    <button className="hover:opacity-75 transition" onClick={handleLike}>
      <Icon color={isLiked ? '#F0EDCF' : 'white'} size={25} />
    </button>
  );
};

export default LikeButton;
