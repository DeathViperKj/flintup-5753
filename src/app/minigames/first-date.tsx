"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Clock, Sparkles, Calendar } from "lucide-react";
import { MinigameResult } from "./types";

interface Props {
  matchName: string;
  onComplete: (result: MinigameResult) => void;
  onBack: () => void;
}

const places = [
  { id: "cafe", name: "Café Aconchegante", emoji: "☕", color: "from-amber-400 to-orange-500" },
  { id: "park", name: "Parque ao Ar Livre", emoji: "🌳", color: "from-green-400 to-emerald-500" },
  { id: "bar", name: "Bar Descolado", emoji: "🍹", color: "from-purple-400 to-pink-500" },
  { id: "cinema", name: "Cinema", emoji: "🎬", color: "from-red-400 to-rose-500" },
  { id: "restaurant", name: "Restaurante", emoji: "🍽️", color: "from-yellow-400 to-amber-500" },
  { id: "museum", name: "Museu/Galeria", emoji: "🎨", color: "from-blue-400 to-cyan-500" },
];

const times = [
  { id: "morning", name: "Manhã", emoji: "🌅", time: "8h - 12h" },
  { id: "afternoon", name: "Tarde", emoji: "☀️", time: "14h - 18h" },
  { id: "evening", name: "Noitinha", emoji: "🌆", time: "18h - 21h" },
  { id: "night", name: "Noite", emoji: "🌙", time: "21h - 00h" },
];

const vibes = [
  { id: "calm", name: "Calmo e Tranquilo", emoji: "🧘", color: "from-blue-300 to-cyan-400" },
  { id: "fun", name: "Divertido e Animado", emoji: "🎉", color: "from-pink-400 to-purple-500" },
  { id: "adventure", name: "Aventura", emoji: "🚀", color: "from-orange-400 to-red-500" },
  { id: "romantic", name: "Romântico", emoji: "💕", color: "from-rose-400 to-pink-500" },
];

const durations = [
  { id: "quick", name: "Rápido", time: "1-2 horas", emoji: "⚡" },
  { id: "medium", name: "Médio", time: "2-4 horas", emoji: "⏰" },
  { id: "long", name: "O dia todo", time: "4+ horas", emoji: "🌟" },
];

export default function FirstDate({ matchName, onComplete, onBack }: Props) {
  const [step, setStep] = useState(1);
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedVibe, setSelectedVibe] = useState<string | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);

  const handleComplete = () => {
    // Simular resultado
    const compatibility = Math.floor(Math.random() * 20) + 80; // 80-100%
    const commonPoints = [
      `Ambos adorariam um date em ${places.find(p => p.id === selectedPlace)?.name}!`,
      `Preferem encontros ${vibes.find(v => v.id === selectedVibe)?.name.toLowerCase()}`,
      `Combinam no horário perfeito!`
    ];
    
    onComplete({ compatibility, commonPoints });
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const canProceed = () => {
    if (step === 1) return selectedPlace !== null;
    if (step === 2) return selectedTime !== null;
    if (step === 3) return selectedVibe !== null;
    if (step === 4) return selectedDuration !== null;
    return false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-500 via-pink-500 to-purple-600 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div className="text-center flex-1">
            <h1 className="text-2xl font-bold text-white mb-1">Primeiro Encontro Ideal</h1>
            <p className="text-white/80 text-sm">com {matchName}</p>
          </div>
          <div className="w-10" />
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-2 rounded-full transition-all duration-300 ${
                s === step ? "w-12 bg-white" : s < step ? "w-8 bg-white/60" : "w-8 bg-white/20"
              }`}
            />
          ))}
        </div>

        {/* Step 1: Place */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <MapPin className="w-16 h-16 text-white mx-auto mb-4 animate-bounce" />
              <h2 className="text-3xl font-bold text-white mb-2">Onde seria o date?</h2>
              <p className="text-white/80">Escolha o lugar perfeito</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {places.map((place) => (
                <button
                  key={place.id}
                  onClick={() => setSelectedPlace(place.id)}
                  className={`group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 transform hover:scale-105 ${
                    selectedPlace === place.id
                      ? `bg-gradient-to-br ${place.color} scale-105 shadow-2xl`
                      : "bg-white/20 hover:bg-white/30"
                  }`}
                >
                  <div className="text-center">
                    <div className="text-5xl mb-3">{place.emoji}</div>
                    <h3 className="text-lg font-bold text-white">{place.name}</h3>
                  </div>
                  {selectedPlace === place.id && (
                    <div className="absolute top-2 right-2">
                      <Sparkles className="w-6 h-6 text-white animate-pulse" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Time */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Clock className="w-16 h-16 text-white mx-auto mb-4 animate-bounce" />
              <h2 className="text-3xl font-bold text-white mb-2">Que horário?</h2>
              <p className="text-white/80">Escolha o melhor momento</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {times.map((time) => (
                <button
                  key={time.id}
                  onClick={() => setSelectedTime(time.id)}
                  className={`group relative overflow-hidden rounded-2xl p-8 transition-all duration-300 transform hover:scale-105 ${
                    selectedTime === time.id
                      ? "bg-gradient-to-br from-yellow-400 to-orange-500 scale-105 shadow-2xl"
                      : "bg-white/20 hover:bg-white/30"
                  }`}
                >
                  <div className="text-center">
                    <div className="text-6xl mb-3">{time.emoji}</div>
                    <h3 className="text-xl font-bold text-white mb-1">{time.name}</h3>
                    <p className="text-white/80 text-sm">{time.time}</p>
                  </div>
                  {selectedTime === time.id && (
                    <div className="absolute top-2 right-2">
                      <Sparkles className="w-6 h-6 text-white animate-pulse" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Vibe */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Sparkles className="w-16 h-16 text-white mx-auto mb-4 animate-bounce" />
              <h2 className="text-3xl font-bold text-white mb-2">Qual a vibe?</h2>
              <p className="text-white/80">Defina o clima do encontro</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {vibes.map((vibe) => (
                <button
                  key={vibe.id}
                  onClick={() => setSelectedVibe(vibe.id)}
                  className={`group relative overflow-hidden rounded-2xl p-8 transition-all duration-300 transform hover:scale-105 ${
                    selectedVibe === vibe.id
                      ? `bg-gradient-to-br ${vibe.color} scale-105 shadow-2xl`
                      : "bg-white/20 hover:bg-white/30"
                  }`}
                >
                  <div className="text-center">
                    <div className="text-6xl mb-3">{vibe.emoji}</div>
                    <h3 className="text-xl font-bold text-white">{vibe.name}</h3>
                  </div>
                  {selectedVibe === vibe.id && (
                    <div className="absolute top-2 right-2">
                      <Sparkles className="w-6 h-6 text-white animate-pulse" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Duration */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Calendar className="w-16 h-16 text-white mx-auto mb-4 animate-bounce" />
              <h2 className="text-3xl font-bold text-white mb-2">Quanto tempo?</h2>
              <p className="text-white/80">Duração ideal do encontro</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {durations.map((duration) => (
                <button
                  key={duration.id}
                  onClick={() => setSelectedDuration(duration.id)}
                  className={`group relative overflow-hidden rounded-2xl p-8 transition-all duration-300 transform hover:scale-105 ${
                    selectedDuration === duration.id
                      ? "bg-gradient-to-br from-cyan-400 to-blue-500 scale-105 shadow-2xl"
                      : "bg-white/20 hover:bg-white/30"
                  }`}
                >
                  <div className="text-center">
                    <div className="text-6xl mb-3">{duration.emoji}</div>
                    <h3 className="text-xl font-bold text-white mb-1">{duration.name}</h3>
                    <p className="text-white/80 text-sm">{duration.time}</p>
                  </div>
                  {selectedDuration === duration.id && (
                    <div className="absolute top-2 right-2">
                      <Sparkles className="w-6 h-6 text-white animate-pulse" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-4 mt-8">
          {step > 1 && (
            <Button
              onClick={() => setStep(step - 1)}
              className="flex-1 bg-white/20 hover:bg-white/30 text-white py-6 text-lg rounded-2xl"
            >
              Voltar
            </Button>
          )}
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex-1 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white py-6 text-lg font-bold rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed shadow-xl"
          >
            {step === 4 ? "Ver Resultado" : "Próximo"}
          </Button>
        </div>
      </div>
    </div>
  );
}
