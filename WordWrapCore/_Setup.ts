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
import { UnderflowCascader } from './Structures/WordWrappers/UnderflowCascader';
import { WrapTarget } from './Structures/WordWrappers/WrapTarget';
import { IWrapperSpacing } from './Structures/WordWrappers/WordWrapArgs/IWrapperSpacing';

export let WWCore = 
{
    Params: pluginParams,
    WrapRules: WrapRules,
    Overflow: Overflow, 
    CoreWrapParams: CoreWrapParams,
    WordWrapper: WordWrapper,
    LineWrapper: LineWrapper,

    NametagFetcher: NametagFetcher,
    UnderflowCascader: UnderflowCascader,

    UpdateActiveWrappers(): void
    {
        let params: CoreWrapParams = this.Params;
        
        this.SetActiveWrapper(WrapTarget.MessageBox, params.MessageWrapper);
        this.SetActiveWrapper(WrapTarget.Desc, params.DescWrapper);
        this.SetActiveWrapper(WrapTarget.MessageBacklog, params.MessageBacklogWrapper);
        this.SetActiveWrapper(WrapTarget.Bubble, params.BubbleWrapper);
    },

    SetActiveWrapper(target: WrapTarget, wrapMode: string): boolean
    {
        // It's too bad that types aren't always auto-detected for regular 
        // objects, even in TS...
        let wrappers = this.RegisteredWrappers as Map<string, WordWrapper>;
        let anythingRegisteredHasMode = wrappers.has(wrapMode);

        if (!anythingRegisteredHasMode)
            return false;
        
        let toSetAsActive = wrappers.get(wrapMode);
        let activeOnes = this.activeWrappers as Map<WrapTarget, WordWrapper>;
        activeOnes.set(target, toSetAsActive);

        return true;
    },

    get RegisteredWrappers(): Map<string, WordWrapper> { return this.registeredWrappers; },
    registeredWrappers: new Map<string, WordWrapper>(),

    get ActiveWrappers(): Map<WrapTarget, WordWrapper> { return this.activeWrappers; },
    activeWrappers: new Map<WrapTarget, WordWrapper>(),

    UpdateWrapSpacing()
    {
        let spacings = this.wrapperSpacing as Map<WrapTarget, IWrapperSpacing>;
        let params = this.Params as CGT.WWCore.CoreWrapParams;

        spacings.set(WrapTarget.MessageBox, params.MessageSpacing);
        spacings.set(WrapTarget.Desc, params.DescSpacing);
        spacings.set(WrapTarget.MessageBacklog, params.BacklogSpacing);
        spacings.set(WrapTarget.Bubble, params.BubbleSpacing);
    },

    get WrapperSpacing(): Map<WrapTarget, IWrapperSpacing> { return this.wrapperSpacing; },
    wrapperSpacing: new Map<WrapTarget, IWrapperSpacing>(),

    RegisterWrapper(wrapper: WordWrapper): void
    {
        let registeredWrappers = this.registeredWrappers as Map<string, WordWrapper>;
        registeredWrappers.set(wrapper.WrapCode, wrapper);
    },

    Shared: Shared,

    Yanfly:
    {
        activeNametagText: "",
        messageBacklogWindow: null,
    },

    version: 30101,

    WrapTarget: WrapTarget,
    
    currentMessageIsBubble: false,

    textForGalvMessageStyles: "",
};

SetDefaultWrappers();

function SetDefaultWrappers()
{
    let lineWrapper = new NullLineWrapper();
    let defaultWrapper = new NullWordWrapper(lineWrapper);
    defaultWrapper.WrapCode = "null";

    WWCore.RegisterWrapper(defaultWrapper);
    WWCore.SetActiveWrapper(WrapTarget.MessageBox, defaultWrapper.WrapCode);
    WWCore.SetActiveWrapper(WrapTarget.Desc, defaultWrapper.WrapCode);
    WWCore.SetActiveWrapper(WrapTarget.MessageBacklog, defaultWrapper.WrapCode);
    WWCore.SetActiveWrapper(WrapTarget.Bubble, defaultWrapper.WrapCode);
}

WatchForWrapModeChanges();

function WatchForWrapModeChanges()
{
    let WrapModeChanged = WWCore.Params.WrapModeChanged;
    WrapModeChanged.AddListener(OnWrapModeChanged, this);
}

function OnWrapModeChanged(oldMode: string, newMode: string)
{
    WWCore.UpdateActiveWrappers();
}

WWCore.UpdateWrapSpacing();

ApplyOverrides(WWCore.Params);