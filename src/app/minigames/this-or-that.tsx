"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Zap, Heart, Trophy } from "lucide-react";
import { MinigameResult } from "./types";

interface Question {
  id: string;
  optionA: string;
  optionB: string;
  emoji: string;
}

const questions: Question[] = [
  { id: "1", optionA: "Pizza", optionB: "Sushi", emoji: "🍕🍣" },
  { id: "2", optionA: "Praia", optionB: "Montanha", emoji: "🏖️⛰️" },
  { id: "3", optionA: "Café", optionB: "Chá", emoji: "☕🍵" },
  { id: "4", optionA: "Filme", optionB: "Série", emoji: "🎬📺" },
  { id: "5", optionA: "Gato", optionB: "Cachorro", emoji: "🐱🐶" },
  { id: "6", optionA: "Verão", optionB: "Inverno", emoji: "☀️❄️" },
  { id: "7", optionA: "Dia", optionB: "Noite", emoji: "🌞🌙" },
  { id: "8", optionA: "Doce", optionB: "Salgado", emoji: "🍰🍕" },
  { id: "9", optionA: "Livro", optionB: "Podcast", emoji: "📚🎧" },
  { id: "10", optionA: "Festa", optionB: "Netflix", emoji: "🎉📺" },
  { id: "11", optionA: "Viajar", optionB: "Ficar em casa", emoji: "✈️🏠" },
  { id: "12", optionA: "Música ao vivo", optionB: "Playlist", emoji: "🎤🎵" },
  { id: "13", optionA: "Acordar cedo", optionB: "Dormir tarde", emoji: "🌅🌃" },
  { id: "14", optionA: "Esporte", optionB: "Games", emoji: "⚽🎮" },
  { id: "15", optionA: "Textos", optionB: "Áudios", emoji: "💬🎤" },
];

interface Props {
  matchName: string;
  onComplete: (result: MinigameResult) => void;
  onBack: () => void;
}

export default function ThisOrThat({ matchName, onComplete, onBack }: Props) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<"A" | "B" | null>(null);

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (option: "A" | "B") => {
    setSelectedOption(option);
    
    setTimeout(() => {
      const newAnswers = [...answers, option];
      setAnswers(newAnswers);
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      } else {
        // Simular resultado (em produção, comparar com respostas do parceiro)
        const compatibility = Math.floor(Math.random() * 30) + 70; // 70-100%
        const commonPoints = [
          "Ambos amam pizza! 🍕",
          "Preferem praia no verão ☀️",
          "São team Netflix 📺"
        ];
        
        onComplete({ compatibility, commonPoints });
      }
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 p-4">
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
            <h1 className="text-2xl font-bold text-white mb-1">Isto ou Aquilo</h1>
            <p className="text-white/80 text-sm">com {matchName}</p>
          </div>
          <div className="w-10" />
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-bold text-sm">
              {currentQuestion + 1}/{questions.length}
            </span>
            <span className="text-white/80 text-sm">{Math.round(progress)}%</span>
          </div>
          <div className="h-3 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
            <div
              className="h-full bg-gradient-to-r from-yellow-300 to-orange-400 transition-all duration-500 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 mb-6 border-2 border-white/30 shadow-2xl">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4 animate-bounce">{question.emoji}</div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Você prefere...
            </h2>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Option A */}
            <button
              onClick={() => handleAnswer("A")}
              className={`group relative overflow-hidden rounded-2xl p-8 transition-all duration-300 transform hover:scale-105 ${
                selectedOption === "A"
                  ? "bg-gradient-to-br from-yellow-400 to-orange-500 scale-105"
                  : "bg-white/20 hover:bg-white/30"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-300/50 to-orange-400/50 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="text-5xl mb-4">{question.emoji.split("")[0]}</div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {question.optionA}
                </h3>
                {selectedOption === "A" && (
                  <div className="mt-4">
                    <Zap className="w-8 h-8 text-white mx-auto animate-pulse" />
                  </div>
                )}
              </div>
            </button>

            {/* Option B */}
            <button
              onClick={() => handleAnswer("B")}
              className={`group relative overflow-hidden rounded-2xl p-8 transition-all duration-300 transform hover:scale-105 ${
                selectedOption === "B"
                  ? "bg-gradient-to-br from-pink-400 to-purple-500 scale-105"
                  : "bg-white/20 hover:bg-white/30"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-300/50 to-purple-400/50 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="text-5xl mb-4">{question.emoji.split("")[1]}</div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {question.optionB}
                </h3>
                {selectedOption === "B" && (
                  <div className="mt-4">
                    <Zap className="w-8 h-8 text-white mx-auto animate-pulse" />
                  </div>
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Fun Fact */}
        <div className="text-center">
          <p className="text-white/80 text-sm">
            💡 Escolhas rápidas revelam muito sobre personalidade!
          </p>
        </div>
      </div>
    </div>
  );
}
