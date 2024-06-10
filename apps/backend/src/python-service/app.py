import os
from flask import Flask, request, jsonify
from joblib import load
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
from sklearn.metrics.pairwise import cosine_similarity
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app) 
app.config['CORS_HEADERS'] = 'Content-Type'

# Load the saved model and scaler
feat_vec = load('feat_vec.pkl')
# scaler = load('scaler.pkl') # If you're using a scaler

# Configure the Spotify API
client_id = os.getenv('NEXT_PUBLIC_SPOTIFY_CLIENT_ID')
client_secret = os.getenv('NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET')
client_credentials_manager = SpotifyClientCredentials(client_id=client_id, client_secret=client_secret)
sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

@app.route('/recommend', methods=['POST'])
@cross_origin()
def recommend_songs():
    data = request.json
    track_id = data['track_id']
    print('track_id:', track_id)

    # Tìm vector đặc trưng của bài hát có track_id tương ứng
    track_vector = feat_vec.loc[feat_vec["track_id"]==track_id].drop('track_id', axis=1).fillna(0)
    print("feat_vec_shape: ", feat_vec.shape)
    
    # Tính cosine similarity giữa vector này và tất cả các vector khác
    similarity_scores = cosine_similarity(feat_vec.drop('track_id', axis=1).fillna(0), track_vector).flatten()
    
    # Thêm điểm similarity vào dataframe
    feat_vec['similarity_score'] = similarity_scores
    
    # Sắp xếp và chọn ra top 5 kết quả tương tự nhất
    top_similarities = feat_vec.sort_values(by='similarity_score', ascending=False).head(6)  # Bao gồm cả bản thân bài hát
    
    # Loại bỏ bản thân bài hát khỏi kết quả
    top_similarities = top_similarities[top_similarities['track_id'] != track_id].head(5)

    # find the track name, artist, and 30s audio preview or each song using the track_id
    top_similarities['track'] = [None]*len(top_similarities)
    top_similarities['artist'] = [None]*len(top_similarities)
    top_similarities['preview'] = [None]*len(top_similarities)
    top_similarities['image_url'] = [None]*len(top_similarities)  # Thêm cột mới cho URL ảnh

    # get track name, artist, and 30s audio clip url
    # Find the track name, artist, and 30s audio preview for each song using the track_id
    for index, row in top_similarities.iterrows():
        track_info = sp.track(row['track_id'])
        track_name = track_info['name']
        artist_name = track_info['artists'][0]['name']
        preview_url = track_info['preview_url']
        image_url = track_info['album']['images'][0]['url']

        # Update DataFrame with track information
        top_similarities.at[index, 'track'] = track_name
        top_similarities.at[index, 'artist'] = artist_name
        top_similarities.at[index, 'preview'] = preview_url
        top_similarities.at[index, 'image_url'] = image_url
    
    # Trả về kết quả dưới dạng JSON
    return jsonify(top_similarities.to_dict(orient='records'))

if __name__ == '__main__':
    app.run(debug=True)