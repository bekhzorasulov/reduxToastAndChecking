function FormTextare({ label, name }) {
  return (
    <label className="form-control">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <textarea
        className="textarea textarea-primary"
        placeholder="Type here"
        name={name}
      ></textarea>
    </label>
  );
}

export default FormTextare;
