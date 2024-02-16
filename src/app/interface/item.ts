export interface Item {
  count: number,
  next?: string,
  previous?: string,
  results: Result[],
}

interface Result {
  name: string,
  url: string,
}

export interface ItemDetail {
  id: number,
  name: string,
  types: Types[],
  sprites: Sprites,
  imageUrl: string,
}

interface Types {
  slot: number,
  type: Type,
}

interface Type {
  name: string,
  url: string,
}

interface Sprites {
  other: Other,
}

interface Other {
  'official-artwork': OfficialArtwork,
}

interface OfficialArtwork {
  'front_default': string,
}