import { useState } from 'react';
import Header from '@/components/home/Header';
import ServerList from '@/components/home/ServerList';

const Index = () => {
  const [view, setView] = useState<'grid' | 'list'>('grid');

  return (
    <>
      {/* Header */}
      <Header view={view} setView={setView} />

      {/* Server Grid */}
      <ServerList view={view} />
    </>
  );
};

export default Index;
