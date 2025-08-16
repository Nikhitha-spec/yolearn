import { useMemo } from 'react';
import Fuse from 'fuse.js';

export const useSearch = (data, searchQuery, options = {}) => {
  const fuse = useMemo(() => {
    const defaultOptions = {
      keys: ['title', 'description', 'category', 'tags'],
      threshold: 0.3,
      includeScore: true,
      ...options
    };
    
    return new Fuse(data, defaultOptions);
  }, [data, options]);

  const results = useMemo(() => {
    if (!searchQuery.trim()) {
      return data;
    }
    
    const searchResults = fuse.search(searchQuery);
    return searchResults.map(result => result.item);
  }, [fuse, searchQuery, data]);

  return results;
};

export const useSkillFilters = (skills, { searchQuery, selectedCategory, level, priceType } = {}) => {
  return useMemo(() => {
    let filtered = skills;

    // Category filter
    if (selectedCategory && selectedCategory !== 'All') {
      filtered = filtered.filter(skill => skill.category === selectedCategory);
    }

    // Level filter
    if (level && level !== 'All') {
      filtered = filtered.filter(skill => skill.level === level);
    }

    // Price type filter
    if (priceType && priceType !== 'All') {
      if (priceType === 'Free') {
        filtered = filtered.filter(skill => skill.price === 'Free');
      } else if (priceType === 'Exchange') {
        filtered = filtered.filter(skill => skill.price === 'Skill Exchange');
      }
    }

    // Search filter (using Fuse.js for fuzzy search)
    if (searchQuery && searchQuery.trim()) {
      const fuse = new Fuse(filtered, {
        keys: ['title', 'description', 'category', 'tags', 'instructor'],
        threshold: 0.3
      });
      
      const searchResults = fuse.search(searchQuery);
      filtered = searchResults.map(result => result.item);
    }

    return filtered;
  }, [skills, searchQuery, selectedCategory, level, priceType]);
};