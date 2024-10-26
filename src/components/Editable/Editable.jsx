import { useDispatch, useSelector } from "react-redux";
import { setEditing } from "../../redux/edit/slice";
import { selectIsEditing } from "../../redux/edit/selectors";

const Editable = ({ text, placeholder, children, ...props }) => {
  const isEditing = useSelector(selectIsEditing);
  const dispatch = useDispatch();

  const handleKeyDown = e => {
    const { key } = e;
    const keys = ["Escape", "Tab", "Enter"];
    if (keys.indexOf(key) > -1) {
      dispatch(setEditing(false));
    }
  };

  return (
    <div {...props}>
      {isEditing ? (
        <div onBlur={() => dispatch(setEditing(false))} onKeyDown={e => handleKeyDown(e)}> 
          {children}
        </div>
      ) : (
        <div onClick={() => dispatch(setEditing(true))}>
          <span>
            {text || placeholder || "Editable content"}
          </span>
        </div>
      )}
    </div>
  );
};

export default Editable;
