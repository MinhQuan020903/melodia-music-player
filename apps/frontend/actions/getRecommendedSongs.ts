import { Song } from '@/types';

// Hàm này gọi endpoint và chuyển đổi dữ liệu trả về thành mảng của Song
const getRecommendedSongs = async (track_id: String): Promise<Song[]> => {
  try {
    const response = await fetch('http://127.0.0.1:5000/recommend', {
      method: 'POST', // Sử dụng phương thức POST
      headers: {
        'Content-Type': 'application/json', // Thiết lập kiểu nội dung của request là JSON
      },
      body: JSON.stringify({ track_id }), // Gửi track_id trong body của request
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();

    // Chuyển đổi dữ liệu trả về để phù hợp với type Song
    const recommendedSongs: Song[] = data.map((item: any) => ({
      id: item.track_id, // Giả sử track_id là duy nhất và có thể dùng làm id
      user_id: '', // Không có thông tin này từ API, để trống hoặc điền giá trị mặc định
      author: item.artist,
      title: item.track,
      song_path: item.preview, // Giả sử đường dẫn bài hát là URL preview
      image_path: item.image_url, // Không có thông tin này từ API, để trống hoặc điền giá trị mặc định
    }));

    return recommendedSongs;
  } catch (error) {
    console.error('Failed to fetch recommended songs:', error);
    return [];
  }
};

export default getRecommendedSongs;
