import React from 'react';
import { Star } from 'lucide-react';

interface StarButtonProps {
  isFollowed: boolean;
  onToggle: () => void;
}

export default function StarButton({ isFollowed, onToggle }: StarButtonProps) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      className="shrink-0 p-0.5 rounded transition-all cursor-pointer"
      title={isFollowed ? '取消关注' : '关注'}
    >
      <Star
        size={13}
        className={isFollowed ? 'fill-yellow-400 text-yellow-400' : 'text-slate-500 hover:text-yellow-400'}
      />
    </button>
  );
}