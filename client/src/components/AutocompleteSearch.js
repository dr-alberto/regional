import React, { useState, startTransition } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import { classNames } from '../utils/utils';


const AutocompleteSearch = ({ selectedPlace, onSelectPlace, roundedSettings, placeholder }) => {
  const [address, setAddress] = useState(selectedPlace);

  const handleSelect = async (selected) => {
    // const results = await geocodeByAddress(selected);

    startTransition(() => {
        onSelectPlace(selected);
        setAddress(selected);
    })
    
  };

  return (
    <>
    
    <PlacesAutocomplete
      value={address}
      onChange={setAddress}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div className='relative'>
          <input
            {...getInputProps({
              placeholder: placeholder,
            })}
            value={address}
            className= {
                classNames(
                    roundedSettings === 'Pill' ? 'rounded-b-lg' : null,
                    // roundedSettings === 'Sharp' ? null : null,
                    roundedSettings === 'Rounded' ? 'rounded-b-md' : null,
                    'location-search-input block w-full border-0 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-zinc-600 sm:text-sm sm:leading-6'
                
                )}
            required
          />
            <div className={
                classNames(
                    suggestions.length === 0 ? "hidden" : null,
                    "autocomplete-dropdown-container absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"            )
            }>
            {loading && <div>Loading...</div>}
            {suggestions.map((suggestion) => {
                    
                return (
                    <div
                        key={suggestion.placeId}
                        {...getSuggestionItemProps(suggestion)}
                        className={
                            classNames(
                                suggestion.active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                "relative cursor-default select-none py-2 pl-3 pr-9"
                            )
                        }
                    >
                    {suggestion.description}
                    </div>
                );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
    </>
  );
};

export default AutocompleteSearch;
