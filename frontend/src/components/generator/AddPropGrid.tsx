'use client';
import AddPropFields from './AddPropFields';
import AddPropOptions from './AddPropOptions';
import type { NewProp } from './generatorTypes';

interface Props {
  newProp: NewProp;
  onAdd: () => void;
  set: (patch: Partial<NewProp>) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

export default function AddPropGrid(
  { newProp, onAdd, set, onKeyDown }: Props,
) {
  return (
    <>
      <AddPropFields
        name={newProp.name}
        type={newProp.type}
        onNameChange={(v) => set({
          name: v,
        })}
        onTypeChange={(v) => set({
          type: v,
        })}
        onKeyDown={onKeyDown}
      />
      <AddPropOptions
        required={newProp.required}
        defaultValue={newProp.defaultValue}
        disableAdd={!newProp.name.trim()}
        onRequiredChange={(v) => set({
          required: v,
        })}
        onDefaultChange={(v) => set({
          defaultValue: v,
        })}
        onAdd={onAdd}
      />
    </>
  );
}
