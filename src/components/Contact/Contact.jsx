const Contact = ({ name, phone, email }) => {
  return (
    <div>
      <h2>{name}</h2>
      <p>{phone}</p>
      <p>{email}</p>
    </div>
  );
};

export default Contact;
