'use client';

import { useState } from 'react';
import { quizData } from '@/lib/data';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription } from '../ui/alert';
import { Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type AnswersState = { [key: number]: string };
type ResultsState = { [key: number]: boolean };

export default function QuizTab() {
  const [answers, setAnswers] = useState<AnswersState>({});
  const [results, setResults] = useState<ResultsState>({});
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleAnswerChange = (questionId: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    if(submitted) {
      setSubmitted(false);
      setResults({});
    }
  };

  const handleSubmit = () => {
    const newResults: ResultsState = {};
    let correctCount = 0;
    quizData.questions.forEach((q) => {
      const isCorrect = answers[q.id] === q.correctAnswer;
      newResults[q.id] = isCorrect;
      if (isCorrect) correctCount++;
    });
    setResults(newResults);
    setSubmitted(true);
    toast({
      title: "Quiz Submitted!",
      description: `You scored ${correctCount} out of ${quizData.questions.length}.`,
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="font-bold text-lg">{quizData.title}</h3>
      <div className="space-y-4">
        {quizData.questions.map((q) => (
          <Card key={q.id}>
            <CardHeader>
              <CardTitle className="text-base">{q.question}</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={answers[q.id] || ''}
                onValueChange={(value) => handleAnswerChange(q.id, value)}
                className="space-y-2"
              >
                {q.options.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={`${q.id}-${option}`} />
                    <Label htmlFor={`${q.id}-${option}`}>{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
            {submitted && (
                <CardFooter>
                    <Alert variant={results[q.id] ? 'default' : 'destructive'} className={cn("w-full", results[q.id] ? "border-green-500/50 text-green-700 dark:text-green-400" : "border-red-500/50 text-red-700 dark:text-red-400")}>
                        {results[q.id] ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                        <AlertDescription>
                        {results[q.id] ? "Correct!" : `Correct answer: ${q.correctAnswer}`}
                        </AlertDescription>
                    </Alert>
                </CardFooter>
            )}
          </Card>
        ))}
      </div>
      <Button onClick={handleSubmit}>Submit Quiz</Button>
    </div>
  );
}
