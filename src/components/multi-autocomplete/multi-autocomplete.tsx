import {
  ChangeEvent,
  ChangeEventHandler,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { ArrowDown2, ArrowUp2 } from "iconsax-react";
import useScrollToIndex from "@/hooks/use-scroll-to-index";
import useClickOutside from "@/hooks/use-click-outside";
import useDebounce from "@/hooks/use-debounce";
import TagList from "./tag-list";
import OptionList from "./option-list";

interface MultiAutocompleteProps<T> {
  options: T[];
  placeholder?: string;
  inputValue?: string | number | readonly string[] | undefined;
  onInputChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  isLoading?: boolean;
  error?: string | undefined;
  value: T[];
  onChange: (value: T[]) => void;
  getOptionLabel: (option: T) => string;
  getOptionId: (option: T) => number;
  renderOption?: (option: T) => React.ReactNode;
  renderTags?: (
    value: T[],
    handleRemove: (id: number) => void
  ) => React.ReactNode;
}

const MultiAutocomplete = <T,>({
  placeholder,
  options,
  inputValue,
  onInputChange,
  isLoading,
  error,
  value,
  onChange,
  getOptionLabel,
  getOptionId,
  renderOption,
  renderTags,
}: MultiAutocompleteProps<T>): JSX.Element => {
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [isFocused, setIsFocused] = useState(false);
  const [localInputValue, setLocalInputValue] = useState(inputValue);

  const { listRef, scrollToIndex } = useScrollToIndex<HTMLDivElement>();
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => {
    setIsFocused(false);
  });
  const debouncedInputValue = useDebounce(localInputValue as string, 300);

  useEffect(() => {
    const event = {
      target: { value: debouncedInputValue },
    } as ChangeEvent<HTMLInputElement>;

    onInputChange?.(event);
  }, [debouncedInputValue, onInputChange]);

  const handleRemove = (id: number) => {
    const newValue = value.filter((item) => getOptionId(item) !== id);
    onChange(newValue);
  };

  const handleSelectItem = (item: T) => {
    const newValue = value.some((v) => getOptionId(v) === getOptionId(item))
      ? value.filter((v) => getOptionId(v) !== getOptionId(item))
      : [...value, item];
    onChange(newValue);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightIndex((prevIndex) => {
          const newIndex = Math.min(prevIndex + 1, options.length - 1);
          scrollToIndex(newIndex);
          return newIndex;
        });
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightIndex((prevIndex) => {
          const newIndex = Math.max(prevIndex - 1, 0);
          scrollToIndex(newIndex);
          return newIndex;
        });
        break;
      case "Enter":
        if (highlightIndex >= 0) {
          e.preventDefault();
          handleSelectItem(options[highlightIndex]);
        }
        break;
      case "Backspace":
        if (!inputValue && value.length > 0) {
          handleRemove(getOptionId(value[value.length - 1]));
        }
        break;
    }
  };

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setHighlightIndex(-1);
    setLocalInputValue(e.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const shouldShowList = debouncedInputValue && isFocused;

  return (
    <div
      ref={ref}
      className="min-w-[31.25rem] max-w-[35rem] relative p-2 border border-gray-500 rounded-xl"
    >
      <div className="flex items-center">
        <div className="flex flex-1 flex-wrap items-center gap-1">
          <TagList
            value={value}
            getOptionLabel={getOptionLabel}
            getOptionId={getOptionId}
            handleRemove={handleRemove}
            renderTags={renderTags}
          />
          <input
            type="text"
            className="min-w-[2rem] flex-1 p-2 outline-0 text-gray-800"
            placeholder={placeholder}
            value={localInputValue}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="flex items-center gap-2">
          {shouldShowList ? <ArrowUp2 size="22" /> : <ArrowDown2 size="22" />}
        </div>
      </div>
      {shouldShowList && (
        <div
          ref={listRef}
          className="absolute top-full left-0 w-full h-96 overflow-auto border border-gray-500 rounded-xl mt-3 divide-y"
        >
          <OptionList
            options={options}
            value={value}
            getOptionLabel={getOptionLabel}
            getOptionId={getOptionId}
            handleSelectItem={handleSelectItem}
            renderOption={renderOption}
            isLoading={isLoading}
            error={error}
            highlightIndex={highlightIndex}
            setHighlightIndex={setHighlightIndex}
          />
        </div>
      )}
    </div>
  );
};

export default MultiAutocomplete;
