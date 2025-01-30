import React from 'react';
import { Quote } from '../types';

interface QuoteDisplayProps {
  quote: Quote;
}

export function QuoteDisplay({ quote }: QuoteDisplayProps) {
  return (
    <blockquote className="text-center text-gray-400 max-w-2xl mx-auto italic">
      <p className="mb-2">"{quote.text}"</p>
      <footer className="text-sm">- {quote.author}</footer>
    </blockquote>
  );
}