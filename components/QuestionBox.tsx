
import React, { useState } from 'react';
import { Question } from '../types';

interface QuestionBoxProps {
  question: Question;
  onAnswer: (selected: string) => void;
  disabled: boolean;
}

const QuestionBox: React.FC<QuestionBoxProps> = ({ question, onAnswer, disabled }) => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (option: string) => {
    if (disabled) return;
    setSelected(option);
    setTimeout(() => {
      onAnswer(option);
      setSelected(null);
    }, 400);
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-md p-6 rounded-2xl border border-slate-700 shadow-xl w-full max-w-lg">
      <div className="mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
          question.category === 'math' ? 'bg-blue-600/30 text-blue-400' : 'bg-purple-600/30 text-purple-400'
        }`}>
          {question.category}
        </span>
      </div>
      
      <h3 className="text-xl font-semibold mb-6 text-slate-100 leading-relaxed">
        {question.question}
      </h3>

      <div className="grid gap-3">
        {question.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleSelect(option)}
            disabled={disabled}
            className={`
              w-full text-left p-4 rounded-xl border transition-all duration-200
              ${selected === option 
                ? 'bg-indigo-600 border-indigo-400 text-white translate-x-1' 
                : 'bg-slate-900/50 border-slate-700 text-slate-300 hover:bg-slate-700/50 hover:border-slate-500'
              }
              ${disabled && selected !== option ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            <div className="flex items-center">
              <span className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center mr-3 text-sm font-bold text-slate-400">
                {String.fromCharCode(65 + idx)}
              </span>
              {option}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionBox;
