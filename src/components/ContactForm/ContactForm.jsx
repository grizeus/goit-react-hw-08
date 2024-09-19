const ContactForm = ({ onAdd }) => {
  const handleSubmit = e => {
    e.preventDefault();
    onAdd({
      id: Date.now(),
      name: e.target.elements.name.value,
      number: e.target.elements.number.value,
    });
    e.target.reset();
  };
  return (
    <form style={{ display: "flex", flexDirection: "column", width: "220px", gap: "10px" }} onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" />
      <input type="text" name="number" placeholder="Phone number" />
      <button type="submit">
        Add
      </button>
    </form>
  );
};

export default ContactForm;
