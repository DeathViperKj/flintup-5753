"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trophy, Heart, MessageCircle, RotateCcw } from "lucide-react";
import { MinigameType, MinigameResult } from "./types";
import ThisOrThat from "./this-or-that";
import FirstDate from "./first-date";
import CompletePhrase from "./complete-phrase";
import TruthDare from "./truth-dare";
import TwoTruths from "./two-truths";
import VibeMap from "./vibe-map";

interface MinigameOption {
  id: MinigameType;
  name: string;
  description: string;
  emoji: string;
  color: string;
  duration: string;
}

const minigames: MinigameOption[] = [
  {
    id: "this-or-that",
    name: "Isto ou Aquilo",
    description: "15 escolhas rápidas e viciantes",
    emoji: "⚡",
    color: "from-orange-400 to-pink-500",
    duration: "30s"
  },
  {
    id: "first-date",
    name: "Primeiro Encontro Ideal",
    description: "Monte o date perfeito",
    emoji: "💕",
    color: "from-rose-400 to-pink-500",
    duration: "60s"
  },
  {
    id: "complete-phrase",
    name: "Complete a Frase",
    description: "Revele seu estilo",
    emoji: "💭",
    color: "from-cyan-400 to-blue-500",
    duration: "45s"
  },
  {
    id: "truth-dare",
    name: "Verdade ou Desafio",
    description: "10 cartas divertidas",
    emoji: "🎴",
    color: "from-purple-400 to-pink-500",
    duration: "90s"
  },
  {
    id: "two-truths",
    name: "2 Verdades e 1 Mentira",
    description: "Adivinhe a mentira",
    emoji: "🤔",
    color: "from-emerald-400 to-teal-500",
    duration: "60s"
  },
  {
    id: "vibe-map",
    name: "Mapa de Vibes",
    description: "Compare suas energias",
    emoji: "✨",
    color: "from-violet-400 to-fuchsia-500",
    duration: "30s"
  },
];

interface Props {
  matchId: number;
  matchName: string;
  isPremium: boolean;
  onClose: () => void;
  onSendMessage: () => void;
}

export default function MinigameHub({ matchId, matchName, isPremium, onClose, onSendMessage }: Props) {
  const [selectedGame, setSelectedGame] = useState<MinigameType | null>(null);
  const [result, setResult] = useState<MinigameResult | null>(null);

  const handleGameComplete = (gameResult: MinigameResult) => {
    setResult(gameResult);
    setSelectedGame(null);
  };

  const handlePlayAgain = () => {
    setResult(null);
  };

  // Result Screen
  if (result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-600 to-rose-600 p-4 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          {/* Animated Trophy */}
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <Trophy className="w-32 h-32 text-yellow-300 mx-auto animate-bounce" />
              <div className="absolute inset-0 animate-ping">
                <Trophy className="w-32 h-32 text-yellow-200 opacity-50" />
              </div>
            </div>
          </div>

          {/* Result Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border-2 border-white/30 shadow-2xl mb-6">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-white mb-2">
                {result.compatibility}% de Afinidade!
              </h2>
              <p className="text-white/80 text-lg">
                {result.compatibility >= 90 ? "Conexão incrível! 🔥" :
                 result.compatibility >= 75 ? "Ótima compatibilidade! ✨" :
                 result.compatibility >= 60 ? "Bom potencial! 💫" :
                 "Diferenças interessantes! 🌟"}
              </p>
            </div>

            {/* Compatibility Bar */}
            <div className="mb-8">
              <div className="h-6 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-500 rounded-full transition-all duration-1000 flex items-center justify-end pr-3"
                  style={{ width: `${result.compatibility}%` }}
                >
                  <span className="text-white font-bold text-sm">
                    {result.compatibility}%
                  </span>
                </div>
              </div>
            </div>

            {/* Common Points */}
            <div className="space-y-3 mb-8">
              <h3 className="text-xl font-bold text-white mb-4">Pontos em Comum:</h3>
              {result.commonPoints.map((point, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20"
                >
                  <p className="text-white font-medium">{point}</p>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={onSendMessage}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-6 text-lg font-bold rounded-2xl"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Conversar
              </Button>
              <Button
                onClick={handlePlayAgain}
                className="bg-white/20 hover:bg-white/30 text-white py-6 text-lg font-bold rounded-2xl border-2 border-white/30"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Jogar Outro
              </Button>
            </div>
          </div>

          <Button
            onClick={onClose}
            variant="ghost"
            className="w-full text-white hover:bg-white/20 py-4"
          >
            Voltar para Matches
          </Button>
        </div>
      </div>
    );
  }

  // Game Screen
  if (selectedGame) {
    const gameProps = {
      matchName,
      onComplete: handleGameComplete,
      onBack: () => setSelectedGame(null)
    };

    switch (selectedGame) {
      case "this-or-that":
        return <ThisOrThat {...gameProps} />;
      case "first-date":
        return <FirstDate {...gameProps} />;
      case "complete-phrase":
        return <CompletePhrase {...gameProps} />;
      case "truth-dare":
        return <TruthDare {...gameProps} />;
      case "two-truths":
        return <TwoTruths {...gameProps} />;
      case "vibe-map":
        return <VibeMap {...gameProps} />;
      default:
        return null;
    }
  }

  // Selection Screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-rose-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div className="text-center flex-1">
            <h1 className="text-3xl font-bold text-white mb-1">Minigames</h1>
            <p className="text-white/80">Jogue com {matchName}</p>
          </div>
          <div className="w-10" />
        </div>

        {/* Premium Badge */}
        {!isPremium && (
          <div className="bg-gradient-to-r from-yellow-400/20 to-orange-500/20 backdrop-blur-sm rounded-2xl p-4 mb-6 border border-yellow-400/30">
            <div className="flex items-center gap-3">
              <div className="text-3xl">⚠️</div>
              <div className="flex-1">
                <p className="text-white font-bold">Plano Básico</p>
                <p className="text-white/80 text-sm">1 minigame por dia • Upgrade para ilimitado</p>
              </div>
            </div>
          </div>
        )}

        {/* Games Grid */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {minigames.map((game) => (
            <button
              key={game.id}
              onClick={() => setSelectedGame(game.id)}
              className="group relative overflow-hidden bg-white/10 backdrop-blur-md rounded-3xl p-6 border-2 border-white/20 hover:border-white/40 transition-all hover:scale-105 text-left"
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-0 group-hover:opacity-20 transition-opacity`} />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-5xl">{game.emoji}</div>
                  <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-white text-xs font-bold">{game.duration}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">{game.name}</h3>
                <p className="text-white/80 text-sm mb-4">{game.description}</p>
                
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                    <div className={`h-full bg-gradient-to-r ${game.color} group-hover:w-full w-0 transition-all duration-500`} />
                  </div>
                  <span className="text-white text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    Jogar →
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Info */}
        <div className="text-center">
          <p className="text-white/60 text-sm">
            💡 Todos os minigames são assíncronos - cada um joga no seu tempo!
          </p>
        </div>
      </div>
    </div>
  );
}
