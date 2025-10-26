import React, { useState } from "react";

import { Button } from "../button";

interface ActivityDropdownProps {
  onApply: (selectedActivities: string[]) => void;
  onClear: () => void;
  contentRef: React.RefObject<HTMLDivElement>;
}

const ActivityDropdown: React.FC<ActivityDropdownProps> = ({
  onApply,
  onClear,
  contentRef,
}) => {
  const [selectedActivities, setSelectedActivities] = useState<string[]>([
    "All",
    "Public",
    "Non Public",
    "Blocked",
    "Deactivated",
  ]);

  const toggleActivity = (activity: string) => {
    setSelectedActivities((prevActivities) =>
      prevActivities.includes(activity)
        ? prevActivities.filter((act) => act !== activity)
        : [...prevActivities, activity],
    );
  };

  const handleApply = () => {
    onApply(selectedActivities);
  };

  const handleClearAll = () => {
    setSelectedActivities([]);
    onClear();
  };

  return (
    <div
      ref={contentRef}
      className="absolute top-full right-0 z-10 mt-2 p-4 bg-white rounded-lg shadow-lg w-[90%] sm:w-64"
    >
      <h3 className="mb-2 text-gray-700 text-sm sm:text-base">Activity</h3>
      {["All", "Public", "Non Public", "Blocked", "Deactivated"].map(
        (activity) => (
          <label key={activity} className="flex items-center space-x-2 mb-2">
            <input
              type="checkbox"
              checked={selectedActivities.includes(activity)}
              onChange={() => toggleActivity(activity)}
              className="text-blue"
            />
            <span className="text-gray text-sm sm:text-base">{activity}</span>
          </label>
        ),
      )}
      <div className="flex flex-col sm:flex-row justify-between mt-4 gap-2">
        <Button
          variant="outlined"
          onClick={handleClearAll}
          className="w-full sm:w-auto"
        >
          Clear all
        </Button>
        <Button
          variant="primary"
          onClick={handleApply}
          className="w-full sm:w-auto"
        >
          Apply
        </Button>
      </div>
    </div>
  );
};

export default ActivityDropdown;
