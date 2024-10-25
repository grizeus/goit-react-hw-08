import { useState } from "react";

const Editable = ({ text, placeholder, children, ...props }) => {
  const [isEditing, setEditing] = useState(false);

  const handleKeyDown = e => {
    const { key } = e;
    const keys = ["Escape", "Tab", "Enter"];
    if (keys.indexOf(key) > -1) {
      setEditing(false);
    }
  };

  return (
    <div {...props}>
      {isEditing ? (
        <div onBlur={() => setEditing(false)} onKeyDown={e => handleKeyDown(e)}>
          {children}
        </div>
      ) : (
        <div onClick={() => setEditing(true)}>
          <span>
            {text || placeholder || "Editable content"}
          </span>
        </div>
      )}
    </div>
  );
};

export default Editable;
