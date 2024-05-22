import { CloseCircle } from "iconsax-react";

interface TagListProps<T> {
  value: T[];
  getOptionLabel: (option: T) => string;
  getOptionId: (option: T) => number;
  handleRemove: (id: number) => void;
  renderTags?: (
    value: T[],
    handleRemove: (id: number) => void
  ) => React.ReactNode;
}

const TagList = <T,>({
  value,
  getOptionLabel,
  getOptionId,
  handleRemove,
  renderTags,
}: TagListProps<T>): JSX.Element => {
  if (renderTags) {
    return <>{renderTags(value, handleRemove)}</>;
  }

  return (
    <>
      {value?.map((selected, idx) => (
        <div
          key={idx}
          className="flex items-center gap-2 bg-gray-200 p-2 rounded-lg"
        >
          <span className="text-sm shrink-0 text-gray-800">
            {getOptionLabel(selected)}
          </span>
          <button
            type="button"
            className="text-gray-400 hover:text-gray-500 cursor-pointer"
            onClick={() => handleRemove(getOptionId(selected))}
          >
            <CloseCircle size="22" variant="Bold" />
          </button>
        </div>
      ))}
    </>
  );
};

export default TagList;
