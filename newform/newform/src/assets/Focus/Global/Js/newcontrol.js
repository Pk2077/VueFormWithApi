 //$("body").click(function (evt) {
//    if (FCommon.UI.hasClass(evt.target, "FDatePicker", true) == true) {
//        evt.stopPropagation();
//        return;
//    }

//    DATEPICKER.collapseAllPopups();
//});

//$("body").focusin(function (evt) {
//    if (FCommon.UI.hasClass(evt.target, "FDatePicker", true) == true) {
//        evt.stopPropagation();
//        return;
//    }

//    DATEPICKER.collapseAllPopups();
//});

var FAlert = {
    show: function (sMessage, sTitle, sIcon) {
        var eleContainer = null;
        var eleDiv = null;

        try {
            eleContainer = document.getElementById("divErrorAlert");
            eleContainer.style.width = "100%";
            eleContainer.style.float = "right";
            eleContainer.style.bottom = "5px";

            eleDiv = document.createElement("div");
            eleDiv.style.right = "20px";
            eleDiv.style.top = "0px";
            eleDiv.style.marginRight = "2px";
            eleDiv.style.cssFloat = "right";

            eleDiv.style.clear = "right";
            eleDiv.style.zIndex = "5000";
            eleDiv.style.marginBottom = "2px";
            eleDiv.className = "alert fade in theme_background-color";

            eleDiv.style.padding = "0px";
            eleDiv.style.width = "325px";
            FAlert.arrContainer.push(eleDiv);
            eleDiv.appendChild(FAlert.createTableMessageControl(sMessage, sTitle, sIcon));
            $(eleDiv).appendTo(eleContainer);

            setTimeout(function () {
                if (FAlert.arrContainer.length > 0) {
                    FAlert.close(FAlert.arrContainer[0], 0);
                }
            }, 10000);
        }
        catch (err) {
            alert("Exception: {FAlert.show} " + err.message);
        }
    },

    onClose_Click: function (ele) {
        FAlert.close(ele.parentElement.parentElement.parentElement.parentElement.parentElement, -1);
    },

    createTableMessageControl: function (sMessage, sTitle, sIcon) {
        var eleTable = null;
        var eleBody = null;
        var eleRow = null;
        var eleTd1 = null;
        var eleTd2 = null;
        var eleTd3 = null;
        var eleImage = null;
        var eleClose = null;
        var eleTitle = null;
        var eleMessage = null;

        if (FCommon.String.isNullOrEmpty(sIcon) == true) {
            sIcon = "icon-messaging";
        }

        eleRow = document.createElement("tr");

        eleImage = document.createElement("span");


        eleImage.className = sIcon + " icon-font4 theme_color";

        eleTd1 = document.createElement("td");
        eleTd1.style.padding = "5px";
        eleTd1.appendChild(eleImage);
        eleRow.appendChild(eleTd1);


        eleTd2 = document.createElement("td");
        eleTd2.style.width = "80%";
        eleTd2.style.padding = "5px";

        eleTitle = document.createElement("div");
        eleTitle.style.width = "100%";
        eleTitle.className = "theme_color font-3";
        if (FCommon.String.isNullOrEmpty(sTitle) == false) {
            $(eleTitle).html(sTitle);
        }
        eleTd2.appendChild(eleTitle);

        eleMessage = document.createElement("div");
        eleMessage.style.width = "100%";
        eleMessage.className = "theme_color font-6";
        eleMessage.style.wordBreak = "break-word"; // "break-all";
        //eleMessage.style.whiteSpace = "pre-wrap";
        eleMessage.style.whiteSpace = "normal";
        if (FCommon.String.isNullOrEmpty(sMessage) == false) {
            $(eleMessage).html(sMessage);
        }
        eleTd2.appendChild(eleMessage);

        eleRow.appendChild(eleTd2);

        eleClose = document.createElement("span");
        eleClose.className = "icon-reject2 theme_color";
        eleClose.style.cursor = "pointer";
        eleClose.style.cssFloat = "right";
        eleClose.style.fontSize = "10px";
        eleClose.style.verticalAlign = "middle";
        eleClose.setAttribute("onclick", "FAlert.onClose_Click(this);");

        eleTd3 = document.createElement("td");
        eleTd3.style.padding = "5px";
        eleTd3.appendChild(eleClose);
        eleRow.appendChild(eleTd3);

        eleBody = document.createElement("tbody");
        eleBody.className = "theme_background-color";
        eleBody.style.width = "100%";
        eleBody.appendChild(eleRow);

        eleTable = document.createElement("table");
        eleTable.style.width = "100%";
        eleTable.style.tableLayout = "fixed";
        eleTable.appendChild(eleBody);

        return (eleTable);
    },

    close: function (ele, iIndex) {
        var eleContainer = null;
        var iCounter = 0;

        try {
            eleContainer = document.getElementById("divErrorAlert");
            //$(ele).alert('close');
            eleContainer.removeChild(ele);
        }
        catch (err) {
            alert("Exception: {COMMON.close} " + err.message);
        }

        if (iIndex >= 0) {
            FAlert.arrContainer.splice(iIndex, 1);
        }
        else {
            for (iCounter = 0; iCounter < FAlert.arrContainer.length; iCounter++) {
                if (FCommon.UI.isSameElement(FAlert.arrContainer[iCounter], ele) == true) {
                    FAlert.arrContainer.splice(iCounter, 1);
                    break;
                }
            }
        }
    },

    arrContainer: []
};

var FClipboard = {
    sError: "",

    copyText: function (sText) {
        var bResult = false;

        bResult = FClipboard.PRIVATE.copyUsingClipboardData(sText);
        if (bResult == true) {
            return (true);
        }

        bResult = FClipboard.PRIVATE.copyUsingSelect(sText);
        if (bResult == true) {
            return (true);
        }

        bResult = FClipboard.PRIVATE.copyUsingRange(sText);
        if (bResult == true) {
            return (true);
        }

        return (false);
    },

    getText: function() {
        try {
            FClipboard.sError = "";
            if (window.clipboardData) {
                return (window.clipboardData.getData('Text'));
            }
        }
        catch (err) {
            FClipboard.sError = err.message;
        }
    },

    PRIVATE: {
        copyUsingClipboardData: function (sText) {
            var bResult = false;

            try {
                FClipboard.sError = "";
                if (window.clipboardData) {
                    window.clipboardData.setData("Text", sText);
                    bResult = true;
                }
            }
            catch (err) {
                FClipboard.sError = err.message;
            }

            return (bResult);
        },

        copyUsingSelect: function (sText) {
            var eleTemp = null;
            var bResult = false;

            try {
                FClipboard.sError = "";
                if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
                    eleTemp = FClipboard.PRIVATE.getTempDataElement();
                    if (eleTemp.setSelectionRange) {
                        eleTemp.textContent = sText;
                        eleTemp.focus();
                        eleTemp.setSelectionRange(0, sText.length);
                        if (document.queryCommandEnabled('copy')) {
                            bResult = document.execCommand('copy');
                        }
                    }
                }
            }
            catch (err) {
                FClipboard.sError = err.message;
            }
            finally {
                if (FCommon.UI.isValidObject(eleTemp) == true) {
                    document.body.removeChild(eleTemp);
                }
            }

            return (bResult);
        },

        copyUsingRange: function (sText) {
            var eleTemp = null;
            var bResult = false;
            var range = null;

            try {
                FClipboard.sError = "";
                if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
                    eleTemp = FClipboard.PRIVATE.getTempDataElement();
                    if (eleTemp.createTextRange) {
                        eleTemp.textContent = sText;

                        range = eleTemp.createTextRange();
                        range.collapse(true);
                        range.moveEnd('character', sText.length);
                        range.moveStart('character', 0);
                        range.select();
                        if (document.queryCommandEnabled('copy')) {
                            bResult = document.execCommand('copy');
                        }
                    }
                }
            }
            catch (err) {
                FClipboard.sError = err.message;
            }
            finally {
                if (FCommon.UI.isValidObject(eleTemp) == true) {
                    document.body.removeChild(eleTemp);
                }
            }

            return (bResult);
        },

        getTempDataElement: function () {
            var eleTemp = null;

            eleTemp = document.getElementById("id_clipboard_buffer_element");
            if (FCommon.UI.isValidObject(eleTemp) == false) {
                eleTemp = document.createElement("textarea");
                eleTemp.style.position = "fixed";
                document.body.appendChild(eleTemp);
            }

            return (eleTemp);
        }
    }
};

var FLocalStorage = {
    setItem: function (key, data) {
        var bFlag = false;

        try {
            if (FLocalStorage.isSupportWebStorage() == true) {
                window.localStorage.setItem(key, data);
                bFlag = true;
            }
            else if (window.sessionStorage) {
                window.sessionStorage.setItem(key, data);
            }
        }
        catch (err) {
            alert("Exception: {FLocalStorage.setItem} " + err.message);
        }

        return (bFlag);
    },

    getItem: function (key) {
        var data = null;

        try {
            if (FLocalStorage.isSupportWebStorage() == true) {
                data = window.localStorage.getItem(key);
            }
            else if (window.sessionStorage) {
                data = window.sessionStorage.getItem(key);
            }
        }
        catch (err) {
            alert("Exception: {FLocalStorage.getItem} " + err.message);
        }

        return (data);
    },

    removeItem: function(key) {
        try {
            if (FLocalStorage.isSupportWebStorage() == true) {
                window.localStorage.removeItem(key);
            }
            else if (window.sessionStorage) {
                window.sessionStorage.removeItem(key);
            }
        }
        catch (err) {
            alert("Exception: {FLocalStorage.removeItem} " + err.message);
        }
    },

    clear: function() {
        try {
            if (FLocalStorage.isSupportWebStorage() == true) {
                window.localStorage.clear();
            }
            else if (window.sessionStorage) {
                window.sessionStorage.clear();
            }
        }
        catch (err) {
            alert("Exception: {FLocalStorage.clear} " + err.message);
        }
    },

    isSupportWebStorage: function () {
        if (typeof (Storage) !== "undefined") {
            return (true);
        }

        return (false);
    }
};


var BITWISE = {
    INTERNAL: {
        divide: function (sIntValue, iDivisor) {
            var iDividend = 0;
            var iQuotient = 0;
            var cDigit = "";
            var result = null;

            try {
                result = {};
                result.iRemainder = 0;
                result.sQuotient = "";

                while (sIntValue.length > 0) {
                    cDigit = sIntValue.substr(0, 1);
                    sIntValue = sIntValue.substr(1, sIntValue.length - 1);

                    if (result.iRemainder > 0) {
                        iDividend = (result.iRemainder * 10) + parseInt(cDigit);
                    }
                    else {
                        iDividend = parseInt(cDigit);

                    }

                    if (iDividend == 0) {
                        result.sQuotient += cDigit;
                        continue;
                    }

                    if (iDividend < iDivisor) {
                        if (result.sQuotient.length > 0) {
                            result.sQuotient += "0";
                        }

                        if (sIntValue.length == 0) {
                            result.iRemainder = iDividend;

                            return (result);
                        }

                        iDividend *= 10;
                        iDividend += parseInt(sIntValue.substr(0, 1));
                        sIntValue = sIntValue.substr(1, sIntValue.length - 1);
                    }

                    iQuotient = parseInt(iDividend / iDivisor);
                    result.sQuotient += iQuotient.toString();
                    if ((iQuotient * iDivisor) < iDividend) {
                        result.iRemainder = iDividend - (iQuotient * iDivisor);
                    }
                    else {
                        result.iRemainder = 0;
                    }
                }
            }
            catch (err) {
                alert("Exception: {BITWISE.INTERNAL.divide} " + err.message);
            }

            return (result);
        },

        trimUnusedBits: function (sBinary) {
            var cDigit = "";

            try {
                while (sBinary.length > 0) {
                    cDigit = sBinary.substr(0, 1);
                    if (cDigit == "1") {
                        break;
                    }

                    sBinary = sBinary.substr(1, sBinary.length - 1);
                }
            }
            catch (err) {
                alert("Exception: {BITWISE.INTERNAL.trimUnusedBits} " + err.message);
            }

            return (sBinary);
        },

        bitstoHex: function (sBinary) {
            var sHex = "";

            try {
                sBinary = BITWISE.INTERNAL.trimUnusedBits(sBinary);
                if (sBinary.length == 0) {
                    sHex = "0";
                }
                else if (sBinary == "1") {
                    sHex = "1";
                }
                else if (sBinary == "10") {
                    sHex = "2";
                }
                else if (sBinary == "11") {
                    sHex = "3";
                }
                else if (sBinary == "100") {
                    sHex = "4";
                }
                else if (sBinary == "101") {
                    sHex = "5";
                }
                else if (sBinary == "110") {
                    sHex = "6";
                }
                else if (sBinary == "111") {
                    sHex = "7";
                }
                else if (sBinary == "1000") {
                    sHex = "8";
                }
                else if (sBinary == "1001") {
                    sHex = "9";
                }
                else if (sBinary == "1010") {
                    sHex = "A";
                }
                else if (sBinary == "1011") {
                    sHex = "B";
                }
                else if (sBinary == "1100") {
                    sHex = "C";
                }
                else if (sBinary == "1101") {
                    sHex = "D";
                }
                else if (sBinary == "1110") {
                    sHex = "E";
                }
                else if (sBinary == "1111") {
                    sHex = "F";
                }
            }
            catch (err) {
                alert("Exception: {BITWISE.INTERNAL.bitstoHex} " + err.message);
            }

            return (sHex);
        }
    },

    intToBinary: function (sInt) {
        var sBinary = "";
        var result = null;

        try {
            if (FConvert.isString(sInt) == false || FConvert.isInteger(sInt) == false) {
                return ("");
            }

            while (sInt.length > 1 || (sInt.length == 1 && FConvert.toInt(sInt) > 1)) {
                result = BITWISE.INTERNAL.divide(sInt, 2);
                sBinary = result.iRemainder.toString() + sBinary;
                sInt = result.sQuotient;
            }

            sBinary = sInt + sBinary;
            sBinary = BITWISE.INTERNAL.trimUnusedBits(sBinary);
        }
        catch (err) {
            alert("Exception: {BITWISE.intToBinary} " + err.message);
        }

        return (sBinary);
    },

    intToHex: function (sInt) {
        var sBinary = "";
        var sBits = "";
        var sHex = "";

        try {
            if (FConvert.isString(sInt) == false || FConvert.isInteger(sInt) == false) {
                return ("");
            }

            sBinary = BITWISE.intToBinary(sInt);
            while (sBinary.length >= 4) {
                sBits = sBinary.substr(sBinary.length - 4, 4);
                sHex = BITWISE.INTERNAL.bitstoHex(sBits) + sHex;
                sBinary = sBinary.substr(0, sBinary.length - 4);
            }

            if (sBinary.length > 0) {
                sHex = BITWISE.INTERNAL.bitstoHex(sBinary) + sHex;
            }
        }
        catch (err) {
            alert("Exception: {BITWISE.intToHex} " + err.message);
        }

        return (sHex);
    },

    compareInt: function (sInt1, sInt2) {
        var iCounter = 0;
        var sBinary1 = "";
        var sBinary2 = "";
        var cDigit1 = "";
        var cDigit2 = "";
        var iResult = 0;

        try {
            sBinary1 = BITWISE.intToBinary(sInt1);
            sBinary2 = BITWISE.intToBinary(sInt2);

            if (sBinary1.length < sBinary2.length) {
                iResult = -1;
            }
            else if (sBinary1.length > sBinary2.length) {
                iResult = 1;
            }
            else {
                iResult = 0;
                for (iCounter = 0; iCounter < sBinary1.length; iCounter++) {
                    cDigit1 = sBinary1.substr(iCounter, 1);
                    cDigit2 = sBinary2.substr(iCounter, 1);
                    if (cDigit1 != cDigit2) {
                        if (cDigit1 == "1") {
                            iResult = 1;
                        }
                        else {
                            iResult = -1;
                        }

                        break;
                    }
                }
            }
        }
        catch (err) {
            alert("Exception: {BITWISE.compareInt} " + err.message);
        }

        return (iResult);
    }
};

var COMMON = function () {

}

COMMON.prototype.showMessageBootstrap = function (sMessage, sTitle, fnCloseCallback, obj) {
    var elePopup = null;
    var eleMainDiv = null;
    var eleDiv = null;
    var eleBody = null;
    var eleButton = null;
    var eleFooter = null;
    var eleChildDiv = null;
    var eleSpan = null;
    var bResult = false;

    try {
        eleDiv = document.getElementById("id_focus_msgbox_detail");
        if (FCommon.UI.isValidObject(eleDiv) == true) {
            sTitle = FCommon.UI.getText(eleDiv);
            sTitle = sMessage + "\r\n" + sTitle;
            FCommon.UI.setText(eleDiv, sTitle);

            return (true);
        }

        elePopup = GLOBAL.getGlobalErrorContainer();
        if (FCommon.UI.isValidObject(elePopup) == true) {
            while (elePopup.firstChild) {
                elePopup.removeChild(elePopup.firstChild);
            }

            eleMainDiv = document.createElement("div");
            eleMainDiv.className = "popup-overlay";
            eleMainDiv.id = "id_focus_msgbox";
            elePopup.appendChild(eleMainDiv);

            eleMainDiv = document.createElement("div");
            eleMainDiv.id = "id_focus_msgbox_main";
            eleMainDiv.className = "popup-content";
            eleMainDiv.style.padding = "0px";

            // Whole Title
            eleDiv = document.createElement("div");
            eleDiv.id = "id_focus_msgbox_title";
            eleDiv.className = "col-xs-12 font-2 theme_background-color mytitle";
            eleDiv.style.paddingLeft = "4px";
            eleDiv.style.borderTopLeftRadius = "4px";
            eleDiv.style.borderTopRightRadius = "4px";
            eleDiv.style.borderBottomLeftRadius = "0px";
            eleDiv.style.borderBottomRightRadius = "0px";
            eleDiv.style.paddingRight = "0px";
            eleDiv.style.paddingBottom = "2px";
            eleDiv.style.height = "27px";
            eleDiv.style.borderBottom = "1px solid #ccc";
            eleDiv.style.cursor = "move";

            // Title Text
            eleChildDiv = document.createElement("div");
            eleChildDiv.className = "col-xs-11 font-4";
            eleChildDiv.style.paddingLeft = "0px";
            eleChildDiv.style.top = "2px";
            eleChildDiv.style.height = "100%";
            eleChildDiv.style.paddingRight = "0px";
            eleChildDiv.style.fontWeight = "bold";

            if (FCommon.String.isNullOrEmpty(sTitle) == true) {
                sTitle = "Message";
            }

            if (sTitle.toLowerCase() == "error" || sTitle.toLocaleLowerCase() == "exception") {
                eleChildDiv.style.color = "red";
            }
            else {
                eleChildDiv.className += " theme_color";
            }
            $(eleChildDiv).html(sTitle);

            eleDiv.appendChild(eleChildDiv);

            // Title Close
            eleChildDiv = document.createElement("div");
            eleChildDiv.className = "col-xs-1 small";
            eleChildDiv.style.paddingLeft = "0px";
            eleChildDiv.style.paddingRight = "4px";
            eleChildDiv.style.height = "100%";

            eleSpan = document.createElement("span");
            eleSpan.className = "glyphicon glyphicon-remove pull-right";
            //eleSpan.style.cssFloat = "right";
            eleSpan.style.cursor = "pointer";
            eleSpan.style.top = "4px";

            eleSpan.onclick = function () {
                if (FCommon.UI.isValidObject(fnCloseCallback) == true) {
                    if ((typeof fnCloseCallback).toLowerCase() == "function") {
                        if (FCommon.UI.isValidObject(obj) == true && obj.length > 0) {
                            fnCloseCallback(obj);
                        }
                        else {
                            fnCloseCallback();
                        }
                    }
                    else if ((typeof fnCloseCallback).toLowerCase() == "string"
                        && FCommon.String.isNullOrEmpty(fnCloseCallback) == false) {
                        if (FCommon.UI.isValidObject(obj) == true && obj.length > 0) {
                            eval(fnCloseCallback)(obj);
                        }
                        else {
                            eval(fnCloseCallback)();
                        }
                    }
                }

                FCommon.UI.removeChildren(this.parentElement.parentElement.parentElement.parentElement);
            };

            eleChildDiv.appendChild(eleSpan);
            eleDiv.appendChild(eleChildDiv);
            eleMainDiv.appendChild(eleDiv);


            // Message
            eleBody = document.createElement("span");
            eleBody.id = "id_focus_msgbox_detail";
            eleBody.className = "col-xs-12 font-5";
            eleBody.style.border = "none";
            eleBody.style.marginTop = "10px";
            eleBody.style.paddingLeft = "5px";
            eleBody.style.paddingRight = "5px";
            eleBody.style.color = "black";
            eleBody.style.fontWeight = "noraml";
            eleBody.style.overflow = "auto";
            eleBody.style.wordWrap = "break-word";
            eleBody.style.minHeight = "50px";
            eleBody.style.maxHeight = "400px";
            $(eleBody).html(sMessage);
            eleMainDiv.appendChild(eleBody);

            eleFooter = document.createElement("div");
            eleFooter.className = "col-xs-12";
            eleFooter.style.borderTop = "1px solid #ccc";
            eleFooter.style.minHeight = "30px";
            eleFooter.style.padding = "5px";
            eleFooter.style.textAlign = "right";

            eleButton = document.createElement("button");
            eleButton.className = "btn Fbutton fixed";
            $(eleButton).html("Close");
            eleButton.onclick = function () {
                if (FCommon.UI.isValidObject(fnCloseCallback) == true) {
                    if ((typeof fnCloseCallback).toLowerCase() == "function") {
                        if (FCommon.UI.isValidObject(obj) == true && obj.length > 0) {
                            fnCloseCallback(obj);
                        }
                        else {
                            fnCloseCallback();
                        }
                    }
                    else if ((typeof fnCloseCallback).toLowerCase() == "string"
                        && FCommon.String.isNullOrEmpty(fnCloseCallback) == false) {
                        if (FCommon.UI.isValidObject(obj) == true && obj.length > 0) {
                            eval(fnCloseCallback)(obj);
                        }
                        else {
                            eval(fnCloseCallback)();
                        }
                    }
                }

                FCommon.UI.removeChildren(this.parentElement.parentElement.parentElement);
            };



            eleFooter.appendChild(eleButton);


            eleMainDiv.appendChild(eleFooter);


            elePopup.appendChild(eleMainDiv);
            elePopup.style.display = "block";

            //$("#id_focus_msgbox_main").draggable();

            bResult = true;
        }
    }
    catch (err) {
        alert("Exception: {COMMON.prototype.showMessageBootstrap} " + err.message);
    }

    return (bResult);
}

COMMON.prototype.showMessage = function (sMessage, sTitle, fnCloseCallback) {
    var obj = [];
    var iCounter = 0;

    try {
        if (FCommon.String.isNullOrEmpty(sMessage) == true) {
            return;
        }

        FAlert.show(sMessage, sTitle);
        return;

        obj = [];
        for (iCounter = 3; iCounter < arguments.length; iCounter++) {
            obj.push(arguments[iCounter]);
        }

        if (COMMON.prototype.showMessageBootstrap(sMessage, sTitle, fnCloseCallback, obj) == false) {
            alert(FCommon.String.isNullOrEmpty(sTitle) == true ? "Message" : sTitle + ": " + sMessage);
        }
    }
    catch (err) {
        alert("Exception: {COMMON.prototype.showMessage} " + err.message);
    }
};

COMMON.prototype.decodeHtmlEntity = function (sHTMLEntity) {
    var eleP = null;
    var sResult = "";

    try {
        eleP = document.createElement('p');
        eleP.innerHTML = sHTMLEntity;
        sResult = eleP.textContent || eleP.innerText;

        eleP = null;
    }
    catch (err) {
        alert("Exception: {COMMON.prototype.decodeHtmlEntity} " + err.message);
    }

    return (sResult);
};

COMMON.prototype.isValidObject = function (obj) {
    try {
        if (typeof obj == "undefined" || obj == null) {
            return (false);
        }

        return (true);
    }
    catch (err) {
        alert("Exception: {isValidObject} " + err.message);
    }

    return (false);
};

COMMON.prototype.isNullOrEmpty = function (sValue, bTrim) {
    return (FCommon.String.isNullOrEmpty(sValue, bTrim));
};

COMMON.prototype.getTableColumnText = function (element) {
    var sText = "";

    try {
        sText = COMMON.prototype.getElementText(element);
    }
    catch (err) {
        err.message = "Exception: {getTableColumnText} " + err.message;
        throw err;
    }

    return (sText);
};

COMMON.prototype.getElementText = function (element) {
    var sText = "";

    try {
        if (FCommon.UI.isValidObject(element.innerText) == true) {
            sText = element.innerText;
        }
        else if (FCommon.UI.isValidObject(element.textContent) == true) { // Mozila
            sText = element.textContent;
        }
    }
    catch (err) {
        err.message = "Exception: {getElementText} " + err.message;
        throw err;
    }

    return (sText);
};

COMMON.prototype.setElementText = function (element, sText) {
    var sOldText = "";

    try {
        if (FCommon.UI.isValidObject(element.innerText) == true) {
            sOldText = element.innerText;
            element.innerText = sText;
        }
        else if (FCommon.UI.isValidObject(element.textContent) == true) { // Mozila
            sOldText = element.textContent;
            element.textContent = sText;
        }
    }
    catch (err) {
        err.message = "Exception: {setElementText} " + err.message;
        throw err;
    }

    return (sOldText);
};

COMMON.prototype.getTableColumnAlignText = function (value) {
    var sText = "";

    try {
        if (FCommon.UI.isValidObject(value) == false) {
            return ("left");
        }

        sText = value.toLowerCase();
        if (sText != "center" && sText != "right") {
            sText = "left";
        }
    }
    catch (err) {
        err.message = "Exception: {getTableColumnAlignText} " + err.message;
        throw err;
    }

    return (sText);
};

COMMON.prototype.getHScrollPosition = function () {
    var iValue = 0;

    try {
        if (window.scrollX) {
            iValue = window.scrollX;
        }
        else if (window.pageXOffset) {
            iValue = window.pageXOffset;
        }
        else if (document.documentElement.scrollLeft) {
            iValue = document.documentElement.scrollLeft;
        }
    }
    catch (err) {
        err.message = "Exception: {getHScrollPosition} " + err.message;
        throw err;
    }

    return (iValue);
};

COMMON.prototype.getYScrollPosition = function () {
    var iValue = 0;

    try {
        if (window.scrollY) {
            iValue = window.scrollY;
        }
        else if (window.pageYOffset) {
            iValue = window.pageYOffset;
        }
        else if (document.documentElement.scrollTop) {
            iValue = document.documentElement.scrollTop;
        }
    }
    catch (err) {
        err.message = "Exception: {getYScrollPosition} " + err.message;
        throw err;
    }

    return (iValue);
};

COMMON.prototype.getElementMarginTop = function (element) {
    var sComputedStyle = "";
    var sValue = "";
    var iValue = 0;

    try {
        if (FCommon.UI.isValidObject(element) == false) {
            return (0);
        }

        if (window.getComputedStyle) {
            sComputedStyle = window.getComputedStyle(element, null).marginTop;
            sValue = sComputedStyle.toLowerCase().replace("px", "");
            if (COMMON.prototype.isNumber(sValue) == true) {
                iValue = Number(sValue);
            }
        }
    }
    catch (err) {
        err.message = "Exception: {getElementMarginTop} " + err.message;
        throw err;
    }

    return (iValue);
};

COMMON.prototype.getElementMarginBottom = function (element) {
    var sComputedStyle = "";
    var sValue = "";
    var iValue = 0;

    try {
        if (FCommon.UI.isValidObject(element) == false) {
            return (0);
        }

        if (window.getComputedStyle) {
            sComputedStyle = window.getComputedStyle(element, null).marginBottom;
            sValue = sComputedStyle.toLowerCase().replace("px", "");
            if (COMMON.prototype.isNumber(sValue) == true) {
                iValue = parseInt(sValue);
            }
        }
    }
    catch (err) {
        err.message = "Exception: {getElementMarginBottom} " + err.message;
        throw err;
    }

    return (iValue);
};

COMMON.prototype.getElementMarginTopBottom = function (element) {
    var iValue = 0;

    try {
        iValue = COMMON.prototype.getElementMarginTop(element);
        iValue += COMMON.prototype.getElementMarginBottom(element);
    }
    catch (err) {
        err.message = "Exception: {getElementMarginTopBottom} " + err.message;
        throw err;
    }

    return (iValue);
};

COMMON.prototype.getElementPaddingTop = function (element) {
    var sComputedStyle = "";
    var sValue = "";
    var iValue = 0;

    try {
        if (FCommon.UI.isValidObject(element) == false) {
            return (0);
        }

        if (window.getComputedStyle) {
            sComputedStyle = window.getComputedStyle(element, null).paddingTop;
            sValue = sComputedStyle.toLowerCase().replace("px", "");
            if (COMMON.prototype.isNumber(sValue) == true) {
                iValue = Number(sValue);
            }
        }
    }
    catch (err) {
        err.message = "Exception: {getElementPaddingTop} " + err.message;
        throw err;
    }

    return (iValue);
};

COMMON.prototype.getElementPaddingBottom = function (element) {
    var sComputedStyle = "";
    var sValue = "";
    var iValue = 0;

    try {
        if (FCommon.UI.isValidObject(element) == false) {
            return (0);
        }

        if (window.getComputedStyle) {
            sComputedStyle = window.getComputedStyle(element, null).paddingBottom;
            sValue = sComputedStyle.toLowerCase().replace("px", "");
            if (COMMON.prototype.isNumber(sValue) == true) {
                iValue = parseInt(sValue);
            }
        }
    }
    catch (err) {
        err.message = "Exception: {getElementPaddingBottom} " + err.message;
        throw err;
    }

    return (iValue);
};

COMMON.prototype.getCursorIndexInInput = function (id) {
    var iIndex = -1;

    try {
        id = FCommon.UI.getValidElement(id);

        if (FCommon.UI.isValidObject(id) == true) {
            iIndex = id.selectionStart;
        }
    }
    catch (err) {
        err.message = "Exception: {getCursorIndexInInput} " + err.message;
        throw err;
    }

    return (iIndex);
};

COMMON.prototype.setClassElementsDisplayToNone = function (sClassName, sExceptionId) {
    var arrElement = null;
    var iCounter = 0;

    try {
        arrElement = document.getElementsByClassName(sClassName);
        for (iCounter = 0; iCounter < arrElement.length; iCounter++) {
            if (FCommon.UI.isValidObject(sExceptionId) == true && this.isNullOrEmpty(sExceptionId) == false) {
                if (FCommon.String.compare(arrElement[iCounter].id, sExceptionId, true, 0) == 0) {
                    continue;
                }
            }

            arrElement[iCounter].style.display = 'none';
        }
    }
    catch (err) {
        err.message = "Exception: {setClassElementsDisplayToNone} " + err.message;
        throw err;
    }
};

COMMON.prototype.zeroPadLeft = function (iNumber, iLength) {
    var sPad = "";
    var sValue = "";
    var iCounter = 0;

    try {

        if (FCommon.UI.isValidObject(iNumber) == false) {
            return ("");
        }

        if (iLength < 0) {
            iLength *= (-1);
        }

        for (iCounter = 0; iCounter < iLength; iCounter++) {
            sPad += "0";
        }

        sValue = (sPad + (iNumber)).slice(-iLength);
    }
    catch (err) {
        err.message = "Exception: {zeroPadLeft} " + err.message;
        throw err;
    }

    return (sValue);
};

COMMON.prototype.getASCIIValue = function (character) {
    var iValue = 0;

    try {
        iValue = character.charCodeAt(0);
    }
    catch (err) {
        err.message = "Exception: {getASCIIValue} " + err.message;
        throw err;
    }

    return (iValue);
};

COMMON.prototype.setFocus = function (sId) {
    var vControl = null;

    try {
        if (FCommon.UI.isValidObject(sId) == false) {
            return (false);
        }

        if ((typeof sId).toLowerCase() == "string") {
            if (this.isNullOrEmpty(sId) == true) {
                return (false);
            }

            vControl = document.getElementById(sId);
            if (FCommon.UI.isValidObject(vControl) == false) {
                return (false);
            }
        }
        else {
            vControl = sId;
        }

        vControl.focus();

        if (vControl.select) {
            vControl.select();
        }

        return (true);
    }
    catch (err) {
        err.message = "Exception: {setFocus} " + err.message;
        throw err;
    }

    return (false);
};

COMMON.prototype.isInteger = function (sValue) {
    return (FConvert.isInteger(sValue));
};

COMMON.prototype.isNumber = function (sValue) {
    var patt = null;
    var result = false;

    try {
        if (this.isNullOrEmpty(sValue) == true) {
            return (false);
        }

        patt = /^[+-]?\d+$|^[+-]?\d+\.\d+$/;
        result = patt.test(sValue);
    }
    catch (err) {
        err.message = "Exception: {isNumber} " + err.message;
        throw err;
    }

    return (result);
};

COMMON.prototype.isBoolean = function (sValue) {
    var patt = null;
    var result = false;

    try {
        if (FCommon.UI.isValidObject(sValue) == false) {
            return (false);
        }

        if ((typeof sValue).toLowerCase() == "boolean") {
            return (true);
        }

        if (this.isNullOrEmpty(sValue) == true) {
            return (false);
        }

        patt = /^(true|false)$/i;
        result = patt.test(sValue);
    }
    catch (err) {
        err.message = "Exception: {isBoolean} " + err.message;
        throw err;
    }

    return (result);
};

COMMON.prototype.getEmptyResultObject = function () {
    var obj = {};

    obj.lValue = null;
    obj.sValue = "";
    obj.data = null;

    return (obj);
};

COMMON.prototype.getObjectPropertyValueArray = function (obj, bIgnoreBlankKey) {
    var result = {};
    var bIgnore = false;

    try {
        result.property = [];
        result.value = [];

        if (FCommon.UI.isValidObject(obj) == true) {
            if (FCommon.UI.isValidObject(bIgnoreBlankKey) == true) {
                bIgnore = bIgnoreBlankKey;
            }

            for (skey in obj) {
                if (bIgnore == false || FCommon.String.isNullOrEmpty(skey) == false) {
                    result.property.push(skey);
                    result.value.push(obj[skey]);
                }
            }
        }
    }
    catch (err) {
        alert("Exception: {getObjectPropertyValueArray} " + err.message);
    }

    return (result);
};

COMMON.prototype.getObjectFirstPropertyValue = function (obj, bIgnoreBlankKey) {
    var value = "";
    var bIgnore = false;

    try {

        if (FCommon.UI.isValidObject(obj) == true) {
            if (FCommon.UI.isValidObject(bIgnoreBlankKey) == true) {
                bIgnore = bIgnoreBlankKey;
            }

            for (skey in obj) {
                if (bIgnore == false || FCommon.String.isNullOrEmpty(skey) == false) {
                    value = obj[skey];
                    break;
                }
            }
        }
    }
    catch (err) {
        alert("Exception: {getObjectFirstPropertyValue} " + err.message);
    }

    return (value);
};

COMMON.prototype.getDataAttributeObject = function (element) {
    var sAttribute = "";
    var iCounter = 0;
    var attr = null;
    var obj = {};

    try {
        if (FCommon.UI.isValidObject(element) == true) {
            for (iCounter = 0; iCounter < element.attributes.length; iCounter++) {
                attr = element.attributes[iCounter];
                sAttribute = attr.nodeName.substr(0, "data-".length);
                if (sAttribute.toLowerCase() == "data-") {
                    sAttribute = attr.nodeName.substr("data-".length);
                    if (COMMON.prototype.isInteger(attr.nodeValue) == true) {
                        obj[sAttribute] = parseInt(attr.nodeValue);
                    }
                    else if (FConvert.isFloat(attr.nodeValue) == true) {
                        obj[sAttribute] = parseFloat(attr.nodeValue);
                    }
                    else if (COMMON.prototype.isBoolean(attr.nodeValue) == true) {
                        obj[sAttribute] = eval(attr.nodeValue.toLowerCase());
                    }
                    else {
                        obj[sAttribute] = attr.nodeValue;
                    }
                }
            }
        }
    }
    catch (err) {
        alert("Exception: {getDataAttributeObject} " + err.message);
    }

    return (obj);
}

COMMON.prototype.setClassHoverRule = function (sClassName, objRules) {
    var style = null;
    var sCSS = "";
    var iCounter = 0;
    var result = null;
    var elements = null;

    try {
        elements = document.getElementsByClassName(sClassName);
        if (elements == null || elements.length < 1) {
            return (false);
        }

        result = COMMON.prototype.getObjectPropertyValueArray(objRules, true);
        if (result == null || result.property.length < 1 || result.property.length != result.value.length) {
            return (false);
        }

        for (iCounter = 0; iCounter < result.property.length; iCounter++) {
            sCSS += result.property[iCounter];
            sCSS += ": ";
            sCSS += result.value[iCounter];
            sCSS += "; ";
        }

        sCSS = "." + sClassName + ":hover { " + sCSS + " }";
        style = document.createElement("style");
        style.type = "text/css";
        if (style.styleSheet) {
            style.styleSheet.cssText = sCSS;
        }
        else {
            style.appendChild(document.createTextNode(sCSS));
        }

        for (iCounter = 0; iCounter < elements.length; iCounter++) {
            elements[iCounter].appendChild(style);
        }
    }
    catch (err) {
        alert("Exception: {COMMON.prototype.setClassHoverRule} " + err.message);
    }
}

COMMON.prototype.validateInputNumber = function (eleInput, iType, evt) {
    // 0 For Signed Integer
    // 1 For Unsigned Integer
    // 2 For Signed Decimal
    // 3 For Unsingned Decimal

    return (FNUMERICCONTROL.keypress(eleInput, iType, evt));

    //var charCode = null;

    //try {
    //    bResult = false;

    //    if (evt.which == 0 || evt.which == 8) {
    //        return (true);
    //    }

    //    charCode = (evt.which) ? evt.which : evt.keyCode;
    //    if (charCode == 45) { // -
    //        if ((iType == 0 || iType == 2)
    //            && eleInput.value.length == 0) { // Signed Integer, Signed Decimal
    //            return (true);
    //        }
    //    }
    //    else if (charCode == 46) { // .
    //        if ((iType == 2 || iType == 3)
    //            && eleInput.value.indexOf(".") == -1) { // Signed Decimal, Unsingned Decimal
    //            return (true);
    //        }
    //    }
    //    else if (charCode >= 48 && charCode <= 57) { // 0 to 9
    //        return (true);
    //    }
    //}
    //catch (err) {
    //    COMMON.prototype.showMessage("{COMMON.prototype.validateInputNumber} " + err.message, "Exception");
    //}

    //return (false);
};

COMMON.prototype.getStyleLibObject = function () {
    var obj = {
        id: null,

        notifyWhenFileLoaded: function (sStyleSheetFileName, sFnCallback) {
            if (this.id != null) {
                clearTimeout(this.id);
                this.id = null;
            }

            this.id = setTimeout(this.checkFileLoaded, 100, obj, sStyleSheetFileName, sFnCallback);
        },

        getStyleSheetObject: function (sSheetName) {
            var iCounter = 0;
            var sName = "";

            try {
                for (iCounter = 0; iCounter < document.styleSheets.length; iCounter++) {
                    sName = decodeURIComponent(document.styleSheets[iCounter].href);
                    if (FCommon.String.isNullOrEmpty(sName) == true) {
                        continue;
                    }

                    sName = FCommon.String.right(sName, sSheetName.length + 1);
                    if (FCommon.String.isNullOrEmpty(sName) == true) {
                        continue;
                    }

                    if (sName.toLowerCase() == "/" + sSheetName.toLowerCase()) {
                        return (document.styleSheets[iCounter]);
                    }
                }
            }
            catch (err) {
            }

            return (null);
        },

        checkFileLoaded: function (current, sStyleSheetFileName, sFnCallback) {
            var objStyleSheet = null;
            var ele = null;

            if (FCommon.String.isNullOrEmpty(sStyleSheetFileName, true) == true) {
                ele = document.getElementById("loading");
                if (FCommon.UI.isValidObject(ele) == true) {
                    if (FConvert.toString(ele.style.display).toLowerCase() == "none") {
                        clearTimeout(current.id);
                        current.id = null;
                        if (FCommon.String.isNullOrEmpty(sFnCallback) == false) {
                            eval(sFnCallback)(objStyleSheet);
                        }
                    }
                }
                return;
            }

            objStyleSheet = current.getStyleSheetObject(sStyleSheetFileName);
            if (objStyleSheet != null) {
                clearTimeout(current.id);
                current.id = null;
                if (FCommon.String.isNullOrEmpty(sFnCallback) == false) {
                    eval(sFnCallback)(objStyleSheet);
                }
            }
        }
    };

    return (obj);
}

COMMON.prototype.createAttributesFromObject = function (element, obj) {
    var iCounter = 0;
    var sKey = "";
    var keys = null;

    try {
        keys = Object.keys(obj);
        for (iCounter = 0; iCounter < keys.length; iCounter++) {
            sKey = keys[iCounter];
            if (FCommon.String.isNullOrEmpty(sKey) == true) {
                continue;
            }

            element.setAttribute("data-" + sKey, obj[sKey]);
        }
    }
    catch (err) {
        alert("Exception: {createAttributesFromObject} " + err.message);
    }
};

COMMON.prototype.createAttributesFromArray = function (element, data) {
    var iCounter = 0;

    try {
        for (iCounter = 0; iCounter < data.length; iCounter++) {
            COMMON.prototype.createAttributesFromObject(element, data[iCounter]);
        }
    }
    catch (err) {
        alert("Exception: {createAttributesFromArray} " + err.message);
    }
};

COMMON.prototype.treeGroup_Click = function (ele, event) {
    var eleUl = null;
    try {
        if (FCommon.UI.isValidObject(ele) == false) {
            return;
        }

        eleUl = ele.parentElement.nextElementSibling;
        if (FConvert.toString(eleUl.style.display) != "none") {
            // Hide
            eleUl.style.display = "none";
            $(ele).removeClass("icon-collepse");
            $(ele).addClass("icon-expand");
        }
        else {
            // Show
            eleUl.style.display = "block";
            $(ele).removeClass("icon-expand");
            $(ele).addClass("icon-collepse");
        }
    }
    catch (err) {
        alert("Exception: {COMMON.prototype.treeGroup_Click} " + err.message);
    }
};

// Focus8W
///////////////////////////////////////////////////////////

var RoundingType = (function () {
    var private = {
        'NONE': 0,
        'NEAREST': 1,
        'DOWN': 2,
        'UP': 3
    };

    return {
        get: function (name) { return private[name.toUpperCase()]; }
    }
})();

var FCommon = new function () {
    this.createDuplicateObject = function (obj) {
        var objNew = null;

        try {
            if (FCommon.UI.isValidObject(obj) == false) {
                return (null);
            }

            objNew = JSON.parse(JSON.stringify(obj));
        }
        catch (err) {
            alert("Exception: {FCommon.createDuplicateObject} " + err.message);
        }

        return (objNew);
    },

    this.copyTextToClipboard = function (sText) {
        var textarea = null;
        var bSupported = false;

        if (window.clipboardData && window.clipboardData.setData) {
            window.clipboardData.setData('Text', sText);
            bSupported = true;
        }
        else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
            textarea = document.createElement("textarea");
            textarea.textContent = sText;
            textarea.id = "id_focus8w_clipboard";
            textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
            document.body.appendChild(textarea);
            textarea.select();
            try {
                bSupported = document.execCommand("copy");  // Security exception may be thrown by some browsers.
                if (bSupported == false) {
                    new Clipboard('#id_focus8w_clipboard');  //For copy dashhlet data.
                    bSupported = true;
                }
            }
            catch (ex) {
                bSupported = false;
            }
            finally {
                if (bSupported == true) {
                    document.body.removeChild(textarea);
                }
            }
        }

        return (bSupported);
    },

    this.copyToClipboard = function (sClassId) {
        new Clipboard(sClassId);
    },

    this.getObjectPropertyValue = function (obj, sProperty, bExactMatch) {
        var sKey = "";
        var value = null;

        try {
            bExactMatch = FConvert.toBoolean(bExactMatch);
            if (FCommon.UI.isValidObject(obj) == true) {
                for (sKey in obj) {
                    if (FCommon.String.isNullOrEmpty(sKey) == true) {
                        continue;
                    }

                    if (bExactMatch == true) {
                        if (sKey == sProperty) {
                            value = obj[sKey];
                            break;
                        }
                    }
                    else {
                        if (sKey.toLowerCase() == sProperty.toLowerCase()) {
                            value = obj[sKey];
                            break;
                        }
                    }
                }
            }
        }
        catch (err) {
            alert("Exception: {FCommon.getObjectPropertyValue} " + err.message);
        }

        return (value);
    },

    this.compareValue = function (value1, value2, sOperator) {
        var bResult = false;
        var bString = false;

        try {
            bString = FConvert.isString(value2);

            if (sOperator === "==") {
                if (bString == true) {
                    bResult = value1.localeCompare(value2) == 0;
                }
                else {
                    bResult = (value1 == value2);
                }
            }
            else if (sOperator === "===") {
                if (bString == true) {
                    bResult = value1.localeCompare(value2) == 0;
                }
                else {
                    bResult = (value1 === value2);
                }
            }
            else if (sOperator === "!=" || sOperator === "<>") {
                if (bString == true) {
                    bResult = value1.localeCompare(value2) != 0;
                }
                else {
                    bResult = (value1 !== value2);
                }
            }
            else if (sOperator === "<") {
                if (bString == true) {
                    bResult = (FCommon.String.compare(value1, value2) < 0);
                }
                else {
                    bResult = (FConvert.toDecimal(value1) < FConvert.toDecimal(value2));
                }
            }
            else if (sOperator === ">") {
                if (bString == true) {
                    bResult = (FCommon.String.compare(value1, value2) > 0);
                }
                else {
                    bResult = (FConvert.toDecimal(value1) > FConvert.toDecimal(value2));
                }
            }
            else if (sOperator === "<=") {
                if (bString == true) {
                    bResult = (FCommon.String.compare(value1, value2) <= 0);
                }
                else {
                    bResult = (FConvert.toDecimal(value1) <= FConvert.toDecimal(value2));
                }
            }
            else if (sOperator === ">=") {
                if (bString == true) {
                    bResult = (FCommon.String.compare(value1, value2) >= 0);
                }
                else {
                    bResult = (FConvert.toDecimal(value1) >= FConvert.toDecimal(value2));
                }
            }
            else if (sOperator.toUpperCase() === "ISBLANK") {
                bResult = FCommon.String.isNullOrEmpty(value1);
            }
            else if (sOperator.toUpperCase() === "ISNOTNULL") {
                bResult = FCommon.UI.isValidObject(value1) == true;
            }
        }
        catch(err) {
            alert("Exception: {FCommon.compareValue} " + err.message);
        }

        return(bResult);
    },

    this.Files = new function () {
        this.getExtensionFromName = function (sFileName) {
            var sValue = "";
            var iDotIndex = -1;

            try {
                iDotIndex = sFileName.lastIndexOf(".") + 1;
                if (iDotIndex > 0) {
                    sValue = sFileName.substr(iDotIndex, sFileName.length);
                }
            }
            catch (err) {
                alert("Exception: {FCommon.Files.getExtensionFromName} " + err.message);
            }

            return (sValue);
        }
    },

    this.String = new function () {
        this.trimStart = function (sValue, trimChars) {
            var sResult = "";

            try {
                if (FCommon.String.isNullOrEmpty(sValue) == true) {
                    return (sValue);
                }

                if (FCommon.String.isNullOrEmpty(trimChars) == true) {
                    sResult = sValue.trimLeft();
                }
                else {
                    while (sValue.indexOf(trimChars) == 0) {
                        sValue = sValue.substr(1);
                    }

                    sResult = sValue;
                }
            }
            catch (err) {
                alert("Exception: {FCommon.String.trimStart} " + err.message);
            }

            return (sResult);
        },

        this.trimEnd = function (sValue, trimChars) {
            var sResult = "";
            var arr = null;

            try {
                if (FCommon.String.isNullOrEmpty(sValue) == true) {
                    return (sValue);
                }

                if (FCommon.String.isNullOrEmpty(trimChars) == true) {
                    sResult = sValue.trimRight();
                }
                else {
                    arr = sValue.split('');
                    while (arr.length > 0) {
                        if (arr[arr.length - 1] == trimChars) {
                            arr.splice(arr.length - 1, 1);
                        }
                        else {
                            break;
                        }
                    }

                    sResult = arr.join('');
                }
            }
            catch (err) {
                alert("Exception: {FCommon.String.trimEnd} " + err.message);
            }

            return (sResult);
        },

        this.split = function (sValue, sSplit) {
            var arrResult = [];
            var arrData = [];
            var arrTemp = [];
            var cValue = "";
            var iIndex = 0;
            var iCounter = 0;
            var iCounter1 = 0;

            if (FCommon.String.isNullOrEmpty(sValue) == true) {
                return ([]);
            }

            if (FCommon.String.isNullOrEmpty(sSplit) == true) {
                arrResult = sValue.split("");
            }
            else {
                arrData.push(sValue);
                for (iIndex = 0; iIndex < sSplit.length; iIndex++) {
                    arrResult = [];

                    cValue = sSplit.charAt(iIndex);
                    for (iCounter = 0; iCounter < arrData.length; iCounter++) {
                        arrTemp = arrData[iCounter].split(cValue);
                        for (iCounter1 = 0; iCounter1 < arrTemp.length; iCounter1++) {
                            arrResult.push(arrTemp[iCounter1]);
                        }
                    }

                    arrData = arrResult;
                }
            }

            return (arrResult);
        },

        this.reverse = function (sValue) {
            try {
                sValue = sValue.split('').reverse().join('');
            }
            catch (err) {
                alert("Exception: {FCommon.String.reverse} " + err.message);
            }

            return (sValue);
        },

        this.left = function (sValue, iCount) {
            var sResult = "";

            try {
                if (FCommon.String.isNullOrEmpty(sValue) == true) {
                    return ("");
                }

                if (FCommon.UI.isValidObject(iCount) == false
                    || COMMON.prototype.isInteger(iCount) == false) {
                    return (sValue);
                }

                iCount = parseInt(iCount);

                if (sValue.length < iCount) {
                    return ("");
                }

                sResult = sValue.substr(0, iCount);
            }
            catch (err) {
                alert("Exception: {FCommon.String.left} " + err.message);
            }

            return (sResult);
        },

        this.right = function (sValue, iCount) {
            var sResult = "";

            try {
                if (FCommon.String.isNullOrEmpty(sValue) == true) {
                    return ("");
                }

                if (FCommon.UI.isValidObject(iCount) == false
                    || COMMON.prototype.isInteger(iCount) == false) {
                    return (sValue);
                }

                iCount = parseInt(iCount);

                if (sValue.length < iCount) {
                    return ("");
                }

                sResult = sValue.substr((sValue.length - iCount), iCount);
            }
            catch (err) {
                alert("Exception: {FCommon.String.right} " + err.message);
            }

            return (sResult);
        },

        this.removeSpace = function (sValue) {
            try {
                if (FCommon.UI.isValidObject(sValue) == false) {
                    return (null);
                }

                sValue = sValue.replace(/\s+/g, '');
            }
            catch (err) {
                alert("Exception: {FCommon.String.removeSpace} " + err.message);
            }

            return (sValue);
        },

        this.isNullOrEmpty = function (sValue, bTrim) {
            var bResult = false;
            try {
                if (FCommon.UI.isValidObject(sValue) == false || sValue == null || sValue == "" || sValue.length <= 0) {
                    bResult = true;
                }

                if (FCommon.UI.isValidObject(bTrim) == true && bTrim == true) {
                    if ((typeof sValue).toLowerCase() == "string" && sValue.trim().length == 0) {
                        return (true);
                    }
                }
            }
            catch (err) {
                alert("Exception: {FCommon.String.isNullOrEmpty} " + err.message);
                bResult = true;
            }

            return (bResult);
        },

        this.startsWith = function (sValue, sSearchString) {
            var bResult = false;

            try {
                if (FCommon.String.isNullOrEmpty(sValue) == false) {
                    if (sValue.startsWith) {
                        bResult = sValue.startsWith(sSearchString);
                    }
                    else if (sValue.length >= sSearchString.length) {
                        if (sValue.substr(0, sSearchString.length) === sSearchString) {
                            bResult = true;
                        }
                    }
                }
            }
            catch (err) {
                alert("Exception: {FCommon.String.startsWith} " + err.message);
            }

            return (bResult);
        },

        this.endsWith = function (sValue, sSearchString) {
            var bResult = false;

            try {
                if (FCommon.String.isNullOrEmpty(sValue) == false) {
                    if (sValue.endsWith) {
                        bResult = sValue.endsWith(sSearchString);
                    }
                    else if (sValue.length >= sSearchString.length) {
                        if (sValue.substr((sValue.length - sSearchString.length), sSearchString.length) === sSearchString) {
                            bResult = true;
                        }
                    }
                }
            }
            catch (err) {
                alert("Exception: {FCommon.String.endsWith} " + err.message);
            }

            return (bResult);
        },

        this.includes = function (sValue, sSearchString) {
            var bResult = false;

            try {
                if (FCommon.String.isNullOrEmpty(sValue) == false) {
                    if (sValue.includes) {
                        bResult = sValue.includes(sSearchString);
                    }
                    else {
                        bResult = (sValue.indexOf(sSearchString) >= 0);
                    }
                }
            }
            catch (err) {
                alert("Exception: {FCommon.String.includes} " + err.message);
            }

            return (bResult);
        },

        this.compare = function (sValue, sValue1, bIgnoreCase, iLength) {
            var iResult = 0;

            try {
                if (FCommon.UI.isValidObject(bIgnoreCase) == false || bIgnoreCase == false) {
                    if (FCommon.UI.isValidObject(iLength) == false || iLength <= 0) {
                        iResult = sValue.localeCompare(sValue1);
                    }
                    else {
                        iResult = sValue.substr(0, iLength).localeCompare(sValue1.substr(0, iLength));
                    }
                }
                else {
                    if (FCommon.UI.isValidObject(iLength) == false || iLength <= 0) {
                        iResult = sValue.toLowerCase().localeCompare(sValue1.toLowerCase());
                    }
                    else {
                        iResult = sValue.substr(0, iLength).toLowerCase().localeCompare(sValue1.substr(0, iLength).toLowerCase());
                    }
                }
            }
            catch (err) {
                err.message = "Exception: {FCommon.String.compare} " + err.message;
                throw err;
            }

            return (iResult);
        },

        this.replaceAll = function (sValue, sSearch, sReplacement) {
            try {
                sValue = sValue.replace(new RegExp(sSearch, 'g'), sReplacement);
            }
            catch (err) {
                alert("Exception: {FCommon.String.replaceAll} " + err.message);
            }

            return (sValue);
        },

        this.replaceAt = function (sValue, iIndex, character) {
            try {
                sValue = sValue.substr(0, iIndex) + character + sValue.substr(iIndex + character.length);
            }
            catch (err) {
                err.message = "Exception: {FCommon.String.replaceAt} " + err.message;
                throw err;
            }

            return (sValue);
        },

        this.padding = function (dValue, sFormat) {
            var sValue = "";

            try {
                if (FCommon.String.isNullOrEmpty(sFormat) == true) {
                    return (dValue);
                }

                if (FCommon.UI.isValidObject(dValue) == false) {
                    return (dValue);
                }

                sValue = sFormat + FConvert.toString(dValue);
                sValue = FCommon.String.right(sValue, sFormat.length);
            }
            catch (err) {
                alert("Exception: {FCommon.String.padding} " + err.message);
            }

            return (sValue);
        }
    },

    this.UI = new function () {
        this.isValidObject = function (obj) {
            try {
                if (typeof obj == "undefined" || obj == null) {
                    return (false);
                }

                return (true);
            }
            catch (err) {
                alert("Exception: {FCommon.UI.isValidObject} " + err.message);
            }

            return (false);
        },

        this.calculateElementFixedLeftPosition = function (ele) {
            var iValue = 0;
            var rect = null;
            var rectParent = null;
            var sPosition = "";

            try {
                ele = FCommon.UI.getValidElement(ele);
                while (FCommon.UI.isValidObject(ele) == true) {
                    rect = ele.getBoundingClientRect();

                    ele = ele.parentElement;
                    if (FCommon.UI.isValidObject(ele) == true) {
                        sPosition = FCommon.UI.getElementStyleValue(ele, "position");
                        if (sPosition == "fixed") {
                            break;
                        }

                        rectParent = ele.getBoundingClientRect();
                        iValue += (rect.left - rectParent.left);
                    }
                    else {
                        iValue += rect.left;
                        break;
                    }
                }
            }
            catch(err) {
                alert("Exception: {FCommon.UI.calculateElementFixedLeftPosition} " + err.message);
            }

            return (iValue);
        },

        this.calculateElementFixedTopPosition = function (ele) {
            var iValue = 0;
            var rect = null;
            var rectParent = null;
            var sPosition = "";

            try {
                ele = FCommon.UI.getValidElement(ele);
                while (FCommon.UI.isValidObject(ele) == true) {
                    rect = ele.getBoundingClientRect();

                    ele = ele.parentElement;
                    if (FCommon.UI.isValidObject(ele) == true) {
                        sPosition = FCommon.UI.getElementStyleValue(ele, "position");
                        if (sPosition == "fixed") {
                            break;
                        }

                        rectParent = ele.getBoundingClientRect();
                        iValue += (rect.top - rectParent.top);
                    }
                    else {
                        iValue += rect.top;
                        break;
                    }
                }
            }
            catch (err) {
                alert("Exception: {FCommon.UI.calculateElementFixedTopPosition} " + err.message);
            }

            return (iValue);
        },

        this.getValidElement = function (obj) {
            var element = null;

            try {
                if (FCommon.UI.isValidObject(obj) == false) {
                    return (null);
                }

                if ((typeof obj).toLowerCase() == 'string') {
                    element = document.getElementById(obj);
                }
                else if ((typeof obj).toLowerCase() == 'object') {
                    element = obj;
                }
            }
            catch (err) {
                err.message = "Exception: {FCommon.UI.getValidElement} " + err.message;
                throw err;
            }

            return (element);
        },

        this.isSameElement = function (ele1, ele2) {
            try {
                if (ele1.isSameNode) {
                    if (ele1.isSameNode(ele2) == true) {
                        return(true);
                    }
                }
                else if (ele1.isEqualNode) {
                    if (ele1.isEqualNode(ele2) == true) {
                        return(true);
                    }
                }
                else if (ele1 === ele2) {
                    return (true);
                }
            }
            catch (err) {
                alert("Exception: {FCommon.UI.isSameElement} " + err.message);
            }

            return (false);
        },

        this.getWidth = function (element) {
            var rect = null;
            var iValue = 0;

            try {
                if (FCommon.UI.isValidObject(element) == true) {
                    rect = element.getBoundingClientRect();
                    iValue = rect.right - rect.left;
                }
            }
            catch (err) {
                alert("Exception: {FCommon.UI.getWidth} " + err.message);
            }

            return (iValue);
        },

        this.getHeight = function (element) {
            var rect = null;
            var iValue = 0;

            try {
                if (FCommon.UI.isValidObject(element) == true) {
                    rect = element.getBoundingClientRect();
                    iValue = rect.bottom - rect.top;
                }
            }
            catch (err) {
                alert("Exception: {FCommon.UI.getHeight} " + err.message);
            }

            return (iValue);
        },

        this.toggleElementDisplay = function (ele) {
            try {
                ele = FCommon.UI.getValidElement(ele);
                if (FCommon.UI.isValidObject(ele) == false) {
                    return (false);
                }

                if (ele.style.display.toLowerCase() == '' || ele.style.display.toLowerCase() == 'block') {
                    ele.style.display = 'none';
                }
                else if (ele.style.display.toLowerCase() == 'none') {
                    ele.style.display = '';
                }
            }
            catch (err) {
                alert("Exception: {FCommon.UI.toggleElementDisplay} " + err.message);
            }

            return (true);
        },

        this.getElementValueBasedOnDataTypeId = function (eleCtrl, iDataTypeId) {
            var result = null;

            try {
                result = COMMON.prototype.getEmptyResultObject();
                result.lValue = 0;
                result.sValue = "";
                result.data = null;

                eleCtrl = FCommon.UI.getValidElement(eleCtrl);
                if (FCommon.UI.isValidObject(eleCtrl) == false) {
                    result.lValue = 0;
                    result.sValue = "Invalid element.";
                    result.data = null;

                    return (result);
                }

                switch (iDataTypeId) {
                    case MasterDataType.get("NUMBER"):
                    case MasterDataType.get("BIGNUMBER"):
                    case MasterDataType.get("SMALLNUMBER"):
                    case MasterDataType.get("TINYNUMBER"):
                        result.lValue = 1;
                        result.data = FConvert.toInt(eleCtrl.value);
                        break;
                    case MasterDataType.get("FRACTION"):
                        result.lValue = 1;
                        result.data = FConvert.toDecimal(eleCtrl.value);
                        break;
                    case MasterDataType.get("TEXT"):
                        result.lValue = 1;
                        result.data = eleCtrl.value;
                        break;
                    case MasterDataType.get("NUMBERLIST"):
                        if (eleCtrl.selectedIndex >= 0) {
                            result.lValue = 1;
                            result.data = FConvert.toInt(eleCtrl.options[eleCtrl.selectedIndex].value);
                        }
                        break;
                    case MasterDataType.get("STRINGLIST"):
                        if (eleCtrl.selectedIndex >= 0) {
                            result.lValue = 1;
                            result.data = eleCtrl.options[eleCtrl.selectedIndex].text;
                        }
                        break;
                    case MasterDataType.get("BOOLEAN"):
                        result.lValue = 1;
                        result.data = eleCtrl.checked;
                        break;
                    case MasterDataType.get("DATE"):
                        result.lValue = 1;
                        result.data = DATEPICKER.getDate(eleCtrl);
                        break;
                    case MasterDataType.get("TIME"):
                        result.lValue = 1;
                        result.data = FTIMECONTROL.getTime(eleCtrl);
                        break;
                    case MasterDataType.get("DATETIME"):
                        result.lValue = 1;
                        result.data = eleCtrl.value;
                        break;
                    case MasterDataType.get("MASTER"):
                    case MasterDataType.get("EXTERNALTABLE"):
                        result.lValue = 1;
                        result.data = FConvert.toInt(OPTIONCONTROL.getControlValue(eleCtrl));
                        break;
                    default:
                        result.lValue = 1;
                        result.data = eleCtrl.value;
                        break;
                }
            }
            catch (err) {
                result.lValue = -1;
                result.sValue = err.message;
                result.data = null;
            }

            return (result);
        },

        this.isTextSelected = function (eleInput) {
            try {
                if (typeof eleInput.selectionStart == "number") {
                    return eleInput.selectionStart == 0 && eleInput.selectionEnd == eleInput.value.length;
                }
                else if (typeof document.selection != "undefined") {
                    eleInput.focus();
                    return document.selection.createRange().text == eleInput.value;
                }
            }
            catch (err) {
                alert("Exception: {FCommon.UI.isTextSelected} " + err.message);
            }

            return (false);
        }

        this.replaceSelectionRange = function (eleCtrl, sValue, evt) {
            var sNewValue = "";
            var iSelectionStart = 0;
            var iSelectionEnd = 0;

            try {
                if (FCommon.UI.isValidObject(eleCtrl.selectionStart) == true) {
                    iSelectionStart = eleCtrl.selectionStart;
                    iSelectionEnd = eleCtrl.selectionEnd;
                    if (iSelectionStart > 0) {
                        sNewValue = FCommon.String.left(eleCtrl.value, iSelectionStart);
                        sNewValue += sValue;
                        sNewValue += eleCtrl.value.substr(iSelectionEnd);

                        if (FCommon.UI.isValidObject(evt) == true) {
                            FCommon.UI.stopKeyProcess(evt);
                            eleCtrl.value = sNewValue;
                            FCommon.UI.selectTextInInput(eleCtrl, iSelectionStart + 1, iSelectionEnd + 1);

                        }
                    }
                    else if (iSelectionEnd > 0) {
                        sNewValue = sValue;
                        sNewValue += eleCtrl.value.substr(iSelectionEnd);

                        if (FCommon.UI.isValidObject(evt) == true) {
                            FCommon.UI.stopKeyProcess(evt);
                            eleCtrl.value = sNewValue;
                            FCommon.UI.selectTextInInput(eleCtrl, 1, 1);
                        }
                    }
                    else {
                        sNewValue = eleCtrl.value;
                        sNewValue += sValue;
                    }
                }
                else {
                    sNewValue = eleCtrl.value + sValue;
                }
            }
            catch (err) {
                alert("Exception: {FCommon.UI.replaceSelectionRange} " + err.message);
            }

            return (sNewValue);
        },

        this.selectTextInDropdownUsingText = function (ele, sText) {
            var iCounter = 0;
            var bResult = false;

            try {
                for (iCounter = 0; iCounter < ele.options.length; iCounter++) {
                    if (FCommon.String.compare(ele.options[iCounter].text, sText) == 0) {
                        ele.selectedIndex = iCounter;
                        bResult = true;
                        break;
                    }
                }
            }
            catch (err) {
                alert("Exception: {FCommon.UI.selectTextInDropdownUsingText} " + err.message);
            }

            return (bResult);
        },

        this.getDropdownValue = function (eleCtrl) {
            var result = null;

            try {
                result = COMMON.prototype.getEmptyResultObject();
                result.lValue = 0;
                result.sValue = "";
                result.data = null;

                eleCtrl = FCommon.UI.getValidElement(eleCtrl);
                if (eleCtrl.selectedIndex >= 0) {
                    result.lValue = 1;
                    result.sValue = eleCtrl.options[eleCtrl.selectedIndex].text;
                    result.data = eleCtrl.options[eleCtrl.selectedIndex].value;
                }
            }
            catch (err) {
                result.lValue = -1;
                result.sValue = err.message;
            }

            return (result);
        },

        this.setText = function (element, sText) {
            var sNodeName = "";

            try {
                element = FCommon.UI.getValidElement(element);
                if (FCommon.UI.isValidObject(element) == true) {
                    sNodeName = element.nodeName.toLowerCase();
                    if (sNodeName === "input") {
                        if (element.getAttribute("type").toLowerCase() === "text") {
                            element.value = sText;
                        }
                    }
                    else if (sNodeName === "textarea") {
                        element.value = sText;
                    }
                    else if (sNodeName === "select") {
                        FCommon.UI.selectTextInDropdownUsingText(element, sText);
                    }
                    else {
                        if (FCommon.UI.isValidObject(element.innerText) == true) {
                            element.innerText = sText;
                        }
                        else if (FCommon.UI.isValidObject(element.textContent) == true) { // Mozila
                            element.textContent = sText;
                        }
                    }
                }
            }
            catch (err) {
                alert("Exception: {FCommon.UI.setText} " + err.message);
            }
        },

        this.getText = function (element) {
            var sText = "";
            var sNodeName = "";

            try {
                element = FCommon.UI.getValidElement(element);
                if (FCommon.UI.isValidObject(element) == true) {
                    sNodeName = element.nodeName.toLowerCase();
                    if (sNodeName === "input") {
                        if (element.getAttribute("type").toLowerCase() === "text") {
                            sText = element.value;
                        }
                    }
                    else if (sNodeName === "textarea") {
                        sText = element.value;
                    }
                    else if (sNodeName === "select") {
                        if (element.selectedIndex >= 0) {
                            result.sValue = element.options[element.selectedIndex].text;
                        }
                    }
                    else {
                        if (FCommon.UI.isValidObject(element.innerText) == true) {
                            sText = element.innerText;
                        }
                        else if (FCommon.UI.isValidObject(element.textContent) == true) { // Mozila
                            sText = element.textContent;
                        }
                    }
                }
            }
            catch (err) {
                alert("Exception: {FCommon.UI.getText} " + err.message);
            }

            return (sText);
        },

        this.enableButton = function (bEnable, eleButton) {
            var result = null;

            try {
                result = COMMON.prototype.getEmptyResultObject();
                result.lValue = 0;
                result.sValue = "";
                result.data = null;

                eleButton = FCommon.UI.getValidElement(eleButton);
                if (FCommon.UI.isValidObject(eleButton) == true) {
                    eleButton.style.opacity = (bEnable == true) ? "1" : "0.5";
                    eleButton.style.pointerEvents = (bEnable == true) ? "auto" : "none";

                    result.lValue = 1;
                    result.data = eleButton;
                }
            }
            catch (err) {
                result.lValue = -1;
                result.sValue = err.message;
            }

            return (result);
        },

        this.createAttributesFromObject = function (element, obj) {
            var iCounter = 0;
            var sKey = "";
            var keys = null;

            try {
                keys = Object.keys(obj);
                for (iCounter = 0; iCounter < keys.length; iCounter++) {
                    sKey = keys[iCounter];
                    if (FCommon.String.isNullOrEmpty(sKey) == true) {
                        continue;
                    }

                    element.setAttribute("data-" + sKey, obj[sKey]);
                }
            }
            catch (err) {
                alert("Exception: {FCommon.UI.createAttributesFromObject} " + err.message);
            }
        },

        this.createAttributesFromArray = function (element, data) {
            var iCounter = 0;

            try {
                for (iCounter = 0; iCounter < data.length; iCounter++) {
                    FCommon.UI.createAttributesFromObject(element, data[iCounter]);
                }
            }
            catch (err) {
                alert("Exception: {FCommon.UI.createAttributesFromArray} " + err.message);
            }
        },

        this.setAttributeData = function (element, key, value) {
            try {
                element = FCommon.UI.getValidElement(element);
                if (FCommon.UI.isValidObject(element) == false) {
                    return;
                }

                if (FCommon.UI.isValidObject(key) == false) {
                    return;
                }

                if (FCommon.UI.isValidObject(value) == false) {
                    if (FCommon.Array.isArray(key) == true) {
                        FCommon.UI.createAttributesFromArray(element, key);
                    }
                    else if (FConvert.isObject(key) == true) {
                        FCommon.UI.createAttributesFromObject(element, key);
                    }
                }
                else {
                    element.setAttribute("data-" + FCommon.String.removeSpace(key), value);
                }
            }
            catch (err) {
                alert("Exception: {FCommon.UI.setAttributeData} " + err.message);
            }
        },

        this.getAttributeData = function (element, key) {
            var value = null;

            try {
                element = FCommon.UI.getValidElement(element);
                if (FCommon.UI.isValidObject(element) == true) {
                    if (FCommon.String.left(key, "data-".length) != "data-") {
                        key = "data-" + key;
                    }

                    value = element.getAttribute(key);
                }
            }
            catch (err) {
                alert("Exception: {FCommon.UI.getAttributeData} " + err.message);
            }

            return (value);
        },

        this.getElementPosition = function (element) {
            var iIndex = 0;
            var result = null;

            try {
                if (FCommon.UI.isValidObject(element) == false) {
                    return (0);
                }

                iIndex = 0;
                while (element) {
                    iIndex++;

                    element = element.previousElementSibling;
                }
            }
            catch (err) {
                alert("Exception: {FCommon.UI.getElementPosition} " + err.message);
            }

            return (iIndex);
        },

        this.setFocus = function (control) {
            var result = null;

            try {
                result = COMMON.prototype.getEmptyResultObject();
                result.lValue = 0;
                result.sValue = "";
                result.data = null;

                control = FCommon.UI.getValidElement(control);
                if (FCommon.UI.isValidObject(control) == false) {
                    result.lValue = 0;
                    result.sValue = "Invalid control.";

                    return (result);
                }

                //control.focus();
                setTimeout(function () { control.focus(); }, 0);

                if (control.select) {
                    control.select();
                }

                result.lValue = 1;
                result.data = control;
            }
            catch (err) {
                result.lValue = -1;
                result.sValue = err.message;
            }

            return (result);
        },

        this.setCursorPosition = function (control, iPosition) {
            try {
                FCommon.UI.selectTextInInput(control, iPosition, iPosition);
            }
            catch (err) {
                alert("Exception: {FCommon.UI.setCursorPosition} " + err.message);
            }
        },

        this.selectTextInInput = function (control, iStart, iEnd) {
            try {
                control = FCommon.UI.getValidElement(control);
                if (FCommon.UI.isValidObject(control) == false) {
                    return;
                }

                if (control.setSelectionRange) {
                    control.focus();
                    control.setSelectionRange(iStart, iEnd);
                }
                else if (control.createTextRange) {
                    var range = control.createTextRange();
                    range.collapse(true);
                    range.moveEnd('character', iEnd);
                    range.moveStart('character', iStart);
                    range.select();
                }
            }
            catch (err) {
                alert("Exception: {FCommon.UI.selectTextInInput} " + err.message);
            }
        },

        this.unselectTextInInput = function (eleInput) {
            try {
                eleInput = FCommon.UI.getValidElement(eleInput);
                if (FCommon.UI.isValidObject(eleInput) == true) {
                    FCommon.UI.selectTextInInput(eleInput, eleInput.value.length, eleInput.value.length);
                }
            }
            catch (err) {
                alert("Exception: {FCommon.UI.unselectTextInInput} " + err.message);
            }
        },

        this.hasScrollBar = function (element) {
            var obj = {};

            try {
                obj.horizontal = false;
                obj.vertical = false;
                obj.scrollbarwidth = 0;
                obj.scrollbarheight = 0;

                element = FCommon.UI.getValidElement(element);
                if (FCommon.UI.isValidObject(element) == false) {
                    return (obj);
                }

                obj.vertical = (element.scrollHeight > element.clientHeight);
                obj.horizontal = (element.scrollWidth > element.clientWidth);
                obj.scrollbarwidth = (element.offsetWidth - element.clientWidth);
                obj.scrollbarheight = (element.offsetHeight - element.clientHeight);
            }
            catch (err) {
                alert("Exception: {FCommon.UI.hasScrollBar} " + err.message);
            }

            return (obj);
        },

        this.getScrollLeft = function (element, bFirstOnly) {
            var iLeft = 0;
            var obj = null;

            try {
                bFirstOnly = FConvert.toBoolean(bFirstOnly);
                while (FCommon.UI.isValidObject(element) == true) {
                    obj = FCommon.UI.hasScrollBar(element);
                    if (obj.horizontal == true) {
                        iLeft += element.scrollLeft;
                        if (bFirstOnly == true) {
                            break;
                        }
                    }

                    element = element.parentElement;
                }
            }
            catch (err) {
            }

            return (iLeft);
        },

        this.getScrollTop = function (element, bFirstOnly) {
            var iTop = 0;
            var obj = null;

            try {
                bFirstOnly = FConvert.toBoolean(bFirstOnly);
                while (FCommon.UI.isValidObject(element) == true) {
                    obj = FCommon.UI.hasScrollBar(element);
                    if (obj.vertical == true) {
                        iTop += element.scrollTop;
                        if (bFirstOnly == true) {
                            break;
                        }
                    }

                    element = element.parentElement;
                }
            }
            catch (err) {
            }

            return (iTop);
        },

        this.removeDataAttribute = function (element) {
            var sName = "";
            var iAttrCounter = 0;

            try {
                while (iAttrCounter < element.attributes.length) {
                    sName = element.attributes[iAttrCounter].name;
                    if (FCommon.String.left(sName, "data-".length) == "data-") {
                        element.removeAttribute(sName);
                        continue;
                    }

                    iAttrCounter++
                }
            }
            catch (err) {
                alert("Exception: {FCommon.UI.removeDataAttribute} " + err.message);
            }
        },

        this.copyDataAttribute = function (eleSource, eleTarget) {
            var sName = "";
            var iCounter = 0;

            try {
                for (iCounter = 0; iCounter < eleSource.attributes.length; iCounter++) {
                    sName = eleSource.attributes[iCounter].name;
                    if (FCommon.String.left(sName, "data-".length) != "data-") {
                        continue;
                    }

                    eleTarget.setAttribute(eleSource.attributes[iCounter].name, eleSource.attributes[iCounter].value)
                }
            }
            catch (err) {
                alert("Exception: {FCommon.UI.copyDataAttribute} " + err.message);
            }
        },

        this.removeChildren = function (element) {
            try {
                element = FCommon.UI.getValidElement(element);
                if (FCommon.UI.isValidObject(element) == true) {
                    while (element.firstChild) {
                        element.removeChild(element.firstChild);
                    }
                }
            }
            catch (err) {
                alert("Exception: {FCommon.UI.removeChildren} " + err.message);
            }
        },

        this.getElementStyleValue = function (element, sStyleName) {
            var value = "";
            
            try {
                element = FCommon.UI.getValidElement(element);
                if (FCommon.UI.isValidObject(element) == true) {
                    if (window.getComputedStyle) {
                        value = window.getComputedStyle(element, null).getPropertyValue(sStyleName);
                    }
                    else if (element.currentStyle) {
                        value = element.currentStyle[sStyleName];
                    }
                }
            }
            catch (err) {
                alert("Exception: {FCommon.UI.getElementStyleValue} " + err.message);
            }

            return (value);
        },

        this.getVisibleWidth = function (ele) {
            var iValue = 0;

            try {
                iValue = FCommon.UI.getVisibleWidthHeight(ele).iWidth;
            }
            catch (err) {
                alert("Exception: {FCommon.UI.getVisibleWidth} " + err.message);
            }

            return (iValue);
        },

        this.getVisibleHeight = function (ele) {
            var iValue = 0;

            try {
                iValue = FCommon.UI.getVisibleWidthHeight(ele).iHeight;
            }
            catch (err) {
                alert("Exception: {FCommon.UI.getVisibleHeight} " + err.message);
            }

            return (iValue);
        },

        this.getVisibleWidthHeight = function (ele) {
            var iValue = 0;
            var iTemp = 0;
            var rectElement = null;
            var rectContainer = null;
            var obj = null;

            try {
                obj = {};
                obj.iWidth = 0;
                obj.iHeight = 0;
                obj.iVisibleWidth = 0;
                obj.iVisibleHeight = 0;

                ele = FCommon.UI.getValidElement(ele);
                if (FCommon.UI.isValidObject(ele) == false) {
                    return (obj);
                }

                rectElement = ele.getBoundingClientRect();
                obj.iWidth = rectElement.width;
                obj.iHeight = rectElement.height;
                obj.iVisibleWidth = obj.iWidth;
                obj.iVisibleHeight = obj.iHeight;

                do {
                    ele = ele.parentElement;
                    if (FCommon.UI.isValidObject(ele) == false) {
                        break;
                    }

                    rectContainer = ele.getBoundingClientRect();

                    //if (ele.scrollLeft > 0) {                        
                    //    if (rectContainer.left > rectElement.left) {
                    //        iTemp = rectElement.width - (rectContainer.left - rectElement.left);
                    //        if (iTemp < obj.iVisibleWidth) {
                    //            obj.iVisibleWidth = iTemp;
                    //        }
                    //    }
                    //}

                    //if (ele.scrollTop > 0) {
                    //    if (rectContainer.top > rectElement.top) {
                    //        iTemp = rectElement.height - (rectContainer.top - rectElement.top);
                    //        if (iTemp < obj.iVisibleHeight) {
                    //            obj.iVisibleHeight = iTemp;
                    //        }
                    //    }
                    //}

                    if (rectContainer.width < ele.scrollWidth) {
                        if (rectElement.left >= rectContainer.left && rectElement.right <= rectContainer.right) {
                            iTemp = obj.iVisibleWidth;
                        }
                        else if (rectElement.left <= rectContainer.left) {
                            iTemp = rectElement.width - (rectContainer.left - rectElement.left);
                        }
                        else if (rectElement.right >= rectContainer.right) {
                            iTemp = rectElement.width - (rectElement.right - rectContainer.right);
                        }

                        if (iTemp < obj.iVisibleWidth) {
                            obj.iVisibleWidth = iTemp;
                        }
                    }


                    if (rectContainer.height < ele.scrollHeight) {
                        if (rectElement.top >= rectContainer.top && rectElement.bottom <= rectContainer.bottom) {
                            iTemp = obj.iVisibleHeight;
                        }
                        else if (rectElement.top <= rectContainer.top) {
                            iTemp = rectElement.height - (rectContainer.top - rectElement.top);
                        }
                        else if (rectElement.bottom >= rectContainer.bottom) {
                            iTemp = rectElement.height - (rectElement.bottom - rectContainer.bottom);
                        }

                        if (iTemp < obj.iVisibleHeight) {
                            obj.iVisibleHeight = iTemp;
                        }
                    }
                } while (true);
            }
            catch (err) {
                alert("Exception: {FCommon.UI.getVisibleWidthHeight} " + err.message);
            }

            return (obj);
        },

        this.delay = function (ms) {
            var dtCurrent = null;
            var dtTemp = null;
            var cur_ticks = 0;
            var ms_passed = 0;
            var ticks = 0;

            try {
                dtCurrent = new Date();
                cur_ticks = dtCurrent.getTime();
                ms_passed = 0;

                while (ms_passed < ms) {
                    dtTemp = new Date();
                    ticks = dtTemp.getTime();
                    ms_passed = ticks - cur_ticks;
                    dtTemp = null;
                }

                dtCurrent = null;
            }
            catch (err) { }
        },

        this.setFocusDropdownPopupPosition = function (eleInput, elePopup) {
            var iValue = 0;
            var iInputTop = 0;
            var iPopupWidth = 0;
            var iInputWidth = 0;
            var rectPopup = null;
            var rectInput = null;
            var arrValue = null;

            try {
                if (FCommon.UI.isValidObject(eleInput) == false || FCommon.UI.isValidObject(elePopup) == false) {
                    return;
                }

                elePopup.style.position = "fixed";

                rectPopup = elePopup.getBoundingClientRect();
                iPopupWidth = (rectPopup.right - rectPopup.left);

                rectInput = eleInput.getBoundingClientRect();
                iInputWidth = rectInput.right - rectInput.left;

                iInputTop = FCommon.UI.calculateElementFixedTopPosition(eleInput);
                if ((iInputTop + rectInput.height + rectPopup.height) >= window.innerHeight) {
                    iValue = iInputTop - rectPopup.height;
                }
                else {
                    iValue = iInputTop + rectInput.height;
                }
                elePopup.style.top = iValue + "px";

                //if (rectPopup.bottom >= window.innerHeight) {
                //    iValue = (rectPopup.top - rectPopup.height) - eleInput.getBoundingClientRect().height;
                //    elePopup.style.top = iValue + "px";
                //}
                //else {
                //    elePopup.style.top = FCommon.UI.calculateElementFixedTopPosition(eleInput) + rectInput.height + "px";
                //}

                iValue = FCommon.UI.calculateElementFixedLeftPosition(eleInput);
                if (FCommon.UI.getElementStyleValue(eleInput, "direction").toLowerCase() == "rtl") {
                    //rectInput = eleInput.getBoundingClientRect();
                    //if (rectPopup.width > rectInput.width) {
                    //    arrValue = elePopup.style.left.split("px");
                    //    if (FCommon.UI.isValidObject(arrValue) == true && arrValue.length > 0) {
                    //        iValue = FConvert.toInt(arrValue[0]);
                    //    }

                    //    if (iValue > 0) {
                    //        elePopup.style.left = iValue - (rectPopup.width - rectInput.width) + "px";
                    //    }                    
                    //}

                    iInputWidth = rectInput.right - rectInput.left;

                    if (iPopupWidth >= iInputWidth) {
                        iValue -= (iPopupWidth - iInputWidth);
                    }
                    else {
                        iValue += (iInputWidth - iPopupWidth);
                    }

                    if ((iValue + iPopupWidth) < iPopupWidth) {
                        iValue += (iPopupWidth - iInputWidth);
                    }
                }
                else {
                    if ((iValue + iPopupWidth) > window.innerWidth) {
                        iValue -= (iPopupWidth - iInputWidth);
                    }
                }

                elePopup.style.left = iValue + "px";
            }
            catch (err) {
                alert("Exception: {FCommon.UI.setFocusDropdownPopupPosition} " + err.message);
            }
        },

        this.hasClass = function (ele, sClassName, bCheckAncestor) {
            var iCounter = 0;
            var arrClass = null;
            var bValue = false;

            try {
                if (FCommon.String.isNullOrEmpty(sClassName) == true) {
                    return (false);
                }

                bCheckAncestor = FConvert.toBoolean(bCheckAncestor);

                if (bCheckAncestor == true) {
                    ele = FCommon.UI.getValidElement(ele);
                    if (FCommon.UI.isValidObject(ele) == false) {
                        return (false);
                    }

                    while (ele.parentElement) {
                        if (FCommon.UI.hasClass(ele.parentElement, sClassName, false) == true) {
                            bValue = true;
                            break;
                        }

                        ele = ele.parentElement;
                    }
                }
                else {
                    if (ele.classList) {
                        bValue = ele.classList.contains(sClassName);
                    }
                    else {
                        arrClass = ele.className.split(' ');
                        for (iCounter = 0; iCounter < arrClass.length; iCounter++) {
                            if (arrClass[iCounter] === sClassName) {
                                bValue = true;
                                break;
                            }
                        }
                    }
                }
            }
            catch (err) {
                alert("Exception: {FCommon.UI.hasClass} " + err.message);
            }

            return (bValue);
        },

        this.removeClass = function (ele, sClassName) {
            $(ele).removeClass(sClassName);
        },

        this.findAncestorElementsUsingClass = function (ele, sClassName, bAllAncestors) {
            var arrElements = [];

            try {
                ele = FCommon.UI.getValidElement(ele);
                if (FCommon.UI.isValidObject(ele) == false) {
                    return (arrElements);
                }

                bAllAncestors = FConvert.toBoolean(bAllAncestors);
                while (ele.parentElement) {
                    if (FCommon.UI.hasClass(ele.parentElement, sClassName, false) == true) {
                        arrElements.push(ele.parentElement);
                        if (bAllAncestors == false) {
                            break;
                        }
                    }

                    ele = ele.parentElement;
                }
            }
            catch (err) {
                alert("Exception: {FCommon.UI.findAncestorElementsUsingClass} " + err.message);
            }

            return (arrElements);
        },

        this.isPopupEvent = function (evt) {
            var target = null;

            try {
                if (FCommon.UI.isValidObject(evt) == true) {
                    target = evt.target || evt.srcElement;
                }

                if (FCommon.UI.isValidObject(target) == true) {
                    if (FCommon.UI.hasClass(target, "FPopupChildren", false) == true) {
                        return (true);
                    }
                }
            }
            catch (err) {
                alert("Exception: {FCommon.UI.isPopupEvent} " + err.message);
            }

            return (false);
        },

        this.stopKeyProcess = function (evt) {
            try {
                if (FCommon.UI.isValidObject(evt) == false) {
                    return;
                }

                if (evt.preventDefault) {
                    evt.preventDefault();
                }
                else {
                    evt.returnValue = false;
                }

                if (evt.bubbles == true) {
                    evt.stopPropagation();
                }
            }
            catch (err) {
                alert("Exception: {FCommon.UI.stopKeyProcess} " + err.message);
            }
        }
    },

    this.Array = new function () {
        this.insertRange = function (arrData, iInsertAfter, arrNewData) {
            var iCounter = 0;

            try {
                if (FCommon.UI.isValidObject(arrNewData) == false) {
                    return (arrData);
                }

                for (iCounter = 0; iCounter < arrNewData.length; iCounter++) {
                    arrData.splice(iInsertAfter, 0, arrNewData[iCounter]);
                    iInsertAfter++;
                }
            }
            catch (err) {
                alert("Exception: {FCommon.Array.insertRange} " + err.message);
            }

            return (arrData);
        },

        this.contains = function (arrData, value, sPropertyName, bIgnoreCase) {
            var iCounter = 0;
            var iIndex = -1;
            var bFlag = false;
            var bPropertyName = false;
            var currentvalue = null;

            try {
                if (FCommon.String.isNullOrEmpty(sPropertyName, true) == false) {
                    bPropertyName = true;
                }

                if (FConvert.isString(value) == true && FConvert.toBoolean(bIgnoreCase) == true) {
                    bFlag = true;
                }

                if (FCommon.Array.getLength(arrData) > 0) {
                    for (iCounter = 0; iCounter < arrData.length; iCounter++) {
                        if (bPropertyName == true) {
                            currentvalue = arrData[iCounter][sPropertyName];
                        }
                        else {
                            currentvalue = arrData[iCounter];
                        }

                        if (bFlag == true) {
                            if (currentvalue.toLowerCase() === value.toLowerCase()) {
                                iIndex = iCounter;
                                break;
                            }
                        }
                        else {
                            if (currentvalue == value) {
                                iIndex = iCounter;
                                break;
                            }
                        }
                    }
                }
            }
            catch (err) {
                alert("Exception: {FCommon.Array.contains} " + err.message);
            }

            return (iIndex);
        },

        this.filterDataIndex = function (arrData, PropertyName, value, Operator) {
            var sProperty = "";
            var iCounter = 0;
            var iIndex = 0;
            var bValid = false;
            var bArray = false;
            var arrResult = null;

            try {
                arrResult = [];

                if (FCommon.Array.getLength(arrData) == 0) {
                    return ([]);
                }

                if (FConvert.isString(PropertyName) == true) {
                    if (FCommon.String.isNullOrEmpty(PropertyName, true) == true) {
                        return ([]);
                    }
                }
                else {
                    bArray = FCommon.Array.isArray(PropertyName);
                    if (bArray == false) {
                        return ([]);
                    }
                }

                if (bArray == true && (FCommon.Array.isArray(value) == false || PropertyName.length != value.length)) {
                    return ([]);
                }

                for (iCounter = 0; iCounter < arrData.length; iCounter++) {
                    bValid = false;

                    if (bArray == true) {
                        for (iIndex = 0; iIndex < PropertyName.length; iIndex++) {
                            sProperty = PropertyName[iIndex];
                            if ((typeof arrData[iCounter][sProperty]) == "undefined") {
                                bValid = false;
                                break;
                            }

                            bValid = FCommon.compareValue(arrData[iCounter][sProperty], value[iIndex], Operator);
                            if (bValid == false) {
                                break;
                            }
                        }
                    }
                    else {
                        if ((typeof arrData[iCounter][PropertyName]) == "undefined") {
                            continue;
                        }

                        bValid = FCommon.compareValue(arrData[iCounter][PropertyName], value, Operator);
                    }

                    if (bValid == true) {
                        arrResult.push(iCounter);
                    }
                }
            }
            catch (err) {
                alert("Exception: {FCommon.Array.filterDataIndex} " + err.message);
            }

            return (arrResult);
        },

        this.filterData = function (arrData, PropertyName, value, Operator) {
            var arrIndex = null;
            var iCounter = 0;
            var iIndex = 0;
            var arrResult = null;

            try {
                arrResult = [];

                arrIndex = FCommon.Array.filterDataIndex(arrData, PropertyName, value, Operator);
                for (iCounter = 0; iCounter < arrIndex.length; iCounter++) {
                    iIndex = arrIndex[iCounter];
                    arrResult.push(arrData[iIndex]);
                }
            }
            catch (err) {
                alert("Exception: {FCommon.Array.filterData} " + err.message);
            }

            return (arrResult);
        },

        this.addRange = function (arrData, arrNewData) {
            var iCounter = 0;

            try {
                if (FCommon.UI.isValidObject(arrNewData) == false) {
                    return (arrData);
                }

                for (iCounter = 0; iCounter < arrNewData.length; iCounter++) {
                    arrData.push(arrNewData[iCounter]);
                }
            }
            catch (err) {
                alert("Exception: {FCommon.Array.addRange} " + err.message);
            }

            return (arrData);
        },

        this.convertArrayToCSVFormat = function (arrData) {
            var iCounter = 0;
            var sResult = "";

            try {
                for (iCounter = 0; iCounter < arrData.length; iCounter++) {
                    if (iCounter > 0) {
                        sResult += ",";
                    }

                    sResult += arrData[iCounter];
                }
            }
            catch (err) {
                alert("Exception: {FCommon.Array.convertArrayToCSVFormat} " + err.message);
            }

            return (sResult);
        },

        this.convertCSVFormatToArray = function (sCSVData) {
            var arrData = null;

            try {
                sCSVData = FConvert.toString(sCSVData);
                if (FCommon.String.isNullOrEmpty(sCSVData, true) == true) {
                    arrData = [];
                }
                else {
                    arrData = sCSVData.split(',');
                }
            }
            catch (err) {
                alert("Exception: {FCommon.Array.convertCSVFormatToArray} " + err.message);
            }

            return (arrData);
        },

        this.isArray = function (arrData) {
            var bValue = false;

            try {
                if (FCommon.UI.isValidObject(arrData) == true) {
                    if (Array.isArray(arrData) == true) {
                        bValue = true;
                    }
                }                
            }
            catch (err) {
                alert("Exception: {FCommon.Array.isArray} " + err.message);
            }

            return (bValue);
        },

        this.getLength = function (arrData) {
            var iValue = 0;

            try {
                if (FCommon.Array.isArray(arrData) == true) {
                    iValue = arrData.length;
                }
            }
            catch (err) {
                alert("Exception: {FCommon.Array.getLength} " + err.message);
            }

            return (iValue);
        }
    }
}();

var FConvert = new function () {
    this.isNumeric = function (sValue) {
        var bResult = false;
        var patt = new RegExp("^-?\\d+(\\.(\\d+))?$");

        bResult = patt.test(sValue);
        if (bResult == false) {
            patt = new RegExp("^-?\\.?\\d+$");
            bResult = patt.test(sValue);
        }

        return (bResult);
    },

    this.isInteger = function (sValue) {
        var patt = null;
        var result = false;

        try {
            if (FCommon.String.isNullOrEmpty(sValue) == true) {
                return (false);
            }

            patt = /^[+-]?\d+$/;
            result = patt.test(sValue);
        }
        catch (err) {
            alert("Exception: {FConvert.isInteger} " + err.message);
        }

        return (result);
    },

    this.isFloat = function (sValue) {
        var patt = null;
        var result = false;

        try {
            if (FCommon.String.isNullOrEmpty(sValue) == true) {
                return (false);
            }

            patt = /^[+-]?\d+\.\d+$/;
            result = patt.test(sValue);
        }
        catch (err) {
            alert("Exception: {FConvert.isFloat} " + err.message);
        }

        return (result);
    },

    this.isBoolean = function (value) {
        var bResult = false;

        if ((typeof value).toLowerCase() == "boolean") {
            bResult = true;
        }

        return (bResult);
    },

    this.isString = function (value) {
        var bResult = false;

        if ((typeof value).toLowerCase() == "string") {
            bResult = true;
        }

        return (bResult);
    },

    this.isObject = function (value) {
        var bResult = false;

        if ((typeof value).toLowerCase() == "object" && value != null) {
            bResult = true;
        }

        return (bResult);
    },

    this.getRuleOperator = function (objOper) {
        var sOperator = "";

        switch (objOper) {
            case RuleOperators.get("EQUALTO"):
                sOperator = "==";
                break;
            case RuleOperators.get("NOTEQUAL"):
                sOperator = "!=";
                break;
            case RuleOperators.get("LESSTHEN"):
                sOperator = "<";
                break;
            case RuleOperators.get("GREATERTHAN"):
                sOperator = ">";
                break;
            case RuleOperators.get("LESSTHANEQUAL"):
                sOperator = "<=";
                break;
            case RuleOperators.get("GREATERTHANEQUAL"):
                sOperator = ">=";
                break;
            case RuleOperators.get("ISPRESENT"):
                sOperator = "^";
                break;
            case RuleOperators.get("ISNOTPRESENT"):
                sOperator = "!^";
                break;
            case RuleOperators.get("ISBLANK"):
                sOperator = "-";
                break;
            case RuleOperators.get("ISNOTBLANK"):
                sOperator = "!-";
                break;
            case RuleOperators.get("BEGINSWITH"):
                sOperator = "$";
                break;
            case RuleOperators.get("DOESNOTBEGINWITH"):
                sOperator = "!$";
                break;
            case RuleOperators.get("MATCHPATERN"):
                sOperator = "`";
                break;
            case RuleOperators.get("DOESNOTMATCHPATERN"):
                sOperator = "!`";
                break;
            case RuleOperators.get("NEGATION"):
                sOperator = "!";
                break;
        }

        return (sOperator);
    },

    this.toInt = function (value) {
        if (FCommon.UI.isValidObject(value) == false) {
            return (0);
        }

        value = parseInt(value);
        if (isNaN(value) == true) {
            return (0);
        }

        return (value);
    },

    this.toBoolean = function (value) {
        if (FCommon.UI.isValidObject(value) == false) {
            return (false);
        }

        if (FConvert.isString(value) == true) {
            if (FCommon.String.isNullOrEmpty(value) == true) {
                return (false);
            }

            if (value.toLowerCase().trim() == "true" || value == "1") {
                return (true);
            }
        }
        else if (FConvert.isBoolean(value) == true) {
            return (eval(value));
        }
        else if ((typeof value).toLowerCase() == "number") {
            if (FConvert.toDecimal(value) > 0) {
                return (true);
            }
        }

        return (false);
    },

    this.toDecimal = function (value, iNoDecimal, bConvert) {
        var result = 0;

        if (FCommon.UI.isValidObject(value) == false) {
            result = 0;

            if (FCommon.UI.isValidObject(iNoDecimal) == true) {
                result = result.toFixed(iNoDecimal);
            }

            return (result);
        }

        result = parseFloat(value);
        if (isNaN(result) == true) {
            result = 0;
        }

        if (FCommon.UI.isValidObject(iNoDecimal) == true) {
            result = result.toFixed(iNoDecimal);
            if (FConvert.toBoolean(bConvert) == true) {
                result = parseFloat(result);

            }
        }

        return (result);
    },

    this.toString = function (value) {
        var sType = "";

        if (FCommon.UI.isValidObject(value) == false) {
            return ("");
        }

        if(FConvert.isString(value) == true) {
            return (value);
        }
        else if (FConvert.isBoolean(value) == true) {
            value = value.toString();
        }
        else if (FConvert.isObject(value) == true) {
            value = JSON.stringify(value);
        }
        else {
            sType = (typeof value).toLowerCase();
            if (sType == "number") {
                value = value.toString();
            }
            else {
                value = "";
            }
        }

        return (value);
    },

    this.stringToObject = function (sValue) {
        var result = null;

        try {
            result = COMMON.prototype.getEmptyResultObject();
            result.lValue = 0;
            result.sValue = "";
            result.data = null;

            if (FCommon.String.isNullOrEmpty(sValue, true) == true) {
                return (result);
            }

            result.data = JSON.parse(sValue);
            if (FConvert.isObject(result.data) == true) {
                result.lValue = 1;
            }
        }
        catch (err) {
            result.lValue = -1;
            result.sValue = err.message;
        }

        return (result);
    },

    this.formatToDecimalPlaces = function (value, iPrecision, bAddNumericSeparator) {
        var result = "";

        try {
            iPrecision = this.toInt(iPrecision);
            result = this.toDecimal(value).toFixed(iPrecision);

            bAddNumericSeparator = FConvert.toBoolean(bAddNumericSeparator);
            if (bAddNumericSeparator == true) {
                result = FConvert.addNumericSeparator(result);
            }
        }
        catch (err) {
            alert("Exception: {FConvert.formatToDecimalPlaces} " + err.message);
        }

        return (result);
    },

    this.getNextNo = function (sSeries) {
        var iLength = 0;
        var sNumber = "";
        var sAlpha = "";
        var sTemp = "";
        var iTemp = 0;

        try {
            if (FCommon.String.isNullOrEmpty(sSeries) == true) {
                return ("1");
            }

            iLength = sSeries.length;
            while (iLength > 0) {
                iTemp = sSeries.charCodeAt(iLength - 1);
                if (iTemp >= 48 && iTemp <= 57) {
                    sNumber = sSeries.substr(iLength - 1, 1) + sNumber;
                }
                else {
                    break;
                }

                iLength--;
            }

            sAlpha = sSeries.substr(0, iLength);

            if (FCommon.String.isNullOrEmpty(sNumber) == true) {
                iTemp = 1;
            }
            else {
                iTemp = FConvert.toInt(sNumber) + 1;
            }

            for (iLength = 0; iLength < sNumber.length; iLength++) {
                if (sNumber.charCodeAt(iLength) == 48) {
                    sAlpha += sNumber.substr(iLength, 1);
                }
                else {
                    break;
                }
            }

            sAlpha += iTemp;
        }
        catch (err) {
            alert("Exception: {FConvert.getNextNo} " + err.message);

            return ("1");
        }

        return (sAlpha);
    },

    // {Public}
    this.getPreviousNo = function (sSeries) {
        var iLength = 0;
        var sNumber = "";
        var sAlpha = "";
        var sTemp = "";
        var iTemp = 0;

        try {
            if (FCommon.String.isNullOrEmpty(sSeries) == true) {
                return ("");
            }

            iLength = sSeries.length;
            while (iLength > 0) {
                iTemp = sSeries.charCodeAt(iLength - 1);
                if (iTemp >= 48 && iTemp <= 57) {
                    sNumber = sSeries.substr(iLength - 1, 1) + sNumber;
                }
                else {
                    break;
                }

                iLength--;
            }

            sAlpha = sSeries.substr(0, iLength);

            if (FCommon.String.isNullOrEmpty(sNumber) == true) {
                return ("");
            }

            iTemp = FConvert.toInt(sNumber);
            if (iTemp < 1) {
                return ("");
            }

            iTemp--;

            for (iLength = 0; iLength < sNumber.length; iLength++) {
                if (sNumber.charCodeAt(iLength) == 48) {
                    sAlpha += sNumber.substr(iLength, 1);
                }
                else {
                    break;
                }
            }

            if (iTemp > 0) {
                sAlpha += iTemp;
            }            
        }
        catch (err) {
            alert("Exception: {FConvert.getPreviousNo} " + err.message);

            return ("1");
        }

        return (sAlpha);
    },

    // {Public}
    this.isItSales = function (iVoucherType) {
        var iBaseType = 0;
        var bResult = false;

        iBaseType = iVoucherType & VTTYPE.get("VOUCHERMASK");
        if (iBaseType != VTTYPE.get("FRXJV")
            && iBaseType != VTTYPE.get("OPBAL")
            && iBaseType != VTTYPE.get("JOURN")
            && iBaseType != VTTYPE.get("DEBNT")
            && iBaseType != VTTYPE.get("CRDNT")
            && iBaseType != VTTYPE.get("IDJRN")
            && iBaseType != VTTYPE.get("CASHR")
            && iBaseType != VTTYPE.get("CASHP")
            && iBaseType != VTTYPE.get("PETIC")
            && iBaseType != VTTYPE.get("MEMOR")
            && iBaseType != VTTYPE.get("MEMOP")
            && iBaseType != VTTYPE.get("NJOURN")) {
            bResult = true;
        }

        return (bResult);
    },

    // {Public}
    this.isItOrder = function (iVoucherType) {
        var iBaseType = 0;

        iBaseType = iVoucherType & VTTYPE.get("VOUCHERMASK");

        return (iBaseType == VTTYPE.get("SORDR") || iBaseType == VTTYPE.get("PORDR"));
    },

    // {Public}
    this.isItTransfer = function (iVoucherType) {
        var iBaseType = 0;
        var bResult = false;

        iBaseType = iVoucherType & VTTYPE.get("VOUCHERMASK");
        if (iBaseType == VTTYPE.get("IIDST")
              || iBaseType == VTTYPE.get("WMSPUTAWAY")
              || iBaseType == VTTYPE.get("WMSPUTAWAYCONF")
              || iBaseType == VTTYPE.get("WMSMOVEREQ")
              || iBaseType == VTTYPE.get("WMSMOVECONF")
              || iBaseType == VTTYPE.get("WMSREPLREQ")
              || iBaseType == VTTYPE.get("WMSREPLCONF")
              || iBaseType == VTTYPE.get("WMSPICKLIST")
              || iBaseType == VTTYPE.get("WMSPICKCONF")) {
            bResult = true;
        }

        return (bResult);
    },

    // {Public}
    this.isItNegative = function (iVoucherType) {
        var iBaseType = 0;
        var bResult = false;

        iBaseType = iVoucherType & VTTYPE.get("VOUCHERMASK");
        if (iBaseType == VTTYPE.get("CASHP")
              || iBaseType == VTTYPE.get("PETIC")
              || iBaseType == VTTYPE.get("MEMOP")
              || iBaseType == VTTYPE.get("PURCH")
              || iBaseType == VTTYPE.get("PORDR")
              || iBaseType == VTTYPE.get("SARET")
              || iBaseType == VTTYPE.get("CRDNT")
              || iBaseType == VTTYPE.get("MATRN")
              || iBaseType == VTTYPE.get("IEXCE")
              || iBaseType == VTTYPE.get("IOPBA")
              || iBaseType == VTTYPE.get("PRREC")
              || iBaseType == VTTYPE.get("JWREC")
              || iBaseType == VTTYPE.get("WDONE")
              || iBaseType == VTTYPE.get("NJOURN")) {
            bResult = true;
        }

        return (bResult);
    },

    // {Public}
    this.isItInwardVoucher = function (iVoucherType) {
        var iBaseType = 0;
        var bResult = false;

        iBaseType = iVoucherType & VTTYPE.get("VOUCHERMASK");
        if (iBaseType != VTTYPE.get("SALES")
              && iBaseType != VTTYPE.get("SORDR")
              && iBaseType != VTTYPE.get("PURET")
              && iBaseType != VTTYPE.get("DLVCH")
              && iBaseType != VTTYPE.get("ISHOR")
              && FConvert.isItTransfer(iBaseType) == false // != VTTYPE.IIDST
              && iBaseType != VTTYPE.get("PRDIS")
              && iBaseType != VTTYPE.get("SQUOT")
              && iBaseType != VTTYPE.get("JWISS")
              && iBaseType != VTTYPE.get("WMSDISPCONF")) {
            bResult = true;
        }

        return (bResult);
    },

    this.isItWMSConfirm = function (iVoucherType) {
        var iBaseType = 0;
        var bResult = false;

        iBaseType = iVoucherType & VTTYPE.get("VOUCHERMASK");
        if (iBaseType == VTTYPE.get("WMSPUTAWAYCONF")
              || iBaseType == VTTYPE.get("WMSMOVECONF")
              || iBaseType == VTTYPE.get("WMSREPLCONF")
              || iBaseType == VTTYPE.get("WMSPICKCONF")
              || iBaseType == VTTYPE.get("WMSDISPCONF")) {
            bResult = true;
        }

        return (bResult);
    },

    this.addNumericSeparator = function (value) {
        var sType = "";
        var sCulture = "";
        var sResult = null;
        var iDecimalPlaces = 0;
        var iIndex = 0;

        try {
            if (FCommon.UI.isValidObject(value) == false) {
                return ("");
            }

            sType = (typeof value).toLowerCase();
            if (sType == "object" || sType == "boolean") {
                return (value);
            }
            else if (sType == "number") {
                value = value.toString();
            }

            if (GLOBAL.getNumericSeparatorValue() == 0) {
                sCulture = "en-IN";
            }
            else {
                sCulture = "en-US";
            }

            iIndex = value.indexOf(".");
            if (iIndex >= 0) {
                iDecimalPlaces = value.length - (iIndex + 1);
            }

            sResult = Globalize.format(FConvert.toDecimal(value), "n" + iDecimalPlaces, sCulture)
        }
        catch (err) {
            alert("Exception: {FConvert.addNumericSeparator} " + err.message);
        }

        return (sResult);
    },

    this.getMasterTypeIdFromVariable = function (sVariable) {
        var iMasterTypeId = 0;
        var arrChar = [];
        var sC = "";
        var sC1 = "";

        arrChar = sVariable.toUpperCase().split("");
        sC = arrChar[0];
        sC1 = arrChar[1];

        if (sC == "M") {
            if (arrChar[1] == "A") {
                iMasterTypeId = 1;
            }
            else if (arrChar[1] == "P") {
                iMasterTypeId = 2;
            }
            else if (arrChar[1] == "M") {
                iMasterTypeId = FConvert.PRIVATE.getMasterIdFromArray(arrChar, 2, 300);
            }
            else {
                iMasterTypeId = FConvert.PRIVATE.getMasterIdFromArray(arrChar, 1, 1);
            }
        }
        else if (sC == "C" && sC1 == "M") {
            iMasterTypeId = FConvert.PRIVATE.getMasterIdFromArray(arrChar, 2, 400);
        }
        else if (sC == "Q" && sC1 == "M") {
            iMasterTypeId = FConvert.PRIVATE.getMasterIdFromArray(arrChar, 2, 500);
        }
        else if (sC == "F" && sC1 == "M") {
            iMasterTypeId = FConvert.PRIVATE.getMasterIdFromArray(arrChar, 2, 600);
        }
        else if (sC == "N" && sC1 == "M") {
            iMasterTypeId = FConvert.PRIVATE.getMasterIdFromArray(arrChar, 2, 700);
        }
        else if (sC == "P" && sC1 == "M") {
            iMasterTypeId = FConvert.PRIVATE.getMasterIdFromArray(arrChar, 2, 800);
        }
        else if (sC == "W" && sC1 == "M") {
            iMasterTypeId = FConvert.PRIVATE.getMasterIdFromArray(arrChar, 2, 1000);
        }
        else if (sC == "S" && sC1 == "M") {
            iMasterTypeId = FConvert.PRIVATE.getMasterIdFromArray(arrChar, 2, 1100);
        }
        else if (sC == "X" && sC1 == "M") {
            iMasterTypeId = FConvert.PRIVATE.getMasterIdFromArray(arrChar, 2, 1200);
        }
        else if (sC == "T" && sC1 == "M") {
            iMasterTypeId = FConvert.PRIVATE.getMasterIdFromArray(arrChar, 2, 1300);
        }
        else if (sC == "A" && sC1 == "M") {
            iMasterTypeId = FConvert.PRIVATE.getMasterIdFromArray(arrChar, 2, 1400);
        }
        else if (sC == "O" && sC1 == "M") {
            iMasterTypeId = FConvert.PRIVATE.getMasterIdFromArray(arrChar, 2, 1600);
        }
        else if (sC == "U" && sC1 == "M") {
            iMasterTypeId = FConvert.PRIVATE.getMasterIdFromArray(arrChar, 2, 3000);
        }

        return (iMasterTypeId);
    },

    this.roundOff = function (dActualNumber, dRoundOffTo, iRoundingType) {
        var dValue = 0;
        var iSign = 0;
        var bGreaterThanMidPoint = false;
        var bInMidpoint = false;

        try {
            dValue = dActualNumber;
            switch (iRoundingType)
            {
                case RoundingType.get("Up"):
                    if (dRoundOffTo == 0.00) {
                        dValue = dActualNumber;
                    }
                    else {
                        dValue = Math.ceil(dActualNumber / dRoundOffTo) * dRoundOffTo;
                    }
                    break;
                case RoundingType.get("Down"):
                    if (dRoundOffTo == 0) {
                        dValue = dActualNumber;
                    }
                    else {
                        dValue = Math.floor(dActualNumber / dRoundOffTo) * dRoundOffTo;
                    }
                    break;
                case RoundingType.get("Nearest"):
                    if (dRoundOffTo == 0) {
                        dValue = dActualNumber;
                    }
                    else {
                        var intv = FConvert.toDecimal(Math.abs(dRoundOffTo));
                        iSign = Math.sign(dActualNumber);
                        var dVal = FConvert.toDecimal(Math.abs(dActualNumber));

                        var valIntvRatio = Number(dVal / intv);
                        var k = Math.floor(valIntvRatio);
                        var m = Number(valIntvRatio) - Number(k);

                        bGreaterThanMidPoint = ((m - Number(0.5)) >= Number(1e-14)) ? true : false;
                        bInMidpoint = (Math.abs(m - 0.5) < Number(1e-14)) ? true : false;
                        dValue = ((bGreaterThanMidPoint == true || bInMidpoint == true) ? iSign * ((k + 1) * intv) : iSign * (k * intv));
                    }
                    break;
            }
        }
        catch (err) {
            alert("Exception: {FConvert.roundOff} " + err.message);
        }

        return (dValue);
    },

    this.roundOffToDecimalPlaces = function (dActualNumber, iNumPlaces, iRoundingType) {
        var sTemp = "";
        var iSign = 0;
        var dRoundOffTo = 0;        
        var iCounter = 0;
        var dValue = 0;
        var bGreaterThanMidPoint = false;
        var bInMidpoint = false;

        try {
            iSign = 1;
            dRoundOffTo = 0;
            sTemp = "0.";
            for (iCounter = 0; iCounter < (iNumPlaces - 1) ; iCounter++) {
                sTemp += "0";
            }
            sTemp += "1";
            dRoundOffTo = FConvert.toDecimal(sTemp);

            dValue = dActualNumber;
            switch (iRoundingType) {
                case RoundingType.get("Up"):
                    if (dRoundOffTo == 0.00) {
                        dValue = (dActualNumber * iSign);
                    }
                    else {
                        dValue = Math.ceil(dActualNumber / dRoundOffTo) * dRoundOffTo * iSign;
                    }
                    break;
                case RoundingType.get("Down"):
                    if (dRoundOffTo == 0) {
                        dValue = (dActualNumber * iSign);
                    }
                    else {
                        dValue = Math.floor(dActualNumber / dRoundOffTo) * dRoundOffTo * iSign;
                    }
                    break;
                case RoundingType.get("Nearest"):
                    if (dRoundOffTo == 0) {
                        dValue = (dActualNumber * iSign);
                    }
                    else {
                        var intv = FConvert.toDecimal(Math.abs(dRoundOffTo));
                        iSign = Math.sign(dActualNumber);
                        var dVal = FConvert.toDecimal(Math.abs(dActualNumber));

                        var valIntvRatio = Number(dVal / intv);
                        var k = Math.floor(valIntvRatio);
                        var m = Number(valIntvRatio) - Number(k);

                        bGreaterThanMidPoint = ((m - Number(0.5)) >= Number(1e-14)) ? true : false;
                        bInMidpoint = (Math.abs(m - 0.5) < Number(1e-14)) ? true : false;
                        dValue = ((bGreaterThanMidPoint == true || bInMidpoint == true) ? iSign * ((k + 1) * intv) : iSign * (k * intv));
                    }
                    break;
            }
        }
        catch (err) {
            alert("Exception: {FConvert.roundOffToDecimalPlaces} " + err.message);
        }

        return (dValue);
    },

    this.round = function (dActualNumber, iNumPlaces) {
        var sValue = "";

        try {
            sValue = dActualNumber.toFixed(iNumPlaces);
            dActualNumber = FConvert.toDecimal(sValue);
        }
        catch (err) {
            alert("Exception: {FConvert.round} " + err.message);
        }
        return (dActualNumber);
    },

    this.getYearId = function (iCompanyId) {
        var iValue = 0;

        try {
            if (iCompanyId != 0) {
                iValue = (iCompanyId % 36);
            }
        }
        catch (err) {
            alert("Exception: {FConvert.getYearId} " + err.message);
        }

        return (iValue);
    },

    this.PRIVATE = new function () {
        this.getMasterIdFromArray = function (arrChar, iStart, iAddNumber) {
            var iMasterTypeId = 0;
            var sNumber = "";
            var iCounter = 0;
            var bFlag = false;

            try {
                if (arrChar.length > iStart) {
                    if (FConvert.isNumeric(arrChar[iStart]) == true) {
                        for (iCounter = iStart; iCounter < arrChar.length; iCounter++) {
                            if (arrChar[iCounter] == "F") {
                                bFlag = true;
                                break;
                            }
                            sNumber = sNumber + arrChar[iCounter];
                        }

                        if (bFlag == true) {
                            iMasterTypeId = FConvert.toInt(sNumber) + iAddNumber - 1;
                        }
                    }
                }
            }
            catch (err) {
                alert("Exception: {FConvert.PRIVATE.getMasterIdFromArray} " + err.message);
            }

            return (iMasterTypeId);
        }
    }
}();


//$.ajaxSetup({ 'cache': true });
$.ajaxPrefilter(function (options) {
    if (options.type === 'GET' && options.dataType === 'script') {
        options.cache = true;
    }
});

var NETWORK = new function () {
    this.createParameterForHTTPPostRequest = function (sVariable, sValue, sExistingParameter) {
        try {
            if (FCommon.String.isNullOrEmpty(sExistingParameter) == false) {
                sExistingParameter += "&";
            }

            sExistingParameter += sVariable + "=" + encodeURIComponent(sValue);
        }
        catch (err) {
            err.message = "Exception: {NETWORK.createParameterForHTTPPostRequest} " + err.message;
            throw err;
        }

        return (sExistingParameter);
    },

    this.createParameterObject = function (sName, objValue) {
        var obj = null;

        try {
            obj = {};
            obj.name = sName;
            obj.value = objValue;
        }
        catch (err) {
            alert("Exception: {NETWORK.createParameterObject} " + err.message);
            obj = null;
        }

        return (obj);
    }

    this.createParameterForServerMethod = function (arrParam) {
        var iCounter = 0;
        var parameter = "";
        var obj = null;

        try {
            if (FCommon.UI.isValidObject(arrParam) == false || Array.isArray(arrParam) == false) {
                return (null);
            }

            for (iCounter = 0; iCounter < arrParam.length; iCounter++) {
                obj = arrParam[iCounter];

                parameter = NETWORK.createParameterForHTTPPostRequest(obj.name, obj.value, parameter);
            }
        }
        catch (err) {
            alert("Exception: {NETWORK.createParameterForHTTPPostRequest} " + err.message);
            parameter = null;
        }

        return (parameter);
    },

    this.executeServerMethod = function (ServerURL, bMethodType, arrParam, retType, bAsync, fnCallback_success, fnCallback_beforeSend, fnCallback_complete, tag, evt) {
        var parameter = null;
        var result = null;
        var bAsynchronousCall = false;
        var jqParam = null;
        var sServerURL = "";
        var header = null;
        var iCounter = 0;
        var bURLFound = false;

        try {
            result = COMMON.prototype.getEmptyResultObject();
            if (FCommon.UI.isValidObject(ServerURL) == false) {
                result.lValue = 0;
                result.sValue = "Error: Server url is mandatory.";
                result.data = null;

                return (result);
            }

            if ((typeof ServerURL).toLowerCase() == "string") {
                sServerURL = ServerURL;
            }
            else if ((typeof ServerURL).toLowerCase() == "object") {
                bURLFound = false;
                header = COMMON.prototype.getObjectPropertyValueArray(ServerURL, false);
                for (iCounter = 0; iCounter < header.property.length; iCounter++) {
                    if (header.property[iCounter].toLowerCase() == "url") {
                        sServerURL = header.value[iCounter];

                        header.property.splice(iCounter, 1);
                        header.value.splice(iCounter, 1);

                        bURLFound = true;
                        break;
                    }
                }

                if (bURLFound == false) {
                    result.lValue = 0;
                    result.sValue = "Error: 'url' key is mandatory if object is passed.";
                    result.data = null;

                    return (result);
                }
            }

            if (FCommon.String.isNullOrEmpty(sServerURL) == true) {
                result.lValue = 0;
                result.sValue = "Error: Server url is mandatory.";
                result.data = null;

                return (result);
            }

            if (FCommon.UI.isValidObject(bMethodType) == false) {
                result.lValue = 0;
                result.sValue = "Error: Method type is mandatory.";
                result.data = null;

                return (result);
            }

            if (FCommon.UI.isValidObject(bAsync) == true && eval(bAsync) === true) {
                bAsynchronousCall = true;
            }

            if (FCommon.UI.isValidObject(arrParam) == true) {
                if (Array.isArray(arrParam) == true) {
                    parameter = NETWORK.createParameterForServerMethod(arrParam);
                }
                else if (typeof arrParam == 'string') {
                    parameter = arrParam;
                }
                else {
                    parameter = null;
                }
            }

            if (FCommon.UI.isValidObject(arrParam) == false) {
                jqParam = {};
            }
            else if (parameter != null && typeof parameter == 'string') {
                jqParam = {};

                if (FCommon.String.isNullOrEmpty(parameter) == false) {
                    jqParam.data = parameter;
                }
            }
            else if (parameter == null && typeof arrParam == 'object') {
                jqParam = {};

                if (bMethodType == true) {
                    jqParam.data = JSON.stringify(arrParam);
                    jqParam.contentType = "application/json; charset=UTF-8";
                }
                else {
                    jqParam.data = jQuery.param(arrParam, false);
                }
            }

            if (jqParam != null) {
                jqParam.url = sServerURL;
                jqParam.type = bMethodType == true ? 'POST' : 'GET';
                jqParam.async = bAsynchronousCall;
                jqParam.traditional = true;

                if (FCommon.UI.isValidObject(retType) == true && FCommon.String.isNullOrEmpty(retType) == false) {
                    jqParam.dataType = retType;
                }

                jqParam.beforeSend = function (jqXHR, settings) {
                    console.log("{NETWORK.executeServerMethod:beforeSend} [URL='" + sServerURL + "']");
                    var sSessionId = "";
                    var ele = null;

                    if (header != null) {
                        for (iCounter = 0; iCounter < header.property.length; iCounter++) {
                            jqXHR.setRequestHeader(header.property[iCounter], header.value[iCounter]);
                        }
                    }

                    ele = document.getElementById("id_global_value");
                    if (ele != null)
                    {
                        sSessionId = ele.getAttribute("data-sessionid");
                    }
                    jqXHR.setRequestHeader("sRedisSessionId", sSessionId);

                    if (FCommon.String.isNullOrEmpty(fnCallback_beforeSend) == false) {
                        if ((typeof fnCallback_beforeSend).toLowerCase() === "function") {
                            fnCallback_beforeSend(jqXHR, settings);
                        }
                        else {
                            eval(fnCallback_beforeSend)(jqXHR, settings);
                        }

                    }
                };

                jqParam.success = function (data, textStatus, jqXHR) {
                    console.log("{NETWORK.executeServerMethod:success} [URL='" + sServerURL + "'][textStatus='" + textStatus + "']");

                    var value = jqXHR.getResponseHeader("SESSION_EXPIRE");
                    if (FCommon.UI.isValidObject(value) == true && value == 1) {
                        GLOBAL.pageRefresh();
                        return;
                    }

                    value = jqXHR.getResponseHeader("FOCUS_MESSAGE");
                    if (FConvert.toInt(value) > 0) {
                        if ((typeof data).toLowerCase() == "object") {
                            COMMON.prototype.showMessage(data.sValue, data.lValue < 0 ? document.getElementById("id_resource_message_exception").value : document.getElementById("id_resource_message_error").value);
                        }
                        else {
                            data = FConvert.stringToObject(data);
                            if (data.lValue > 0) {
                                data = data.data;
                                COMMON.prototype.showMessage(data.sValue, data.lValue < 0 ? document.getElementById("id_resource_message_exception").value : document.getElementById("id_resource_message_error").value);
                            }
                        }

                        if (FCommon.String.isNullOrEmpty(fnCallback_success) == false) {
                            if ((typeof fnCallback_success).toLowerCase() === "function") {
                                fnCallback_success(false, data, tag, true, evt);
                            }
                            else {
                                eval(fnCallback_success)(false, data, tag, true, evt);
                            }
                        }

                        return;
                    }

                    result.lValue = 1;
                    result.sValue = "";
                    result.data = data;

                    if (FCommon.String.isNullOrEmpty(fnCallback_success) == false) {
                        if ((typeof fnCallback_success).toLowerCase() === "function") {
                            fnCallback_success(true, data, tag, evt);
                        }
                        else {
                            eval(fnCallback_success)(true, data, tag, evt);
                        }

                        //if (FCommon.UI.isValidObject(tag) == true) {
                        //    if ((typeof fnCallback_success).toLowerCase() === "function") {
                        //        fnCallback_success(true, data, tag);
                        //    }
                        //    else {
                        //        eval(fnCallback_success)(true, data, tag);
                        //    }
                        //}
                        //else {
                        //    if ((typeof fnCallback_success).toLowerCase() === "function") {
                        //        fnCallback_success(true, data);
                        //    }
                        //    else {
                        //        eval(fnCallback_success)(true, data);
                        //    }
                        //}
                    }
                };

                jqParam.complete = function (jqXHR, textStatus) {
                    console.log("{NETWORK.executeServerMethod:complete} [URL='" + sServerURL + "'][textStatus='" + textStatus + "']");
                    if (FCommon.String.isNullOrEmpty(fnCallback_complete) == false) {
                        if ((typeof fnCallback_complete).toLowerCase() === "function") {
                            fnCallback_complete(jqXHR, textStatus);
                        }
                        else {
                            eval(fnCallback_complete)(jqXHR, textStatus);
                        }
                    }
                };

                jqParam.error = function (jqXHR, textStatus, errorThrown) {
                    console.log("{NETWORK.executeServerMethod:error} [URL='" + sServerURL + "'][status='" + jqXHR.status + "'][textStatus='" + textStatus + "'][errorThrown='" + errorThrown + "']");

                    var value = jqXHR.getResponseHeader("SESSION_EXPIRE");
                    if (FCommon.UI.isValidObject(value) == true && value == 1) {
                        GLOBAL.pageRefresh();
                        return;
                    }

                    result.lValue = 0;
                    result.sValue = "Error: [textstatus='" + textStatus + "'][errorThrown='" + errorThrown + "']";

                    result.data = {};
                    result.data.sURL = sServerURL;
                    result.data.textstatus = textStatus;
                    result.data.errorThrown = errorThrown;

                    if (FCommon.UI.isValidObject(jqXHR.responseText) == true) {
                        result.data.responseText = jqXHR.responseText;
                        COMMON.prototype.showMessageBootstrap(jqXHR.responseText, "Error");
                    }

                    if (FCommon.String.isNullOrEmpty(fnCallback_success) == false) {
                        if ((typeof fnCallback_success).toLowerCase() === "function") {
                            fnCallback_success(false, result, tag, evt);
                        }
                        else {
                            eval(fnCallback_success)(false, result, tag, evt);
                        }


                        //if (FCommon.UI.isValidObject(tag) == true) {
                        //    if ((typeof fnCallback_success).toLowerCase() === "function") {
                        //        fnCallback_success(false, result, tag);
                        //    }
                        //    else {
                        //        eval(fnCallback_success)(false, result, tag);
                        //    }
                        //}
                        //else {
                        //    if ((typeof fnCallback_success).toLowerCase() === "function") {
                        //        fnCallback_success(false, result);
                        //    }
                        //    else {
                        //        eval(fnCallback_success)(false, result);
                        //    }
                        //}
                    }
                };
                
                $.ajax(jqParam);
            }
        }
        catch (err) {
            result.lValue = -1;
            result.sValue = "Exception: " + err.message;
            result.data = null;
        }

        return (result);
    },

    this.uploadFile = function (ServerURL, bMethodType, file, retType, bAsync, fnCallback_success, fnCallback_beforeSend, fnCallback_complete, tag) {
        var parameter = null;
        var result = null;
        var bAsynchronousCall = false;
        var jqParam = null;
        var sServerURL = "";
        var header = null;
        var iCounter = 0;
        var bURLFound = false;

        try {
            result = COMMON.prototype.getEmptyResultObject();
            if (FCommon.UI.isValidObject(ServerURL) == false) {
                result.lValue = 0;
                result.sValue = "Error: Server url is mandatory.";
                result.data = null;

                return (result);
            }

            if ((typeof ServerURL).toLowerCase() == "string") {
                sServerURL = ServerURL;
            }
            else if ((typeof ServerURL).toLowerCase() == "object") {
                bURLFound = false;
                header = COMMON.prototype.getObjectPropertyValueArray(ServerURL, false);
                for (iCounter = 0; iCounter < header.property.length; iCounter++) {
                    if (header.property[iCounter].toLowerCase() == "url") {
                        sServerURL = header.value[iCounter];

                        header.property.splice(iCounter, 1);
                        header.value.splice(iCounter, 1);

                        bURLFound = true;
                        break;
                    }
                }

                if (bURLFound == false) {
                    result.lValue = 0;
                    result.sValue = "Error: 'url' key is mandatory if object is passed.";
                    result.data = null;

                    return (result);
                }
            }

            if (FCommon.String.isNullOrEmpty(sServerURL) == true) {
                result.lValue = 0;
                result.sValue = "Error: Server url is mandatory.";
                result.data = null;

                return (result);
            }


            if (FCommon.UI.isValidObject(bMethodType) == false) {
                result.lValue = 0;
                result.sValue = "Error: Method type is mandatory.";
                result.data = null;

                return (result);
            }

            if (FCommon.UI.isValidObject(file) == false) {
                result.lValue = 0;
                result.sValue = "Error: Method type is mandatory.";
                result.data = null;

                return (result);
            }

            if (typeof file != 'object') {
                result.lValue = 0;
                result.sValue = "Error: file must be of 'FormData' type object.";
                result.data = null;

                return (result);
            }

            if (FCommon.UI.isValidObject(bAsync) == true && eval(bAsync) === true) {
                bAsynchronousCall = true;
            }


            jqParam = {};
            jqParam.data = file;
            jqParam.contentType = false;
            jqParam.processData = false;
            jqParam.url = sServerURL;
            jqParam.type = bMethodType == true ? 'POST' : 'GET';
            jqParam.async = bAsynchronousCall;

            if (FCommon.UI.isValidObject(retType) == true && FCommon.String.isNullOrEmpty(retType) == false) {
                jqParam.dataType = retType;
            }

            jqParam.beforeSend = function (jqXHR, settings) {
                console.log("{NETWORK.uploadFile:beforeSend} [URL='" + sServerURL + "']");
                var sSessionId = "";
                var ele = null;

                if (header != null) {
                    for (iCounter = 0; iCounter < header.property.length; iCounter++) {
                        jqXHR.setRequestHeader(header.property[iCounter], header.value[iCounter]);
                    }
                }


                ele = document.getElementById("id_global_value");
                if (ele != null) {
                    sSessionId = ele.getAttribute("data-sessionid");
                }
                jqXHR.setRequestHeader("sRedisSessionId", sSessionId);

                if (FCommon.String.isNullOrEmpty(fnCallback_beforeSend) == false) {
                    if ((typeof fnCallback_beforeSend).toLowerCase() === "function") {
                        fnCallback_beforeSend(jqXHR, settings);
                    }
                    else {
                        eval(fnCallback_beforeSend)(jqXHR, settings);
                    }
                }
            };

            jqParam.success = function (data, textStatus, jqXHR) {
                console.log("{NETWORK.uploadFile:success} [URL='" + sServerURL + "'][textStatus='" + textStatus + "']");

                result.lValue = 1;
                result.sValue = "";
                result.data = data;

                if (FCommon.String.isNullOrEmpty(fnCallback_success) == false) {
                    if (FCommon.UI.isValidObject(tag) == true) {
                        if ((typeof fnCallback_success).toLowerCase() === "function") {
                            fnCallback_success(true, data, tag);
                        }
                        else {
                            eval(fnCallback_success)(true, data, tag);
                        }
                    }
                    else {
                        if ((typeof fnCallback_success).toLowerCase() === "function") {
                            fnCallback_success(true, data);
                        }
                        else {
                            eval(fnCallback_success)(true, data);
                        }
                    }
                }
            };

            jqParam.complete = function (jqXHR, textStatus) {
                console.log("{NETWORK.uploadFile:complete} [URL='" + sServerURL + "'][textStatus='" + textStatus + "']");
                if (FCommon.String.isNullOrEmpty(fnCallback_complete) == false) {
                    if ((typeof fnCallback_complete).toLowerCase() === "function") {
                        fnCallback_complete(jqXHR, textStatus);
                    }
                    else {
                        eval(fnCallback_complete)(jqXHR, textStatus);
                    }
                }
            };

            jqParam.error = function (jqXHR, textStatus, errorThrown) {
                console.log("{NETWORK.uploadFile:error} [URL='" + sServerURL + "'][status='" + jqXHR.status + "'][textStatus='" + textStatus + "'][errorThrown='" + errorThrown + "']");

                result.lValue = 0;
                result.sValue = "Error: [textstatus='" + textStatus + "'][errorThrown='" + errorThrown + "']";

                result.data = {};
                result.data.sURL = sServerURL;
                result.data.textstatus = textStatus;
                result.data.errorThrown = errorThrown;

                if (FCommon.UI.isValidObject(jqXHR.responseText) == true) {
                    result.data.responseText = jqXHR.responseText;
                    COMMON.prototype.showMessageBootstrap(jqXHR.responseText, "Error");
                }

                if (FCommon.String.isNullOrEmpty(fnCallback_success) == false) {
                    if (FCommon.UI.isValidObject(tag) == true) {
                        if ((typeof fnCallback_success).toLowerCase() === "function") {
                            fnCallback_success(false, textStatus, tag);
                        }
                        else {
                            eval(fnCallback_success)(false, textStatus, tag);
                        }
                    }
                    else {
                        if ((typeof fnCallback_success).toLowerCase() === "function") {
                            fnCallback_success(false, textStatus);
                        }
                        else {
                            eval(fnCallback_success)(false, textStatus);
                        }
                    }
                }
            };

            $.ajax(jqParam);
        }
        catch (err) {
            result.lValue = -1;
            result.sValue = "Exception: " + err.message;
            result.data = null;
        }

        return (result);
    }

    this.downloadFile = function (ServerURL, data, sSaveAsFileName, sDownloadFileType, fnCallback_beforeSend, fnCallback_complete) {
        try {
            NETWORK.executeServerMethod(ServerURL,
                                            true,
                                            data,
                                            "",
                                            true,
                                            "NETWORK.downloadFileSuccess",
                                            fnCallback_beforeSend,
                                            fnCallback_complete,
                                            { sSaveAsFileName: FConvert.toString(sSaveAsFileName), sFileType: FConvert.toString(sDownloadFileType) });
        }
        catch (err) {
            alert("Exception: {NETWORK.downloadFile} " + err.message);
        }
    },

    this.downloadFileSuccess = function (bSuccess, data, objCustomData) {
        var sType = "";
        var eleAnchor = null;

        if (bSuccess == false) {
            return;
        }

        if (FCommon.String.isNullOrEmpty(data) == false) {
            sType = objCustomData.sFileType;
            if (FCommon.String.isNullOrEmpty(sType, true) == true) {
                sType = "application/octet-stream";
            }

            var dataBlob = new Blob([data], { type: sType });

            eleAnchor = document.createElement("a");
            eleAnchor.href = window.URL.createObjectURL(dataBlob);

            if (FCommon.String.isNullOrEmpty(objCustomData.sSaveAsFileName, true) == true) {
                eleAnchor.download = "temp";
            }
            else {
                eleAnchor.download = objCustomData.sSaveAsFileName;
            }

            eleAnchor.style.display = "none";

            document.body.appendChild(eleAnchor);
            eleAnchor.click();
            setTimeout(function () {
                document.body.removeChild(eleAnchor);
                //window.URL.revokeObjectURL(url);
            }, 0);
        }
        else {
            alert("Error in downloading file.");
        }
    }
}();


var DATEPICKER = {
    PRIVATE: {
        onFocus: function (id, event) {
            var sCallback = "";

            try {
                id = FCommon.UI.getValidElement(id);
                if (FCommon.UI.isValidObject(id) == false) {
                    alert("Error: {DATEPICKER.PRIVATE.onFocus} Invalid control id.");

                    return (false);
                }

                COMMON.prototype.setClassElementsDisplayToNone(DATEPICKER.getDataContainerClassName());

                sCallback = DATEPICKER.getOnFocusCallback(id);
                if (FCommon.String.isNullOrEmpty(sCallback, true) == false) {
                    eval(sCallback)(id, event);
                }
            }
            catch (err) {
                alert("Exception: {DATEPICKER.PRIVATE.onFocus} " + err.message);
            }

            return (true);
        },

        onKeydown: function (id, evt) {
            var sValue = "";
            var iIndex = 0;
            var iNewIndex = 0;

            try {
                switch (evt.keyCode) {
                    case 8: // backspace
                        FCommon.UI.stopKeyProcess(evt);
                        iIndex = COMMON.prototype.getCursorIndexInInput(id);
                        if (iIndex <= 0) {
                            return;
                        }

                        sValue = id.value;
                        if (DATEPICKER.isValidInput(sValue.substr(iIndex - 1, 1)) == false) {
                            iIndex = DATEPICKER.getPreviousValidInputIndex(id, iIndex);
                            FCommon.UI.selectTextInInput(id, iIndex, iIndex);
                            return;
                        }

                        id.value = FCommon.String.replaceAt(id.value, iIndex - 1, '0');
                        FCommon.UI.selectTextInInput(id, iIndex - 1, iIndex - 1);
                        DATEPICKER.correctControlValue(id);
                        break;
                    case 27: // Esc key
                        FCommon.UI.stopKeyProcess(evt);
                        DATEPICKER.hidePopup(id);
                        break;
                    case 37: // Left Arrow key
                        iIndex = COMMON.prototype.getCursorIndexInInput(id);
                        if (iIndex <= 0) {
                            return;
                        }

                        sValue = id.value;
                        if (DATEPICKER.isValidInput(sValue.substr(iIndex - 1, 1)) == false) {
                            FCommon.UI.stopKeyProcess(evt);
                            iNewIndex = DATEPICKER.getPreviousValidInputIndex(id, iIndex);
                            if (iNewIndex != iIndex) {
                                FCommon.UI.selectTextInInput(id, iNewIndex - 1, iNewIndex - 1);
                            }
                            else {
                                FCommon.UI.selectTextInInput(id, iIndex, iIndex);
                            }
                        }
                        break;
                    case 38: // Up Arrow Key
                        FCommon.UI.stopKeyProcess(evt);
                        DATEPICKER.changeDateFromArrowKey(id, 38);
                        break;
                    case 39: // Right Arrow Key
                        //iIndex = COMMON.prototype.getCursorIndexInInput(id);
                        //sValue = id.value;
                        break;
                    case 40: // Down Arrow Key
                        FCommon.UI.stopKeyProcess(evt);
                        DATEPICKER.changeDateFromArrowKey(id, 40);
                        //DATEPICKER.showPopup(id, true);
                        break;
                    case 46: // Del Key
                        FCommon.UI.stopKeyProcess(evt);
                        break;
                    case 115: // F4
                        FCommon.UI.stopKeyProcess(evt);
                        DATEPICKER.togglePopup(id, evt);
                        break;
                }
            }
            catch (err) {
                alert("Exception: {DATEPICKER.PRIVATE.onKeydown} " + err.message);
            }
        },

        onKeypress: function (id, event) {
            var sValue = "";
            var sChar = "";
            var iIndex = 0;

            try {
                sValue = id.value;

                if (FCommon.UI.isValidObject(event.keyCode) == true && DATEPICKER.isInvalidkeyCode(event.keyCode) == true) {
                    return;
                }
                else if (FCommon.UI.isValidObject(event.charCode) == true && event.charCode) {
                    if (DATEPICKER.isValidInput(String.fromCharCode(event.charCode)) == false) {
                        FCommon.UI.stopKeyProcess(event);
                        return;
                    }

                    sChar = String.fromCharCode(event.charCode);
                }
                else {
                    if (DATEPICKER.isValidInput(String.fromCharCode(event.keyCode)) == false) {
                        FCommon.UI.stopKeyProcess(event);
                        return;
                    }

                    sChar = String.fromCharCode(event.keyCode);
                }

                iIndex = COMMON.prototype.getCursorIndexInInput(id);
                if (iIndex >= sValue.length) {
                    FCommon.UI.stopKeyProcess(event);
                    return;
                }

                if (DATEPICKER.isValidInput(sValue.substr(iIndex, 1)) == false) {
                    FCommon.UI.stopKeyProcess(event);
                    iIndex = DATEPICKER.getNextValidInputIndex(id, iIndex);
                    FCommon.UI.selectTextInInput(id, iIndex, iIndex);
                    return;
                }

                FCommon.UI.stopKeyProcess(event);
                id.value = FCommon.String.replaceAt(id.value, iIndex, sChar);
                iIndex = DATEPICKER.getNextValidInputIndex(id, iIndex + 1);
                FCommon.UI.selectTextInInput(id, iIndex, iIndex);
                DATEPICKER.correctControlValue(id);
            }
            catch (err) {
                alert("Exception: {DATEPICKER.PRIVATE.onKeypress} " + err.message);
            }
        },

        onMouseup: function (id, event) {
            var result = null;

            try {
                result = DATEPICKER.getCursorPosition(id);
                if (result.arrPos.length > 0) {
                    FCommon.UI.selectTextInInput(id, result.arrPos[0], result.arrPos[1]);
                }

                DATEPICKER.hidePopup(id);
            }
            catch (err) {
                err.message = "Exception: {DATEPICKER.PRIVATE.onMouseup} " + err.message;
                throw err;
            }
        },

        onKillFocus: function (id, event) {
            try {
                id = FCommon.UI.getValidElement(id);
                if (FCommon.UI.isValidObject(id) == false) {
                    alert("Error: {DATEPICKER.PRIVATE.onKillFocus} Invalid control id.");

                    return (false);
                }

                if (DATEPICKER.isPopupVisible(id) == true) {

                    return (true);
                }

                sCallback = DATEPICKER.getOnLeaveCallback(id);
                if (FCommon.String.isNullOrEmpty(sCallback, true) == false) {
                    eval(sCallback)(id, event);
                }
            }
            catch (err) {
                alert("Exception: {DATEPICKER.PRIVATE.onKillFocus} " + err.message);
            }

            return (true);
        },

        onClear_Click: function(id, evt) {
            try {
                if (DATEPICKER.isDoNotSelectDefaultDate(id) == false) {
                    return;
                }

                DATEPICKER.clear(id);
            }
            catch (err) {
                alert("Exception: {DATEPICKER.PRIVATE.onClear_Click} " + err.message);
            }
        },

        updateDate: function (id, obj) {
            var sCallback = "";
            var iDate = 0;

            try {
                if (DATEPICKER.isDayNotRequired(id) == true) {
                    id.value = FOCUSDATETIME.formatDate(new Date(obj.iYear, obj.iMonth - 1, obj.iMaxDay),
                                                        DATEPICKER.getFormat(id),
                                                        DATEPICKER.getCalendarType(id),
                                                        DATEPICKER.getLanguageId(id));

                    iDate = DATE.prototype.convertIntoFocusDate(obj.iMaxDay, obj.iMonth, obj.iYear);
                    DATEPICKER.PRIVATE.setValue(id, iDate);

                    FCommon.UI.setFocus(id);
                    sCallback = DATEPICKER.getOnDataChangeCallback(id);
                    if (FCommon.String.isNullOrEmpty(sCallback) == false) {
                        eval(sCallback)(id, DATEPICKER.getDate(id));
                    }
                }
            }
            catch (err) {
                alert("Exception: {DATEPICKER.PRIVATE.updateDate} " + err.message);
            }
        },

        onMonthYear_SelChange: function (id, evt) {
            var month = null;
            var year = null;
            var obj = null;

            try {
                evt.stopPropagation();
                id = FCommon.UI.getValidElement(id);
                month = DATEPICKER.PRIVATE.getMonthDropdownElement(id);
                year = DATEPICKER.PRIVATE.getYearDropdownElement(id);

                obj = DATEPICKER.fillDate(id, month, year);
                DATEPICKER.PRIVATE.updateDate(id, obj);
            }
            catch (err) {
                alert("Exception: {DATEPICKER.PRIVATE.onMonthYear_SelChange} " + err.message);
            }
        },

        // Returns day start & end index
        getDayIndex: function (id) {
            var vValue = "";
            var result = null;
            var arrPos = [];

            vValue = DATEPICKER.getFormat(id);

            result = vValue.match(/d+/i);
            if (result == null) {
                return (null);
            }

            arrPos.push(result.index);
            arrPos.push(result.index + result[0].length);

            return (arrPos);
        },

        // Returns month start & end index
        getMonthIndex: function (id) {
            var vValue = "";
            var result = null;
            var arrPos = [];

            vValue = DATEPICKER.getFormat(id);

            result = vValue.match(/m+/i);
            if (result == null) {
                return (null);
            }

            arrPos.push(result.index);
            arrPos.push(result.index + result[0].length);

            return (arrPos);
        },

        // Returns year start & end index
        getYearIndex: function (id) {
            var vValue = "";
            var result = null;
            var arrPos = [];

            vValue = DATEPICKER.getFormat(id);

            result = vValue.match(/y+/i);
            if (result == null) {
                return (null);
            }

            arrPos.push(result.index);
            arrPos.push(result.index + result[0].length);

            return (arrPos);
        },

        // Returns calendar heading text element (January 2017)
        getHeadingTextElement: function (id) {
            var element = null;

            try {
                element = document.getElementById(id.id + "_text");
            }
            catch (err) {
                err.message = "Exception: {DATEPICKER.PRIVATE.getHeadingTextElement} " + err.message;
                throw err;
            }

            return (element);
        },

        // Returns week days heading row element
        getWeekDaysHeadingRowElement: function (id) {
            var element = null;

            try {
                id = FCommon.UI.getValidElement(id);
                if (FCommon.UI.isValidObject(id) == true) {
                    element = document.getElementById(id.id + "_weekdays_heading");
                }
            }
            catch (err) {
                err.message = "Exception: {DATEPICKER.PRIVATE.getWeekDaysHeadingRowElement} " + err.message;
                throw err;
            }

            return (element);
        },

        // Returns month dropdown element
        getMonthDropdownElement: function (id) {
            var element = null;

            try {
                id = FCommon.UI.getValidElement(id);
                if (FCommon.UI.isValidObject(id) == true) {
                    element = document.getElementById(id.id + "_month");
                }
            }
            catch (err) {
                err.message = "Exception: {DATEPICKER.PRIVATE.getMonthDropdownElement} " + err.message;
                throw err;
            }

            return (element);
        },

        // Returns year dropdown element
        getYearDropdownElement: function (id) {
            var element = null;

            try {
                id = FCommon.UI.getValidElement(id);
                if (FCommon.UI.isValidObject(id) == true) {
                    element = document.getElementById(id.id + "_year");
                }
            }
            catch (err) {
                err.message = "Exception: {DATEPICKER.PRIVATE.getYearDropdownElement} " + err.message;
                throw err;
            }

            return (element);
        },

        // Returns month year dropdown row element
        getMonthYearDropdownRowElement: function (id) {
            var element = null;

            try {
                id = FCommon.UI.getValidElement(id);
                if (FCommon.UI.isValidObject(id) == true) {
                    element = document.getElementById(id.id + "_select_row");
                }                
            }
            catch (err) {
                err.message = "Exception: {DATEPICKER.PRIVATE.getMonthYearDropdownRowElement} " + err.message;
                throw err;
            }

            return (element);
        },

        // Fill all month names in month dropdown January,February.....
        fillAllMonthNamesInDropdown: function (id) {
            var eleMonthDropdown = null;
            var eleOption = null;
            var iCalendarType = 0;
            var iLanguageId = 0;
            var iCounter = 0;
            var arrData = [];

            try {
                eleMonthDropdown = DATEPICKER.PRIVATE.getMonthDropdownElement(id);
                if (FCommon.UI.isValidObject(eleMonthDropdown) == false) {
                    return (false);
                }

                FCommon.UI.removeChildren(eleMonthDropdown);

                iCalendarType = DATEPICKER.getCalendarType(id);
                iLanguageId = DATEPICKER.getLanguageId(id);

                arrData = DATE.prototype.getMonthNames(iCalendarType, iLanguageId);
                if (FCommon.UI.isValidObject(arrData) == false || arrData.length <= 0) {
                    return (false);
                }

                for (iCounter = 0; iCounter < arrData.length; iCounter++) {
                    eleOption = document.createElement("option");
                    eleOption.setAttribute("value", iCounter);
                    FCommon.UI.setText(eleOption, arrData[iCounter]);
                    eleMonthDropdown.appendChild(eleOption);
                }
            }
            catch (err) {
                err.message = "Exception: {DATEPICKER.PRIVATE.fillAllMonthNamesInDropdown} " + err.message;
                throw err;
            }

            return (true);
        },

        // Fill all years in year dropdown 2000,2001.....
        fillYearsInDropdown: function (id) {
            var eleYearDropdown = null;
            var eleOption = null;
            var iCalendarType = 0;
            var iMinYear = 0;
            var iMaxYear = 0;

            try {
                eleYearDropdown = DATEPICKER.PRIVATE.getYearDropdownElement(id);
                if (FCommon.UI.isValidObject(eleYearDropdown) == false) {
                    return (false);
                }

                FCommon.UI.removeChildren(eleYearDropdown);

                iCalendarType = DATEPICKER.getCalendarType(id);
                iMinYear = DATE.prototype.getMinYear(iCalendarType);
                iMaxYear = DATE.prototype.getMaxYear(iCalendarType);

                for (; iMinYear <= iMaxYear; iMinYear++) {
                    eleOption = document.createElement("option");
                    eleOption.setAttribute("value", iMinYear);
                    FCommon.UI.setText(eleOption, iMinYear);
                    eleYearDropdown.appendChild(eleOption);
                }
            }
            catch (err) {
                err.message = "Exception: {DATEPICKER.PRIVATE.fillYearsInDropdown} " + err.message;
                throw err;
            }

            return (true);
        },

        // resets day cell
        resetDayElement: function(eleDay) {
            try {
                eleDay.style.backgroundColor = "";
                eleDay.style.fontWeight = "";
                eleDay.style.color = "";
                eleDay.style.cursor = 'default';
                eleDay.onclick = "";
                FCommon.UI.setText(eleDay, "");
                eleDay.setAttribute("data-day", "");
                eleDay.setAttribute("data-month", "");
                eleDay.setAttribute("data-year", "");
            }
            catch (err) {
                alert("Exception: {DATEPICKER.PRIVATE.resetDayElement} " + err.message);
            }
        },

        // Fill days in control based on passed date
        fillDay: function (id, date) {
            var iDayOfWeek = 0;
            var iCounter = 0;
            var iDay = 1;
            var iMaxDay = 0;
            var element = null;
            var row = null;

            try {
                id = FCommon.UI.getValidElement(id);

                iDayOfWeek = FOCUSDATETIME.getDayofWeekofFirstDay(date[0], date[3]) + 1;
                for (iCounter = 1; iCounter < iDayOfWeek; iCounter++) {
                    element = document.getElementById(id.id + "_day" + iCounter);
                    DATEPICKER.PRIVATE.resetDayElement(element);
                }

                iMaxDay = FOCUSDATETIME.getMaxDayOfMonth(date[1], date[2], DATEPICKER.getCalendarType(id));
                for (iDay = 1; iCounter <= 42; iCounter++, iDay++) {
                    element = document.getElementById(id.id + "_day" + iCounter);
                    DATEPICKER.PRIVATE.resetDayElement(element);

                    if (iDay <= iMaxDay) {
                        FCommon.UI.setText(element, iDay);
                        element.setAttribute("data-day", iDay);
                        element.setAttribute("data-month", date[1]);
                        element.setAttribute("data-year", date[2]);

                        element.style.cursor = 'pointer';
                        element.onclick = function (event) {
                            DATEPICKER.dayClick(this, id, event);
                        };
                    }

                    if (iCounter > 1 && (iCounter % 7) == 1) {
                        row = DATEPICKER.getDayRowElement(id, parseInt(iCounter / 7) + 1);
                        if (iDay <= iMaxDay) {
                            row.style.display = '';
                        } else {
                            row.style.display = 'none';
                        }
                    }
                }

                DATEPICKER.PRIVATE.highlightSelectedDay(id);
            }
            catch (err) {
                alert("Exception: {DATEPICKER.PRIVATE.fillDay} " + err.message);
            }

            return (iMaxDay);
        },

        //es week days heading Sun, Mon.....
        createWeekDaysHeading: function (id) {
            var eleWeekDaysRow = null;
            var eleWeekDay = null;
            var iCalendarType = 0;
            var iLanguageId = 0;
            var arrData = [];
            var iCounter = 0;

            try {
                eleWeekDaysRow = DATEPICKER.PRIVATE.getWeekDaysHeadingRowElement(id);
                if (FCommon.UI.isValidObject(eleWeekDaysRow) == false) {
                    return (false);
                }

                FCommon.UI.removeChildren(eleWeekDaysRow);

                iCalendarType = DATEPICKER.getCalendarType(id);
                iLanguageId = DATEPICKER.getLanguageId(id);

                arrData = DATE.prototype.getWeekDaysName(iLanguageId);
                if (FCommon.UI.isValidObject(arrData) == false || arrData.length <= 0) {
                    return (false);
                }

                for (iCounter = 0; iCounter < arrData.length; iCounter++) {
                    eleWeekDay = document.createElement("td");
                    eleWeekDay.id = id.id + "_dayheading" + iCounter + 1;
                    eleWeekDay.className = "calendar_day_heading";
                    eleWeekDay.setAttribute("align", "center");
                    FCommon.UI.setText(eleWeekDay, arrData[iCounter]);
                    eleWeekDaysRow.appendChild(eleWeekDay);
                }
            }
            catch (err) {
                err.message = "Exception: {DATEPICKER.PRIVATE.createWeekDaysHeading} " + err.message;
                throw err;
            }

            return (true);
        },

        // Selects given year in year dropdown
        selectYearInDropdown: function (id, iYear) {
            var eleYearDropdown = null;
            var iCounter = 0;

            try {
                eleYearDropdown = DATEPICKER.PRIVATE.getYearDropdownElement(id);
                if (FCommon.UI.isValidObject(eleYearDropdown) == false) {
                    return (-1);
                }

                for (iCounter = 0; iCounter < eleYearDropdown.options.length; iCounter++) {
                    if (eleYearDropdown.options[iCounter].value == iYear) {
                        eleYearDropdown.selectedIndex = iCounter;

                        return (iCounter);
                    }
                }
            }
            catch (err) {
                alert("Exception: {DATEPICKER.PRIVATE.selectYearInDropdown} " + err.message);
            }

            return (-1);
        },

        // Returns popup element
        getPopupElement: function (id) {
            var element = null;

            try {
                element = document.getElementById(id.id + "_container");
            }
            catch (err) {
                err.message = "Exception: {DATEPICKER.PRIVATE.getPopupElement} " + err.message;
                throw err;
            }

            return (element);
        },

        highlightSelectedDay: function (id) {
            var sId = "";
            var iDate = 0;
            var iSelectedDay = 0;
            var iSelectedMonth = 0;
            var iSelectedYear = 0;
            var bDoNotHighlight = false;
            var iRow = 1;
            var iCounter = 0;
            var eleRow = null;
            var eleColumn = null;

            try {
                iDate = DATEPICKER.getDate(id);
                bDoNotHighlight = (iDate == 0) ? true : false;

                iSelectedDay = DATE.prototype.getDayFromFocusDate(iDate);
                iSelectedMonth = DATE.prototype.getMonthFromFocusDate(iDate);
                iSelectedYear = DATE.prototype.getYearFromFocusDate(iDate);

                for (iRow = 1; iRow <= 6; iRow++) {
                    sId = id.id + "_day_row" + iRow;
                    eleRow = document.getElementById(sId);
                    if (FCommon.UI.isValidObject(eleRow) == false) {
                        continue;
                    }

                    for (iCounter = 0; iCounter < eleRow.children.length; iCounter++) {
                        eleColumn = eleRow.children[iCounter];
                        eleColumn.style.backgroundColor = "";
                        eleColumn.className = "";
                        eleColumn.style.fontWeight = "";
                        eleColumn.style.color = "";

                        if (bDoNotHighlight == true) {
                            continue;
                        }

                        if (FConvert.toInt(eleColumn.getAttribute("data-day")) == iSelectedDay
                            && FConvert.toInt(eleColumn.getAttribute("data-month")) == iSelectedMonth
                            && FConvert.toInt(eleColumn.getAttribute("data-year")) == iSelectedYear) {
                            eleColumn.style.fontWeight = "bold";
                            eleColumn.className = "theme_background-color theme_color";
                        }
                    }
                }
            }
            catch (err) {
                alert("Exception: {DATEPICKER.PRIVATE.highlightSelectedDay} " + err.message);
            }
        },

        // Initialize control
        initControl: function (id, value) {
            var bDoNotSelectDate = false;
            var date = null;

            try {
                id = FCommon.UI.getValidElement(id);
                DATEPICKER.PRIVATE.fillAllMonthNamesInDropdown(id);
                DATEPICKER.PRIVATE.fillYearsInDropdown(id);
                DATEPICKER.PRIVATE.createWeekDaysHeading(id);

                value = FConvert.toInt(value);
                if (DATEPICKER.setDate(id, value, false) == true) {
                    return;
                }

                if (value == 0 && DATEPICKER.isDoNotSelectDefaultDate(id) == true) {
                    bDoNotSelectDate = true;
                }

                date = date = DATEPICKER.PRIVATE.getTodayDate(id);
                DATEPICKER.PRIVATE.selectDate(id, date, bDoNotSelectDate);
            }
            catch (err) {
                alert("Exception: {DATEPICKER.PRIVATE.initControl} " + err.message);
            }
        },

        // Selects given date part in control
        selectDate: function (id, date, bDoNotSelectDate) {
            var iCalendarType = 0;
            var iLanguageId = 0;
            var month = null;
            var year = null;
            var bResult = false;

            try {
                if (FCommon.Array.getLength(date) == 0) {
                    return (false);
                }

                bDoNotSelectDate = FConvert.toBoolean(bDoNotSelectDate);

                id = FCommon.UI.getValidElement(id);

                month = DATEPICKER.PRIVATE.getMonthDropdownElement(id);
                year = DATEPICKER.PRIVATE.getYearDropdownElement(id);

                month.selectedIndex = date[1] - 1;
                DATEPICKER.PRIVATE.selectYearInDropdown(id, date[2]);
                DATEPICKER.setHeadingText(id, month, year);
                DATEPICKER.PRIVATE.fillDay(id, date);


                if (FCommon.String.isNullOrEmpty(DATEPICKER.getFormat(id), true) == true) {
                    DATEPICKER.setFormat(id, null);
                }

                if (bDoNotSelectDate == true) {
                    id.value = "";
                }
                else {
                    iCalendarType = DATEPICKER.getCalendarType(id);
                    iLanguageId = DATEPICKER.getLanguageId(id);

                    id.value = FOCUSDATETIME.formatDate(new Date(date[2], date[1] - 1, date[0]), DATEPICKER.getFormat(id), iCalendarType, iLanguageId);
                }
                
                bResult = true;
            }
            catch (err) {
                err.message = "Exception: {DATEPICKER.PRIVATE.selectDate} " + err.message;
                throw err;
            }

            return (bResult);
        },

        // Sets value to hidden control
        setValue: function (id, value) {
            var element = null;

            try {
                id = FCommon.UI.getValidElement(id);
                element = document.getElementById(id.id + "_data");
                if (FCommon.UI.isValidObject(element) == true) {
                    element.value = value;
                }
            }
            catch (err) {
                alert("Exception: {DATEPICKER.PRIVATE.setValue} " + err.message);
            }
        },

        getValue: function(id) {
            var element = null;
            var value = 0;

            try {
                id = FCommon.UI.getValidElement(id);
                element = document.getElementById(id.id + "_data");
                if (FCommon.UI.isValidObject(element) == true) {
                    value = FConvert.toInt(element.value);
                }
            }
            catch (err) {
                alert("Exception: {DATEPICKER.PRIVATE.getValue} " + err.message);
            }

            return(value);
        },

        getTodayDate: function (id) {
            var iCalendarType = 0;
            var date = null;

            iCalendarType = DATEPICKER.getCalendarType(id);
            date = FOCUSDATETIME.getTodayDate(iCalendarType);

            return (date);
        }
    },

    createControl: function (sControlId, iValue, bMandatory, sWidth, iCalendarType, bShowBorder, sClassName) {
        var parameter = "";
        var value = null;
        var data = null;

        try {
            if (FCommon.UI.isValidObject(sControlId) == false || FCommon.String.isNullOrEmpty(sControlId) == true) {
                alert("Error: Control id is mandatory.");

                return (null);
            }

            parameter = NETWORK.createParameterForHTTPPostRequest("sId", sControlId, parameter);

            value = 0;
            if (FCommon.UI.isValidObject(iValue) == true) {
                value = iValue;
            }
            parameter = NETWORK.createParameterForHTTPPostRequest("iValue", value, parameter);

            value = false;
            if (FCommon.UI.isValidObject(bMandatory) == true) {
                value = bMandatory;
            }
            parameter = NETWORK.createParameterForHTTPPostRequest("bMandatory", value, parameter);

            value = "";
            if (FCommon.UI.isValidObject(sWidth) == true && FCommon.String.isNullOrEmpty(sWidth) == false) {
                value = sWidth;
            }
            parameter = NETWORK.createParameterForHTTPPostRequest("sWidth", value, parameter);

            value = 0;
            if (FCommon.UI.isValidObject(iCalendarType) == true) {
                value = iCalendarType;
            }
            parameter = NETWORK.createParameterForHTTPPostRequest("iCalendarType", value, parameter);

            value = true;
            if (FCommon.UI.isValidObject(bShowBorder) == true) {
                value = bShowBorder;
            }
            parameter = NETWORK.createParameterForHTTPPostRequest("bShowBorder", value, parameter);

            value = "";
            if (FCommon.UI.isValidObject(sClassName) == true && FCommon.String.isNullOrEmpty(sClassName) == false) {
                value = sClassName;
            }
            parameter = NETWORK.createParameterForHTTPPostRequest("sClassName", value, parameter);

            //data = NETWORK.executeServerMethod('/Focus8W/RD/RD/CreateDatePicker', true, parameter, 'json');
            data = NETWORK.executeServerMethod(GLOBAL.getContextPath("CreateDatePicker", "RD", "RD"), true, parameter, 'json');
            if (data != null) {
                if (data.lValue < 1 && FCommon.String.isNullOrEmpty(data.sValue) == false) {
                    alert(data.sValue);
                }

                if (data.lValue > 0) {
                    data = data.data;
                }
                else {
                    data = null;
                }
            }
        }
        catch (err) {
            alert("Exception: {DATEPICKER::createControl} " + err.message);
        }

        return (data);
    },

    correctControlValue: function (id) {
        var sValue = "";
        var iDay = 0;
        var iMonth = 0;
        var iYear = 0;
        var iIndex = 0;
        var iCalendarType = 0;
        var iMinYear = 0;
        var iMaxYear = 0;
        var arrPos = null;
        var sOnDataChangeCallback = "";

        try {
            iCalendarType = DATEPICKER.getCalendarType(id);

            iMinYear = DATE.prototype.getMinYear(iCalendarType);
            iMaxYear = DATE.prototype.getMaxYear(iCalendarType);

            iIndex = COMMON.prototype.getCursorIndexInInput(id);

            // Correct Month
            arrPos = DATEPICKER.PRIVATE.getMonthIndex(id);
            if (FCommon.UI.isValidObject(arrPos) == true && arrPos.length >= 2) {
                sValue = DATEPICKER.getInputMonthText(id);
                iMonth = parseInt(sValue);

                if (iMonth < 1 || iMonth > 12) {
                    id.value = FCommon.String.replaceAt(id.value, arrPos[0], '01');
                    FCommon.UI.selectTextInInput(id, iIndex, iIndex);
                    iMonth = 1;
                }
            }

            // Correct Year
            arrPos = DATEPICKER.PRIVATE.getYearIndex(id);
            if (FCommon.UI.isValidObject(arrPos) == true && arrPos.length >= 2) {
                sValue = DATEPICKER.getInputYearText(id);
                iYear = parseInt(sValue);

                if (iYear < iMinYear || iYear > iMaxYear) {
                    id.value = FCommon.String.replaceAt(id.value, arrPos[0], iMinYear.toString());
                    FCommon.UI.selectTextInInput(id, iIndex, iIndex);
                    iYear = iMinYear;
                }
            }

            // Correct Day
            arrPos = DATEPICKER.PRIVATE.getDayIndex(id);
            if (FCommon.UI.isValidObject(arrPos) == true && arrPos.length >= 2) {
                sValue = DATEPICKER.getInputDayText(id);
                iDay = parseInt(sValue);

                if (iDay < 1 || iDay > FOCUSDATETIME.getMaxDayOfMonth(iMonth, iYear, iCalendarType)) {
                    id.value = FCommon.String.replaceAt(id.value, arrPos[0], '01');
                    FCommon.UI.selectTextInInput(id, iIndex, iIndex);
                }
            }

            sOnDataChangeCallback = DATEPICKER.getOnDataChangeCallback(id);
            if (FCommon.String.isNullOrEmpty(sOnDataChangeCallback) == false) {
                eval(sOnDataChangeCallback)(id, DATEPICKER.getDate(id));
            }
        }
        catch (err) {
            err.message = "Exception: {DATEPICKER::correctControlValue} " + err.message;
            throw err;
        }
    },

    isValidInput: function (character) {
        var iValue = 0;

        if (FCommon.String.isNullOrEmpty(character) == true) {
            return (false);
        }

        iValue = COMMON.prototype.getASCIIValue(character);

        if (iValue < 48 || iValue > 57) {
            return (false);
        }

        return (true);
    },

    isInvalidkeyCode: function (keyCode) {
        try {
            switch (keyCode) {
                case 9: // Tab key
                case 10: // Enter key
                case 13: // Enter key
                    //case 27: // Escape key
                case 33: // Page up
                case 34: // Page down
                    //case 35: // End key
                    //case 36: // Home key
                case 37: // left arrow
                    //case 38: // up arrow
                case 39: // right arrow
                    //case 40: // down arrow
                case 44: // Print screen key
                case 45: // Insert key
                    return (true);
            }
        }
        catch (err) {
            err.message = "Exception: {DATEPICKER::isInvalidkeyCode} " + err.message;
            throw err;
        }

        return (false);
    },

    getCursorPosition: function (id) {
        var iIndex = 0;
        var arrPos = null;
        var result = {};

        try {
            result.Type = 0;
            result.arrPos = [];

            iIndex = COMMON.prototype.getCursorIndexInInput(id);

            arrPos = DATEPICKER.PRIVATE.getYearIndex(id);
            if (FCommon.UI.isValidObject(arrPos) == true && arrPos.length == 2) {
                if (iIndex >= arrPos[0] && iIndex <= arrPos[1]) {
                    result.Type = 2; // Year
                    result.arrPos = arrPos;
                    return (result);
                }
            }

            arrPos = DATEPICKER.PRIVATE.getMonthIndex(id);
            if (FCommon.UI.isValidObject(arrPos) == true && arrPos.length == 2) {
                if (iIndex >= arrPos[0] && iIndex <= arrPos[1]) {
                    result.Type = 1; // Month
                    result.arrPos = arrPos;
                    return (result);
                }
            }

            arrPos = DATEPICKER.PRIVATE.getDayIndex(id);
            if (FCommon.UI.isValidObject(arrPos) == true && arrPos.length == 2) {
                if (iIndex >= arrPos[0] && iIndex <= arrPos[1]) {
                    result.Type = 0; // Day
                    result.arrPos = arrPos;
                    return (result);
                }
            }
        }
        catch (err) {
            alert("Exception: {DATEPICKER::getCursorPosition} " + err.message);
        }

        return (result);
    },

    changeDateFromArrowKey: function (id, keyCode) {
        var result = null;
        var iValue = 0;

        try {
            result = DATEPICKER.getCursorPosition(id);
            if (result.arrPos.length == 0) {
                return;
            }

            FCommon.UI.selectTextInInput(id, result.arrPos[0], result.arrPos[1]);
            switch (keyCode) {
                case 38: // Up Arrow (Increase)
                    switch (result.Type) {
                        case 0: // Day
                            break;
                        case 1: // Month
                            break;
                        case 2: // Year
                            DATEPICKER.getInputYearText(id);
                            iValue = FConvert.toInt(iValue);

                            break;
                    }
                    break;
                case 40: // Down Arrow (Decrease)
                    switch (result.Type) {
                        case 0: // Day
                            break;
                        case 1: // Month
                            break;
                        case 2: // Year
                            break;
                    }

                    break;
            }
        }
        catch (err) {
            alert("Exception: {DATEPICKER.changeDateFromArrowKey} " + err.message);
        }
    },

    getNextValidInputIndex: function (id, iIndex) {
        var sValue = "";
        var iCounter = 0;

        try {
            sValue = id.value;
            for (iCounter = iIndex; iCounter < sValue.length; iCounter++) {
                if (DATEPICKER.isValidInput(sValue.substr(iCounter, 1)) == true) {
                    return (iCounter);
                }
            }
        }
        catch (err) {
            err.message = "Exception: {DATEPICKER::getNextValidInputIndex} " + err.message;
            throw err;
        }

        return (iIndex);
    },

    getPreviousValidInputIndex: function (id, iIndex) {
        var sValue = "";
        var iCounter = 0;

        try {
            sValue = id.value;
            for (iCounter = iIndex; iCounter > 0; iCounter--) {
                if (DATEPICKER.isValidInput(sValue.substr(iCounter - 1, 1)) == true) {
                    return (iCounter);
                }
            }
        }
        catch (err) {
            err.message = "Exception: {DATEPICKER::getPreviousValidInputIndex} " + err.message;
            throw err;
        }

        return (iIndex);
    },

    // {Internal} Returns input container element
    getInputContainerElement: function (id) {
        var element = null;

        try {
            element = document.getElementById(id.id + "_input_container");
        }
        catch (err) {
            err.message = "Exception: {DATEPICKER::getInputContainerElement} " + err.message;
            throw err;
        }

        return (element);
    },

    getDayRowElement: function (id, iRow) {
        var element = null;

        try {
            id = FCommon.UI.getValidElement(id);
            if (FCommon.UI.isValidObject(id) == true) {
                element = document.getElementById(id.id + "_day_row" + iRow);
            }
        }
        catch (err) {
            err.message = "Exception: {DATEPICKER::getDayRowElement} " + err.message;
            throw err;
        }

        return (element);
    },

    isPopupVisible: function(id) {
        var ctrlPopuup = null;

        try {
            id = FCommon.UI.getValidElement(id);
            if (FCommon.UI.isValidObject(id) == false) {
                alert("Error: {DATEPICKER.isPopupVisible} Invalid control id.");

                return (false);
            }
            ctrlPopuup = DATEPICKER.PRIVATE.getPopupElement(id);
            if (FCommon.UI.isValidObject(ctrlPopuup) == false) {
                alert("Error: {DATEPICKER.isPopupVisible} Data container not found.");

                return (false);
            }

            if (FCommon.String.isNullOrEmpty(ctrlPopuup.style.display) == true || ctrlPopuup.style.display.toLowerCase() != "none") {
                return (true);
            }
        }
        catch (err) {
            alert("Exception: {DATEPICKER.isPopupVisible} " + err.message);
        }

        return (false);
    },

    hidePopup: function (id) {
        var ctrlPopuup = null;

        try {
            id = FCommon.UI.getValidElement(id);
            if (FCommon.UI.isValidObject(id) == false || FCommon.String.isNullOrEmpty(id.id) == true) {
                alert("Error: {DATEPICKER.hidePopup} Control id cannot be blank.");

                return (false);
            }

            ctrlPopuup = DATEPICKER.PRIVATE.getPopupElement(id);
            if (FCommon.UI.isValidObject(ctrlPopuup) == false) {
                alert("Error: {DATEPICKER.hidePopup} Data container not found.");

                return (false);
            }

            ctrlPopuup.style.display = "none";

            return (true);
        }
        catch (err) {
            alert("Exception: {DATEPICKER.hidePopup} " + err.message);
        }

        return (false);
    },

    togglePopup: function (id, evt) {
        var elePopup = null;

        try {
            id = FCommon.UI.getValidElement(id);
            if (id.disabled == true) {
                return;
            }

            if (id != document.activeElement) {
                id.focus();
            }

            elePopup = DATEPICKER.PRIVATE.getPopupElement(id);

            COMMON.prototype.setClassElementsDisplayToNone(DATEPICKER.getDataContainerClassName(), elePopup.id);
            FCommon.UI.toggleElementDisplay(elePopup);

            FCommon.UI.setFocusDropdownPopupPosition(id, elePopup);

            DATEPICKER.PRIVATE.highlightSelectedDay(id);
        }
        catch (err) {
            alert("Exception: {DATEPICKER.togglePopup} " + err.message);
        }
    },

    toggleSelectRow: function (id) {
        var element = null;

        try {
            element = DATEPICKER.PRIVATE.getMonthYearDropdownRowElement(id);
            if (FCommon.UI.isValidObject(element) == true) {
                FCommon.UI.toggleElementDisplay(element);
            }            
        }
        catch (err) {
            alert("Exception: {DATEPICKER.toggleSelectRow} " + err.message);
        }
    },

    // {Internal} Selects previous month
    gotoPreviousMonth: function (id) {
        var month = null;
        var year = null;
        var obj = null;

        try {
            id = FCommon.UI.getValidElement(id);

            month = DATEPICKER.PRIVATE.getMonthDropdownElement(id);
            year = DATEPICKER.PRIVATE.getYearDropdownElement(id);

            if (month.options[month.selectedIndex].value > 0) {
                month.selectedIndex--;
            }
            else {
                if (year.selectedIndex <= 0) {
                    return;
                }
                year.selectedIndex--;
                month.selectedIndex = 11;
            }

            obj = DATEPICKER.fillDate(id, month, year);
            DATEPICKER.PRIVATE.updateDate(id, obj);
        }
        catch (err) {
            alert("Exception: {DATEPICKER::gotoPreviousMonth} " + err.message);
        }
    },

    // {Internal} Selects next month
    gotoNextMonth: function (id) {
        var month = null;
        var year = null;
        var obj = null;

        try {
            id = FCommon.UI.getValidElement(id);

            month = DATEPICKER.PRIVATE.getMonthDropdownElement(id);
            year = DATEPICKER.PRIVATE.getYearDropdownElement(id);

            if (month.options[month.selectedIndex].value < 11) {
                month.selectedIndex++;
            }
            else {
                if (year.selectedIndex >= (year.length - 1)) {
                    return;
                }
                year.selectedIndex++;
                month.selectedIndex = 0;
            }

            obj = DATEPICKER.fillDate(id, month, year);
            DATEPICKER.PRIVATE.updateDate(id, obj);
        }
        catch (err) {
            alert("Exception: {DATEPICKER::gotoNextMonth} " + err.message);
        }
    },

    // {Internal} Called when any day is clicked
    dayClick: function (column, id, event) {
        var iDay = 0;
        var iMonth = 0;
        var iYear = 0;
        var date = null;
        var sCallback = "";

        try {
            iDay = parseInt(COMMON.prototype.getTableColumnText(column));
            iMonth = DATEPICKER.getSelectedMonth(id);
            iYear = DATEPICKER.getSelectedYear(id);

            date = new Date(iYear, iMonth, iDay);
            DATEPICKER.hidePopup(id);
            id.value = FOCUSDATETIME.formatDate(date, DATEPICKER.getFormat(id), DATEPICKER.getCalendarType(id), DATEPICKER.getLanguageId(id));
            FCommon.UI.setFocus(id);
            sCallback = DATEPICKER.getOnDataChangeCallback(id);
            if (FCommon.String.isNullOrEmpty(sCallback) == false) {
                eval(sCallback)(id, DATEPICKER.getDate(id));
            }
        }
        catch (err) {
            alert("Exception: {DATEPICKER.dayClick} " + err.message);
        }
    },

    // {Internal} Fill days in control based on month and year
    fillDate: function (id, monthElement, yearElement) {
        var date = null;
        var obj = null;

        try {
            obj = {};
            
            DATEPICKER.setHeadingText(id, monthElement, yearElement);

            obj.iCalendarType = DATEPICKER.getCalendarType(id);

            obj.iYear = parseInt(yearElement.options[yearElement.selectedIndex].value);
            obj.iMonth = parseInt(monthElement.options[monthElement.selectedIndex].value) + 1;
            obj.iMinDay = 1;
            obj.iMaxDay = 0;

            date = FOCUSDATETIME.getDate(obj.iCalendarType, obj.iYear, obj.iMonth, 1);
            if (FCommon.UI.isValidObject(date) == false || date.length == 0) {
                return(obj);
            }

            obj.iMaxDay = DATEPICKER.PRIVATE.fillDay(id, date);
        }
        catch (err) {
            alert("Exception: {DATEPICKER.fillDate} " + err.message);
        }

        return (obj);
    },

    // {Internal} Used for set heading text
    setHeadingText: function (id, month, year) {
        var heading = null;

        try {
            heading = DATEPICKER.PRIVATE.getHeadingTextElement(id);
            COMMON.prototype.setElementText(heading, month.options[month.selectedIndex].text + " " + year.options[year.selectedIndex].value);
        }
        catch (err) {
            err.message = "Exception: {DATEPICKER::setHeadingText} " + err.message;
            throw err;
        }
    },

    getDataContainerClassName: function () {
        return ('datecontainer');
    },

    // {Internal} Enables/disables control based on checkbox value
    enableDisable: function (id) {
        var sId = "";

        try {
            sId = FCommon.String.left(id.id, id.id.length - "_checkbox".length);
            if (id.checked == true) {
                DATEPICKER.disableControl(sId, false);
            }
            else {
                DATEPICKER.disableControl(sId, true);
            }
        }
        catch (err) {
            alert("Exception: {DATEPICKER::enableDisable} " + err.message);
        }
    },

    // {Internal} Returns is date slection mandatory
    isMandatory: function (id) {
        var vValue = false;

        try {
            id = FCommon.UI.getValidElement(id);
            if (FCommon.UI.isValidObject(id) == true) {
                vValue = id.getAttribute("data-mandatory");
            }

            if (FCommon.String.isNullOrEmpty(vValue) == true) {
                vValue = "true";
            }

            vValue = JSON.parse(vValue.toLowerCase());
        }
        catch (err) {
            err.message = "Exception: {DATEPICKER::isMandatory} " + err.message;
        }

        return (vValue);
    },

    // {Internal}
    isDoNotSelectDefaultDate: function(id) {
        var value = false;

        try {
            value = FCommon.UI.getAttributeData(id, "donotselectdefaultdate");
            value = FConvert.toBoolean(value);
        }
        catch (err) {
            alert("Exception: {DATEPICKER.isDoNotSelectDefaultDate} " + err.message);
        }

        return (value);
    },

    // {Internal} Returns onDataChange callback method name
    getOnDataChangeCallback: function (id) {
        var sValue = "";

        try {
            sValue = FCommon.UI.getAttributeData(id, "ondatachange");
        }
        catch (err) {
            err.message = "Exception: {DATEPICKER::getOnDataChangeCallback} " + err.message;
        }

        return (sValue);
    },

    // {Internal} Returns onFocus callback method name
    getOnFocusCallback: function (id) {
        var sValue = "";

        try {
            sValue = FCommon.UI.getAttributeData(id, "onfocus");
        }
        catch (err) {
            err.message = "Exception: {DATEPICKER.getOnFocusCallback} " + err.message;
        }

        return (sValue);
    },

    // {Internal} Returns onLeave callback method name
    getOnLeaveCallback: function (id) {
        var sValue = "";

        try {
            sValue = FCommon.UI.getAttributeData(id, "onleave");
        }
        catch (err) {
            err.message = "Exception: {DATEPICKER.getOnLeaveCallback} " + err.message;
        }

        return (sValue);
    },

    // {Public} Returns date control class name
    getClassName: function () {
        return ("dateinput");
    },

    // {Public} Returns calendar type
    getCalendarType: function (id) {
        var vValue = 0;

        try {
            vValue = FCommon.UI.getAttributeData(id, "calendartype");
            if (FCommon.UI.isValidObject(vValue) == false) {
                vValue = 0;
            }

            vValue = FConvert.toInt(vValue);
        }
        catch (err) {
            alert("Exception: {DATEPICKER.getCalendarType} " + err.message);
        }

        return (vValue);
    },

    // {Public} Returns calendar type
    getLanguageId: function (id) {
        var vValue = 0;

        try {
            vValue = FCommon.UI.getAttributeData(id, "languageid");
            if (FCommon.UI.isValidObject(vValue) == false) {
                vValue = 0;
            }

            vValue = parseInt(vValue);
        }
        catch (err) {
            err.message = "Exception: {DATEPICKER::getLanguageId} " + err.message;
            throw err;
        }

        return (vValue);
    },

    // {Public} Returns day not required flag
    isDayNotRequired: function(id) {
        var value = false;

        try {
            value = FConvert.toBoolean(FCommon.UI.getAttributeData(id, "daynotrequired"));
        }
        catch (err) {
            alert("Exception: {DATEPICKER.isDayNotRequired} " + err.message);
        }

        return (value);
    },

    // {Public} Sets calendar type
    setCalendarType: function (id, iCalendarType) {
        FCommon.UI.setAttributeData(id, "calendartype", iCalendarType);
    },

    // {Public} Returns calendar date format
    getFormat: function (id) {
        var value = 0;

        try {
            value = FCommon.UI.getAttributeData(id, "format");
            
            if (FCommon.String.isNullOrEmpty(value) == true) {
                if (DATEPICKER.isDayNotRequired(id) == true) {
                    value = "mm/yyyy";
                }
                else {
                    value = "dd/mm/yyyy";
                }
            }
        }
        catch (err) {
            alert("Exception: {DATEPICKER.getFormat} " + err.message);
        }

        return (value);
    },

    // {Public} Sets date format
    setFormat: function (id, format) {
        var vValue = "";

        if (FCommon.UI.isValidObject(format) == false) {
            vValue = DATEPICKER.getFormat(id);
        }

        if (vValue.search(/d+/i) < 0) {
            vValue = "dd/" + vValue;
        }
        else {
            vValue = vValue.replace(/d+/i, 'dd');
        }

        if (vValue.search(/m+/i) < 0) {
            vValue = "mm/" + vValue;
        }
        else {
            vValue = vValue.replace(/m+/i, 'mm');
        }

        if (vValue.search(/y+/i) < 0) {
            vValue = vValue + "/yyyy";
        }
        else {
            vValue = vValue.replace(/y+/i, 'yyyy');
        }



        FCommon.UI.setAttributeData(id, "format", vValue);
    },

    // {Public} Returns selected month
    getSelectedMonth: function (id) {
        var month = null;
        var iMonth = -1;

        try {
            id = FCommon.UI.getValidElement(id);

            month = DATEPICKER.PRIVATE.getMonthDropdownElement(id);

            if (month.options[month.selectedIndex].value >= 0) {
                iMonth = month.options[month.selectedIndex].value;
            }
        }
        catch (err) {
            alert("Exception: {DATEPICKER::getSelectedMonth} " + err.message);
        }

        return (iMonth);
    },

    // {Public} Returns selected year
    getSelectedYear: function (id) {
        var year = null;
        var iYear = 0;

        try {
            id = FCommon.UI.getValidElement(id);

            year = DATEPICKER.PRIVATE.getYearDropdownElement(id);

            if (year.options[year.selectedIndex].value > 0) {
                iYear = year.options[year.selectedIndex].value;
            }
        }
        catch (err) {
            alert("Exception: {DATEPICKER::getSelectedYear} " + err.message);
        }

        return (iYear);
    },

    // {Public} Returns day value text
    getInputDayText: function (id) {
        var sValue = "";
        var iIndex = 0;
        var arrPos = null;

        try {
            id = FCommon.UI.getValidElement(id);
            arrPos = DATEPICKER.PRIVATE.getDayIndex(id);
            if (FCommon.UI.isValidObject(arrPos) == true && arrPos.length > 0) {
                sValue = id.value;

                sValue = sValue.substr(arrPos[0], arrPos[1] - arrPos[0]);
            }
        }
        catch (err) {
            err.message = "Exception: {DATEPICKER::getInputDayText} " + err.message;
            throw err;
        }

        return (sValue);
    },

    // {Public} Returns month value text
    getInputMonthText: function (id) {
        var sValue = "";
        var iIndex = 0;
        var arrPos = null;

        try {
            id = FCommon.UI.getValidElement(id);
            arrPos = DATEPICKER.PRIVATE.getMonthIndex(id);
            if (FCommon.UI.isValidObject(arrPos) == true && arrPos.length > 0) {
                sValue = id.value;

                sValue = sValue.substr(arrPos[0], arrPos[1] - arrPos[0]);
            }
        }
        catch (err) {
            err.message = "Exception: {DATEPICKER::getInputMonthText} " + err.message;
            throw err;
        }

        return (sValue);
    },

    // {Public} Returns year value text
    getInputYearText: function (id) {
        var sValue = "";
        var iIndex = 0;
        var arrPos = null;

        try {
            id = FCommon.UI.getValidElement(id);
            arrPos = DATEPICKER.PRIVATE.getYearIndex(id);
            if (FCommon.UI.isValidObject(arrPos) == true && arrPos.length > 0) {
                sValue = id.value;

                sValue = sValue.substr(arrPos[0], arrPos[1] - arrPos[0]);
            }
        }
        catch (err) {
            err.message = "Exception: {DATEPICKER::getInputYearText} " + err.message;
            throw err;
        }

        return (sValue);
    },

    // {Public} Sets date to control
    setDate: function (id, iDate, bShowError) {
        var iCalendarType = 0;
        var iDay = 0;
        var iMonth = 0;
        var iYear = 0;
        var bResult = false;
        var date = [];

        try {
            id = FCommon.UI.getValidElement(id);

            if (FConvert.toInt(iDate) <= 0) {

                if (DATEPICKER.isMandatory(id) == false) {
                    document.getElementById(id.id + "_checkbox").checked = false;
                    DATEPICKER.disableControl(id, true);
                }

                return (false);
            }

            iDay = DATE.prototype.getDayFromFocusDate(parseInt(iDate));
            iMonth = DATE.prototype.getMonthFromFocusDate(parseInt(iDate));
            iYear = DATE.prototype.getYearFromFocusDate(parseInt(iDate));

            iCalendarType = DATEPICKER.getCalendarType(id);

            if (FOCUSDATETIME.isValidDatePart(iCalendarType, iDay, iMonth, iYear, bShowError) == false) {
                return (false);
            }

            date = FOCUSDATETIME.getDate(iCalendarType, iYear, iMonth, iDay);
            if (FCommon.UI.isValidObject(date) == false || date.length == 0) {
                return (false);
            }

            bResult = DATEPICKER.PRIVATE.selectDate(id, date);
            if (bResult == true) {
                DATEPICKER.PRIVATE.setValue(id, iDate);
                
                if (DATEPICKER.isMandatory(id) == false) {
                    document.getElementById(id.id + "_checkbox").checked = true;
                    DATEPICKER.disableControl(id, false);
                }
            }
        }
        catch (err) {
            err.message = "Exception: {DATEPICKER::setDate} " + err.message;
            throw err;
        }

        return (bResult);
    },

    // {Public} Returns selected date in control
    getDate: function (id) {
        var iDate = 0;
        var sDay = "";
        var sMonth = "";
        var sYear = "";
        var iDay = 0;
        var iMonth = 0;
        var iYear = 0;
        var iCalendarType = 0;

        try {
            id = FCommon.UI.getValidElement(id);
            if (FCommon.UI.isValidObject(id) == false) {
                return (0);
            }

            if (DATEPICKER.isMandatory(id) == false) {
                if (document.getElementById(id.id + "_checkbox").checked == false) {
                    return (0);
                }
            }

            if (DATEPICKER.isDayNotRequired(id) == true) {
                iDate = DATEPICKER.PRIVATE.getValue(id);

                return(iDate);
            }

            iCalendarType = DATEPICKER.getCalendarType(id);

            sDay = DATEPICKER.getInputDayText(id);
            sMonth = DATEPICKER.getInputMonthText(id);
            sYear = DATEPICKER.getInputYearText(id);

            iDay = parseInt(sDay, 10);
            iMonth = parseInt(sMonth, 10);
            iYear = parseInt(sYear, 10);

            if (FOCUSDATETIME.isValidDatePart(iCalendarType, iDay, iMonth, iYear) == true) {
                iDate = DATE.prototype.convertIntoFocusDate(iDay, iMonth, iYear);
            }
        }
        catch (err) {
            alert("Exception: {DATEPICKER.getDate} " + err.message);
        }

        return (iDate);
    },

    // {Public} Returns selected date text
    getText: function (id) {
        var sValue = "";

        try {
            id = FCommon.UI.getValidElement(id);
            if (FCommon.UI.isValidObject(id) == true) {
                sValue = id.value;
            }
        }
        catch (err) {
            alert("Exception: {DATEPICKER::getText} " + err.message);
        }

        return (sValue);
    },

    // {Public} Shows control
    showControl: function (id) {
        var element = null;
        var bResult = false;

        try {
            if (FCommon.UI.isValidObject(id) == false) {
                alert("Error: {DATEPICKER::showControl} Invalid control id.");
                return (false);
            }

            element = FCommon.UI.getValidElement(id);
            if (FCommon.UI.isValidObject(element) == false) {
                alert("Error: {DATEPICKER::showControl} Invalid control id.");
                return (false);
            }

            element = DATEPICKER.getInputContainerElement(element);
            element.style.display = '';
            bResult = true;
        }
        catch (err) {
            alert("Exception: {DATEPICKER::showControl} " + err.message);
            bResult = false;
        }

        return (bResult);
    },

    // {Public} Hide control
    hideControl: function (id) {
        var element = null;
        var bResult = false;

        try {
            if (FCommon.UI.isValidObject(id) == false) {
                alert("Error: {DATEPICKER::hideControl} Invalid control id.");
                return (false);
            }

            element = FCommon.UI.getValidElement(id);
            if (FCommon.UI.isValidObject(element) == false) {
                alert("Error: {DATEPICKER::hideControl} Invalid control id.");
                return (false);
            }

            element = DATEPICKER.getInputContainerElement(element);
            element.style.display = 'none';
            bResult = true;
        }
        catch (err) {
            alert("Exception: {DATEPICKER::hideControl} " + err.message);
            bResult = false;
        }

        return (bResult);
    },

    // {Public} Enable Disable Control
    disableControl: function (id, bDisable) {
        try {
            id = FCommon.UI.getValidElement(id);
            if (bDisable == true) {
                id.disabled = true;
                id.parentElement.parentElement.style.backgroundColor = "#EBEBE4";
                id.style.backgroundColor = "#EBEBE4";
                id.parentNode.style.backgroundColor = "#EBEBE4";
            }
            else {
                id.disabled = false;
                id.parentElement.parentElement.style.backgroundColor = "";
                id.style.backgroundColor = "";
                id.parentNode.style.backgroundColor = "";
            }
        }
        catch (err) {
            alert("Exception: {DATEPICKER::disableControl} " + err.message);
        }
    },

    collapseAllPopups: function () {
        var iCounter = 0;
        var arrElements = null;

        try {
            arrElements = document.getElementsByClassName(DATEPICKER.getDataContainerClassName());
            if (FCommon.UI.isValidObject(arrElements) == true) {
                for (iCounter = 0; iCounter < arrElements.length; iCounter++) {
                    arrElements[iCounter].style.display = "none";
                }
            }
        }
        catch (err) {
            alert("Exception: {DATEPICKER.collapseAllPopups} " + err.message);
        }
    },

    getParent: function (ctrl) {
        var result = null;
        var element = null;

        try {
            result = COMMON.prototype.getEmptyResultObject();
            result.lValue = 0;
            result.sValue = "";

            ctrl = FCommon.UI.getValidElement(ctrl);
            if (FCommon.UI.isValidObject(ctrl) == false) {
                result.lValue = 0;
                result.sValue = "{DATEPICKER.getParent} Control id cannot be blank.";

                return (result);
            }

            element = document.getElementById(ctrl.id + "_input_container");
            if (FCommon.UI.isValidObject(element) == false) {
                result.lValue = 0;
                result.sValue = "{DATEPICKER.getParent} Invalid control(corrupted).";

                return (result);
            }

            result.data = element.parentElement;
            if (FCommon.UI.isValidObject(result.data) == false) {
                result.lValue = 0;
                result.sValue = "{DATEPICKER.getParent} Parent not found.";

                return (result);
            }

            result.lValue = 1;
        }
        catch (err) {
            result.lValue = -1;
            result.sValue = "{DATEPICKER.getParent} " + err.message;
            bResult = false;
        }

        return (result);
    },

    // {Public} Changes control parent (move control)
    setParent: function (ctrl, newParent) {
        var bResult = false;
        var child = null;

        try {
            ctrl = FCommon.UI.getValidElement(ctrl);
            if (FCommon.UI.isValidObject(ctrl) == false) {
                alert("Error: {DATEPICKER::setParent} Date control id cannot be blank");
                return (false);
            }

            newParent = FCommon.UI.getValidElement(newParent)
            if (FCommon.UI.isValidObject(newParent) == false) {
                alert("Error: {DATEPICKER::setParent} New parent id cannot be blank");
                return (false);
            }

            child = document.getElementById(ctrl.id + "_input_container");
            newParent.appendChild(child);

            ctrl.focus();

            bResult = true;
        }
        catch (err) {
            alert("Exception: {DATEPICKER::setParent} " + err.message);
            bResult = false;
        }

        return (bResult);
    },

    // {Public} Returns numeric date into string format
    convertDateIntoString: function (id, iDate) {
        var iCalendarType = 0;
        var iLanguageId = 0;
        var iDay = 0;
        var iMonth = 0;
        var iYear = 0;
        var date = [];
        var sResult = "";

        try {
            if (parseInt(iDate) <= 0) {
                return ("");
            }

            iDay = DATE.prototype.getDayFromFocusDate(parseInt(iDate));
            iMonth = DATE.prototype.getMonthFromFocusDate(parseInt(iDate));
            iYear = DATE.prototype.getYearFromFocusDate(parseInt(iDate));

            id = FCommon.UI.getValidElement(id);
            iCalendarType = DATEPICKER.getCalendarType(id);
            iLanguageId = DATEPICKER.getLanguageId(id);

            if (FOCUSDATETIME.isValidDatePart(iCalendarType, iDay, iMonth, iYear, false) == false) {
                return ("");
            }

            date = FOCUSDATETIME.getDate(iCalendarType, iYear, iMonth, iDay);
            if (FCommon.UI.isValidObject(date) == false || date.length == 0) {
                return ("");
            }

            sResult = FOCUSDATETIME.formatDate(new Date(date[2], date[1] - 1, date[0]), DATEPICKER.getFormat(id), iCalendarType, iLanguageId);
        }
        catch (err) {
            err.message = "Exception: {DATEPICKER::convertDateIntoString} " + err.message;
            throw err;
        }

        return (sResult);
    },

    // {Public} clear control
    clear: function (id) {
        var bDoNotSelectDate = false;
        var date = null;

        try {
            id = FCommon.UI.getValidElement(id);

            bDoNotSelectDate = DATEPICKER.isDoNotSelectDefaultDate(id);

            date = DATEPICKER.PRIVATE.getTodayDate(id);
            DATEPICKER.PRIVATE.selectDate(id, date, bDoNotSelectDate);

            if (DATEPICKER.isMandatory(id) == false) {
                document.getElementById(id.id + "_checkbox").checked = false;
                DATEPICKER.disableControl(id, true);
            }
        }
        catch (err) {
            alert("Exception: {DATEPICKER::clear} " + err.message);
        }
    },

    dummy: function () { }
};

///////////////////////////////////////////////////////////
var OPTIONCONTROL = new function () {
    this.createControl = function (sControlId, iValue, sWidth, sURL, iMasterTypeId, iGroupType, sFilter, sMandatoryField, sOnLeave, sOnDataLoaded, sClassName) {
        var parameter = "";
        var value = null;
        var data = null;

        try {
            if (FCommon.UI.isValidObject(sControlId) == false || FCommon.String.isNullOrEmpty(sControlId) == true) {
                alert("Error: Control id is mandatory.");

                return (null);
            }

            //////// Control Id
            parameter = NETWORK.createParameterForHTTPPostRequest("sId", sControlId, parameter);

            //////// Value
            value = 0;
            if (FCommon.UI.isValidObject(iValue) == true) {
                value = iValue;
            }
            parameter = NETWORK.createParameterForHTTPPostRequest("iValue", value, parameter);

            //////// Width
            value = "";
            if (FCommon.UI.isValidObject(sWidth) == true && FCommon.String.isNullOrEmpty(sWidth) == false) {
                value = sWidth;
            }
            parameter = NETWORK.createParameterForHTTPPostRequest("sWidth", value, parameter);

            //////// URL
            parameter = NETWORK.createParameterForHTTPPostRequest("sURL", FCommon.String.isNullOrEmpty(sURL) == true ? "" : sURL, parameter);

            //////// MasterTypeId
            value = 0;
            if (FCommon.UI.isValidObject(iMasterTypeId) == true && COMMON.prototype.isInteger(iMasterTypeId) == true) {
                value = parseInt(iMasterTypeId);
            }
            parameter = NETWORK.createParameterForHTTPPostRequest("iMasterTypeId", value, parameter);

            //////// GroupType
            value = 0;
            if (FCommon.UI.isValidObject(iGroupType) == true && COMMON.prototype.isInteger(iGroupType) == true) {
                value = parseInt(iGroupType);
            }
            parameter = NETWORK.createParameterForHTTPPostRequest("iGroupType", value, parameter);

            ///////// Table Name
            value = "";
            parameter = NETWORK.createParameterForHTTPPostRequest("sTableName", value, parameter);


            ///////// Primary Field
            value = "";
            parameter = NETWORK.createParameterForHTTPPostRequest("sPrimaryField", value, parameter);


            ///////// Display Field
            value = "";
            parameter = NETWORK.createParameterForHTTPPostRequest("sDisplayField", value, parameter);

            //////// Filter
            value = "";
            if (FCommon.UI.isValidObject(sFilter) == true && FCommon.String.isNullOrEmpty(sFilter) == false) {
                value = sFilter;
            }
            parameter = NETWORK.createParameterForHTTPPostRequest("sFilter", value, parameter);

            /////////// Exact Match
            value = true;
            parameter = NETWORK.createParameterForHTTPPostRequest("bExactMatch", value, parameter);

            //////// Mandatory Field
            value = "";
            if (FCommon.String.isNullOrEmpty(sMandatoryField) == false) {
                value = sMandatoryField;
            }
            parameter = NETWORK.createParameterForHTTPPostRequest("sMandatoryField", value, parameter);

            //////// Class Name
            value = "";
            if (FCommon.String.isNullOrEmpty(sClassName) == false) {
                value = sClassName;
            }
            parameter = NETWORK.createParameterForHTTPPostRequest("sClassName", value, parameter);

            //////// OnLeave
            value = "";
            if (FCommon.String.isNullOrEmpty(sOnLeave) == false) {
                value = sOnLeave;
            }
            parameter = NETWORK.createParameterForHTTPPostRequest("sOnLeave", value, parameter);

            //////// OnDataLoaded
            value = "";
            if (FCommon.String.isNullOrEmpty(sOnDataLoaded) == false) {
                value = sOnDataLoaded;
            }
            parameter = NETWORK.createParameterForHTTPPostRequest("sOnDataLoaded", value, parameter);

            data = NETWORK.executeServerMethod(GLOBAL.getContextPath("CreateOptionControl", "RD", "RD"), true, parameter, 'json');
            if (data != null) {
                if (data.lValue < 1 && FCommon.String.isNullOrEmpty(data.sValue) == false) {
                    alert(data.sValue);
                }

                if (data.lValue > 0) {
                    data = data.data;
                }
                else {
                    data = null;
                }
            }
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL::createControl} " + err.message);
        }

        return (data);
    },

    this.keypress = function (id, event, sURL) {
        var sValue = "";

        try {
            sValue = id.value;

            if (FCommon.UI.isValidObject(event.keyCode) == true && OPTIONCONTROL_INTERNAL.isInvalidkeyCode(event.keyCode) == true) {
                return;
            }
            else if (FCommon.UI.isValidObject(event.charCode) == true && event.charCode) {
                sValue = FCommon.UI.replaceSelectionRange(id, String.fromCharCode(event.charCode), event);
                //sValue += String.fromCharCode(event.charCode);
            }
            else {
                //sValue = FCommon.UI.replaceSelectionRange(id, String.fromCharCode(event.keyCode), event);
                sValue += String.fromCharCode(event.keyCode);
            }

            //OPTIONCONTROL_INTERNAL.processInputs(id, sValue, sURL, OPTIONCONTROL_INTERNAL.getElementData(OPTIONCONTROL_INTERNAL.getSelectedRow(id)));
            OPTIONCONTROL_INTERNAL.processInputs(id, sValue, sURL, OPTIONCONTROL_INTERNAL.getElementData(OPTIONCONTROL_INTERNAL.getSelectedRow(id), id));

            //if (OPTIONCONTROL_INTERNAL.isPopupVisible(id) == false) {
            //    OPTIONCONTROL.showPopup(id, true);
            //}
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL.keypress} " + err.message);
        }
    },

    this.getServerCommunicationParameterObject = function (id, sURL) {
        var obj = {};

        obj.id = id;
        obj.sURL = sURL;
        obj.sSearch = "";
        obj.iExistingDataCount = 0;
        obj.SelectedData = null;
        obj.sFilter = "";
        obj.tag = null;
        obj.bAsync = false;
        obj.bLoadAll = false;
        obj.bIgnoreChangeCallback = false;

        return (obj);
    },

    this.getDataFromServer = function (obj) {
        var element = null;
        var value = null;
        var parameter = "";
        var sExistingFilter = "";

        try {
            element = document.getElementById(obj.id.id);

            value = OPTIONCONTROL.getMasterTypeId(element);
            parameter = NETWORK.createParameterForHTTPPostRequest("iMasterTypeId", value, parameter);

            value = OPTIONCONTROL.getGroupType(element);
            parameter = NETWORK.createParameterForHTTPPostRequest("iGroupType", value, parameter);

            sExistingFilter = OPTIONCONTROL.getFilter(obj.id);
            if (FCommon.String.isNullOrEmpty(obj.sFilter, true) == false) {
                if (FCommon.String.isNullOrEmpty(sExistingFilter) == false) {
                    if (OPTIONCONTROL.getMasterTypeId(element) > 0) {
                        obj.sFilter = "(" + sExistingFilter + ") AND " + obj.sFilter;
                    }
                    else {
                        obj.sFilter = sExistingFilter + " AND " + obj.sFilter;
                    }                    
                }

                parameter = NETWORK.createParameterForHTTPPostRequest("sFilter", obj.sFilter, parameter);
            }
            else {
                value = sExistingFilter;
                parameter = NETWORK.createParameterForHTTPPostRequest("sFilter", value, parameter);
            }

            parameter = NETWORK.createParameterForHTTPPostRequest("sSearchKey", obj.sSearch, parameter);
            parameter = NETWORK.createParameterForHTTPPostRequest("iExistingDataCount", obj.iExistingDataCount, parameter);

            value = OPTIONCONTROL.getTableName(element);
            parameter = NETWORK.createParameterForHTTPPostRequest("sTableName", value, parameter);

            value = OPTIONCONTROL.getPrimaryField(element);
            parameter = NETWORK.createParameterForHTTPPostRequest("sPrimaryField", value, parameter);

            value = OPTIONCONTROL.getDisplayField(element);
            parameter = NETWORK.createParameterForHTTPPostRequest("sDisplayField", value, parameter);

            value = OPTIONCONTROL.getMandatoryFields(element);
            parameter = NETWORK.createParameterForHTTPPostRequest("sMandatoryFields", value, parameter);

            value = FConvert.toInt(FCommon.UI.getAttributeData(element, "i_UnitId"));
            if (value > 0) {
                parameter = NETWORK.createParameterForHTTPPostRequest("iUnitId", value, parameter);
            }

            value = FConvert.toInt(FCommon.UI.getAttributeData(element, "i_ItemId"));
            if (value > 0) {
                parameter = NETWORK.createParameterForHTTPPostRequest("iItemId", value, parameter);
            }

            value = FConvert.toInt(FCommon.UI.getAttributeData(element, "i_GroupId"));
            if (value > 0) {
                parameter = NETWORK.createParameterForHTTPPostRequest("iGroupId", value, parameter);
            }

            parameter = NETWORK.createParameterForHTTPPostRequest("bLoadAll", FConvert.toBoolean(obj.bLoadAll), parameter);

            value = OPTIONCONTROL.getUserRestriction(element);
            parameter = NETWORK.createParameterForHTTPPostRequest("bUseRestriction", FConvert.toBoolean(value), parameter);

            value = OPTIONCONTROL.getSearchBy(element);
            parameter = NETWORK.createParameterForHTTPPostRequest("iSearchBy", value, parameter);

            value = FConvert.toInt(FCommon.UI.getAttributeData(element, "iparam"));
            parameter = NETWORK.createParameterForHTTPPostRequest("iParam", value, parameter);

            if (FCommon.UI.isValidObject(document.activeElement) == true
                && FCommon.UI.isSameElement(document.activeElement, obj.id) == true
                && FCommon.String.isNullOrEmpty(obj.sSearch, true) == false
                //&& obj.sSearch.length > 1
                ) {
                obj.bAsync = true;
            }

            $.ajax({
                url: obj.sURL,
                data: parameter,
                type: 'POST',
                traditional: true,
                async: obj.bAsync,
                success: function (data, textStatus, jqXHR) {
                    var objResponse = {};

                    try {
                        console.log("Success: {OPTIONCONTROL::getDataFromServer} [ControlId='" + obj.id.id + "'][textStatus='" + textStatus + "']");

                        var value = jqXHR.getResponseHeader("SESSION_EXPIRE");
                        if (FCommon.UI.isValidObject(value) == true && value == 1) {
                            GLOBAL.pageRefresh();
                            return;
                        }

                        value = jqXHR.getResponseHeader("FOCUS_MESSAGE");
                        if (FConvert.toInt(value) > 0) {
                            if ((typeof data).toLowerCase() == "object") {
                                COMMON.prototype.showMessage(data.sValue, data.lValue < 0 ? document.getElementById("id_resource_message_exception").value : document.getElementById("id_resource_message_error").value);
                            }
                            else {
                                data = FConvert.stringToObject(data);
                                if (data.lValue > 0) {
                                    data = data.data;
                                    COMMON.prototype.showMessage(data.sValue, data.lValue < 0 ? document.getElementById("id_resource_message_exception").value : document.getElementById("id_resource_message_error").value);
                                }
                            }

                            return;
                        }

                        objResponse.id = obj.id;
                        objResponse.data = data;
                        objResponse.sKey = obj.sSearch;
                        objResponse.bAsync = obj.bAsync;
                        objResponse.objSelectedData = obj.SelectedData;
                        objResponse.bIgnoreChangeCallback = obj.bIgnoreChangeCallback;

                        if (FCommon.UI.isValidObject(obj.tag) == true) {
                            objResponse.tag = obj.tag;
                        }

                        OPTIONCONTROL.serverResponse(objResponse);
                    }
                    catch (err) {
                        console.log("Exception: {OPTIONCONTROL::getDataFromServer:success} [ControlId='" + obj.id.id + "'][Message='" + err.message + "']");
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    try {
                        console.log("Error: {OPTIONCONTROL::getDataFromServer} [ControlId='" + obj.id.id + "'][textStatus='" + textStatus + "'][errorThrown='" + errorThrown + "']");
                    }
                    catch (err) {
                        console.log("Exception: {OPTIONCONTROL::getDataFromServer:error} [ControlId='" + obj.id.id + "'][Message='" + err.message + "']");
                    }
                }
            });
        }
        catch (err) {
            console.log("Exception: {OPTIONCONTROL::getDataFromServer} " + err.message);

            err.message = "Exception: {OPTIONCONTROL::getDataFromServer} " + err.message;
            throw err;
        }
    },

    this.serverResponse = function (objResponse) {
        var sCallback = "";
        var arrIndex = null;
        var row = null;
        var bRowSelected = false;
        var obj = {};

        try {
            sCallback = OPTIONCONTROL.getOnDataLoadedCallback(objResponse.id);

            obj = OPTIONCONTROL.getCallbackDataObject(objResponse.id, objResponse.tag, false);
            obj.OldData = OPTIONCONTROL_INTERNAL.getSelectedRowValue(objResponse.id);

            if (FCommon.String.isNullOrEmpty(objResponse.data.Error) == false) {
                COMMON.prototype.showMessage("{OPTIONCONTROL.serverResponse} [id=" + objResponse.id.id + "] " + objResponse.data.Error, document.getElementById("id_resource_message_error").value);
                return;
            }

            //if (OPTIONCONTROL.getSearchBy(objResponse.id) == -1) {
            if (OPTIONCONTROL_INTERNAL.getFirstField(objResponse.id) == -1) {
                //debugger
                OPTIONCONTROL.setSearchBy(objResponse.id, objResponse.data.FirstField);
                OPTIONCONTROL_INTERNAL.setFirstField(objResponse.id, objResponse.data.FirstField);
            }
            
            OPTIONCONTROL_INTERNAL.setCompareValueIndex(objResponse.id, objResponse.data.CompareValueIndex);
            OPTIONCONTROL_INTERNAL.setStoreValueIndex(objResponse.id, objResponse.data.StoreValueIndex);

            if (OPTIONCONTROL_INTERNAL.getMetaData(objResponse.id).length == 0) {
                OPTIONCONTROL_INTERNAL.createHeading(objResponse.id, objResponse.data.ColumnMetaData);
            }

            if (objResponse.bAsync == true && OPTIONCONTROL_INTERNAL.isPopupVisible(objResponse.id) == false) {
                if (OPTIONCONTROL_INTERNAL.getMetaData(objResponse.id).length > 0) {
                    OPTIONCONTROL.showPopup(objResponse.id, true);
                }
            }


            OPTIONCONTROL.storeDataArrayInMemory(objResponse.id, objResponse.data.ColumnValue);

            if (FCommon.String.isNullOrEmpty(objResponse.sKey) == false) // If any key typed or spacebar is pressed
            {
                arrIndex = OPTIONCONTROL.getKeyDataIndexArray(objResponse.id, objResponse.sKey, 0);
                if (FCommon.String.isNullOrEmpty(objResponse.sKey.trim()) == true) {
                    FCommon.UI.getValidElement(objResponse.id).value = "";
                }

                OPTIONCONTROL.fillDataFromIndex(objResponse.id, OPTIONCONTROL_INTERNAL.getMetaData(objResponse.id), arrIndex);

                bRowSelected = false;
                if (FCommon.UI.isValidObject(objResponse.objSelectedData) == true) {
                    row = OPTIONCONTROL_INTERNAL.getRowFromObject(objResponse.id, objResponse.objSelectedData);
                    if (FCommon.UI.isValidObject(row) == true) {
                        OPTIONCONTROL_INTERNAL.selectRow(row, objResponse.id);
                        bRowSelected = true;
                    }
                }
                else {
                    OPTIONCONTROL_INTERNAL.selectFirstRow(objResponse.id);
                    bRowSelected = true;
                }

                if (bRowSelected == true && FCommon.String.isNullOrEmpty(sCallback, true) == false) {
                    obj.Data = OPTIONCONTROL_INTERNAL.getSelectedRowValue(objResponse.id);
                    obj.Flag.bLeave = false;
                    obj.Flag.bDataLoad = true;
                    obj.Flag.bDataChange = false;
                    eval(sCallback)(objResponse.id, obj.Data, obj);
                }
            }
            else if (FCommon.UI.isValidObject(objResponse.objSelectedData) == true) {
                if (OPTIONCONTROL_INTERNAL.selectValueInControl(objResponse.id, objResponse.objSelectedData, objResponse.tag, objResponse.bIgnoreChangeCallback) == true) { // Called indirectly from setControlValue
                    //if (FCommon.String.isNullOrEmpty(sCallback) == false)
                    //{
                    //    obj.Data = OPTIONCONTROL.getControlData(objResponse.id);
                    //    obj.Flag.bLeave = false;
                    //    obj.Flag.bDataLoad = true;
                    //    obj.Flag.bDataChange = false;
                    //    eval(sCallback)(objResponse.id, obj.Data, obj);
                    //}
                }
                else {
                    if (FCommon.String.isNullOrEmpty(sCallback) == false) {
                        obj.Data = null;
                        obj.Flag.bLeave = false;
                        obj.Flag.bDataLoad = true;
                        obj.Flag.bDataChange = false;
                        eval(sCallback)(objResponse.id, null, obj);
                    }
                }
            }
            else {
                if (FCommon.String.isNullOrEmpty(sCallback, true) == false) {
                    obj.bDataArray = true;
                    obj.Data = objResponse.data.ColumnValue;
                    obj.Flag.bLeave = false;
                    obj.Flag.bDataLoad = true;
                    obj.Flag.bDataChange = false;
                    eval(sCallback)(objResponse.id, obj.Data, obj);
                }
            }
        }
        catch (err) {
            console.log("Exception: {OPTIONCONTROL::serverResponse} " + err.message);

            if (FCommon.String.isNullOrEmpty(sCallback, true) == false) {
                obj.Data = null;
                obj.Flag.bLeave = false;
                obj.Flag.bDataLoad = false;
                obj.Flag.bDataChange = false;
                eval(sCallback)(objResponse.id, null, obj);
            }

            COMMON.prototype.showMessage("{OPTIONCONTROL.serverResponse} " + err.message, document.getElementById("id_resource_message_error").value);

            //err.message = "Exception: {serverResponse} " + err.message;
            //throw err;
        }
    },

    this.clearHeading = function (id) {
        var parent = null;

        try {
            parent = OPTIONCONTROL_INTERNAL.getDataTableHeadingElement(id);
            if (parent == null) {
                return (false);
            }

            while (parent.firstChild) {
                parent.removeChild(parent.firstChild);
            }

            window[OPTIONCONTROL_INTERNAL.getMetaDataVariableName(id)] = [];
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL.clearHeading} " + err.message);
        }

        return (true);
    },

    this.isTableDataColGroupExist = function (id) {
        var element = null;

        try {
            element = OPTIONCONTROL_INTERNAL.getDataTableColGroupElement(id);
            if (FCommon.UI.isValidObject(element) == true) {
                return (true);
            }
        }
        catch (err) {
            err.message = "Exception: {isTableDataColGroupExist} " + err.message;
            throw err;
        }

        return (false);
    },

    this.createTableDataColGroup = function (id, arrMetaData) {
        var iCounter = 0;
        var parent = null;
        var colGroup = null;
        var element = null;
        var objColumnMetaData = null;

        try {
            if (FCommon.UI.isValidObject(arrMetaData) == false) {
                return (false);
            }

            colGroup = OPTIONCONTROL_INTERNAL.getDataTableColGroupElement(id);
            if (FCommon.UI.isValidObject(colGroup) == true) {
                while (colGroup.firstChild) {
                    colGroup.removeChild(colGroup.firstChild);
                }
            }

            parent = OPTIONCONTROL_INTERNAL.getDataTableElement(id);
            if (parent == null) {
                return (false);
            }

            if (FCommon.UI.isValidObject(colGroup) == false) {
                colGroup = document.createElement("colgroup");
                colGroup.id = OPTIONCONTROL_INTERNAL.getDataColGroupId(id);
            }

            for (iCounter = 0; iCounter < arrMetaData.length; iCounter++) {
                objColumnMetaData = arrMetaData[iCounter];
                if (objColumnMetaData.Hidden == true) {
                    continue;
                }

                element = document.createElement("col");
                element.setAttribute("width", objColumnMetaData.Width);
                colGroup.appendChild(element);
            }
            parent.appendChild(colGroup);
        }
        catch (err) {
            err.message = "Exception: {createTableDataColGroup} " + err.message;
            throw err;
        }

        return (true);
    },

    this.setDataContainerLeftPosition = function (id) {
        var container = null;
        var inputcontainer = null;
        var iLeft = 0;

        try {
            //return; // If parent has relative position below code has problem 10-Sep-2015
            id = FCommon.UI.getValidElement(id);

            container = OPTIONCONTROL_INTERNAL.getDataContainerElement(id);
            iLeft = FCommon.UI.getScrollLeft(id, true);


            inputcontainer = document.getElementById(OPTIONCONTROL_INTERNAL.getInputContainerId(id));
            if (iLeft > 0 && FCommon.UI.isValidObject(inputcontainer) == true && FCommon.UI.isValidObject(inputcontainer.parentElement) == true) {
                //container.style.left = (FConvert.toInt(inputcontainer.parentElement.offsetLeft) - iLeft) + "px";
                container.style.left = inputcontainer.getBoundingClientRect().left + "px";
            }
            else {
                container.style.left = "";
            }
            container.style.position = "fixed";
            return;


            if (FCommon.UI.isValidObject(container) == true && FCommon.UI.isValidObject(inputcontainer) == true) {
                container.style.position = "fixed";
                container.style.left = inputcontainer.getBoundingClientRect().left + "px";

            }
        }
        catch (err) {
            err.message = "Exception: {setDataContainerLeftPosition} " + err.message;
            throw err;
        }
    },

    this.setDataContainerTopPosition = function (id) {
        var container = null;
        var inputcontainer = null;
        var iTop = 0;

        try {
            id = FCommon.UI.getValidElement(id);

            container = OPTIONCONTROL_INTERNAL.getDataContainerElement(id);

            iTop = FCommon.UI.getScrollTop(id);
            inputcontainer = document.getElementById(OPTIONCONTROL_INTERNAL.getInputContainerId(id));
            if (iTop > 0 && FCommon.UI.isValidObject(inputcontainer) == true) {
                container.style.top = inputcontainer.getBoundingClientRect().bottom + "px";
            }
            else {
                container.style.top = "";
            }
            container.style.position = "fixed";
            return;
        }
        catch (err) {
            err.message = "Exception: {setDataContainerTopPosition} " + err.message;
            throw err;
        }
    },

    this.setDataContainerPosition = function (id) {
        var container = null;
        var heading = null;
        var inputcontainer = null;
        var inputbox = null;
        var inputimage = null;
        var iWidth = 0;


        try {
            id = FCommon.UI.getValidElement(id);

            container = OPTIONCONTROL_INTERNAL.getDataContainerElement(id);
            heading = OPTIONCONTROL_INTERNAL.getDataTableHeadingElement(id);
            inputcontainer = document.getElementById(OPTIONCONTROL_INTERNAL.getInputContainerId(id));
            inputbox = document.getElementById(id.id);
            inputimage = document.getElementById(OPTIONCONTROL_INTERNAL.getInputImageId(id));

            if (FCommon.UI.isValidObject(container) == true && FCommon.UI.isValidObject(heading) == true) {
                iWidth = FCommon.UI.getWidth(heading);
                if (iWidth == 0) {
                    var ele = $(heading).find("colgroup > col");
                    for (var iCounter = 0; iCounter < ele.length; iCounter++) {
                        iWidth += $(ele[iCounter]).width();
                    }
                }

                container.style.width = iWidth + "px";
            }

            OPTIONCONTROL.setDataContainerTopPosition(id);
            OPTIONCONTROL.setDataContainerLeftPosition(id);
        }
        catch (err) {
            err.message = "Exception: {setDataContainerPosition} " + err.message;
            throw err;
        }
    },

    // {Internal} Called when table row is clicked
    this.rowClick = function (row, id, event) {
        var sCallback = "";
        var obj = null;
        var element = null;
        var retValue = null;

        try {
            element = OPTIONCONTROL_INTERNAL.getSelectedRow(id);
            if (element != null) {
                OPTIONCONTROL_INTERNAL.unselectRow(element);
            }

            OPTIONCONTROL_INTERNAL.selectRow(row, id);
            OPTIONCONTROL_INTERNAL.setSelectedValue(id);

            obj = OPTIONCONTROL.getCallbackDataObject(id, null, false);
            obj.OldValue = FConvert.toInt(FCommon.UI.getAttributeData(id, "lastvalue"));

            obj.Data = OPTIONCONTROL.getControlData(id);
            if (FCommon.UI.isValidObject(obj.Data) == true) {
                obj.Value = FConvert.toInt(COMMON.prototype.getObjectFirstPropertyValue(obj.Data[0]));
            }

            if (obj.OldValue == obj.Value) {
                return;
            }
            FCommon.UI.setAttributeData(id, "lastvalue", obj.Value);

            sCallback = OPTIONCONTROL.getOnDataChangeCallback(id);
            if (FCommon.String.isNullOrEmpty(sCallback, true) == false) {
                obj.Event = event;
                obj.Flag.bLeave = false;
                obj.Flag.bDataLoad = false;
                obj.Flag.bDataChange = true;
                retValue = eval(sCallback)(obj.Control, obj.Data, obj);
                if (COMMON.prototype.isBoolean(retValue) == true && FConvert.toBoolean(retValue) == false) {
                    return;
                }
            }

            FCommon.UI.setAttributeData(id, "focusvalue", obj.Value);
            OPTIONCONTROL.focusText(id, id.value);
            //FCommon.UI.setAttributeData(id, "focustext", id.value);
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL.rowClick} " + err.message);
        }
    },

    this.fillDataFromIndex = function (id, arrMetaData, arrIndex) {
        var sDataVariableName = "";
        var sText = "";
        var iCounter = 0;
        var iCounter1 = 0;
        var iIndex = 0;
        var objArr = null;
        var objData = null;
        var objColumnMetaData = null;
        var row = null;
        var element = null;
        var objBody = null;

        try {
            if (OPTIONCONTROL.isTableDataColGroupExist(id) == false) {
                if (OPTIONCONTROL.createTableDataColGroup(id, arrMetaData) == false) {
                    return (false);
                }
            }

            objBody = OPTIONCONTROL_INTERNAL.getDataTableBodyElement(id);
            if (objBody == null) {
                objBody = document.createElement("tbody");
                objBody.id = OPTIONCONTROL_INTERNAL.getDataBodyId(id);

                element = OPTIONCONTROL_INTERNAL.getDataTableElement(id);
                if (element == null) {
                    return (false);
                }

                element.appendChild(objBody);
            }
            else {
                while (objBody.firstChild) {
                    objBody.removeChild(objBody.firstChild);
                }

            }

            sDataVariableName = OPTIONCONTROL_INTERNAL.getDataVariableName(id);
            if (window[sDataVariableName] == null || FCommon.UI.isValidObject(arrIndex) == false || arrIndex.length == 0) {
                return;
            }

            for (iCounter = 0; iCounter < arrIndex.length; iCounter++) {
                iIndex = arrIndex[iCounter];
                if (iIndex >= window[sDataVariableName].length) {
                    continue;
                }

                row = document.createElement("tr");
                row.id = "row_" + iIndex;
                row.className = OPTIONCONTROL_INTERNAL.getDataRowClassName();
                row.onmousedown = function (event) {
                    OPTIONCONTROL.rowClick(this, id, event);
                    FCommon.UI.stopKeyProcess(event);
                    OPTIONCONTROL.hidePopup(id);
                };

                objArr = window[sDataVariableName][iIndex];

                for (iCounter1 = 0; iCounter1 < objArr.length; iCounter1++) {
                    if (iCounter1 >= arrMetaData.length) {
                        continue;
                    }

                    objData = objArr[iCounter1];
                    objColumnMetaData = arrMetaData[iCounter1];

                    FCommon.UI.setAttributeData(row, objColumnMetaData.Name, objData.sValue);
                    if (objColumnMetaData.Hidden == false) {
                        element = document.createElement("td");
                        element.className = "option_column";
                        element.style.paddingLeft = "3px";
                        element.style.paddingRight = "3px";
                        element.style.overflow = "hidden";
                        element.style.textOverflow = "ellipsis";
                        element.style.whiteSpace = "pre"; //"nowrap";
                        element.style.display = "table-cell";
                        element.style.verticalAlign = "inherit";

                        if (FCommon.UI.isValidObject(objColumnMetaData.Align) == false) {
                            sText = "left";
                        }
                        else {
                            sText = objColumnMetaData.Align.toLowerCase();
                            if (sText != "center" && sText != "right") {
                                sText = "left";
                            }
                        }

                        element.style.textAlign = sText;
                        //element.setAttribute("align", COMMON.prototype.getTableColumnAlignText(objColumnMetaData.Align));

                        COMMON.prototype.setElementText(element, objData.sValue);
                        row.appendChild(element);
                    }
                }

                objBody.appendChild(row);
            }
        }
        catch (err) {
            alert("Exception: {fillDataFromIndex} " + err.message);
        }

    },

    // Returns memory data array length
    this.getMemoryDataCount = function (id) {
        var sDataVariableName = "";
        var iCount = 0;

        try {
            sDataVariableName = OPTIONCONTROL_INTERNAL.getDataVariableName(id);
            if (FCommon.String.isNullOrEmpty(sDataVariableName, true) == true) {
                return (0);
            }

            if (FCommon.UI.isValidObject(window[sDataVariableName]) == true) {
                iCount = window[sDataVariableName].length;
            }
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL.getMemoryDataCount} " + err.message);
        }

        return (iCount);
    },

    this.isValidStoredData = function (id, key) {
        var sDataVariableName = ""
        var iCompareValueIndex = 0;
        var obj = null;

        try {
            sDataVariableName = OPTIONCONTROL_INTERNAL.getDataVariableName(id);
            if (window[sDataVariableName] == null || window[sDataVariableName].length == 0) {
                return (true);
            }

            if (FCommon.String.isNullOrEmpty(key) == true) {
                return (false);
            }

            iCompareValueIndex = OPTIONCONTROL_INTERNAL.getCompareValueIndex(id);
            obj = window[sDataVariableName][0];
            if (FCommon.UI.isValidObject(obj) == false || obj.length <= iCompareValueIndex) {
                return (false);
            }

            if (FCommon.String.isNullOrEmpty(obj[iCompareValueIndex].sValue) == true) {
                return (false);
            }

            if (FCommon.String.compare(key, obj[iCompareValueIndex].sValue, true, 1) == 0) {
                return (true);
            }
        }
        catch (err) {
            err.message = "Exception: {isValidStoredData} " + err.message;
            throw err;
        }

        return (false);
    },

    // {Internal} Stores array of data objects in memory
    this.storeDataArrayInMemory = function (id, arrData) {
        var iCounter = 0;
        var objArr = null;

        try {
            if (FCommon.UI.isValidObject(arrData) == null) {
                return;
            }

            for (iCounter = 0; iCounter < arrData.length; iCounter++) {
                objArr = arrData[iCounter];
                OPTIONCONTROL.storeDataInMemory(id, objArr, 0);
            }
        }
        catch (err) {
            err.message = "Exception: {storeDataArrayInMemory} " + err.message;
            throw err;
        }
    },

    // {Internal} Stores data object in memory
    this.storeDataInMemory = function (id, objData, iInsertAfter) {
        var iIndex = 0;
        var iCompareValueIndex = 0;
        var sDataVariableName = "";
        var iResult = 0;
        var iPosition = 0;
        var objExistingData = null;

        try {
            iCompareValueIndex = OPTIONCONTROL_INTERNAL.getCompareValueIndex(id);
            sDataVariableName = OPTIONCONTROL_INTERNAL.getDataVariableName(id);

            if (FCommon.String.isNullOrEmpty(objData[iCompareValueIndex].sValue) == true || iCompareValueIndex < 0) {
                return (0);
            }

            if (window[sDataVariableName] == null) {
                window[sDataVariableName] = [];
            }

            iPosition = OPTIONCONTROL.getDataPositionInMemory(id, objData, iCompareValueIndex);
            if (iPosition >= 0) { // Data already stored in memory
                return (iPosition);
            }

            for (iIndex = iInsertAfter; iIndex < window[sDataVariableName].length; iIndex++) {
                objExistingData = window[sDataVariableName][iIndex];
                iResult = FCommon.String.compare(objExistingData[iCompareValueIndex].sValue, objData[iCompareValueIndex].sValue, false);
                if (iResult < 0) {
                    continue;
                }

                window[sDataVariableName].splice(iIndex, 0, objData);
                return (iIndex);
            }

            window[sDataVariableName].splice(iIndex, 0, objData);
        }
        catch (err) {
            err.message = "Exception: {storeDataInMemory} " + err.message;
            throw err;
        }

        return (iIndex);
    },

    // {Internal} Returns object position in memory data
    this.getDataPositionInMemory = function (id, objData, iCompareValueIndex) {
        var sDataVariableName = "";
        var iCounter = 0;
        var objExisting = null;

        try {
            sDataVariableName = OPTIONCONTROL_INTERNAL.getDataVariableName(id);
            for (iCounter = 0; iCounter < window[sDataVariableName].length; iCounter++) {
                objExisting = window[sDataVariableName][iCounter];
                if (OPTIONCONTROL.compareObject(objExisting, objData, iCompareValueIndex) == true) {
                    return (iCounter);
                }
            }
        }
        catch (err) {
            err.message = "Exception: {getDataPositionInMemory} " + err.message;
            throw err;
        }

        return (-1);
    },

    // {Internal} Compare objects
    this.compareObject = function (objData, objData1, iCompareValueIndex) {
        var iIndex = 0;
        var iTotal = 0;

        try {
            if (FCommon.UI.isValidObject(objData) == false
                || FCommon.UI.isValidObject(objData1) == false
                || objData.length <= iCompareValueIndex
                || objData1.length <= iCompareValueIndex) {
                return (false);
            }

            if (FCommon.String.compare(objData[iCompareValueIndex].sValue, objData1[iCompareValueIndex].sValue, false) == 0) {
                iTotal = objData.length;
                iTotal = Math.min(objData.length, objData1.length); // Added for length mismatch 30/May/2017
                for (iIndex = 0; iIndex < iTotal; iIndex++) {
                    if (objData[iIndex].sValue != objData1[iIndex].sValue) {
                        break;
                    }
                }

                if (iIndex >= iTotal) {
                    return (true);
                }
            }
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL.compareObject} " + err.message);
        }

        return (false);
    },

    // {Internal} Returns array of data index of memory data that matched from given key value
    this.getKeyDataIndexArray = function (id, sSearchKey, iStartArrayIndex) {
        var sDataVariableName = "";
        var iCompreValueIndex = 0;
        var sValue = "";
        var arrIndex = [];
        var iCounter = 0;
        var objData = null;
        var bShowAll = false;

        try {
            iCompreValueIndex = OPTIONCONTROL_INTERNAL.getCompareValueIndex(id);
            sDataVariableName = OPTIONCONTROL_INTERNAL.getDataVariableName(id);

            if (window[sDataVariableName] != null && FCommon.String.isNullOrEmpty(sSearchKey) == false) {
                if (FCommon.String.isNullOrEmpty(sSearchKey.trim()) == true) {
                    bShowAll = true;
                }

                for (iCounter = iStartArrayIndex; iCounter < window[sDataVariableName].length; iCounter++) {
                    objData = window[sDataVariableName][iCounter];
                    if (objData == null || iCompreValueIndex >= objData.length) {
                        continue;
                    }

                    sValue = objData[iCompreValueIndex].sValue;
                    if (sValue.length <= 0 || sSearchKey.length <= 0) {
                        continue;
                    }

                    if (bShowAll == true) {
                        arrIndex.push(iCounter);
                        continue;
                    }
                    else if (sSearchKey.length > sValue.length) {
                        if (FCommon.String.compare(sValue, sSearchKey, true, 0) == 0) {
                            arrIndex.push(iCounter);
                        }
                    }
                    else {
                        if (FCommon.String.compare(sValue, sSearchKey, true, Math.min(sValue.length, sSearchKey.length)) == 0) {
                            arrIndex.push(iCounter);
                        }
                    }
                }
            }
        }
        catch (err) {
            err.message = "Exception: {getKeyDataIndexArray} " + err.message;
            throw err;
        }

        return (arrIndex);
    },

    this.getCallbackDataObject = function (id, tag, bLeave) {
        var obj = {};

        try {
            bLeave = FConvert.toBoolean(bLeave);

            obj.Control = FCommon.UI.getValidElement(id);
            obj.OldData = null;
            obj.Data = null;
            obj.CustomData = FCommon.UI.isValidObject(tag) == true ? tag : null;
            obj.bDataArray = false;
            obj.UserData = OPTIONCONTROL.getUserData(obj.Control);

            // obj.OldValue = FConvert.toInt(FCommon.UI.getAttributeData(obj.Control, "focusvalue"));
            if (FCommon.UI.isSameElement(id, document.activeElement) == true || bLeave == true) {
                obj.OldValue = FConvert.toInt(FCommon.UI.getAttributeData(obj.Control, "focusvalue"));
            }
            else {
                obj.OldValue = FConvert.toInt(OPTIONCONTROL.getControlValue(obj.Control));
            }
            
            obj.Value = 0;
            obj.Flag = {
                bLeave: false,
                bDataLoad: false,
                bDataChange: false
            };
        }
        catch (err) { }

        return (obj);
    },

    this.isInputBarcodeEnabled = function (id) {
        var iMasterTypeId = 0;
        var bValue = false;

        try {
            id = FCommon.UI.getValidElement(id);
            if (FCommon.UI.isValidObject(id) == false) {
                return (false);
            }

            iMasterTypeId = OPTIONCONTROL.getMasterTypeId(id);
            if (iMasterTypeId != 2) {
                return(false);
            }

            bValue = FConvert.toBoolean(FCommon.UI.getAttributeData(id, "isbarcode"));
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL.isInputBarcodeEnabled} " + err.message);
        }

        return (bValue);
    },

    this.showPopup = function (id, bShowError) {
        var sCallback = "";
        var ctrlPopup = null;

        try {
            id = FCommon.UI.getValidElement(id);
            if (FCommon.UI.isValidObject(id) == false) {
                if (FConvert.toBoolean(bShowError) == true) {
                    alert("Error: {OPTIONCONTROL.showPopup} Invalid control id.");
                }

                return (false);
            }

            if (FCommon.String.isNullOrEmpty(id.id) == true) {
                if (FConvert.toBoolean(bShowError) == true) {
                    alert("Error: {OPTIONCONTROL.showPopup} Control id cannot be blank.");
                }

                return (false);
            }

            if (OPTIONCONTROL.isInputBarcodeEnabled(id) == true) {
                return (false);
            }

            ctrlPopup = OPTIONCONTROL_INTERNAL.getDataContainerElement(id);
            if (ctrlPopup == null) {
                if (FConvert.toBoolean(bShowError) == true) {
                    alert("Error: {OPTIONCONTROL.showPopup} Data container not found.");
                }

                return (false);
            }

            ctrlPopup.style.display = '';

            FCommon.UI.setFocusDropdownPopupPosition(id, ctrlPopup);
            FCommon.UI.selectTextInInput(id, id.value.length, id.value.length);

            sCallback = OPTIONCONTROL.getAfterPopupDisplayedCallback(id);
            if (FCommon.String.isNullOrEmpty(sCallback) == false) {
                if (FCommon.String.includes(sCallback, "(") == true) {
                    eval(sCallback);
                }
                else {
                    eval(sCallback)(id);
                }
            }

            return (true);
        }
        catch (err) {
            if (FConvert.toBoolean(bShowError) == true) {
                alert("Exception: {OPTIONCONTROL.showPopup} " + err.message);
            }
        }

        return (false);
    },

    this.hidePopup = function (id, bShowError) {
        var ctrlPopuup = null;

        try {
            if (id == null) {
                if (FCommon.UI.isValidObject(bShowError) == true && bShowError == true) {
                    alert("Error: {OPTIONCONTROL::hidePopup} Invalid control id.");
                }

                return (false);
            }

            ctrlPopuup = OPTIONCONTROL_INTERNAL.getDataContainerElement(id);
            if (ctrlPopuup == null) {
                if (FConvert.toBoolean(bShowError) == true) {
                    alert("Error: {OPTIONCONTROL.hidePopup} Data container not found.");
                }

                return (false);
            }

            ctrlPopuup.style.display = 'none';

            return (true);
        }
        catch (err) {
            if (FCommon.UI.isValidObject(bShowError) == true && bShowError == true) {
                alert("Exception: {OPTIONCONTROL::hidePopup} " + err.message);
            }
        }

        return (false);
    },

    // {Internal} Returns is unmatched data needed to be stored
    this.isKeepUnmatchedData = function (id) {
        var vValue = null;

        try {
            vValue = FCommon.UI.getAttributeData(id, "keepunmatcheddata");
            if (FCommon.UI.isValidObject(vValue) == false) {
                return (false);
            }

            if (vValue.toLowerCase() == "true") {
                return (true);
            }
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL.isKeepUnmatchedData} " + err.message);
        }

        return (false);
    },

    // {Internal} Fetches multiple value from server at one go
    this.fillValueInMemory = function (id, arrValue, tag, bLoadAll, bIgnoreChangeCallback) {
        var sURL = "";
        var sValueFilter = "";
        var iStoreValueIndex = 0;
        var iCounter = 0;
        var result = null;
        var arr = [];
        var arrLoadedData = [];
        var objParam = null;

        try {
            iStoreValueIndex = OPTIONCONTROL_INTERNAL.getStoreValueIndex(id);

            for (iCounter = 0; iCounter < arrValue.length; iCounter++) {
                result = OPTIONCONTROL_INTERNAL.getValueFromMemory(id, arrValue[iCounter], iStoreValueIndex);
                if (FCommon.UI.isValidObject(result) == false || result.length == 0) {
                    arr.push(arrValue[iCounter]);
                }
                else if (result.length >= 2) {
                    arrLoadedData.push(result[1]);
                }
            }

            if (arr.length > 0) {
                sURL = FCommon.UI.getAttributeData(id, "url");
                sValueFilter = FCommon.UI.getAttributeData(id, "valuefilterfield");
                if (FCommon.String.isNullOrEmpty(sValueFilter) == true) {
                    if (FCommon.String.isNullOrEmpty(OPTIONCONTROL.getTableName(id)) == true) {
                        sValueFilter = "a.iMasterId IN(";
                    }
                    else {
                        //sValueFilter = OPTIONCONTROL.getPrimaryField(id) + " IN(" + value; 20/June/2016
                        sValueFilter = OPTIONCONTROL.getPrimaryField(id) + " IN(";
                    }
                }
                else {
                    sValueFilter += " IN(";
                }

                for (iCounter = 0; iCounter < arr.length; iCounter++) {
                    if (iCounter > 0) {
                        sValueFilter += ",";
                    }

                    sValueFilter += '\'' + arr[iCounter] + '\'';
                }

                sValueFilter += ")";

                objParam = OPTIONCONTROL.getServerCommunicationParameterObject(id, sURL);
                objParam.sFilter = sValueFilter;
                objParam.bLoadAll = FConvert.toBoolean(bLoadAll);
                objParam.bIgnoreChangeCallback = FConvert.toBoolean(bIgnoreChangeCallback);
                if (FCommon.UI.isValidObject(tag) == true) {
                    objParam.tag = tag;
                }
                OPTIONCONTROL.getDataFromServer(objParam);
            }
        }
        catch (err) {
            err.message = "Exception: {fillValueInMemory} " + err.message;
            throw err;
        }

        return (arrLoadedData);
    },

    // {Internal} Sets control selected data into hidden element
    this.setControlData = function (id, objData) {
        OPTIONCONTROL_INTERNAL.setControlData(id, objData);
    },

    // {Public} Returns option control class name
    this.getClassName = function () {
        return ("FOptionControl");
    },

    this.getBarcodeProductURL = function (id) {
        var value = "";

        try {
            id = FCommon.UI.getValidElement(id);
            value = FConvert.toString(FCommon.UI.getAttributeData(id, "barcodeproducturl"));
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL.getBarcodeProductURL} " + err.message);
        }

        return (value);
    },

    this.getSearchUIURL = function (id) {
        var value = "";

        try {
            id = FCommon.UI.getValidElement(id);
            value = FConvert.toString(FCommon.UI.getAttributeData(id, "searchuiurl"));
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL.getSearchUIURL} " + err.message);
        }

        return (value);
    },

    // {Public} Returns selected control Raw data
    this.getControlData = function (id) {
        var iCounter = 0;
        var iIndex = 0;
        var element = null;
        var jsondata = {};
        var data = [];

        try {
            id = FCommon.UI.getValidElement(id);

            element = OPTIONCONTROL_INTERNAL.getDataElement(id);
            for (iCounter = 0; iCounter < element.attributes.length; iCounter++) {
                if (FCommon.String.compare(element.attributes[iCounter].name, "data-", true, "data-".length) == 0) {

                    jsondata[element.attributes[iCounter].name.substr("data-".length)] = element.attributes[iCounter].value;
                    data.push(jsondata);
                    jsondata = {};
                    iIndex++;
                }
            }
        }
        catch (err) {
            err.message = "Exception: {OPTIONCONTROL::getControlData} " + err.message;
            throw err;
        }

        return (data);
    },

    // {Public} Returns selected control data
    this.getControlDataObject = function (id) {
        var sMetaDataVariableName = "";
        var sProperty = "";
        var iCounter = 0;
        var element = null;
        var data = {};

        try {
            id = FCommon.UI.getValidElement(id);

            element = OPTIONCONTROL_INTERNAL.getDataElement(id);

            sMetaDataVariableName = OPTIONCONTROL_INTERNAL.getMetaDataVariableName(id);
            for (iCounter = 0; iCounter < window[sMetaDataVariableName].length; iCounter++) {
                sProperty = window[sMetaDataVariableName][iCounter].Name;
                if (FCommon.String.includes(sProperty, " ") == true) {
                    console.log("Error: {OPTIONCONTROL.getControlDataObject} [id=" + id.id + "][Property=" + sProperty + "] Property cannot have space.");
                }

                data[sProperty] = element.getAttribute("data-" + sProperty.toLowerCase());
            }
        }
        catch (err) {
            err.message = "Exception: {OPTIONCONTROL::getControlDataObject} " + err.message;
            throw err;
        }

        return (data);
    },

    // {Public} Returns selected value
    this.getControlValue = function (id, sField) {
        var element = null;
        var value = null;

        try {
            id = FCommon.UI.getValidElement(id);
            if (FCommon.UI.isValidObject(id) == false) {
                return (value);                        
            }

            element = OPTIONCONTROL_INTERNAL.getDataElement(id);
            if (FCommon.UI.isValidObject(element) == false) {
                return (value);
            }

            if (FCommon.String.isNullOrEmpty(sField, true) == true) {
                value = element.getAttribute("value");
            }
            else {
                value = element.getAttribute("data-" + sField.toLowerCase());
            }
        }
        catch (err) {
            console.log("Exception: {OPTIONCONTROL::getControlValue} " + err.message);

            err.message = "Exception: {OPTIONCONTROL::getControlValue} " + err.message;
            throw err;
        }

        return (value);
    },

    // {Public} Sets control value 
    this.setControlValue = function (id, value, tag, bLoadAll, bIgnoreChangeCallback) {
        var sCallback = "";
        var sURL = "";
        var sValueFilter = "";
        var arrLoadedData = null;
        var obj = null;
        var objParam = null;

        try {
            id = FCommon.UI.getValidElement(id);
            if (FCommon.UI.isValidObject(id) == false) {
                return ("Invalid id.");
            }

            bLoadAll = FConvert.toBoolean(bLoadAll);
            bIgnoreChangeCallback = FConvert.toBoolean(bIgnoreChangeCallback);
            if (Array.isArray(value) == true) {
                arrLoadedData = OPTIONCONTROL.fillValueInMemory(id, value, tag, bLoadAll, bIgnoreChangeCallback);
                //if (FCommon.UI.isValidObject(tag) == true) {
                //    arrLoadedData = OPTIONCONTROL.fillValueInMemory(id, value, tag, bLoadAll);
                //}
                //else {
                //    arrLoadedData = OPTIONCONTROL.fillValueInMemory(id, value);
                //}

                if (arrLoadedData.length > 0) {
                    sCallback = OPTIONCONTROL.getOnDataLoadedCallback(id);
                    if (FCommon.String.isNullOrEmpty(sCallback) == false) {
                        obj = OPTIONCONTROL.getCallbackDataObject(id, tag, false);
                        obj.Data = arrLoadedData;
                        obj.bDataArray = true;
                        obj.Flag.bLeave = false;
                        obj.Flag.bDataLoad = true;
                        obj.Flag.bDataChange = false;

                        eval(sCallback)(id, arrLoadedData, obj);
                    }
                }

                return;
            }

            if (OPTIONCONTROL.getMasterTypeId(id) > 0 && value == 0) {
                OPTIONCONTROL.clear(id);

                return(true);
            }

            if (OPTIONCONTROL_INTERNAL.selectValueInControl(id, value, tag, bIgnoreChangeCallback) == true) {
                return (true);
            }

            sURL = FCommon.UI.getAttributeData(id, "url");
            sValueFilter = FCommon.UI.getAttributeData(id, "valuefilterfield");
            if (FCommon.String.isNullOrEmpty(sValueFilter) == true) {
                if (FCommon.String.isNullOrEmpty(OPTIONCONTROL.getTableName(id)) == true) {
                    sValueFilter = "a.iMasterId=" + value;
                }
                else {
                    sValueFilter = OPTIONCONTROL.getPrimaryField(id) + "=" + value;
                }
            }
            else {
                sValueFilter += "=";
                sValueFilter += '\'' + value + '\'';
            }


            objParam = OPTIONCONTROL.getServerCommunicationParameterObject(id, sURL);
            objParam.SelectedData = value;
            objParam.sFilter = sValueFilter;
            objParam.bLoadAll = bLoadAll;
            objParam.bIgnoreChangeCallback = bIgnoreChangeCallback;

            if (FCommon.UI.isValidObject(tag) == true) {
                objParam.tag = tag;
            }
            OPTIONCONTROL.getDataFromServer(objParam);
        }
        catch (err) {
            console.log("Exception: {OPTIONCONTROL::setControlValue} " + err.message);

            err.message = "Exception: {OPTIONCONTROL::setControlValue} " + err.message;
            throw err;
        }

        return (false);
    },

    // {Public} Returns selected value
    this.getControlValueLong = function (id, sField) {
        var element = null;
        var value = null;

        try {
            id = FCommon.UI.getValidElement(id);
            if (FCommon.UI.isValidObject(id) == false) {
                return ("");
            }

            element = OPTIONCONTROL_INTERNAL.getDataElement(id);
            if (FCommon.UI.isValidObject(element) == false) {
                return ("");
            }

            if (FCommon.String.isNullOrEmpty(sField, true) == true) {
                value = element.getAttribute("value");
            }
            else {
                value = element.getAttribute("data-" + sField.toLowerCase());
            }
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL.getControlValueLong} " + err.message);
        }

        value = FConvert.toString(value);

        return (value);
    },

    // {Public} Returns inputted text in control
    this.getControlText = function (id) {
        var vValue = "";

        try {
            id = FCommon.UI.getValidElement(id);
            if (FCommon.UI.isValidObject(id) == true) {
                vValue = id.value;
            }
        }
        catch (err) {
            err.message = "Exception: {OPTIONCONTROL::getControlText} " + err.message;
            throw err;
        }

        return (vValue);
    },

    // {Public} Sets control text
    this.setControlText = function (id, sValue, bRefresh) {

        try {
            id = FCommon.UI.getValidElement(id);
            if (FCommon.UI.isValidObject(id) == true) {
                id.value = sValue;

                bRefresh = FConvert.toBoolean(bRefresh);
                if (bRefresh == true) {
                    OPTIONCONTROL_INTERNAL.processInputs(id,
                                                sValue,
                                                FCommon.UI.getAttributeData(id, "url"),
                                                OPTIONCONTROL_INTERNAL.getElementData(OPTIONCONTROL_INTERNAL.getSelectedRow(id), id));
                }                
            }
        }
        catch (err) {
            err.message = "Exception: {OPTIONCONTROL.setControlText} " + err.message;
            throw err;
        }
    },

    this.updateControlValue = function (id, sText, iValue, obj) {
        var eleData = null;

        try {
            id = FCommon.UI.getValidElement(id);
            if (FCommon.UI.isValidObject(id) == false) {
                return;
            }

            id.value = sText;

            eleData = OPTIONCONTROL_INTERNAL.getDataElement(id);
            if (FCommon.UI.isValidObject(eleData) == false) {
                return;
            }

            FCommon.UI.removeDataAttribute(eleData);
            eleData.value = FConvert.toInt(iValue);

            if (FCommon.UI.isValidObject(obj) == true) {
                FCommon.UI.setAttributeData(eleData, obj);
            }
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL.updateControlValue} " + err.message);
        }
    },

    this.resetControl = function (id, value) {
        try {
            id = FCommon.UI.getValidElement(id);
            if (FCommon.UI.isValidObject(id) == true) {
                OPTIONCONTROL.setSearchBy(id, -1);
                OPTIONCONTROL.clearHeading(id);
                OPTIONCONTROL.clear(id, false);
                if (FCommon.UI.isValidObject(value) == true) {
                    OPTIONCONTROL.setControlValue(id, value, null, false, true);
                }
            }
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL.resetControl} " + err.message);
        }
    },

    // {Public} Cleares memory and control data
    this.clear = function (id, bDoNotClearInput) {
        try {
            id = FCommon.UI.getValidElement(id);

            OPTIONCONTROL_INTERNAL.clearMemoryData(id);
            OPTIONCONTROL_INTERNAL.clearControlData(id);

            if (FCommon.UI.isValidObject(bDoNotClearInput) == false || bDoNotClearInput == false) {
                id.value = "";
            }
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL.clear} " + err.message);
        }
    },

    // {Public} Returns mastertype id
    this.getMasterTypeId = function (id) {
        var value = 0;

        try {
            id = FCommon.UI.getValidElement(id);
            value = FConvert.toInt(FCommon.UI.getAttributeData(id, "mastertypeid"));
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL.getMasterTypeId} " + err.message);
        }

        return (value);
    },

    // {Public} Sets mastertype id
    this.setMasterTypeId = function (id, iMasterTypeId) {
        id = FCommon.UI.getValidElement(id);
        if (FCommon.UI.isValidObject(id) == true) {
            FCommon.UI.setAttributeData(id, "mastertypeid", iMasterTypeId);

            OPTIONCONTROL.clear(id);
        }
    },

    this.getGroupType = function (id) {
        var value = 0;

        try {
            id = FCommon.UI.getValidElement(id);
            value = FConvert.toInt(FCommon.UI.getAttributeData(id, "grouptype"));
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL.getGroupType} " + err.message);
        }

        return (value);
    },

    this.getUserRestriction = function (id) {
        var value = 0;

        try {
            id = FCommon.UI.getValidElement(id);
            value = FCommon.UI.getAttributeData(id, "userrestriction");
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL.getUserRestriction} " + err.message);
        }

        return (value);
    },

    this.getSearchBy = function (id) {
        var value = 0;

        try {
            id = FCommon.UI.getValidElement(id);
            value = FConvert.toInt(FCommon.UI.getAttributeData(id, "i_searchby"));
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL.getSearchBy} " + err.message);
        }

        return (value);
    },

    this.setSearchBy = function (id, value) {
        try {
            id = FCommon.UI.getValidElement(id);
            FCommon.UI.setAttributeData(id, "i_searchby", value);
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL.setSearchBy} " + err.message);
        }
    },

    this.getScanFlag = function (id) {
        var value = 0;

        try {
            id = FCommon.UI.getValidElement(id);
            value = FConvert.toBoolean(FCommon.UI.getAttributeData(id, "bscanned"));
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL.getScanFlag} " + err.message);
        }

        return (value);
    },

    this.setScanFlag = function (id, value) {
        try {
            id = FCommon.UI.getValidElement(id);
            FCommon.UI.setAttributeData(id, "bscanned", value);
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL.setScanFlag} " + err.message);
        }
    },

    this.isMandatory = function (id) {
        var value = 0;

        try {
            id = FCommon.UI.getValidElement(id);
            value = FConvert.toBoolean(FCommon.UI.getAttributeData(id, "bmandatory"));
        }
        catch (err) {
            err.message = "Exception: {OPTIONCONTROL.isMandatory} " + err.message;
            throw err;
        }

        return (value);
    },

    // {Public} Sets Filter
    this.setFilter = function (id, filter, bDoNotClear) {
        id = FCommon.UI.getValidElement(id);

        FCommon.UI.setAttributeData(id, "filter", filter);

        if (FConvert.toBoolean(bDoNotClear) == false) {
            OPTIONCONTROL.clear(id);
        }
    },

    // {Public} Returns filter
    this.getFilter = function (id) {
        var value = "";

        try {
            value = FCommon.UI.getAttributeData(id, "filter");
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL.getFilter} " + err.message);
        }

        return (value);
    },

    // {Public} Sets Table Name
    this.setTableName = function (id, table) {
        id = FCommon.UI.getValidElement(id);

        FCommon.UI.setAttributeData(id, "tablename", table);

        OPTIONCONTROL.clear(id);
    },

    // {Public} Returns Table Name
    this.getTableName = function (id) {
        var vValue = null;

        try {
            vValue = FCommon.UI.getAttributeData(id, "tablename");
        }
        catch (err) {
            err.message = "Exception: {OPTIONCONTROL::getTableName} " + err.message;
            throw err;
        }

        return (vValue);
    },

    // {Public} Sets Primary Field
    this.setPrimaryField = function (id, field) {
        id = FCommon.UI.getValidElement(id);

        FCommon.UI.setAttributeData(id, "primaryfield", field);

        OPTIONCONTROL.clear(id);
    },

    // {Public} Returns Primary Field
    this.getPrimaryField = function (id) {
        var vValue = null;

        try {
            vValue = FCommon.UI.getAttributeData(id, "primaryfield");
        }
        catch (err) {
            err.message = "Exception: {OPTIONCONTROL::getPrimaryField} " + err.message;
            throw err;
        }

        return (vValue);
    },

    // {Public} Sets Display Field
    this.setDisplayField = function (id, field) {
        id = FCommon.UI.getValidElement(id);

        FCommon.UI.setAttributeData(id, "displayfield", field);

        OPTIONCONTROL.clear(id);
    },

    // {Public} Returns Display Field
    this.getDisplayField = function (id) {
        var vValue = null;

        try {
            vValue = FCommon.UI.getAttributeData(id, "displayfield");
        }
        catch (err) {
            err.message = "Exception: {OPTIONCONTROL::getDisplayField} " + err.message;
            throw err;
        }

        return (vValue);
    },

    // {Public} Returns mandatory Field
    this.getMandatoryFields = function (id) {
        var vValue = null;

        try {
            vValue = FCommon.UI.getAttributeData(id, "mandatoryfield");
        }
        catch (err) {
            err.message = "Exception: {OPTIONCONTROL.getMandatoryFields} " + err.message;
            throw err;
        }

        return (vValue);
    },

    // {Public} Set mandatory fields in option control
    this.setMandatoryFields = function (id, sFields) {
        try {
            sFields = FConvert.toString(sFields);
            FCommon.UI.setAttributeData(id, "mandatoryfield", sFields);
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL.setMandatoryFields} " + err.message);
        }
    },

    // {Public} Returns true if option control has specific mandatory Field
    this.hasMandatoryField = function (id, sFieldName) {
        var sMandatoryFields = "";
        var iCounter = 0;
        var arrFields = null;

        try {
            sMandatoryFields = OPTIONCONTROL.getMandatoryFields(id);
            if (FCommon.String.isNullOrEmpty(sMandatoryFields, true) == true) {
                return (false);
            }

            if (FCommon.String.isNullOrEmpty(sFieldName, true) == true) {
                return (true);
            }

            arrFields = sMandatoryFields.split(",");
            for (iCounter = 0; iCounter < arrFields.length; iCounter++) {
                if (arrFields[iCounter].trim() == sFieldName.trim()) {
                    return (true);
                }
            }
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL.hasMandatoryField} " + err.message);
        }

        return (false);
    },

    // {Public} Sets User Data
    this.setUserData = function (id, value) {
        try {
            FCommon.UI.setAttributeData(id, "userdata", value);
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL.setUserData} " + err.message);
        }
    },

    // {Public} Returns User Data
    this.getUserData = function (id) {
        var value = null;

        try {
            value = FCommon.UI.getAttributeData(id, "userdata");
        }
        catch (err) {
            err.message = "Exception: {OPTIONCONTROL.getUserData} " + err.message;
            throw err;
        }

        return (value);
    },

    this.getAfterPopupDisplayedCallback = function (id) {
        var sValue = "";

        try {
            sValue = FCommon.UI.getAttributeData(id, "afterpopupdisplayed");
        }
        catch (err) {
            err.message = "Exception: {OPTIONCONTROL.getAfterPopupDisplayedCallback} " + err.message;
        }

        return (sValue);
    },

    // {Public} Returns onfocus callback method name
    this.getOnFocusCallback = function (id) {
        var sValue = "";

        try {
            sValue = FCommon.UI.getAttributeData(id, "onfocus");
        }
        catch (err) {
            err.message = "Exception: {OPTIONCONTROL.getOnFocusCallback} " + err.message;
        }

        return (sValue);
    },

    // {Public} Returns onblur callback method name
    this.getOnLeaveCallback = function (id) {
        var sValue = "";

        try {
            sValue = FCommon.UI.getAttributeData(id, "onleave");
        }
        catch (err) {
            err.message = "Exception: {OPTIONCONTROL::getOnLeaveCallback} " + err.message;
        }

        return (sValue);
    },

    // {Public} Returns onKeyDown callback method name
    this.getOnKeyDownCallback = function (id) {
        var sValue = "";

        try {
            sValue = FCommon.UI.getAttributeData(id, "onkeydown");
        }
        catch (err) {
            err.message = "Exception: {OPTIONCONTROL::getOnKeyDownCallback} " + err.message;
        }

        return (sValue);
    },

    // {Public} Returns on data loaded callback method name
    this.getOnDataLoadedCallback = function (id) {
        var sValue = "";

        try {
            id = FCommon.UI.getValidElement(id);
            sValue = FCommon.UI.getAttributeData(id, "ondataloaded");
        }
        catch (err) {
            err.message = "Exception: {OPTIONCONTROL::getOnDataLoadedCallback} " + err.message;
        }

        return (sValue);
    },

    // {Public} Returns on data change callback method name
    this.getOnDataChangeCallback = function (id) {
        var sValue = "";

        try {
            id = FCommon.UI.getValidElement(id);
            sValue = FCommon.UI.getAttributeData(id, "ondatachange");
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL.getOnDataChangeCallback} " + err.message);
        }

        return (sValue);
    },

    this.setOnDataChangeCallback = function (id, sValue) {
        try {
            id = FCommon.UI.getValidElement(id);
            sValue = FCommon.UI.setAttributeData(id, "ondatachange", sValue);
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL.setOnDataChangeCallback} " + err.message);
        }
    },

    this.getBarcodeDataLoadedCallback = function (id) {
        var sValue = "";

        try {
            id = FCommon.UI.getValidElement(id);
            sValue = FCommon.UI.getAttributeData(id, "barcodedataloaded");
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL.getBarcodeDataLoadedCallback} " + err.message);
        }

        return (sValue);
    },

    // {Public} Returns callback method name
    this.getDataNotFoundCallback = function (id) {
        var sValue = "";

        try {
            sValue = FCommon.UI.getAttributeData(id, "ondatanotfound");
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL.getDataNotFoundCallback} " + err.message);
        }

        return (sValue);
    },

    this.collapseAllPopups = function () {
        var iCounter = 0;
        var arrElements = null;

        try {
            arrElements = document.getElementsByClassName("option_container");
            if (FCommon.UI.isValidObject(arrElements) == true) {
                for (iCounter = 0; iCounter < arrElements.length; iCounter++) {
                    arrElements[iCounter].style.display = "none";
                }
            }
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL.collapseAllPopups} " + err.message);
        }
    },

    this.updatePopupPosition = function () {
        var sId = "";
        var iCounter = 0;
        var arrElements = null;
        var eleId = null;
        var obj = null;

        try {
            arrElements = document.getElementsByClassName("option_container");
            if (FCommon.UI.isValidObject(arrElements) == true) {
                for (iCounter = 0; iCounter < arrElements.length; iCounter++) {
                    if (arrElements[iCounter].style.display === "none") {
                        continue;
                    }

                    sId = arrElements[iCounter].id;
                    if (FCommon.String.isNullOrEmpty(sId) == true) {
                        continue;
                    }

                    sId = FCommon.String.left(sId, sId.length - "_container".length);
                    eleId = FCommon.UI.getValidElement(sId);

                    obj = FCommon.UI.getVisibleWidthHeight(eleId);
                    if (obj.iVisibleWidth < 1 || obj.iVisibleHeight < 1) {
                        arrElements[iCounter].style.display = "none";
                    }
                    else {
                        FCommon.UI.setFocusDropdownPopupPosition(eleId, arrElements[iCounter]);
                    }                    
                }
            }
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL.updatePopupPosition} " + err.message);
        }
    },

    this.setUnit = function (id, iUnitId, iItemId) {
        try {
            id = FCommon.UI.getValidElement(id);

            id.setAttribute("data-i_UnitId", iUnitId);
            id.setAttribute("data-i_ItemId", iItemId);
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL.setUnit} " + err.message);
        }
    },

    this.setParam = function (id, iParam) {
        try {
            id = FCommon.UI.getValidElement(id);
            FCommon.UI.setAttributeData(id, "iparam", iParam);
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL.setParam} " + err.message);
        }
    },

    this.setGroupId = function (id, iGroupId) {
        try {
            id = FCommon.UI.getValidElement(id);

            id.setAttribute("data-i_GroupId", iGroupId);
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL.setGroupId} " + err.message);
        }
    },

    this.getGroupId = function (id) {
        var iValue = 0;

        try {
            id = FCommon.UI.getValidElement(id);

            iValue = FConvert.toInt(id.getAttribute("data-i_GroupId"));
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL.getGroupId} " + err.message);
        }

        return (iValue);
    },

    // {Public} Create and returns proper object based on passed data and meta data.
    this.convertRawDataIntoObject = function (id, objData) {
        var sMetaDataVariableName = "";
        var sProperty = "";
        var iIndex = 0;
        var obj = null;

        try {
            obj = {};
            sMetaDataVariableName = OPTIONCONTROL_INTERNAL.getMetaDataVariableName(id);
            for (iIndex = 0; iIndex < window[sMetaDataVariableName].length && iIndex < objData.length; iIndex++) {
                sProperty = window[sMetaDataVariableName][iIndex].Name;
                if (FCommon.String.includes(sProperty, " ") == true) {
                    console.log("Error: {OPTIONCONTROL.convertRawDataIntoObject} [id=" + id.id + "][Property=" + sProperty + "] Property cannot have space.");
                }

                if (FCommon.UI.isValidObject(objData) == true) {                    
                    if (FCommon.UI.isValidObject(objData[iIndex].sValue) == true) {
                        obj[sProperty] = objData[iIndex].sValue;
                    }
                    else {
                        obj[sProperty] = COMMON.prototype.getObjectFirstPropertyValue(objData[iIndex]);
                    }
                }
                else {
                    obj[sProperty] = "";
                }
            }
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL.convertRawDataIntoObject} " + err.message);
        }

        return (obj);
    },

    // {Public} Enable Disable Control
    this.disableControl = function (id, bDisable) {
        try {
            id = FCommon.UI.getValidElement(id);
            if (FCommon.UI.isValidObject(id) == false) {
                return;
            }

            if (bDisable == true) {
                id.readOnly = true;
                id.parentElement.parentElement.style.backgroundColor = "#EBEBE4";
                id.style.backgroundColor = "#EBEBE4";
                id.parentNode.style.backgroundColor = "#EBEBE4";
            }
            else {
                id.readOnly = false;
                id.parentElement.parentElement.style.backgroundColor = "";
                id.style.backgroundColor = "";
                id.parentNode.style.backgroundColor = "";
            }
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL.disableControl} " + err.message);
        }
    },

    this.focusText = function (id, value) {
        var sText = "";

        try {
            id = FCommon.UI.getValidElement(id);
            if (FCommon.UI.isValidObject(id) == false) {
                return;
            }

            sText = FCommon.UI.getAttributeData(id, "focustext");

            if (value == undefined) {
                sText = FCommon.UI.getAttributeData(id, "focustext");
            }
            else {
                FCommon.UI.setAttributeData(id, "focustext", value);
            }
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL.focusText} " + err.message);
        }

        return (sText);
    },

    this.getParent = function (ctrl) {
        var result = null;
        var element = null;

        try {
            result = COMMON.prototype.getEmptyResultObject();
            result.lValue = 0;
            result.sValue = "";

            if (FCommon.UI.isValidObject(ctrl) == false) {
                result.lValue = 0;
                result.sValue = "{OPTIONCONTROL::getParent} Option control id required.";

                return (result);
            }

            ctrl = FCommon.UI.getValidElement(ctrl);
            if (FCommon.UI.isValidObject(ctrl) == false) {
                result.lValue = 0;
                result.sValue = "{OPTIONCONTROL::getParent} Option control id cannot be blank.";

                return (result);
            }

            element = document.getElementById(ctrl.id + "_input_container");
            if (FCommon.UI.isValidObject(element) == false) {
                result.lValue = 0;
                result.sValue = "{OPTIONCONTROL::getParent} Invalid control(corrupted).";

                return (result);
            }

            result.data = element.parentElement;
            if (FCommon.UI.isValidObject(result.data) == false) {
                result.lValue = 0;
                result.sValue = "{OPTIONCONTROL::getParent} Parent not found.";

                return (result);
            }

            result.lValue = 1;
        }
        catch (err) {
            result.lValue = -1;
            result.sValue = "{OPTIONCONTROL::getParent} " + err.message;
            bResult = false;
        }

        return (result);
    },

    this.setParent = function (ctrl, newParent, bFocus) {
        var bResult = false;
        var child = null;

        try {
            ctrl = FCommon.UI.getValidElement(ctrl);
            if (FCommon.UI.isValidObject(ctrl) == false) {
                alert("Error: {OPTIONCONTROL::setParent} Option control id cannot be blank");
                return (false);
            }

            if (FCommon.UI.isValidObject(newParent) == false) {
                alert("Error: {OPTIONCONTROL::setParent} New parent object required");
                return (false);
            }

            newParent = FCommon.UI.getValidElement(newParent)
            if (FCommon.UI.isValidObject(newParent) == false) {
                alert("Error: {OPTIONCONTROL::setParent} New parent id cannot be blank");
                return (false);
            }

            child = document.getElementById(ctrl.id + "_input_container");
            if (FCommon.UI.isValidObject(child) == true) {
                newParent.appendChild(child);
            }

            bFocus = FConvert.toBoolean(bFocus);
            if (ctrl.getBoundingClientRect().left != 0 && bFocus == true) {
                ctrl.focus();
            }

            bResult = true;
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL::setParent} " + newParent.id + ", " + err.message);
            bResult = false;
        }

        return (bResult);
    };

}();

var OPTIONCONTROL_INTERNAL = {
    keydown: function (id, evt, sURL) {
        var sInputText = "";
        var sCallback = "";
        var bResult = false;
        var objCtrl = null;

        try {
            sCallback = OPTIONCONTROL.getOnKeyDownCallback(id);
            if (FCommon.String.isNullOrEmpty(sCallback, true) == false) {
                bResult = FConvert.toBoolean(eval(sCallback)(id, evt));
                if (bResult == true) {
                    return;
                }
            }

            switch (evt.keyCode) {
                case 9:
                    sInputText = id.value;
                    objCtrl = OPTIONCONTROL_INTERNAL.getSelectedRow(id);
                    OPTIONCONTROL_INTERNAL.setSelectedValue(id);

                    if (FCommon.String.isNullOrEmpty(id.value) == true && FCommon.String.isNullOrEmpty(sInputText) == false) {
                        if (OPTIONCONTROL_INTERNAL.isPopupVisible(id) == true) {
                            OPTIONCONTROL.hidePopup(id);
                        }

                        sCallback = OPTIONCONTROL.getDataNotFoundCallback(id);
                        if (FCommon.String.isNullOrEmpty(sCallback, true) == false) {
                            bResult = eval(sCallback)(id, { InputText: sInputText, Event: evt });
                            if (bResult == true) {
                                return;
                            }
                        }
                    }

                    if (navigator.userAgent.indexOf("Firefox") != -1) {
                        if (OPTIONCONTROL_INTERNAL.isPopupVisible(id) == true) {
                            FCommon.UI.stopKeyProcess(evt);
                            OPTIONCONTROL.hidePopup(id);
                        }
                    }
                    break;
                case 13:
                    OPTIONCONTROL_INTERNAL.processForBarcode(id, evt);
                    break;
                case 27: // Esc key
                    FCommon.UI.stopKeyProcess(evt);
                    OPTIONCONTROL_INTERNAL.unselectRow(OPTIONCONTROL_INTERNAL.getSelectedRow(id));
                    return;
                case 35: // End key
                    FCommon.UI.stopKeyProcess(evt);
                    OPTIONCONTROL_INTERNAL.selectLastRow(id);
                    break;
                case 36: // Home key
                    FCommon.UI.stopKeyProcess(evt);
                    OPTIONCONTROL_INTERNAL.selectFirstRow(id);
                    break;
                case 38: // up arrow
                    OPTIONCONTROL_INTERNAL.processUpKey(id, evt);
                    break;
                case 40: // down arrow
                    OPTIONCONTROL_INTERNAL.processDownKey(id, evt, sURL);
                    break;
            }
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL_INTERNAL.keydown} " + err.message);
        }
    },

    keyup: function (id, evt, sURL) {
        var sValue = "";
        var row = null;

        try {
            switch (evt.keyCode) {
                case 8: // backspace key
                    sValue = id.value;
                    row = OPTIONCONTROL_INTERNAL.getSelectedRow(id);
                    OPTIONCONTROL_INTERNAL.processInputs(id, sValue, sURL, OPTIONCONTROL_INTERNAL.getElementData(row));
                    if (FCommon.String.isNullOrEmpty(sValue) == false && OPTIONCONTROL_INTERNAL.isPopupVisible(id) == false) {
                        OPTIONCONTROL.showPopup(id, true);
                    }
                    return;
                case 13: // Enter key
                    break;
                case 16: // Shift key
                    return;
                case 19: // Pause key
                    return;
                case 32: // Space bar
                    break;
                case 33: // Page up
                    break;
                case 34: // Page down
                    break;
                case 37: // left arrow
                    break;
                case 38: // up arrow
                    return;
                case 39: // right arrow
                    break;
                case 40: // down arrow
                    return;
                case 44: // Print screen key
                    return;
                case 45: // Insert key
                    return;
                case 46: // Delete key
                    sValue = id.value;
                    OPTIONCONTROL_INTERNAL.processInputs(id, sValue, sURL, null);
                    if (FCommon.String.isNullOrEmpty(sValue) == false && OPTIONCONTROL_INTERNAL.isPopupVisible(id) == false) {
                        OPTIONCONTROL.showPopup(id, true);
                    }
                    break;
                case 106: // Numeric pad * key
                    break;
                case 107: // Numeric pad + key
                    break;
                case 109: // Numeric pad - key
                    break;
                case 110: // Numeric pad . key
                    break;
                case 111: // Numeric pad / key
                    break;
                case 113: // F2
                    OPTIONCONTROL_INTERNAL.processF2(id, evt);
                    break;
                case 116: // F5 Search
                    OPTIONCONTROL_SEARCH.processSearch(id, "", evt);
                    break;
                case 144: // Num Lock key
                    return;
                case 145: // Scroll Lock key
                    return;
                case 186: // ; : key
                    break;
                case 187: // = + key
                    break;
                case 188: // , < key
                    break;
                case 189: // - _ key
                    break;
                case 190: //. > key
                    break;
                case 191: // / ? key
                    break;
                case 192: // ` ~ key
                    return;
                case 219: //[ { key
                    break;
                case 220: // \ | key
                    break;
                case 221: // ] } key
                    break;
                case 222: // ' " key
                    break;
                default:
                    if (evt.keyCode >= 96 && evt.keyCode <= 105) { // Numeric pad number 0 to 9
                    }
                    else if (evt.keyCode >= 48 && evt.keyCode <= 57) { // Number key 0 to 9
                    }
                    else if (evt.keyCode >= 65 && evt.keyCode <= 90) { // key a to z in both case

                    }

                    break;
            }
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL_INTERNAL.keyup} " + err.message);
        }
    },

    input: function (id, evt, sURL) {
        var sValue = "";

        try {
            sValue = FConvert.toString(id.value);

            OPTIONCONTROL_INTERNAL.processInputs(id,
                                        sValue,
                                        sURL,
                                        OPTIONCONTROL_INTERNAL.getElementData(OPTIONCONTROL_INTERNAL.getSelectedRow(id), id));
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL_INTERNAL.input} " + err.message);
        }
    },

    onFocus: function (id, evt) {
        var sCallback = "";
        var value = null;
        var obj = null;

        try {
            if (id == null) {
                alert("Error: {OPTIONCONTROL_INTERNAL.onFocus} Invalid control id.");

                return (false);
            }

            id = FCommon.UI.getValidElement(id);

            value = OPTIONCONTROL_INTERNAL.getDataElement(id).value;

            OPTIONCONTROL.setScanFlag(id, false);
            if (OPTIONCONTROL.getMasterTypeId(id) > 0) {
                // debugger
                if (OPTIONCONTROL.getSearchBy(id) != -1) {
                    OPTIONCONTROL.resetControl(id, value);
                }
                else {
                    OPTIONCONTROL.setSearchBy(id, OPTIONCONTROL_INTERNAL.getFirstField(id));
                }
                
            }

            FCommon.UI.setAttributeData(id, "focusvalue", value);
            OPTIONCONTROL.focusText(id, id.value);
            //FCommon.UI.setAttributeData(id, "focustext", id.value);
            FCommon.UI.setAttributeData(id, "lastValue", value);
            obj = OPTIONCONTROL.getCallbackDataObject(id, null, false);
            obj.Event = evt;

            sCallback = OPTIONCONTROL.getOnFocusCallback(id);
            if (FCommon.String.isNullOrEmpty(sCallback, true) == false) {
                obj.Flag.bLeave = false;
                obj.Flag.bDataLoad = false;
                obj.Flag.bDataChange = false;
                eval(sCallback)(obj);
            }
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL_INTERNAL.onFocus} " + err.message);
        }

        return (true);
    },

    leaveFocus: function (id, evt) {
        var sCallback = "";
        var data = null;
        var obj = null;
        var value = null;

        try {
            id = FCommon.UI.getValidElement(id);
            obj = OPTIONCONTROL.getCallbackDataObject(id, null, true);
            obj.Event = evt;

            OPTIONCONTROL_INTERNAL.setSelectedValue(id);

            value = FConvert.toInt(OPTIONCONTROL.getControlValue(id));
            if (OPTIONCONTROL.getSearchBy(id) != -1 && OPTIONCONTROL.getMasterTypeId(id) > 0) {
                OPTIONCONTROL.resetControl(id, value);
            }

            obj.Data = OPTIONCONTROL.getControlData(id);
            if (FCommon.UI.isValidObject(obj.Data) == true) {
                obj.Value = FConvert.toInt(COMMON.prototype.getObjectFirstPropertyValue(obj.Data[0]));
            }


            OPTIONCONTROL.hidePopup(id, true);

            sCallback = OPTIONCONTROL.getOnDataChangeCallback(id);
            if (FCommon.String.isNullOrEmpty(sCallback, true) == false && obj.OldValue != obj.Value) {
                obj.Flag.bLeave = false;
                obj.Flag.bDataLoad = false;
                obj.Flag.bDataChange = true;
                eval(sCallback)(obj.Control, obj.Data, obj);
                obj.OldValue = obj.Value // 14/Nov/2017
            }

            sCallback = OPTIONCONTROL.getOnLeaveCallback(id);
            if (FCommon.String.isNullOrEmpty(sCallback, true) == false) {
                obj.Flag.bLeave = true;
                obj.Flag.bDataLoad = false;
                obj.Flag.bDataChange = false;

                eval(sCallback)(id, obj.Data, obj);
            }
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL_INTERNAL.leaveFocus} " + err.message);
        }
    },

    dropdownClick: function (id, evt) {
        var arrMetaData = null;
        var sValue = "";

        try {
            FCommon.UI.stopKeyProcess(evt);
            id = FCommon.UI.getValidElement(id);

            if (id.readOnly == true || id.disabled == true) {
                return;
            }

            sValue = id.value;
            arrMetaData = OPTIONCONTROL_INTERNAL.getMetaData(id);
            if (arrMetaData.length == 0) {
                if (FCommon.String.isNullOrEmpty(sValue, true) == true) {
                    OPTIONCONTROL_INTERNAL.processInputs(id, " ", FCommon.UI.getAttributeData(id, "url"), null);
                }

                return;
            }

            if (FCommon.String.isNullOrEmpty(sValue, true) == true && OPTIONCONTROL.getMemoryDataCount(id) == 0) {
                OPTIONCONTROL_INTERNAL.processInputs(id, " ", FCommon.UI.getAttributeData(id, "url"), null);
            }

            OPTIONCONTROL.showPopup(id, true);
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL_INTERNAL.dropdownClick} " + err.message);
        }
    },

    settingsClick: function (id, evt) {
        try {
            id = FCommon.UI.getValidElement(id);
            if (FCommon.UI.isValidObject(id) == false) {
                return;
            }

            if (id.readOnly == true || id.disabled == true) {
                return;
            }

            OPTIONCONTROL_CUSTOMIZE.open(id, evt);
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL_INTERNAL.settingsClick} " + err.message);
        }
    },

    processInputs: function (id, sKey, sURL, objData) {
        var arrIndex = null;
        var vValue = null;
        var row = null;
        var objParam = null;

        try {
            if (OPTIONCONTROL.isKeepUnmatchedData(id) == true) {
                if (FCommon.String.isNullOrEmpty(sKey) == true) {
                    OPTIONCONTROL_INTERNAL.clearControlData(id);
                }
            }
            else {
                if (OPTIONCONTROL.isValidStoredData(id, sKey) == false) {
                    OPTIONCONTROL.clear(id, true);

                    if (FCommon.UI.isValidObject(objData) == true) {
                        objData = null;
                    }
                }
            }

            if (OPTIONCONTROL.isInputBarcodeEnabled(id) == true) {
                return;
            }

            arrIndex = OPTIONCONTROL.getKeyDataIndexArray(id, sKey, 0);
            if (FCommon.String.isNullOrEmpty(sURL) == false && (arrIndex == null || arrIndex.length <= 0)) {
                objParam = OPTIONCONTROL.getServerCommunicationParameterObject(id, sURL);
                objParam.sSearch = sKey;
                OPTIONCONTROL.getDataFromServer(objParam);
            }
            else {
                OPTIONCONTROL.fillDataFromIndex(id, OPTIONCONTROL_INTERNAL.getMetaData(id), arrIndex);
                if (FCommon.UI.isValidObject(objData) == true) {
                    row = OPTIONCONTROL_INTERNAL.getRowFromObject(id, objData);
                    if (row != null) {
                        OPTIONCONTROL_INTERNAL.selectRow(row, id);
                    }
                    else {
                        OPTIONCONTROL_INTERNAL.selectFirstRow(id);
                    }
                }
                else {
                    OPTIONCONTROL_INTERNAL.selectFirstRow(id);
                }
            }

            if (OPTIONCONTROL_INTERNAL.isPopupVisible(id) == false) {
                if (OPTIONCONTROL_INTERNAL.getMetaData(id).length > 0) {
                    OPTIONCONTROL.showPopup(id, true);
                }
                // OPTIONCONTROL.showPopup(id, true);
            }
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL_INTERNAL.processInputs} " + err.message);
        }
    },

    processForBarcode: function (id, evt) {
        var sHandler = "";
        var sBarcodeProductURL = "";
        var iMasterTypeId = 0;
        var data = null;
        var obj = null;

        try {
            if (FCommon.String.isNullOrEmpty(id.value, true) == true) {
                return(false);
            }

            iMasterTypeId = OPTIONCONTROL.getMasterTypeId(id);
            if (iMasterTypeId != 2) {
                return (false);
            }

            data = OPTIONCONTROL_INTERNAL.getSelectedRowValue(id);
            if (FCommon.UI.isValidObject(data) == true) {
                return (false);
            }

            sBarcodeProductURL = OPTIONCONTROL.getBarcodeProductURL(id);
            if (FCommon.String.isNullOrEmpty(sBarcodeProductURL) == true) {
                return (false);
            }

            data = NETWORK.executeServerMethod(sBarcodeProductURL, false, { sBarcode: id.value }, "json", false);
            if (data.lValue > 0) {
                data = data.data;
                if (data.lValue > 0) {
                    obj = data.data;
                    if (obj.ItemId > 0) {
                        OPTIONCONTROL.setControlValue(id, obj.ItemId);
                        OPTIONCONTROL.setScanFlag(id, true);
                    }

                    sHandler = OPTIONCONTROL.getBarcodeDataLoadedCallback(id);
                    if (FCommon.String.isNullOrEmpty(sHandler, true) == false) {
                        eval(sHandler)(id, obj);
                    }
                }
                else if (FCommon.String.isNullOrEmpty(data.sValue, true) == false) {
                    alert("Error: {OPTIONCONTROL_INTERNAL.processForBarcode)} " + data.sValue);
                }
            }
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL_INTERNAL.processForBarcode)} " + err.message);
        }

        return (true);
    },

    processF2: function (id, evt) {
        var iSearchBy = 0;
        var iId = 0;

        try {
            iId = FConvert.toInt(OPTIONCONTROL.getControlValue(id));

            iSearchBy = OPTIONCONTROL.getSearchBy(id);
            iSearchBy++;
            //if (iSearchBy < -1 || iSearchBy > 2) {
             if (iSearchBy < 0 || iSearchBy > 2) {
                // debugger
                //iSearchBy = -1;
                iSearchBy = 0;
            }

            OPTIONCONTROL.setSearchBy(id, iSearchBy);
            OPTIONCONTROL.clearHeading(id);
            OPTIONCONTROL.clear(id, false);
            OPTIONCONTROL.setControlValue(id, iId);
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL_INTERNAL.processF2)} " + err.message);
        }
    },

    processUpKey: function (id, evt) {
        var row = null;

        try {
            FCommon.UI.stopKeyProcess(evt);

            if (OPTIONCONTROL_INTERNAL.isPopupVisible(id) == false && OPTIONCONTROL_INTERNAL.getMetaData(id).length > 0) {
                OPTIONCONTROL.showPopup(id, true);
                return;
            }

            row = OPTIONCONTROL_INTERNAL.getSelectedRow(id);
            if (row != null) {
                OPTIONCONTROL_INTERNAL.unselectRow(row);
                row = OPTIONCONTROL_INTERNAL.getPreviousDataRow(row);
            }

            if (row == null) {
                row = OPTIONCONTROL_INTERNAL.getFirstDataRow(id);
            }

            if (row != null) {
                OPTIONCONTROL_INTERNAL.selectRow(row, id);
            }
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL_INTERNAL.processUpKey} " + err.message);
        }
    },

    processDownKey: function (id, evt, sURL) {
        var row = null;
        var bFlag = false;
        var objData = null;
        var obj = null;

        try {
            FCommon.UI.stopKeyProcess(evt);

            if (OPTIONCONTROL_INTERNAL.isPopupVisible(id) == false && OPTIONCONTROL_INTERNAL.getMetaData(id).length > 0) {
                OPTIONCONTROL.showPopup(id, true);
                OPTIONCONTROL.setControlValue(id, OPTIONCONTROL.getControlValue(id));
                return;
            }

            row = OPTIONCONTROL_INTERNAL.getSelectedRow(id);
            if (FCommon.UI.isValidObject(row) == false) {
                OPTIONCONTROL_INTERNAL.selectFirstRow(id);
                return;
            }

            bFlag = true;
            objData = OPTIONCONTROL_INTERNAL.getElementData(row);
            OPTIONCONTROL_INTERNAL.unselectRow(row);
            row = OPTIONCONTROL_INTERNAL.getNextDataRow(row);

            if (row != null) {
                OPTIONCONTROL_INTERNAL.selectRow(row, id);
            }
            else if (bFlag == true) {
                obj = OPTIONCONTROL.getServerCommunicationParameterObject(id, sURL);
                obj.sSearch = id.value;
                obj.iExistingDataCount = OPTIONCONTROL_INTERNAL.getControlDataRowCount(id);
                obj.SelectedData = objData;
                OPTIONCONTROL.getDataFromServer(obj);
            }
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL_INTERNAL.processDownKey} " + err.message);
        }
    },

    getRowFromObject: function (id, objData) {
        var iCompareValueIndex = 0;
        var row = null;
        var obj = null;

        try {
            iCompareValueIndex = OPTIONCONTROL_INTERNAL.getCompareValueIndex(id);
            for (row = OPTIONCONTROL_INTERNAL.getFirstDataRow(id) ; row != null; row = OPTIONCONTROL_INTERNAL.getNextDataRow(row)) {
                //obj = OPTIONCONTROL_INTERNAL.getElementData(row); // Data not loaded because mandatory and displayfield or common reported by safdar
                obj = OPTIONCONTROL_INTERNAL.getElementData(row, id);
                if (OPTIONCONTROL.compareObject(obj, objData, iCompareValueIndex) == true) {
                    return (row);
                }
            }
        }
        catch (err) {
            err.message = "Exception: {OPTIONCONTROL_INTERNAL.getRowFromObject} " + err.message;
            throw err;
        }

        return (null);
    },

    // Sets control selected data into hidden element
    setControlData: function (id, objData) {
        var sMetaDataVariableName = "";
        var sProperty = "";
        var iStoreValueIndex = 0;
        var iCompareValueIndex = 0;
        var iExactMatchValue = 0;        
        var iTotal = 0;
        var element = null;

        var iIndex = 0;

        try {
            sMetaDataVariableName = OPTIONCONTROL_INTERNAL.getMetaDataVariableName(id);
            iStoreValueIndex = OPTIONCONTROL_INTERNAL.getStoreValueIndex(id);
            iCompareValueIndex = OPTIONCONTROL_INTERNAL.getCompareValueIndex(id);

            element = OPTIONCONTROL_INTERNAL.getDataElement(id);
            if (FCommon.UI.isValidObject(element) == false) {
                return;
            }

            iTotal = FCommon.Array.getLength(window[sMetaDataVariableName]);
            for (iIndex = 0; iIndex < iTotal; iIndex++) {
                sProperty = window[sMetaDataVariableName][iIndex].Name;
                if (FCommon.String.includes(sProperty, " ") == true) {
                    console.log("Error: {OPTIONCONTROL_INTERNAL.setControlData} [id=" + id.id + "][Property=" + sProperty + "] Property cannot have space.");
                }

                if (FCommon.UI.isValidObject(objData) == true) {
                    if (iIndex < objData.length) {
                        FCommon.UI.setAttributeData(element, sProperty, objData[iIndex].sValue);
                    }
                }
                else {
                    FCommon.UI.setAttributeData(element, sProperty, "");
                }
            }

            if (FCommon.UI.isValidObject(objData) == true) {
                element.setAttribute("value", objData[iStoreValueIndex].sValue);
                id.value = objData[iCompareValueIndex].sValue;
            }
            else {
                element.setAttribute("value", "0");

                iExactMatchValue = OPTIONCONTROL_INTERNAL.getExactMatchValue(id);
                if (iExactMatchValue != 0) {
                    id.value = "";
                }
            }
        }
        catch (err) {
            err.message = "Exception: {OPTIONCONTROL_INTERNAL.setControlData} " + err.message;
            throw err;
        }
    },

    // Match store key index value in stored data with passed value and select it in control
    selectValueInControl: function (id, value, tag, bIgnoreChangeCallback) {
        var sCallback = "";
        var iStoreValueIndex = 0;
        var row = null;
        var result = null;
        var arrIndex = [];
        var obj = null;

        try {
            id = FCommon.UI.getValidElement(id);

            iStoreValueIndex = OPTIONCONTROL_INTERNAL.getStoreValueIndex(id);

            obj = OPTIONCONTROL.getCallbackDataObject(id, tag, false);
            obj.OldData = OPTIONCONTROL_INTERNAL.getSelectedRowValue(id);

            row = OPTIONCONTROL_INTERNAL.getSelectedRow(id);
            OPTIONCONTROL_INTERNAL.unselectRow(row);

            result = OPTIONCONTROL_INTERNAL.getValueFromMemory(id, value, iStoreValueIndex);
            if (FCommon.UI.isValidObject(result) == true && result.length > 0) {
                row = OPTIONCONTROL_INTERNAL.getRowFromObject(id, result[1]);
                if (row == null) {
                    arrIndex.push(result[0]);
                    OPTIONCONTROL.fillDataFromIndex(id, OPTIONCONTROL_INTERNAL.getMetaData(id), arrIndex);
                }

                if (row == null) {
                    row = OPTIONCONTROL_INTERNAL.getRowFromObject(id, result[1]);
                }

                if (row != null) {
                    OPTIONCONTROL_INTERNAL.selectRow(row, id);
                    OPTIONCONTROL_INTERNAL.setControlData(id, result[1]);
                }

                obj.Data = OPTIONCONTROL_INTERNAL.getSelectedRowValue(id);
                if (FCommon.UI.isValidObject(obj.Data) == true) {
                    obj.Value = FConvert.toInt(COMMON.prototype.getObjectFirstPropertyValue(obj.Data[0]));
                }

                sCallback = OPTIONCONTROL.getOnDataLoadedCallback(id);
                if (FCommon.String.isNullOrEmpty(sCallback, true) == false) {
                    obj.Flag.bLeave = false;
                    obj.Flag.bDataLoad = true;
                    obj.Flag.bDataChange = false;
                    eval(sCallback)(obj.Control, obj.Data, obj);
                }

                sCallback = OPTIONCONTROL.getOnDataChangeCallback(id);
                if (FCommon.String.isNullOrEmpty(sCallback, true) == false && obj.OldValue != obj.Value) {
                    FCommon.UI.setAttributeData(id, "focusvalue", obj.Value);
                    OPTIONCONTROL.focusText(id, id.value);
                    //FCommon.UI.setAttributeData(id, "focustext", id.value);
                    FCommon.UI.setAttributeData(id, "lastvalue", obj.Value);

                    obj.Flag.bLeave = false;
                    obj.Flag.bDataLoad = false;
                    obj.Flag.bDataChange = true;

                    bIgnoreChangeCallback = FConvert.toBoolean(bIgnoreChangeCallback);
                    if (bIgnoreChangeCallback == false) {
                        eval(sCallback)(obj.Control, obj.Data, obj);
                    }                    
                }

                return (true);
            }
            else {
                OPTIONCONTROL_INTERNAL.setControlData(id, null);
            }
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL_INTERNAL.selectValueInControl} " + err.message);
        }

        return (false);
    },

    // Returns object from memory data where given value match with store value
    getValueFromMemory: function (id, value, iStoreValueIndex) {
        var sDataVariableName = "";
        var iCounter = 0;
        var iTotal = 0;
        var objExisting = null;
        var result = [];

        try {
            if (FCommon.UI.isValidObject(iStoreValueIndex) == false) {
                iStoreValueIndex = OPTIONCONTROL_INTERNAL.getStoreValueIndex(id);
            }

            sDataVariableName = OPTIONCONTROL_INTERNAL.getDataVariableName(id);
            iTotal = FCommon.Array.getLength(window[sDataVariableName]);
            for (iCounter = 0; iCounter < iTotal; iCounter++) {
                objExisting = window[sDataVariableName][iCounter];
                if (FCommon.String.compare(objExisting[iStoreValueIndex].sValue, value, false) == 0) {
                    result.push(iCounter);
                    result.push(objExisting);
                    return (result);
                }
            }
        }
        catch (err) {
            err.message = "Exception: {OPTIONCONTROL_INTERNAL.getValueFromMemory} " + err.message;
            throw err;
        }

        return (result);
    },

    // Returns existing data row count
    getControlDataRowCount: function (id) {
        var objBody = null;
        var element = null;
        var iCount = 0;

        try {
            objBody = OPTIONCONTROL_INTERNAL.getDataTableBodyElement(id);
            if (FCommon.UI.isValidObject(objBody) == false) {
                return (0);
            }

            for (element = objBody.firstChild; element != null; element = element.nextSibling) {
                iCount++;
            }
        }
        catch (err) {
            err.message = "Exception: {OPTIONCONTROL_INTERNAL.getControlDataRowCount} " + err.message;
            throw err;
        }

        return (iCount);
    },

    // Returns selected row value
    getSelectedRowValue: function (id) {
        var iCompareValueIndex = 0;
        var data = null;

        try {
            id = FCommon.UI.getValidElement(id);
            iCompareValueIndex = OPTIONCONTROL_INTERNAL.getCompareValueIndex(id);

            data = OPTIONCONTROL_INTERNAL.getElementData(OPTIONCONTROL_INTERNAL.getSelectedRow(id), id);
            if (FCommon.UI.isValidObject(data) == true && data.length > iCompareValueIndex) {
                return (data);
            }
        }
        catch (err) {
            err.message = "Exception: {OPTIONCONTROL_INTERNAL.getSelectedRowValue} " + err.message;
            throw err;
        }

        return (null);
    },

    // Sets selected value into control
    setSelectedValue: function (id) {
        var iCompareValueIndex = 0;
        var data = null;

        try {
            id = FCommon.UI.getValidElement(id);
            iCompareValueIndex = OPTIONCONTROL_INTERNAL.getCompareValueIndex(id);

            data = OPTIONCONTROL_INTERNAL.getElementData(OPTIONCONTROL_INTERNAL.getSelectedRow(id), id);
            if (FCommon.UI.isValidObject(data) == true && data.length > iCompareValueIndex) {
                OPTIONCONTROL_INTERNAL.setControlData(id, data);
            }
            else {
                OPTIONCONTROL_INTERNAL.setControlData(id, null);
            }
        }
        catch (err) {
            err.message = "Exception: {OPTIONCONTROL_INTERNAL.setSelectedValue} " + err.message;
            throw err;
        }
    },

    // Returns store value index received from server while fetching data
    getStoreValueIndex: function (id) {
        var value = 0;

        try {
            value = FCommon.UI.getAttributeData(id, OPTIONCONTROL_INTERNAL.getStoreValueIndexKey());
            if (FCommon.UI.isValidObject(value) == false) {
                value = 0;
            }

            value = Number(value);
        }
        catch (err) {
            err.message = "Exception: {OPTIONCONTROL_INTERNAL.getStoreValueIndex} " + err.message;
            throw err;
        }

        return (value);
    },

    // Sets store value index
    setStoreValueIndex: function (id, iStoreValueIndex) {
        FCommon.UI.setAttributeData(id, OPTIONCONTROL_INTERNAL.getStoreValueIndexKey(), iStoreValueIndex);
    },

    // Returns compare value index received from server while fetching data
    getCompareValueIndex: function (id) {
        var vValue = 0;

        try {
            vValue = FCommon.UI.getAttributeData(id, OPTIONCONTROL_INTERNAL.getCompareValueIndexKey());
            if (FCommon.UI.isValidObject(vValue) == false) {
                vValue = 0;
            }

            vValue = Number(vValue);
        }
        catch (err) {
            err.message = "Exception: {OPTIONCONTROL_INTERNAL.getCompareValueIndex} " + err.message;
            throw err;
        }

        return (vValue);
    },

    // Sets compare value index
    setCompareValueIndex: function (id, iCompareValueIndex) {
        FCommon.UI.setAttributeData(id, OPTIONCONTROL_INTERNAL.getCompareValueIndexKey(), iCompareValueIndex);
    },

    // Returns exact match flag value
    getExactMatchValue: function (id) {
        var value = 0;

        try {
            value = FCommon.UI.getAttributeData(id, OPTIONCONTROL_INTERNAL.getExactMatchKey());
            if (FCommon.UI.isValidObject(value) == false) {
                value = 1;
            }

            value = parseInt(value);
        }
        catch (err) {
            err.message = "Exception: {OPTIONCONTROL_INTERNAL.getExactMatchValue} " + err.message;
            throw err;
        }

        return (value);
    },

    // Returns data attribute value array of given element
    getElementData: function (element, id) {
        var sMetaDataVariableName = "";
        var sProperty = "";
        var data = [];
        var iCounter = 0;

        try {
            if (FCommon.UI.isValidObject(element) == false) {
                return (null);
            }

            if (FCommon.UI.isValidObject(id) == false) {
                for (iCounter = 0; iCounter < element.attributes.length; iCounter++) {
                    if (FCommon.String.compare(element.attributes[iCounter].name, "data-", true, "data-".length) == 0) {
                        data.push({ "sValue": element.attributes[iCounter].value });
                    }
                }
            }
            else {
                id = FCommon.UI.getValidElement(id);
                sMetaDataVariableName = OPTIONCONTROL_INTERNAL.getMetaDataVariableName(id);
                for (iCounter = 0; iCounter < window[sMetaDataVariableName].length; iCounter++) {
                    sProperty = window[sMetaDataVariableName][iCounter].Name;
                    if (FCommon.String.includes(sProperty, " ") == true) {
                        console.log("Error: {OPTIONCONTROL_INTERNAL.getElementData} [id=" + id.id + "][Property=" + sProperty + "] Property cannot have space.");
                    }

                    data.push({ "sValue": element.getAttribute("data-" + sProperty.toLowerCase()) });
                }
            }
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL_INTERNAL.getElementData} " + err.message);
        }

        return (data);
    },

    isPopupVisible: function (id) {
        var ctrlPopuup = null;

        try {
            if (id == null) {
                alert("Error: {OPTIONCONTROL_INTERNAL.isPopupVisible} Invalid control id.");

                return (false);
            }

            ctrlPopuup = OPTIONCONTROL_INTERNAL.getDataContainerElement(id);
            if (ctrlPopuup == null) {
                alert("Error: {OPTIONCONTROL_INTERNAL.isPopupVisible} Data container not found.");

                return (false);
            }

            return (ctrlPopuup.style.display != 'none');
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL_INTERNAL.isPopupVisible} " + err.message);
        }

        return (false);
    },

    // Select given row
    selectRow: function (row, id) {
        try {
            if (FCommon.UI.isValidObject(row) == false) {
                return (false);
            }

            row.className = OPTIONCONTROL_INTERNAL.getSelectedDataRowClassName();
            if (OPTIONCONTROL_INTERNAL.isRowVisible(row, id) == false) {
                OPTIONCONTROL_INTERNAL.makeTableRowVisibile(row, id);

                //row.scrollIntoView(false);
            }
        }
        catch (err) {
            err.message = "Exception: {selectRow} " + err.message;
            throw err;
        }

        return (true);
    },

    // Unselect given row
    unselectRow: function (row) {
        try {
            if (FCommon.UI.isValidObject(row) == false) {
                return (false);
            }

            row.className = OPTIONCONTROL_INTERNAL.getDataRowClassName();
        }
        catch (err) {
            err.message = "Exception: {OPTIONCONTROL_INTERNAL.unselectRow} " + err.message;
            throw err;
        }

        return (true);
    },

    // Selects first row
    selectFirstRow: function (id) {
        var objRow = null;

        try {
            objRow = OPTIONCONTROL_INTERNAL.getSelectedRow(id);
            if (objRow != null) {
                OPTIONCONTROL_INTERNAL.unselectRow(objRow);
            }

            objRow = OPTIONCONTROL_INTERNAL.getFirstDataRow(id);
            if (objRow != null) {
                objRow.parentElement.parentElement.parentElement.scrollTop = 0;
                OPTIONCONTROL_INTERNAL.selectRow(objRow, id);
            }
        }
        catch (err) {
            err.message = "Exception: {OPTIONCONTROL_INTERNAL.selectFirstRow} " + err.message;
            throw err;
        }

        return (objRow);
    },

    // Selects last row
    selectLastRow: function (id) {
        var objRow = null;

        try {
            objRow = OPTIONCONTROL_INTERNAL.getSelectedRow(id);
            if (objRow != null) {
                OPTIONCONTROL_INTERNAL.unselectRow(objRow);
            }

            objRow = OPTIONCONTROL_INTERNAL.getLastDataRow(id);
            if (objRow != null) {
                OPTIONCONTROL_INTERNAL.selectRow(objRow, id);
            }
        }
        catch (err) {
            err.message = "Exception: {OPTIONCONTROL_INTERNAL.selectLastRow} " + err.message;
            throw err;
        }

        return (objRow);
    },

    // Checks table row is visible in parent div
    isRowVisible: function (row, id) {
        var div = null;
        var rowRect = null;
        var divRect = null;
        var bResult = false;

        try {
            div = document.getElementById(id.id + '_div_data');
            if (FCommon.UI.isValidObject(div) == false) {
                return (false);
            }

            rowRect = row.getBoundingClientRect();
            divRect = div.getBoundingClientRect();

            bResult = rowRect.top >= divRect.top && rowRect.top < (divRect.bottom - 10);

        }
        catch (err) {
            err.message = "Exception: {OPTIONCONTROL_INTERNAL.isRowVisible} " + err.message;
            throw err;
        }

        return (bResult);
    },

    makeTableRowVisibile: function (row, id) {
        var iLastScrollTop = 0;
        var iHeight = 0;

        try {
            iLastScrollTop = row.parentElement.parentElement.parentElement.scrollTop;
            iHeight = row.getBoundingClientRect().height;

            row.parentElement.parentElement.parentElement.scrollTop += iHeight;

            if (OPTIONCONTROL_INTERNAL.isRowVisible(row, id) == false) {
                row.parentElement.parentElement.parentElement.scrollTop = iLastScrollTop;
                row.parentElement.parentElement.parentElement.scrollTop -= iHeight;
            }

            if (OPTIONCONTROL_INTERNAL.isRowVisible(row, id) == false) {
                row.parentElement.parentElement.parentElement.scrollTop = iLastScrollTop;
            }
        }
        catch (err) {
            err.message = "Exception: {OPTIONCONTROL_INTERNAL.makeTableRowVisibile} " + err.message;
            throw err;
        }
    },

    // Returns first data row
    getFirstDataRow: function (id) {
        var parent = null;

        try {
            parent = OPTIONCONTROL_INTERNAL.getDataTableBodyElement(id);
            if (parent == null) {
                return (null);
            }

            return (parent.firstChild);
        }
        catch (err) {
            alert("Exception: {getFirstDataRow} " + err.message);
        }

        return (null);
    },

    // Returns next data row of given
    getNextDataRow: function (objRow) {

        try {
            if (FCommon.UI.isValidObject(objRow) == false) {
                return (null);
            }

            objRow = objRow.nextSibling;
        }
        catch (err) {
            err.message = "Exception: {OPTIONCONTROL_INTERNAL.getNextDataRow} " + err.message;
            throw err;
        }

        return (objRow);
    },

    // Returns previous data row of given
    getPreviousDataRow: function (objRow) {

        try {
            if (FCommon.UI.isValidObject(objRow) == false) {
                return (null);
            }

            objRow = objRow.previousSibling;
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL_INTERNAL.getPreviousDataRow} " + err.message);
        }

        return (objRow);
    },

    // Returns last data row
    getLastDataRow: function (id) {
        var parent = null;

        try {
            parent = OPTIONCONTROL_INTERNAL.getDataTableBodyElement(id);
            if (parent == null) {
                return (null);
            }

            return (parent.lastChild);
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL_INTERNAL.getLastDataRow} " + err.message);
        }

        return (null);
    },

    getDataBodyId: function (id) {
        var sName = "";

        try {
            sName = id.id + "_table_data_body";
        }
        catch (err) {
            err.message = "Exception: {OPTIONCONTROL_INTERNAL.getDataBodyId} " + err.message;
            throw err;
        }

        return (sName);
    },

    // Returns body of data table
    getDataTableBodyElement: function (id) {
        var element = null;

        try {
            element = document.getElementById(OPTIONCONTROL_INTERNAL.getDataBodyId(id));
        }
        catch (err) {
            err.message = "Exception: {OPTIONCONTROL_INTERNAL.getDataTableBodyElement} " + err.message;
            throw err;
        }

        return (element);
    },

    // Returns first selected row
    getSelectedRow: function (id) {
        var parent = null;
        var ctrl = null;

        try {
            id = FCommon.UI.getValidElement(id);
            parent = OPTIONCONTROL_INTERNAL.getDataTableBodyElement(id);
            if (parent == null) {
                return (null);
            }

            for (ctrl = parent.firstChild; ctrl != null; ctrl = ctrl.nextSibling) {
                if (ctrl.className == OPTIONCONTROL_INTERNAL.getSelectedDataRowClassName()) {
                    return (ctrl);
                }
            }
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL_INTERNAL.getSelectedRow} " + err.message);
        }

        return (null);
    },

    getFirstField: function (id) {
        var value = 0;

        try {
            id = FCommon.UI.getValidElement(id);
            value = FConvert.toInt(FCommon.UI.getAttributeData(id, "i_firstfield"));
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL_INTERNAL.getFirstField} " + err.message);
        }

        return (value);
    },

    setFirstField: function (id, value) {
        try {

            id = FCommon.UI.getValidElement(id);
            FCommon.UI.setAttributeData(id, "i_firstfield", value);
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL_INTERNAL.setFirstField} " + err.message);
        }
    },

    getCustomizeUIURL: function (id) {
        var value = "";

        try {
            id = FCommon.UI.getValidElement(id);
            value = FConvert.toString(FCommon.UI.getAttributeData(id, "customizeuiurl"));
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL_INTERNAL.getCustomizeUIURL} " + err.message);
        }

        return (value);
    },

    // Cleares control data
    clearControlData: function (id) {
        var element = null;
        var objBody = null;

        try {
            objBody = OPTIONCONTROL_INTERNAL.getDataTableBodyElement(id);
            if (FCommon.UI.isValidObject(objBody) == true) {
                while (objBody.firstChild) {
                    objBody.removeChild(objBody.firstChild);
                }
            }

            element = OPTIONCONTROL_INTERNAL.getDataElement(id);
            if (FCommon.UI.isValidObject(element) == true) {
                FCommon.UI.removeDataAttribute(element);
                element.value = 0;
            }
        }
        catch (err) {
            err.message = "Exception: {OPTIONCONTROL_INTERNAL.clearControlData} " + err.message;
            throw err;
        }
    },

    // Cleares memory data array
    clearMemoryData: function (id) {
        try {
            window[OPTIONCONTROL_INTERNAL.getDataVariableName(id)] = [];
        }
        catch (err) {
            err.message = "Exception: {OPTIONCONTROL_INTERNAL.clearMemoryData} " + err.message;
            throw err;
        }
    },

    createHeading: function (id, arrMetaData) {
        var parent = null;
        var iCounter = 0;
        var objData = null;
        var colGroup = null;
        var row = null;
        var element = null;
        var iWidth = 0;

        try {
            parent = OPTIONCONTROL_INTERNAL.getDataTableHeadingElement(id);
            if (parent == null) {
                return (false);
            }

            while (parent.firstChild) {
                parent.removeChild(parent.firstChild);
            }

            if (FCommon.UI.isValidObject(arrMetaData) == false) {
                return;
            }

            window[OPTIONCONTROL_INTERNAL.getMetaDataVariableName(id)] = arrMetaData;

            colGroup = document.createElement("colgroup");
            row = document.createElement("tr");

            for (iCounter = 0; iCounter < arrMetaData.length; iCounter++) {
                objData = arrMetaData[iCounter];
                if (objData.Hidden == true) {
                    continue;
                }

                iWidth += objData.Width;

                element = document.createElement("col");
                element.setAttribute("width", objData.Width);
                colGroup.appendChild(element);

                element = document.createElement("th");
                element.className = "option_heading theme_background-color theme_color";
                element.style.minWidth = objData.Width + "px";
                element.style.maxWidth = objData.Width + "px";
                element.style.position = "relative";
                element.style.borderRight = "solid 1px rgb(154, 198, 255)";
                // element.style.fontWeight = "bold";
                element.style.fontweight = "normal";
                element.style.paddingLeft = "3px";
                element.style.paddingRight = "3px";
                element.style.paddingTop = "1px";
                element.style.paddingBottom = "3px";
                element.style.overflow = "hidden";
                element.style.textOverflow = "ellipsis";
                element.style.whiteSpace = "nowrap";
                element.style.backgroundColor = GLOBAL.getThemeColor();
                element.setAttribute("align", COMMON.prototype.getTableColumnAlignText(objData.Align));
                COMMON.prototype.setElementText(element, objData.Name);
                row.appendChild(element)
            }
            parent.appendChild(colGroup);

            element = document.createElement("thead");
            element.appendChild(row);
            parent.appendChild(element);

            OPTIONCONTROL.setDataContainerPosition(id);
        }
        catch (err) {
            err.message = "Exception: {OPTIONCONTROL_INTERNAL.createHeading} " + err.message;
            throw err;
        }
    },

    // Returns data table heading element
    getDataTableHeadingElement: function (id) {
        var element = null;

        try {
            element = document.getElementById(id.id + "_table_head");
        }
        catch (err) {
            err.message = "Exception: {OPTIONCONTROL_INTERNAL.getDataTableHeadingElement} " + err.message;
            throw err;
        }

        return (element);
    },

    // Returns data table element
    getDataTableElement: function (id) {
        var element = null;

        try {
            element = document.getElementById(id.id + "_table_data");
        }
        catch (err) {
            err.message = "Exception: {OPTIONCONTROL_INTERNAL.getDataTableElement} " + err.message;
            throw err;
        }

        return (element);
    },

    // Returns data table colgroup element
    getDataTableColGroupElement: function (id) {
        var element = null;

        try {
            element = document.getElementById(OPTIONCONTROL_INTERNAL.getDataColGroupId(id));
        }
        catch (err) {
            err.message = "Exception: {OPTIONCONTROL_INTERNAL.getDataTableColGroupElement} " + err.message;
            throw err;
        }

        return (element);
    },

    // Returns data container element which contains data heading and data rows
    getDataContainerElement: function (id) {
        var element = null;

        try {
            element = document.getElementById(id.id + "_container");
        }
        catch (err) {
            err.message = "Exception: {OPTIONCONTROL_INTERNAL.getDataContainerElement} " + err.message;
            throw err;
        }

        return (element);
    },

    getSearchContainerElement: function (id) {
        var element = null;

        try {
            element = document.getElementById(id.id + "_search_container");
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL_INTERNAL.getSearchContainerElement} " + err.message);
        }

        return (element);
    },

    getDataElement: function (id) {
        var eleData = null;

        try {
            if (FCommon.UI.isValidObject(id) == true) {
                eleData = document.getElementById(id.id + "_data");
            }
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL_INTERNAL.getDataElement} " + err.message);
        }

        return (eleData);
    },

    getInputContainerId: function (id) {
        var sName = "";

        try {
            sName = id.id + "_input_container";
        }
        catch (err) {
            err.message = "Exception: {OPTIONCONTROL_INTERNAL.getInputContainerId} " + err.message;
            throw err;
        }

        return (sName);
    },

    getInputImageId: function (id) {
        var sName = "";

        try {
            sName = id.id + "_input_image";
        }
        catch (err) {
            err.message = "Exception: {OPTIONCONTROL_INTERNAL.getInputImageId} " + err.message;
            throw err;
        }

        return (sName);
    },

    getDataColGroupId: function (id) {
        var sName = "";

        try {
            sName = id.id + "_table_data_colgroup";
        }
        catch (err) {
            err.message = "Exception: {OPTIONCONTROL_INTERNAL.getDataColGroupId} " + err.message;
            throw err;
        }

        return (sName);
    },

    isInvalidkeyCode: function (keyCode) {
        try {
            switch (keyCode) {
                case 9: // Tab key
                case 10: // Enter key
                case 13: // Enter key
                    //case 27: // Escape key
                case 33: // Page up
                case 34: // Page down
                    //case 35: // End key
                    //case 36: // Home key
                case 37: // left arrow
                    //case 38: // up arrow
                case 39: // right arrow
                    //case 40: // down arrow
                case 44: // Print screen key
                case 45: // Insert key
                    return (true);
            }
        }
        catch (err) {
            err.message = "Exception: {OPTIONCONTROL_INTERNAL.isInvalidkeyCode} " + err.message;
            throw err;
        }

        return (false);
    },

    getMetaData: function (id) {
        var arrMetaData = [];

        try {
            arrMetaData = window[OPTIONCONTROL_INTERNAL.getMetaDataVariableName(id)];
            if (FCommon.UI.isValidObject(arrMetaData) == false) {
                arrMetaData = [];
            }
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL_INTERNAL.getMetaData} " + err.message);
        }

        return (arrMetaData);
    },

    getStoreValueIndexKey: function () {
        return ("storevalueindex");
    },

    getCompareValueIndexKey: function () {
        return ("comparevalueindex");
    },

    getExactMatchKey: function () {
        return ("exactmatch");
    },

    getDataVariableName: function (id) {
        var sName = "";

        try {
            sName = "g_" + id.id + "_data";
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL_INTERNAL.getDataVariableName} " + err.message);
        }

        return (sName);
    },

    getSelectedDataRowClassName: function () {
        return ("option_row_selected");
    },

    getDataRowClassName: function () {
        return ("option_row");
    },

    // Returns meta data variable name
    getMetaDataVariableName: function (id) {
        var sName = "";

        try {
            id = FCommon.UI.getValidElement(id);
            sName = "g_" + id.id + "_metadata";
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL_INTERNAL.getMetaDataVariableName} " + err.message);
        }

        return (sName);
    }
};

var OPTIONCONTROL_CUSTOMIZE = {
    open: function (id, evt) {
        var sURL = "";
        var iMasterTypeId = 0;

        try {
            if (OPTIONCONTROL.getMasterTypeId(id) < 1 || FCommon.String.isNullOrEmpty(OPTIONCONTROL.getTableName(id), true) == false) {
                return;
            }

            sURL = OPTIONCONTROL_INTERNAL.getCustomizeUIURL(id);
            if (FCommon.String.isNullOrEmpty(sURL, true) == true) {
                sURL = GLOBAL.getContextPath("GetOptionControlCustomize", "TransHome", "Transactions");
            }

            iMasterTypeId = OPTIONCONTROL.getMasterTypeId(id);
            if (iMasterTypeId < 1) {
                return;
            }

            NETWORK.executeServerMethod(sURL,
                                        false,
                                        { sId: id.id, iMasterTypeId: iMasterTypeId },
                                        "html",
                                        true,
                                        "OPTIONCONTROL_CUSTOMIZE.PRIVATE.callbackShowPopup",
                                        "GLOBAL.LoadingStart",
                                        "GLOBAL.LoadingEnd",
                                        id);
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL_CUSTOMIZE.open} " + err.message);
        }
    },

    onStandardFields_Click: function (id, evt) {
        OPTIONCONTROL_CUSTOMIZE.PRIVATE.showScreen(id.id, 1); // Show Standard Fields Screen
    },

    onDelete_Click: function (id, evt) {
        var eleSelected = null;

        try {
            eleSelected = OPTIONCONTROL_CUSTOMIZE.PRIVATE.getSelectedElement(id.id);
            if (FCommon.UI.isValidObject(eleSelected) == true) {
                eleSelected.parentElement.removeChild(eleSelected);
            }
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL_CUSTOMIZE.onDelete_Click} " + err.message);
        }
    },

    onOK_Click: function (id, evt) {
        switch (OPTIONCONTROL_CUSTOMIZE.PRIVATE.getSelectedScreen(id.id)) {
            case 0: // Customize OK
                OPTIONCONTROL_CUSTOMIZE.CUSTOMIZE_SCREEN.onSave(id, evt);
                break;
            case 1: // Standard Fields OK
                OPTIONCONTROL_CUSTOMIZE.STANDARDFIELDS_SCREEN.onSave(id, evt);
                break;
        }
    },

    onClose_Click: function (id, evt) {
        switch (OPTIONCONTROL_CUSTOMIZE.PRIVATE.getSelectedScreen(id.id))
        {
            case 0: // Customize Close
                OPTIONCONTROL_CUSTOMIZE.CUSTOMIZE_SCREEN.onClose(id, evt);
                break;
            case 1: // Standard Fields Close
                OPTIONCONTROL_CUSTOMIZE.STANDARDFIELDS_SCREEN.onClose(id.id);
                break;
        }
    },

    onClose_Keydown: function (id, evt) {
        try {
            if (evt.keyCode == 9 && evt.shiftKey == false) {
                FCommon.UI.stopKeyProcess(evt);
            }
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL_CUSTOMIZE.onClose_Keydown} " + err.message);
        }
    },

    onColumn_Click: function (id, evt) {
        try {
            if (FCommon.UI.hasClass(id, "theme_background-color") == true) {
                OPTIONCONTROL_CUSTOMIZE.PRIVATE.unselectAll(id.parentElement);
                id.className = "theme_background-color-inverse theme_color-inverse"; // Select column
            }
            else {
                id.className = "theme_background-color theme_color"; // Unselect column
            }
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL_CUSTOMIZE.onColumn_Click} " + err.message);
        }
    },

    onColumn_DblClick: function(eleColumn, id, evt) {
        try {
            objColumn = OPTIONCONTROL_CUSTOMIZE.CUSTOMIZE_SCREEN.getColumnValue(eleColumn);
            if(FCommon.UI.isValidObject(objColumn) == true) {
                OPTIONCONTROL_CUSTOMIZE.STANDARDFIELDS_SCREEN.show(id.id,
                                                                    objColumn.Name,
                                                                    objColumn.Display,
                                                                    objColumn.Width,
                                                                    objColumn.Alignment,
                                                                    eleColumn.id);
            }
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL_CUSTOMIZE.onColumn_DblClick} " + err.message);
        }
    },

    onDragStart: function (evt) {
        try {
            evt.dataTransfer.setData("text", evt.target.id);
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL_CUSTOMIZE.onDragStart} " + err.message);
        }
    },

    onAllowDrop: function(evt) {
        try {
            if (evt.preventDefault) {
                evt.preventDefault();
            }
            else {
                evt.returnValue = false;
            }
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL_CUSTOMIZE.onAllowDrop} " + err.message);
        }
    },

    onDrop: function (evt) {
        var sSourceId = "";
        var iSourceIndex = -1;
        var iTargetIndex = -1;
        var iCounter = 0;
        var eleTarget = null;
        var eleParent = null;

        try {
            if (evt.preventDefault) {
                evt.preventDefault();
            }
            else {
                evt.returnValue = false;
            }

            evt.stopImmediatePropagation();

            sSourceId = evt.dataTransfer.getData("text");

            eleTarget = evt.target;
            if (FCommon.String.isNullOrEmpty(eleTarget.id) == true) {
                eleTarget = eleTarget.parentElement;
            }

            if (sSourceId == eleTarget.id) {
                return;
            }

            eleParent = eleTarget.parentElement;
            for (iCounter = 0; iCounter < eleParent.children.length; iCounter++) {
                if (eleParent.children[iCounter].id == sSourceId) {
                    iSourceIndex = iCounter;
                }
                else if (eleParent.children[iCounter].id == eleTarget.id) {
                    iTargetIndex = iCounter;
                }
            }

            if (iSourceIndex == -1 || iTargetIndex == -1) {
                return;
            }

            if (iTargetIndex < iSourceIndex) {
                eleParent.insertBefore(eleParent.children[iSourceIndex], eleParent.children[iTargetIndex]);
            }
            else if (iTargetIndex > iSourceIndex) {
                if (iTargetIndex == (eleParent.children.length - 1)) {
                    eleParent.appendChild(eleParent.children[iSourceIndex]);
                }
                else if (iTargetIndex < (eleParent.children.length - 1)) {
                    eleParent.insertBefore(eleParent.children[iSourceIndex], eleParent.children[iTargetIndex + 1]);
                }
            }
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL_CUSTOMIZE.onDrop} " + err.message);
        }
    },

    CUSTOMIZE_SCREEN: {
        onSave: function (id, evt) {
            var arrData = null;
            var obj = null;

            try {
                obj = OPTIONCONTROL_CUSTOMIZE.PRIVATE.getData(id.id);

                NETWORK.executeServerMethod(GLOBAL.getContextPath("SaveOptionControlFields", "TransHome", "Transactions"),
                                            true,
                                            obj,
                                            "json",
                                            true,
                                            "OPTIONCONTROL_CUSTOMIZE.CUSTOMIZE_SCREEN.callbackSave",
                                            "GLOBAL.LoadingStart",
                                            "GLOBAL.LoadingEnd",
                                            { id: id, data: obj, event: evt });
            }
            catch (err) {
                alert("Exception: {OPTIONCONTROL_CUSTOMIZE.CUSTOMIZE_SCREEN.onSave} " + err.message)
            }
        },

        onClose: function (id, evt) {
            var eleContainer = null;
            var elePopup = null;

            try {
                elePopup = OPTIONCONTROL_CUSTOMIZE.PRIVATE.getPopupElement(id.id);
                if (FCommon.UI.isValidObject(elePopup) == true) {
                    $(elePopup).modal("hide");
                }

                eleContainer = OPTIONCONTROL_INTERNAL.getSearchContainerElement(id);
                FCommon.UI.removeChildren(eleContainer);

                OPTIONCONTROL_SEARCH.PRIVATE.enableControl(id, true);
                FCommon.UI.setFocus(id);
            }
            catch (err) {
                alert("Exception: {OPTIONCONTROL_CUSTOMIZE.CUSTOMIZE_SCREEN.onClose} " + err.message);
            }
        },

        show: function (sId) {
            var eleHeading = null;
            var eleBody = null;
            var eleFooter = null;
            var eleButtonContainer = null;
            var ele = null;

            try {
                eleHeading = OPTIONCONTROL_CUSTOMIZE.PRIVATE.getHeadingElement(sId);
                eleBody = OPTIONCONTROL_CUSTOMIZE.PRIVATE.getBodyElement(sId);
                eleFooter = OPTIONCONTROL_CUSTOMIZE.PRIVATE.getFooterElement(sId);

                eleButtonContainer = eleFooter.children[0].children[0];

                eleBody.children[0].style.display = ""; // Show Customize
                eleBody.children[1].style.display = "none"; // Hide Standard Fields
                eleButtonContainer.children[0].style.display = ""; // Show Standard Fields Button
                eleButtonContainer.children[1].style.display = ""; // Show Delete Column Button

                FCommon.UI.setText(eleHeading, "Customize Display Columns");
            }
            catch (err) {
                alert("Exception: {OPTIONCONTROL_CUSTOMIZE.CUSTOMIZE_SCREEN.show} " + err.message);
            }
        },

        callbackSave: function (bSuccess, data, obj) {
            var value = 0;

            try {
                if (bSuccess == false) {
                    return;
                }

                if (FCommon.String.isNullOrEmpty(data.sValue) == false) {
                    alert("Error: {OptionControl.Customization.Save} " + data.sValue);
                }
                else {
                    value = FConvert.toInt(OPTIONCONTROL.getControlValue(obj.id));

                    OPTIONCONTROL.setSearchBy(obj.id, -1);
                    OPTIONCONTROL_INTERNAL.setFirstField(obj.id, -1);

                    OPTIONCONTROL.resetControl(obj.id, value);
                    OPTIONCONTROL_CUSTOMIZE.onClose_Click(obj.id, obj.event);
                }
            }
            catch (err) {
                alert("Exception: {OPTIONCONTROL_CUSTOMIZE.CUSTOMIZE_SCREEN.callbackSave} " + err.message);
            }
        },

        createColumn: function (sId, sFieldName, sDisplayName, iWidth, nAlignment, sColumnId) {
            var sStyle = "";
            var sDblClickHandler = "";
            var eleContainer = null;
            var eleDiv = null;
            var eleSpan = null;
            var date = null;

            try {
                eleDiv = document.getElementById(FConvert.toString(sColumnId));
                if (FCommon.UI.isValidObject(eleDiv) == true) { // Update

                    eleDiv.style.width = iWidth + "px";
                    eleDiv.setAttribute("data-alignment", FConvert.toString(nAlignment));
                    eleDiv.setAttribute("data-display", sDisplayName);
                    eleDiv.setAttribute("data-name", sFieldName);

                    switch (nAlignment) {
                        case 0:
                            eleDiv.style.textAlign = "left";
                            break;
                        case 1:
                            eleDiv.style.textAlign = "center";
                            break;
                        case 2:
                            eleDiv.style.textAlign = "right";
                            break;
                    }

                    FCommon.UI.setText(eleDiv.children[0], sDisplayName);

                    return;
                }

                date = new Date();
                eleDiv = document.createElement("div");
                eleDiv.id = sId + "_column_" + date.getFullYear() + "_" + date.getMonth() + "_" + date.getDate() + "_" + date.getHours() + "_" + date.getMinutes() + "_" + date.getSeconds() + "_" + date.getMilliseconds(); 
                eleDiv.className = "theme_background-color theme_color";
                eleDiv.draggable = true;
                eleDiv.setAttribute("ondragstart", "OPTIONCONTROL_CUSTOMIZE.onDragStart(event);");
                eleDiv.setAttribute("ondragover", "OPTIONCONTROL_CUSTOMIZE.onAllowDrop(event);");
                eleDiv.setAttribute("ondrop", "OPTIONCONTROL_CUSTOMIZE.onDrop(event);");
                eleDiv.setAttribute("data-alignment", FConvert.toString(nAlignment));
                eleDiv.setAttribute("data-display", sDisplayName);
                eleDiv.setAttribute("data-name", sFieldName);
                eleDiv.setAttribute("data-tabletype", "0");
                eleDiv.setAttribute("onclick", "OPTIONCONTROL_CUSTOMIZE.onColumn_Click(this, event);");

                sDblClickHandler = "OPTIONCONTROL_CUSTOMIZE.onColumn_DblClick(this, " + sId + ", event);";
                eleDiv.setAttribute("ondblclick", sDblClickHandler);

                sStyle = "width:" + iWidth + "px; height: 100%; display:inline-block; cursor: pointer; border-right: 1px solid #ccc; resize: horizontal; overflow: auto;  padding-left: 10px; padding-right: 10px;";
                switch (nAlignment)
                {
                    case 0:
                        sStyle += "text-align:left;";
                        break;
                    case 1:
                        sStyle += "text-align:center;";
                        break;
                    case 2:
                        sStyle += "text-align:right;";
                        break;
                }
                eleDiv.setAttribute("style", sStyle);

                eleSpan = document.createElement("span");
                eleSpan.className = "vcenter";
                eleSpan.setAttribute("style", "display:block;");
                FCommon.UI.setText(eleSpan, sDisplayName);
                eleDiv.appendChild(eleSpan);

                eleContainer = OPTIONCONTROL_CUSTOMIZE.CUSTOMIZE_SCREEN.getDisplayFieldContainerElement(sId);
                eleContainer.appendChild(eleDiv);
            }
            catch (err) {
                alert("Exception: {OPTIONCONTROL_CUSTOMIZE.CUSTOMIZE_SCREEN.createColumn} " + err.message);
            }
        },

        getColumnValue: function(eleColumn) {
            var objColumn = null;
            var rect = null;

            try {
                rect = eleColumn.getBoundingClientRect();

                objColumn = {};
                objColumn.Name = eleColumn.getAttribute("data-name"); // string
                objColumn.Display = ""; // string
                objColumn.TableType = FConvert.toInt(eleColumn.getAttribute("data-tabletype")); // byte
                objColumn.Width = rect.right - rect.left; // int
                objColumn.Alignment = 0; // byte

                if (eleColumn.children[0].children.length > 0) {
                    objColumn.Display = FCommon.UI.getText(eleColumn.children[0].children[0]);
                }
                else {
                    objColumn.Display = FCommon.UI.getText(eleColumn.children[0]);
                }

                if (eleColumn.style.textAlign == "left") {
                    objColumn.Alignment = 0;
                }
                else if (eleColumn.style.textAlign == "center") {
                    objColumn.Alignment = 1;
                }
                else if (eleColumn.style.textAlign == "right") {
                    objColumn.Alignment = 2;
                }

            }
            catch(err) {
                alert("Exception: {OPTIONCONTROL_CUSTOMIZE.CUSTOMIZE_SCREEN.getColumnValue} " + err.message);
            }

            return(objColumn);
        },

        getDisplayFieldContainerElement: function (sId) {
            var ele = null;

            ele = OPTIONCONTROL_CUSTOMIZE.PRIVATE.getPopupElement(sId);
            ele = document.getElementById(ele.id + "_container");

            return (ele);
        }
    },

    STANDARDFIELDS_SCREEN: {
        onSave: function (id, evt) {
            var eleFields = null;
            var eleHeader = null;

            try {
                eleFields = OPTIONCONTROL_CUSTOMIZE.STANDARDFIELDS_SCREEN.getFieldsListElement(id.id);
                eleHeader = OPTIONCONTROL_CUSTOMIZE.STANDARDFIELDS_SCREEN.getHeaderElement(id.id);

                if (eleFields.options.selectedIndex < 0) {
                    return;
                }

                if (FCommon.String.isNullOrEmpty(eleHeader.value, true) == true) {
                    return;
                }

                OPTIONCONTROL_CUSTOMIZE.CUSTOMIZE_SCREEN.createColumn(id.id,
                                                                        eleFields.options[eleFields.selectedIndex].value,
                                                                        eleHeader.value,
                                                                        OPTIONCONTROL_CUSTOMIZE.STANDARDFIELDS_SCREEN.getWidthValue(id.id),
                                                                        OPTIONCONTROL_CUSTOMIZE.STANDARDFIELDS_SCREEN.getAlignmentValue(id.id),
                                                                        OPTIONCONTROL_CUSTOMIZE.STANDARDFIELDS_SCREEN.getColumnIdElement(id.id).value);

                OPTIONCONTROL_CUSTOMIZE.PRIVATE.showScreen(id.id, 0); // Show Customize Screen
            }
            catch (err) {
                alert("Exception: {OPTIONCONTROL_CUSTOMIZE.STANDARDFIELDS_SCREEN.onSave} " + err.message);
            }
        },

        onClose: function(sId) {
            OPTIONCONTROL_CUSTOMIZE.PRIVATE.showScreen(sId, 0); // Show Customize Screen
        },

        onFieldSelChange: function (id, evt) {
            var sFieldName = "";
            var sId = "";
            var ele = null;

            try {
                if (id.selectedIndex < 0) {
                    return;
                }

                sFieldName = id.options[id.selectedIndex].value;
                sId = OPTIONCONTROL_CUSTOMIZE.STANDARDFIELDS_SCREEN.getIdFromFieldListId(id.id);
                ele = OPTIONCONTROL_CUSTOMIZE.STANDARDFIELDS_SCREEN.getHeaderElement(sId);
                if (FCommon.UI.isValidObject(ele) == true) {
                    ele.value = OPTIONCONTROL_CUSTOMIZE.STANDARDFIELDS_SCREEN.headerDisplay(sFieldName);
                }
            }
            catch (err) {
                alert("Exception: {OPTIONCONTROL_CUSTOMIZE.STANDARDFIELDS_SCREEN.onFieldSelChange} " + err.message);
            }
        },

        getIdFromFieldListId: function(sId) {
            var sPopupId = "";

            sPopupId = FCommon.String.left(sId, sId.length - "_customize_popup_standardfields_list".length);

            return (sPopupId);
        },

        getColumnIdElement: function (sId) {
            var ele = null;

            ele = OPTIONCONTROL_CUSTOMIZE.PRIVATE.getPopupElement(sId);
            if (FCommon.UI.isValidObject(ele) == true) {
                ele = document.getElementById(ele.id + "_standardfields_columnid");
            }

            return (ele);
        },

        getFieldsListElement: function (sId) {
            var ele = null;

            ele = OPTIONCONTROL_CUSTOMIZE.PRIVATE.getPopupElement(sId);
            if (FCommon.UI.isValidObject(ele) == true) {
                ele = document.getElementById(ele.id + "_standardfields_list");
            }

            return (ele);
        },

        getHeaderElement: function (sId) {
            var ele = null;

            ele = OPTIONCONTROL_CUSTOMIZE.PRIVATE.getPopupElement(sId);
            if (FCommon.UI.isValidObject(ele) == true) {
                ele = document.getElementById(ele.id + "_standardfields_header");
            }

            return (ele);
        },

        getWidthElement: function(sId) {
            var ele = null;

            ele = OPTIONCONTROL_CUSTOMIZE.PRIVATE.getPopupElement(sId);
            if (FCommon.UI.isValidObject(ele) == true) {
                ele = document.getElementById(ele.id + "_standardfields_width");
            }

            return (ele);
        },

        getAlignmentElement: function (sId) {
            var ele = null;

            ele = OPTIONCONTROL_CUSTOMIZE.PRIVATE.getPopupElement(sId);
            if (FCommon.UI.isValidObject(ele) == true) {
                ele = document.getElementById(ele.id + "_standardfields_alignment");
            }

            return (ele);
        },

        getAlignmentValue: function(sId) {
            var iValue = 0;
            var ele = null;

            try {
                ele = OPTIONCONTROL_CUSTOMIZE.STANDARDFIELDS_SCREEN.getAlignmentElement(sId);
                if (ele.selectedIndex >= 0) {
                    iValue = FConvert.toInt(ele.options[ele.selectedIndex].value);
                }
            }
            catch (err) {
                alert("Exception: {OPTIONCONTROL_CUSTOMIZE.STANDARDFIELDS_SCREEN.getAlignmentValue} " + err.message);
            }

            return (iValue);
        },

        getWidthValue: function (sId) {
            var iValue = 100;
            var ele = null;

            try {
                ele = OPTIONCONTROL_CUSTOMIZE.STANDARDFIELDS_SCREEN.getWidthElement(sId);
                iValue = FConvert.toInt(ele.value);
                if (iValue < 10 || iValue > 500) {
                    iValue = 100;
                }
            }
            catch (err) {
                alert("Exception: {OPTIONCONTROL_CUSTOMIZE.STANDARDFIELDS_SCREEN.getWidthValue} " + err.message);
            }

            return (iValue);
        },

        show: function (sId, sFieldName, sHeader, iWidth, nAlignment, sColumnId) {
            var eleHeading = null;
            var eleBody = null;
            var eleFooter = null;
            var eleButtonContainer = null;
            var ele = null;

            try {
                eleHeading = OPTIONCONTROL_CUSTOMIZE.PRIVATE.getHeadingElement(sId);
                eleBody = OPTIONCONTROL_CUSTOMIZE.PRIVATE.getBodyElement(sId);
                eleFooter = OPTIONCONTROL_CUSTOMIZE.PRIVATE.getFooterElement(sId);

                eleButtonContainer = eleFooter.children[0].children[0];

                eleBody.children[0].style.display = "none"; // Hide Customize
                eleBody.children[1].style.display = ""; // Show Standard Fields
                eleButtonContainer.children[0].style.display = "none"; // Hide Standard Fields Button
                eleButtonContainer.children[1].style.display = "none"; // Hide Delete Column Button

                ele = OPTIONCONTROL_CUSTOMIZE.STANDARDFIELDS_SCREEN.getColumnIdElement(sId);
                ele.value = FConvert.toString(sColumnId);

                ele = OPTIONCONTROL_CUSTOMIZE.STANDARDFIELDS_SCREEN.getFieldsListElement(sId);
                if (FCommon.String.isNullOrEmpty(sFieldName, true) == true) {
                    ele.options.selectedIndex = -1;
                }
                else {
                    ele.value = sFieldName;
                }

                ele = OPTIONCONTROL_CUSTOMIZE.STANDARDFIELDS_SCREEN.getHeaderElement(sId);
                ele.value = FConvert.toString(sHeader);

                ele = OPTIONCONTROL_CUSTOMIZE.STANDARDFIELDS_SCREEN.getWidthElement(sId);
                ele.value = FConvert.toInt(iWidth);
                if (ele.value == 0) {
                    ele.value = 100;
                }

                ele = OPTIONCONTROL_CUSTOMIZE.STANDARDFIELDS_SCREEN.getAlignmentElement(sId);
                ele.value = FConvert.toInt(nAlignment);


                ele = OPTIONCONTROL_CUSTOMIZE.STANDARDFIELDS_SCREEN.getFieldsListElement(sId);
                if (FCommon.String.isNullOrEmpty(sColumnId, true) == true) { // New
                    ele.disabled = false;
                }
                else { // Edit
                    ele.disabled = true;
                }

                FCommon.UI.setText(eleHeading, "Column Attributes");
            }
            catch (err) {
                alert("Exception: {OPTIONCONTROL_CUSTOMIZE.STANDARDFIELDS_SCREEN.show} " + err.message);
            }
        },

        headerDisplay: function (sFieldName) {
            var sHeader = "";

            try {
                sHeader = sFieldName;

                if (FCommon.String.startsWith(sFieldName, "sz") == true
                    || FCommon.String.startsWith(sFieldName, "dt") == true
                    || FCommon.String.startsWith(sFieldName, "by") == true) {
                    sHeader = sFieldName.substr(2);
                }
                else if (FCommon.String.startsWith(sFieldName, "bit") == true
                    || FCommon.String.startsWith(sFieldName, "str") == true) {
                    sHeader = sFieldName.substr(3);
                }
                else if (FCommon.String.startsWith(sFieldName, "s") == true
                    || FCommon.String.startsWith(sFieldName, "i") == true
                    || FCommon.String.startsWith(sFieldName, "d") == true
                    || FCommon.String.startsWith(sFieldName, "b") == true
                    || FCommon.String.startsWith(sFieldName, "f") == true) {
                    sHeader = sFieldName.substr(1);
                }
                else if (FCommon.String.startsWith(sFieldName, "pkn_i") == true) {
                    sHeader = sFieldName.substr(5);
                }
            }
            catch (err) {
                alert("Exception: {OPTIONCONTROL_CUSTOMIZE.STANDARDFIELDS_SCREEN.headerDisplay} " + err.message);
            }

            return (sHeader);
        }
    },

    PRIVATE: {
        bindPopupEvents: function (sId) {
            var elePopup = null;
            elePopup = OPTIONCONTROL_CUSTOMIZE.PRIVATE.getPopupElement(sId);

            $(elePopup).draggable({
                cancel: "#" + OPTIONCONTROL_CUSTOMIZE.PRIVATE.getBodyElement(sId).id + ", #" + OPTIONCONTROL_CUSTOMIZE.PRIVATE.getCloseElement(sId).id // "#id_transactionentry_workflow_popup_body, #id_transactionentry_workflow_popup_close"
            });

            // Occurs when the modal is about to be shown
            $(elePopup).on('show.bs.modal', function () {
            });

            // Occurs when the modal is fully shown (after CSS transitions have completed)
            $(elePopup).on('shown.bs.modal', function () {
                //FCommon.UI.setFocus(OPTIONCONTROL_SEARCH.PRIVATE.getInputElement(sId));
            });

            // Occurs when the modal is about to be hidden
            $(elePopup).on('hide.bs.modal', function () {
            });

            // Occurs when the modal is fully hidden (after CSS transitions have completed)
            $(elePopup).on('hidden.bs.modal', function (event) {
            });
        },

        getPopupElement: function (sId) {
            var ele = null;

            ele = document.getElementById(sId + "_customize_popup");

            return (ele);
        },

        getBodyElement: function (sId) {
            var ele = null;

            ele = OPTIONCONTROL_CUSTOMIZE.PRIVATE.getPopupElement(sId);
            ele = document.getElementById(ele.id + "_body");

            return (ele);
        },

        getFooterElement: function (sId) {
            var ele = null;

            ele = OPTIONCONTROL_CUSTOMIZE.PRIVATE.getPopupElement(sId);
            ele = document.getElementById(ele.id + "_footer");

            return (ele);
        },

        getCloseElement: function (sId) {
            var ele = null;

            ele = OPTIONCONTROL_CUSTOMIZE.PRIVATE.getPopupElement(sId);
            ele = document.getElementById(ele.id + "_close");

            return (ele);
        },

        getHeadingElement: function(sId) {
            var ele = null;

            ele = OPTIONCONTROL_CUSTOMIZE.PRIVATE.getPopupElement(sId);
            ele = document.getElementById(ele.id + "_heading");

            return (ele);
        },

        getSelectedElement: function (sId) {
            var iCounter = 0;
            var eleContainer = null;

            try {
                eleContainer = OPTIONCONTROL_CUSTOMIZE.CUSTOMIZE_SCREEN.getDisplayFieldContainerElement(sId);
                if (FCommon.UI.isValidObject(eleContainer) == false) {
                    return (null);
                }

                for (iCounter = 0; iCounter < eleContainer.children.length; iCounter++) {
                    if (FCommon.UI.hasClass(eleContainer.children[iCounter], "theme_background-color-inverse") == true) {
                        return (eleContainer.children[iCounter]);
                    }
                }

            }
            catch (err) {
                alert("Exception: {OPTIONCONTROL_CUSTOMIZE.PRIVATE.getSelectedElement} " + err.message);
            }

            return (null);
        },

        enableControl: function (id, bEnable) {
            try {
                if (bEnable == true) {
                    id.style.backgroundColor = "";
                }
                else {
                    id.style.backgroundColor = "lightgray";
                }
            }
            catch (err) {
                alert("Exception: {OPTIONCONTROL_CUSTOMIZE.PRIVATE.enableControl} " + err.message);
            }
        },

        callbackShowPopup: function (bSuccess, data, id) {
            var eleContainer = null;
            var elePopup = null;

            try {
                if (bSuccess == false) {
                    return;
                }

                eleContainer = OPTIONCONTROL_INTERNAL.getSearchContainerElement(id);
                if (FCommon.UI.isValidObject(eleContainer) == true) {
                    FCommon.UI.removeChildren(eleContainer);
                    eleContainer.style.display = "";
                    $(eleContainer).html(data);

                    elePopup = OPTIONCONTROL_CUSTOMIZE.PRIVATE.getPopupElement(id.id);
                    $(elePopup).modal("show");

                    OPTIONCONTROL_CUSTOMIZE.PRIVATE.bindPopupEvents(id.id);
                    OPTIONCONTROL_CUSTOMIZE.PRIVATE.enableControl(id, false);
                }
            }
            catch (err) {
                alert("Exception: {OPTIONCONTROL_CUSTOMIZE.PRIVATE.callbackShowPopup} " + err.message);
            }
        },

        unselectAll: function (ele) {
            var iCounter = 0;

            try {
                for (iCounter = 0; iCounter < ele.children.length; iCounter++) {
                    ele.children[iCounter].className = "theme_background-color theme_color";
                }
            }
            catch (err) {
                alert("Exception: {OPTIONCONTROL_CUSTOMIZE.PRIVATE.unselectAll} " + err.message);
            }
        },

        getData: function (sId) {
            var iCounter = 0;
            var arrData = null;
            var elePopup = null;
            var eleContainer = null;
            var eleColumn = null;
            var objColumn = null;

            try {
                obj = {};
                obj.arrOptionControlColumns = [];
                obj.iId = 0;
                obj.iMasterTypeId = 0;

                elePopup = OPTIONCONTROL_CUSTOMIZE.PRIVATE.getPopupElement(sId);
                if(FCommon.UI.isValidObject(elePopup) == true) {
                    obj.iId = FConvert.toInt(elePopup.getAttribute("data-id"));
                    obj.iMasterTypeId = FConvert.toInt(elePopup.getAttribute("data-mastertypeid"));
                }

                eleContainer = OPTIONCONTROL_CUSTOMIZE.CUSTOMIZE_SCREEN.getDisplayFieldContainerElement(sId);
                if (FCommon.UI.isValidObject(eleContainer) == false) {
                    return (obj);
                }

                for (iCounter = 0; iCounter < eleContainer.children.length; iCounter++) {
                    eleColumn = eleContainer.children[iCounter];

                    objColumn = OPTIONCONTROL_CUSTOMIZE.CUSTOMIZE_SCREEN.getColumnValue(eleColumn);

                    obj.arrOptionControlColumns.push(objColumn);
                }
            }
            catch (err) {
                alert("Exception: {OPTIONCONTROL_CUSTOMIZE.PRIVATE.getData} " + err.message);
            }

            return (obj);
        },

        getSelectedScreen: function (sId) {
            var eleBody = null;
            var iScreen = 0;

            try {
                eleBody = OPTIONCONTROL_CUSTOMIZE.PRIVATE.getBodyElement(sId);
                if (FCommon.UI.isValidObject(eleBody) == false) {
                    return(0);
                }

                if (eleBody.children[1].style.display == "none") {
                    return (0); // Customize Screen
                }
                else {
                    return (1); // Standard Fields Screen
                }
            }
            catch (err) {
                alert("Exception: {OPTIONCONTROL_CUSTOMIZE.PRIVATE.getSelectedScreen} " + err.message);
            }

            return (0);
        },

        showScreen: function (sId, iScreen) {
            switch (iScreen)
            {
                case 0: // Customize Screen
                    OPTIONCONTROL_CUSTOMIZE.CUSTOMIZE_SCREEN.show(sId);
                    break;
                case 1: // Standard Fields Screen
                    OPTIONCONTROL_CUSTOMIZE.STANDARDFIELDS_SCREEN.show(sId, "", "");
                    break;
            }
        }
    }
};

var OPTIONCONTROL_SEARCH = {
    processSearch: function (id, sInputText, evt) {
        var sURL = "";
        var eleContainer = null;
        var result = null;

        try {
            if (OPTIONCONTROL.getMasterTypeId(id) < 1) {
                return;
            }

            sURL = OPTIONCONTROL.getSearchUIURL(id);
            if (FCommon.String.isNullOrEmpty(sURL, true) == true) {
                return;
            }

            NETWORK.executeServerMethod(sURL,
                                        false,
                                        { sId: id.id, sInputText: sInputText },
                                        "html",
                                        true,
                                        "OPTIONCONTROL_SEARCH.PRIVATE.callbackShowPopup",
                                        "GLOBAL.LoadingStart",
                                        "GLOBAL.LoadingEnd",
                                        id);
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL_SEARCH.processSearch} " + err.message);
        }
    },

    onSearch_Click: function (id, evt) {
        var sURL = "";
        var value = null;
        var parameter = "";
        var eleInput = null;
        var result = null;
        var obj = null;

        try{
            eleInput = OPTIONCONTROL_SEARCH.PRIVATE.getInputElement(id.id);
            if (FCommon.UI.isValidObject(eleInput) == false) {
                return;
            }

            if (FCommon.String.isNullOrEmpty(eleInput.value) == true) {
                return;
            }


            sURL = OPTIONCONTROL.getSearchUIURL(id);
            if (FCommon.String.isNullOrEmpty(sURL, true) == true) {
                return;
            }

            obj = {};
            obj.optParam = {};
            obj.bSearchAllFields = false;

            
            obj.optParam.iMasterTypeId = FCommon.UI.getAttributeData(id, "mastertypeid");

            obj.optParam.iGroupType = FCommon.UI.getAttributeData(id, "grouptype");

            obj.optParam.sFilter = FCommon.UI.getAttributeData(id, "filter");;

            obj.optParam.sSearchKey = eleInput.value;
            obj.optParam.iExistingDataCount = 0;

            obj.optParam.sMandatoryFields = OPTIONCONTROL.getMandatoryFields(id);

            value = FConvert.toInt(FCommon.UI.getAttributeData(id, "i_UnitId"));
            if (value > 0) {
                obj.optParam.iUnitId = value;
            }

            value = FConvert.toInt(FCommon.UI.getAttributeData(id, "i_ItemId"));
            if (value > 0) {
                obj.optParam.iItemId = value;
            }

            value = FConvert.toInt(FCommon.UI.getAttributeData(id, "i_GroupId"));
            if (value > 0) {
                obj.optParam.iGroupId = value;
            }

            obj.optParam.bLoadAll = false;

            obj.optParam.bUseRestriction = FCommon.UI.getAttributeData(id, "userrestriction");

            obj.optParam.iSearchBy = -1;

            obj.bSearchAllFields = OPTIONCONTROL_SEARCH.PRIVATE.getAllFieldElement(id.id).checked;
            obj.sId = id.id + "_search_popup";

            result = NETWORK.executeServerMethod(sURL + "Data",
                                                true,
                                                obj,
                                                "html",
                                                true, 
                                                "OPTIONCONTROL_SEARCH.PRIVATE.callbackOptionControlSearchData", 
                                                "GLOBAL.LoadingStart",
                                                "GLOBAL.LoadingEnd",
                                                id);
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL_SEARCH.onSearch_Click} "  + err.message)
        }
    },

    onOK_Click: function (id, evt) {
        var iTotalRows = 0;
        var iRow = 0;
        var iMasterId = 0;
        var eleGrid = null;
        var cell = null;

        try {
            eleGrid = OPTIONCONTROL_SEARCH.PRIVATE.getDataGrid(id.id);
            if (FCommon.UI.isValidObject(eleGrid) == false) {
                return;
            }

            iTotalRows = FGRIDCONTROL.getTotalRows(eleGrid);
            for (iRow = 1; iRow <= iTotalRows; iRow++) {
                cell = FGRIDCONTROL.getCellObject(eleGrid, iRow, 1);
                if (cell.cell.children[0].checked == true) {
                    cell = FGRIDCONTROL.getCellObject(eleGrid, iRow, 2);
                    iMasterId = FConvert.toInt(cell.getCellData());
                    break;
                }
            }

            if (iMasterId > 0) {
                OPTIONCONTROL.setControlValue(id, iMasterId);
                OPTIONCONTROL_SEARCH.onClose_Click(id, evt);
            }
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL_SEARCH.onOK_Click} " + err.message)
        }
    },

    onClose_Click: function (id, evt) {
        var eleContainer = null;
        var elePopup = null;

        try {
            elePopup = OPTIONCONTROL_SEARCH.PRIVATE.getPopupElement(id.id);
            if (FCommon.UI.isValidObject(elePopup) == true) {
                $(elePopup).modal("hide");
            }

            elePopup = OPTIONCONTROL_SEARCH.PRIVATE.getPopupElement(id.id);
            if (FCommon.UI.isValidObject(elePopup) == true) {
                elePopup.parentElement.removeChild(elePopup);
            }

            eleContainer = OPTIONCONTROL_INTERNAL.getSearchContainerElement(id);
            if (FCommon.UI.isValidObject(eleContainer) == true) {
                FCommon.UI.removeChildren(eleContainer);
            }

            OPTIONCONTROL_SEARCH.PRIVATE.enableControl(id, true);
            FCommon.UI.setFocus(id);
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL_SEARCH.onClose_Click} " + err.message);
        }
    },

    onSearch_Keydown: function(id, evt) {
        try {
            if (evt.keyCode == 9 && evt.shiftKey == true) {
                FCommon.UI.stopKeyProcess(evt);
            }
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL_SEARCH.onSearch_Keydown} " + err.message);
        }
    },

    onClose_Keydown: function (id, evt) {
        try {
            if (evt.keyCode == 9 && evt.shiftKey == false) {
                FCommon.UI.stopKeyProcess(evt);
            }
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL_SEARCH.onClose_Keydown} " + err.message);
        }
    },

    PRIVATE: {
        bindPopupEvents: function (sId) {
            var elePopup = null;
            elePopup = OPTIONCONTROL_SEARCH.PRIVATE.getPopupElement(sId);

            $(elePopup).draggable({
                cancel: "#" + OPTIONCONTROL_SEARCH.PRIVATE.getBodyElement(sId).id + ", #" + OPTIONCONTROL_SEARCH.PRIVATE.getCloseElement(sId).id // "#id_transactionentry_workflow_popup_body, #id_transactionentry_workflow_popup_close"
            });

            // Occurs when the modal is about to be shown
            $(elePopup).on('show.bs.modal', function () {
            });

            // Occurs when the modal is fully shown (after CSS transitions have completed)
            $(elePopup).on('shown.bs.modal', function () {
                FCommon.UI.setFocus(OPTIONCONTROL_SEARCH.PRIVATE.getInputElement(sId));
            });

            // Occurs when the modal is about to be hidden
            $(elePopup).on('hide.bs.modal', function () {
            });

            // Occurs when the modal is fully hidden (after CSS transitions have completed)
            $(elePopup).on('hidden.bs.modal', function (event) {
            });
        },

        getPopupElement: function (sId) {
            var ele = null;

            ele = document.getElementById(sId + "_search_popup");

            return (ele);
        },

        getInputElement: function(sId){
            var ele = null;

            ele = OPTIONCONTROL_SEARCH.PRIVATE.getPopupElement(sId);
            ele = document.getElementById(ele.id + "_input");

            return (ele);
        },

        getAllFieldElement: function(sId) {
            var ele = null;

            ele = OPTIONCONTROL_SEARCH.PRIVATE.getPopupElement(sId);
            ele = document.getElementById(ele.id + "_checkbox");

            return (ele);
        },

        getDataContainerElement: function(sId) {
            var ele = null;

            ele = OPTIONCONTROL_SEARCH.PRIVATE.getPopupElement(sId);
            ele = document.getElementById(ele.id + "_datacontainer");

            return (ele);
        },

        getDataGrid: function(sId) {
            var ele = null;

            ele = OPTIONCONTROL_SEARCH.PRIVATE.getPopupElement(sId);
            ele = document.getElementById(ele.id + "_grid");

            return (ele);
        },

        getBodyElement: function (sId) {
            var ele = null;

            ele = OPTIONCONTROL_SEARCH.PRIVATE.getPopupElement(sId);
            ele = document.getElementById(ele.id + "_body");

            return (ele);
        },

        getCloseElement: function (sId) {
            var ele = null;

            ele = OPTIONCONTROL_SEARCH.PRIVATE.getPopupElement(sId);
            ele = document.getElementById(ele.id + "_close");

            return (ele);
        },

        enableControl: function(id, bEnable) {
            try {
                if (bEnable == true) {
                    id.style.backgroundColor = "";
                }
                else {
                    id.style.backgroundColor = "lightgray";
                }
            }
            catch (err) {
                alert("Exception: {OPTIONCONTROL_SEARCH.PRIVATE.enableControl} " + err.message);
            }
        },

        callbackShowPopup: function (bSuccess, data, id) {
            var eleContainer = null;
            var elePopup = null;

            try {
                if (bSuccess == false) {
                    return;
                }

                eleContainer = OPTIONCONTROL_INTERNAL.getSearchContainerElement(id);
                if (FCommon.UI.isValidObject(eleContainer) == true) {
                    FCommon.UI.removeChildren(eleContainer);
                    eleContainer.style.display = "";
                    $(eleContainer).html(data);

                    elePopup = OPTIONCONTROL_SEARCH.PRIVATE.getPopupElement(id.id);
                    $(elePopup).modal("show");

                    OPTIONCONTROL_SEARCH.PRIVATE.bindPopupEvents(id.id);
                    OPTIONCONTROL_SEARCH.PRIVATE.enableControl(id, false);
                }
            }
            catch (err) {
                alert("Exception: {OPTIONCONTROL_SEARCH.PRIVATE.callbackShowPopup} " + err.message);
            }
        },

        callbackOptionControlSearchData: function (bSuccess, data, id) {
            var eleContainer = null;

            try {
                if (bSuccess == false) {
                    return;
                }

                eleContainer = OPTIONCONTROL_SEARCH.PRIVATE.getDataContainerElement(id.id);
                if (FCommon.UI.isValidObject(eleContainer) == true) {
                    FCommon.UI.removeChildren(eleContainer);
                    $(eleContainer).html(data);
                }
            }
            catch (err) {
                alert("Exception: {OPTIONCONTROL_SEARCH.PRIVATE.callbackOptionControlSearchData} " + err.message);
            }
        }
    }
};

var FGRIDCOLUMNTYPE = (function () {
    var private = {
        'NONE': 0,
        'BOOLEAN': 1,
        'TEXT': 2,
        'SIGNEDNUMBER': 3,
        'UNSIGNEDNUMBER': 4,
        'SIGNEDFRACTION': 5,
        'UNSIGNEDFRACTION': 6,
        'STRINGLIST': 7,
        'NUMBERLIST': 8
    };

    return {
        get: function (name) { return private[name]; }
    };
})();

var FGRIDCONTROL = {
    PRIVATE: {
        onKeyDown: function (table, event) {
            var sHandler = "";
            var bHandled = false;

            try {
                if (FCommon.UI.isPopupEvent(event) == true) {
                    return;
                }

                sHandler = FGRIDCONTROL.PRIVATE.getKeyPreviewHandler(table);
                if (FCommon.String.isNullOrEmpty(sHandler) == false) {
                    bHandled = FConvert.toBoolean(eval(sHandler)(table, event));
                }

                if (event.keyCode != 13 && event.keyCode != 9) {
                    return;
                }

                if (event.keyCode == 9) {
                    FCommon.UI.stopKeyProcess(event);
                }

                if (bHandled == true) {
                    return;
                }

                if (event.shiftKey == true) {
                    FGRIDCONTROL.gotoPreviousCell(table, event);
                }
                else {
                    FGRIDCONTROL.gotoNextCell(table, event);
                }
            }
            catch (err) {
                alert("Exception: {FGRIDCONTROL.PRIVATE.onKeyDown} " + err.message);
            }
        },

        onScroll: function (eleBody, event) {
            var sHandler = null;
            var eleHead = null;
            var eleFoot = null;

            try {
                FCommon.UI.stopKeyProcess(event);
                eleHead = event.target.previousElementSibling;
                eleFoot = event.target.nextElementSibling;
                if (FCommon.UI.getElementStyleValue(event.target, "direction").toLowerCase() != "rtl") {
                    eleHead.style.marginLeft = "-" + event.target.scrollLeft + "px";
                }
                else {
                    eleHead.style.marginRight = "-" + ((event.target.scrollWidth - event.target.clientWidth) - event.target.scrollLeft) + "px";
                }

                if (FCommon.UI.isValidObject(eleFoot) == true) {
                    eleFoot.style.marginLeft = eleHead.style.marginLeft;
                    eleFoot.style.marginRight = eleHead.style.marginRight;
                }

                sHandler = FGRIDCONTROL.PRIVATE.getScrollHandler(eleBody.parentElement.id);
                if (FCommon.String.isNullOrEmpty(sHandler, true) == false) {
                    eval(sHandler)(eleBody, event);
                }
            }
            catch (err) {
                alert("Exception: {FGRIDCONTROL.PRIVATE.onScroll} " + err.message);
            }
        },

        moveToNextCell: function (cell, event) {
            var grid = null;
            var bResult = false;

            try {
                grid = FGRIDCONTROL.getGridElementFromCell(cell);
                if (FCommon.UI.isValidObject(grid) == false) {
                    return (false);
                }

                if (FCommon.UI.isValidObject(event) == true) {
                    bResult = FGRIDCONTROL.gotoNextCell(grid, event);
                }
                else {
                    bResult = FGRIDCONTROL.gotoNextCell(grid);
                }
            }
            catch (err) {
                alert("Exception: {FGRIDCONTROL.PRIVATE.moveToNextCell} " + err.message);
            }

            return (bResult);
        },

        moveToPreviousCell: function (cell, event) {
            var grid = null;
            var bResult = false;

            try {
                grid = FGRIDCONTROL.getGridElementFromCell(cell);
                if (FCommon.UI.isValidObject(grid) == false) {
                    return (false);
                }


                if (FCommon.UI.isValidObject(event) == true) {
                    bResult = FGRIDCONTROL.gotoPreviousCell(grid, event);
                }
                else {
                    bResult = FGRIDCONTROL.gotoPreviousCell(grid);
                }
            }
            catch (err) {
                alert("Exception: {FGRIDCONTROL.PRIVATE.moveToPreviousCell} " + err.message);
            }

            return (bResult);
        },

        onEnterCell: function (gridElement, cell, event) {
            var sHandler = "";
            var result = null;
            var bResult = false;

            try {
                sHandler = FGRIDCONTROL.getCellChangeHandler(gridElement);
                if (FCommon.String.isNullOrEmpty(sHandler) == true) {
                    return (false);
                }

                result = FGRIDCONTROL.getRowColumnFromElement(gridElement, cell);
                if (result == null) {
                    return (false);
                }

                FGRIDCONTROL.setCurrentRow(gridElement, result.iRow);
                FGRIDCONTROL.setCurrentColumn(gridElement, result.iColumn);
                if (FGRIDCONTROL.isValidRowIndex(gridElement, result.iRow) == false
                    || FGRIDCONTROL.isValidColumnIndex(gridElement, result.iColumn) == false) {
                    return (false);
                }

                if (FCommon.UI.isValidObject(event) == true) {
                    bResult = eval(sHandler)(FGRIDCONTROL.PRIVATE.getCellChangeObject(cell, result.iRow, result.iColumn, false), event);
                }
                else {
                    bResult = eval(sHandler)(FGRIDCONTROL.PRIVATE.getCellChangeObject(cell, result.iRow, result.iColumn, false));
                }
            }
            catch (err) {
                alert("Exception: {FGRIDCONTROL.PRIVATE.onEnterCell} " + err.message);
            }

            return (bResult);
        },

        onLeaveCell: function (gridElement, event) {
            var sHandler = "";
            var iRow = 0;
            var iColumn = 0;
            var cell = null;
            var bResult = true;

            try {
                iRow = FGRIDCONTROL.getCurrentRow(gridElement);
                iColumn = FGRIDCONTROL.getCurrentColumn(gridElement);

                FGRIDCONTROL.setCurrentRow(gridElement, -1);
                FGRIDCONTROL.setCurrentColumn(gridElement, -1);

                bResult = true;
                if (FGRIDCONTROL.isValidRowIndex(gridElement, iRow) == false
                    || FGRIDCONTROL.isValidColumnIndex(gridElement, iColumn) == false) {
                    return (bResult);
                }

                cell = FGRIDCONTROL.PRIVATE.getCellElementOfRowColumn(gridElement, iRow, iColumn);
                sHandler = FGRIDCONTROL.getCellChangeHandler(gridElement);

                if (FCommon.String.isNullOrEmpty(sHandler) == false) {
                    FGRIDCONTROL.moveCellControlToContainer(gridElement, cell);

                    if (FCommon.UI.isValidObject(event) == true) {
                        bResult = eval(sHandler)(FGRIDCONTROL.PRIVATE.getCellChangeObject(cell, iRow, iColumn, true), event);
                    }
                    else {
                        bResult = eval(sHandler)(FGRIDCONTROL.PRIVATE.getCellChangeObject(cell, iRow, iColumn, true));
                    }
                }
            }
            catch (err) {
                alert("Exception: {FGRIDCONTROL.PRIVATE.onLeaveCell} " + err.message);
            }

            return (bResult);
        },

        onCellClick: function (cell, event) {
            try {
                if (FCommon.UI.isValidObject(event.target) == true
                    && FCommon.String.isNullOrEmpty(event.target.nodeName) == false
                    && event.target.nodeName.toLowerCase() !== "td") {
                    return;
                }

                FGRIDCONTROL.PRIVATE.processCellClick(cell, event);
            }
            catch (err) {
                alert("Exception: {FGRIDCONTROL.PRIVATE.onCellClick} " + err.message);
            }
        },

        onCellDblClick: function (cell, event) {
            var iRow = 0;
            var iColumn = 0;
            var gridElement = null;
            var sHandler = "";
            var obj = null;
            var result = null;

            try {
                if (FCommon.UI.isValidObject(event.target) == true
                    && FCommon.String.isNullOrEmpty(event.target.nodeName) == false
                    && event.target.nodeName.toLowerCase() !== "td") {
                    return;
                }

                gridElement = FGRIDCONTROL.getGridElementFromCell(cell);
                if (gridElement != null) {
                    obj = FGRIDCONTROL.getRowColumnFromElement(gridElement, cell);
                    iRow = obj.iRow;
                    iColumn = obj.iColumn;
                    if (iRow < 1 || iColumn < 1) {
                        return;
                    }

                    sHandler = FGRIDCONTROL.getDblClickHandler(gridElement);
                    if (FCommon.String.isNullOrEmpty(sHandler) == false) {
                        obj = FGRIDCONTROL.PRIVATE.getCellObjectInternal(cell, iRow, iColumn, false);
                        obj.EventType = "celldblclick";

                        eval(sHandler)(obj, event);
                    }
                }
            }
            catch (err) {
                alert("Exception: {FGRIDCONTROL.PRIVATE.onCellDblClick} " + err.message);
            }
        },

        processCellClick: function(cell, event) {
            var iRow = 0;
            var iColumn = 0;
            var gridElement = null;
            var bResult = false;
            var result = null;

            try {
                gridElement = FGRIDCONTROL.getGridElementFromCell(cell);
                if (gridElement != null) {
                    iRow = FGRIDCONTROL.getCurrentRow(gridElement);
                    iColumn = FGRIDCONTROL.getCurrentColumn(gridElement);

                    bResult = FGRIDCONTROL.PRIVATE.onLeaveCell(gridElement, event); // Calling leave cell

                    if (bResult == false) {
                        cell = FGRIDCONTROL.PRIVATE.getCellElementOfRowColumn(gridElement, iRow, iColumn);
                    }
                    else // if (iRow > 0)
                    { // If last row is valid
                        result = FGRIDCONTROL.getRowColumnFromElement(gridElement, cell);
                        if (FCommon.UI.isValidObject(result) == true
                            && FGRIDCONTROL.isValidRowIndex(gridElement, result.iRow) == true
                            && FGRIDCONTROL.isValidColumnIndex(gridElement, result.iColumn) == true
                            && iRow !== result.iRow) {
                            bResult = FGRIDCONTROL.onRowChange(FGRIDCONTROL.PRIVATE.getChangeRowObject(gridElement, iRow, result.iRow), event);
                            if (iRow > 0 && (FCommon.UI.isValidObject(bResult) == false || eval(bResult) == false)) {
                                cell = FGRIDCONTROL.PRIVATE.getCellElementOfRowColumn(gridElement, iRow, iColumn);
                            }
                        }
                    }

                    FGRIDCONTROL.PRIVATE.onEnterCell(gridElement, cell, event); // Calling Enter cell
                }
            }
            catch (err) {
                alert("Exception: {FGRIDCONTROL.PRIVATE.processCellClick} " + err.message);
            }
        },

        // Called on heading double click
        onHeadingDblClick: function(cell, iColumn, event) {
            var gridElement = null;
            var sHandler = "";
            var obj = null;

            try {
                gridElement = FGRIDCONTROL.getGridElementFromHeading(cell);
                if (FCommon.UI.isValidObject(gridElement) == true) {
                    sHandler = FGRIDCONTROL.PRIVATE.getHeadingDblClickHandler(gridElement);
                    if(FCommon.String.isNullOrEmpty(sHandler, true) == false) {
                        obj = {};
                        obj.iColumn = iColumn;
                        obj.Grid = gridElement;
                        obj.bHeading = true;
                        eval(sHandler)(obj, event);
                    }
                }
            }
            catch (err) {
                alert("Exception: {FGRIDCONTROL.PRIVATE.onHeadingDblClick} " + err.message);
            }
        },

        onColumnCheckboxClick: function (eleCheckbox, iRow, iColumn, bAllowMultiSelection, sCallback, event) {
            var eleGrid = null;
            var bChecked = false;
            var eleRow = null;
            var obj = null;
            var iCounter = 0;

            bChecked = eleCheckbox.checked;
            eleGrid = eleCheckbox.parentElement.parentElement.parentElement.parentElement;
            bAllowMultiSelection = FConvert.toBoolean(bAllowMultiSelection);

            eleRow = eleCheckbox.parentElement.parentElement;
            if (eleRow.parentElement.nodeName.toLowerCase() == "tbody") {
                iRow = FCommon.UI.getElementPosition(eleRow);

                if (bAllowMultiSelection == false) { // Radio button
                    FGRIDCONTROL.setAllCheckboxColumnState(eleGrid, iColumn, false);
                }
                eleCheckbox.checked = bChecked;

                if (bAllowMultiSelection == true) { // Checkbox
                    if (bChecked == true) { // Checked
                        for (iCounter = 1; iCounter <= FGRIDCONTROL.getTotalRows(eleGrid); iCounter++) {
                            if (FGRIDCONTROL.getColumnCheckboxState(eleGrid, iCounter, iColumn) == false) {
                                bChecked = false;
                                break;
                            }
                        }
                    }

                    if (bChecked == false) {
                        FGRIDCONTROL.setColumnCheckboxState(eleGrid, 0, iColumn, false);
                    }
                    else {
                        FGRIDCONTROL.setColumnCheckboxState(eleGrid, 0, iColumn, true);
                    }
                }
            }
            else { // Heading
                FGRIDCONTROL.setAllCheckboxColumnState(eleGrid, iColumn, bChecked);
                iRow = 0;
            }

            if (FCommon.String.isNullOrEmpty(sCallback) == false) {
                obj = {};
                obj.iRow = iRow;
                obj.iColumn = iColumn;
                obj.Checkbox = eleCheckbox;
                obj.Grid = eleGrid;

                eval(sCallback)(obj, event)
            }
        },

        onSerialNoClick: function (ele, event) {
            var sHandler = null;
            var obj = null;

            obj = {};
            obj.Cell = ele;
            obj.Row = ele.parentElement;
            obj.Grid = ele.parentElement.parentElement.parentElement;
            obj.iRow = FGRIDCONTROL.getRowNoFromRowElement(ele.parentElement);
            obj.EventType = "click";

            sHandler = FGRIDCONTROL.PRIVATE.getSerialNoClickHandler(obj.Grid);

            if (FCommon.String.isNullOrEmpty(sHandler, true) == false) {
                eval(sHandler)(obj, event);
            }
        },

        onSerialNoColumnEnterLeave: function (ele, bEnter, event) {
            var sHandler = null;
            var obj = null;

            obj = {};
            obj.Cell = ele;
            obj.Row = ele.parentElement;
            obj.Grid = ele.parentElement.parentElement.parentElement;
            obj.iRow = FGRIDCONTROL.getRowNoFromRowElement(ele.parentElement);
            obj.bEnter = bEnter;

            if (bEnter == true) {
                sHandler = FGRIDCONTROL.PRIVATE.getSerialNoEnterHandler(obj.Grid);
                obj.EventType = "cellenter";
            }
            else {
                sHandler = FGRIDCONTROL.PRIVATE.getSerialNoLeaveHandler(obj.Grid);
                obj.EventType = "cellleave";
            }

            if (FCommon.String.isNullOrEmpty(sHandler, true) == false) {
                eval(sHandler)(obj, event);
            }
        },

        getHiddenRow: function (gridElement) {
            var eleRow = null;

            try {
                eleRow = document.getElementById(gridElement.id + "_row_0");
            }
            catch (err) {
                alert("Exception: {FGRIDCONTROL.PRIVATE.getHiddenRow} " + err.message);
            }

            return (eleRow);
        },

        getHiddenColumn: function(gridElement, iColumn) {
            var eleRow = null;
            var eleCell = null;

            try {
                eleRow = FGRIDCONTROL.PRIVATE.getHiddenRow(gridElement);
                if (FCommon.UI.isValidObject(eleRow) == true) {
                    if (iColumn >= 0 && iColumn < eleRow.children.length) {
                        eleCell = eleRow.children[iColumn];
                    }
                }
            }
            catch (err) {
                alert("Exception: {FGRIDCONTROL.PRIVATE.getHiddenColumn} " + err.message);
            }

            return (eleCell);
        },

        getBodyElement: function (gridElement) {
            var element = null;

            try {
                gridElement = FCommon.UI.getValidElement(gridElement);
                if (FCommon.UI.isValidObject(gridElement) == true) {
                    element = document.getElementById(gridElement.id + "_body");
                }
            }
            catch (err) {
                alert("Exception: {FGRIDCONTROL.PRIVATE.getBodyElement} " + err.message);
            }

            return (element);
        },

        // Returns cell element of passed row and column
        getCellElementOfRowColumn: function (gridElement, iRow, iColumn) {
            var element = null;

            try {
                if (FGRIDCONTROL.isValidRowIndex(gridElement, iRow) == false) {
                    return;
                }

                if (FGRIDCONTROL.isValidColumnIndex(gridElement, iColumn) == false) {
                    return;
                }

                element = FGRIDCONTROL.PRIVATE.getBodyElement(gridElement);
                if (FCommon.UI.isValidObject(element) == false) {
                    return;
                }

                element = element.children[iRow - 1]; // returns <tr>
                if (FCommon.UI.isValidObject(element) == false) {
                    return;
                }

                element = element.children[iColumn]; // returns <th>
            }
            catch (err) {
                alert("Exception: {FGRIDCONTROL.PRIVATE.getCellElementOfRowColumn} " + err.message);
            }

            return (element);
        },

        makeCellVisible: function (gridElement, objCell) {
            var eleContainer = null;
            var rectBody = null;
            var rectCell = null;
            var bResult = false;

            try {
                bResult = true;

                eleContainer = FGRIDCONTROL.PRIVATE.getBodyElement(gridElement);

                rectBody = eleContainer.getBoundingClientRect();
                rectCell = objCell.cell.getBoundingClientRect();

                if (FCommon.UI.getElementStyleValue(eleContainer, "direction").toLowerCase() != "rtl") {
                    if (rectCell.left < rectBody.left) { // Decrease container scrollLeft
                        eleContainer.scrollLeft -= (rectBody.left - rectCell.left) + 36; // 36 is serial number width
                    }
                    else if (rectCell.left > rectBody.right) { // Increase conainter scrollLeft
                        eleContainer.scrollLeft += (rectCell.right - rectBody.right) + 20;
                    }
                    else if (rectCell.right < rectBody.left) { // Decrease container scrollLeft
                    }
                    else if (rectCell.right > rectBody.right) { // Increase container scrollLeft
                        eleContainer.scrollLeft += (rectCell.right - rectBody.right) + 20;
                    }

                    if (objCell.iColumn < 2) {
                        eleContainer.scrollLeft = 0;
                    }
                }
                else {
                    if (rectCell.left < rectBody.left) { // Decrease container scrollLeft
                        eleContainer.scrollLeft -= (rectBody.left - rectCell.left) + 36; // 36 is serial number width
                    }
                    else if (rectCell.left > rectBody.right) { // Increase conainter scrollLeft
                    }
                    else if (rectCell.right < rectBody.left) { // Decreaset container scrollLeft
                    }
                    else if (rectCell.right > rectBody.right) { // Increase container scrollLeft
                        eleContainer.scrollLeft += (rectCell.right - rectBody.right) + 20;
                    }

                    if (objCell.iColumn < 2) {
                        //eleHead.style.marginRight = "-" + ((event.target.scrollWidth - event.target.clientWidth) - event.target.scrollLeft) + "px";
                        eleContainer.scrollLeft = eleContainer.scrollWidth -eleContainer.clientWidth;
                    }
                }
            }
            catch (err) {
                alert("Exception: {FGRIDCONTROL.PRIVATE.makeCellVisible} " + err.message);

                bResult = false;
            }

            return (bResult);
        },

        getSerialNoEnterHandler: function (gridElement) {
            var sHandler = "";

            try {
                sHandler = FCommon.UI.getAttributeData(gridElement, "serialnoenterhandler");
            }
            catch (err) {
                alert("Exception: {FGRIDCONTROL.PRIVATE.getSerialNoEnterHandler} " + err.message);
            }

            return (sHandler);
        },

        getSerialNoLeaveHandler: function (gridElement) {
            var sHandler = "";

            try {
                sHandler = FCommon.UI.getAttributeData(gridElement, "serialnoleavehandler");
            }
            catch (err) {
                alert("Exception: {FGRIDCONTROL.PRIVATE.getSerialNoLeaveHandler} " + err.message);
            }

            return (sHandler);
        },

        getSerialNoClickHandler: function (gridElement) {
            var sHandler = "";

            try {
                sHandler = FCommon.UI.getAttributeData(gridElement, "serialnoclickhandler");
            }
            catch (err) {
                alert("Exception: {FGRIDCONTROL.PRIVATE.getSerialNoClickHandler} " + err.message);
            }

            return (sHandler);
        },

        getHeadingDblClickHandler: function(gridElement) {
            var sHandler = "";

            try {
                sHandler = FCommon.UI.getAttributeData(gridElement, "headingdblclickhandler");
            }
            catch (err) {
                alert("Exception: {FGRIDCONTROL.PRIVATE.getHeadingDblClickHandler} " + err.message);
            }

            return (sHandler);
        },

        getScrollHandler: function (gridElement) {
            var sHandler = "";

            try {
                sHandler = FCommon.UI.getAttributeData(gridElement, "scrollhandler");
            }
            catch (err) {
                alert("Exception: {FGRIDCONTROL.PRIVATE.getScrollHandler} " + err.message);
            }

            return (sHandler);
        },

        getKeyPreviewHandler: function(gridElement) {
            var sHandler = "";

            try {
                sHandler = FCommon.UI.getAttributeData(gridElement, "keypreviewhandler");
            }
            catch (err) {
                alert("Exception: {FGRIDCONTROL.PRIVATE.getKeyPreviewHandler} " + err.message);
            }

            return (sHandler);
        },

        getCellDataSetHandler: function(gridElement) {
            var sHandler = "";

            try {
                sHandler = FCommon.UI.getAttributeData(gridElement, "celldatasethandler");
            }
            catch (err) {
                alert("Exception: {FGRIDCONTROL.PRIVATE.getCellDataSetHandler} " + err.message);
            }

            return (sHandler);
        },

        getCellTextSetHandler: function (gridElement) {
            var sHandler = "";

            try {
                sHandler = FCommon.UI.getAttributeData(gridElement, "celltextsethandler");
            }
            catch (err) {
                alert("Exception: {FGRIDCONTROL.PRIVATE.getCellTextSetHandler} " + err.message);
            }

            return (sHandler);
        },

        getCellObjectInternal: function (cell, iRow, iColumn, bLeave) {
            var gridElement = null;
            var obj = null;

            try {
                if (FCommon.UI.isValidObject(cell) == false) {
                    return;
                }

                gridElement = FGRIDCONTROL.getGridElementFromCell(cell);

                obj = {};
                obj.Grid = gridElement;
                obj.cell = cell;
                obj.iRow = iRow;
                obj.iColumn = iColumn;
                obj.bLeave = bLeave;
                obj.bHidden = false;
                obj.EventType = "";
                if (obj.bLeave == true) {
                    obj.EventType = "cellleave";
                }
                if (FCommon.String.isNullOrEmpty(cell.style.display) == false) {
                    if (cell.style.display.toLowerCase() == "none") {
                        obj.bHidden = true;
                    }
                }
                obj.sText = $(cell).text();
                obj.ColumnAttribute = FGRIDCONTROL.getHeadingDataObject(gridElement, iColumn);
                obj.ContainerAttribute = FGRIDCONTROL.getContainerDataObject(gridElement, iColumn);
                obj.CellData = COMMON.prototype.getDataAttributeObject(cell);
                obj.setCellText = function (sText, data, bIgnoreCallback) {
                    var sOldText = "";

                    bIgnoreCallback = FConvert.toBoolean(bIgnoreCallback);
                    sOldText = FGRIDCONTROL.setCellText(this.cell, sText, bIgnoreCallback);
                    if (FCommon.UI.isValidObject(data) == true) {
                        this.setCellData(data, undefined, bIgnoreCallback);
                    }

                    return (sOldText);
                };
                obj.getCellText = function () {
                    return (FGRIDCONTROL.getCellText(this.cell));
                };
                obj.setCellData = function (key, sValue, bIgnoreCallback) {
                    if (FCommon.UI.isValidObject(key) == false) {
                        this.resetCellData();
                        return;
                    }

                    bIgnoreCallback = FConvert.toBoolean(bIgnoreCallback);
                    if (FCommon.UI.isValidObject(sValue) == false) {
                        if (FCommon.Array.isArray(key) == true) {
                            this.resetCellData();
                            COMMON.prototype.createAttributesFromArray(this.cell, key);
                        }
                        else if (FConvert.isObject(key) == true) {
                            this.resetCellData();
                            COMMON.prototype.createAttributesFromObject(this.cell, key);
                        }
                        else {
                            return (FGRIDCONTROL.setCellData(this.cell, "value", key, bIgnoreCallback));
                        }
                    }
                    else {
                        return (FGRIDCONTROL.setCellData(this.cell, key, sValue, bIgnoreCallback));
                    }
                };
                obj.getCellData = function (sKey) {
                    if (FCommon.String.isNullOrEmpty(sKey) == true) {
                        return (FGRIDCONTROL.getCellData(this.cell, "value"));
                    }

                    return (FGRIDCONTROL.getCellData(this.cell, sKey));
                };
                obj.getColumnAttributeValue = function (sKey) {
                    var objValue = "";

                    try {
                        if (FCommon.UI.isValidObject(this.ColumnAttribute) == true) {
                            objValue = this.ColumnAttribute[sKey];
                        }
                    }
                    catch (err) {
                        alert("Exception:  {FGRIDCONTROL::cellobj.getColumnAttributeValue} " + err.message);
                    }

                    return (objValue);
                };
                obj.resetCellData = function () {
                    FCommon.UI.removeDataAttribute(this.cell);
                };
                obj.setRowData = function (key, sValue) {
                    return (FGRIDCONTROL.setRowData(this.cell.parentElement, key, sValue));
                };
                obj.getRowData = function (sKey) {
                    return (FGRIDCONTROL.getRowData(this.cell.parentElement, sKey));
                };
                obj.clear = function () {
                    try {
                        if (this.ContainerAttribute.ColumnType == FGRIDCOLUMNTYPE.get("BOOLEAN")) {
                            this.setCheckboxState(false);
                        }
                        else {
                            FGRIDCONTROL.setCellText(this.cell, "");
                        }

                        this.resetCellData();
                    }
                    catch (err) {
                        alert("Exception:  {FGRIDCONTROL::cellobj.clear} " + err.message);
                    }
                };
                obj.hasControl = function () {
                    var bResult = false;

                    if (FCommon.UI.isValidObject(this.cell) == true && this.cell.children.length > 0) {
                        bResult = true;
                    }

                    return (bResult);
                };
                obj.getControl = function () {
                    var ele = null;

                    if (FCommon.UI.isValidObject(this.cell) == true && this.cell.children.length > 0) {
                        ele = this.cell.children[0];
                    }

                    return (ele);
                };
                obj.setControl = function (element, value) {
                    var bFlag = false;

                    //this.setCellText("", "", true);
                    this.setCellText("", undefined, true);

                    element = FCommon.UI.getValidElement(element);
                    if (FCommon.UI.isValidObject(element) == false) {
                        return;
                    }

                    if ($(element).hasClass(OPTIONCONTROL.getClassName()) == true) {
                        OPTIONCONTROL.setParent(element, this.cell, true);
                        if (FCommon.UI.isValidObject(value) == true) {
                            if (value > 0) {
                                OPTIONCONTROL.setControlValue(element, value, null, null, true);
                                bFlag = true;
                            }
                        }

                        if (bFlag == false) {
                            OPTIONCONTROL.clear(element);
                        }
                    }
                    else if ($(element).hasClass(DATEPICKER.getClassName()) == true) {
                        DATEPICKER.setParent(element, this.cell);
                        if (FCommon.UI.isValidObject(value) == true) {
                            if (value > 0) {
                                DATEPICKER.setDate(element, value, true);
                                bFlag = true;
                            }
                        }

                        if (bFlag == false) {
                            DATEPICKER.clear(element);
                        }
                    }
                    else if ($(element).hasClass(FTIMECONTROL.getClassName()) == true) {
                        this.cell.appendChild(element);
                        if (FConvert.toInt(value) > 0) {
                            FTIMECONTROL.setTime(element, value);
                        }
                        else {
                            FTIMECONTROL.clear(element);
                        }

                        COMMON.prototype.setFocus(element.id);
                    }
                    else if ($(element).hasClass(FPOPUPCONTROL.getClassName()) == true) {
                        FPOPUPCONTROL.setCurrentRow(element, this.iRow);
                        FPOPUPCONTROL.setCurrentColumn(element, this.iColumn);
                        
                        if (FCommon.String.isNullOrEmpty(value, true) == false) {
                            FPOPUPCONTROL.setControlText(element, value);
                            bFlag = true;
                        }

                        if (bFlag == false) {
                            FPOPUPCONTROL.clear(element);
                        }

                        FPOPUPCONTROL.setParent(element, this.cell);
                    }
                    else if (FCommon.UI.hasClass(element, FATTACHMENTCONTROL.getClassName()) == true) {
                        FATTACHMENTCONTROL.setParent(element, this.cell, true);

                        if (FCommon.UI.isValidObject(value) == true
                            && FCommon.String.isNullOrEmpty(value.sFileName) == false
                            && FCommon.String.isNullOrEmpty(value.sData) == false) {
                            FATTACHMENTCONTROL.setData(element, value.sFileName, "", value.sData, true);
                            bFlag = true;
                        }

                        if (bFlag == false) {
                            FATTACHMENTCONTROL.clear(element);
                        }

                    }
                    else {
                        if (element.nodeName.toLowerCase() === "input") {
                            if (element.getAttribute("type").toLowerCase() === "text") {
                                if (FCommon.UI.isValidObject(value) == true) {
                                    element.value = value;
                                }
                                else {
                                    element.value = "";
                                }
                            }
                        }
                        else if (element.nodeName.toLowerCase() === "select") {
                            if (FCommon.UI.isValidObject(value) == true) {
                                element.value = value;
                            }
                        }

                        this.cell.appendChild(element);
                        COMMON.prototype.setFocus(element.id);
                    }
                };
                obj.getCheckboxState = function () {
                    return (FGRIDCONTROL.getColumnCheckboxState(this.Grid, this.iRow, this.iColumn));
                };
                obj.setCheckboxState = function (bChecked) {
                    FGRIDCONTROL.setColumnCheckboxState(this.Grid, this.iRow, this.iColumn, bChecked);
                };
                obj.setCheckboxVisibility = function (bVisible) {
                    FGRIDCONTROL.setCheckboxColumnVisibility(this.Grid, this.iRow, this.iColumn, bVisible);
                };
                obj.getControlValue = function () {
                    var eleCtrl = null;
                    var obj = null;

                    try {
                        if (this.bHidden == true) {
                            return (obj);
                        }

                        switch (this.ContainerAttribute.ColumnType) {
                            case FGRIDCOLUMNTYPE.get("BOOLEAN"):
                                obj = {
                                    Text: this.cell.children[0].checked,
                                    Value: this.cell.children[0].checked
                                };
                                break;
                            case FGRIDCOLUMNTYPE.get("TEXT"):
                                eleCtrl = FGRIDCONTROL.getBindControl(this.Grid, this.iColumn);
                                if (FCommon.UI.isValidObject(eleCtrl) == true) {
                                    obj = {
                                        Text: eleCtrl.value,
                                        Value: eleCtrl.value
                                    };
                                }
                                break;
                            case FGRIDCOLUMNTYPE.get("SIGNEDNUMBER"):
                                eleCtrl = FGRIDCONTROL.getBindControl(this.Grid, this.iColumn);
                                if (FCommon.UI.isValidObject(eleCtrl) == true) {
                                    obj = {
                                        Text: eleCtrl.value,
                                        Value: eleCtrl.value
                                    };
                                }
                                break;
                            case FGRIDCOLUMNTYPE.get("UNSIGNEDNUMBER"):
                                eleCtrl = FGRIDCONTROL.getBindControl(this.Grid, this.iColumn);
                                if (FCommon.UI.isValidObject(eleCtrl) == true) {
                                    obj = {
                                        Text: eleCtrl.value,
                                        Value: eleCtrl.value
                                    };
                                }
                                break;
                            case FGRIDCOLUMNTYPE.get("SIGNEDFRACTION"):
                                eleCtrl = FGRIDCONTROL.getBindControl(this.Grid, this.iColumn);
                                if (FCommon.UI.isValidObject(eleCtrl) == true) {
                                    obj = {
                                        Text: eleCtrl.value,
                                        Value: eleCtrl.value
                                    };
                                }
                                break;
                            case FGRIDCOLUMNTYPE.get("UNSIGNEDFRACTION"):
                                eleCtrl = FGRIDCONTROL.getBindControl(this.Grid, this.iColumn);
                                if (FCommon.UI.isValidObject(eleCtrl) == true) {
                                    obj = {
                                        Text: eleCtrl.value,
                                        Value: eleCtrl.value
                                    };
                                }
                                break;
                            case FGRIDCOLUMNTYPE.get("STRINGLIST"):
                                eleCtrl = FGRIDCONTROL.getBindControl(this.Grid, this.iColumn);
                                if (FCommon.UI.isValidObject(eleCtrl) == false) {
                                    break;
                                }

                                if (eleCtrl.selectedIndex >= 0) {
                                    obj = {
                                        Text: eleCtrl.options[eleCtrl.selectedIndex].text,
                                        Value: eleCtrl.options[eleCtrl.selectedIndex].value
                                    };
                                }
                                else {
                                    obj = {
                                        Text: "",
                                        Value: ""
                                    };
                                }
                                break;
                            case FGRIDCOLUMNTYPE.get("NUMBERLIST"):
                                eleCtrl = FGRIDCONTROL.getBindControl(this.Grid, this.iColumn);
                                if (FCommon.UI.isValidObject(eleCtrl) == false) {
                                    break;
                                }

                                if (eleCtrl.selectedIndex >= 0) {
                                    obj = {
                                        Text: eleCtrl.options[eleCtrl.selectedIndex].text,
                                        Value: eleCtrl.options[eleCtrl.selectedIndex].value
                                    };
                                }
                                else {
                                    obj = {
                                        Text: "",
                                        Value: ""
                                    };
                                }
                                break;
                        }
                    }
                    catch (err) {
                        alert("Exception: {FGRIDCONTROL::cellobj.getControlValue} " + err.message);
                    }

                    return (obj);
                };
                obj.isCellFullyVisible = function () {
                    var eleGrid = null;
                    var eleContainer = null;
                    var rectBody = null;
                    var rectCell = null;

                    try {
                        eleGrid = FGRIDCONTROL.getGridElementFromCell(this.cell);
                        eleContainer = FGRIDCONTROL.PRIVATE.getBodyElement(eleGrid);

                        rectBody = eleContainer.getBoundingClientRect();
                        rectCell = this.cell.getBoundingClientRect();

                        if (rectCell.left >= rectBody.left && rectCell.left <= rectBody.right && rectCell.right >= rectBody.left && rectCell.right <= rectBody.right) {
                            return (true);
                        }
                    }
                    catch (err) {
                        alert("Exception: {FGRIDCONTROL::cellobj.isCellFullyVisible} " + err.message);
                    }

                    return (false);
                };
                obj.makeCellVisible = function () {
                    FGRIDCONTROL.PRIVATE.makeCellVisible(this.Grid, this);
                };
            }
            catch (err) {
                alert("Exception:  {FGRIDCONTROL.PRIVATE.getCellObjectInternal} " + err.message);
            }

            return (obj);
        },

        getChangeRowObject: function (gridElement, iOldRow, iNewRow) {
            var obj = null;

            try {
                obj = {};
                obj.gridElement = gridElement;
                obj.iOldRow = iOldRow;
                obj.iNewRow = iNewRow;
            }
            catch (err) {
                alert("Exception:  {FGRIDCONTROL.PRIVATE.getChangeRowObject} " + err.message);
            }

            return (obj);
        },

        getCellChangeObject: function (cell, iRow, iColumn, bLeave) {
            var eleCtrl = null;
            var obj = null;

            try {
                obj = FGRIDCONTROL.PRIVATE.getCellObjectInternal(cell, iRow, iColumn, bLeave);
                if (bLeave == false) {
                    obj.EventType = "cellenter";
                }
                obj.processDefault = function (event) {
                    if (this.bHidden == false) {
                        if (this.bLeave == true) {
                            switch (this.ContainerAttribute.ColumnType) {
                                case FGRIDCOLUMNTYPE.get("BOOLEAN"):
                                    this.setCellData(this.cell.children[0].checked);
                                    break;
                                case FGRIDCOLUMNTYPE.get("TEXT"):
                                    eleCtrl = FGRIDCONTROL.getBindControl(this.Grid, this.iColumn);
                                    if (FCommon.UI.isValidObject(eleCtrl) == true) {
                                        this.setCellText(eleCtrl.value);
                                    }
                                    break;
                                case FGRIDCOLUMNTYPE.get("SIGNEDNUMBER"):
                                    eleCtrl = FGRIDCONTROL.getBindControl(this.Grid, this.iColumn);
                                    if (FCommon.UI.isValidObject(eleCtrl) == true) {
                                        this.setCellText(eleCtrl.value, eleCtrl.value);
                                    }
                                    break;
                                case FGRIDCOLUMNTYPE.get("UNSIGNEDNUMBER"):
                                    eleCtrl = FGRIDCONTROL.getBindControl(this.Grid, this.iColumn);
                                    if (FCommon.UI.isValidObject(eleCtrl) == true) {
                                        this.setCellText(eleCtrl.value, eleCtrl.value);
                                    }
                                    break;
                                case FGRIDCOLUMNTYPE.get("SIGNEDFRACTION"):
                                    eleCtrl = FGRIDCONTROL.getBindControl(this.Grid, this.iColumn);
                                    if (FCommon.UI.isValidObject(eleCtrl) == true) {
                                        this.setCellText(eleCtrl.value, eleCtrl.value);
                                    }
                                    break;
                                case FGRIDCOLUMNTYPE.get("UNSIGNEDFRACTION"):
                                    eleCtrl = FGRIDCONTROL.getBindControl(this.Grid, this.iColumn);
                                    if (FCommon.UI.isValidObject(eleCtrl) == true) {
                                        this.setCellText(eleCtrl.value, eleCtrl.value);
                                    }
                                    break;
                                case FGRIDCOLUMNTYPE.get("STRINGLIST"):
                                    eleCtrl = FGRIDCONTROL.getBindControl(this.Grid, this.iColumn);
                                    if (FCommon.UI.isValidObject(eleCtrl) == false) {
                                        break;
                                    }
                                    if (eleCtrl.selectedIndex >= 0) {
                                        this.setCellText(eleCtrl.options[eleCtrl.selectedIndex].text, eleCtrl.options[eleCtrl.selectedIndex].value);
                                    }
                                    else {
                                        this.setCellText("", "");
                                    }
                                    break;
                                case FGRIDCOLUMNTYPE.get("NUMBERLIST"):
                                    eleCtrl = FGRIDCONTROL.getBindControl(this.Grid, this.iColumn);
                                    if (FCommon.UI.isValidObject(eleCtrl) == false) {
                                        break;
                                    }
                                    if (eleCtrl.selectedIndex >= 0) {
                                        this.setCellText(eleCtrl.options[eleCtrl.selectedIndex].text, eleCtrl.options[eleCtrl.selectedIndex].value);
                                    }
                                    else {
                                        this.setCellText("", "");
                                    }
                                    break;
                            }

                        }
                        else // Enter
                        {
                            switch (this.ContainerAttribute.ColumnType) {
                                case FGRIDCOLUMNTYPE.get("BOOLEAN"):
                                    if (FGRIDCONTROL.isCheckboxColumnReadyForInput(this.Grid, this.iRow, this.iColumn) == true) {
                                        this.cell.children[0].focus();
                                        return;
                                    }
                                    break;
                                case FGRIDCOLUMNTYPE.get("TEXT"):
                                    eleCtrl = FGRIDCONTROL.getBindControl(this.Grid, this.iColumn);
                                    if (FCommon.UI.isValidObject(eleCtrl) == true) {
                                        this.setControl(eleCtrl, this.getCellText());
                                        return;
                                    }
                                    break;
                                case FGRIDCOLUMNTYPE.get("SIGNEDNUMBER"):
                                    eleCtrl = FGRIDCONTROL.getBindControl(this.Grid, this.iColumn);
                                    if (FCommon.UI.isValidObject(eleCtrl) == true) {
                                        this.setControl(eleCtrl, this.getCellText());
                                        return;
                                    }
                                    break;
                                case FGRIDCOLUMNTYPE.get("UNSIGNEDNUMBER"):
                                    eleCtrl = FGRIDCONTROL.getBindControl(this.Grid, this.iColumn);
                                    if (FCommon.UI.isValidObject(eleCtrl) == true) {
                                        this.setControl(eleCtrl, this.getCellText());
                                        return;
                                    }
                                    break;
                                case FGRIDCOLUMNTYPE.get("SIGNEDFRACTION"):
                                    eleCtrl = FGRIDCONTROL.getBindControl(this.Grid, this.iColumn);
                                    if (FCommon.UI.isValidObject(eleCtrl) == true) {
                                        this.setControl(eleCtrl, this.getCellText());
                                        return;
                                    }
                                    break;
                                case FGRIDCOLUMNTYPE.get("UNSIGNEDFRACTION"):
                                    eleCtrl = FGRIDCONTROL.getBindControl(this.Grid, this.iColumn);
                                    if (FCommon.UI.isValidObject(eleCtrl) == true) {
                                        this.setControl(eleCtrl, this.getCellText());
                                        return;
                                    }
                                    break;
                                case FGRIDCOLUMNTYPE.get("STRINGLIST"):
                                    eleCtrl = FGRIDCONTROL.getBindControl(this.Grid, this.iColumn);
                                    if (FCommon.UI.isValidObject(eleCtrl) == false) {
                                        break;
                                    }

                                    if (FCommon.String.isNullOrEmpty(this.getCellData()) == true) {
                                        eleCtrl.selectedIndex = -1;
                                    }
                                    else {
                                        eleCtrl.value = this.getCellData();
                                    }
                                    this.setControl(eleCtrl);
                                    return;
                                case FGRIDCOLUMNTYPE.get("NUMBERLIST"):
                                    eleCtrl = FGRIDCONTROL.getBindControl(this.Grid, this.iColumn);
                                    if (FCommon.UI.isValidObject(eleCtrl) == false) {
                                        break;
                                    }

                                    if (FCommon.String.isNullOrEmpty(this.getCellData()) == true) {
                                        eleCtrl.selectedIndex = -1;
                                    }
                                    else {
                                        eleCtrl.value = this.getCellData();
                                    }
                                    this.setControl(eleCtrl);
                                    return;
                            }
                        }
                    }


                    if (FCommon.UI.isValidObject(event) == true) {
                        if (event.shiftKey == true) {
                            FGRIDCONTROL.PRIVATE.moveToPreviousCell(this.cell, event);
                        }
                        else {
                            FGRIDCONTROL.PRIVATE.moveToNextCell(this.cell, event);
                        }
                    }
                    else {
                        FGRIDCONTROL.PRIVATE.moveToNextCell(this.cell, event | window.event || arguments.callee.caller.arguments[0]);
                    }
                };
            }
            catch (err) {
                alert("Exception:  {FGRIDCONTROL.PRIVATE.getCellChangeObject} " + err.message);
            }

            return (obj);
        },

        // Returns thead element
        getHeadElement: function (gridElement) {
            var element = null;

            try {
                gridElement = FCommon.UI.getValidElement(gridElement);
                element = document.getElementById(gridElement.id + "_head");
            }
            catch (err) {
                alert("Exception: {FGRIDCONTROL.PRIVATE.getHeadElement} " + err.message);
            }

            return (element);
        },

        // Returns tfoot element
        getFootElement: function (gridElement) {
            var element = null;

            try {
                gridElement = FCommon.UI.getValidElement(gridElement);
                element = document.getElementById(gridElement.id + "foot");
            }
            catch (err) {
                alert("Exception: {FGRIDCONTROL.PRIVATE.getFootElement} " + err.message);
            }

            return (element);
        },

        // Returns heading element of given column
        getHeadingElement: function (gridElement, iColumn) {
            var element = null;
            var eleRow = null;

            try {
                if (FGRIDCONTROL.isValidColumnIndex(gridElement, iColumn) == false) {
                    return;
                }

                eleRow = FGRIDCONTROL.getRowElement(gridElement, 0);
                if (FCommon.UI.isValidObject(eleRow) == true) {
                    element = eleRow.children[iColumn];
                }

                //element = FGRIDCONTROL.PRIVATE.getHeadElement(gridElement);
                //if (FCommon.UI.isValidObject(element) == false) {
                //    return;
                //}

                //element = element.children[0]; // 0 for heading, 1 for container;
                //if (FGRIDCONTROL.isValidColumnIndex(gridElement, iColumn) == false) {
                //    return;
                //}
                //element = element.children[iColumn];
            }
            catch (err) {
                alert("Exception: {FGRIDCONTROL.PRIVATE.getHeadingElement} " + err.message);
            }

            return (element);
        },

        // Returns heading element of given column
        getFooterElement: function (gridElement, iColumn) {
            var element = null;
            var eleRow = null;

            try {
                if (FGRIDCONTROL.isValidColumnIndex(gridElement, iColumn) == false) {
                    return;
                }

                eleRow = FGRIDCONTROL.getRowElement(gridElement, -1);
                if (FCommon.UI.isValidObject(eleRow) == true) {
                    element = eleRow.children[iColumn];
                }


                //element = FGRIDCONTROL.PRIVATE.getFootElement(gridElement);
                //if (FCommon.UI.isValidObject(element) == false) {
                //    return;
                //}

                //element = element.children[0]; // 0 for heading
                //if (FGRIDCONTROL.isValidColumnIndex(gridElement, iColumn) == false) {
                //    return;
                //}
                //element = element.children[iColumn];
            }
            catch (err) {
                alert("Exception: {FGRIDCONTROL.PRIVATE.getFooterElement} " + err.message);
            }

            return (element);
        },

        // Returns row serial number element
        getSerialNoElement: function (gridElement, iRow) {
            var eleRow = null;
            var eleCell = null;

            try {
                eleRow = FGRIDCONTROL.getRowElement(gridElement, iRow);
                if (FCommon.UI.isValidObject(eleRow) == true && eleRow.children.length > 0) {
                    eleCell = eleRow.children[0];
                }
            }
            catch (err) {
                alert("Exception: {FGRIDCONTROL.PRIVATE.getSerialNoElement} " + err.message);
            }

            return (eleCell);
        }
    },

    setAllCheckboxColumnState: function (eleGrid, iColumn, bChecked) {
        var iRow = 0;

        try {
            for (iRow = 1; iRow <= FGRIDCONTROL.getTotalRows(eleGrid) ; iRow++) {
                FGRIDCONTROL.setColumnCheckboxState(eleGrid, iRow, iColumn, bChecked);
            }
        }
        catch (err) {
            alert("Exception: {FGRIDCONTROL.setAllCheckboxColumnState} " + err.message);
        }
    },

    // {Private}
    onRowChange: function (obj, event) {
        var sHandler = "";
        var bResult = true;

        try {
            sHandler = FGRIDCONTROL.getRowChangeHandler(obj.gridElement);
            if (FCommon.String.isNullOrEmpty(sHandler) == true) {
                return (true);
            }

            bResult = eval(sHandler)(obj, event);
        }
        catch (err) {
            alert("Exception: {FGRIDCONTROL::onRowChange} " + err.message);
        }

        return (bResult);
    },

    // {Private} Transfers all control of a given cell to appropriate container
    moveCellControlToContainer: function (gridElement, cell) {
        var result = null;
        var bResult = false;
        var container = null;
        var obj = null;

        try {
            result = FGRIDCONTROL.getRowColumnFromElement(gridElement, cell);
            if (result == null || result.iRow < 1 || result.iColumn < 1) {
                return (false);
            }

            container = FGRIDCONTROL.getControlContainerElement(gridElement.id, result.iColumn);
            if (FCommon.UI.isValidObject(container) == false) {
                return (false);
            }

            obj = FGRIDCONTROL.getContainerDataObjectInternal(container);
            if (obj.bIgnoreCellControlToContainerMovement == false) {
                while (cell.children.length > 0) {
                    container.appendChild(cell.children[0]);
                }
            }

            bResult = true;
        }
        catch (err) {
            alert("Exception: {FGRIDCONTROL::moveCellControlToContainer} " + err.message);
        }

        return (bResult);
    },

    // {Private} Returns cell element which has children
    isColumnControlVisible: function (gridElement, iColumn) {
        var iTotalRows = 0;
        var iCounter = 0;
        var cell = null;

        try {
            gridElement = FCommon.UI.getValidElement(gridElement);

            iTotalRows = FGRIDCONTROL.getTotalRows(gridElement);

            for (iCounter = 1; iCounter <= iTotalRows; iCounter++) {
                cell = FGRIDCONTROL.PRIVATE.getCellElementOfRowColumn(gridElement, iCounter, iColumn);
                if (FCommon.UI.isValidObject(cell) == false) {
                    return;
                }

                if (cell.children.length > 0) {
                    return (cell);
                }
            }
        }
        catch (err) {
            alert("Exception: {FGRIDCONTROL::isColumnControlVisible} " + err.message);
        }
    },

    // {Private}
    getCellChangeHandler: function (gridElement) {
        var sHandler = "";

        try {
            sHandler = FCommon.UI.getAttributeData(gridElement, "cellchangehandler");
        }
        catch (err) {
            alert("Exception: {FGRIDCONTROL.getCellChangeHandler} " + err.message);
        }

        return (sHandler);
    },

    // {Private}
    getRowChangeHandler: function (gridElement) {
        var sHandler = "";

        try {
            sHandler = FCommon.UI.getAttributeData(gridElement, "rowchangehandler");
        }
        catch (err) {
            alert("Exception: {FGRIDCONTROL.getRowChangeHandler} " + err.message);
        }

        return (sHandler);
    },

    // {Private}
    getDblClickHandler: function (gridElement) {
        var sHandler = "";

        try {
            sHandler = FCommon.UI.getAttributeData(gridElement, "celldblclickhandler");
        }
        catch (err) {
            alert("Exception: {FGRIDCONTROL.getDblClickHandler} " + err.message);
        }

        return (sHandler);
    },

    // {Private}
    getInvalidCellHandler: function (gridElement) {
        var sHandler = "";

        try {
            sHandler = FCommon.UI.getAttributeData(gridElement, "invalidcellhandler");
        }
        catch (err) {
            alert("Exception: {FGRIDCONTROL.getInvalidCellHandler} " + err.message);
        }

        return (sHandler);
    },

    // {Private} Returns heading data attribute object
    getHeadingDataObject: function (gridElement, iColumn) {
        var element = null;
        var obj = {};

        try {
            gridElement = FCommon.UI.getValidElement(gridElement);
            element = FGRIDCONTROL.PRIVATE.getHeadingElement(gridElement, iColumn);
            obj = COMMON.prototype.getDataAttributeObject(element);
        }
        catch (err) {
            alert("Exception: {FGRIDCONTROL::getHeadingDataObject} " + err.message);
        }

        return (obj);
    },

    // {Private} Returns container data element
    getContainerDataObject: function (gridElement, iColumn) {
        var eleContainer = null;
        var obj = {};

        try {
            gridElement = FCommon.UI.getValidElement(gridElement);

            eleContainer = FGRIDCONTROL.getControlContainerElement(gridElement, iColumn);
            obj = FGRIDCONTROL.getContainerDataObjectInternal(eleContainer);
        }
        catch (err) {
            alert("Exception: {FGRIDCONTROL.getContainerDataObject} " + err.message);
        }

        return (obj);
    },

    // {Private} Return Data object of passed container element
    getContainerDataObjectInternal: function (eleContainer) {
        var obj = {};

        try {
            obj = {};
            obj.ColumnType = FGRIDCOLUMNTYPE.get("NONE");
            obj.bIgnoreCellControlToContainerMovement = false;

            if (FCommon.UI.isValidObject(eleContainer) == true) {
                obj.ColumnType = FConvert.toInt(FCommon.UI.getAttributeData(eleContainer, "columntype"));
                obj.bIgnoreCellControlToContainerMovement = FConvert.toBoolean(FCommon.UI.getAttributeData(eleContainer, "ignorecellcontroltocontainermovement"));
            }
        }
        catch (err) {
            alert("Exception: {FGRIDCONTROL.getContainerDataObjectInternal} " + err.message);
        }

        return (obj);
    },

    getSerialNoHeadingElement: function (gridElement) {
        var element = null;

        try {
            gridElement = FCommon.UI.getValidElement(gridElement);
            element = FGRIDCONTROL.PRIVATE.getHeadElement(gridElement);
            if (FCommon.UI.isValidObject(element) == false) {
                return;
            }

            element = element.children[0]; // 0 for heading, 1 for container;
            element = element.children[0];
        }
        catch (err) {
            alert("Exception: {FGRIDCONTROL.getSerialNoHeadingElement} " + err.message);
        }

        return (element);
    },

    // {Private} Returns control container element of column
    getControlContainerElement: function (gridElement, iColumn) {
        var element = null;

        try {
            element = FGRIDCONTROL.PRIVATE.getHeadElement(gridElement);
            if (FCommon.UI.isValidObject(element) == false) {
                return;
            }

            element = element.children[1]; // 0 for heading, 1 for container;
            if (FGRIDCONTROL.isValidColumnIndex(gridElement, iColumn) == false) {
                return;
            }
            element = element.children[iColumn];
        }
        catch (err) {
            alert("Exception: {FGRIDCONTROL::getControlContainerElement} " + err.message);
        }

        return (element);
    },

    // {Private} Clears given row value
    resetRowValue: function (eleGrid, eleRow, arrContainerDataAttribute, bDeleteAttribute) {
        var iCounter = 0;
        var sName = "";
        var eleContainer = null;
        var eleChild = null;
        var bDelete = false;
        var obj = null;

        try {
            bDeleteAttribute = FConvert.toBoolean(bDeleteAttribute);
            if (bDeleteAttribute == true) {
                bDelete = true;
                FCommon.UI.removeDataAttribute(eleRow);
            }

            for (iCounter = 1; iCounter < eleRow.children.length; iCounter++) {
                eleChild = eleRow.children[iCounter];
                if (arrContainerDataAttribute[iCounter].ColumnType == FGRIDCOLUMNTYPE.get("BOOLEAN")) {
                    eleChild.children[0].checked = false;
                }
                else {
                    if (eleChild.children.length > 0) {
                        obj = FGRIDCONTROL.getContainerDataObject(eleGrid, iCounter);
                        if (obj.bIgnoreCellControlToContainerMovement == true) {
                            continue;
                        }

                        eleContainer = FGRIDCONTROL.getControlContainerElement(eleGrid, iCounter);
                        while (eleChild.children.length > 0) {
                            eleContainer.appendChild(eleChild.children[0]);
                        }
                    }
                    else {
                        COMMON.prototype.setElementText(eleChild, "");
                    }
                }

                if (bDelete == true) {
                    FCommon.UI.removeDataAttribute(eleChild);
                }
            }
        }
        catch (err) {
            alert("Exception: {FGRIDCONTROL::resetRowValue} " + err.message);
        }
    },

    // {Private}
    gotoNextCell: function (gridElement, event) {
        var iRow = 0;
        var iColumn = 0;
        var cell = null;
        var bResult = false;
        var bRowChanged = false;
        var sInvalidCellHandler = "";
        var obj = null;

        try {
            iRow = FGRIDCONTROL.getCurrentRow(gridElement);
            iColumn = FGRIDCONTROL.getCurrentColumn(gridElement);
            bResult = FGRIDCONTROL.PRIVATE.onLeaveCell(gridElement, event);

            if (FConvert.toBoolean(bResult) == true) {
                bRowChanged = false;
                iColumn++;
                if (FGRIDCONTROL.isValidColumnIndex(gridElement, iColumn) == false) {
                    iRow++;
                    iColumn = 1;
                    bRowChanged = true;
                }

                if (bRowChanged == true && FGRIDCONTROL.isValidRowIndex(gridElement, iRow - 1) == true) {
                    bRowChanged = FGRIDCONTROL.onRowChange(FGRIDCONTROL.PRIVATE.getChangeRowObject(gridElement, iRow - 1, iRow), event);
                    if (FConvert.toBoolean(bRowChanged) == false) {
                        iRow--;
                        iColumn = FGRIDCONTROL.getTotalColumns(gridElement);
                    }
                    else {
                        if (FGRIDCONTROL.isValidRowIndex(gridElement, iRow) == false) {
                            sInvalidCellHandler = FGRIDCONTROL.getInvalidCellHandler(gridElement);
                            if (FCommon.String.isNullOrEmpty(sInvalidCellHandler, true) == false) {
                                obj = {};
                                obj.iRow = iRow;
                                obj.iColumn = iColumn;
                                obj.bFirstRow = false;
                                obj.Grid = gridElement;

                                bResult = eval(sInvalidCellHandler)(obj, event);
                                if (FConvert.toBoolean(bResult) == false) {
                                    return (true);
                                }
                            }
                        }
                    }
                }
            }

            bResult = false;
            if (FGRIDCONTROL.isValidRowIndex(gridElement, iRow) == true) {
                cell = FGRIDCONTROL.PRIVATE.getCellElementOfRowColumn(gridElement, iRow, iColumn);
                if (FCommon.UI.isValidObject(cell) == true) {
                    if (FCommon.UI.isValidObject(event) == true) {
                        FGRIDCONTROL.PRIVATE.onEnterCell(gridElement, cell, event);
                    }
                    else {
                        FGRIDCONTROL.PRIVATE.onEnterCell(gridElement, cell);
                    }

                    bResult = true;
                }
            }
        }
        catch (err) {
            alert("Exception: {FGRIDCONTROL.gotoNextCell} " + err.message);
        }

        return (bResult);
    },

    // {Private}
    gotoPreviousCell: function (gridElement, event) {
        var iRow = 0;
        var iColumn = 0;
        var cell = null;
        var bResult = false;
        var bRowChanged = false;
        var sInvalidCellHandler = "";
        var obj = null;

        try {
            iRow = FGRIDCONTROL.getCurrentRow(gridElement);
            iColumn = FGRIDCONTROL.getCurrentColumn(gridElement);
            bResult = FGRIDCONTROL.PRIVATE.onLeaveCell(gridElement, event);

            if (FConvert.toBoolean(bResult) == true) {
                bRowChanged = false;
                iColumn--;
                if (FGRIDCONTROL.isValidColumnIndex(gridElement, iColumn) == false) {
                    iRow--;
                    iColumn = FGRIDCONTROL.getTotalColumns(gridElement);
                    bRowChanged = true;
                }

                if (bRowChanged == true) {
                    bRowChanged = FGRIDCONTROL.onRowChange(FGRIDCONTROL.PRIVATE.getChangeRowObject(gridElement, iRow + 1, iRow), event);
                    if (FConvert.toBoolean(bRowChanged) == false) {
                        iRow++;
                        iColumn = 1;
                    }
                    else {
                        if (FGRIDCONTROL.isValidRowIndex(gridElement, iRow) == false) {
                            sInvalidCellHandler = FGRIDCONTROL.getInvalidCellHandler(gridElement);
                            if (FCommon.String.isNullOrEmpty(sInvalidCellHandler, true) == false) {
                                obj = {};
                                obj.iRow = iRow;
                                obj.iColumn = iColumn;
                                obj.bFirstRow = true;
                                obj.Grid = gridElement;
                                eval(sInvalidCellHandler)(obj, event);
                                return (true);
                            }
                        }
                    }
                }
            }

            bResult = false;
            if (FGRIDCONTROL.isValidRowIndex(gridElement, iRow) == true) {
                cell = FGRIDCONTROL.PRIVATE.getCellElementOfRowColumn(gridElement, iRow, iColumn);
                if (FCommon.UI.isValidObject(cell) == true) {
                    if (FCommon.UI.isValidObject(event) == true) {
                        FGRIDCONTROL.PRIVATE.onEnterCell(gridElement, cell, event);
                    }
                    else {
                        FGRIDCONTROL.PRIVATE.onEnterCell(gridElement, cell);
                    }

                    bResult = true;
                }
            }
        }
        catch (err) {
            alert("Exception: {FGRIDCONTROL::gotoPreviousCell} " + err.message);
        }

        return (bResult);
    },

    getHeadingRow: function (gridElement) {
        var eleRow = null;

        try {
            gridElement = FCommon.UI.getValidElement(gridElement);
            if (FCommon.UI.isValidObject(gridElement) == false) {
                return (null);
            }

            eleRow = document.getElementById(gridElement.id + "_row_heading");
        }
        catch (err) {
            alert("Exception: {FGRIDCONTROL.getHeadingRow} " + err.message);
        }

        return (eleRow);
    },

    changeRowColumnWidth: function (eleRow, arrNewWidth) {
        var iCounter = 0;
        var iTotalColumn = 0;
        var eleColumn = null;

        try {
            if (FCommon.UI.isValidObject(eleRow) == false) {
                return;
            }

            iTotalColumn = Math.min(eleRow.children.length, arrNewWidth.length);
            for (iCounter = 0; iCounter < iTotalColumn; iCounter++) {
                if (arrNewWidth[iCounter] < 0) {
                    continue;
                }

                eleColumn = eleRow.children[iCounter];

                eleColumn.style.minWidth = arrNewWidth[iCounter] + "px";
                eleColumn.style.maxWidth = eleColumn.style.minWidth;
            }
        }
        catch (err) {
            alert("Exception: {FGRIDCONTROL.changeRowColumnWidth} " + err.message);
        }
    },

    getColumnsWidthArray: function (gridElement) {
        var iCounter = 0;
        var eleRow = null;
        var arrWidth = [];

        try {
            gridElement = FCommon.UI.getValidElement(gridElement);
            if (FCommon.UI.isValidObject(gridElement) == false) {
                return (arrWidth);
            }

            eleRow = FGRIDCONTROL.getHeadingRow(gridElement);
            if (FCommon.UI.isValidObject(eleRow) == false) {
                return (arrWidth);
            }


            for (iCounter = 0; iCounter < eleRow.children.length; iCounter++) {
                if (eleRow.children[iCounter].style.display == "none") {
                    arrWidth.push(-1);
                    continue;
                }

                arrWidth.push(FConvert.toInt(eleRow.children[iCounter].style.minWidth.split("px")[0]));
            }
        }
        catch (err) {
            alert("Exception: {FGRIDCONTROL.getColumnsWidthArray} " + err.message);
        }

        return (arrWidth);
    },

    getClassName: function () {
        return ("fgrid");
    },

    getRowClassName: function () {
        return ("fgridrow");
    },

    getColumnClassName: function () {
        return ("FGridColumn");
    },

    getCurrentRow: function (gridElement) {
        var iValue = -1;

        try {
            gridElement = FCommon.UI.getValidElement(gridElement);
            if (FCommon.UI.isValidObject(gridElement) == true) {
                iValue = FConvert.toInt(gridElement.getAttribute("data-currentrow"));
            }
        }
        catch (err) {
            iValue = -1;
            alert("Exception: {FGRIDCONTROL::getCurrentRow} " + err.message);
        }

        return (iValue);
    },

    setCurrentRow: function (gridElement, iRow) {
        var bResult = false;

        try {
            gridElement = FCommon.UI.getValidElement(gridElement);
            gridElement.setAttribute("data-currentrow", iRow);
            bResult = true;
        }
        catch (err) {
            alert("Exception: {FGRIDCONTROL::setCurrentRow} " + err.message);
        }

        return (bResult);
    },

    getCurrentColumn: function (gridElement) {
        var iValue = -1;

        try {
            gridElement = FCommon.UI.getValidElement(gridElement);
            if (FCommon.UI.isValidObject(gridElement) == true) {
                iValue = FConvert.toInt(gridElement.getAttribute("data-currentcolumn"));
            }            
        }
        catch (err) {
            iValue = -1;
            alert("Exception: {FGRIDCONTROL::getCurrentColumn} " + err.message);
        }

        return (iValue);
    },

    setCurrentColumn: function (gridElement, iColumn) {
        var bResult = false;

        try {
            gridElement = FCommon.UI.getValidElement(gridElement);
            gridElement.setAttribute("data-currentcolumn", iColumn);
            bResult = true;
        }
        catch (err) {
            alert("Exception: {FGRIDCONTROL::setCurrentColumn} " + err.message);
        }

        return (bResult);
    },

    // Returns cell element from child
    getCellElement: function (element) {
        var sClassName = "";
        var element = null;

        try {
            sClassName = FGRIDCONTROL.getColumnClassName();

            while (element != null) {
                if ($(element).hasClass(sClassName)) {
                    break;
                }

                element = element.parentElement;
            }
        }
        catch (err) {
            alert("Exception: {FGRIDCONTROL::getCellElement} " + err.message);
        }

        return (element);
    },

    // Returns grid element of passed cell
    getGridElementFromCell: function (cell) {
        var sClassName = "";
        var element = null;

        try {
            sClassName = FGRIDCONTROL.getClassName();

            element = cell;
            while (element != null) {
                if ($(element).hasClass(sClassName)) {
                    break;
                }

                element = element.parentElement;
            }
        }
        catch (err) {
            alert("Exception: {FGRIDCONTROL::getGridElementFromCell} " + err.message);
        }

        return (element);
    },

    // Returns grid element of passed heading element
    getGridElementFromHeading: function(eleHeading) {
        var element = null;

        try {
            element = eleHeading.parentElement.parentElement.parentElement;
        }
        catch (err) {
            alert("Exception: {FGRIDCONTROL.getGridElementFromHeading} " + err.message);
        }

        return (element);
    },

    // Returns grid id of passed cell
    getGridIdFromCell: function (cell) {
        var sId = "";
        var element = null;

        try {
            element = FGRIDCONTROL.getGridElementFromCell(cell);
            if (FCommon.UI.isValidObject(element) == true) {
                sId = element.id;
            }
        }
        catch (err) {
            alert("Exception: {FGRIDCONTROL::getGridIdFromCell} " + err.message);
        }

        return (sId);
    },

    // Returns total rows excluding heading
    getTotalRows: function (gridElement) {
        var element = null;
        var iValue = 0;

        try {
            element = FGRIDCONTROL.PRIVATE.getBodyElement(gridElement);
            if (FCommon.UI.isValidObject(element) == false) {
                return (0);
            }

            iValue = element.children.length;
        }
        catch (err) {
            alert("Exception: {FGRIDCONTROL::getTotalRows} " + err.message);
        }

        return (iValue);
    },

    // Returns true if passed row is valid
    isValidRowIndex: function (gridElement, iRow, bMinCheck) {
        var bResult = false;

        try {
            if (FCommon.UI.isValidObject(bMinCheck) == true) {
                if (eval(bMinCheck) == true) {
                    if (iRow > 0) {
                        bResult = true;
                    }
                }
                else {
                    if (iRow <= FGRIDCONTROL.getTotalRows(gridElement)) {
                        bResult = true;
                    }
                }
            }
            else if (iRow > 0 && iRow <= FGRIDCONTROL.getTotalRows(gridElement)) {
                bResult = true;
            }
        }
        catch (err) {
            alert("Exception: {FGRIDCONTROL.isValidRowIndex} " + err.message);
        }

        return (bResult);
    },

    // Returns total input column excluding serial number column
    getTotalColumns: function (gridElement) {
        var eleHead = null;
        var iValue = 0;

        try {
            eleHead = FGRIDCONTROL.PRIVATE.getHeadElement(gridElement);
            if (FCommon.UI.isValidObject(eleHead) == false) {
                return (0);
            }

            iValue = eleHead.children[0].children.length - 1;
        }
        catch (err) {
            alert("Exception: {FGRIDCONTROL::getTotalColumns} " + err.message);
        }

        return (iValue);
    },

    // Returns true if passed column is valid
    isValidColumnIndex: function (gridElement, iColumn) {
        var bResult = false;

        try {
            if (iColumn > 0 && iColumn <= FGRIDCONTROL.getTotalColumns(gridElement)) {
                bResult = true;
            }
        }
        catch (err) {
            alert("Exception: {FGRIDCONTROL.isValidColumnIndex} " + err.message);
        }

        return (bResult);
    },

    // Returns given row element
    getRowElement: function (gridElement, iRow) {
        var eleRow = null;
        var eleBody = null;

        try {
            switch (iRow)
            {
                case -1: // footer
                    eleBody = FGRIDCONTROL.PRIVATE.getFootElement(gridElement);
                    if (FCommon.UI.isValidObject(eleBody) == true && eleBody.children.length > 0) {
                        eleRow = eleBody.children[0];
                    }
                    break;
                case 0: // heading
                    eleBody = FGRIDCONTROL.PRIVATE.getHeadElement(gridElement);
                    if (FCommon.UI.isValidObject(eleBody) == true && eleBody.children.length > 0) {
                        eleRow = eleBody.children[0]; // 0 for heading, 1 for container;
                    }
                    break;
                default:
                    eleBody = FGRIDCONTROL.PRIVATE.getBodyElement(gridElement);
                    if (FCommon.UI.isValidObject(eleBody) == false) {
                        return;
                    }

                    if (iRow > 0 && iRow <= eleBody.children.length) {
                        eleRow = eleBody.children[iRow - 1];
                    }
                    break;
            }
        }
        catch (err) {
            alert("Exception: {FGRIDCONTROL.getRowElement} " + err.message);
        }

        return (eleRow);
    },

    getRowColumnFromElement: function (gridElement, cellElement) {
        var eleRow = null;
        var eleBody = null;
        var iCounter = 0;
        var result = {};

        try {
            result.iRow = -1;
            result.iColumn = -1;

            eleBody = FGRIDCONTROL.PRIVATE.getBodyElement(gridElement);

            gridElement = FCommon.UI.getValidElement(gridElement);
            cellElement = FCommon.UI.getValidElement(cellElement);

            eleRow = cellElement.parentElement;
            result.iRow = FGRIDCONTROL.getRowNoFromRowElement(eleRow);

            //for (iCounter = 0; iCounter < eleBody.children.length; iCounter++) {
            //    if (eleBody.children[iCounter].isSameNode) {
            //        if (eleBody.children[iCounter].isSameNode(eleRow) == true) {
            //            result.iRow = iCounter + 1;
            //            break;
            //        }
            //    }
            //    else if (eleBody.children[iCounter].isEqualNode) {
            //        if (eleBody.children[iCounter].isEqualNode(eleRow) == true) {
            //            result.iRow = iCounter + 1;
            //            break;
            //        }
            //    }
            //    else if (eleBody.children[iCounter] === eleRow) {
            //        result.iRow = iCounter + 1;
            //        break;
            //    }
            //}

            if (result.iRow <= 0) {
                return (result);
            }

            result.iColumn = FCommon.UI.getElementPosition(cellElement);
            result.iColumn--;

            //for (iCounter = 0; iCounter < eleRow.children.length; iCounter++) {
            //    if (eleRow.children[iCounter].isSameNode) {
            //        if (eleRow.children[iCounter].isSameNode(cellElement) == true) {
            //            result.iColumn = iCounter;
            //            break;
            //        }
            //    }
            //    else if (eleRow.children[iCounter].isEqualNode) {
            //        if (eleRow.children[iCounter].isEqualNode(cellElement) == true) {
            //            result.iColumn = iCounter;
            //            break;
            //        }
            //    }
            //    else if (eleRow.children[iCounter] === cellElement) {
            //        result.iColumn = iCounter;
            //        break;
            //    }
            //}
        }
        catch (err) {
            alert("Exception: {FGRIDCONTROL.getRowColumnFromElement} " + err.message);

            result.iRow = -1;
            result.iColumn = -1;
        }

        return (result);
    },

    getRowNoFromRowElement: function (eleRow) {
        var iRow = 0;

        try {
            if (FCommon.UI.isValidObject(eleRow) == false) {
                return (-1);
            }

            if(FCommon.UI.isValidObject(eleRow.nodeName) == false || eleRow.nodeName.toLowerCase() != "tr") {
                return(-1);
            }

            if (eleRow.parentElement.nodeName.toLowerCase() != "tbody") {
                return (-1);
            }

            if (FCommon.UI.hasClass(eleRow.parentElement.parentElement, FGRIDCONTROL.getClassName(), false) == false) {
                return (-1);
            }

            iRow = FCommon.UI.getElementPosition(eleRow);
        }
        catch (err) {
            alert("Exception: {FGRIDCONTROL.getRowNoFromRowElement} " + err.message);
        }

        return (iRow);
    },

    setCellText: function (cell, sText, bIgnoreCallback) {
        var sHandler = "";
        var olddata = "";
        var obj = null;

        try {
            olddata = FGRIDCONTROL.getCellText(cell);

            if (cell.children.length == 0) {  // If cell does not has any child element
                $(cell).text(sText);
            }
            else if (cell.children[0].children.length == 0) {
                FCommon.UI.setText(cell.children[0], sText);
            }

            if (FConvert.toBoolean(bIgnoreCallback) == false) {
                sHandler = FGRIDCONTROL.PRIVATE.getCellTextSetHandler(FGRIDCONTROL.getGridElementFromCell(cell));
                if (FCommon.String.isNullOrEmpty(sHandler, true) == false) {
                    obj = {};
                    obj.OldValue = olddata;
                    obj.Value = sText;
                    obj.iRow = FGRIDCONTROL.getRowNoFromRowElement(cell.parentElement);
                    obj.iColumn = FCommon.UI.getElementPosition(cell) - 1;
                    obj.Cell = FGRIDCONTROL.PRIVATE.getCellObjectInternal(cell, obj.iRow, obj.iColumn, false);
                    obj.ChangeType = "text";

                    eval(sHandler)(obj);
                }
            }
        }
        catch (err) {
            alert("Exception: {FGRIDCONTROL::setCellText} " + err.message);
        }

        return (olddata);
    },

    getCellText: function (cell) {
        var data = "";

        try {
            if (cell.children.length == 0) { // If cell does not has any child element
                data = $(cell).text();
            }
            else if (cell.children[0].children.length == 0) {
                data = $(cell.children[0]).text();
            }
        }
        catch (err) {
            alert("Exception: {FGRIDCONTROL.getCellText} " + err.message);
        }

        return (data);
    },

    isCheckboxColumnReadyForInput: function (gridElement, iRow, iColumn) {
        try {
            gridElement = FCommon.UI.getValidElement(gridElement);
            if (FCommon.UI.isValidObject(gridElement) == false) {
                return (false);
            }

            cell = FGRIDCONTROL.getCellObject(gridElement, iRow, iColumn);
            if (FCommon.UI.isValidObject(cell) == false) {
                return (false);
            }

            if (cell.ContainerAttribute.ColumnType != FGRIDCOLUMNTYPE.get("BOOLEAN")) {
                return (false);
            }

            eleCheck = cell.cell.children[0];
            if (FCommon.String.isNullOrEmpty(eleCheck.style.visibility) == true || eleCheck.style.visibility.toLowerCase() == "visible") {
                return (true);
            }
        }
        catch (err) {
            alert("Exception: {FGRIDCONTROL.isCheckboxColumnReadyForInput} " + err.message);
        }

        return (false);
    },

    setCheckboxColumnVisibility: function (gridElement, iRow, iColumn, bVisible) {
        var cell = null;

        try {
            gridElement = FCommon.UI.getValidElement(gridElement);
            if (FCommon.UI.isValidObject(gridElement) == false) {
                return;
            }

            cell = FGRIDCONTROL.getCellObject(gridElement, iRow, iColumn);
            if (FCommon.UI.isValidObject(cell) == false) {
                return;
            }

            if (cell.ContainerAttribute.ColumnType == FGRIDCOLUMNTYPE.get("BOOLEAN")) {
                cell.cell.children[0].style.visibility = bVisible == true ? "" : "hidden";
            }
        }
        catch (err) {
            alert("Exception: {FGRIDCONTROL.setCheckboxColumnVisibility} " + err.message);
        }
    },

    getBindControl: function (gridElement, iColumn) {
        var element = null;

        try {
            gridElement = FCommon.UI.getValidElement(gridElement);
            if (FCommon.UI.isValidObject(gridElement) == true) {
                element = document.getElementById(gridElement.id + "_control_heading_ctrl_" + iColumn);
            }
        }
        catch (err) {
            alert("Exception: {FGRIDCONTROL.getBindControl} " + err.message);
        }

        return (element);
    },

    // {Public} Change ceckbox column state    
    setColumnCheckboxState: function (gridElement, iRow, iColumn, bChecked) {
        var cell = null;

        try {
            gridElement = FCommon.UI.getValidElement(gridElement);
            if (FCommon.UI.isValidObject(gridElement) == false) {
                return;
            }

            cell = FGRIDCONTROL.getCellObject(gridElement, iRow, iColumn);
            if (FCommon.UI.isValidObject(cell) == false) {
                return;
            }

            if (cell.ContainerAttribute.ColumnType == FGRIDCOLUMNTYPE.get("BOOLEAN")
                && cell.cell.children.length > 0
                && cell.cell.children[0].nodeName.toLowerCase() == "input"
                && (cell.cell.children[0].type.toLowerCase() == "checkbox" || cell.cell.children[0].type.toLowerCase() == "radio")) {
                cell.cell.children[0].checked = bChecked;
            }
        }
        catch (err) {
            alert("Exception: {FGRIDCONTROL.setColumnCheckboxState} " + err.message);
        }
    },

    // {Public} REturn checkbox checked state
    getColumnCheckboxState: function (gridElement, iRow, iColumn) {
        var eleCheck = null;
        var cell = null;

        try {
            gridElement = FCommon.UI.getValidElement(gridElement);
            if (FCommon.UI.isValidObject(gridElement) == false) {
                return (false);
            }

            cell = FGRIDCONTROL.getCellObject(gridElement, iRow, iColumn);
            if (FCommon.UI.isValidObject(cell) == false) {
                return (false);
            }

            if (cell.ContainerAttribute.ColumnType == FGRIDCOLUMNTYPE.get("BOOLEAN")
                && cell.cell.children.length > 0
                && cell.cell.children[0].nodeName.toLowerCase() == "input"
                && (cell.cell.children[0].type.toLowerCase() == "checkbox" || cell.cell.children[0].type.toLowerCase() == "radio")) {
                eleCheck = cell.cell.children[0];
                if (FCommon.String.isNullOrEmpty(eleCheck.style.visibility) == true || eleCheck.styl.visibility.toLowerCase() != "hidden") {
                    return (eleCheck.checked);
                }
            }
        }
        catch (err) {
            alert("Exception: {FGRIDCONTROL.getColumnCheckboxState} " + err.message);
        }

        return (false);
    },

    // {Public} Sets cell data and returns old data
    setCellData: function (cell, sKey, sValue, bIgnoreCallback) {
        var sHandler = "";
        var olddata = "";
        var obj = null;

        try {
            if (sKey.substr(0, "data-".length).toLowerCase() !== "data-") {
                sKey = "data-" + sKey;
            }

            olddata = FGRIDCONTROL.getCellData(cell, sKey);
            cell.setAttribute(sKey, sValue);

            if (FConvert.toBoolean(bIgnoreCallback) == false) {
                sHandler = FGRIDCONTROL.PRIVATE.getCellDataSetHandler(FGRIDCONTROL.getGridElementFromCell(cell));
                if (FCommon.String.isNullOrEmpty(sHandler, true) == false) {
                    obj = {};
                    obj.Key = sKey;
                    obj.OldValue = olddata;
                    obj.Value = sValue;
                    obj.iRow = FGRIDCONTROL.getRowNoFromRowElement(cell.parentElement);
                    obj.iColumn = FCommon.UI.getElementPosition(cell) - 1;
                    obj.Cell = FGRIDCONTROL.PRIVATE.getCellObjectInternal(cell, obj.iRow, obj.iColumn, false);
                    obj.ChangeType = "data";

                    eval(sHandler)(obj);
                }
            }
        }
        catch (err) {
            alert("Exception: {FGRIDCONTROL.setCellData} " + err.message);
        }

        return (olddata);
    },

    // {Public} Returns cell data
    getCellData: function (cell, sKey) {
        var data = "";

        try {
            if (sKey.substr(0, "data-".length).toLowerCase() !== "data-") {
                sKey = "data-" + sKey;
            }

            data = cell.getAttribute(sKey);
            if (data == null) {
                data = "";
            }
        }
        catch (err) {
            alert("Exception: {FGRIDCONTROL::getCellData} " + err.message);
        }

        return (data);
    },

    // {Public} Sets row data and returns old data
    setRowData: function (row, sKey, sValue) {
        var olddata = "";

        try {
            if (FCommon.UI.isValidObject(row) == false) {
                return;
            }

            if (sKey.substr(0, "data-".length).toLowerCase() !== "data-") {
                sKey = "data-" + sKey;
            }

            olddata = FGRIDCONTROL.getRowData(row, sKey);
            row.setAttribute(sKey, sValue);
        }
        catch (err) {
            alert("Exception: {FGRIDCONTROL::setRowData} " + err.message);
        }

        return (olddata);
    },

    // {Public} Returns row data attributes
    getRowData: function (row, sKey) {
        var data = "";

        try {
            if (FCommon.UI.isValidObject(row) == false) {
                return;
            }

            if (FCommon.UI.isValidObject(sKey) == true) {
                if (sKey.substr(0, "data-".length).toLowerCase() !== "data-") {
                    sKey = "data-" + sKey;
                }

                data = row.getAttribute(sKey);
            }
        }
        catch (err) {
            alert("Exception: {FGRIDCONTROL::getRowData} " + err.message);
        }

        return (data);
    },

    // {Public} Returns row value
    getRowValue: function (gridElement, iRow) {
        var iCounter = 0;
        var data = null;
        var cell = null;
        var obj = null;

        try {
            data = [];

            gridElement = FCommon.UI.getValidElement(gridElement);
            if (FCommon.UI.isValidObject(gridElement) == false) {
                return (data);
            }

            if (FGRIDCONTROL.isValidRowIndex(gridElement, iRow) == false) {
                return (data);
            }

            for (iCounter = 1; iCounter <= FGRIDCONTROL.getTotalColumns(gridElement) ; iCounter++) { // 0 column fixed for serial number
                cell = FGRIDCONTROL.getCellObject(gridElement, iRow, iCounter);
                obj = {};
                obj.iRow = iRow;
                obj.iColumn = iCounter;
                obj.MetaData = cell.ColumnAttribute;
                obj.Data = cell.CellData;
                obj.Text = cell.getCellText();

                if (cell.ContainerAttribute.ColumnType == FGRIDCOLUMNTYPE.get("BOOLEAN")) {
                    obj.Value = cell.getCheckboxState();
                }
                else {
                    obj.Value = cell.getCellData();
                }

                data.push(obj);
            }
        }
        catch (err) {
            alert("Exception: {FGRIDCONTROL::getRowValue} " + err.message);
        }

        return (data);
    },

    // {Public} Returns cell object of given row and column
    getCellObject: function (gridElement, iRow, iColumn) {
        var obj = null;
        var objCell = null;

        gridElement = FCommon.UI.getValidElement(gridElement);
        if (FCommon.UI.isValidObject(gridElement) == false) {
            return;
        }

        if (iRow > 0) {
            if (iColumn > 0) {
                objCell = FGRIDCONTROL.PRIVATE.getCellElementOfRowColumn(gridElement, iRow, iColumn);
                obj = FGRIDCONTROL.PRIVATE.getCellObjectInternal(objCell, iRow, iColumn, false);
            }
            else if (iColumn == 0) {
                objCell = FGRIDCONTROL.PRIVATE.getSerialNoElement(gridElement, iRow);
                if (FCommon.UI.isValidObject(objCell) == true) {
                    obj = {};
                    obj.Grid = gridElement;
                    obj.cell = objCell;
                    obj.iRow = iRow;
                    obj.iColumn = 0;
                    obj.bHidden = false;
                    if (FCommon.String.isNullOrEmpty(objCell.style.display) == false) {
                        if (objCell.style.display.toLowerCase() == "none") {
                            obj.bHidden = true;
                        }
                    }
                    obj.sText = "";
                    if (objCell.children.length == 0) {
                        obj.sText = FCommon.UI.getText(objCell);
                    }
                    obj.clear = function () {
                        try {
                            if (FCommon.UI.isValidObject(this.cell) == true) {
                                FCommon.UI.removeChildren(this.cell);
                                FCommon.UI.setText(this.cell, "");
                                FCommon.UI.removeDataAttribute(this.cell);
                            }
                        }
                        catch (err) {
                            alert("Exception:  {FGRIDCONTROL::getCellObject.clear} " + err.message);
                        }
                    };
                    obj.setCellText = function (sText, data) {
                        var sOldText = "";

                        if (FCommon.UI.isValidObject(this.cell) == true) {
                            if (this.cell.children.length == 0) {
                                sOldText = FGRIDCONTROL.setCellText(this.cell, sText);
                            }

                            if (FCommon.UI.isValidObject(data) == true) {
                                // this.setCellData(data);
                            }
                        }

                        return (sOldText);
                    };
                    obj.getCellData = function (sKey) {
                        if (FCommon.String.isNullOrEmpty(sKey) == true) {
                            return (FGRIDCONTROL.getCellData(this.cell, "value"));
                        }

                        return (FGRIDCONTROL.getCellData(this.cell, sKey));
                    };
                }
            }
        }
        else if (iRow == 0) {
            if (iColumn > 0) {
                objCell = FGRIDCONTROL.PRIVATE.getHeadingElement(gridElement, iColumn);
            }
            else if (iColumn == 0) {
                objCell = FGRIDCONTROL.PRIVATE.getSerialNoElement(gridElement, 0);
            }
            
            if (FCommon.UI.isValidObject(objCell) == true) {
                obj = {};
                obj.Grid = gridElement;
                obj.cell = objCell;
                obj.iRow = 0;
                obj.iColumn = iColumn;
                obj.bHidden = false;
                if (FCommon.String.isNullOrEmpty(objCell.style.display) == false) {
                    if (objCell.style.display.toLowerCase() == "none") {
                        obj.bHidden = true;
                    }
                }
                obj.sText = "";
                if (objCell.children.length == 0) {
                    obj.sText = FCommon.UI.getText(objCell);
                }
                obj.ColumnAttribute = FGRIDCONTROL.getHeadingDataObject(gridElement, iColumn);
                obj.ContainerAttribute = FGRIDCONTROL.getContainerDataObject(gridElement, iColumn);
                obj.clear = function () {
                    try {
                        if (FCommon.UI.isValidObject(this.cell) == true) {
                            FCommon.UI.removeChildren(this.cell);
                            FCommon.UI.setText(this.cell, "");
                            FCommon.UI.removeDataAttribute(this.cell);
                        }
                    }
                    catch (err) {
                        alert("Exception:  {FGRIDCONTROL::getCellObject.clear} " + err.message);
                    }
                };
                obj.setCellText = function (sText, data) {
                    var sOldText = "";

                    if (FCommon.UI.isValidObject(this.cell) == true) {
                        if (this.cell.children.length == 0) {
                            sOldText = FGRIDCONTROL.setCellText(this.cell, sText);
                        }

                        if (FCommon.UI.isValidObject(data) == true) {
                           // this.setCellData(data);
                        }
                    }

                    return (sOldText);
                };
                obj.getCellData = function (sKey) {
                    if (FCommon.String.isNullOrEmpty(sKey) == true) {
                        return (FGRIDCONTROL.getCellData(this.cell, "value"));
                    }

                    return (FGRIDCONTROL.getCellData(this.cell, sKey));
                };
            }
        }
        else if (iRow == -1) {
            if (iColumn > 0) {
                objCell = FGRIDCONTROL.PRIVATE.getFooterElement(gridElement, iColumn);
            }
            else {
                objCell = FGRIDCONTROL.PRIVATE.getSerialNoElement(gridElement, -1);
            }
            
            if (FCommon.UI.isValidObject(objCell) == true) {
                obj = {};
                obj.Grid = gridElement;
                obj.cell = objCell;
                obj.iRow = -1;
                obj.iColumn = iColumn;
                obj.bHidden = false;
                if (FCommon.String.isNullOrEmpty(objCell.style.display) == false) {
                    if (objCell.style.display.toLowerCase() == "none") {
                        obj.bHidden = true;
                    }
                }
                obj.sText = "";
                if (objCell.children.length == 0) {
                    obj.sText = FCommon.UI.getText(objCell);
                }
                obj.clear = function () {
                    try {
                        if (FCommon.UI.isValidObject(this.cell) == true) {
                            FCommon.UI.removeChildren(this.cell);
                            FCommon.UI.setText(this.cell, "");
                            FCommon.UI.removeDataAttribute(this.cell);
                        }
                    }
                    catch (err) {
                        alert("Exception:  {FGRIDCONTROL::getCellObject.clear} " + err.message);
                    }
                };
                obj.setCellText = function (sText, data) {
                    var sOldText = "";

                    if (FCommon.UI.isValidObject(this.cell) == true) {
                        if (this.cell.children.length == 0) {
                            sOldText = FGRIDCONTROL.setCellText(this.cell, sText);
                        }

                        if (FCommon.UI.isValidObject(data) == true) {
                            // this.setCellData(data);
                        }
                    }

                    return (sOldText);
                };
                obj.getCellData = function (sKey) {
                    if (FCommon.String.isNullOrEmpty(sKey) == true) {
                        return (FGRIDCONTROL.getCellData(this.cell, "value"));
                    }

                    return (FGRIDCONTROL.getCellData(this.cell, sKey));
                };
            }
        }

        return (obj);
    },

    // {Public} Hide/show given column
    hideColumn: function (gridElement, iColumn, bHide) {
        var iTotalRows = 0;
        var iTotalColumns = 0;
        var iCounter = 0;
        var objColumn = null;
        var eleHiddenCell = null;

        try {
            gridElement = FCommon.UI.getValidElement(gridElement);
            if (FCommon.UI.isValidObject(gridElement) == false) {
                return;
            }

            iTotalRows = FGRIDCONTROL.getTotalRows(gridElement);
            iTotalColumns = FGRIDCONTROL.getTotalColumns(gridElement);
            if (iColumn < 1 || iColumn > iTotalColumns) {
                alert("Error:  {FGRIDCONTROL::hideColumn} Invalid column index.");
                return;
            }

            objColumn = FGRIDCONTROL.getCellObject(gridElement, 0, iColumn);
            if (bHide == true) {
                objColumn.cell.style.display = "none";
            }
            else {
                objColumn.cell.style.display = "";
            }

            eleCell = FGRIDCONTROL.PRIVATE.getHiddenColumn(gridElement, iColumn);
            if (FCommon.UI.isValidObject(eleCell)) {
                if (bHide == true) {
                    eleCell.style.display = "none";
                }
                else {
                    eleCell.style.display = "";
                }
            }

            for (iCounter = 1; iCounter <= iTotalRows; iCounter++) {
                cell = FGRIDCONTROL.PRIVATE.getCellElementOfRowColumn(gridElement, iCounter, iColumn);
                if (FCommon.UI.isValidObject(cell) == false) {
                    continue;
                }

                if (bHide == true) {
                    cell.style.display = "none";
                }
                else {
                    cell.style.display = "";
                }
            }
        }
        catch (err) {
            alert("Exception: {FGRIDCONTROL::hideColumn} " + err.message);
        }
    },

    // {Public} Clears grid data
    clearData: function (gridElement) {
        var iTotalRows = 0;
        var iTotalColumns = 0;
        var iCounter = 0;
        var eleContainer = null;
        var eleRow = null;
        var obj = null;
        var arrContainerDataAttribute = [];

        try {
            gridElement = FCommon.UI.getValidElement(gridElement);
            iTotalColumns = FGRIDCONTROL.getTotalColumns(gridElement);

            arrContainerDataAttribute.push({});
            for (iCounter = 1; iCounter <= iTotalColumns; iCounter++) {
                obj = FGRIDCONTROL.getContainerDataObject(gridElement, iCounter);
                arrContainerDataAttribute.push(obj);
            }


            iTotalRows = FGRIDCONTROL.getTotalRows(gridElement);
            for (iCounter = 1; iCounter <= iTotalRows; iCounter++) {
                eleRow = FGRIDCONTROL.getRowElement(gridElement, iCounter);
                FGRIDCONTROL.resetRowValue(gridElement, eleRow, arrContainerDataAttribute, true);
            }

            for (iCounter = 1; iCounter < arrContainerDataAttribute.length; iCounter++) {
                if (arrContainerDataAttribute[iCounter].ColumnType == FGRIDCOLUMNTYPE.get("BOOLEAN")) {
                    eleRow = FGRIDCONTROL.getBindControl(gridElement, iCounter);
                    if (FCommon.UI.isValidObject(eleRow) == true) {
                        eleRow.checked = false;
                    }
                }
            }

            FGRIDCONTROL.setCurrentRow(gridElement, 0);
            FGRIDCONTROL.setCurrentColumn(gridElement, 0);
        }
        catch (err) {
            alert("Exception: {FGRIDCONTROL::clearData} " + err.message);
        }
    },

    // {Public} Clears grid row data
    clearRowData: function (gridElement, iRow, bMoveControlToContainer) {
        var iTotalColumns = 0;
        var iCounter = 0;
        var eleContainer = null;
        var eleRow = null;
        var obj = null;
        var arrContainerDataAttribute = [];

        try {
            gridElement = FCommon.UI.getValidElement(gridElement);
            if (FCommon.UI.isValidObject(gridElement) == false) {
                return;
            }

            if (iRow < 1 || iRow > FGRIDCONTROL.getTotalRows(gridElement)) {
                return;
            }

            iTotalColumns = FGRIDCONTROL.getTotalColumns(gridElement);
            if (FCommon.UI.isValidObject(bMoveControlToContainer) == true && bMoveControlToContainer == true) {
                for (iCounter = 1; iCounter <= iTotalColumns; iCounter++) {
                    obj = FGRIDCONTROL.getContainerDataObject(gridElement, iCounter);

                    if (obj.bIgnoreCellControlToContainerMovement == true) {
                        continue;
                    }

                    eleRow = FGRIDCONTROL.isColumnControlVisible(gridElement, iCounter);
                    if (FCommon.UI.isValidObject(eleRow) == false) {
                        continue;
                    }


                    eleContainer = FGRIDCONTROL.getControlContainerElement(gridElement, iCounter);
                    while (eleRow.children.length > 0) {
                        eleContainer.appendChild(eleRow.children[0]);
                    }
                }
            }

            arrContainerDataAttribute.push({});
            for (iCounter = 1; iCounter <= iTotalColumns; iCounter++) {
                obj = FGRIDCONTROL.getContainerDataObject(gridElement, iCounter);
                arrContainerDataAttribute.push(obj);
            }

            eleRow = FGRIDCONTROL.getRowElement(gridElement, iRow);
            FGRIDCONTROL.resetRowValue(gridElement, eleRow, arrContainerDataAttribute, true);

            for (iCounter = 1; iCounter < arrContainerDataAttribute.length; iCounter++) {
                if (arrContainerDataAttribute[iCounter].ColumnType == FGRIDCOLUMNTYPE.get("BOOLEAN")) {
                    eleRow = FGRIDCONTROL.getBindControl(gridElement, iCounter);
                    if (FCommon.UI.isValidObject(eleRow) == true) {
                        eleRow.checked = false;
                    }
                }
            }
        }
        catch (err) {
            alert("Exception: {FGRIDCONTROL.clearRowData} " + err.message);
        }
    },


    // {Public} Clears grid column data
    clearColumnData: function (gridElement, iColumn) {
        var iRow = 0;
        var iTotalRows = 0;
        var eleContainer = null;
        var eleRow = null;
        var eleChild = null;
        var obj = null;

        try {
            gridElement = FCommon.UI.getValidElement(gridElement);
            if (FCommon.UI.isValidObject(gridElement) == false) {
                return;
            }

            if (iColumn < 1 || iColumn > FGRIDCONTROL.getTotalColumns(gridElement)) {
                return;
            }

            obj = FGRIDCONTROL.getContainerDataObject(gridElement, iColumn);
            if (obj.bIgnoreCellControlToContainerMovement == true) {
                return;
            }

            iTotalRows = FGRIDCONTROL.getTotalRows(gridElement);
            for (iRow = 1; iRow <= iTotalRows; iRow++) {
                eleRow = FGRIDCONTROL.getRowElement(gridElement, iRow);
                eleChild = eleRow.children[iColumn];
                if (obj.ColumnType == FGRIDCOLUMNTYPE.get("BOOLEAN")) {
                    eleChild.children[0].checked = false;
                }
                else {
                    if (eleChild.children.length > 0) {
                        eleContainer = FGRIDCONTROL.getControlContainerElement(eleGrid, iColumn);
                        while (eleChild.children.length > 0) {
                            eleContainer.appendChild(eleChild.children[0]);
                        }
                    }
                    else {
                        COMMON.prototype.setElementText(eleChild, "");
                    }
                }

                FCommon.UI.removeDataAttribute(eleChild);
            }
        }
        catch (err) {
            alert("Exception: {FGRIDCONTROL.clearColumnData} " + err.message);
        }
    },

    // {Public} moves focus to specific row column in grid
    gotoCell: function (gridElement, iRow, iColumn, event) {
        var result = null;
        var cell = null;
        var evt = null;

        try {
            result = COMMON.prototype.getEmptyResultObject();
            result.lValue = 0;
            result.sValue = "";
            result.data = null;

            gridElement = FCommon.UI.getValidElement(gridElement);
            if (FCommon.UI.isValidObject(gridElement) == false) {
                result.lValue = 0;
                result.sValue = "Invalid grid element.";

                return (result);
            }

            if (iRow < 1 || iRow > FGRIDCONTROL.getTotalRows(gridElement)) {
                result.lValue = 0;
                result.sValue = "Invalid grid row index.";

                return (result);
            }

            if (iColumn < 1 || iColumn > FGRIDCONTROL.getTotalColumns(gridElement)) {
                result.lValue = 0;
                result.sValue = "Invalid grid column index.";

                return (result);
            }

            cell = FGRIDCONTROL.getCellObject(gridElement, iRow, iColumn);
            if (FCommon.UI.isValidObject(cell) == false) {
                result.lValue = 0;
                result.sValue = "Invalid cell object."

                return (result);
            }

            evt = event | window.event || arguments.callee.caller.arguments[0];
            FGRIDCONTROL.PRIVATE.processCellClick(cell.cell, evt);

            result.lValue = 1;
        }
        catch (err) {
            result.lValue = -1;
            result.sValue = err.message;

            alert("Exception: {FGRIDCONTROL.gotoCell} " + err.message);
        }

        return (result);
    },

    update: function (gridElement, event) {
        var obj = {};

        obj.iRow = 0;
        obj.iColumn = 0;
        obj.bResult = false;

        gridElement = FCommon.UI.getValidElement(gridElement);
        if (FCommon.UI.isValidObject(gridElement) == true) {
            obj.iRow = FGRIDCONTROL.getCurrentRow(gridElement);
            obj.iColumn = FGRIDCONTROL.getCurrentColumn(gridElement);

            obj.bResult = FGRIDCONTROL.PRIVATE.onLeaveCell(gridElement, event | window.event || arguments.callee.caller.arguments[0]);
        }

        return (obj);
    },

    makeCellVisible: function (gridElement, iRow, iColumn) {
        var objCell = null;
        var bResult = false;

        try {
            gridElement = FCommon.UI.getValidElement(gridElement);
            if (FCommon.UI.isValidObject(gridElement) == false) {
                return (false);
            }

            if (FGRIDCONTROL.isValidRowIndex(gridElement, iRow) == false) {
                return (false);
            }

            if (FGRIDCONTROL.isValidColumnIndex(gridElement, iColumn) == false) {
                return (false);
            }

            objCell = FGRIDCONTROL.getCellObject(gridElement, iRow, iColumn);
            if (FCommon.UI.isValidObject(objCell) == false) {
                return (false);
            }

            bResult = FGRIDCONTROL.PRIVATE.makeCellVisible(gridElement, objCell);
        }
        catch (err) {
            alert("Exception: {FGRIDCONTROL.makeCellVisible} " + err.message);

            bResult = false;
        }

        return (bResult);
    },

    // {Public} Returns data of given row and column     
    getData: function (gridElement, iRow, iColumn) {
        var iTotalRows = 0;
        var iTotalColumns = 0;
        var cell = null;
        var result = null;

        try {
            result = COMMON.prototype.getEmptyResultObject();
            result.lValue = 0;
            result.sValue = "";
            result.data = {};

            iTotalRows = FGRIDCONTROL.getTotalRows(gridElement);
            if (FGRIDCONTROL.isValidRowIndex(gridElement, iRow) == false) {
                result.lValue = 0;
                result.sValue = "Invalid row index.";

                return (result);
            }

            iTotalColumns = FGRIDCONTROL.getTotalColumns(gridElement);
            if (FGRIDCONTROL.isValidColumnIndex(gridElement, iColumn) == false) {
                result.lValue = 0;
                result.sValue = "Invalid column index";

                return (result);
            }

            cell = FGRIDCONTROL.PRIVATE.getCellElementOfRowColumn(gridElement, iRow, iColumn);
            if (FCommon.UI.isValidObject(cell) == false) {
                result.lValue = 0;
                result.sValue = "Error in finding cell element from row & column.";

                return (result);
            }

            result.lValue = 1;
            result.data = FGRIDCONTROL.getCellObject(gridElement, iRow, iColumn);
        }
        catch (err) {
            result.lValue = -1;
            result.sValue = err.message;
        }

        return (result);
    },

    // {Public} Returns array of each column with, if value is < 0 means that is hidden column
    getColumnWidthArray: function (gridElement) {
        return (FGRIDCONTROL.getColumnsWidthArray(gridElement));
    },

    // {Public} Resets grid column width
    adjustColumnWidth: function (gridElement, arrNewWidth) {
        var iCounter = 0;
        var iTotalRows = 0;
        var eleRow = null;

        try {
            gridElement = FCommon.UI.getValidElement(gridElement);
            if (FCommon.UI.isValidObject(gridElement) == false) {
                return (false);
            }

            eleRow = FGRIDCONTROL.getHeadingRow(gridElement);
            FGRIDCONTROL.changeRowColumnWidth(eleRow, arrNewWidth);

            iTotalRows = FGRIDCONTROL.getTotalRows(gridElement);
            for (iCounter = 1; iCounter <= iTotalRows; iCounter++) {
                eleRow = FGRIDCONTROL.getRowElement(gridElement, iCounter);
                FGRIDCONTROL.changeRowColumnWidth(eleRow, arrNewWidth);
            }

            eleRow = FGRIDCONTROL.PRIVATE.getHiddenRow(gridElement);
            if (FCommon.UI.isValidObject(eleRow) == true) {
                FGRIDCONTROL.changeRowColumnWidth(eleRow, arrNewWidth);
            }
        }
        catch (err) {
            alert("Exception: {FGRIDCONTROL.adjustColumnWidth} " + err.message);
        }
    },

    // {Public} Inserts row at specific position
    insertRows: function (gridElement, iIndex, iCount) {
        var eleBody = null;
        var eleHiddenRow = null;
        var eleOrgColumn = null;
        var eleRow = null;
        var eleColumn = null;
        var eleChildColumn = null;
        var attributes = null;
        var iTotalRows = 0;
        var iColumn = 0;
        var iCounter = 0;
        var iChildCounter = 0;
        var iAttributeCounter = 0;
        var iStartIndex = 0;
        var bLast = false;

        try {
            gridElement = FCommon.UI.getValidElement(gridElement);
            if (FCommon.UI.isValidObject(gridElement) == false) {
                return (-1);
            }

            eleHiddenRow = FGRIDCONTROL.PRIVATE.getHiddenRow(gridElement);
            if (FCommon.UI.isValidObject(eleHiddenRow) == false) {
                return (-1);
            }

            eleBody = FGRIDCONTROL.PRIVATE.getBodyElement(gridElement);
            if (FCommon.UI.isValidObject(eleBody) == false) {
                return (-1);
            }

            iTotalRows = FGRIDCONTROL.getTotalRows(gridElement);

            bLast = false;
            if (FCommon.UI.isValidObject(iIndex) == true) {
                iIndex = FConvert.toInt(iIndex);
                if (iIndex < 1 || iIndex > iTotalRows) {
                    bLast = true;
                    iStartIndex = iTotalRows;
                }
                else {
                    iStartIndex = (iIndex - 1);
                    bLast = false;
                }
            }
            else {
                bLast = true;
                iStartIndex = iTotalRows;
            }

            iCount = FConvert.toInt(iCount);
            if (iCount <= 0) {
                iCount = 1;
            }

            for (iCounter = 0; iCounter < iCount; iCounter++) {
                eleRow = document.createElement("tr");
                eleRow.className = eleHiddenRow.className;
                eleRow.style.cssText = eleHiddenRow.style.cssText;
                eleRow.style.display = "";
                for (iColumn = 0; iColumn < eleHiddenRow.children.length; iColumn++) {
                    eleOrgColumn = eleHiddenRow.children[iColumn];

                    eleColumn = document.createElement("td");
                    eleColumn.className = eleOrgColumn.className;
                    eleColumn.setAttribute("onclick", eleOrgColumn.getAttribute("onclick"));
                    eleColumn.setAttribute("ondblclick", eleOrgColumn.getAttribute("ondblclick"));
                    eleColumn.setAttribute("onmouseenter", eleOrgColumn.getAttribute("onmouseenter"));
                    eleColumn.setAttribute("onmouseleave", eleOrgColumn.getAttribute("onmouseleave"));

                    if (eleOrgColumn.style.cssText) {
                        eleColumn.style.cssText = eleOrgColumn.style.cssText;
                    }

                    for (iChildCounter = 0; iChildCounter < eleOrgColumn.children.length; iChildCounter++) {
                        eleChildColumn = document.createElement(eleOrgColumn.children[iChildCounter].nodeName);
                        attributes = eleOrgColumn.children[iChildCounter].attributes;
                        for (iAttributeCounter = 0; iAttributeCounter < attributes.length; iAttributeCounter++) {
                            eleChildColumn.setAttribute(attributes[iAttributeCounter].nodeName, eleOrgColumn.children[iChildCounter].getAttribute(attributes[iAttributeCounter].nodeName));
                        }

                        eleColumn.appendChild(eleChildColumn);
                    }

                    eleRow.appendChild(eleColumn);
                }

                if (bLast == true) {
                    FCommon.UI.setText(eleRow.children[0], eleBody.children.length + 1);
                    eleBody.appendChild(eleRow);
                }
                else {
                    iIndex = (iStartIndex + iCounter);
                    FCommon.UI.setText(eleRow.children[0], iIndex + 1);
                    eleBody.insertBefore(eleRow, eleBody.children[iIndex]);
                }
            }

            if (bLast == false) {
                for (iIndex++; iIndex < eleBody.children.length; iIndex++) {
                    FCommon.UI.setText(eleBody.children[iIndex].children[0], iIndex + 1);
                }

                iIndex = iStartIndex;
            }
        }
        catch (err) {
            alert("Exception: {FGRIDCONTROL.insertRows} " + err.message);
            iStartIndex = -1;
        }

        return (iStartIndex);
    },

    // {Public} Deletes row from specific position
    deleteRows: function (gridElement, iIndex, iCount) {
        var eleBody = null;
        var eleRow = null;
        var iTotalRows = 0;
        var iCounter = 0;

        try {
            gridElement = FCommon.UI.getValidElement(gridElement);
            if (FCommon.UI.isValidObject(gridElement) == false) {
                return (false);
            }

            eleBody = FGRIDCONTROL.PRIVATE.getBodyElement(gridElement);
            if (FCommon.UI.isValidObject(eleBody) == false) {
                return (false);
            }

            iTotalRows = FGRIDCONTROL.getTotalRows(gridElement);

            if (FCommon.UI.isValidObject(iIndex) == true) {
                iIndex = FConvert.toInt(iIndex);
                if (iIndex < 1 || iIndex > iTotalRows) {
                    return (false);
                }

                iIndex--;
            }
            else {
                return (false);
            }

            iCount = FConvert.toInt(iCount);
            if (iCount <= 0) {
                iCount = 1;
            }

            for (iCounter = 0; iCounter < iCount; iCounter++) {
                if (iIndex < eleBody.children.length) {
                    eleBody.removeChild(eleBody.children[iIndex]);
                }
            }

            for (iCounter = iIndex; iCounter < eleBody.children.length; iCounter++) {
                FCommon.UI.setText(eleBody.children[iCounter].children[0], iCounter + 1);
            }
        }
        catch (err) {
            alert("Exception: {FGRIDCONTROL.deleteRows} " + err.message);

            return (false);
        }

        return (true);
    },

    makeRowVisible: function(gridElement, iRow) {
        var eleContainer = null;
        var eleRow = null;
        var rectBody = null;
        var rectRow = null;

        try {
            eleContainer = FGRIDCONTROL.PRIVATE.getBodyElement(gridElement);

            rectBody = eleContainer.getBoundingClientRect();
            eleRow = FGRIDCONTROL.getRowElement(gridElement, iRow);

            rectRow = eleRow.getBoundingClientRect();

            if (rectRow.top < rectBody.top) {
                eleRow.scrollIntoView();
            }
            else if (rectRow.top > (rectBody.top + rectBody.height)) {
                eleContainer.scrollTop = (rectRow.top - rectBody.top);
            }

        }
        catch (err) {
            alert("Exception: {FGRIDCONTROL.makeRowVisible} " + err.message);
        }
    },

    copyColumnData: function (gridElement, iSourceRow, iSourceColumn, iTargetRow, iTargetColumn, bUpdateTarget) {
        var sText = "";
        var iCounter = 0;
        var iTotalRows = 0;
        var iTotalColumns = 0;
        var objSourceCell = null;
        var objTargetCell = null;

        try {
            gridElement = FCommon.UI.getValidElement(gridElement);
            if (FCommon.UI.isValidObject(gridElement) == false) {
                return (false);
            }

            iSourceRow = FConvert.toInt(iSourceRow);
            iSourceColumn = FConvert.toInt(iSourceColumn);
            iTargetRow = FConvert.toInt(iTargetRow);
            iTargetColumn = FConvert.toInt(iTargetColumn);

            iTotalRows = FGRIDCONTROL.getTotalRows(gridElement);
            iTotalColumns = FGRIDCONTROL.getTotalColumns(gridElement);

            if (iSourceRow < 1 || iSourceRow > iTotalRows || iTargetRow < 1 || iTargetRow > iTotalRows) {
                return (false);
            }

            if (iSourceColumn < 1 || iSourceColumn > iTotalColumns || iTargetColumn < 1 || iTargetColumn > iTotalColumns) {
                return (false);
            }

            if (iSourceRow == iTargetRow && iSourceColumn == iTargetColumn) {
                return (false);
            }

            objSourceCell = FGRIDCONTROL.PRIVATE.getCellElementOfRowColumn(gridElement, iSourceRow, iSourceColumn);
            if (FCommon.UI.isValidObject(objSourceCell) == false) {
                return (false);
            }

            objTargetCell = FGRIDCONTROL.PRIVATE.getCellElementOfRowColumn(gridElement, iTargetRow, iTargetColumn);
            if (FCommon.UI.isValidObject(objTargetCell) == false) {
                return (false);
            }


            bUpdateTarget = FConvert.toBoolean(bUpdateTarget);
            if (bUpdateTarget == false) {
                FCommon.UI.removeDataAttribute(objTargetCell);
                FCommon.UI.setText(objTargetCell, "");
            }

            FCommon.UI.copyDataAttribute(objSourceCell, objTargetCell);
            sText = FCommon.UI.getText(objSourceCell);
            FCommon.UI.setText(objTargetCell, sText);
        }
        catch (err) {
            alert("Exception: {FGRIDCONTROL.copyColumnData} " + err.message);

            return (false);
        }

        return (true);
    }
};

var FPOPUPCONTROL = {
    PRIVATE: {
        keydown: function (id, event) {
            var sValue = "";
            var objCtrl = null;
            var bFlag = false;

            try {
                switch (event.keyCode) {
                    case 9: // Tab
                        break;
                    case 32: // Space bar
                        FCommon.UI.stopKeyProcess(event);
                        FPOPUPCONTROL.PRIVATE.downImageClick(id, event);
                        break;
                    case 46: // Delete key
                        FCommon.UI.stopKeyProcess(event);
                        break;
                    default:
                        FCommon.UI.stopKeyProcess(event);
                        break;
                }
            }
            catch (err) {
                alert("Exception: {FPOPUPCONTROL.keydown} " + err.message);
            }
        },

        onFocus: function (id, event) {
            var sCallback = "";

            try {
                id = FCommon.UI.getValidElement(id);
                if (FCommon.UI.isValidObject(id) == true) {
                    sCallback = FPOPUPCONTROL.PRIVATE.getOnFocusCallback(id);
                    if (FCommon.String.isNullOrEmpty(sCallback, true) == false) {
                        eval(sCallback)(id, event);
                    }
                }
            }
            catch (err) {
                alert("Exception: {FPOPUPCONTROL.onFocus} " + err.message);
            }

            return (true);
        },

        // Call when control down image is clicked
        downImageClick: function (id, event) {
            var sCallback = "";

            try {
                id = FCommon.UI.getValidElement(id);
                if (FCommon.UI.isValidObject(id) == true) {
                    sCallback = FPOPUPCONTROL.PRIVATE.getOnDropdownClickCallback(id);
                    if (FCommon.String.isNullOrEmpty(sCallback, true) == false) {
                        eval(sCallback)(id, event);
                    }
                }
            }
            catch (err) {
                alert("Exception: {FPOPUPCONTROL.downImageClick} " + err.message);
            }
        },

        // Returns onfocus callback method name
        getOnFocusCallback: function (id) {
            var sValue = "";

            try {
                sValue = FCommon.UI.getAttributeData(id, "onfocus");
            }
            catch (err) {
                err.message = "Exception: {FPOPUPCONTROL.PRIVATE.getOnFocusCallback} " + err.message;
            }

            return (sValue);
        },

        // Returns onfocus callback method name
        getOnDropdownClickCallback: function (id) {
            var sValue = "";

            try {
                sValue = FCommon.UI.getAttributeData(id, "ondropdownclick");
            }
            catch (err) {
                err.message = "Exception: {FPOPUPCONTROL.PRIVATE.getOnDropdownClickCallback } " + err.message;
            }

            return (sValue);
        }
    },

    // Returns option control class name
    getClassName: function () {
        return ("FPopupControl");
    },

    // Returns inputted text in control
    getControlText: function (id) {
        var sValue = "";

        try {
            id = FCommon.UI.getValidElement(id);
            if (FCommon.UI.isValidObject(id) == true) {
                sValue = id.value;
            }
        }
        catch (err) {
            alert("Exception: {FPOPUPCONTROL.getControlText} " + err.message);
        }

        return (sValue);
    },

    // Sets control text
    setControlText: function (id, sValue) {
        try {
            id = FCommon.UI.getValidElement(id);
            if (FCommon.UI.isValidObject(id) == true) {
                id.value = sValue;
            }
        }
        catch (err) {
            alert("Exception: {FPOPUPCONTROL.setControlText} " + err.message);
        }
    },

    // Cleares memory and control data
    clear: function (id) {
        try {
            id = FCommon.UI.getValidElement(id);
            if (FCommon.UI.isValidObject(id) == true) {
                id.value = "";
            }
        }
        catch (err) {
            err.message = "Exception: {POPUPCONTROL.clear} " + err.message;
            throw err;
        }
    },

    setCurrentRow: function (id, iRow) {
        try {
            id = FCommon.UI.getValidElement(id);
            if (FCommon.UI.isValidObject(id) == true) {
                FCommon.UI.setAttributeData(id, "rowno", iRow);
            }
        }
        catch (err) {
            alert("Exception: {FPOPUPCONTROL.setCurrentRow} " + err.message);
        }
    },

    getCurrentRow: function (id) {
        var iRow = 0;

        try {
            id = FCommon.UI.getValidElement(id);
            if (FCommon.UI.isValidObject(id) == true) {
                iRow = FConvert.toInt(FCommon.UI.getAttributeData(id, "rowno"));
            }
        }
        catch (err) {
            alert("Exception: {FPOPUPCONTROL.getCurrentRow} " + err.message);
        }

        return (iRow);
    },

    setCurrentColumn: function (id, iColumn) {
        try {
            id = FCommon.UI.getValidElement(id);
            if (FCommon.UI.isValidObject(id) == true) {
                FCommon.UI.setAttributeData(id, "columnno", iColumn);
            }
        }
        catch (err) {
            alert("Exception: {FPOPUPCONTROL.setCurrentColumn} " + err.message);
        }
    },

    getCurrentColumn: function (id) {
        var iColumn = 0;

        try {
            id = FCommon.UI.getValidElement(id);
            if (FCommon.UI.isValidObject(id) == true) {
                iColumn = FConvert.toInt(FCommon.UI.getAttributeData(id, "columnno"));
            }
        }
        catch (err) {
            alert("Exception: {FPOPUPCONTROL.getCurrentColumn} " + err.message);
        }

        return (iColumn);
    },

    setParent: function (ctrl, newParent) {
        var bResult = false;
        var child = null;

        try {
            if (FCommon.UI.isValidObject(ctrl) == false) {
                alert("Error: {POPUPCONTROL.setParent} Control id required");
                return (false);
            }

            ctrl = FCommon.UI.getValidElement(ctrl);
            if (FCommon.UI.isValidObject(ctrl) == false) {
                alert("Error: {POPUPCONTROL.setParent} Control id cannot be blank");
                return (false);
            }

            if (FCommon.UI.isValidObject(newParent) == false) {
                alert("Error: {POPUPCONTROL.setParent} New parent object required");
                return (false);
            }

            newParent = FCommon.UI.getValidElement(newParent)
            if (FCommon.UI.isValidObject(newParent) == false) {
                alert("Error: {POPUPCONTROL.setParent} New parent id cannot be blank");
                return (false);
            }

            child = document.getElementById(ctrl.id + "_input_container");
            newParent.appendChild(child);

            ctrl.focus();

            bResult = true;
        }
        catch (err) {
            alert("Exception: {POPUPCONTROL.setParent} " + err.message);
            bResult = false;
        }

        return (bResult);
    }
};

var FNUMERICCONTROL = {
    onFocus: function (eleInput, event) {
        var sCallback = null;

        try {
            sCallback = FNUMERICCONTROL.onFocusCallback(eleInput);
            if (FCommon.String.isNullOrEmpty(sCallback, true) == false) {
                if (FCommon.String.includes(sCallback, "(") == true) {
                    eval(sCallback);
                }
                else {
                    eval(sCallback)(eleInput, event);
                }                
            }
        }
        catch (err) {
            alert("Exception: {FNUMERICCONTROL.onFocus} " + err.message);
        }
    },

    onInput: function(eleInput, event) {
        var sCallback = null;

        try {
            sCallback = FNUMERICCONTROL.onChangeCallback(eleInput);
            if (FCommon.String.isNullOrEmpty(sCallback, true) == false) {
                eval(sCallback)(eleInput, event);
            }
        }
        catch (err) {
            alert("Exception: {FNUMERICCONTROL.onInput} " + err.message);
        }
    },

    onLeave: function (eleInput, event) {
        var sCallback = null;

        try {
            sCallback = FNUMERICCONTROL.onLeaveCallback(eleInput);
            if (FCommon.String.isNullOrEmpty(sCallback, true) == false) {
                if (FCommon.String.includes(sCallback, "(") == true) {
                    eval(sCallback);
                }
                else {
                    eval(sCallback)(eleInput, event);
                }
            }
        }
        catch (err) {
            alert("Exception: {FNUMERICCONTROL.onLeave} " + err.message);
        }
    },

    keypress: function (eleInput, iType, evt) {
        // 0 For Signed Integer
        // 1 For Unsigned Integer
        // 2 For Signed Decimal
        // 3 For Unsingned Decimal
        var sTemp = "";
        var charCode = null;
        var iDecimalPlaces = 0;

        try {
            bResult = false;

            if (eleInput.readOnly == true) {
                return (false);
            }


            //charCode = (evt.which) ? evt.which : evt.keyCode;
            if (FCommon.UI.isValidObject(evt.which) == false) {
                return (true);
            }

            charCode = evt.which;
            if (evt.which == 0) {
                return (true);
            }


            if (FNUMERICCONTROL.isValidCode(iType, charCode) == true) {
                if (FCommon.UI.isTextSelected(eleInput) == true) {
                    eleInput.value = "";
                }

                if (charCode == 45) { // -
                    if (eleInput.value.length == 0) {
                        return (true);
                    }
                }
                else if (charCode == 46) { // .
                    if (eleInput.value.indexOf(".") == -1) {
                        iDecimalPlaces = FNUMERICCONTROL.getDecimalPlaces(eleInput);
                        if (iDecimalPlaces == 0) {
                            return (false);
                        }

                        if (FCommon.UI.isValidObject(eleInput.selectionEnd) == true) {
                            sTemp = eleInput.value.substr(eleInput.selectionEnd);
                            if (sTemp.length > iDecimalPlaces) {
                                return (false);
                            }
                        }

                        return (true);
                    }
                }
                else if (charCode >= 48 && charCode <= 57) { // 0 to 9
                    return (FNUMERICCONTROL.isValidDigitPlaceForDecimalNumber(eleInput, iType));
                }
            }
            else if (charCode == 8 || charCode == 9) {
                return (true);
            }
        }
        catch (err) {
            alert("Exception: {FNUMERICCONTROL.keypress} " + err.message);
        }

        return (false);
    },

    isValidDigitPlaceForDecimalNumber: function (eleInput, iType) {
        var iDecimalPlaces = 0;
        var iDecimalPosition = 0;
        var arrDigits = null;
        var type = null;

        try {
            type = FNUMERICCONTROL.getTypeObject();
            iDecimalPosition = eleInput.value.indexOf(".");

            if ((iType == type.SignedDecimal || iType == type.UnsignedDecimal) && iDecimalPosition != -1) {
                if (FCommon.UI.isValidObject(eleInput.selectionStart) == true && FCommon.UI.isValidObject(eleInput.selectionEnd) == true) {
                    if (eleInput.selectionStart == eleInput.selectionEnd && eleInput.selectionStart <= iDecimalPosition) {
                        return (true);
                    }
                }

                iDecimalPlaces = FNUMERICCONTROL.getDecimalPlaces(eleInput);
                arrDigits = eleInput.value.split(".");
                if (arrDigits.length > 1 && arrDigits[1].length >= iDecimalPlaces) {
                    return (false);
                }
            }
        }
        catch (err) {
            alert("Exception: {FNUMERICCONTROL.isValidDigitPlaceForDecimalNumber} " + err.message);
        }

        return (true);
    },

    isValidCode: function (iType, charCode) {
        var bResult = false;
        var type = null;

        type = FNUMERICCONTROL.getTypeObject();
        if (charCode == 45) { // -
            if (iType == type.SignedInteger || iType == type.SignedDecimal) { // Signed Integer, Signed Decimal
                bResult = true;
            }
        }
        else if (charCode == 46) { // .
            if (iType == type.SignedDecimal || iType == type.UnsignedDecimal) {  // Signed Decimal, Unsingned Decimal
                bResult = true;
            }
        }
        else if (charCode >= 48 && charCode <= 57) { // 0 to 9)
            bResult = true;
        }

        return (bResult);
    },

    getDecimalPlaces: function (eleInput) {
        var value = 0;

        value = FConvert.toInt(FCommon.UI.getAttributeData(eleInput, "decimalplaces"));

        return (value);
    },

    onFocusCallback: function (eleInput) {
        return (FCommon.UI.getAttributeData(eleInput, "onfocus"));
    },

    onChangeCallback: function (eleInput) {
        return (FCommon.UI.getAttributeData(eleInput, "onchange"));
    },

    onLeaveCallback: function (eleInput) {
        return (FCommon.UI.getAttributeData(eleInput, "onleave"));
    },

    // Returns acceptable type number
    onGetInputType: function (eleInput) {
        return (FConvert.toInt(FCommon.UI.getAttributeData(eleInput, "type")));
    },

    // Returns number of max decimal places
    onGetDecimalPlaces: function(eleInput) {
        return (FConvert.toInt(FCommon.UI.getAttributeData(eleInput, "decimalplaces")));
    },

    setDecimalPlaces: function (eleInput, iDecimalPlaces) {
        var iType = 0;
        var bResult = false;
        var objType = null;

        try {
            iType = FNUMERICCONTROL.onGetInputType(eleInput);
            objType = FNUMERICCONTROL.getTypeObject();

            iDecimalPlaces = FConvert.toInt(iDecimalPlaces);
            if ((iType == objType.SignedDecimal || iType == objType.UnsignedDecimal) && iDecimalPlaces > 0) {
                FCommon.UI.setAttributeData(eleInput, "decimalplaces", iDecimalPlaces);
                bResult = true;
            }
        }
        catch (err) {
            alert("Exception: {FNUMERICCONTROL.setDecimalPlaces} " + err.message);
        }

        return (bResult);
    },

    getTypeObject: function (sText) {
        var obj = {};

        obj.SignedInteger = 0;
        obj.UnsignedInteger = 1;
        obj.SignedDecimal = 2;
        obj.UnsignedDecimal = 3;

        return (obj);
    }
};

var FTIMECONTROL = {
    PRIVATE: {
        onKeyDown: function (eleInput, event) {
            var iKey = 0;

            if (event.which) {
                iKey = event.which;
            }
            else if (event.keyCode) {
                iKey = event.keyCode;
            }
            else if (event.charCode) {
                iKey = event.charCode;
            }

            switch (iKey)
            {
                case 8: // Backspace
                    FCommon.UI.stopKeyProcess(event);
                    FTIMECONTROL.PRIVATE.processBackspace(eleInput, event);
                    break;
                case 9: // Tab
                    break;
                case 37: // Left Arrow
                    FCommon.UI.stopKeyProcess(event);
                    FTIMECONTROL.PRIVATE.processLeftArrow(eleInput, event);
                    break;
                case 39: // // Right Arrow
                    FCommon.UI.stopKeyProcess(event);
                    FTIMECONTROL.PRIVATE.processRightArrow(eleInput, event);
                    break;
                case 38: // Up Arrow
                    FCommon.UI.stopKeyProcess(event);
                    FTIMECONTROL.PRIVATE.processUpArrow(eleInput, event);
                    break;
                case 40: // Down Arrow
                    FCommon.UI.stopKeyProcess(event);
                    FTIMECONTROL.PRIVATE.processDownArrow(eleInput, event)
                    break;
                case 46: // Delete
                    FCommon.UI.stopKeyProcess(event);
                    FTIMECONTROL.PRIVATE.processDeleteKey(eleInput, event);
                    break;
                case 48: // 0
                case 49: // 1
                case 50: // 2
                case 51: // 3
                case 52: // 4
                case 53: // 5
                case 54: // 6
                case 55: // 7
                case 56: // 8
                case 57: // 9
                    FCommon.UI.stopKeyProcess(event);
                    FTIMECONTROL.PRIVATE.processDigitKey(eleInput, iKey, event);
                    break;
                case 96: // 0 
                case 97: // 1
                case 98: // 2
                case 99: // 3
                case 100: // 4
                case 101: // 5
                case 102: // 6
                case 103: // 7
                case 104: // 8
                case 105: // 9
                    FCommon.UI.stopKeyProcess(event);
                    iKey -= 48;
                    FTIMECONTROL.PRIVATE.processDigitKey(eleInput, iKey, event);
                    break;
                default:
                    FCommon.UI.stopKeyProcess(event);
                    console.log(iKey);
                    break;
            }
        },

        onMouseUp: function (eleInput, event) {
            var result = null;

            result = FTIMECONTROL.PRIVATE.getCursorBlock(eleInput);
            FCommon.UI.selectTextInInput(eleInput, result.iStart, result.iEnd);
        },

        onFocus: function (eleInput, event) {
            var sCallback = null;

            try {
                sCallback = FTIMECONTROL.PRIVATE.onFocusCallback(eleInput);
                if (FCommon.String.isNullOrEmpty(sCallback, true) == false) {
                    eval(sCallback)(eleInput, event);
                }
            }
            catch (err) {
                alert("Exception: {FTIMECONTROL.PRIVATE.onFocus} " + err.message);
            }
        },

        onDataChange: function (eleInput, event) {
            var sCallback = null;

            try {
                sCallback = FTIMECONTROL.PRIVATE.onDataChangeCallback(eleInput);
                if (FCommon.String.isNullOrEmpty(sCallback, true) == false) {
                    eval(sCallback)(eleInput, event);
                }
            }
            catch (err) {
                alert("Exception: {FTIMECONTROL.PRIVATE.onDataChange} " + err.message);
            }
        },

        onLeave: function (eleInput, event) {
            var sCallback = null;

            try {
                sCallback = FTIMECONTROL.PRIVATE.onLeaveCallback(eleInput);
                if (FCommon.String.isNullOrEmpty(sCallback, true) == false) {
                    eval(sCallback)(eleInput, event);
                }
            }
            catch (err) {
                alert("Exception: {FTIMECONTROL.PRIVATE.onLeave} " + err.message);
            }
        },

        processRightArrow: function (element, event) {
            var iStart = 0;
            var obj = null;
            obj = FTIMECONTROL.PRIVATE.getCursorBlock(element);

            if (obj.bMinute == true) {
                if (FTIMECONTROL.PRIVATE.isShowSecond(element) == true) {
                    FCommon.UI.selectTextInInput(element, obj.iStart + 3, obj.iEnd + 3);
                }
            }
            else if (obj.bHour == true) {
                FCommon.UI.selectTextInInput(element, obj.iStart + 3, obj.iEnd + 3);
            }

            //iStart = element.selectionStart;
            //if (iStart <= 7) {
            //    FCommon.UI.selectTextInInput(element, iStart + 1, iStart + 1);
            //}
        },

        processUpArrow: function (element, event) {
            var obj = null;
            var sOldValue = "";
            var sNewValue = "";
            var sValue = "";
            var iNewValue = 0;

            obj = FTIMECONTROL.PRIVATE.getCursorBlock(element);
            if (obj.iStart == -1 || obj.iEnd == -1) {
                return;
            }

            sValue = element.value.substr(obj.iStart, 2);
            iNewValue = parseInt(sValue);
            iNewValue++;
            if (obj.bHour == true) {
                if (iNewValue > 23) {
                    iNewValue = 0;
                }
            }
            else {
                if (iNewValue > 59) {
                    iNewValue = 0;
                }
            }

            sValue = "";

            sValue = FCommon.String.padding(iNewValue, "00");

            sOldValue = element.value;
            if (obj.bHour == true) {
                sNewValue = sValue + sOldValue.substr(obj.iEnd);
            }
            else if (obj.bMinute == true) {
                sNewValue = sOldValue.substr(0, 3);
                sNewValue += sValue;
                sNewValue += sOldValue.substr(obj.iEnd);
            }
            else if (obj.bSecond == true) {
                sNewValue = sOldValue.substr(0, obj.iStart);
                sNewValue += sValue;
            }

            element.value = sNewValue;

            FTIMECONTROL.PRIVATE.onDataChange(element, event);

            FCommon.UI.selectTextInInput(element, obj.iStart, obj.iEnd);
        },

        processDownArrow: function (element, event) {
            var obj = null;
            var sOldValue = "";
            var sNewValue = "";
            var sValue = "";
            var iNewValue = 0;

            obj = FTIMECONTROL.PRIVATE.getCursorBlock(element);
            if (obj.iStart == -1 || obj.iEnd == -1) {
                return;
            }

            sValue = element.value.substr(obj.iStart, 2);
            iNewValue = parseInt(sValue);
            //if (iNewValue == 0) {
            //    return;
            //}

            iNewValue--;
            if (obj.bHour == true) {
                if (iNewValue < 0) {
                    iNewValue = 23;

                }
            }
            else {
                if (iNewValue < 0) {
                    iNewValue = 59;
                }
            }

            sValue = FCommon.String.padding(iNewValue, "00");

            sOldValue = element.value;
            if (obj.bHour == true) {
                sNewValue = sValue + sOldValue.substr(obj.iEnd);
            }
            else if (obj.bMinute == true) {
                sNewValue = sOldValue.substr(0, 3);
                sNewValue += sValue;
                sNewValue += sOldValue.substr(obj.iEnd);
            }
            else if (obj.bSecond == true) {
                sNewValue = sOldValue.substr(0, obj.iStart);
                sNewValue += sValue;
            }

            element.value = sNewValue;

            FTIMECONTROL.PRIVATE.onDataChange(element, event);

            FCommon.UI.selectTextInInput(element, obj.iStart, obj.iEnd);
        },

        processLeftArrow: function (element, event) {
            var iStart = 0;
            var obj = null;
            obj = FTIMECONTROL.PRIVATE.getCursorBlock(element);

            if (obj.bHour == false) {
                FCommon.UI.selectTextInInput(element, obj.iStart - 3, obj.iEnd - 3);
            }


            //iStart = element.selectionStart;
            //if (iStart > 0) {
            //    FCommon.UI.selectTextInInput(element, iStart - 1, iStart - 1);
            //}
        },

        processBackspace: function (element, event) {
            var iStart = 0;
            var sOldValue = "";
            var sNewValue = "";
            var sChar = "";

            iStart = element.selectionStart;
            if (iStart < 1) {
                return;
            }

            sOldValue = element.value;
            sChar = sOldValue.substr(iStart - 1, 1);
            if (sChar.charCodeAt(0) >= 48 && sChar.charCodeAt(0) <= 57) {
                if ((iStart - 1) > 0) {
                    sNewValue = sOldValue.substr(0, iStart - 1);
                }

                sNewValue += "0";
                if (iStart < 8) {
                    sNewValue += sOldValue.substr(iStart);
                }

                element.value = sNewValue;

                if (sOldValue != sNewValue) {
                    FTIMECONTROL.PRIVATE.onDataChange(element, event);
                }
            }
            if (iStart == 4 || iStart == 7) {
                FCommon.UI.selectTextInInput(element, iStart - 1, iStart - 2);
                return;
            }

            FCommon.UI.selectTextInInput(element, iStart - 1, iStart - 1);
        },

        processDeleteKey: function (element, event) {
            var sOldValue = "";
            var sValue = "";
            var obj = null;

            try {
                obj = FTIMECONTROL.PRIVATE.getCursorBlock(element);
                if (obj.iStart != -1) {
                    sOldValue = element.value;
                    sValue = sOldValue;
                    sValue = FCommon.String.replaceAt(sValue, obj.iStart, "0");
                    sValue = FCommon.String.replaceAt(sValue, obj.iStart + 1, "0");
                    element.value = sValue;

                    if (sOldValue != sValue) {
                        FTIMECONTROL.PRIVATE.onDataChange(element, event);
                    }

                    FCommon.UI.selectTextInInput(element, obj.iStart, obj.iEnd);
                }
            }
            catch (err) {
                alert("Exception: {FTIMECONTROL.PRIVATE.processDeleteKey} " + err.message);
            }
        },

        processDigitKey: function (element, iKey, event) {
            var iStart = 0;
            var sOldValue = "";
            var sNewValue = "";
            var obj = null;

            iStart = element.selectionStart;
            if (iStart >= 8) {
                return;
            }

            sOldValue = element.value;
            sChar = sOldValue.substr(iStart, 1);
            if (sChar.charCodeAt(0) >= 48 && sChar.charCodeAt(0) <= 57) {
                if (iStart > 0) {
                    sNewValue = sOldValue.substr(0, iStart);
                }

                sNewValue += String.fromCharCode(iKey);
                if (iStart < 7) {
                    sNewValue += sOldValue.substr(iStart + 1);
                }

                obj = FTIMECONTROL.PRIVATE.getCursorBlock(element);
                if (obj.iStart != -1 && obj.iEnd != -1) {
                    sChar = sNewValue.substr(obj.iStart, 2);
                    if (obj.bHour == true && parseInt(sChar) > 23) {
                        return;
                    }
                    else if (obj.bMinute == true && parseInt(sChar) > 59) {
                        return;
                    }
                    else if (obj.bSecond == true && parseInt(sChar) > 59) {
                        return;
                    }
                }

                element.value = sNewValue;

                if (sOldValue != sNewValue) {
                    FTIMECONTROL.PRIVATE.onDataChange(element, event);
                }
            }
            if (iStart == 1 || iStart == 4) {
                FCommon.UI.selectTextInInput(element, iStart + 3, iStart + 2);
                return;
            }

            FCommon.UI.selectTextInInput(element, iStart + 1, iStart + 1);
        },

        onFocusCallback: function (eleInput) {
            return (FCommon.UI.getAttributeData(eleInput, "onfocus"));
        },

        onDataChangeCallback: function (eleInput) {
            return (FCommon.UI.getAttributeData(eleInput, "ondatachange"));
        },

        onLeaveCallback: function (eleInput) {
            return (FCommon.UI.getAttributeData(eleInput, "onleave"));
        },

        isShowSecond: function (id) {
            return (FConvert.toBoolean(FCommon.UI.getAttributeData(id, "showsecond")));
        },

        isPickCurrentTime: function (id) {
            return (FConvert.toBoolean(FCommon.UI.getAttributeData(id, "pickcurrenttime")));
        },

        getCursorBlock: function (eleInput) {
            var index = 0;
            var obj = {};
            obj.iStart = -1;
            obj.iEnd = -1;
            obj.bHour = false;
            obj.bMinute = false;
            obj.bSecond = false;

            index = eleInput.selectionStart;

            if (index >= 0 && index <= 2) {
                obj.bHour = true;
                obj.iStart = 0;
                obj.iEnd = 2;
            }
            else if (index >= 3 && index <= 5) {
                obj.bMinute = true;
                obj.iStart = 3;
                obj.iEnd = 5;
            }
            else if (index >= 6 && index <= 8) {
                obj.bSecond = true;
                obj.iStart = 6;
                obj.iEnd = 8;
            }

            return (obj);
        }
    },

    // {Public} Returns time control class name
    getClassName: function () {
        return ("FTimeInput");
    },

    convertTimePartIntoFocusTime: function (iHour, iMinute, iSecond) {
        var iValue = 0;

        try {
            iValue = (iHour << 16 | iMinute << 8 | iSecond);
        }
        catch (err) {
            alert("Exception: {FTIMECONTROL.convertTimePartIntoFocusTime} " + err.message);
        }

        return (iValue);
    },

    getHourFromFocusTime: function (iFocusTime) {
        var iValue = 0;

        iValue = (iFocusTime >> 16);

        return (iValue);
    },

    getMinuteFromFocusTime: function (iFocusTime) {
        var iValue = 0;

        iValue = ((iFocusTime & 0x00FF00) >> 8);

        return (iValue);
    },

    getSecondFromFocusTime: function (iFocusTime) {
        var iValue = 0;

        iValue = (iFocusTime & 0xFF);

        return (iValue);
    },

    getHour: function (id) {
        var sText = "";
        var iValue = 0;

        try {
            id = FCommon.UI.getValidElement(id);
            if (FCommon.UI.isValidObject(id) == true) {
                sText = id.value;
                if (sText.length >= 2) {
                    iValue = FConvert.toInt(FCommon.String.left(sText, 2));
                }
            }
        }
        catch (err) {
            alert("Exception: {FTIMECONTROL.getHour} " + err.message);
        }

        return (iValue);
    },

    getMinute: function (id) {
        var sText = "";
        var iValue = 0;

        try {
            id = FCommon.UI.getValidElement(id);
            if (FCommon.UI.isValidObject(id) == true) {
                sText = id.value;
                if (sText.length >= 5) {
                    iValue = FConvert.toInt(sText.substr(3, 2));
                }
            }
        }
        catch (err) {
            alert("Exception: {FTIMECONTROL.getMinute} " + err.message);
        }

        return (iValue);
    },

    getSecond: function (id) {
        var sText = "";
        var iValue = 0;

        try {
            id = FCommon.UI.getValidElement(id);
            if (FCommon.UI.isValidObject(id) == true) {
                sText = id.value;
                if (sText.length >= 8) {
                    iValue = FConvert.toInt(sText.substr(6, 2));
                }
            }
        }
        catch (err) {
            alert("Exception: {FTIMECONTROL.getSecond} " + err.message);
        }

        return (iValue);
    },

    getTime: function (id) {
        var iHour = 0;
        var iMinute = 0;
        var iSecond = 0;
        var iValue = 0;

        iHour = FTIMECONTROL.getHour(id);
        iMinute = FTIMECONTROL.getMinute(id);

        if (FTIMECONTROL.PRIVATE.isShowSecond(id) == true) {
            iSecond = FTIMECONTROL.getSecond(id);
        }

        iValue = FTIMECONTROL.convertTimePartIntoFocusTime(iHour, iMinute, iSecond);

        return (iValue);
    },

    getText: function (id) {
        var value = "";

        try {
            id = FCommon.UI.getValidElement(id);
            if (FCommon.UI.isValidObject(id) == true) {
                value = id.value;
            }
        }
        catch (err) {
            alert("Exception: {FTIMECONTROL.getText} " + err.message);
        }

        return (value);
    },

    setTime: function (id, iFocusTime) {
        var sText = "";

        id = FCommon.UI.getValidElement(id);
        if (FCommon.UI.isValidObject(id) == true) {
            sText = FTIMECONTROL.convertTimeIntoString(id, iFocusTime);
            id.value = sText;
        }
    },

    // Returns numeric time into string format
    convertTimeIntoString: function (id, iFocusTime) {
        var sText = "";
        var iHour = 0;
        var iMinute = 0;
        var iSecond = 0;

        id = FCommon.UI.getValidElement(id);
        if (FCommon.UI.isValidObject(id) == true) {
            iFocusTime = FConvert.toInt(iFocusTime);
            iHour = FTIMECONTROL.getHourFromFocusTime(iFocusTime);
            iMinute = FTIMECONTROL.getMinuteFromFocusTime(iFocusTime);
            iSecond = FTIMECONTROL.getSecondFromFocusTime(iFocusTime);

            sText = FCommon.String.padding(iHour, "00") + ":" + FCommon.String.padding(iMinute, "00");
            if (FTIMECONTROL.PRIVATE.isShowSecond(id) == true) {
                sText += ":" + FCommon.String.padding(iSecond, "00");
            }
        }

        return (sText);
    },

    clear: function (id, bPickCurrentTime) {
        var bShowSecond = false;
        var sValue = "";
        var dt = null;
        var arrTime = null;

        try {
            id = FCommon.UI.getValidElement(id);
            if (FCommon.UI.isValidObject(id) == true) {
                bShowSecond = FTIMECONTROL.PRIVATE.isShowSecond(id);
                bPickCurrentTime = FConvert.toBoolean(bPickCurrentTime);
                if (bPickCurrentTime == false) {
                    bPickCurrentTime = FTIMECONTROL.PRIVATE.isPickCurrentTime(id);
                }
                
                if (bPickCurrentTime == true) {
                    arrTime = FOCUSDATETIME.getTimeParts(FOCUSDATETIME.getCurrentTime());
                    sValue = FCommon.String.padding(arrTime[0], "00") + ":" + FCommon.String.padding(arrTime[1], "00");

                    if (bShowSecond == true) {
                        sValue += ":" + FCommon.String.padding(arrTime[2], "00");
                    }
                }
                else {
                    sValue = "00:00";
                    if (bShowSecond == true) {
                        sValue += ":" + FCommon.String.padding(0, "00");
                    }
                }

                id.value = sValue;
            }
        }
        catch (err) {
            alert("Exception: {FTIMECONTROL::clear} " + err.message);
        }
    },

    getParent: function (id) {
        var result = null;

        try {
            result = COMMON.prototype.getEmptyResultObject();
            result.lValue = 0;
            result.sValue = "";

            id = FCommon.UI.getValidElement(id);
            if (FCommon.UI.isValidObject(id) == false) {
                result.lValue = 0;
                result.sValue = "{FTIMECONTROL.getParent} Control id cannot be blank.";

                return (result);
            }

            result.data = id.parentElement;
            if (FCommon.UI.isValidObject(result.data) == false) {
                result.lValue = 0;
                result.sValue = "{FTIMECONTROL.getParent} Parent not found.";

                return (result);
            }

            result.lValue = 1;
        }
        catch (err) {
            result.lValue = -1;
            result.sValue = "{FTIMECONTROL.getParent} " + err.message;
            bResult = false;
        }

        return (result);
    },

    setParent: function (id, newParent) {
        var bResult = false;

        try {
            id = FCommon.UI.getValidElement(id);
            if (FCommon.UI.isValidObject(id) == false) {
                alert("Error: {FTIMECONTROL.setParent} Invalid control id.");
                return (false);
            }

            newParent = FCommon.UI.getValidElement(newParent)
            if (FCommon.UI.isValidObject(newParent) == false) {
                alert("Error: {FTIMECONTROL.setParent} Invalid new parent id.");
                return (false);
            }

            newParent.appendChild(id);
            id.focus();

            bResult = true;
        }
        catch (err) {
            alert("Exception: {FTIMECONTROL.setParent} " + err.message);
            bResult = false;
        }

        return (bResult);
    }
};

var FATTACHMENTCONTROL = {
    PRIVATE: {
        onKeydown: function(id, evt) {
            try {
                switch (evt.keyCode) {
                    case 8: // backspace
                    case 46: // Del Key
                        FCommon.UI.stopKeyProcess(evt);
                        break;
                    case 27: // Esc key
                        break;
                    case 37: // Left Arrow key
                        break;
                    case 38: // Up Arrow Key
                        break;
                    case 39: // Right Arrow Key
                        break;
                    case 40: // Down Arrow Key
                        break;
                    case 115: // F4
                        break;
                }
            }
            catch (err) {
                alert("Exception: {FATTACHMENTCONTROL.PRIVATE.onKeydown} " + err.message);
            }
        },

        onKeyPress: function (id, evt) {
            var charCode = 0;

            try {
                charCode = (evt.which) ? evt.which : evt.keyCode;
                if (charCode == 9) {
                    return (true);
                }
            }
            catch (err) {
                alert("Exception: {FATTACHMENTCONTROL.PRIVATE.onKeyPress} " + err.message);
            }

            return (false);
        },

        onFocus: function(id, event) {

        },

        onLeave: function (id, event) {
            var sCallback = "";

            try {
                FATTACHMENTCONTROL.PRIVATE.deletePopupMenu(id);

                sCallback = FATTACHMENTCONTROL.PRIVATE.getOnLeaveCallback(id);
                if (FCommon.String.isNullOrEmpty(sCallback, true) == false) {
                    eval(sCallback)(id, event);
                }
            }
            catch (err) {
                alert("Exception: {FATTACHMENTCONTROL.PRIVATE.onLeave} " + err.message);
            }
        },

        onHover: function (id, bEnter, event) {
        },

        onImage_Click: function(id, event) {
            try {
                id = FCommon.UI.getValidElement(id);
                if (id.disabled == true) {
                    return;
                }

                FCommon.UI.setFocus(id);
                FATTACHMENTCONTROL.PRIVATE.createAndDisplayPopupMenu(id);
            }
            catch (err) {
                alert("Exception: {FATTACHMENTCONTROL.PRIVATE.onImage_Click}" + err.message);
            }
        },

        getPopupContainerElement: function (id) {
            var elePopup = null;

            try {
                id = FCommon.UI.getValidElement(id);
                if (FCommon.UI.isValidObject(id) == true) {
                    elePopup = document.getElementById(id.id + "_container_popup");
                }
            }
            catch (err) {
                alert("Exception: {FATTACHMENTCONTROL.PRIVATE.getPopupContainerElement}" + err.message);
            }

            return (elePopup);
        },

        getFileInputElement: function(id) {
            var eleFile = null;

            try {
                id = FCommon.UI.getValidElement(id);
                if (FCommon.UI.isValidObject(id) == true) {
                    eleFile = document.getElementById(id.id + "_file");
                }
            }
            catch (err) {
                alert("Exception: {FATTACHMENTCONTROL.PRIVATE.getFileInputElement}" + err.message);
            }

            return (eleFile);
        },

        getDataElement: function(id) {
            var ele = null;

            try {
                id = FCommon.UI.getValidElement(id);
                if (FCommon.UI.isValidObject(id) == true) {
                    ele = document.getElementById(id.id + "_data");
                }
            }
            catch (err) {
                alert("Exception: {FATTACHMENTCONTROL.PRIVATE.getDataElement}" + err.message);
            }

            return (ele);
        },

        createAndDisplayPopupMenu: function (id) {
            var sContent = "";
            var elePopup = null;

            try {
                id = FCommon.UI.getValidElement(id);
                elePopup = FATTACHMENTCONTROL.PRIVATE.getPopupContainerElement(id);
                if (FCommon.UI.isValidObject(elePopup) == false) {
                    return;
                }

                FCommon.UI.removeChildren(elePopup);

                sContent = "<table>";
                sContent += "<tbody class='grid_row_menu' style='white-space: nowrap;'>";
                sContent += "<tr onclick='FATTACHMENTCONTROL.PRIVATE.onBrowseFile(" + id.id + ", true, event);' data-toggle='tooltip' title='Browse File'>";
                sContent += "<td><span class='icon-open icon-font8'></span></td>";
                sContent += "<td><div class='font-6'>&nbsp;&nbsp;Browse File</div></td>";
                sContent += "</tr>";
                sContent += "<tr onclick='FATTACHMENTCONTROL.PRIVATE.onClear(" + id.id + ", event);' data-toggle='tooltip' title='Clear Attachment'>";
                sContent += "<td><span class='icon-clear icon-font8'></span></td>";
                sContent += "<td><div class='font-6'>&nbsp;&nbsp;Delete File</div></td>";
                sContent += "<tr onclick='FATTACHMENTCONTROL.PRIVATE.onSave(" + id.id + ", event);' data-toggle='tooltip' title='Save File'>";
                sContent += "<td><span class='icon-save icon-font8'></span></td>";
                sContent += "<td><div class='font-6'>&nbsp;&nbsp;Save File</div></td>";
                sContent += "</tr>";

                sContent += "</tr>";
                sContent += "</tbody>";
                sContent += "</table>";

                $(elePopup).popover({
                    type: "tooltip",
                    trigger: "focus",
                    container: 'body',
                    placement: FCommon.UI.getElementStyleValue(id, "direction").toLowerCase() == "rtl" ? "left" : "right",
                    html: true,
                    content: sContent
                });

                $(elePopup).popover('toggle');
            }
            catch (err) {
                alert("Exception: {FATTACHMENTCONTROL.PRIVATE.createAndDisplayPopupMenu}" + err.message);
            }
        },

        deletePopupMenu: function(id) {
            var elePopup = "";

            try {
                elePopup = FATTACHMENTCONTROL.PRIVATE.getPopupContainerElement(id);
                if (FCommon.UI.isValidObject(elePopup) == false) {
                    return;
                }

                $(elePopup).popover('destroy');
                FCommon.UI.removeChildren(elePopup);
            }
            catch (err) {
                alert("Exception: {FATTACHMENTCONTROL.PRIVATE.deletePopupMenu}" + err.message);
            }
        },

        onBrowseFile: function (id, bFromMenu, event) {
            var sAccept = "";
            var sCallback = "";
            var bResult = true;
            var input = null;

            try {
                input = FATTACHMENTCONTROL.PRIVATE.getFileInputElement(id);
                if (FCommon.UI.isValidObject(id) == true && bFromMenu == false) { // Called from onchange of filetype
                    if (event.target.files.length > 0) {
                        sCallback = FATTACHMENTCONTROL.PRIVATE.getOnFileSelectCallback(id);
                        if(FCommon.String.isNullOrEmpty(sCallback, true) == false) {
                            bResult = eval(sCallback)(FCommon.UI.getValidElement(id), event.target.files[0], event);
                        }

                        if (FCommon.UI.isValidObject(bResult) == false || FConvert.toBoolean(bResult) == true) {
                            FATTACHMENTCONTROL.PRIVATE.setFileData(id, event.target.files[0]);
                        }
                        else {
                            FATTACHMENTCONTROL.clear(id);
                        }
                    }
                    
                    return;
                }

                input = FATTACHMENTCONTROL.PRIVATE.getFileInputElement(id);

                sAccept = FATTACHMENTCONTROL.PRIVATE.getAccept(id);
                if (FCommon.String.isNullOrEmpty(sAccept, true) == false) {
                    input.accept = sAccept;
                }

                $(input).trigger('click'); // opening dialog
            }
            catch (err) {
                alert("Exception: {FATTACHMENTCONTROL.PRIVATE.onBrowseFile} " + err.message);
            }
        },

        onClear: function (id, event) {
            FATTACHMENTCONTROL.setData(id, null, null, false);
        },

        onSave: function (id, event) {
            var result = null;

            try {
                result = FATTACHMENTCONTROL.getData(id);
                if (result.lValue < 1) {
                    return;
                }

                FATTACHMENTCONTROL.PRIVATE.download(result.data.sFileName, result.data.sType, result.data.data);
            }
            catch (err) {
                alert("Exception: {FATTACHMENTCONTROL.PRIVATE.onSave} " + err.message);
            }
        },

        setFileData: function (id, file) {
            var reader = null;
            var arrBinary = null;

            try {
                if (FCommon.UI.isValidObject(file) == true) {
                    reader = new FileReader();
                    reader.onload = function () {
                        arrBinary = new Uint8Array(reader.result);

                        FATTACHMENTCONTROL.clear(id);
                        FATTACHMENTCONTROL.setData(id, file.name, file.type, arrBinary, false);
                    };
                    reader.readAsArrayBuffer(file);
                }
            }
            catch (err) {
                alert("Exception: {FATTACHMENTCONTROL.PRIVATE.setFileData} " + err.message);
            }
        },

        download: function (sFileName, sType, data) {
            var a = null;
            var file = null;

            try {
                a = document.createElement("a");
                //file = new Blob([new Uint8Array(data)], { type: sType });
                file = new Blob([data], { type: sType });
                a.href = URL.createObjectURL(file);
                a.download = sFileName;
                document.body.appendChild(a);
                a.click();
                setTimeout(function () {
                    document.body.removeChild(a);
                    //window.URL.revokeObjectURL(url);
                }, 0);
            }
            catch (err) {
                alert("Exception: {FATTACHMENTCONTROL.PRIVATE.download} " + err.message);
            }
        },

        // Returns onfocus callback method name
        getOnFocusCallback: function (id) {
            var sValue = "";

            try {
                sValue = FCommon.UI.getAttributeData(id, "onfocus");
            }
            catch (err) {
                err.message = "Exception: {FATTACHMENTCONTROL.PRIVATE.getOnFocusCallback} " + err.message;
            }

            return (sValue);
        },

        // Returns onleave callback method name
        getOnLeaveCallback: function (id) {
            var sValue = "";

            try {
                sValue = FCommon.UI.getAttributeData(id, "onleave");
            }
            catch (err) {
                alert("Exception: {FATTACHMENTCONTROL.PRIVATE.getOnLeaveCallback} " + err.message);
            }

            return (sValue);
        },

        // Returns onSelect callback method name
        getOnFileSelectCallback: function(id) {
            var sValue = "";

            try {
                sValue = FCommon.UI.getAttributeData(id, "onfileselect");
            }
            catch (err) {
                alert("Exception: {FATTACHMENTCONTROL.PRIVATE.getOnFileSelectCallback} " + err.message);
            }

            return (sValue);
        },

        // Returns attach string for input file filter
        getAccept: function (id) {
            var sValue = "";

            try {
                sValue = FCommon.UI.getAttributeData(id, "accept");
            }
            catch (err) {
                err.message = "Exception: {FATTACHMENTCONTROL.PRIVATE.getAccept} " + err.message;
            }

            return (sValue);
        }
    },

    // Returns attachment control class name
    getClassName: function () {
        return ("FAttachment");
    },

    setData: function(id, sFileName, sType, data, bDoNotConvertData) {
        var eleData = null;
        var eleFile = null;

        try {
            eleData = FATTACHMENTCONTROL.PRIVATE.getDataElement(id);
            if (FCommon.UI.isValidObject(eleData) == true) {
                if (FCommon.UI.isValidObject(data) == true) {
                    FCommon.UI.setAttributeData(eleData, "filename", sFileName);
                    FCommon.UI.setAttributeData(eleData, "type", sType);

                    bDoNotConvertData = FConvert.toBoolean(bDoNotConvertData);
                    if (bDoNotConvertData == true) {
                        eleData.value = data;
                    }
                    else {
                        //eleData.value = btoa(data);
                        eleData.value = data.toString();
                        //eleData.value = btoa(unescape(encodeURIComponent(data)));
                    }
                    
                    FCommon.UI.setText(id, sFileName);
                }
                else {
                    FCommon.UI.setAttributeData(eleData, "filename", "");
                    eleData.value = "";
                    FCommon.UI.setText(id, "");

                    eleFile = FATTACHMENTCONTROL.PRIVATE.getFileInputElement(id);
                    if (FCommon.UI.isValidObject(eleFile) == true) {
                        eleFile.value = "";
                    }
                }                
            }
        }
        catch(err) {
            alert("Exception: {FATTACHMENTCONTROL.setData} " + err.message);
        }
    },

    getData: function (id) {
        var eleData = null;
        var result = null;
        var data = null;

        try {
            result = COMMON.prototype.getEmptyResultObject();
            result.lValue = 0;
            result.sValue = "";
            result.data = null;

            id = FCommon.UI.getValidElement(id);
            if (FCommon.UI.isValidObject(id) == false) {
                result.sValue = "Invalid control id.";

                return (result);
            }

            eleData = FATTACHMENTCONTROL.PRIVATE.getDataElement(id);
            if (FCommon.UI.isValidObject(eleData) == false) {
                result.sValue = "Control data corrupted.";

                return (result);
            }

            result.data = {};
            result.data.sFileName = FCommon.UI.getAttributeData(eleData, "filename");
            result.data.sType = FCommon.UI.getAttributeData(eleData, "type");
            if (FCommon.String.isNullOrEmpty(result.data.sType) == true) {
                //result.data.sType = "text/plain";
                result.data.sType = "application/octet-stream";
            }

            result.data.data = [];
            result.data.sData = eleData.value;

            data = eleData.value.split(",");
            if (data.length > 1) {
                result.data.data = new Uint8Array(data.map(Number));
            }

            result.lValue = result.data.data.length;
        }
        catch (err) {
            result.lValue = -1;
            result.sValue = err.message;
            alert("Exception: {FATTACHMENTCONTROL.getData} " + err.message);
        }

        return (result);
    },

    disableControl: function (id, bDisable) {
        try {
            id = FCommon.UI.getValidElement(id);
            if (FCommon.UI.isValidObject(id) == false) {
                return;
            }

            bDisable = FConvert.toBoolean(bDisable);
            id.disabled = bDisable;
            id.parentElement.nextElementSibling.style.pointerEvents = bDisable == true ? "none" : "";
            //id.parentElement.nextElementSibling.style.cursor = bDisable == true ? "" : "pointer";
        }
        catch (err) {
            alert("Exception: {FATTACHMENTCONTROL.disableControl} " + err.message);
        }
    },

    clear: function (id) {
        FATTACHMENTCONTROL.setData(id, null, null);
    },

    setParent: function (ctrl, newParent, bFocus) {
        var bResult = false;
        var child = null;

        try {
            ctrl = FCommon.UI.getValidElement(ctrl);
            if (FCommon.UI.isValidObject(ctrl) == false) {
                alert("Error: {FATTACHMENTCONTROL.setParent} Control id cannot be blank");
                return (false);
            }

            if (FCommon.UI.isValidObject(newParent) == false) {
                alert("Error: {FATTACHMENTCONTROL.setParent} New parent object required");
                return (false);
            }

            newParent = FCommon.UI.getValidElement(newParent)
            if (FCommon.UI.isValidObject(newParent) == false) {
                alert("Error: {FATTACHMENTCONTROL.setParent} New parent id cannot be blank");
                return (false);
            }

            child = document.getElementById(ctrl.id + "_container");
            if (FCommon.UI.isValidObject(child) == true) {
                newParent.appendChild(child);
            }

            bFocus = FConvert.toBoolean(bFocus);
            if (ctrl.getBoundingClientRect().left != 0 && bFocus == true) {
                ctrl.focus();
            }

            bResult = true;
        }
        catch (err) {
            alert("Exception: {FATTACHMENTCONTROL.setParent} " + newParent.id + ", " + err.message);
            bResult = false;
        }

        return (bResult);
    }
};

var FPAGECONTROL = {
    PRIVATE: {
        onNavigation_Click: function (ele, bNext, event) {
            var sHandler = "";
            var iCurrent = 0;
            var iSelectedPage = 0;
            var iMax = 0;
            var obj = null;

            try {
                iMax = FPAGECONTROL.getTotalPages(ele);
                if (iMax < 1) {
                    return;
                }

                iSelectedPage = FPAGECONTROL.getSelectedPage(ele);
                if((bNext == true && iSelectedPage >= iMax) || (bNext == false && iSelectedPage <= 1)) {
                    return;
                }

                sHandler = FPAGECONTROL.PRIVATE.getPageChangeHandler(ele);
                if (bNext == true) {
                    iSelectedPage++;
                }
                else if (bNext == false) {
                    iSelectedPage--;
                }

                FPAGECONTROL.PRIVATE.setSelectedPage(ele, iSelectedPage);

                if (FCommon.String.isNullOrEmpty(sHandler, true) == false) {
                    obj = {};
                    obj.bNext = bNext;
                    obj.iCurrentPage = iSelectedPage;

                    eval(sHandler)(obj, event);
                }
            }
            catch (err) {
                alert("Exception: {FPAGECONTROL.PRIVATE.onNavigation_Click} " + err.message);
            }
        },

        getPageChangeHandler: function (id) {
            var sValue = "";

            try {
                id = FCommon.UI.getValidElement(id);
                if (FCommon.UI.isValidObject(id) == true) {
                    sValue = FCommon.UI.getAttributeData(id, "pagechangehandler");
                }
            }
            catch (err) {
                alert("Exception: {FPAGECONTROL.getPageChangeHandler} " + err.message);
            }

            return (sValue);
        },

        setSelectedPage: function (id, iPage) {
            var iTotalPages = 0;

            try {
                id = FCommon.UI.getValidElement(id);
                if (FCommon.UI.isValidObject(id) == false) {
                    return;
                }

                iTotalPages = FPAGECONTROL.getTotalPages(id);
                if (iTotalPages < 1) {
                    return;
                }

                iPage = FConvert.toInt(iPage);
                if (iPage < 1) {
                    return;
                }

                if (iPage > iTotalPages) {
                    return;
                }

                FCommon.UI.setAttributeData(id, "currentpage", iPage);
                id.value = iPage;
            }
            catch (err) {
                alert("Exception: {FPAGECONTROL.PRIVATE.setSelectedPage} " + err.message);
            }
        }
    },

    getTotalPages: function (id) {
        var iValue = 0;
        try {
            id = FCommon.UI.getValidElement(id);
            if (FCommon.UI.isValidObject(id) == true) {
                iValue = FConvert.toInt(FCommon.UI.getAttributeData(id, "totalpages"));
            }
        }
        catch (err) {
            alert("Exception: {FPAGECONTROL.getTotalPages} " + err.message);
        }
        if (iValue < 1) {
            iValue = 1;
        }

        return (iValue);
    },

    setTotalPages: function(id, iTotalPages) {
        try {
            iTotalPages = FConvert.toInt(iTotalPages);
            if (iTotalPages < 1) {
                iTotalPages = 1;
            }

            id = FCommon.UI.getValidElement(id);
            if (FCommon.UI.isValidObject(id) == true) {
                FCommon.UI.setAttributeData(id, "totalpages", iTotalPages);
            }
        }
        catch (err) {
            alert("Exception: {FPAGECONTROL.setTotalPages} " + err.message);
        }
    },

    getSelectedPage: function (id) {
        var iTotalPages = 0;
        var iPage = 0;

        try {
            id = FCommon.UI.getValidElement(id);
            if (FCommon.UI.isValidObject(id) == false) {
                return (0);
            }

            iPage = FConvert.toInt(FCommon.UI.getAttributeData(id, "currentpage"));
        }
        catch (err) {
            alert("Exception: {FPAGECONTROL.getSelectedPage} " + err.message);
        }

        return (iPage);
    },

    reset: function (id, iTotalPages) {
        try {
            FPAGECONTROL.setTotalPages(id, FConvert.toInt(iTotalPages));
            FPAGECONTROL.PRIVATE.setSelectedPage(id, iTotalPages);
        }
        catch (err) {
            alert("Exception: {FPAGECONTROL.reset} " + err.message);
        }
    }
};

//var FLAT_SCROLLBAR = {
//    init: function (w, d) {

//        var raf = w.requestAnimationFrame || w.setImmediate || function (c) { return setTimeout(c, 0); };

//        function initEl(el) {
//            if (el.hasOwnProperty('data-simple-scrollbar')) return;
//            Object.defineProperty(el, 'data-simple-scrollbar', new SimpleScrollbar(el));
//        }

//        // Mouse drag handler
//        function dragDealer(el, context) {
//            var lastPageY;

//            el.addEventListener('mousedown', function (e) {
//                lastPageY = e.pageY;
//                el.classList.add('ss-grabbed');
//                d.body.classList.add('ss-grabbed');

//                d.addEventListener('mousemove', drag);
//                d.addEventListener('mouseup', stop);

//                return false;
//            });

//            function drag(e) {
//                var delta = e.pageY - lastPageY;
//                lastPageY = e.pageY;

//                raf(function () {
//                    context.el.scrollTop += delta / context.scrollRatio;
//                });
//            }

//            function stop() {
//                el.classList.remove('ss-grabbed');
//                d.body.classList.remove('ss-grabbed');
//                d.removeEventListener('mousemove', drag);
//                d.removeEventListener('mouseup', stop);
//            }
//        }

//        // Constructor
//        function ss(el) {
//            this.target = el;
//            this.bar = '<div class="ss-scroll">';

//            this.wrapper = d.createElement('div');
//            this.wrapper.setAttribute('class', 'ss-wrapper');

//            this.el = d.createElement('div');
//            this.el.setAttribute('class', 'ss-content');

//            this.wrapper.appendChild(this.el);

//            while (this.target.firstChild) {
//                this.el.appendChild(this.target.firstChild);
//            }
//            this.target.appendChild(this.wrapper);

//            this.target.insertAdjacentHTML('beforeend', this.bar);
//            this.bar = this.target.lastChild;

//            dragDealer(this.bar, this);
//            this.moveBar();

//            this.el.addEventListener('scroll', this.moveBar.bind(this));
//            this.el.addEventListener('mouseenter', this.moveBar.bind(this));

//            this.target.classList.add('ss-container');
//        }

//        ss.prototype = {
//            moveBar: function (e) {
//                var totalHeight = this.el.scrollHeight,
//                    ownHeight = this.el.clientHeight,
//                    _this = this;

//                this.scrollRatio = ownHeight / totalHeight;

//                raf(function () {
//                    // Hide scrollbar if no scrolling is possible
//                    if (_this.scrollRatio === 1) {
//                        _this.bar.classList.add('ss-hidden')
//                    } else {
//                        _this.bar.classList.remove('ss-hidden')
//                        _this.bar.style.cssText = 'height:' + (_this.scrollRatio) * 100 + '%; top:' + (_this.el.scrollTop / totalHeight) * 100 + '%;right:-' + (_this.target.clientWidth - _this.bar.clientWidth) + 'px;';
//                    }
//                });
//            }
//        }

//        //function initAll() {
//        //    var nodes = d.querySelectorAll('*[ss-container]');
//        //    for (var i = 0; i < nodes.length; i++) {
//        //        initEl(nodes[i]);
//        //    }
//        //}

//        //d.addEventListener('DOMContentLoaded', initAll);
//        ss.initEl = initEl;
//        //ss.initAll = initAll;

//        w.SimpleScrollbar = ss;
//    }
//};
