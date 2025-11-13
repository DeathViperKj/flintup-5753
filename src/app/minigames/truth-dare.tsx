"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Zap, MessageCircle } from "lucide-react";
import { MinigameResult } from "./types";

interface Card {
  id: string;
  type: "truth" | "dare";
  question: string;
  emoji: string;
}

const cards: Card[] = [
  { id: "1", type: "truth", question: "O que mais te atrai em alguém?", emoji: "💕" },
  { id: "2", type: "dare", question: "Mande um emoji que te representa hoje", emoji: "😊" },
  { id: "3", type: "truth", question: "Um hábito que você ama?", emoji: "✨" },
  { id: "4", type: "dare", question: "Escolha um lugar para um encontro rápido", emoji: "📍" },
  { id: "5", type: "truth", question: "Qual sua música favorita do momento?", emoji: "🎵" },
  { id: "6", type: "dare", question: "Descreva seu date ideal em 3 palavras", emoji: "💭" },
  { id: "7", type: "truth", question: "O que te faz rir sempre?", emoji: "😂" },
  { id: "8", type: "dare", question: "Compartilhe seu filme favorito", emoji: "🎬" },
  { id: "9", type: "truth", question: "Sua maior paixão na vida?", emoji: "🔥" },
  { id: "10", type: "dare", question: "Mande uma foto do seu lugar favorito", emoji: "📸" },
];

interface Props {
  matchName: string;
  onComplete: (result: MinigameResult) => void;
  onBack: () => void;
}

export default function TruthOrDare({ matchName, onComplete, onBack }: Props) {
  const [currentCard, setCurrentCard] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isFlipped, setIsFlipped] = useState(false);
  const [answer, setAnswer] = useState("");

  const card = cards[currentCard];
  const progress = ((currentCard + 1) / cards.length) * 100;

  const handleFlip = () => {
    setIsFlipped(true);
  };

  const handleNext = () => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    
    if (currentCard < cards.length - 1) {
      setCurrentCard(currentCard + 1);
      setIsFlipped(false);
      setAnswer("");
    } else {
      // Simular resultado
      const compatibility = Math.floor(Math.random() * 20) + 80; // 80-100%
      const commonPoints = [
        "Vocês têm gostos musicais parecidos! 🎵",
        "Compartilham os mesmos valores 💕",
        "Senso de humor compatível 😂"
      ];
      
      onComplete({ compatibility, commonPoints });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-4">
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
            <h1 className="text-2xl font-bold text-white mb-1">Verdade ou Desafio</h1>
            <p className="text-white/80 text-sm">com {matchName}</p>
          </div>
          <div className="w-10" />
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-bold text-sm">
              Carta {currentCard + 1}/{cards.length}
            </span>
            <span className="text-white/80 text-sm">{Math.round(progress)}%</span>
          </div>
          <div className="h-3 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
            <div
              className="h-full bg-gradient-to-r from-pink-300 to-purple-400 transition-all duration-500 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Card */}
        <div className="mb-8" style={{ perspective: '1000px' }}>
          <div
            className="relative w-full h-96 transition-transform duration-700"
            style={{
              transformStyle: 'preserve-3d',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
            }}
          >
            {/* Card Front */}
            {!isFlipped && (
              <div className="absolute inset-0" style={{ backfaceVisibility: 'hidden' }}>
                <button
                  onClick={handleFlip}
                  className="w-full h-full bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-md rounded-3xl border-4 border-white/30 shadow-2xl hover:scale-105 transition-transform"
                >
                  <div className="flex flex-col items-center justify-center h-full p-8">
                    <div className={`w-24 h-24 rounded-full mb-6 flex items-center justify-center ${
                      card.type === "truth"
                        ? "bg-gradient-to-br from-blue-400 to-cyan-500"
                        : "bg-gradient-to-br from-pink-400 to-rose-500"
                    }`}>
                      {card.type === "truth" ? (
                        <MessageCircle className="w-12 h-12 text-white" />
                      ) : (
                        <Zap className="w-12 h-12 text-white" />
                      )}
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4">
                      {card.type === "truth" ? "VERDADE" : "DESAFIO"}
                    </h3>
                    <p className="text-white/80 text-lg">Toque para revelar</p>
                    <div className="mt-6 text-5xl animate-bounce">👆</div>
                  </div>
                </button>
              </div>
            )}

            {/* Card Back */}
            {isFlipped && (
              <div 
                className="absolute inset-0"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)'
                }}
              >
                <div className={`w-full h-full rounded-3xl border-4 border-white/30 shadow-2xl p-8 flex flex-col ${
                  card.type === "truth"
                    ? "bg-gradient-to-br from-blue-500 to-cyan-600"
                    : "bg-gradient-to-br from-pink-500 to-rose-600"
                }`}>
                  <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <div className="text-7xl mb-6 animate-pulse">{card.emoji}</div>
                    <h3 className="text-2xl font-bold text-white mb-4 leading-relaxed">
                      {card.question}
                    </h3>
                  </div>
                  
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      placeholder="Digite sua resposta..."
                      className="w-full px-4 py-3 rounded-xl bg-white/20 border-2 border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:border-white/60"
                    />
                    <Button
                      onClick={handleNext}
                      disabled={!answer.trim()}
                      className="w-full bg-white text-purple-600 hover:bg-white/90 py-6 text-lg font-bold rounded-xl disabled:opacity-50"
                    >
                      {currentCard < cards.length - 1 ? "Próxima Carta" : "Ver Resultado"}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tip */}
        <div className="text-center">
          <p className="text-white/80 text-sm">
            💡 Seja autêntico(a)! As melhores conexões vêm da verdade
          </p>
        </div>
      </div>
    </div>
  );
}
