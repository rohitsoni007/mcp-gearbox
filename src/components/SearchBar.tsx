import { Search } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSearchQuery } from '@/store/slices/serverSlice';
import { selectSearchQuery } from '@/store/selectors/serverSelectors';
import { useState, useEffect } from 'react';

export default function SearchBar() {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector(selectSearchQuery);
  const [localValue, setLocalValue] = useState(searchQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setSearchQuery(localValue));
    }, 300);

    return () => clearTimeout(timer);
  }, [localValue, dispatch]);

  useEffect(() => {
    setLocalValue(searchQuery);
  }, [searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value);
  };

  return (
    <div className="relative w-full max-w-2xl">
      <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
      <input
        type="text"
        placeholder="Search servers by name or author"
        value={localValue}
        onChange={handleSearchChange}
        className="glass-card h-12 w-full rounded-xl pl-12 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      />
    </div>
  );
}
