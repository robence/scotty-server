export function update(
  model: Document & any,
  fields: Record<string, any>,
): void {
  /* eslint-disable */
  for (const [key, value] of Object.entries(fields)) {
    model[key] = value;
  }
}

export function format(rawActual, rawExpected) {
  // changes
  const createdAt = new Date(rawExpected.createdAt);
  const updatedAt = new Date(rawExpected.createdAt);
  const _id = rawActual._id.toString();

  // output
  const expected = { ...rawExpected, createdAt, updatedAt };
  const actual = { ...rawActual.toObject(), _id };

  return { actual, expected };
}
