'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Clock } from 'lucide-react';

interface Note {
  id: number;
  text: string;
  timestamp: number;
}

interface NotesTabProps {
  currentTime: number;
  onSeek: (time: number) => void;
  formatTime: (time: number) => string;
}

export default function NotesTab({ currentTime, onSeek, formatTime }: NotesTabProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');

  const handleAddNote = () => {
    if (newNote.trim() === '') return;
    setNotes((prev) => [
      ...prev,
      { id: Date.now(), text: newNote, timestamp: currentTime },
    ]);
    setNewNote('');
  };

  return (
    <div className="space-y-4">
      <h3 className="font-bold text-lg">My Notes</h3>
      <div className="space-y-2">
        <Textarea
          placeholder="Type your note here... it will be timestamped."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <Button onClick={handleAddNote}>
          <Plus className="mr-2 h-4 w-4" /> Add Note
        </Button>
      </div>
      <div className="space-y-2">
        {notes.length === 0 ? (
          <p className="text-sm text-muted-foreground">No notes added yet.</p>
        ) : (
          notes
            .sort((a, b) => a.timestamp - b.timestamp)
            .map((note) => (
              <Card
                key={note.id}
                className="hover:bg-muted/80 transition-colors"
              >
                <CardContent className="p-4">
                  <p className="text-sm">{note.text}</p>
                  <Button
                    variant="link"
                    size="sm"
                    className="p-0 h-auto text-xs text-primary hover:text-accent"
                    onClick={() => onSeek(note.timestamp)}
                  >
                    <Clock className="mr-1 h-3 w-3" />
                    {formatTime(note.timestamp)}
                  </Button>
                </CardContent>
              </Card>
            ))
        )}
      </div>
    </div>
  );
}
