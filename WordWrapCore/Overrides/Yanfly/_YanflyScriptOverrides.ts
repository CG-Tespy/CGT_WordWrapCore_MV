import { ApplyYanflyMessageCoreOverrides } from './YanflyMessageCore';
import { ApplyYanflyMsgBacklogOverrides } from './YanflyMessageBacklog';
export function ApplyYanflyScriptOverrides()
{
    ApplyYanflyMessageCoreOverrides();
    ApplyYanflyMsgBacklogOverrides();
}