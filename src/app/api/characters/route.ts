import { Character, CharacterPicked } from "@/types/character";

export async function POST(req: Request) {
  const { filter } = await req.json();

  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/?name=${filter}`,
      {
        method: "GET",
        headers: { "Content-Type": "application-json" },
      }
    );

    let characters: CharacterPicked[] = [];

    if (response.status == 200) {
      const { results } = await response.json();

      characters.push(
        ...results.map((c: Character) => ({
          id: c.id.toString(),
          name: c.name,
          episode: c.episode,
          image: c.image,
        }))
      );
    }

    return Response.json({ characters }, { status: response.status });
  } catch (error) {
    throw error;
  }
}
