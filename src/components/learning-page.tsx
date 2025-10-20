'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Header from './layout/header';
import ProgressDashboard from './dashboard/progress-dashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Play,
  Pause,
  Settings,
  Volume2,
  VolumeX,
  Maximize,
  Clock,
} from 'lucide-react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { courseData, keyMoments } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import SummaryTab from './interactive/summary-tab';
import QuizTab from './interactive/quiz-tab';
import NotesTab from './interactive/notes-tab';
import FlashcardsTab from './interactive/flashcards-tab';

export default function LearningPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState('1');
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const videoThumbnail = PlaceHolderImages.find(
    (img) => img.id === courseData.videoThumbnailId
  );

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
      2,
      '0'
    )}`;
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => setDuration(video.duration);
    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, []);

  const handlePlayPause = () => {
    if (!hasStarted) setHasStarted(true);
    const video = videoRef.current;
    if (video) {
      video.paused ? video.play() : video.pause();
    }
  };

  const handleSeek = (value: number[]) => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const handleSpeedChange = (speed: string) => {
    const video = videoRef.current;
    if (video) {
      video.playbackRate = parseFloat(speed);
      setPlaybackSpeed(speed);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const video = videoRef.current;
    if (video) {
      const newVolume = value[0];
      video.volume = newVolume;
      setVolume(newVolume);
      if (newVolume > 0 && isMuted) {
        video.muted = false;
        setIsMuted(false);
      } else if (newVolume === 0 && !isMuted) {
        video.muted = true;
        setIsMuted(true);
      }
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !isMuted;
      setIsMuted(!isMuted);
      if(!isMuted) setVolume(0); else setVolume(video.volume > 0 ? video.volume : 0.5)
    }
  };
  
  const handleSeekTo = (time: number) => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = time;
    }
  };

  const toggleFullScreen = () => {
    const video = videoRef.current;
    if (video) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        video.requestFullscreen();
      }
    }
  };

  return (
    <>
      <Header />
      <main className="container max-w-screen-2xl mx-auto p-4 md:p-8 space-y-8">
        <h1 className="text-3xl font-bold tracking-tight">{courseData.title}</h1>
        <ProgressDashboard />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="overflow-hidden shadow-2xl">
              <CardContent className="p-0">
                <div className="relative aspect-video group">
                  <video ref={videoRef} className="w-full h-full" poster={videoThumbnail?.imageUrl}>
                    <source src={courseData.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  
                  {!hasStarted && videoThumbnail && (
                     <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <Image
                            src={videoThumbnail.imageUrl}
                            alt={videoThumbnail.description}
                            layout="fill"
                            objectFit="cover"
                            className="opacity-50"
                            data-ai-hint={videoThumbnail.imageHint}
                        />
                         <Button variant="ghost" size="icon" className="w-20 h-20 bg-background/30 hover:bg-background/50 backdrop-blur-sm z-10" onClick={handlePlayPause}>
                            <Play className="w-10 h-10 text-white fill-white" />
                        </Button>
                     </div>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-y-2">
                    <Slider
                      value={[currentTime]}
                      max={duration}
                      step={1}
                      onValueChange={handleSeek}
                      className="w-full cursor-pointer"
                    />
                    <div className="flex items-center justify-between text-white">
                      <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" onClick={handlePlayPause} className="text-white hover:bg-white/10">
                          {isPlaying ? <Pause /> : <Play />}
                        </Button>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" onClick={toggleMute} className="text-white hover:bg-white/10">
                            {isMuted || volume === 0 ? <VolumeX /> : <Volume2 />}
                          </Button>
                          <Slider
                            value={[isMuted ? 0 : volume]}
                            max={1}
                            step={0.05}
                            onValueChange={handleVolumeChange}
                            className="w-24 cursor-pointer"
                          />
                        </div>
                        <span className="text-xs font-mono">{formatTime(currentTime)} / {formatTime(duration)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                         <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                                <Settings />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                               <DropdownMenuRadioGroup value={playbackSpeed} onValueChange={handleSpeedChange}>
                                <DropdownMenuRadioItem value="0.5">0.5x</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="1">1x (Normal)</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="1.5">1.5x</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="2">2x</DropdownMenuRadioItem>
                               </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                          </DropdownMenu>
                         <Button variant="ghost" size="icon" onClick={toggleFullScreen} className="text-white hover:bg-white/10">
                           <Maximize />
                         </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="summary" className="w-full">
              <TabsList>
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="quiz">Quiz</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
                <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
              </TabsList>
              <Card className="mt-4">
                <CardContent className="p-6">
                  <TabsContent value="summary"><SummaryTab /></TabsContent>
                  <TabsContent value="quiz"><QuizTab /></TabsContent>
                  <TabsContent value="notes"><NotesTab currentTime={currentTime} onSeek={handleSeekTo} formatTime={formatTime} /></TabsContent>
                  <TabsContent value="flashcards"><FlashcardsTab currentTime={currentTime} onSeek={handleSeekTo} formatTime={formatTime} /></TabsContent>
                </CardContent>
              </Card>
            </Tabs>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Key Moments</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {keyMoments.map((moment) => (
                    <li key={moment.time}>
                      <Button variant="ghost" className="w-full justify-start" onClick={() => handleSeekTo(moment.time)}>
                        <Clock className="mr-2 h-4 w-4 text-primary" />
                        <span className="flex-1 text-left">{moment.label}</span>
                        <span className="text-muted-foreground text-xs">{formatTime(moment.time)}</span>
                      </Button>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}
