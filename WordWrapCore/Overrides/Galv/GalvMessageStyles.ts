import { singleNewline } from "../../Shared/_Strings";

export function ApplyMessageStyleOverrides()
{
    OverrideWindowChangeDimensions();
}

function OverrideWindowChangeDimensions()
{
    let oldChangeWindowDimensions = Window_Message.prototype.changeWindowDimensions;

    function NewChangeWindowDimensions(this: Window_Message)
    {
        oldChangeWindowDimensions.call(this);

        let thereIsTextForMessageStyles = CGT.WWCore.textForGalvMessageStyles.length > 0;

        if (!thereIsTextForMessageStyles)
            return;

        let wrappedTextLines = CGT.WWCore.textForGalvMessageStyles.split(singleNewline);
        HaveWidthAccomodateWrappedText.call(this, wrappedTextLines);
        HaveHeightAccomodateWrappedText.call(this, wrappedTextLines);
    }

    function HaveWidthAccomodateWrappedText(this: Window_Message, wrappedTextLines: string[])
    {
        let textWidth = CalcTextWidth.call(this, wrappedTextLines);
        this.width = textWidth;
    }

    function CalcTextWidth(this: Window_Message, wrappedTextLines: string[])
    {
        let xOffset = CalcXOffset.call(this);
        let textWidth = 0;

        for (let i = 0; i < wrappedTextLines.length; i++)
        {
            let currentLine = wrappedTextLines[i];
            let widthOfCurrentLine = this.testWidthEx(currentLine) + 
            this.standardPadding() * 2 + xOffset;

            textWidth = Math.max(textWidth, widthOfCurrentLine);
        }

        return textWidth;

    }

    function CalcXOffset(this: Window_Message)
    {
        let result = 0;
        let faceOffset = CalcFaceOffset.call(this);

		result = $gameMessage._faceName ? faceOffset : 0;
        let padding = Galv.Mstyle.padding[1] + Galv.Mstyle.padding[3];
		result += padding;

        return result;
    }

    function CalcFaceOffset(this: Window_Message)
    {
        let result = 0;

        if (Imported.Galv_MessageBusts) {
			if ($gameMessage.bustPos == 1) {
				result = 0;
			} else {
				result = Galv.MB.w;
			};
		} else {
			result = Window_Base._faceWidth + 25;
		};

        return result;
    }

    function HaveHeightAccomodateWrappedText(this: Window_Message, wrappedTextLines: string[])
    {
        let textHeight = CalcTextHeight.call(this, wrappedTextLines);
        this.height = textHeight;
    }

    function CalcTextHeight(this: Window_Message, wrappedTextLines: string[])
    {
        let result = 0;

        var textState = { index: 0, text: wrappedTextLines.join(singleNewline) };
		var rawTextHeight = this.calcTextHeight(textState, true);
		var paddedTextHeight = rawTextHeight + this.standardPadding() * 2;
		var minHeight = this.fittingHeight(wrappedTextLines.length);
		
        let minFaceHeight = CalcMinFaceHeight.call(this, wrappedTextLines);
        result = Math.max(paddedTextHeight, minHeight, minFaceHeight);
		result += Galv.Mstyle.padding[0] + Galv.Mstyle.padding[2];

        return result;
    }

    function CalcMinFaceHeight(this: Window_Message, wrappedTextLines: string[])
    {
        let minFaceHeight = 0;
        let textWidth = CalcTextWidth.call(this, wrappedTextLines);

        let mugshotIsShowing = $gameMessage._faceName.length > 0;
		if (mugshotIsShowing) 
        {
			textWidth += 15;
			if (Imported.Galv_MessageBusts) 
            {
				if ($gameMessage.bustPos == 1) textWidth += Galv.MB.w;
				minFaceHeight = 0;
			} else 
            {
				minFaceHeight = Window_Base._faceHeight + this.standardPadding() * 2;
			};
		};

        return minFaceHeight;
    }

    Window_Message.prototype.changeWindowDimensions = NewChangeWindowDimensions;

}
