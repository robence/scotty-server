export default function updateModel(
  model: Document & any,
  fields: Record<string, any>,
): void {
  /* eslint-disable */
  for (const [key, value] of Object.entries(fields)) {
    model[key] = value;
  }
}

export function updateModel2(
  model: any,
  fields: Record<string, any>,
): any {
  return Object.entries(fields).reduce((memo, [key, value]): any => {
    return { ...memo, [key]: value };
  }, model);
}
