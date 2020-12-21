declare namespace CGT
{
    
    namespace Core
    {
        let version: number

        namespace Audio
        {
            enum SoundType 
            {
                bgm = 'bgm',
                bgs = 'bgs',
                me = 'me',
                se = 'se',
                null = 'null',
                
            }

            type SoundPlayer = (audioParams: MV.AudioParameters, pos?: number) => void;

            class Sound
            {
                name: string;

                audioParams: MV.AudioParameters;

                // Getters
                get Name(): string;
                get Type(): SoundType;
                get Volume(): number;
                get Pitch(): number;
                get Pan(): number;

                // Setters
                set Name(value: string)
                set Type(value: SoundType)
                set Volume(value: number)
                set Pitch(value: number)
                set Pan(value: number)

                static soundPlayers: Map<SoundType, SoundPlayer>;

                // Methods

                constructor(fileName: string, type: SoundType, 
                    volume?: number, pitch?:number, pan?: number)

                Play(): void

                protected RemoveExtensionFromName(): void

                protected HasExtensionInName(): boolean

                protected FindExtensionIndex(): number

                Copy(): Sound
                
                toString(): string

                static get MinVolume(): number;
                static get MaxVolume(): number;
                static get DefaultVolume(): number;

                static get MinPitch(): number;
                static get MaxPitch(): number;
                static get DefaultPitch(): number;

                static get MinPan(): number;
                static get MaxPan(): number;
                static get DefaultPan(): number;

                static get Null(): Readonly<Sound>;

            }
        }

        namespace Collections
        {
            class ArrayIterator<TValue> extends CGTIterator<Array<TValue>, TValue>
            {
                get ValueIndex(): number;

                constructor(arr: Array<TValue>)

                Next(): TValue
                HasNext(): boolean

                private UpdateValue(): void

                Previous(): TValue
                HasPrevious(): boolean

            }

            abstract class CGTIterator<TIterable, TValue>
            {
                get Value(): TValue

                constructor(iteratee: TIterable)

                abstract Next(): TValue 
                abstract HasNext(): boolean

                abstract Previous(): TValue
                abstract HasPrevious(): boolean

            }

            class TightArray<TValue> extends Array<TValue>
            {
                get capacity(): number;
                set capacity(value: number)

                constructor(capacity: number)

                push(...args: TValue[]): number
                hasRoom(): boolean

            }

            interface Destructible
            {
                destroy(): void;
            }

            class DestructibleCache
            {
                get Items(): TightArray<Destructible> 

                get Capacity(): number;
                set Capacity(value: number)

                get AutoWipe(): boolean;
                set AutoWipe(value: boolean)

                constructor(capacity?: number)

                Push(destructible: Destructible): void
                HasRoom(): boolean

                Remove(destructible: Destructible): boolean
                Clear(): void
                ClearAndWipe(): void
            }

            /**
             * Only here to support legacy plugins. Use Map instead when you can.
             */
            class Dictionary<TKey, TValue>
            {
                // The keys always have the same indexes as their values.
                get Keys(): TKey[];
                get Values(): TValue[];
                get Length(): number;

                // Methods

                /** 
                 * Adds the passed key-value pair to this dictionary. If the key was 
                 * already added, the value is overwritten. 
                 * */
                Add(key: TKey, value: TValue): void

                protected MapNewValueToExistingKey(value: TValue, key: TKey): void
                protected RegisterNewKeyValuePair(key: TKey, value:TValue): void

                /** 
                 * Removes the key (and its mapped value) from this dictionary.
                 * Returns true if successful, false otherwise.
                 *  */
                Remove(key: TKey): boolean

                /** Returns the value mapped to the passed key, if there is one. Returns null otherwise. */
                Get(key: TKey): TValue

                HasKey(key: TKey): boolean
                HasValue(value: TValue): boolean

                /** Removes all key-value pairs from this dictionary. */
                Clear(): void

            }

        }

        namespace Extensions
        {
            class ArrayEx
            {
                static Remove(arr: Array<any>, toRemove: any): void
                /** Returns a shallow copy of the passed array. */
                static Copy(arr: Array<any>): Array<any>
                /** 
                 * An implementation of the Array.prototype.filter function, for versions
                 * of MV that don't support the official one.
                 */
                static Filter(arr: Array<any>, test: Function, context: any): Array<any>
                static Clear(arr: Array<any>): void
                /** 
                 * An implementation of the Array.from function, for versions
                 * of MV that don't support the official one.
                 */
                static From<T>(iterable: Iterable<T>): T[];

                /** 
                 * An implementation of the Array.prototype.includes function, for versions
                 * of MV that don't support the official one.
                 */
                static Includes(arr: Array<any>, item: any): boolean

                /** 
                 * An implementation of the Array.prototype.find function, for versions
                 * of MV that don't support the official one.
                 */
                static Find<T>(arr: Array<T> | Readonly<Array<T>>, 
                    predicate: ArrayFindPredicate<T>, 
                    thisArg?: any): T

            }

            type ArrayFindPredicate<T> = (element: T, index?: number, arr?: T[] | Readonly<T>) => boolean;

            class BitmapEx
            {
                /**
                 * Add a callback function that will be called when the bitmap is loaded.
                 * Author: MinusGix
                 */
                AddLoadListener(bitmap: Bitmap, listener: Function): void
                RemoveLoadListener(bitmap: Bitmap, listener: Function): void
                HasLoadListener(bitmap: Bitmap, listener: Function): boolean

                /**
                 * Returns a resized version of the bitmap (if it is ready). Note that
                 * the aspect ratio may not be the same, based on the passed width and height.
                 */
                Resized(bitmap: Bitmap, width: number, height: number): Bitmap
            }

            class Game_ActionEx
            {
                /** Returns the action's item if it's a skill. Null otherwise. */
                static AsSkill(action: Game_Action): RPG.Skill
                /** Returns the action's item if it's a normal item. Null otherwise. */
                static AsItem(action: Game_Action): RPG.UsableItem

                /** Returns this action's subject if the subject is an enemy. Null otherwise. */
                static SubjectAsEnemy(action: Game_Action): Game_Enemy
                static SubjectAsType<T extends Function>(action: Game_Action, typeWanted: T): T
                /** Returns this action's subject if the subject is an actor. Null otherwise. */
                static SubjectAsActor(action: Game_Action): Game_Actor
            }

            class Game_ActorEx
            {
                static CanPaySkillCost(actor: Game_Actor, skill: RPG.Skill, 
                    howManyTimes?: number): boolean

                static IsAtFullHP(actor: Game_Actor): boolean
                static IsAtFullMP(actor: Game_Actor): boolean
                static IsAtFullTP(actor: Game_Actor): boolean
            }

            /** Makes it easier to work with Items. */
            class RPGItemEx
            {
                static UseItemOnActor(itemInInventory: RPG.Item, actor: Game_Actor): void

                /**
                 * Uses the item on the actor without consuming it.
                 */
                static FreeUseItemOnActor(itemInInventory: RPG.Item, actor: Game_Actor): void

                private static ApplyItemUseOnActor(itemUse: Game_Action): void

                static ForceUseItemOnActor(item: RPG.Item, actor: Game_Actor): void

                static HPHealingItemsIn(items: RPG.Item[]): RPG.Item[]

                /** Returns whether the item's damage type is HP Recovery. */
                static CanHealHP(item: RPG.Item): boolean

                /** Returns whether the item's damage type is MP Recovery. */
                static CanHealMP(item: RPG.Item): boolean

                static FlatHPAmountHealed(item: RPG.Item): number

                static PercentHPAmountHealed(item: RPG.Item): number

                /*
                Returns the passed array with the use-disallowed items filtered out.
                */
                static UsablesOnly(items: RPG.Item[]): RPG.Item[]

                /**
                 * Returns teh passed array with the non-overworld-usable items filtered out.
                 */
                static OverworldUsablesOnly(items: RPG.Item[]): RPG.Item[]
            }

            /**
             * Makes it easier to work with Skills.
             */
            class RPGSkillEx
            {
                /** Returns whether the skill's damage type is HP Recovery. */
                static CanHealHP(item: RPG.Skill): boolean

                /** Returns whether the skill's damage type is MP Recovery. */
                static CanHealMP(item: RPG.Skill): boolean

                static OnlyHealsHP(skill: RPG.Skill): boolean
                /**
                 * Returns false if the skill is not single-targeting, or if
                 * the user can't pay the cost. True otherwise.
                 */
                static UseSkillOnActor(skill: RPG.Skill, user: Game_Actor, 
                    target: Game_Actor): boolean

                /**
                 * Has the user cast the skill on the target without paying the cost.
                 * Returns false if the skill isn't single-targeting, or if the user can't
                 * legit use the skill. True otherwise.
                 */
                static FreeUseSkillOnActor(skill: RPG.Skill, user: Game_Actor, target: Game_Actor): boolean

                /**
                 * Returns false if the user can't pay the cost for applying
                 * the skill to the targets. True otherwise.
                 */
                static UseSkillOnActors(skill: RPG.Skill, user: Game_Actor, 
                    targets: Game_Actor[]): boolean

                /**
                 * Has the user cast the skill on each target, without paying the cost.
                 * Returns false if the user can't use the skill legitimately.
                 * True otherwise.
                 */
                static FreeUseSkillOnActors(skill: RPG.Skill, user: Game_Actor, targets: Game_Actor[]): boolean
                
                /**
                 * Returns true if the user can pay the skill cost the specified
                 * number of times (1 by default). False otherwise.
                 */
                static CanPaySkillCost(skill: RPG.Skill, user: Game_Actor, 
                    howManyTimes?: number): boolean

                static IsSingleTargeting(skill: RPG.Skill): boolean
                static IsAllTargeting(skill: RPG.Skill): boolean

                static UseSkillOnActors(skill: RPG.Skill, user: Game_Actor, 
                    targets: Game_Actor[]): void
            }

            /** Contains static functions for working with numbers. */
            class NumberEx
            {
                static Clamp(num: number, min: number, max: number): number
                static ClampInt(num: number, min: number, max: number): number

                static Mod(num1: number, num2: number): number

                static PadZero(num: number, length: number): string

                static Rand(from: number, to: number): number
                static RandInt(from: number, to: number): number

                static Lerp(firstNum: number, secondNum: number, progress: number): number
            }

            class PIXISpriteEx
            {
                static Resized(sprite: PIXI.Sprite, width: number, height: number): PIXI.Sprite
            
                static Copy(sprite: PIXI.Sprite): PIXI.Sprite
            
                static Resize(sprite: PIXI.Sprite, width: number, height: number): void
            
                static ResizeWhileKeepingAspectFor(sprite: PIXI.Sprite, targetWidth: 
                    number, targetHeight: number): void
            }

        }

        namespace Graphics
        {
            interface ParsedColorParam
            {
                Red: string;
                Green: string;
                Blue: string;
                Alpha: string;
            }

            class Color
            {
                // Defaults
                static get Red(): Color
                static get DarkRed(): Color
                static get Pink(): Color

                static get Green(): Color
                static get DarkGreen(): Color
                static get LightGreen(): Color

                static get Cyan(): Color

                static get Blue(): Color
                static get DarkBlue(): Color
                static get LightBlue(): Color
                
                static get Yellow(): Color
                static get DarkYellow(): Color
                static get LightYellow(): Color

                static get Purple(): Color
                static get DarkPurple(): Color
                static get LightPurple(): Color

                static get White(): Color
                static get Black(): Color
                static get Gray(): Color

                static get Brown(): Color
                static get DarkBrown(): Color
                static get LightBrown(): Color
                
                static get Orange(): Color
                static get DarkOrange(): Color
                static get LightOrange(): Color

                static Cache:
                {
                    Red: Readonly<Color>,
                    DarkRed: Readonly<Color>,
                    Pink: Readonly<Color>,

                    Green: Readonly<Color>,
                    DarkGreen: Readonly<Color>,
                    LightGreen: Readonly<Color>,

                    Cyan: Readonly<Color>,

                    Blue: Readonly<Color>,
                    DarkBlue: Readonly<Color>,
                    LightBlue: Readonly<Color>,
                    
                    Yellow: Readonly<Color>,
                    DarkYellow: Readonly<Color>,
                    LightYellow: Readonly<Color>,

                    Purple: Readonly<Color>,
                    DarkPurple: Readonly<Color>,
                    LightPurple: Readonly<Color>,

                    White: Readonly<Color>,
                    Black: Readonly<Color>,
                    Gray: Readonly<Color>,

                    Brown: Readonly<Color>,
                    DarkBrown: Readonly<Color>,
                    LightBrown: Readonly<Color>,
                    
                    Orange: Readonly<Color>,
                    DarkOrange: Readonly<Color>,
                    LightOrange: Readonly<Color>,
                };

                static factory: ColorFactory;
                static Null: Color
                
                // Getters
                get R(): number
                get G(): number
                get B(): number
                get A(): number

                // Setters
                set R(value: number)
                set G(value: number)
                set B(value: number) 
                set A(value: number) 

                constructor(red?: number, green?: number, blue?: number, alpha?: number)

                Copy(): Color

                SetFrom(otherColor: Color): void
                Set(r: number, g: number, b: number, a?: number): void

                ToCSSRGB(): string
                // Algorithm not mine. Forgot where I found it. If you're the one originally
                // behind this algorithm, contact me; I'll be sure to credit you.
                ToHexString(): string
                ToPluginParamRaw(): string
                ToPluginParam(): ParsedColorParam

                Equals(other: Color): boolean

                static FromHex(hex: string): Color
                static FromPluginParamRaw(param: string): Color

                static Lerp(firstColor: Color, secondColor: Color, progress: number): Color

            }

            class ColorFactory extends PluginParams.PluginParamObjectFactory<Color, ParsedColorParam>
            {

                get Color(): Color
                // ^Leave this here for when this class gets put in its own source file again

                protected ApplyNumbers(): void

                CreateFromHex(hex: string): Color

            }
        }

        namespace Input
        {
            enum InputCode
            {
                tab = 'tab',

                ok = 'ok',      
                enter = 'ok', 
                space = 'ok',
                Z = 'ok',

                shift = 'shift',  

                control = 'control',
                alt = 'control',

                escape = 'escape', 
                numpad0 = 'escape',
                insert = 'escape',
                X = 'escape',

                pageUp = 'pageup', 
                Q = 'pageup',

                pageDown = 'pagedown', 
                W = 'pagedown',

                leftArrow = 'left', 
                numpad4 = 'left',

                upArrow = 'up',    
                numpad8 = 'up',

                rightArrow = 'right', 
                numpad6 = 'right',

                downArrow = 'down',
                numpad2 = 'down',

                f9 = 'debug',

                null = 'null',
            }

            class InputObserver
            {
                constructor()

                // Override any one of these
                OnInputTriggered(input: string): void
                OnInputPressed(input: string): void
                OnInputLongPressed(input: string): void
                OnInputRepeated(input: string): void

                Destroy(): void

                static Null: Readonly<InputObserver>
            }

            type InputCheckFunc = (keyName: string) => void;

            /**
             * Signals events in every scene. InputObservers are set by default to respond to the
             * signals this sends out.
             */
            let InputSignaler:
            {
                InputPressed: Readonly<Utils.Event>,
                InputRepeated: Readonly<Utils.Event>,
                InputTriggered: Readonly<Utils.Event>,
                InputLongPressed: Readonly<Utils.Event>,

            };

        }

        namespace IO
        {
            class File
            {
                /**
                 * Synchronously reads a file on disk and returns its text.
                 * @param path Relative to where the game's index.html file is.
                 */
                static ReadSync(path: string): string

                /**
                 * Asynchronously reads a file on disk and executes a callback
                 * when its done.
                 * @param path Relative to where the game's index.html file is.
                 */
                static Read(path: string, onFileReadFinished: (output: string) => void): void

                /**
                 * Synchronously writes a "file" to browser storage with the passed key.
                 * If the key is already tied to a "file", said "file" gets overwritten.
                 */
                static WriteBrowSync(key: string, contents: string): void

                /**
                 * Synchronously reads a "file" from browser storage with the passed key.
                 * If there is no "file" tied to the key, you get an empty string.
                 */
                static ReadBrowSync(key: string): string

            }
        }

        namespace PluginCommands
        {
            type RawCommandFunc = (args: string[]) => any;

            let commandMap: Map<string, RawCommandFunc>;
            function Register(commandName: string, func: RawCommandFunc): void;
        }

        namespace PluginParams
        {
            class PluginParamObjectFactory<TReal, TParsedRaw>
            {
                static get ClassOfObjectCreated(): Function
                
                get ClassOfObjectCreated(): any

                protected paramToCreateFrom: string;
                protected parsedParam: TParsedRaw;
                protected baseObject: TReal;

                CreateObjectFrom(param: string): TReal

                protected ParseParamOnce(): void
                protected CreateBaseObject(): TReal

                protected ApplyParamValuesToBaseObject(): void
                protected ApplyPrimitiveValues(): void
                protected ApplyBooleans(): void
                protected ApplyNumbers(): void
                protected ApplyStrings(): void
                protected ApplyCustomValues(): void 

                CreateObjectsFrom(stringifiedParamArr: string): TReal[]

                protected ConvertParamStringsToObjects(paramStrings): TReal[]

            }

        }

        namespace RPGEx
        {
            enum EffectCodes
            {
                HPHeal,
                MPHeal,
                TPHeal,
                AddState,
                RemoveState,
                AddBuff,
                AddDebuff,
                RemoveBuff,
                RemoveDebuff,
                SpecialEffect,
                Grow,
                LearnSkill,
                CommonEvent,
            }

            enum Occasion
            {
                Always = 0, 
                BattleOnly = 1, 
                MenuOnly = 2, 
                Never = 3
            }

            /**
            * For effects that recover HP, MP, or TP.
            */
            class HealEffect extends UseEffect
            {
                get PercentRecovery(): number
                get FlatRecovery(): number

                set PercentRecovery(value: number)
                set FlatRecovery(value: number)

                protected static validCodes: EffectType;

                static Null: Readonly<HealEffect>;
                
            }
            
            /**
             * Encapsulates basic healing effects involving, HP, MP, or TP
             */
            class HealEffectSet
            {
                hp: HealEffect[];
                mp: HealEffect[];
                tp: HealEffect[];

                /** Creates an instance of this from the effects of the passed item. */
                static FromItem(item: RPG.Item): HealEffectSet

                /**
                 * Registers any legit healing effects in the array passed. Returns true if
                 * any were legit, false otherwise.
                 * @param effects 
                 */
                RegisterMultiple(effects: RPG.Effect[]): Boolean

                /**
                 * If the passed effect is a legit healing effect, it gets registered as the right
                 * type in this instance, returning true. Returns false otherwise.
                 */
                Register(eff: RPG.Effect): Boolean

                /** Whether or not this has any effects registered. */
                Any(): Boolean

                static Null: Readonly<HealEffectSet>;
                
            }

            enum DamageType
            {
                None = 0,
                HPDamage = 1,
                MPDamage = 2,
                HPRecovery = 3,
                MPRecovery = 4,
                HPDrain = 5,
                MPDrain = 6
            }

            /** Targeting scope of skills and items. */
            enum Scope
            {
                None = 0, 

                OneEnemy = 1, 
                AllEnemies = 2, 

                OneRandEnemy = 3, 
                TwoRandEnemy = 4, 
                ThreeRandEnemy = 5, 
                FourRandEnemy = 6,

                OneAlly = 7,
                AllAllies = 8,
                OneAllyDead = 9,
                AllAlliesDead = 10,

                TheUser = 11
            }

            namespace Item
            {
                

                enum ItemType
                {
                    Regular = 1, 
                    Key = 2, 
                    HiddenA = 3, 
                    HiddenB = 4
                }

                

                enum ItemScope
                {
                    None = 0, 

                    OneEnemy = 1, 
                    AllEnemies = 2, 

                    OneRandEnemy = 3, 
                    TwoRandEnemy = 4, 
                    ThreeRandEnemy = 5, 
                    FourRandEnemy = 6,

                    OneAlly = 7,
                    AllAllies = 8,
                    OneAllyDead = 9,
                    AllAlliesDead = 10,

                    TheUser = 11
                }

                

                enum HitType
                {
                    Null = -1,
                    CertainHit = 0,
                    Physical = 1,
                    Magical = 2
                }
            }

            /**
             * Wrapper for MV's Effect class, which represents effects
             * you can set up in an Item's or Skill's effect settings.
             */
            class UseEffect implements RPG.Effect
            {
                code: number;
                dataId: number;
                value1: number;
                value2: number;

                get Type(): EffectType

                static FromDBEffect(dbEffect: RPG.Effect): UseEffect

                static Null: Readonly<UseEffect>;
                
            }

            /**
             * The values are based off the codes the effect types are assigned
             * in the base Effect class.
             */
            enum EffectType
            {
                Null = -1,
                HPHeal = 11,
                MPHeal = 12, 
                TPGain = 13,
                AddState = 21,
                RemoveState = 22,
                AddBuff = 31,
                AddDebuff = 32,
                RemoveBuff = 33,
                RemoveDebuff = 34,
                SpecialEffect = 41,
                Grow = 42,
                LearnSkill = 43,
                CommonEvent = 44
            }
        }

        namespace Text
        {
            class Font implements Utils.IEquatable<Font>
            {
                constructor(face?: string, size?: number,
                    isItalic?: boolean)
            
                set Face(value: string)
                set Size(value: number)
                set IsItalic(value: boolean)
            
                static FromBitmap(bitmap: Bitmap): Font
            
                get Face(): string
                get Size(): number
                get IsItalic(): boolean
            
                Copy(): Font
                SetFrom(other: Font): void
                ApplyTo(bitmap: Bitmap): void
                Equals(other: Font): boolean
                toString(): string;
            
                static Default: Readonly<Font>;
                static Null:Readonly<Font>;
            
            }
        }

        namespace Utils
        {
            /** 
             * Provides hooks for various parts of MV's systems, so you don't need 
             * to alias for the sake of just responding to something MV does.
             * */
            let Callbacks:
            {
                TitleScreenStart: Utils.Event;
                BattleStart: Utils.Event;
                BattleEnd: Utils.Event;
                DamageExecute: Utils.Event;
                EnemyDeath: Utils.Event;
            };

            interface IEquatable<T>
            {
                Equals(other: T): boolean;
            }

            class Event 
            {
                /** Throws an exception if a negative number of args are passed. */
                constructor(argCount?: number) 

                // Getters
                get ArgCount(): number;

                AddListener(func: Function, caller?: any): void
                RemoveListener(func: Function, caller?: any)

                /**
                 * Invokes all callbacks registered under this event. Throws an exception if an inappropriate
                 * number of args is passed.
                 * */
                Invoke(...args: any[]) 

                toString(): string
            }

            function GetScaleFactor(firstWidth: number, firstHeight: number, 
                secondWidth: number, secondHeight: number): number;

        }

    }
}