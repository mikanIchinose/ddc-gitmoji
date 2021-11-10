import { CompletionMetadata } from "../@ddc-sources/emoji.ts";
import { 
  BaseFilter,
  Candidate 
} from "https://deno.land/x/ddc_vim@v0.17.0/types.ts";

export class Filter extends BaseFilter<{}> {
  async filter(
    args: {
      completeStr: string;
      candidates: Candidate[];
    }
  ): Promise<Candidate[]> {
    return args.candidates.filter(candidate => {
      const meta = candidate.user_data as unknown as CompletionMetadata;
      return meta && meta.code.startsWith(`${args.completeStr}`);
    });
  }

  params(): {} {
    return {};
  }
}
