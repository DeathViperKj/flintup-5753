"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { MinigameResult } from "./types";

interface Props {
  matchName: string;
  onComplete: (result: MinigameResult) => void;
  onBack: () => void;
}

export default function VibeMap({ matchName, onComplete, onBack }: Props) {
  const [energy, setEnergy] = useState(50);
  const [confidence, setConfidence] = useState(50);
  const [intensity, setIntensity] = useState(50);

  const handleComplete = () => {
    // Simular comparação com parceiro
    const partnerEnergy = Math.floor(Math.random() * 40) + 40;
    const partnerConfidence = Math.floor(Math.random() * 40) + 40;
    const partnerIntensity = Math.floor(Math.random() * 40) + 40;

    const energyDiff = Math.abs(energy - partnerEnergy);
    const confidenceDiff = Math.abs(confidence - partnerConfidence);
    const intensityDiff = Math.abs(intensity - partnerIntensity);

    const avgDiff = (energyDiff + confidenceDiff + intensityDiff) / 3;
    const compatibility = Math.round(100 - avgDiff);

    const commonPoints = [
      `Energia: ${energyDiff < 20 ? "Muito parecidos!" : "Complementares"} ⚡`,
      `Confiança: ${confidenceDiff < 20 ? "Mesma vibe!" : "Equilibrados"} 💪`,
      `Intensidade: ${intensityDiff < 20 ? "Combinam perfeitamente!" : "Interessante mix"} 🔥`
    ];

    onComplete({ compatibility, commonPoints });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-600 via-fuchsia-600 to-pink-600 p-4">
      <div className="max-w-2xl mx-auto">
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
            <h1 className="text-2xl font-bold text-white mb-1">Mapa de Vibes</h1>
            <p className="text-white/80 text-sm">com {matchName}</p>
          </div>
          <div className="w-10" />
        </div>

        {/* Content */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border-2 border-white/30 shadow-2xl space-y-8">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">✨</div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Ajuste suas vibes
            </h2>
            <p className="text-white/80">Mostre como você é</p>
          </div>

          {/* Energy Slider */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-white font-medium">⚡ Energia</span>
              <span className="text-white/80 text-sm">{energy}%</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-white/60 text-sm">Baixa</span>
              <input
                type="range"
                min="0"
                max="100"
                value={energy}
                onChange={(e) => setEnergy(Number(e.target.value))}
                className="flex-1 h-3 bg-white/20 rounded-full appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #fbbf24 0%, #f59e0b ${energy}%, rgba(255,255,255,0.2) ${energy}%, rgba(255,255,255,0.2) 100%)`
                }}
              />
              <span className="text-white/60 text-sm">Alta</span>
            </div>
          </div>

          {/* Confidence Slider */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-white font-medium">💪 Confiança</span>
              <span className="text-white/80 text-sm">{confidence}%</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-white/60 text-sm">Tímido</span>
              <input
                type="range"
                min="0"
                max="100"
                value={confidence}
                onChange={(e) => setConfidence(Number(e.target.value))}
                className="flex-1 h-3 bg-white/20 rounded-full appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #8b5cf6 0%, #a78bfa ${confidence}%, rgba(255,255,255,0.2) ${confidence}%, rgba(255,255,255,0.2) 100%)`
                }}
              />
              <span className="text-white/60 text-sm">Extrovertido</span>
            </div>
          </div>

          {/* Intensity Slider */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-white font-medium">🔥 Intensidade</span>
              <span className="text-white/80 text-sm">{intensity}%</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-white/60 text-sm">Calmo</span>
              <input
                type="range"
                min="0"
                max="100"
                value={intensity}
                onChange={(e) => setIntensity(Number(e.target.value))}
                className="flex-1 h-3 bg-white/20 rounded-full appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #ec4899 0%, #f472b6 ${intensity}%, rgba(255,255,255,0.2) ${intensity}%, rgba(255,255,255,0.2) 100%)`
                }}
              />
              <span className="text-white/60 text-sm">Intenso</span>
            </div>
          </div>

          <Button
            onClick={handleComplete}
            className="w-full bg-white text-fuchsia-600 hover:bg-white/90 py-6 text-lg font-bold rounded-2xl mt-8"
          >
            Ver Compatibilidade
          </Button>
        </div>

        {/* Tip */}
        <div className="text-center mt-6">
          <p className="text-white/80 text-sm">
            💡 Quanto mais parecidas as vibes, maior a afinidade!
          </p>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }
        .slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }
      `}</style>
    </div>
  );
}
