import { pluginParams } from './PluginParamSetup/_PluginParamSetup';
import "./PluginCommands/_PluginCommands_Setup";
import { CoreWrapParams } from './Structures/CoreWrapParams';
import { WordWrapper } from './Structures/WordWrappers/WordWrapper';
import { NullWordWrapper } from './Structures/WordWrappers/NullWordWrapper';
import { ApplyOverrides } from './Overrides/_Apply';
import * as Shared from './Shared/_All';
import * as WrapRules from "./Structures/WrapRules/_WrapRulesSetup";
import { NullLineWrapper } from './Structures/WordWrappers/LineWrappers/NullLineWrapper';
import * as Overflow from "./Structures/Overflow/_SetupOverflow";
import { NametagFetcher } from './Structures/WordWrappers/NametagFetcher';
import { LineWrapper } from './Structures/WordWrappers/LineWrappers/LineWrapper';

let ArrayEx = CGT.Core.Extensions.ArrayEx;

export let WWCore = 
{
    Params: pluginParams,
    WrapRules: WrapRules,
    Overflow: Overflow, 
    CoreWrapParams: CoreWrapParams,
    WordWrapper: WordWrapper,
    LineWrapper: LineWrapper,

    NametagFetcher: NametagFetcher,

    UpdateActiveWrapper(): void
    {
        let params: CoreWrapParams = this.Params;
        this.SetActiveWrapper(params.WrapMode);
    },

    SetActiveWrapper(wrapMode: string): boolean
    {
        let wrappers = this.RegisteredWrappers as Map<string, WordWrapper>;

        let anythingRegisteredHasMode = wrappers.has(wrapMode);

        if (!anythingRegisteredHasMode)
            return false;
        
        this.activeWrapper = wrappers.get(wrapMode);
        return true;
    },

    get RegisteredWrappers(): Map<string, WordWrapper> { return this.registeredWrappers; },
    registeredWrappers: new Map<string, WordWrapper>(),

    get ActiveWrapper(): WordWrapper { return this.activeWrapper; },
    activeWrapper: null,

    RegisterWrapper(wrapper: WordWrapper): void
    {
        let registeredWrappers = this.registeredWrappers as Map<string, WordWrapper>;
        let wrapperValues: WordWrapper[] = ArrayEx.From(registeredWrappers.values());

        let alreadyRegistered = ArrayEx.Includes(wrapperValues, wrapper);
        if (alreadyRegistered)
            return; // Avoid duplicates

        registeredWrappers.set(wrapper.WrapCode, wrapper);
    },

    Shared: Shared

};

SetDefaultWrapper();

function SetDefaultWrapper()
{
    let lineWrapper = new NullLineWrapper();
    let defaultWrapper = new NullWordWrapper(lineWrapper);
    defaultWrapper.WrapCode = "null";

    WWCore.RegisterWrapper(defaultWrapper);
    WWCore.SetActiveWrapper(defaultWrapper.WrapCode);
}

WatchForWrapModeChanges();

function WatchForWrapModeChanges()
{
    let WrapModeChanged = WWCore.Params.WrapModeChanged;
    WrapModeChanged.AddListener(OnWrapModeChanged, this);
}

function OnWrapModeChanged(oldMode: string, newMode: string)
{
    WWCore.UpdateActiveWrapper();
}

ApplyOverrides(WWCore.Params);