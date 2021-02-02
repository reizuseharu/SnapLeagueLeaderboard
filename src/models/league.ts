export enum League {
  ALPHA = "alpha",
  PRIMERA = "1",
  SEGUNDO = "2",
  TERCERA = "3",
  CUARTO = "4"
}

export function getEnumKeyByEnumValue<T extends {[index: string]: string}>(myEnum: T, enumValue: string): keyof T|null {
  let keys = Object.keys(myEnum).filter(x => myEnum[x] === enumValue)
  return keys.length > 0 ? keys[0] : null
}
