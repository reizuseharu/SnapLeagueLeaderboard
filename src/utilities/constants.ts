import {League} from "@models/league"

export const leagueToFileTag: Map<any, string> = new Map([
  [League.ALPHA, "b28cec4a99980508c93ada8ea20d119a"],
  [League.PRIMERA, "c5c3876c57cd49dab26c6fd59ae23cbe"],
  [League.SEGUNDO, "51f24ca30748124f85aef107e71a356c"],
  [League.TERCERA, "d11a85badd2f28cf86350f2f2adc27d3"],
  [League.CUARTO, "a2567070eb565a1ea4e34b160a740d51"]
])

export type OptionalString = string | null | undefined
