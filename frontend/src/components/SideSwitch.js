import React from 'react';

function SideSwitch({ startFirst, setStartFirst }) {
  const handleSwitchChange = (event) => {
    setStartFirst(event.target.checked);
  };

  return (
    <div>
      <label>
        User starts first:
        <input
          type="checkbox"
          checked={startFirst}
          onChange={handleSwitchChange}
        />
      </label>
    </div>
  );
}

export default SideSwitch;