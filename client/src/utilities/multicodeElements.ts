export const deconstructMulticode = (
  multicode: string
): { sessionCode: string; userId: string } => {
  const splitIdx = 5;
  const [sessionCode, userId] = [
    multicode.slice(0, splitIdx),
    multicode.slice(splitIdx),
  ];
  return { sessionCode, userId };
};
