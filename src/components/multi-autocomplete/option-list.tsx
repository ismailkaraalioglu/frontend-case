interface OptionListProps<T> {
  options: T[];
  value: T[];
  getOptionLabel: (option: T) => string;
  getOptionId: (option: T) => number;
  handleSelectItem: (item: T) => void;
  renderOption?: (option: T) => React.ReactNode;
  isLoading?: boolean;
  error?: string | undefined;
  highlightIndex: number;
  setHighlightIndex: (index: number) => void;
}

const OptionList = <T,>({
  options,
  value,
  getOptionLabel,
  getOptionId,
  handleSelectItem,
  renderOption,
  isLoading,
  error,
  highlightIndex,
  setHighlightIndex,
}: OptionListProps<T>): JSX.Element => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        {error}
      </div>
    );
  }

  return (
    <>
      {options?.map((o: T, index: number) => (
        <div
          key={getOptionId(o)}
          className={`p-3 flex items-center gap-3 cursor-pointer ${
            index === highlightIndex ? "bg-gray-100" : ""
          }`}
          onClick={() => handleSelectItem(o)}
          onMouseEnter={() => setHighlightIndex(index)}
        >
          <input
            type="checkbox"
            checked={!!value?.find((v) => getOptionId(v) === getOptionId(o))}
            className="cursor-pointer"
            readOnly
          />
          {renderOption ? renderOption(o) : <div>{getOptionLabel(o)}</div>}
        </div>
      ))}
    </>
  );
};

export default OptionList;
