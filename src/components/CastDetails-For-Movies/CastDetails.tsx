import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface CastDetailsProps {
  castId: string; // Update this type based on your implementation
}

interface CastMemberDetails {
  // Define the structure for cast member details
  name: string;
  biography: string;
  profile_path: string;
  // ...other fields you need
}

const CastDetails: React.FC<CastDetailsProps> = ({ castId }) => {
  const [castDetails, setCastDetails] = useState<CastMemberDetails | null>(null);

  useEffect(() => {
    const fetchCastForMovie = async () => {
        try {
          const apiKey = 'f1a02268af3a2e076dc84ca1a6aaaefe';
          const movieId = '123'; // Replace with the ID of the movie you want to fetch
          const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}&language=en-US`
          );
          console.log('Cast for movie:', response.data);
          // Process the cast data here
        } catch (error) {
          console.error('Error fetching cast for movie:', error);
        }
      };

      fetchCastForMovie();
  }, [castId]);

  return (
    <div>
      {castDetails ? (
        <div>
          <h2>{castDetails.name}</h2>
          <p>Biography: {castDetails.biography}</p>
          {/* Display other relevant details */}
        </div>
      ) : (
        <p>Loading cast details...</p>
      )}
    </div>
  );
};

export default CastDetails;
