import React, { useEffect, useState } from 'react';
import Animation from '../Animation/Animation';
import { API_URL } from '../../consts';

type UserProfile = {
  name: string;
  email: string;
  username: string;
};

// Define your JWT payload structure here
type JWTPayload = {
  userId: number;
  // ... any other properties that are in your JWT payload
};

const ProfileInformation: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Function to parse the JWT and extract the payload
  const parseJwt = (token: string): JWTPayload => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  };

  useEffect(() => {
    // Attempt to retrieve the JWT from storage
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      const payload = parseJwt(token);
      fetchProfile(payload.userId); // Fetch the profile using the userId from the JWT
    } else {
      setLoading(false);
      setError('No authentication token found.');
    }
  }, []);

  const fetchProfile = async (userId: number) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/movies/user/${userId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const userProfile: UserProfile = await response.json();
      setProfile(userProfile);
    } catch (err) {
      if (err instanceof Error) {
        setError(`Failed to load profile: ${err.message}`);
      } else {
        setError(`Failed to load profile: An unknown error occurred`);
      }
    } finally {
      setLoading(false);
    }
  };

  // Render logic
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
