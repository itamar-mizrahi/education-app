'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Clock, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Flashcard {
  id: number;
  front: string;
  back: string;
  timestamp: number;
}

interface FlashcardsTabProps {
  currentTime: number;
  onSeek: (time: number) => void;
  formatTime: (time: number) => string;
}

export default function FlashcardsTab({ currentTime, onSeek, formatTime }: FlashcardsTabProps) {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const handleAddFlashcard = () => {
    if (front.trim() === '' || back.trim() === '') return;
    setFlashcards((prev) => [
      ...prev,
      { id: Date.now(), front, back, timestamp: currentTime },
    ]);
    setFront('');
    setBack('');
  };

  const toggleFlip = (id: number) => {
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-bold text-lg mb-4">Create a Flashcard</h3>
        <div className="space-y-2">
          <Input
            placeholder="Front (Question)"
            value={front}
            onChange={(e) => setFront(e.target.value)}
          />
          <Textarea
            placeholder="Back (Answer)"
            value={back}
            onChange={(e) => setBack(e.target.value)}
          />
          <Button onClick={handleAddFlashcard}>
            <Plus className="mr-2 h-4 w-4" /> Add Flashcard
          </Button>
        </div>
      </div>
      <div>
        <h3 className="font-bold text-lg mb-4">My Flashcards</h3>
        {flashcards.length === 0 ? (
          <p className="text-sm text-muted-foreground">No flashcards created yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {flashcards.map((card) => (
              <Card key={card.id} className="min-h-[150px] flex flex-col">
                <CardContent className="p-4 flex-grow flex items-center justify-center text-center">
                  <p className="text-sm">
                    {flippedCards[card.id] ? card.back : card.front}
                  </p>
                </CardContent>
                <div className="p-2 border-t flex justify-between items-center">
                  <Button
                    variant="link"
                    size="sm"
                    className="p-0 h-auto text-xs text-primary hover:text-accent"
                    onClick={() => onSeek(card.timestamp)}
                  >
                    <Clock className="mr-1 h-3 w-3" />
                    {formatTime(card.timestamp)}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground"
                    onClick={() => toggleFlip(card.id)}
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
