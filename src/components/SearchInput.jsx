import React from 'react';
import { Input } from './ui/input';

export function SearchInput({ value, onChange, placeholder }) {
  return (
    <div className="mb-4">
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full"
      />
    </div>
  );
}
