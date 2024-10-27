import { useState } from "react";
import { useDispatch } from "react-redux";

import styles from "./EditableField.module.css";

const ControlledInput = ({ text, placeholder, onChange }) => {
  return (
    <input
      className={styles.input}
      type="text"
      value={text}
      placeholder={placeholder}
      onChange={e => onChange(e.target.value)}
      ref={input => input && input.focus()}
    />
  );
};

const EditableField = ({ id, field, text, placeholder, operation, ...props }) => {
  const [isEditing, setEditing] = useState(false);
  const [curText, setCurText] = useState(text);
  const dispatch = useDispatch();

  const handleKeyDown = e => {
    const { key } = e;
    const keys = ["Escape", "Tab", "Enter"];
    if (keys.indexOf(key) > -1) {
      finishEdit();
    }
  };

  const finishEdit = () => {
    if (curText !== text) {
      dispatch(operation({ id, field, value: curText }));
    }
    setEditing(false);
  };
  return (
    <div {...props}>
      {isEditing ? (
        <div onBlur={finishEdit} onKeyDown={e => handleKeyDown(e)}>
          <ControlledInput
            text={curText}
            placeholder={placeholder}
            onChange={newText => setCurText(newText)}
          />
        </div>
      ) : (
        <div onClick={() => setEditing(true)} className={styles.spanWrapper}>
          <span className={styles.span}>{curText || placeholder || "Editable content"}</span>
        </div>
      )}
    </div>
  );
};

export default EditableField;
