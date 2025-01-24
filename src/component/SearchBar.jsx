import React, { useState, useEffect, useRef } from "react";
import { locationsOption } from "../utils/select-options";

const SearchBar = () => {
  const [locationInput, setLocationInput] = useState("");
  const [filteredLocations, setFilteredLocations] = useState(locationsOption);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setLocationInput(value);
    setFilteredLocations(
      locationsOption.filter((location) =>
        location.name.toLowerCase().includes(value.toLowerCase())
      )
    );
    setDropdownVisible(true);
  };

  const handleLocationSelect = (locationName) => {
    setLocationInput(locationName);
    setDropdownVisible(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="w-full justify-center flex bg-blue-200 py-2 xs:py-1 md:py-2">
        <div className="kontener px-2 2xl:px-0">
          <div className="inline-block xs:flex w-full gap-1">
            <div className="w-full h-[50px] mb-1 md:mb-0">
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only"
              >
                Search
              </label>
              <div className="relative">
                <input
                  type="search"
                  id="default-search"
                  className="block w-full h-[50px] p-4 px-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 outline-none"
                  placeholder="Search for a job title.."
                  required
                />
                <button
                  type="submit"
                  className="text-white absolute end-2.5 bottom-[0.4rem] bg-blue-700 hover:bg-blue-800 outline-none font-medium rounded-lg text-sm px-4 py-2"
                >
                  Search
                </button>
              </div>
            </div>

            <div className="w-full h-[50px] relative" ref={dropdownRef}>
              <input
                type="text"
                value={locationInput}
                onChange={handleLocationChange}
                onFocus={() => setDropdownVisible(true)}
                placeholder="Location"
                className="text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 outline-none h-full w-full px-3 py-2.5"
              />
              {isDropdownVisible && filteredLocations.length > 0 && (
                <div className="absolute bg-white border border-gray-300 rounded-lg shadow-lg mt-1 w-full z-10">
                  {filteredLocations.map((location) => (
                    <div
                      key={location.id}
                      onClick={() => handleLocationSelect(location.name)}
                      className="cursor-pointer p-2 hover:bg-gray-100"
                    >
                      {location.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
