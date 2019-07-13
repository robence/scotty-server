/* eslint-disable */
export default function Catch(target, key, descriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = async function(...args) {
    try {
      return await originalMethod.apply(this, args);
    } catch (err) {
      return {
        status: err.statusCode || 500,
        payload: { error: err.message },
      };
    }
  };

  return descriptor;
}
