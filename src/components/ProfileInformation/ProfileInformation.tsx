import React, { useEffect, useState } from 'react';
import Animation from '../Animation/Animation';
import { API_URL } from '../../consts';

type UserProfile = {
  name: string;
  email: string;
  nickname: string;
  phone: number;
};

// Define your JWT payload structure here
type JWTPayload = {
  [key: string]: any; // This allows any string as a key with any type as value
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress': string;
  Id: string; // Now JWTPayload includes 'Id' as a property
  exp: number;
  iss: string;
  aud: string;
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
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    if (token) {
      const payload = parseJwt(token);
      console.log('Payload:', payload); // Payload should now include the 'Id'
      const userId = payload['Id']; // Access the 'Id' from the payload
      if (userId) {
        fetchProfile(Number(userId)); // Convert to Number if necessary
      } else {
        setLoading(false);
        setError('User ID not found in token.');
      }
    } else {
      setLoading(false);
      setError('No authentication token found.');
    }
  }, []);
  

  const fetchProfile = async (userId: string | number) => {
    try {
      setLoading(true);
      // Retrieve the JWT from storage, assuming it's saved under 'authToken'
      const token = sessionStorage.getItem('authToken');
      
      // If there's no token, throw an error before making the fetch call
      if (!token) {
        throw new Error('No authentication token found.');
      }
  
      const response = await fetch(`${API_URL}/api/movies/user/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
          // Include the Authorization header with the token
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const userProfile: UserProfile = await response.json();
      console.log(userProfile);
      setProfile(userProfile);
    } catch (err) {
      console.error("An error occurred while fetching the profile:", err);
      const message = err instanceof Error ? err.message : "An unknown error occurred";
      setError(`Failed to load profile: ${message}`);
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
      <p><strong>Name:</strong> {profile.nickname}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Username:</strong> {profile.nickname}</p>
      <p><strong>Phone Number:</strong> {profile.phone}</p>
    </div>
  );
};

export default ProfileInformation;
