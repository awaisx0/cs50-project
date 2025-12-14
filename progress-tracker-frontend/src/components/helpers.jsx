function get_options(array) {
  return array.map((elem, i) => (
    <option key={i} value={elem.toLowerCase()}>
      {elem.toUpperCase()}
    </option>
  ));
}

export { get_options };
