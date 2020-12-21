import { pluginParams } from './PluginParamSetup/_PluginParamSetup';
import { CoreWrapParams } from './Structures/CoreWrapParams';
import { WordWrapper } from './Structures/WordWrapper';
import { NullWordWrapper } from './Structures/NullWordWrapper';
import "./Overrides/_Apply";
import { NullOverflowFinder } from './Structures/NullOverflowFinder';
import { SpacialOverflowFinder } from './Structures/SpacialOverflowFinder';
import * as Shared from './Shared/_All';

let ArrayEx = CGT.Core.Extensions.ArrayEx;

export let WWCore = 
{
    Params: pluginParams,
    CoreWrapParams: CoreWrapParams,
    WordWrapper: WordWrapper,
    SpacialOverflowFinder: SpacialOverflowFinder,

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
    let overflowFinder = new NullOverflowFinder();
    let defaultWrapper = new NullWordWrapper(overflowFinder);
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