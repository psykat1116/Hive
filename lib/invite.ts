export const generateCode = () => {
  const code = Array.from(
    {
      length: 6,
    },
    () =>
      "1234567890abcefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"[
        Math.floor(Math.random() * 62)
      ]
  ).join("");

  return code;
};
