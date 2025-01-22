import { useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import styles from "./EditableField.module.css";

const ControlledInput = ({
  text,
  placeholder,
  onChange,
  name,
  options = [],
  type = "input",
}) => {
  const changeHandle = e => {
    onChange(e.target.value);
  };

  const reference = el => {
    el && el.focus();
  };

  switch (type) {
    case "select": {
      return (
        <select
          name={name}
          className={styles.input}
          placeholder={placeholder}
          onChange={changeHandle}
          ref={reference}>
          <option value="">Select a contact type</option>
          {options.map((opt, i) => (
            <option key={`${i}-${opt}`} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      );
    }
    case "input": {
      return (
        <input
          className={styles.input}
          type="text"
          value={text}
          placeholder={placeholder}
          onChange={changeHandle}
          ref={reference}
        />
      );
    }
    default: {
      throw new Error("Not compatible editable field");
    }
  }
};

const EditableField = ({
  id,
  field,
  text,
  placeholder,
  type = "input",
  options = [],
  operation,
  ...props
}) => {
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
      dispatch(operation({ id, field, value: curText }))
        .unwrap()
        .then(() => {
          toast.success(`Contact ${field} updated`);
        })
        .catch(e => {
          toast.error(e);
        });
    }
    setEditing(false);
  };
  return (
    <div {...props}>
      {isEditing ? (
        <div onBlur={finishEdit} onKeyDown={e => handleKeyDown(e)}>
          <ControlledInput
            text={curText}
            name={field}
            options={options}
            type={type}
            placeholder={placeholder}
            onChange={newText => setCurText(newText)}
          />
        </div>
      ) : (
        <div onClick={() => setEditing(true)} className={styles.spanWrapper}>
          <span className={styles.span}>
            {curText || placeholder || "Editable content"}
          </span>
        </div>
      )}
    </div>
  );
};

export default EditableField;
