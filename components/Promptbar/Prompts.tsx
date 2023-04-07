import { Prompt } from '@/types/prompt';
import { FC } from 'react';
import { PromptComponent } from './Prompt';

interface Props {
  prompts: Prompt[];
  onUpdatePrompt: (prompt: Prompt) => void;
  onMintPrompt: (prompt: Prompt) => void;
  onDeletePrompt: (prompt: Prompt) => void;
}

export const Prompts: FC<Props> = ({
  prompts,
  onUpdatePrompt,
  onMintPrompt,
  onDeletePrompt,
}) => {
  return (
    <div className="flex w-full flex-col gap-1">
      {prompts
        .slice()
        .reverse()
        .map((prompt, index) => (
          <PromptComponent
            key={index}
            prompt={prompt}
            onUpdatePrompt={onUpdatePrompt}
            onMintPrompt={onMintPrompt}
            onDeletePrompt={onDeletePrompt}
          />
        ))}
    </div>
  );
};
