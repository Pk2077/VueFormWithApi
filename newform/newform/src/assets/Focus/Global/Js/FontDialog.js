/* written by narendhar reddy */

//Open Font Dialog Box and set Default values
var objFont = undefined;
var eFontFamily = [];
FONTDIALOG = {

    createControl: function (FontControlId, objFontClass) {
        data = NETWORK.executeServerMethod(
                        GLOBAL.getContextPath("FontControl", "Home"),
                        true,
                         { sFontCtrlId: FontControlId, objFontClass: objFontClass },
                         'html'
               );
        if (data.lValue > 0) {
            data = data.data;
        }
        else {
            data = null;
        }
        return data;
    },

    previewFont: function (fontCtrlId) {
        debugger
        var previewfont = document.getElementById("previewfont_" + fontCtrlId);
        var fontFamily = document.getElementById("fontFamily_" + fontCtrlId);
        var fontStyle = document.getElementById("fontStyle_" + fontCtrlId);
        var fontWeight = document.getElementById("fontWeight_" + fontCtrlId);
        var fontSizes = document.getElementById("fontSizes_" + fontCtrlId);
        var fontForeColor = document.getElementById("fontForeColor_" + fontCtrlId);
        var fontBackColor = document.getElementById("fontBackColor_" + fontCtrlId);

        if (fontFamily != null && fontFamily.selectedOptions.length > 0)
            previewfont.style.fontFamily = fontFamily.selectedOptions[0].textContent;
        if (fontStyle != null && fontStyle.selectedOptions.length > 0)
            previewfont.style.fontStyle = fontStyle.selectedOptions[0].textContent;
        if (fontWeight != null && fontWeight.selectedOptions.length > 0)
            previewfont.style.fontWeight = fontWeight.selectedOptions[0].textContent;
        previewfont.style.fontSize = fontSizes.value + "px";
        if (fontForeColor != null && fontForeColor.selectedOptions.length > 0)
            previewfont.style.color = fontForeColor.selectedOptions[0].textContent;
        if (fontBackColor != null && fontBackColor.selectedOptions.length > 0)
            previewfont.style.background = fontBackColor.selectedOptions[0].textContent;
        var fonteffect = "";
        //if (document.getElementById("chkBaseline_" + fontCtrlId).checked == true)
        //    fonteffect = fonteffect + " baseline";
        if (document.getElementById("chkOverLine_" + fontCtrlId).checked == true)
            fonteffect = fonteffect + " overline ";
        if (document.getElementById("chkStrikeThrough_" + fontCtrlId).checked == true)
            fonteffect = fonteffect + " line-through";
        if (document.getElementById("chkUnderline_" + fontCtrlId).checked == true)
            fonteffect = fonteffect + " underline";
        //if (fonteffect.length > 0)
        previewfont.style.textDecoration = fonteffect;
    },

    getFontData: function (fontCtrlId) {
        if (fontCtrlId != undefined && fontCtrlId != null) {
            objFont = {
                Background: document.getElementById("fontBackColor_" + fontCtrlId).value,
                BaseLine: false,
                FontFamily: FONTDIALOG.getFontFamilyText(parseInt(document.getElementById("fontFamily_" + fontCtrlId).value)),
                FontSize: document.getElementById("fontSizes_" + fontCtrlId).value,
                FontStyle: document.getElementById("fontStyle_" + fontCtrlId).selectedIndex,
                FontWeight: document.getElementById("fontWeight_" + fontCtrlId).selectedIndex,
                Foreground: document.getElementById("fontForeColor_" + fontCtrlId).value,
                OverLine: document.getElementById("chkOverLine_" + fontCtrlId).checked,
                StrikeThrough: document.getElementById("chkStrikeThrough_" + fontCtrlId).checked,
                UnderLine: document.getElementById("chkUnderline_" + fontCtrlId).checked
            }
            return objFont;
        }
        return null;
    },

    setFontData: function (fontCtrlId, fontData, fontFamily) {
        if (fontFamily != undefined)
            eFontFamily = GLOBAL.ArrayToEnum(JSON.parse(fontFamily));
        document.getElementById("fontFamily_" + fontCtrlId).value = FONTDIALOG.getFontFamilyValue(fontData.FontFamily);
        document.getElementById("fontStyle_" + fontCtrlId).value = fontData.FontStyle;
        document.getElementById("fontWeight_" + fontCtrlId).value = fontData.FontWeight;
        document.getElementById("fontSizes_" + fontCtrlId).value = fontData.FontSize;
        document.getElementById("fontForeColor_" + fontCtrlId).value = fontData.Foreground
        document.getElementById("fontBackColor_" + fontCtrlId).value = fontData.Background;

        document.getElementById("chkBaseline_" + fontCtrlId).checked = fontData.BaseLine;
        document.getElementById("chkOverLine_" + fontCtrlId).checked = fontData.OverLine;
        document.getElementById("chkStrikeThrough_" + fontCtrlId).checked = fontData.StrikeThrough;
        document.getElementById("chkUnderline_" + fontCtrlId).checked = fontData.UnderLine;
        this.previewFont(fontCtrlId);
    },

    getFontFamilyText: function (value) {
        debugger
        if (eFontFamily != null) {
            for (var item in eFontFamily) {
                if (eFontFamily[item] == value) {
                    return item;
                }
            }
        }
        return null;
    },

    getFontFamilyValue: function (text) {
        debugger
        if (eFontFamily != null) {
            for (var item in eFontFamily) {
                if (item == text) {
                    return eFontFamily[item];
                }
            }
        }
        return 0;
    }

}