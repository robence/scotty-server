export function update<ModelType, FieldListType>(
  model: ModelType,
  fieldList: FieldListType,
): void {
  /* eslint-disable */
  for (const [key, value] of Object.entries(fieldList)) {
    model[key] = value;
  }
}

export function format(rawActual, rawExpected) {
  // changes
  const createdAt = new Date(rawExpected.createdAt);
  const updatedAt = new Date(rawExpected.updatedAt);
  const _id = rawActual._id.toString();

  // output
  const expected = { ...rawExpected, createdAt, updatedAt };
  const actual = { ...rawActual.toObject(), _id };

  return { actual, expected };
}
