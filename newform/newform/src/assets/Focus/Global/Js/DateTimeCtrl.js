
var DATETIMEPICKER = {

    //var DatePickerHidden = true;
    //var DatePickerFormat = "";
    //var txtDisplay = "";
    //var lblMonth = "";
    //var lblYear = "";
    //var ddlMonth = "";
    //var ddlYear = "";
    //var divDateTimePicker = "";
    //var divDates = "";

    AllDateFormats: function () {
        debugger;
        var DateFormats = ["dd/mm/yyyy", "DD/MM/YYYY", "dd-mm-yyyy", "DD-MM-YYYY", "mm/dd/yyyy", "MM/DD/YYYY", "mm-dd-yyyy", "MM-DD-YYYY", "yyyy/mm/dd", "YYYY/MM/DD", "yyyy-mm-dd", "YYYY-MM-DD", "YYYY/DD/MM", "yyyy/dd/mm", "YYYY-DD-MM", "yyyy-dd-mm"];
        return DateFormats;
    },


    bindDdlYear: function (ddlYearCtrl) {
        debugger;
        var dynamicYearOption = "<Option value=0>Select</Option>";
        for (y = 1900; y <= 2100; y++) {
            dynamicYearOption = dynamicYearOption + '<Option value=' + y + '>' + y.toString() + '</Option>';
        }
        ddlYearCtrl.innerHTML = dynamicYearOption;
    },

    GetAccordingToDateFormat: function (requestedDateFormat, date, month, year, hour, min, sec) {
        debugger;

        var DateFormats = DATETIMEPICKER.AllDateFormats();
        var type = 0;
        for (i = 0; i < DateFormats.length; i++) {
            if (requestedDateFormat == DateFormats[i]) {
                type = i;
            }
        }
        switch (type) {
            case 0:
            case 1:
                return DATETIMEPICKER.ConvertTwoDigit(date) + '/' + DATETIMEPICKER.ConvertTwoDigit(month) + '/' + year + ' ' + DATETIMEPICKER.ConvertTwoDigit(hour) + ':' + DATETIMEPICKER.ConvertTwoDigit(min) + ':' + DATETIMEPICKER.ConvertTwoDigit(sec);
            case 2:
            case 3:
                return DATETIMEPICKER.ConvertTwoDigit(date) + '-' + DATETIMEPICKER.ConvertTwoDigit(month) + '-' + year + ' ' + DATETIMEPICKER.ConvertTwoDigit(hour) + ':' + DATETIMEPICKER.ConvertTwoDigit(min) + ':' + DATETIMEPICKER.ConvertTwoDigit(sec);
            case 4:
            case 5:
                return DATETIMEPICKER.ConvertTwoDigit(month) + '/' + DATETIMEPICKER.ConvertTwoDigit(date) + '/' + year + ' ' + DATETIMEPICKER.ConvertTwoDigit(hour) + ':' + DATETIMEPICKER.ConvertTwoDigit(min) + ':' + DATETIMEPICKER.ConvertTwoDigit(sec);
            case 6:
            case 7:
                return DATETIMEPICKER.ConvertTwoDigit(month) + '-' + DATETIMEPICKER.ConvertTwoDigit(date) + '-' + year + ' ' + DATETIMEPICKER.ConvertTwoDigit(hour) + ':' + DATETIMEPICKER.ConvertTwoDigit(min) + ':' + DATETIMEPICKER.ConvertTwoDigit(sec);
            case 8:
            case 9:
                return year + '/' + DATETIMEPICKER.ConvertTwoDigit(month) + '/' + DATETIMEPICKER.ConvertTwoDigit(date) + ' ' + DATETIMEPICKER.ConvertTwoDigit(hour) + ':' + DATETIMEPICKER.ConvertTwoDigit(min) + ':' + DATETIMEPICKER.ConvertTwoDigit(sec);
            case 10:
            case 11:
                return year + '-' + DATETIMEPICKER.ConvertTwoDigit(month) + '-' + DATETIMEPICKER.ConvertTwoDigit(date) + ' ' + DATETIMEPICKER.ConvertTwoDigit(hour) + ':' + DATETIMEPICKER.ConvertTwoDigit(min) + ':' + DATETIMEPICKER.ConvertTwoDigit(sec);
            case 12:
            case 13:
                return year + '/' + DATETIMEPICKER.ConvertTwoDigit(date) + '/' + DATETIMEPICKER.ConvertTwoDigit(month) + ' ' + DATETIMEPICKER.ConvertTwoDigit(hour) + ':' + DATETIMEPICKER.ConvertTwoDigit(min) + ':' + DATETIMEPICKER.ConvertTwoDigit(sec);
            case 14:
            case 15:
                return year + '-' + DATETIMEPICKER.ConvertTwoDigit(date) + '-' + DATETIMEPICKER.ConvertTwoDigit(month) + ' ' + DATETIMEPICKER.ConvertTwoDigit(hour) + ':' + DATETIMEPICKER.ConvertTwoDigit(min) + ':' + DATETIMEPICKER.ConvertTwoDigit(sec);
            default:
                return DATETIMEPICKER.ConvertTwoDigit(date) + '/' + DATETIMEPICKER.ConvertTwoDigit(month) + '/' + year + ' ' + DATETIMEPICKER.ConvertTwoDigit(hour) + ':' + DATETIMEPICKER.ConvertTwoDigit(min) + ':' + DATETIMEPICKER.ConvertTwoDigit(sec);
        }

    },


    CurrentYear: function () {
        debugger;
        var TodayDate = new Date();
        return TodayDate.getFullYear();
    },

    CurrentMonth: function () {
        debugger;
        var TodayDate = new Date();
        return TodayDate.getMonth() + 1;
    },

    CurrentDate: function () {
        debugger;
        var TodayDate = new Date();
        return TodayDate.getDate();
    },

    CurrentHour: function () {
        debugger;
        var TodayDate = new Date();
        return TodayDate.getHours();
    },

    CurrentMinute: function () {
        debugger;
        var TodayDate = new Date();
        return TodayDate.getMinutes();
    },

    CurrentSecond: function () {

        var TodayDate = new Date();
        return TodayDate.getSeconds();
    },

    ConvertTwoDigit: function (inputnumber) {
        debugger;
        if (inputnumber < 10) {
            return '0' + inputnumber;
        }
        else {
            return inputnumber.toString();
        }
    },

    show: function () {
        alert("show");
    },

    datePickerShow: function (RequestedDateFormat, RequestedWidth, RequestedCalendarType, txtDisplayCtrl, lblMonthCtrl, lblYearCtrl, ddlMonthCtrl, ddlYearCtrl, dateTimePickerDiv, daterowDiv) {
        debugger;
        var DatePickerHidden = true;
        //txtDisplay = txtDisplayCtrl;
        //lblMonth = lblMonthCtrl;
        //lblYear = lblYearCtrl;
        //ddlMonth = ddlMonthCtrl;
        ////ddlYear = ddlYearCtrl;
        //divDateTimePicker = dateTimePickerDiv;
        ////divDates = daterowDiv;
        //DatePickerFormat = RequestedDateFormat;
        ////divstyle.width = RequestedWidth + "px";

        if (DatePickerHidden == true) {
            DatePickerHidden = false;
        }
        else {
            DatePickerHidden = true;
        }
        dateTimePickerDiv.hidden = DatePickerHidden;
        DATETIMEPICKER.bindDdlYear(ddlYearCtrl);
        var currentMonth = DATETIMEPICKER.CurrentMonth();
        var currentYear = DATETIMEPICKER.CurrentYear();
        var dropdownMonth = ddlMonth;
        var dropdownYear = ddlYearCtrl;
        var currentMonthFirstDateString = currentMonth.toString() + '/01/' + currentYear.toString();
        dropdownMonth.value = currentMonth;
        dropdownYear.value = currentYear;
        lblMonth.innerHTML = dropdownMonth.options[dropdownMonth.selectedIndex].text;
        lblYear.innerHTML = dropdownYear.options[dropdownYear.selectedIndex].text;
        DATETIMEPICKER.bindCalender(currentMonthFirstDateString, daterowDiv);
    },

    setDATE: function (id, sDate) {
        document.getElementById(id).value = sDate;
    },

    getDate: function (id) {
        return document.getElementById(id).value;
    },

    onChange: function (element) {
        var sHandler = "";
       // var controlele = document.getElementById("id_testdtpkr");
        debugger
        try{
            sHandler = element.getAttribute("data-ondatachange");
            if (sHandler != null || "") {
                eval(sHandler)(controlele);
            }
        }
        catch (err) {
            err.message = "Exception:{DATETIMEPICKER.onChange}" + err.message;
        }
    },

    bindCalender: function (selectedMonth, daterowDiv) {
        var currentMonthFirstDateString = selectedMonth;
        var searchMonth = new Date(currentMonthFirstDateString).getMonth() + 1;
        var searchYear = new Date(currentMonthFirstDateString).getFullYear();
        var firstDate = new Date(currentMonthFirstDateString);
        var SetDay = firstDate.getDay();
        var MonthDateCount = DATETIMEPICKER.getMonthDayCount(searchMonth, searchYear);
        var count = 1;
        var dyanamicdiv = "";
        var datediv = daterowDiv;
        for (i = 0; i <= 5; i++) {
            dyanamicdiv = dyanamicdiv + '<div id=daterow>'
            for (j = 0; j <= 6; j++) {
                if (count <= MonthDateCount) {
                    dyanamicdiv = dyanamicdiv + '<div id=divDate>';
                    if (j < SetDay && i == 0) {
                        dyanamicdiv = dyanamicdiv + '<input type=button class=button1 disabled=true id=' + '--' + ' value=-->';
                    }
                    else if (j >= SetDay && i == 0) {
                        dyanamicdiv = dyanamicdiv + '<input type=button class=button1 id=' + count.toString() + ' value=' + count.toString() + ' onclick=DATETIMEPICKER.onDateClick(' + count + ',this.parentElement.parentElement.parentElement.parentElement.children[1].children[0].children[0],this.parentElement.parentElement.parentElement.parentElement.children[1].children[1].children[0],this.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].children[0].children[0],this.parentElement.parentElement.parentElement.parentElement)>';
                        count = count + 1;
                    }
                    else if (i > 0) {
                        dyanamicdiv = dyanamicdiv + '<input type=button class=button1 id=' + count.toString() + ' value=' + count.toString() + ' onclick=DATETIMEPICKER.onDateClick(' + count + ',this.parentElement.parentElement.parentElement.parentElement.children[1].children[0].children[0],this.parentElement.parentElement.parentElement.parentElement.children[1].children[1].children[0],this.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].children[0].children[0],this.parentElement.parentElement.parentElement.parentElement)>';
                        count = count + 1;
                    }
                    dyanamicdiv = dyanamicdiv + '</div>';

                }
                else {
                    dyanamicdiv = dyanamicdiv + '<div id=divDate><input type=button class=button1 disabled=true id=' + '--' + ' value=--></div>';
                }

            }
            dyanamicdiv = dyanamicdiv + '</div>';
            //dyanamicdiv = dyanamicdiv + '<br//>';
        }
        datediv.innerHTML = dyanamicdiv;
    },

    getMonthDayCount: function (month, year) {
        debugger;
        if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
            return 31;
        }
        else if (month == 4 || month == 6 || month == 9 || month == 11) {
            return 30;
        }
        else if (month == 2) {
            if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
                return 29;
            }
            else {
                return 28;
            }
        }
    },

    onDdlMonthAndYearChange: function (ddlMonthCtrl, ddlYearCtrl, lblMonthCtrl, lblYearCtrl, daterowDiv) {
        debugger;
        var selectedMonthYear = "";
        var dropdownMonth = ddlMonthCtrl;
        var dropdownYear = ddlYearCtrl;
        lblMonthCtrl.innerHTML = dropdownMonth.options[dropdownMonth.selectedIndex].text;
        lblYearCtrl.innerHTML = dropdownYear.options[dropdownYear.selectedIndex].text;
        selectedMonthYear = (dropdownMonth.options[dropdownMonth.selectedIndex].value).toString() + '/01/' + (dropdownYear.options[dropdownYear.selectedIndex].value).toString();
        DATETIMEPICKER.bindCalender(selectedMonthYear, daterowDiv);
    },

    ArrowChange: function (incrementDecrementValue, ddlMonthCtrl, ddlYearCtrl, lblMonthCtrl, lblYearCtrl, daterowDiv) {
        debugger;
        var selectedMonthYear = "";
        var dropdownMonth = ddlMonthCtrl;
        var dropdownYear = ddlYearCtrl;
        var newMonth = parseInt(dropdownMonth.value) + parseInt(incrementDecrementValue);
        var newYear = parseInt(dropdownYear.value);
        if (newMonth == 0) {
            newMonth = 12;
            newYear = newYear - 1;
        }
        else if (newMonth == 13) {
            newMonth = 1;
            newYear = newYear + 1;
        }
        dropdownMonth.value = newMonth;
        dropdownYear.value = newYear;
        selectedMonthYear = (dropdownMonth.options[dropdownMonth.selectedIndex].value).toString() + '/01/' + (dropdownYear.options[dropdownYear.selectedIndex].value).toString();
        DATETIMEPICKER.bindCalender(selectedMonthYear, daterowDiv);
        lblMonthCtrl.innerHTML = dropdownMonth.options[dropdownMonth.selectedIndex].text;
        lblYearCtrl.innerHTML = dropdownYear.options[dropdownYear.selectedIndex].text;

    },
    onDateClick: function (date, ddlMonthCtrl, ddlYearCtrl, txtDisplay, dateTimePickerDiv) {
        debugger;
        var dropdownMonth = ddlMonthCtrl;
        var dropdownYear = ddlYearCtrl;
        var requestedDateFormat = 'dd/mm/yyyy';
        debugger
        switch (parseInt(document.getElementById("id_testdtpkr").dataset.format)) {
            case 0:
                requestedDateFormat = 'dd/mm/yyyy';
                break;
            case 1:
                requestedDateFormat = 'mm/dd/yyyy';
                break;
            case 2:
                requestedDateFormat = 'yyyy/mm/dd';
                break;
        }
        var TextBoxValue = DATETIMEPICKER.GetAccordingToDateFormat(requestedDateFormat, date, dropdownMonth.value, dropdownYear.value, DATETIMEPICKER.CurrentHour(), DATETIMEPICKER.CurrentMinute(), DATETIMEPICKER.CurrentSecond());
        txtDisplay.value = TextBoxValue;
        DatePickerHidden = true;
        dateTimePickerDiv.hidden = DatePickerHidden;
    },
    onClick: function (eleCtrl, event) {

        var Svalue = "";
        var iStart = 0;
        var iEnd = 0;
        var currentindex = 0;
        var TextBoxValue = eleCtrl.value;
        var currentTextArr = TextBoxValue.split(" ");
        Svalue = currentTextArr[1];
        var dateStringLength = currentTextArr[0].length + 1;
        currentindex = eleCtrl.selectionStart - dateStringLength;
        event.preventDefault();
        if (currentindex <= 2) {
            eleCtrl.setSelectionRange(dateStringLength, dateStringLength + 2);
            Svalue = Svalue.substr(dateStringLength, dateStringLength + 2);
            eleCtrl.focus();
        }
        else if (currentindex >= 3 && currentindex <= 5) {
            eleCtrl.setSelectionRange(dateStringLength + 3, dateStringLength + 5);
            Svalue = Svalue.substr(dateStringLength + 3, dateStringLength + 2);
            eleCtrl.focus();
        }
        else if (currentindex >= 6 && currentindex <= 8) {
            eleCtrl.setSelectionRange(dateStringLength + 6, dateStringLength + 8);
            Svalue = Svalue.substr(dateStringLength + 6, dateStringLength + 2);
            eleCtrl.focus();
        }

    },
    moveCaretInInput: function (eleCtrl, iStart, iEnd) {
        debugger;
        if (eleCtrl.setSelectionRange) {
            eleCtrl.focus();
            eleCtrl.setSelectionRange(iStart, iEnd);
        }
        else if (eleCtrl.createTextRange) {
            var range = eleCtrl.createTextRange();
            range.collapse(true);
            range.moveEnd('character', iEnd);
            range.moveStart('character', iStart);
            range.select();
        }
    },

    processBackSpace: function (eleCtrl, event) {
        debugger;
        var sValue = "";
        var cChar = "";
        var iCursorPosition = 0;
        var indexdecrement = 1;
        event.preventDefault();

        sValue = eleCtrl.value;
        var TextBoxValue = eleCtrl.value;
        var currentTextArr = TextBoxValue.split(" ");
        var dateStringLength = currentTextArr[0].length + 1;

        if (eleCtrl.selectionStart == eleCtrl.selectionEnd) {
            iCursorPosition = eleCtrl.selectionStart;
        }
        else {
            iCursorPosition = eleCtrl.selectionEnd;
        }

        if (iCursorPosition == 0) {
            return;
        }
        else if (iCursorPosition <= 11) {
            indexdecrement = 11;
            DATETIMEPICKER.moveCaretInInput(eleCtrl, iCursorPosition - indexdecrement, iCursorPosition - indexdecrement);
            return;
        }
        cChar = sValue.substr(iCursorPosition - 1, 1);
        if (cChar.charCodeAt(0) >= 48 && cChar.charCodeAt(0) <= 57) {
            sValue = sValue.substr(0, iCursorPosition - 1) + '0' + sValue.substr(iCursorPosition);
            eleCtrl.value = sValue;
        }
        if (iCursorPosition == dateStringLength + 4 || iCursorPosition == dateStringLength + 7) {
            indexdecrement = 2;
        }
        else {
            indexdecrement = 1;
        }
        DATETIMEPICKER.moveCaretInInput(eleCtrl, iCursorPosition - indexdecrement, iCursorPosition - indexdecrement);
    },

    //String.prototype.replaceAt = function (iCursorPosition, cChar) {
    //    debugger;
    //    return substr(0, iCursorPosition) + cChar + substr(iCursorPosition + cChar.length);
    //},

    getCursorBlock: function (eleCtrl) {
        debugger;
        var iIndex = 0;
        var obj = {};

        obj.iStart = -1;
        obj.iEnd = -1;
        obj.bHour = false;
        obj.bMinute = false;
        obj.bSecond = false;

        var TextBoxValue = eleCtrl.value;
        var currentTextArr = TextBoxValue.split(" ");
        Svalue = currentTextArr[1];
        var dateStringLength = currentTextArr[0].length + 1;

        iIndex = eleCtrl.selectionStart;
        if (iIndex >= dateStringLength + 0 && iIndex <= dateStringLength + 2) {
            obj.bHour = true;
            obj.iStart = dateStringLength + 0;
            obj.iEnd = dateStringLength + 2;
        }
        else if (iIndex >= dateStringLength + 3 && iIndex <= dateStringLength + 5) {
            obj.bMinute = true;
            obj.iStart = dateStringLength + 3;
            obj.iEnd = dateStringLength + 5;
        }
        else if (iIndex >= dateStringLength + 6 && iIndex <= dateStringLength + 8) {
            obj.bSecond = true;
            obj.iStart = dateStringLength + 6;
            obj.iEnd = dateStringLength + 8;
        }

        return (obj);
    },
    processUpDown: function (bUp, eleCtrl, event) {
        debugger;
        var obj = null;

        event.preventDefault();
        obj = DATETIMEPICKER.getCursorBlock(eleCtrl);
        if (obj.iStart > -1 && obj.iEnd > -1) {
            DATETIMEPICKER.changeValue(bUp, eleCtrl, obj);
        }
    },

    changeValue: function (bUp, eleCtrl, obj) {
        debugger;
        var sValue = "";
        var iNewValue = 0;

        sValue = DATETIMEPICKER.getOldValue(eleCtrl, obj);
        iNewValue = parseInt(sValue);

        if (bUp == true) {
            iNewValue++;
        }
        else {
            iNewValue--;
        }

        if (obj.bHour == true) {
            if (iNewValue > 23) {
                iNewValue = 0;
            }
            else if (iNewValue < 0) {
                iNewValue = 23;
            }
        }
        else if (obj.bMinute == true) {
            if (iNewValue > 59) {
                iNewValue = 0;
            }
            else if (iNewValue < 0) {
                iNewValue = 59;
            }
        }
        else if (obj.bSecond == true) {
            if (iNewValue > 59) {
                iNewValue = 0;
            }
            else if (iNewValue < 0) {
                iNewValue = 59;
            }
        }

        if (iNewValue < 10) {
            iNewValue = "0" + iNewValue;
        }

        debugger
        if (obj.bHour == true) {
            sValue = eleCtrl.value.substr(0, obj.iStart);
            sValue += iNewValue.toString();
            sValue += eleCtrl.value.substr(obj.iEnd);
        }
        else {
            sValue = eleCtrl.value.substr(0, obj.iStart);
            sValue += iNewValue;
            if (obj.bMinute == true) {
                sValue += eleCtrl.value.substr(obj.iEnd);
            }
            else {
                sValue = eleCtrl.value.substr(0, obj.iStart);
                sValue += iNewValue;
            }
        }

        eleCtrl.value = sValue;

        DATETIMEPICKER.moveCaretInInput(eleCtrl, obj.iStart, obj.iEnd);
    },

    getOldValue: function (eleCtrl, obj) {
        debugger;
        var sValue = "";

        sValue = eleCtrl.value.substr(obj.iStart, 2);

        return (sValue);
    },

    InsertNewValue: function (eleCtrl, KeyID) {
        debugger;
        var TextBoxValue = eleCtrl.value;
        var currentTextArr = TextBoxValue.split(" ");
        var sValue = currentTextArr[1];
        var dateStringLength = currentTextArr[0].length + 1;

        var changeEffective = false;;
        var currentindex = eleCtrl.selectionStart - dateStringLength;
        var charToInput = String.fromCharCode(KeyID.keyCode);


        var firstindexval = parseInt(sValue.charAt(0));
        var secondindexval = parseInt(sValue.charAt(1));
        var indexincrement = 1;
        if (currentindex == 0 && (KeyID.keyCode > 47 && KeyID.keyCode < 50)) {
            sValue = sValue.substr(0, currentindex) + charToInput + sValue.substr(currentindex + 1);
            changeEffective = true;
        }
        else if (currentindex == 0 && (KeyID.keyCode > 47 && KeyID.keyCode < 51) && (secondindexval < 4)) {
            sValue = sValue.substr(0, currentindex) + charToInput + sValue.substr(currentindex + 1);
            changeEffective = true;
        }
        else if (currentindex == 1 && (KeyID.keyCode > 47 && KeyID.keyCode < 58) && (firstindexval < 2)) {
            sValue = sValue.substr(0, currentindex) + charToInput + sValue.substr(currentindex + 1);
            changeEffective = true;
        }
        else if (currentindex == 1 && (KeyID.keyCode > 47 && KeyID.keyCode < 52)) {
            sValue = sValue.substr(0, currentindex) + charToInput + sValue.substr(currentindex + 1);
            changeEffective = true;
        }
        else if (currentindex == 3 && (KeyID.keyCode > 47 && KeyID.keyCode < 54)) {
            sValue = sValue.substr(0, currentindex) + charToInput + sValue.substr(currentindex + 1);
            changeEffective = true;
        }

        else if (currentindex == 6 && (KeyID.keyCode > 47 && KeyID.keyCode < 54)) {
            sValue = sValue.substr(0, currentindex) + charToInput + sValue.substr(currentindex + 1);
            changeEffective = true;
        }
        else if (currentindex == 4 || currentindex == 7) {
            sValue = sValue.substr(0, currentindex) + charToInput + sValue.substr(currentindex + 1);
            changeEffective = true;
        }

        if (currentindex == 1 || currentindex == 4) {
            indexincrement = 2;
        }
        else {
            indexincrement = 1;
        }
        if (changeEffective == false) {
            DATETIMEPICKER.moveCaretInInput(eleCtrl, dateStringLength + currentindex, dateStringLength + currentindex);
        }
        else {
            eleCtrl.value = currentTextArr[0] + ' ' + sValue;
            DATETIMEPICKER.moveCaretInInput(eleCtrl, dateStringLength + currentindex + indexincrement, dateStringLength + currentindex + indexincrement);
        }
        return;

    },

    clearValueOnBackSpace: function (eleCtrl, event) {

        var KeyID = event.keyCode;
        var TextBoxValue = eleCtrl.value;
        var currentTextArr = TextBoxValue.split(" ");
        var sValue = currentTextArr[1];
        var dateStringLength = currentTextArr[0].length + 1;
        var currentindex = eleCtrl.selectionStart - dateStringLength;
        if (KeyID == 8) {
            DATETIMEPICKER.processBackSpace(eleCtrl, event);
        }
        if (KeyID == 38) {
            DATETIMEPICKER.processUpDown(true, eleCtrl, event);

        }
        if (KeyID == 40) {
            DATETIMEPICKER.processUpDown(false, eleCtrl, event);

        }
        if (KeyID == 46) {
            event.preventDefault();
        }
        if (KeyID == 37) {
            if (currentindex == 4 || currentindex == 7) {
                event.preventDefault();
                DATETIMEPICKER.moveCaretInInput(eleCtrl, dateStringLength + currentindex - 2, dateStringLength + currentindex - 2);
            }


        }
        if (KeyID == 39) {
            if (currentindex == 1 || currentindex == 4) {
                event.preventDefault();
                DATETIMEPICKER.moveCaretInInput(eleCtrl, dateStringLength + currentindex + 2, dateStringLength + currentindex + 2);

            }
        }
    },

    InsertNewCharacter: function (eleCtrl, event) {
        var KeyID = event.keyCode;
        if ((KeyID > 47 && KeyID < 58) || (KeyID > 95 && KeyID < 106)) {
            InsertNewValue(eleCtrl, KeyID);
        }
        else {
            event.preventDefault();
        }
    }
};






