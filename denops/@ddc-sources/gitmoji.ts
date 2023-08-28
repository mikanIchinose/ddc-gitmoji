import {
  BaseSource,
  Candidate,
  Item
} from "https://deno.land/x/ddc_vim@v3.3.0/types.ts";
import {
  assertEquals,
} from "https://deno.land/x/ddc_vim@v3.3.0/deps.ts#^";
import {
  GatherCandidatesArguments,
} from "https://deno.land/x/ddc_vim@v3.3.0/base/source.ts#^";
import gitmojiJson from "./data.ts"

type Gitmoji = {
  emoji: string;
  entity: string;
  code: string;
  description: string;
  name: string;
  semver: string | null;
};

export type CompleteMetadata = {
  code: string; // i.e. :fire:
  gitmoji: string; // emoji
  description: string; // An explanation of which emoji have what git meaning.
};

type Params = {
  altCodes: Record<string, string>;
};

function getGitmoji(params: Params): CompleteMetadata[] {
  return gitmojiJson.gitmojis
    .map((data: Gitmoji) => {
      const altCodes = params.altCodes;
      const code = data.code in altCodes ? altCodes[data.code] : data.code;
      return {
        code: code,
        gitmoji: data.emoji,
        description: data.description,
      };
    });
}

export class Source extends BaseSource<Params> {
  gather(args: { sourceParams: Params }): Promise<Item[]> {
    const candidates = getGitmoji(args.sourceParams);
    const ddcCandidates = candidates.flatMap((data) => ({
      word: data.gitmoji,
      abbr: data.code,
      kind: data.description,
      user_data: {
        code: data.code,
        gitmoji: data.gitmoji,
        description: data.description,
      },
    }));

    return Promise.resolve(ddcCandidates);
  }

  params(): Params {
    return {
      altCodes: {},
    };
  }
}

Deno.test("gitmoji", () => {
  assertEquals(gitmojiJson.gitmojis[0].emoji, "🎨");
});
