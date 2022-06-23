export function logging(type: string, actionType: string, message: string) {
  console[type](actionType);
  console[type](message);
}
