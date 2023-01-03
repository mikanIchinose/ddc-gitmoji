import { CompletionMetadata } from "../@ddc-sources/gitmoji.ts";
import { BaseFilter, Item } from "https://deno.land/x/ddc_vim@v3.3.0/types.ts";

export class Filter extends BaseFilter<{}> {
  filter(
    args: { items: Item[]; completeStr: string },
  ): Promise<Item[]> {
    return Promise.resolve(args.items.filter((item) => {
      const meta = item.user_data as unknown as CompletionMetadata;
      return meta && meta.code.startsWith(`${args.completeStr}`);
    }));
  }

  params(): {} {
    return {};
  }
}
