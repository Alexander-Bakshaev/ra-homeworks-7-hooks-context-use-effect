import { useState, useEffect } from 'react';

export default function Details({ info }) {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [avatarStatus, setAvatarStatus] = useState('idle'); // 'idle' | 'loading' | 'loaded' | 'error' - состояния загрузки аватара

  useEffect(() => {
    if (!info) {
      setUserDetails(null);
      return;
    }
    
    // Сбрасываем статус аватара при смене пользователя
    setAvatarStatus('loading');

    const fetchDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/${info.id}.json`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUserDetails(data);
        // Загрузка аватара будет обрабатываться событиями onLoad/onError тега img
      } catch (err) {
        setError(err.message);
        setUserDetails(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [info?.id]);

  if (!info) return <div className="details">Select a user to see details</div>;
  if (loading) return <div className="details">Loading details...</div>;
  if (error) return <div className="details">Error: {error}</div>;
  if (!userDetails) return <div className="details">No user details available</div>;

  return (
    <div className="details">
      <h2>{userDetails.name}</h2>
      <div className="avatar-container">
        {userDetails.avatar && (
          <>
            <img 
              key={userDetails.id}
              src={userDetails.avatar}
              alt={userDetails.name} 
              width="150" 
              className={`avatar ${avatarStatus === 'loading' ? 'avatar-loading' : ''} ${avatarStatus === 'error' ? 'avatar-error' : ''}`}
              onLoad={() => setAvatarStatus('loaded')}
              onError={() => setAvatarStatus('error')}
            />
            {avatarStatus === 'loading' && <div className="avatar-loader">Loading...</div>}
            {avatarStatus === 'error' && <div className="avatar-error-message">Failed to load avatar</div>}
          </>
        )}
      </div>
      {userDetails.details && (
        <div>
          <p>City: {userDetails.details.city}</p>
          <p>Company: {userDetails.details.company}</p>
          <p>Position: {userDetails.details.position}</p>
        </div>
      )}
    </div>
  );
}
