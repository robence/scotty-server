/* eslint-disable */
export default function Catch(target, key, descriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = async function(...args) {
    try {
      return await originalMethod.apply(this, args);
    } catch (error) {
      console.log('error');
      console.log(error.toJSON());
      console.log(error);
      return { status: 401, payload: error };
    }
  };

  return descriptor;
}
