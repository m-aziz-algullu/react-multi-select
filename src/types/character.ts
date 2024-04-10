type Location = {
  name: string;
  url: string;
};

export type Character = {
  id: number;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  type: string;
  gender: "Female" | "Male" | "Genderless" | "unknown";
  origin: Location;
  location: Location;
  image: string;
  episode: Array<string>;
  url: string;
  created: Date;
};

export type CharacterPicked = {
  id: string;
} & Pick<Character, "name" | "episode" | "image">;
