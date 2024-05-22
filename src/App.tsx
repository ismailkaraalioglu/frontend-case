import { useState } from "react";
import MultiAutocomplete from "./components/multi-autocomplete";
import { useGetCharactersQuery } from "./stores/characters/services";
import { Character } from "./models/character";
import { highlightText } from "./lib/highlight-text";
import { getErrorMessage } from "./lib/error-handling";

function App() {
  const [query, setQuery] = useState<string>("");
  const { data, isLoading, isFetching, error } = useGetCharactersQuery(
    { query },
    { skip: !query }
  );
  const [selectedCharacters, setSelectedCharacters] = useState<Character[]>([]);

  const renderOption = (option: Character) => (
    <div className="flex items-center gap-3">
      <img
        src={option.image}
        alt={option.name}
        className="size-12 rounded-md object-cover"
      />
      <div className="flex flex-col">
        <div>{highlightText(option.name, query)}</div>
        <div>{option.episode.length} Episodes</div>
      </div>
    </div>
  );

  return (
    <div className="flex justify-center items-center pt-20">
      <MultiAutocomplete<Character>
        options={data?.results || []}
        getOptionId={(option) => option.id}
        getOptionLabel={(option) => option.name}
        inputValue={query}
        onInputChange={(e) => setQuery(e.target.value)}
        placeholder="Search characters..."
        isLoading={isLoading || isFetching}
        error={getErrorMessage(error)}
        value={selectedCharacters}
        onChange={setSelectedCharacters}
        renderOption={renderOption}
      />
    </div>
  );
}

export default App;
