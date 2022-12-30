export function classFactory(className: string) {
  return { [className]: class {} }[className];
}
