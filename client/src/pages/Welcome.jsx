import React, { useContext } from 'react';
import WelcomeBanner from '../components/WelcomeBanner';
import RecentMoodFeed from '../components/RecentMoodFeed';
import FAQSection from '../components/FAQSection';
import ThemeCustomizer from '../components/Themecustomizer';
import { AuthContext } from '../context/AuthContext';

const Welcome = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="space-y-10 px-4 py-6 md:px-8">
      <WelcomeBanner name={user?.name || 'User'} />
      <RecentMoodFeed />
      <FAQSection />
      <ThemeCustomizer />
    </div>
  );
};

export default Welcome;
