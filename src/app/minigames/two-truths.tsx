"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, XCircle } from "lucide-react";
import { MinigameResult } from "./types";

interface Statement {
  id: string;
  text: string;
  emoji: string;
}

const availableStatements: Statement[] = [
  { id: "1", text: "Amo viajar para lugares novos", emoji: "✈️" },
  { id: "2", text: "Odeio café", emoji: "☕" },
  { id: "3", text: "Tenho medo de altura", emoji: "🏔️" },
  { id: "4", text: "Sei tocar um instrumento", emoji: "🎸" },
  { id: "5", text: "Adoro acordar cedo", emoji: "🌅" },
  { id: "6", text: "Já pulei de paraquedas", emoji: "🪂" },
  { id: "7", text: "Sou péssimo(a) na cozinha", emoji: "🍳" },
  { id: "8", text: "Tenho mais de 3 pets", emoji: "🐾" },
  { id: "9", text: "Odeio filmes de terror", emoji: "👻" },
];

interface Props {
  matchName: string;
  onComplete: (result: MinigameResult) => void;
  onBack: () => void;
}

export default function TwoTruths({ matchName, onComplete, onBack }: Props) {
  const [step, setStep] = useState<"select" | "mark" | "guess">("select");
  const [selectedStatements, setSelectedStatements] = useState<string[]>([]);
  const [lieId, setLieId] = useState<string | null>(null);
  const [guess, setGuess] = useState<string | null>(null);

  const handleSelectStatement = (id: string) => {
    if (selectedStatements.includes(id)) {
      setSelectedStatements(selectedStatements.filter(s => s !== id));
    } else if (selectedStatements.length < 3) {
      setSelectedStatements([...selectedStatements, id]);
    }
  };

  const handleMarkLie = (id: string) => {
    setLieId(id);
  };

  const handleGuess = (id: string) => {
    setGuess(id);
    
    setTimeout(() => {
      // Simular resultado
      const isCorrect = Math.random() > 0.5;
      const compatibility = isCorrect ? 95 : 85;
      const commonPoints = [
        isCorrect ? "Você adivinhou a mentira! 🎯" : "Quase lá! 😄",
        "Vocês têm curiosidades parecidas",
        "Ótima sintonia de personalidade"
      ];
      
      onComplete({ compatibility, commonPoints });
    }, 1500);
  };

  const selectedStatementsData = availableStatements.filter(s => 
    selectedStatements.includes(s.id)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 p-4">
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
            <h1 className="text-2xl font-bold text-white mb-1">2 Verdades e 1 Mentira</h1>
            <p className="text-white/80 text-sm">com {matchName}</p>
          </div>
          <div className="w-10" />
        </div>

        {/* Step 1: Select Statements */}
        {step === "select" && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🤔</div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Escolha 3 afirmações
              </h2>
              <p className="text-white/80">Selecione as que mais combinam com você</p>
              <div className="mt-4">
                <span className="text-white font-bold text-lg">
                  {selectedStatements.length}/3 selecionadas
                </span>
              </div>
            </div>

            <div className="grid gap-3">
              {availableStatements.map((statement) => (
                <button
                  key={statement.id}
                  onClick={() => handleSelectStatement(statement.id)}
                  disabled={!selectedStatements.includes(statement.id) && selectedStatements.length >= 3}
                  className={`p-6 rounded-2xl transition-all duration-300 transform hover:scale-102 ${
                    selectedStatements.includes(statement.id)
                      ? "bg-gradient-to-r from-emerald-400 to-teal-500 scale-102 shadow-2xl"
                      : "bg-white/20 hover:bg-white/30"
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{statement.emoji}</div>
                    <p className="text-white font-medium text-lg flex-1 text-left">
                      {statement.text}
                    </p>
                    {selectedStatements.includes(statement.id) && (
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            <Button
              onClick={() => setStep("mark")}
              disabled={selectedStatements.length !== 3}
              className="w-full bg-white text-teal-600 hover:bg-white/90 py-6 text-lg font-bold rounded-2xl disabled:opacity-50"
            >
              Continuar
            </Button>
          </div>
        )}

        {/* Step 2: Mark the Lie */}
        {step === "mark" && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🤫</div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Qual é a mentira?
              </h2>
              <p className="text-white/80">Marque qual das 3 é falsa</p>
            </div>

            <div className="grid gap-4">
              {selectedStatementsData.map((statement) => (
                <button
                  key={statement.id}
                  onClick={() => handleMarkLie(statement.id)}
                  className={`p-6 rounded-2xl transition-all duration-300 transform hover:scale-102 ${
                    lieId === statement.id
                      ? "bg-gradient-to-r from-red-400 to-rose-500 scale-102 shadow-2xl"
                      : "bg-white/20 hover:bg-white/30"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{statement.emoji}</div>
                    <p className="text-white font-medium text-lg flex-1 text-left">
                      {statement.text}
                    </p>
                    {lieId === statement.id && (
                      <XCircle className="w-6 h-6 text-white" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            <Button
              onClick={() => setStep("guess")}
              disabled={!lieId}
              className="w-full bg-white text-teal-600 hover:bg-white/90 py-6 text-lg font-bold rounded-2xl disabled:opacity-50"
            >
              Enviar para {matchName}
            </Button>
          </div>
        )}

        {/* Step 3: Guess Partner's Lie */}
        {step === "guess" && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🎯</div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Adivinhe a mentira de {matchName}
              </h2>
              <p className="text-white/80">Qual você acha que é falsa?</p>
            </div>

            <div className="grid gap-4">
              {/* Simular afirmações do parceiro */}
              {["Amo praia", "Odeio pizza", "Tenho 2 gatos"].map((text, index) => (
                <button
                  key={index}
                  onClick={() => handleGuess(String(index))}
                  disabled={guess !== null}
                  className={`p-6 rounded-2xl transition-all duration-300 transform hover:scale-102 ${
                    guess === String(index)
                      ? "bg-gradient-to-r from-yellow-400 to-orange-500 scale-102 shadow-2xl"
                      : "bg-white/20 hover:bg-white/30"
                  } disabled:cursor-not-allowed`}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">
                      {["🏖️", "🍕", "🐱"][index]}
                    </div>
                    <p className="text-white font-medium text-lg flex-1 text-left">
                      {text}
                    </p>
                    {guess === String(index) && (
                      <div className="animate-spin">⏳</div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
