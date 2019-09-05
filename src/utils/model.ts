export default function format(
  rawActual,
  rawExpected,
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
): { actual: any; expected: any } {
  // changes
  const createdAt = new Date(rawExpected.createdAt);
  const updatedAt = new Date(rawExpected.updatedAt);
  const _id = rawActual._id.toString();

  // output
  const expected = { ...rawExpected, createdAt, updatedAt };
  const actual = { ...rawActual.toObject(), _id };

  return { actual, expected };
}
