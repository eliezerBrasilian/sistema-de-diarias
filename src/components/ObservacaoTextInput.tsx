interface ObservacaoTextInputProps {
  value: string;
  onChangeText: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function ObservacaoTextInput({
  value,
  onChangeText,
}: ObservacaoTextInputProps) {
  return (
    <div style={{ width: "100%", padding: 15 }}>
      <textarea
        value={value}
        onChange={onChangeText}
        style={{
          border: "1px solid #ccc",
          borderRadius: "4px",
          height: "140px",
          padding: "8px",
          resize: "none", // Impede o redimensionamento do textarea pelo usuário
          width: "100%", // Ocupa toda a largura disponível,
        }}
        placeholder="Digite sua observação..."
        maxLength={141}
      />
    </div>
  );
}
