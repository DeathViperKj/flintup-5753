"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageSquare, Sparkles } from "lucide-react";
import { MinigameResult } from "./types";

interface Question {
  id: string;
  phrase: string;
  options: string[];
  emoji: string;
}

const questions: Question[] = [
  {
    id: "1",
    phrase: "No primeiro encontro perfeito, eu gostaria de...",
    options: [
      "Conversar por horas sem perceber o tempo passar",
      "Fazer algo divertido e cheio de risadas",
      "Ter um momento romântico e especial"
    ],
    emoji: "💫"
  },
  {
    id: "2",
    phrase: "Algo que sempre me faz rir é...",
    options: [
      "Memes e piadas bestas",
      "Situações engraçadas do dia a dia",
      "Humor inteligente e sarcasmo"
    ],
    emoji: "😂"
  },
  {
    id: "3",
    phrase: "Eu topo na hora se for...",
    options: [
      "Uma aventura espontânea",
      "Um programa tranquilo e aconchegante",
      "Algo novo que eu nunca fiz"
    ],
    emoji: "🚀"
  },
  {
    id: "4",
    phrase: "Meu tipo de conversa favorita é sobre...",
    options: [
      "Sonhos, planos e futuro",
      "Coisas engraçadas e leves",
      "Assuntos profundos e filosóficos"
    ],
    emoji: "💭"
  },
  {
    id: "5",
    phrase: "Em um relacionamento, eu valorizo muito...",
    options: [
      "Cumplicidade e parceria",
      "Diversão e leveza",
      "Conexão emocional profunda"
    ],
    emoji: "💕"
  },
  {
    id: "6",
    phrase: "Meu date ideal terminaria com...",
    options: [
      "Um beijo apaixonado",
      "Planos para nos ver de novo logo",
      "Uma conversa até tarde"
    ],
    emoji: "✨"
  },
  {
    id: "7",
    phrase: "Quando estou com alguém especial, eu gosto de...",
    options: [
      "Fazer surpresas e gestos românticos",
      "Curtir momentos simples juntos",
      "Ter conversas profundas e verdadeiras"
    ],
    emoji: "🌟"
  },
  {
    id: "8",
    phrase: "O que me atrai em alguém é...",
    options: [
      "Senso de humor incrível",
      "Inteligência e profundidade",
      "Energia positiva e alegria"
    ],
    emoji: "⚡"
  }
];

interface Props {
  matchName: string;
  onComplete: (result: MinigameResult) => void;
  onBack: () => void;
}

export default function CompletePhrase({ matchName, onComplete, onBack }: Props) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (optionIndex: number) => {
    setSelectedOption(optionIndex);
    
    setTimeout(() => {
      const newAnswers = [...answers, optionIndex];
      setAnswers(newAnswers);
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      } else {
        // Simular resultado
        const compatibility = Math.floor(Math.random() * 25) + 75; // 75-100%
        const commonPoints = [
          "Vocês têm o mesmo estilo de humor! 😂",
          "Valorizam as mesmas coisas em um relacionamento 💕",
          "Combinam na vibe de encontros perfeitos ✨"
        ];
        
        onComplete({ compatibility, commonPoints });
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 p-4">
      <div className="max-w-3xl mx-auto">
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
            <h1 className="text-2xl font-bold text-white mb-1">Complete a Frase</h1>
            <p className="text-white/80 text-sm">com {matchName}</p>
          </div>
          <div className="w-10" />
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-bold text-sm">
              Pergunta {currentQuestion + 1}/{questions.length}
            </span>
            <span className="text-white/80 text-sm">{Math.round(progress)}%</span>
          </div>
          <div className="h-3 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
            <div
              className="h-full bg-gradient-to-r from-cyan-300 to-blue-400 transition-all duration-500 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 mb-6 border-2 border-white/30 shadow-2xl">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4 animate-pulse">{question.emoji}</div>
            <MessageSquare className="w-12 h-12 text-white mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white leading-relaxed">
              {question.phrase}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-4">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className={`w-full text-left p-6 rounded-2xl transition-all duration-300 transform hover:scale-102 ${
                  selectedOption === index
                    ? "bg-gradient-to-r from-cyan-400 to-blue-500 scale-102 shadow-2xl"
                    : "bg-white/20 hover:bg-white/30"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    selectedOption === index
                      ? "bg-white text-blue-500"
                      : "bg-white/30 text-white"
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <p className="text-white font-medium text-lg flex-1">{option}</p>
                  {selectedOption === index && (
                    <Sparkles className="w-6 h-6 text-white animate-pulse flex-shrink-0" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Tip */}
        <div className="text-center">
          <p className="text-white/80 text-sm">
            💡 Suas respostas revelam seu estilo e personalidade!
          </p>
        </div>
      </div>
    </div>
  );
}
