import React, { useEffect, useState } from 'react';
import Animation from '../Animation/Animation';

// Assuming you have a type for your user profile data
type UserProfile = {
  name: string;
  email: string;
  username: string;
  // add any other relevant fields
};

const ProfileInformation: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Mocked function to simulate fetching profile data
    // In a real app, you would make an API call here
    const fetchProfile = async () => {
      try {
        setLoading(true);
        // Replace with an actual API call
        const response: UserProfile = await new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              name: 'John Doe',
              email: 'john.doe@example.com',
              username: 'johndoe',
              // populate other fields
            });
          }, 1000);
        });
        setProfile(response);
      } catch (error) {
        setError('Failed to load profile.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (isLoading) return <div><Animation /></div>;
  if (error) return <div>Error: {error}</div>;
  if (!profile) return <div>No profile data.</div>;

  return (
    <div>
      <h1>Profile Information</h1>
      <p><strong>Name:</strong> {profile.name}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Username:</strong> {profile.username}</p>
      {/* Render other fields here */}
    </div>
  );
};

export default ProfileInformation;
