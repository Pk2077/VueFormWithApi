var filter = [];
var bchange = false;
var conjuction = [];
var operator = [];
var comparewith = [];
var defaultFilterValues = [];
var bAdvanceFilter = false;
var arrFilterTree = [];
var arrDataFilterTree = [];
var arrFilterResourceMsgs = undefined;
var bConditionChanged = false;
var callBackFnName = undefined;
var bDataChanged = false;
var iSubParentId = 0;
var varDataType = 0;
var FILTER = {
    createControl: function (iFilterId, iSubFilterId, FilterTreeData, arrFilter, bdefaultFilter, sFrom) {
        try {
            data = NETWORK.executeServerMethod(
                GLOBAL.getContextPath("CreateFilterControlFromTreeData", "Home")
                ,
                true,
                {
                    iFilterId: iFilterId,
                    iSubFilterId: iSubFilterId,
                    treeData: FilterTreeData,
                    filter: arrFilter,
                    bdefaultFilter: bdefaultFilter,
                    sFrom: sFrom
                },
                ""
                );

            if (data.lValue > 0) {
                return data.data;
            }
            else {
                return null;
            }
        }
        catch (err) {
            alert("Exception: {FILTER.createControl} " + err.message);
        }
    },

    setVariables: function (conjuctions, operators, comparewiths, FilterTree, FilterValue, iFilterId, iSubFilterId, FilterResource, DataFilterTree, sFrom) {
        try {
            conjuction = conjuctions;
            operator = operators;
            comparewith = comparewiths;
            arrFilterTree = FilterTree;
            arrDataFilterTree = DataFilterTree;
            arrFilterResourceMsgs = FilterResource;
            if (FilterValue != null && FilterValue != undefined)
                FILTER.displayAdvanceFilter(FilterValue, iFilterId, iSubFilterId, false, sFrom);
            var FilterFieldsUL = document.getElementById("FilterFields_" + FILTER.getFilterId(iFilterId, iSubFilterId));
            if (FilterFieldsUL != null) {
                var pageHeight = GLOBAL.getPageHeight();
                if (pageHeight > 250) {
                    FilterFieldsUL.style.height = (pageHeight - 250) + "px";
                }
            }
            $(document).click(function (e) {
                try {
                    var container = $("#" + FILTER.getFilterTreeId(iFilterId, iSubFilterId));
                    var container1 = $("#" + FILTER.getFilterDateRangeTreeId(iFilterId, iSubFilterId));
                    var container2 = $("#" + FILTER.getFilterDataTreeId(iFilterId, iSubFilterId));
                }
                catch (err) {
                    alert("Exception: {FILTER.setVariables} " + err.message.toString());
                }
            });
        }
        catch (err) {
            alert("Exception: {FILTER.setVariables} " + err.message);
        }
    },

    getDataFieldsTree: function (eleTxt, iFilterId, iSubFilterId) {
        try {
            var FilterTree = document.getElementById(FILTER.getFilterDataTreeId(iFilterId, iSubFilterId));
            FilterTree.style.top = "auto";
            FilterTree.style.display = "";
            if (eleTxt.getBoundingClientRect().top > (GLOBAL.getPageHeight() / 2)) {
                eleTxt.type = "text";
                eleTxt.parentElement.appendChild(FilterTree);
                $(eleTxt.parentNode).toggleClass("open");
            }
            else {
                $(eleTxt.parentNode).toggleClass("open");
                eleTxt.parentElement.appendChild(FilterTree);
            }
        }
        catch (err) {
            alert("Exception: {FILTER.getDataFieldsTree} " + err.message);
        }
    },

    getDateRangeTree: function (element, iFilterId, iSubFilterId) {
        try {
            var FilterTree = document.getElementById(FILTER.getFilterDateRangeTreeId(iFilterId, iSubFilterId));
            FilterTree.style.top = "auto";
            FilterTree.style.display = "";
            if (element.getBoundingClientRect().top > (GLOBAL.getPageHeight() / 2)) {
                element.type = "text";
                element.parentElement.appendChild(FilterTree);
                $(element.parentNode).toggleClass("open");
            }
            else {
                $(element.parentNode).toggleClass("open");
                element.parentElement.appendChild(FilterTree);
            }
        }
        catch (err) {
            alert("Exception: {FILTER.getDateRangeTree} " + err.message);
        }
    },

    hideTree: function (iFilterId, iSubFilterId) {
        try {
            var FilterTree = document.getElementById(FILTER.getFilterTreeId(iFilterId, iSubFilterId));
            if (FilterTree.parentNode.className == "dropdown open")
                FilterTree.parentNode.className = "dropdown";
            document.getElementsByClassName(FILTER.ADVANCEFILTER.getAdvanceFilterClassName())[0].parentNode.appendChild(FilterTree);
            FilterTree.style.display = "none";
        }
        catch (err) {
            alert("Exception: {FILTER.hideTree} " + err.message);
        }
    },

    ToggleField: function (element) {
        try {
            var ul = element.nextElementSibling;
            $(ul).slideToggle("fast");
            if (element.children[0].className == "icon-right-arrow") {
                element.children[0].className = "icon-down-arrow";
            }
            else {
                element.children[0].className = "icon-right-arrow";
            }
        }
        catch (err) {
            alert("Exception: {FILTER.ToggleField} " + err.message);
        }
    },

    getFilterValue: function (iFilterId, iSubFilterId, sFrom) {
        try {
            var sAdvanceFilterId = FILTER.getAdvanceFilterId(iFilterId, iSubFilterId, sFrom);
            var sDefaultFilterId = FILTER.getDefaultFilterId(iFilterId, iSubFilterId, sFrom);
            var iCounter = 0;
            var iCountDefaultValues = 0;
            var iComapareWith = 0;
            var iConjuction = 0;
            var iOperator = 0;
            var iDataType = 0;
            var iFieldId = 0;
            var iSubParentId = 0;
            var sCompareText = "";
            var sCompareValue = "";
            var sextraFieldName = "";
            var numberlist = null;
            var eleAdvance = null;
            var arrFilter = [];
            var arrDefaultValues = [];
            var eleRow = null;
            var eleField = null;
            var eleValue = null;
            var sFieldName = "";
            var iIndex = 0;
            var isgroup = false;
            var sDateRangeValue = 0;
            var iFromDate = 0;
            var iToDate = 0;
            var sCurrentDate = new Date();
            var iCurrentDay = 0;
            var iCurrentDate = 0;
            var iCurrentMonth = 0;
            var iCurrentYear = 0;
            var iValCurrentDate = 0;
            var iCalendarType = GLOBAL.getCalendarType();
            eleAdvance = FILTER.ADVANCEFILTER.getRowContainer(iFilterId, iSubFilterId, sFrom);
            if (FCommon.UI.isValidObject(eleAdvance) == true) {
                var defaulFilter = document.getElementById(sDefaultFilterId);

                if (FCommon.UI.isValidObject(defaulFilter) == true) {
                    if (defaulFilter.getBoundingClientRect().top > 0) {
                        arrDefaultValues = FILTER.getDefualtFilterValues(iFilterId, iSubFilterId, sFrom);
                        FILTER.displayAdvanceFilter(arrDefaultValues, iFilterId, iSubFilterId, true, sFrom);
                    }
                }

                for (iCounter = 0; iCounter < eleAdvance.children.length; iCounter++) {
                    sDateRangeValue = 0;
                    eleRow = eleAdvance.children[iCounter];
                    iIndex = FCommon.UI.getElementPosition(eleRow);
                    if (iIndex < 1) { // Some error
                        return;
                    }

                    iConjuction = parseInt(eleRow.children[0].children[0].value);

                    if (arrFilter.length == 0 && iConjuction == -1)
                        iConjuction = 0;
                    eleField = eleRow.children[0].nextElementSibling.children[0];
                    iOperator = FConvert.toInt(eleRow.children[0].nextElementSibling.nextElementSibling.children[0].value);
                    iComapareWith = FConvert.toInt(eleRow.children[0].nextElementSibling.nextElementSibling.nextElementSibling.children[0].value);
                    eleValue = eleRow.children[0].nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.children[0];
                    sCompareText = "";
                    sCompareValue = "";
                    iDataType = parseInt(eleField.dataset.datatype);
                    sFieldName = eleField.getAttribute('data-fieldname');
                    iFieldId = parseInt(eleField.dataset.fieldid);
                    iSubParentId = parseInt(eleField.dataset.subparent);
                    //isgroup = FConvert.toBoolean(eleValue.getAttribute('data-isgroup'));
                    isgroup = FConvert.toBoolean(eleValue.getAttribute('data-isgroup'));
                    sextraFieldName = eleField.getAttribute('data-extraFieldName');
                    switch (iComapareWith) {
                        case RD_CompareWith.get('VALUE'):
                            switch (iDataType) {
                                case MasterDataType.get('TEXT'):
                                    sCompareValue = eleValue.value;
                                    break;
                                case MasterDataType.get('NUMBER'):
                                case MasterDataType.get('FRACTION'):
                                case MasterDataType.get('BIGNUMBER'):
                                case MasterDataType.get('SMALLNUMBER'):
                                case MasterDataType.get('TINYNUMBER'):
                                    sCompareValue = eleValue.value;
                                    break;
                                case MasterDataType.get('BOOLEAN'):
                                    sCompareValue = eleValue.checked;
                                    break;
                                case MasterDataType.get('DATETIME'):
                                case MasterDataType.get('DATE'):
                                    sCompareValue = eleValue.dataset.value;
                                    break;
                                case MasterDataType.get('TIME'):
                                    sCompareValue = eleValue.dataset.value;
                                    break;
                                case MasterDataType.get('NUMBERLIST'):
                                case MasterDataType.get('STRINGLIST'):
                                    sCompareValue = eleValue.getAttribute('data-value');
                                    sCompareText = eleValue.value;
                                    numberlist = eleValue.getAttribute('data-numberlist');
                                    break;
                                case MasterDataType.get('MASTER'):
                                case MasterDataType.get('EXTERNALTABLE'):
                                    sCompareValue = eleValue.getAttribute('data-ivalue');
                                    sCompareText = eleValue.value;
                                    if (eleField.value == "Name") {
                                        iDataType = MasterDataType.get('NUMBER');
                                    }
                                    break;
                            }
                            break;
                        case RD_CompareWith.get('FORMULA'):
                            sCompareValue = document.getElementById("FilterFormulaContrl_" + sAdvanceFilterId + iIndex).value;
                            break;
                        case RD_CompareWith.get('FIELD'):
                            switch (iDataType) {
                                case MasterDataType.get('TEXT'):
                                    sCompareValue = eleValue.value;
                                    break;
                                case MasterDataType.get('NUMBER'):
                                case MasterDataType.get('FRACTION'):
                                case MasterDataType.get('BIGNUMBER'):
                                case MasterDataType.get('SMALLNUMBER'):
                                case MasterDataType.get('TINYNUMBER'):
                                    sCompareValue = eleValue.value;
                                    break;
                                case MasterDataType.get('BOOLEAN'):
                                    sCompareValue = eleValue.checked;
                                    break;
                                case MasterDataType.get('DATETIME'):
                                case MasterDataType.get('DATE'):
                                    sCompareValue = eleValue.dataset.value;
                                    break;
                                case MasterDataType.get('TIME'):
                                    sCompareValue = eleValue.dataset.value;
                                    break;
                                case MasterDataType.get('NUMBERLIST'):
                                case MasterDataType.get('STRINGLIST'):
                                    sCompareValue = eleValue.dataset.value;
                                    sCompareText = eleValue.value;
                                    numberlist = eleValue.getAttribute('data-numberlist');
                                    break;
                                case MasterDataType.get('MASTER'):
                                case MasterDataType.get('EXTERNALTABLE'):
                                    sCompareValue = eleValue.dataset.value;
                                    sCompareText = eleValue.value;
                                    break;
                            }
                            break;
                        case RD_CompareWith.get('DATERANGE'):
                            sDateRangeValue = eleValue.getAttribute('data-fieldid');
                            break;
                        default:
                            break;
                    }
                    if (iFieldId > 0 && iConjuction != -1) {
                        if (iOperator == -1) {
                            if (sCompareValue == undefined || sCompareValue.length == 0) {
                                document.getElementById(sAdvanceFilterId).dataset.invalid = true;
                            }
                            COMMON.prototype.showMessage(arrFilterResourceMsgs.msgFilterConditionisNotValid, "Error");
                            return null;
                        }
                        if (iComapareWith == -1) {
                            COMMON.prototype.showMessage(arrFilterResourceMsgs.msgFilterConditionisNotValid, "Error");
                            return null;
                        }
                        if (iFieldId != NaN &&
                           (iDataType != MasterDataType.get('TEXT') && iDataType != MasterDataType.get('NUMBER') && iDataType != MasterDataType.get('FRACTION')
                           && iDataType != MasterDataType.get('BIGNUMBER') && iDataType != MasterDataType.get('SMALLNUMBER') && iDataType != MasterDataType.get('TINYNUMBER'))
                           && (sCompareValue == undefined || sCompareValue.length == 0 || sCompareValue.trim == "")) {
                            COMMON.prototype.showMessage(arrFilterResourceMsgs.msgFilterConditionisNotValid, "Error");
                            return null;
                        }
                    }
                    if (iOperator == 6 || iOperator == 7) {
                        if (iConjuction != -1 && iOperator != -1 && iFieldId != NaN) {
                            if (sFieldName == 'Name' && iDataType == MasterDataType.get('MASTER')) {
                                iDataType = MasterDataType.get('NUMBER');
                            }
                            arrFilter.push(
                                {
                                    CompareText: sCompareText,
                                    CompareValue: sCompareValue,
                                    CompareWith: iComapareWith,
                                    Conjuction: iConjuction,
                                    DataType: iDataType,
                                    FieldId: iFieldId,
                                    IsGroup: isgroup,
                                    Operator: iOperator,
                                    SubParentId: iSubParentId,
                                    numberlist: numberlist,
                                    sExtraFieldName: sextraFieldName
                                });
                        }
                        else if (bDataChanged == true) {
                            document.getElementById(sAdvanceFilterId).dataset.invalid = true;
                            COMMON.prototype.showMessage(arrFilterResourceMsgs.msgFilterConditionisNotValid, "Error");
                            return null;
                        }
                    }
                    else {
                        if (iComapareWith == 3) {
                            iCurrentDate = sCurrentDate.getDate();
                            iCurrentMonth = sCurrentDate.getMonth() + 1;
                            iCurrentYear = sCurrentDate.getFullYear();
                            iValCurrentDate = DATE.prototype.convertIntoFocusDate(iCurrentDate, iCurrentMonth, iCurrentYear);
                            iCurrentDay = DATE.prototype.getDayOfWeek(iValCurrentDate, GLOBAL.getCalendarType());
                            switch (FConvert.toInt(sDateRangeValue)) {
                                case DateRange.CurrentMonth:
                                    sCurrentDate = new Date();
                                    switch (iCurrentMonth) {
                                        case 1:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(1, iCurrentMonth, iCurrentYear);
                                            iToDate = DATE.prototype.convertIntoFocusDate(31, iCurrentMonth, iCurrentYear);
                                            break;
                                        case 2:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(1, iCurrentMonth, iCurrentYear);
                                            if (DATE.prototype.isLeapYear(iCurrentYear) == true) {
                                                iToDate = DATE.prototype.convertIntoFocusDate(29, iCurrentMonth, iCurrentYear);
                                            }
                                            else {
                                                iToDate = DATE.prototype.convertIntoFocusDate(28, iCurrentMonth, iCurrentYear);
                                            }
                                            break;
                                        case 3:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(1, iCurrentMonth, iCurrentYear);
                                            iToDate = DATE.prototype.convertIntoFocusDate(31, iCurrentMonth, iCurrentYear);
                                            break;
                                        case 4:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(1, iCurrentMonth, iCurrentYear);
                                            iToDate = DATE.prototype.convertIntoFocusDate(30, iCurrentMonth, iCurrentYear);
                                            break;
                                        case 5:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(1, iCurrentMonth, iCurrentYear);
                                            iToDate = DATE.prototype.convertIntoFocusDate(31, iCurrentMonth, iCurrentYear);
                                            break;
                                        case 6:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(1, iCurrentMonth, iCurrentYear);
                                            iToDate = DATE.prototype.convertIntoFocusDate(30, iCurrentMonth, iCurrentYear);
                                            break;
                                        case 7:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(1, iCurrentMonth, iCurrentYear);
                                            iToDate = DATE.prototype.convertIntoFocusDate(31, iCurrentMonth, iCurrentYear);
                                            break;
                                        case 8:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(1, iCurrentMonth, iCurrentYear);
                                            iToDate = DATE.prototype.convertIntoFocusDate(31, iCurrentMonth, iCurrentYear);
                                            break;
                                        case 9:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(1, iCurrentMonth, iCurrentYear);
                                            iToDate = DATE.prototype.convertIntoFocusDate(30, iCurrentMonth, iCurrentYear);
                                            break;
                                        case 10:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(1, iCurrentMonth, iCurrentYear);
                                            iToDate = DATE.prototype.convertIntoFocusDate(31, iCurrentMonth, iCurrentYear);
                                            break;
                                        case 11:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(1, iCurrentMonth, iCurrentYear);
                                            iToDate = DATE.prototype.convertIntoFocusDate(30, iCurrentMonth, iCurrentYear);
                                            break;
                                        case 12:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(1, iCurrentMonth, iCurrentYear);
                                            iToDate = DATE.prototype.convertIntoFocusDate(31, iCurrentMonth, iCurrentYear);
                                            break;
                                    }
                                    break;
                                case DateRange.PreviousMonth:
                                    sCurrentDate = new Date();
                                    switch (iCurrentMonth) {
                                        case 1:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(1, 12, iCurrentYear - 1);
                                            iToDate = DATE.prototype.convertIntoFocusDate(31, 12, iCurrentYear - 1);
                                            break;
                                        case 2:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(1, 1, iCurrentYear);
                                            iToDate = DATE.prototype.convertIntoFocusDate(31, 1, iCurrentYear);
                                            break;
                                        case 3:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(1, 2, iCurrentYear);
                                            if (DATE.prototype.isLeapYear(iCurrentYear) == true) {
                                                iToDate = DATE.prototype.convertIntoFocusDate(29, 2, iCurrentYear);
                                            }
                                            else {
                                                iToDate = DATE.prototype.convertIntoFocusDate(28, 2, iCurrentYear);
                                            }
                                            break;
                                        case 4:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(1, 3, iCurrentYear);
                                            iToDate = DATE.prototype.convertIntoFocusDate(31, 3, iCurrentYear);
                                            break;
                                        case 5:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(1, 4, iCurrentYear);
                                            iToDate = DATE.prototype.convertIntoFocusDate(30, 4, iCurrentYear);
                                            break;
                                        case 6:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(1, 5, iCurrentYear);
                                            iToDate = DATE.prototype.convertIntoFocusDate(31, 5, iCurrentYear);
                                            break;
                                        case 7:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(1, 6, iCurrentYear);
                                            iToDate = DATE.prototype.convertIntoFocusDate(30, 6, iCurrentYear);
                                            break;
                                        case 8:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(1, 7, iCurrentYear);
                                            iToDate = DATE.prototype.convertIntoFocusDate(31, 7, iCurrentYear);
                                            break;
                                        case 9:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(1, 8, iCurrentYear);
                                            iToDate = DATE.prototype.convertIntoFocusDate(31, 8, iCurrentYear);
                                            break;
                                        case 10:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(1, 9, iCurrentYear);
                                            iToDate = DATE.prototype.convertIntoFocusDate(30, 9, iCurrentYear);
                                            break;
                                        case 11:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(1, 10, iCurrentYear);
                                            iToDate = DATE.prototype.convertIntoFocusDate(31, 10, iCurrentYear);
                                            break;
                                        case 12:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(1, 11, iCurrentYear);
                                            iToDate = DATE.prototype.convertIntoFocusDate(30, 11, iCurrentYear);
                                            break;
                                    }
                                    break;
                                case DateRange.NextMonth:
                                    sCurrentDate = new Date();
                                    switch (iCurrentMonth) {
                                        case 1:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(1, 2, iCurrentYear);
                                            if (DATE.prototype.isLeapYear(iCurrentYear) == true) {
                                                iToDate = DATE.prototype.convertIntoFocusDate(29, 2, iCurrentYear);
                                            }
                                            else {
                                                iToDate = DATE.prototype.convertIntoFocusDate(28, 2, iCurrentYear);
                                            }
                                            break;
                                        case 2:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(1, 3, iCurrentYear);
                                            iToDate = DATE.prototype.convertIntoFocusDate(31, 3, iCurrentYear);
                                            break;
                                        case 3:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(1, 4, iCurrentYear);
                                            iToDate = DATE.prototype.convertIntoFocusDate(30, 4, iCurrentYear);
                                            break;
                                        case 4:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(1, 5, iCurrentYear);
                                            iToDate = DATE.prototype.convertIntoFocusDate(31, 5, iCurrentYear);
                                            break;
                                        case 5:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(1, 6, iCurrentYear);
                                            iToDate = DATE.prototype.convertIntoFocusDate(30, 6, iCurrentYear);
                                            break;
                                        case 6:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(1, 7, iCurrentYear);
                                            iToDate = DATE.prototype.convertIntoFocusDate(31, 7, iCurrentYear);
                                            break;
                                        case 7:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(1, 8, iCurrentYear);
                                            iToDate = DATE.prototype.convertIntoFocusDate(31, 8, iCurrentYear);
                                            break;
                                        case 8:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(1, 9, iCurrentYear);
                                            iToDate = DATE.prototype.convertIntoFocusDate(30, 9, iCurrentYear);
                                            break;
                                        case 9:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(1, 10, iCurrentYear);
                                            iToDate = DATE.prototype.convertIntoFocusDate(31, 10, iCurrentYear);
                                            break;
                                        case 10:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(1, 11, iCurrentYear);
                                            iToDate = DATE.prototype.convertIntoFocusDate(30, 11, iCurrentYear);
                                            break;
                                        case 11:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(1, 12, iCurrentYear);
                                            iToDate = DATE.prototype.convertIntoFocusDate(31, 12, iCurrentYear);
                                            break;
                                        case 12:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(1, 1, iCurrentYear + 1);
                                            iToDate = DATE.prototype.convertIntoFocusDate(31, 1, iCurrentYear + 1);
                                            break;
                                    }
                                    break;
                                case DateRange.CurrentAndNextMonth:
                                    sCurrentDate = new Date();
                                    switch (iCurrentMonth) {
                                        case 1:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(1, iCurrentMonth, iCurrentYear);
                                            if (DATE.prototype.isLeapYear(iCurrentYear) == true) {
                                                iToDate = DATE.prototype.convertIntoFocusDate(29, 2, iCurrentYear);
                                            }
                                            else {
                                                iToDate = DATE.prototype.convertIntoFocusDate(28, 2, iCurrentYear);
                                            }
                                            break;
                                        case 2:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(1, iCurrentMonth, iCurrentYear);
                                            iToDate = DATE.prototype.convertIntoFocusDate(31, 3, iCurrentYear);
                                            break;
                                        case 3:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(1, iCurrentMonth, iCurrentYear);
                                            iToDate = DATE.prototype.convertIntoFocusDate(30, 4, iCurrentYear);
                                            break;
                                        case 4:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(1, iCurrentMonth, iCurrentYear);
                                            iToDate = DATE.prototype.convertIntoFocusDate(31, 5, iCurrentYear);
                                            break;
                                        case 5:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(1, iCurrentMonth, iCurrentYear);
                                            iToDate = DATE.prototype.convertIntoFocusDate(30, 6, iCurrentYear);
                                            break;
                                        case 6:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(1, iCurrentMonth, iCurrentYear);
                                            iToDate = DATE.prototype.convertIntoFocusDate(31, 7, iCurrentYear);
                                            break;
                                        case 7:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(1, iCurrentMonth, iCurrentYear);
                                            iToDate = DATE.prototype.convertIntoFocusDate(31, 8, iCurrentYear);
                                            break;
                                        case 8:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(1, iCurrentMonth, iCurrentYear);
                                            iToDate = DATE.prototype.convertIntoFocusDate(30, 9, iCurrentYear);
                                            break;
                                        case 9:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(1, iCurrentMonth, iCurrentYear);
                                            iToDate = DATE.prototype.convertIntoFocusDate(31, 10, iCurrentYear);
                                            break;
                                        case 10:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(1, iCurrentMonth, iCurrentYear);
                                            iToDate = DATE.prototype.convertIntoFocusDate(30, 11, iCurrentYear);
                                            break;
                                        case 11:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(1, iCurrentMonth, iCurrentYear);
                                            iToDate = DATE.prototype.convertIntoFocusDate(31, 12, iCurrentYear);
                                            break;
                                        case 12:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(1, iCurrentMonth, iCurrentYear);
                                            iToDate = DATE.prototype.convertIntoFocusDate(31, 1, iCurrentYear + 1);
                                            break;
                                    }
                                    break;
                                case DateRange.CurrentAndPreviousMonth:
                                    sCurrentDate = new Date();
                                    switch (iCurrentMonth) {
                                        case 1:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(1, 12, iCurrentYear - 1);
                                            iToDate = DATE.prototype.convertIntoFocusDate(31, iCurrentMonth, iCurrentYear);
                                            break;
                                        case 2:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(31, 1, iCurrentYear);
                                            if (DATE.prototype.isLeapYear(iCurrentYear) == true) {
                                                iToDate = DATE.prototype.convertIntoFocusDate(29, iCurrentMonth, iCurrentYear);
                                            }
                                            else {
                                                iToDate = DATE.prototype.convertIntoFocusDate(28, iCurrentMonth, iCurrentYear);
                                            }
                                            break;
                                        case 3:
                                            if (DATE.prototype.isLeapYear(iCurrentYear) == true) {
                                                iFromDate = DATE.prototype.convertIntoFocusDate(1, 2, iCurrentYear);
                                            }
                                            else {
                                                iFromDate = DATE.prototype.convertIntoFocusDate(1, 2, iCurrentYear);
                                            }
                                            iToDate = DATE.prototype.convertIntoFocusDate(31, iCurrentMonth, iCurrentYear);
                                            break;
                                        case 4:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(1, 3, iCurrentYear);
                                            iToDate = DATE.prototype.convertIntoFocusDate(30, iCurrentMonth, iCurrentYear);
                                            break;
                                        case 5:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(1, 4, iCurrentYear);
                                            iToDate = DATE.prototype.convertIntoFocusDate(31, iCurrentMonth, iCurrentYear);
                                            break;
                                        case 6:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(1, 5, iCurrentYear);
                                            iToDate = DATE.prototype.convertIntoFocusDate(30, iCurrentMonth, iCurrentYear);
                                            break;
                                        case 7:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(1, 6, iCurrentYear);
                                            iToDate = DATE.prototype.convertIntoFocusDate(31, iCurrentMonth, iCurrentYear);
                                            break;
                                        case 8:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(1, 7, iCurrentYear);
                                            iToDate = DATE.prototype.convertIntoFocusDate(31, iCurrentMonth, iCurrentYear);
                                            break;
                                        case 9:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(1, 8, iCurrentYear);
                                            iToDate = DATE.prototype.convertIntoFocusDate(30, iCurrentMonth, iCurrentYear);
                                            break;
                                        case 10:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(1, 9, iCurrentYear);
                                            iToDate = DATE.prototype.convertIntoFocusDate(31, iCurrentMonth, iCurrentYear);
                                            break;
                                        case 11:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(1, 10, iCurrentYear);
                                            iToDate = DATE.prototype.convertIntoFocusDate(30, iCurrentMonth, iCurrentYear);
                                            break;
                                        case 12:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(1, 11, iCurrentYear);
                                            iToDate = DATE.prototype.convertIntoFocusDate(31, iCurrentMonth, iCurrentYear);
                                            break;
                                    }
                                    break;
                                case DateRange.CurrentWeek:
                                    switch (iCurrentDay) {
                                        case 1:
                                            iFromDate = iValCurrentDate;
                                            iToDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iValCurrentDate, 6, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear);
                                            break;
                                        case 2:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iValCurrentDate, -1, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear);
                                            iToDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iValCurrentDate, 5, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear);
                                            break;
                                        case 3:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iValCurrentDate, -2, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear);
                                            iToDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iValCurrentDate, 4, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear);
                                            break;
                                        case 4:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iValCurrentDate, -3, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear);
                                            iToDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iValCurrentDate, 3, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear);
                                            break;
                                        case 5:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iValCurrentDate, -4, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear);
                                            iToDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iValCurrentDate, 2, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear);
                                            break;
                                        case 6:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iValCurrentDate, -5, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear);
                                            iToDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iValCurrentDate, 1, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear);
                                            break;
                                        case 7:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iValCurrentDate, -5, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear);
                                            iToDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iValCurrentDate, 1, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear);
                                            break;
                                    }
                                    break;
                                case DateRange.PreviousWeek:
                                    switch (iCurrentDay) {
                                        case 1:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iValCurrentDate, -9, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear);;
                                            iToDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iValCurrentDate, -1, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear);
                                            break;
                                        case 2:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iValCurrentDate, -8, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear);;
                                            iToDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iValCurrentDate, -2, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear);
                                            break;
                                        case 3:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iValCurrentDate, -7, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear);
                                            iToDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iValCurrentDate, -3, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear);
                                            break;
                                        case 4:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iValCurrentDate, -6, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear);
                                            iToDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iValCurrentDate, -4, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear);
                                            break;
                                        case 5:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iValCurrentDate, -5, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear);
                                            iToDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iValCurrentDate, -5, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear);
                                            break;
                                        case 6:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iValCurrentDate, -4, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear);
                                            iToDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iValCurrentDate, -6, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear);
                                            break;
                                        case 7:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iValCurrentDate, -3, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear);
                                            iToDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iValCurrentDate, -7, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear);
                                            break;
                                    }
                                    break;
                                case DateRange.NextWeek:
                                    switch (iCurrentDay) {
                                        case 1:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iValCurrentDate, 7, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear);;
                                            iToDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iFromDate, 7, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear);
                                            break;
                                        case 2:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iValCurrentDate, 6, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear);;
                                            iToDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iFromDate, 6, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear);
                                            break;
                                        case 3:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iValCurrentDate, 5, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear);
                                            iToDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iFromDate, 5, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear);
                                            break;
                                        case 4:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iValCurrentDate, 4, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear);
                                            iToDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iFromDate, 4, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear);
                                            break;
                                        case 5:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iValCurrentDate, 3, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear);
                                            iToDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iFromDate, 3, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear);
                                            break;
                                        case 6:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iValCurrentDate, 2, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear);
                                            iToDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iFromDate, 2, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear);
                                            break;
                                        case 7:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iValCurrentDate, 1, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear);
                                            iToDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iFromDate, 1, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear);
                                            break;
                                    }
                                    break;
                                case DateRange.CurrentAndNextWeek:
                                    switch (iCurrentDay) {
                                        case 1:
                                            iFromDate = iValCurrentDate;
                                            iToDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iValCurrentDate, 13, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear);
                                            break;
                                        case 2:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iValCurrentDate, -1, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear);
                                            iToDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iValCurrentDate, 12, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear);
                                            break;
                                        case 3:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iValCurrentDate, -2, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear);
                                            iToDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iValCurrentDate, 11, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear);
                                            break;
                                        case 4:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iValCurrentDate, -3, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear);
                                            iToDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iValCurrentDate, 10, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear);
                                            break;
                                        case 5:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iValCurrentDate, -4, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear);
                                            iToDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iValCurrentDate, 9, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear);
                                            break;
                                        case 6:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iValCurrentDate, -5, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear);
                                            iToDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iValCurrentDate, 8, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear);
                                            break;
                                        case 7:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iValCurrentDate, -6, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear);
                                            iToDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iValCurrentDate, 7, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear);
                                            break;
                                    }
                                    break;
                                case DateRange.CurrentAndPreviousWeek:
                                    switch (iCurrentDay) {
                                        case 1:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iValCurrentDate, -7, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear);;
                                            iToDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iValCurrentDate, 6, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear);
                                            break;
                                        case 2:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iValCurrentDate, -8, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear);;
                                            iToDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iValCurrentDate, 5, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear);
                                            break;
                                        case 3:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iValCurrentDate, -9, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear);;
                                            iToDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iValCurrentDate, 4, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear);
                                            break;
                                        case 4:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iValCurrentDate, -10, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear);;
                                            iToDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iValCurrentDate, 3, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear);
                                            break;
                                        case 5:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iValCurrentDate, -11, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear);;
                                            iToDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iValCurrentDate, 2, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear);
                                            break;
                                        case 6:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iValCurrentDate, -12, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear);;
                                            iToDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iValCurrentDate, 1, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear);
                                            break;
                                        case 7:
                                            iFromDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iValCurrentDate, -13, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear);;
                                            iToDate = DATE.prototype.convertIntoFocusDate(iValCurrentDate, iCurrentMonth, iCurrentYear);
                                            break;
                                    }
                                    break;
                                case DateRange.Today:
                                    iFromDate = iValCurrentDate;
                                    iToDate = iValCurrentDate;
                                    break;
                                case DateRange.Yesterday:
                                    iFromDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iValCurrentDate, -1, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear);
                                    iToDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iValCurrentDate, -1, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear);
                                    break;
                                case DateRange.Tomorrow:
                                    iFromDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iValCurrentDate, 1, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear);
                                    iToDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iValCurrentDate, 1, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear);
                                    break;
                                case DateRange.Previous7Days:
                                    iFromDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iValCurrentDate, -6, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear);
                                    iToDate = iValCurrentDate;
                                    break;
                                case DateRange.Previous30Days:
                                    iFromDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iValCurrentDate, -29, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear);
                                    iToDate = iValCurrentDate;
                                    break;
                                case DateRange.Previous60Days:
                                    iFromDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iValCurrentDate, -59, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear);
                                    iToDate = iValCurrentDate;
                                    break;
                                case DateRange.Previous90Days:
                                    iFromDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iValCurrentDate, -89, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear);
                                    iToDate = iValCurrentDate;
                                    break;
                                case DateRange.Next7Days:
                                    iFromDate = iValCurrentDate;
                                    iToDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iValCurrentDate, 6, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear);
                                    break;
                                case DateRange.Next30Days:
                                    iFromDate = iValCurrentDate;
                                    iToDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iValCurrentDate, 29, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear); break;
                                case DateRange.Next60Days:
                                    iFromDate = iValCurrentDate;
                                    iToDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iValCurrentDate, 59, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear); break;
                                case DateRange.Next90Days:
                                    iFromDate = iValCurrentDate;
                                    iToDate = DATE.prototype.convertIntoFocusDate(DATE.prototype.addDays(iValCurrentDate, 89, GLOBAL.getCalendarType()), iCurrentMonth, iCurrentYear);
                                    break;
                                case DateRange.MonthToDate:
                                    iFromDate = DATE.prototype.convertIntoFocusDate(1, iCurrentMonth, iCurrentYear);
                                    iToDate = iValCurrentDate;
                                    break;
                                case DateRange.YearToDate:
                                    iFromDate = DATE.prototype.convertIntoFocusDate(1, 1, iCurrentYear);
                                    iToDate = iValCurrentDate;
                                    break;
                            }
                            arrFilter.push(
                                {
                                    CompareText: "",
                                    CompareValue: iFromDate,
                                    CompareWith: 0,
                                    Conjuction: 0,
                                    DataType: 4,
                                    FieldId: 2,
                                    IsGroup: false,
                                    Operator: 5,
                                    SubParentId: 0,
                                    numberlist: null,
                                    sExtraFieldName: "1"
                                });
                            arrFilter.push(
                               {
                                   CompareText: "",
                                   CompareValue: iToDate,
                                   CompareWith: 0,
                                   Conjuction: 2,
                                   DataType: 4,
                                   FieldId: 2,
                                   IsGroup: false,
                                   Operator: 4,
                                   SubParentId: 0,
                                   numberlist: null,
                                   sExtraFieldName: "1"
                               });
                        }
                        else if (iComapareWith != -1 && iConjuction != -1 && iOperator != -1 && iFieldId != NaN && 
                            (iDataType == MasterDataType.get('TEXT') || iDataType == MasterDataType.get('NUMBER') || iDataType == MasterDataType.get('FRACTION') 
                            || iDataType == MasterDataType.get('BIGNUMBER') || iDataType == MasterDataType.get('SMALLNUMBER') || iDataType == MasterDataType.get('TINYNUMBER')))
                        {
                            arrFilter.push(
                                {
                                    CompareText: sCompareText,
                                    CompareValue: sCompareValue,
                                    CompareWith: iComapareWith,
                                    Conjuction: iConjuction,
                                    DataType: iDataType,
                                    FieldId: iFieldId,
                                    IsGroup: isgroup,
                                    Operator: iOperator,
                                    SubParentId: iSubParentId,
                                    numberlist: numberlist,
                                    sExtraFieldName: sextraFieldName
                                });
                        }
                        else if (iComapareWith != -1 && iConjuction != -1 && iOperator != -1 && sCompareValue != undefined && sCompareValue.length != 0 && iFieldId != NaN) {
                            if (sFieldName == 'Name' && iDataType == MasterDataType.get('MASTER')) {
                                iDataType = MasterDataType.get('NUMBER');
                            }
                            arrFilter.push(
                                {
                                    CompareText: sCompareText,
                                    CompareValue: sCompareValue,
                                    CompareWith: iComapareWith,
                                    Conjuction: iConjuction,
                                    DataType: iDataType,
                                    FieldId: iFieldId,
                                    IsGroup: isgroup,
                                    Operator: iOperator,
                                    SubParentId: iSubParentId,
                                    numberlist: numberlist,
                                    sExtraFieldName: sextraFieldName
                                });
                        }
                        else if (bDataChanged == true) {
                            document.getElementById(sAdvanceFilterId).dataset.invalid = true;
                            COMMON.prototype.showMessage(arrFilterResourceMsgs.msgFilterConditionisNotValid, "Error");
                            return null;
                        }
                    }
                }
                return (arrFilter);
            }
            return null;
        }
        catch (err) {
            alert("Exception: {FILTER.getFilterValue} " + err.message);
        }
    },

    getDefualtFilterValues: function (iFilterId, iSubFilterId, sFrom) {
        var arrFilterValues = [];
        var iCounter = 0;
        var obj = null;
        try {
            sDefaultFilterId = FILTER.getDefaultFilterId(iFilterId, iSubFilterId, sFrom);
            if (document.getElementById(sDefaultFilterId) != null) {
                var DefaultFields = document.getElementById(sDefaultFilterId).children;
                if (DefaultFields.length > 0) {
                    for (var iCount = 0; iCount < DefaultFields.length; iCount++) {
                        var Field = document.getElementById(sDefaultFilterId + iCount)
                        if (Field != null) {
                            obj = {};
                            obj.FieldId = FConvert.toInt(Field.dataset.fieldid);
                            obj.DataType = FConvert.toInt(Field.dataset.datatype);
                            obj.Conjuction = arrFilterValues.length > 0 ? 2 : 0;
                            obj.ParentId = FConvert.toInt(Field.dataset.parent);
                            obj.SubParentId = FConvert.toInt(Field.dataset.subparent);
                            obj.CompareText = "";
                            obj.CompareValue = "";
                            obj.CompareWith = 0;
                            obj.Operator = 0;
                            obj.CtrlId = Field.getAttribute('data-ctrlId');

                            switch (parseInt(Field.dataset.datatype)) {
                                case MasterDataType.get('TEXT'):
                                    obj.Operator = 10;
                                    obj.CompareValue = Field.value;
                                    break;
                                case MasterDataType.get('NUMBER'):
                                case MasterDataType.get('FRACTION'):
                                case MasterDataType.get('BIGNUMBER'):
                                case MasterDataType.get('SMALLNUMBER'):
                                case MasterDataType.get('TINYNUMBER'):
                                    obj.CompareValue = Field.value;
                                    break;
                                case MasterDataType.get('BOOLEAN'):
                                    obj.CompareValue = Field.checked;
                                    break;
                                case MasterDataType.get('DATETIME'):
                                    break;
                                case MasterDataType.get('DATE'):
                                    var FieldChanged = document.getElementById("DatePicker_" + Field.id);
                                    if (FieldChanged != null)
                                        obj.CompareValue = DATEPICKER.getDate("DatePicker_" + Field.id);
                                    break;
                                case MasterDataType.get('TIME'):
                                    var FieldChanged = document.getElementById("TimeCtrl_" + Field.id);
                                    if (FieldChanged != null)
                                        obj.CompareValue = FTIMECONTROL.getTime("TimeCtrl_" + Field.id);
                                    break;
                                case MasterDataType.get('NUMBERLIST'):
                                case MasterDataType.get('STRINGLIST'):
                                    obj.CompareValue = Field.value;
                                case MasterDataType.get('MASTER'):
                                case MasterDataType.get('EXTERNALTABLE'):
                                    if (parseInt(OPTIONCONTROL.getControlValue("FOption_" + Field.id)) > 0) {
                                        var optionData = OPTIONCONTROL.getControlData("FOption_" + Field.id);
                                        if (optionData.length > 0) {
                                            obj.CompareValue = COMMON.prototype.getObjectFirstPropertyValue(optionData[0]);
                                            obj.CompareText = COMMON.prototype.getObjectFirstPropertyValue(optionData[1]);
                                            obj.FieldName = 'Name';
                                        }
                                        obj.IsGroup = OPTIONCONTROL.getControlValue("FOption_" + Field.id, "bgroup");
                                    }
                                    break;
                            }
                            if (FCommon.UI.isValidObject(obj.CompareValue) == true) {
                                if (obj.DataType == 2) {
                                    arrFilterValues.push(obj);
                                }
                                else if (obj.CompareValue != "") {
                                    arrFilterValues.push(obj);
                                }
                            }
                        }
                    }
                }
            }
            return (arrFilterValues);
        }
        catch (err) {
            alert("Exception: {FILTER.getDefualtFilterValues} " + err.message);
        }
    },

    displayAdvanceFilter: function (arrFilterValues, iFilterId, iSubFilterId, bFromToggle, sFrom) {
        var arrTreeData = null;
        var eleBody = null;
        var eleRow = null;
        var iCounter = 0;
        var iTotal = 0;
        var iIndex = 0;
        var objData = null;
        var objTreeData = null;
        var arrOldData = null;
        var iConjuction = 0;
        var iOperator = 0;
        try {
            eleBody = FILTER.ADVANCEFILTER.getRowContainer(iFilterId, iSubFilterId, sFrom);
            FILTER.ADVANCEFILTER.resetAdvanceFilter(iFilterId, iSubFilterId);
            if (bFromToggle == true) {
                arrOldData = FILTER.ADVANCEFILTER.getLastData(eleBody);
                arrFilterValues = FILTER.mergeDefaultFilterData(arrFilterValues, arrOldData);
            }
            arrTreeData = FILTER.ADVANCEFILTER.getFieldTreeData(eleBody);
            iTotal = FCommon.Array.getLength(arrFilterValues);

            for (iCounter = 0; iCounter < iTotal; iCounter++) {
                if (iCounter > 0) {
                    FILTER.ADVANCEFILTER.addRow(eleBody);
                }

                eleRow = FILTER.ADVANCEFILTER.getRowElement(eleBody, iCounter);
                if (FCommon.UI.isValidObject(eleRow) == false) {
                    continue;
                }

                objData = arrFilterValues[iCounter];

                objTreeData = null;
                iIndex = FILTER.ADVANCEFILTER.getTreeDataIndex(objData.FieldId, objData.SubParentId, arrTreeData);
                if (iIndex >= 0) {
                    objTreeData = arrTreeData[iIndex];
                }

                iConjuction = FConvert.toInt(objData.Conjuction);
                iOperator = FConvert.toInt(objData.Operator);

                if (objData.FieldName != undefined) {
                    eleRow.setAttribute("data-fieldname", objData.FieldName);
                }
                else {
                    if (objTreeData != null) {
                        eleRow.setAttribute("data-fieldname", objTreeData.sName);
                    }
                }
                eleRow.setAttribute("data-datatype", FConvert.toInt(objData.DataType));
                FILTER.ADVANCEFILTER.setConjuction(eleRow, iConjuction);
                FILTER.ADVANCEFILTER.setOperator(eleRow, iOperator);

                //Hide CompareWith and Value fields if selected operator is "IsBlank" or "IsNotBlank".
                if (iOperator == FilterOperator.get('IsBlank') || iOperator == FilterOperator.get('IsNotBlank')) {
                    eleRow.children[3].children[0].style.display = "none";
                    eleRow.children[4].children[0].style.display = "none";
                }
                else {
                    eleRow.children[3].children[0].style.display = "";
                    eleRow.children[4].children[0].style.display = "";
                }
                FILTER.ADVANCEFILTER.setCompareType(eleRow, FConvert.toInt(objData.CompareWith));
                FILTER.ADVANCEFILTER.setField(eleRow, objData, objTreeData);
                FILTER.ADVANCEFILTER.setFieldValue(eleRow, objData, 'onLoad');
            }
        }
        catch (err) {
            alert("Exception: {FILTER.displayAdvanceFilter} " + err.message);
        }
    },

    //Called on click of toggle button
    ToggleFilter: function (element, iFilterId, iSubFilterId, sFrom) {
        var eleAdvFilter = null;
        var eleData = null;
        try {
            var sAdvanceFilterId = FILTER.getAdvanceFilterId(iFilterId, iSubFilterId, sFrom);
            var sDefaultFilterId = FILTER.getDefaultFilterId(iFilterId, iSubFilterId, sFrom);
            var defaulFilter = document.getElementById(sDefaultFilterId);
            eleAdvFilter = document.getElementById(sAdvanceFilterId);
            // If default filter is displayed
            if (defaulFilter.style.display == "block") {
                document.getElementById(sDefaultFilterId).style.display = "none"; // Hide default filter block
                document.getElementById('idFilterCustomizeIcon').style.display = 'none';
                eleAdvFilter.style.display = "block"; // Display advance filter block

                var filterlabel = document.getElementById("filterLabel_" + sDefaultFilterId);
                if (filterlabel != null) {
                    element.title = arrFilterResourceMsgs.lblChangeTo + ' ' + arrFilterResourceMsgs.AdvanceFilter;
                    document.getElementById("filterLabel_" + sDefaultFilterId).textContent = arrFilterResourceMsgs.AdvanceFilter
                }

                var FilterValues = FILTER.getDefualtFilterValues(iFilterId, iSubFilterId, sFrom);
                FILTER.displayAdvanceFilter(FilterValues, iFilterId, iSubFilterId, true, sFrom);
            }
            else { // Advance filter is displayed
                FILTER.ADVANCEFILTER.setLastData(eleAdvFilter, FILTER.getFilterValue(iFilterId, iSubFilterId, sFrom));
                eleAdvFilter.style.display = "none"; // Hide default filter block
                document.getElementById('idFilterCustomizeIcon').style.display = '';
                document.getElementById(sDefaultFilterId).style.display = "block"; // Display default filter block
                element.title = arrFilterResourceMsgs.lblChangeTo + ' ' + arrFilterResourceMsgs.grbDefaultFilter;
                document.getElementById("filterLabel_" + sDefaultFilterId).textContent = arrFilterResourceMsgs.grbDefaultFilter
                //bAdvanceFilter = false;
            }
            //$("#" + sDefaultFilterId).slideToggle("slow");
            //$("#" + sAdvanceFilterId).slideToggle("slow", function () {
            //    if (bAdvanceFilter == true) {
            //        document.getElementById(sAdvanceFilterId).style.display = "block";
            //        var FilterValues = FILTER.getDefualtFilterValues(iFilterId, iSubFilterId)
            //        var filterRows = document.getElementById(sAdvanceFilterId).children;
            //        FILTER.addAdvanceFilter(FilterValues, iFilterId, iSubFilterId);
            //    }
            //});
        }
        catch (err) {
            alert("Exception: {FILTER.ToggleFilter} " + err.message);
        }
    },

    //Internal
    mergeDefaultFilterData: function (arrDefaultFilter, arrAdvanceFilter) {
        var iCounter = 0;
        var iTotal = 0;
        var iIndex = 0;
        try {
            iTotal = FCommon.Array.getLength(arrDefaultFilter);
            if (iTotal < 1) {
                return (arrAdvanceFilter);
            }

            if (FCommon.Array.getLength(arrAdvanceFilter) < 1) {
                return (arrDefaultFilter);
            }

            for (iCounter = 0; iCounter < arrDefaultFilter.length; iCounter++) {
                iIndex = FILTER.ADVANCEFILTER.getDataIndex(arrDefaultFilter[iCounter].FieldId, arrDefaultFilter[iCounter].SubParentId, arrAdvanceFilter, arrDefaultFilter[iCounter].CompareText, arrDefaultFilter[iCounter].CompareValue);
                if (iIndex == -2) {
                    arrDefaultFilter[iCounter].Conjuction = 2; // And
                    arrAdvanceFilter.push(arrDefaultFilter[iCounter]);
                }
                else if (iIndex.toString().indexOf(',') > 0) {
                    //There are already multiple conditions for some same fields. They will get deleted and only one condition for the respective field. Do you want to continue?
                    var retVal = confirm(document.getElementById('idmsgDefaultFilterConfirm').value);
                    if (retVal == false) {
                        return (arrAdvanceFilter);
                    }
                    var arriIndex = iIndex.toString().split(',');
                    if (arriIndex != null) {
                        if (arriIndex.length > 0) {
                            for (var i = 0; i < arriIndex.length; i++) {
                                arrAdvanceFilter.splice(arriIndex[i], arriIndex.length);
                            }
                            if (arrDefaultFilter.length > 0) {
                                arrDefaultFilter[iCounter].Conjuction = 2; // And
                            }
                            else {
                                arrDefaultFilter[iCounter].Conjuction = 1; // Where
                            }
                            arrAdvanceFilter.push(arrDefaultFilter[iCounter]);
                        }
                    }
                }
                else if (iIndex >= 0) {
                    arrAdvanceFilter[iIndex].CompareText = arrDefaultFilter[iCounter].CompareText;
                    arrAdvanceFilter[iIndex].CompareValue = arrDefaultFilter[iCounter].CompareValue;
                }
                switch (parseInt(arrDefaultFilter[iCounter].DataType)) {
                    case MasterDataType.get('TEXT'):
                    case MasterDataType.get('NUMBER'):
                    case MasterDataType.get('FRACTION'):
                    case MasterDataType.get('BIGNUMBER'):
                    case MasterDataType.get('SMALLNUMBER'):
                    case MasterDataType.get('TINYNUMBER'):
                        document.getElementById(arrDefaultFilter[iCounter].CtrlId).value = '';
                        break;
                    case MasterDataType.get('BOOLEAN'):
                    case MasterDataType.get('DATETIME'):
                    case MasterDataType.get('DATE'):
                    case MasterDataType.get('TIME'):
                        break;
                    case MasterDataType.get('NUMBERLIST'):
                    case MasterDataType.get('STRINGLIST'):
                        break;
                    case MasterDataType.get('MASTER'):
                    case MasterDataType.get('EXTERNALTABLE'):
                        OPTIONCONTROL.clear(document.getElementById(arrDefaultFilter[iCounter].CtrlId));
                        break;
                }
            }
        }
        catch (err) {
            alert("Exception: {FILTER.mergeDefaultFilterData} " + err.message);
        }
        return (arrAdvanceFilter);
    },

    Clear: function (iFilterId, iSubFilterId, showConfirmation) {
        try {
            //FILTER.setContrlOrgParent(iFilterId, iSubFilterId);
            FILTER.ClearDefaultFilter(iFilterId, iSubFilterId)
            FILTER.ADVANCEFILTER.resetAdvanceFilter(iFilterId, iSubFilterId);
            bConditionChanged = false;
        }
        catch (err) {
            alert("Exception: {FILTER.Clear} " + err.message);
        }
    },

    ClearDefaultFilter: function (iFilterId, iSubFilterId, sFrom) {
        try {
            var sDefaultFilterId = FILTER.getDefaultFilterId(iFilterId, iSubFilterId, sFrom);
            if (document.getElementById(sDefaultFilterId) != null) {
                var DefaultFields = document.getElementById(sDefaultFilterId).children;
                if (DefaultFields.length > 0) {
                    for (var iCount = 0; iCount < DefaultFields.length; iCount++) {
                        var Field = document.getElementById(sDefaultFilterId + iCount)
                        if (Field != null) {
                            var FieldType = Field.dataset.datatype;
                            switch (parseInt(FieldType)) {
                                case MasterDataType.get('TEXT'):
                                case MasterDataType.get('NUMBER'):
                                case MasterDataType.get('FRACTION'):
                                case MasterDataType.get('BIGNUMBER'):
                                case MasterDataType.get('SMALLNUMBER'):
                                case MasterDataType.get('TINYNUMBER'):
                                    Field.value = "";
                                    Field.dataset.ischanged = false;
                                    break;
                                case MasterDataType.get('BOOLEAN'):
                                    Field.checked = false;
                                    Field.dataset.ischanged = false;
                                    break;
                                case MasterDataType.get('DATETIME'):
                                    break;
                                case MasterDataType.get('DATE'):
                                    DATEPICKER.clear("DatePicker_" + Field.id);
                                    document.getElementById("DatePicker_" + Field.id).dataset.ischanged = false;
                                    break;
                                case MasterDataType.get('TIME'):
                                    FTIMECONTROL.clear("TimeCtrl_" + Field.id);
                                    document.getElementById("TimeCtrl_" + Field.id).dataset.ischanged = false;
                                    break;
                                case MasterDataType.get('NUMBERLIST'):
                                case MasterDataType.get('STRINGLIST'):
                                    Field.value = 0;
                                    Field.dataset.ischanged = false;
                                    //sCompareText = document.getElementById("filterValue_" + iCounter).text;
                                    break;
                                case MasterDataType.get('MASTER'):
                                case MasterDataType.get('EXTERNALTABLE'):
                                    OPTIONCONTROL.setControlValue("FOption_" + Field.id, 0);
                                    break;
                            }
                        }
                    }
                }
            }
        }
        catch (err) {
            alert("Exception: {FILTER.ClearDefaultFilter} " + err.message);
        }
    },

    getIsAllConditionsValid: function (iFilterId, iSubFilterId, sFrom) {
        try {
            var sAdvanceFilterId = FILTER.getAdvanceFilterId(iFilterId, iSubFilterId, sFrom);
            if (document.getElementById(sAdvanceFilterId).dataset.invalid == 'true')
                return false;
            else
                return true;
        }
        catch (err) {
            alert("Exception: {FILTER.getIsAllConditionsValid} " + err.message);
        }
    },

    OpenFieldCustPopup: function (iFilterId, iSubFilterId) {
        try {
            var FilterId = FILTER.getFilterId(iFilterId, iSubFilterId);
            var fullScreen = document.getElementById("fullScreen");
            if (fullScreen != null) {
                var element = document.getElementById("FilterFieldCust_" + FilterId);
                element.style.display = "";
                //loop to check the selected fields and mark as ticked.
                var eleFilterTree = element.children[0];
                if (FCommon.UI.isValidObject(eleFilterTree)) {
                    if (FCommon.UI.isValidObject(eleFilterTree.children[1])) {
                        var eleBody = eleFilterTree.children[1].children[0];

                    }
                }
                $(fullScreen).html(element);
            }
            $(fullScreen).modal('show');
        }
        catch (err) {
            alert("Exception: {FILTER.OpenFieldCustPopup} " + err.message);
        }
    },

    FieldCustPopupClose: function (iFilterId, iSubFilterId, sFrom) {
        try {
            var AdvanceFilterId = FILTER.getAdvanceFilterId(iFilterId, iSubFilterId, sFrom);
            var element = document.getElementById("FilterFieldCust_" + iFilterId)
            if (AdvanceFilterId != null && element != null) {
                element.style.display = "none";
                AdvanceFilterId.parentNode.appendChild(element);
            }
            var treeElement = document.getElementsByClassName("Fchkbox");
            if (treeElement != null) {
                var sDefaultFilterId = FILTER.getDefaultFilterId(iFilterId, iSubFilterId, sFrom);
                var defaulFilter = document.getElementById(sDefaultFilterId);
                for (var iTreeRow = 0; iTreeRow < treeElement.length; iTreeRow++) {
                    var sTreeItem = treeElement[iTreeRow].parentNode.getAttribute('data-text');
                    var iFieldRow = 0;
                    treeElement[iTreeRow].checked = false;
                    while (iFieldRow < defaulFilter.childNodes.length) {
                        var sFieldItem = defaulFilter.childNodes[iFieldRow].getElementsByTagName('Label')[0].title;
                        if (sTreeItem == sFieldItem) {
                            treeElement[iTreeRow].checked = true;
                            break;
                        }
                        iFieldRow++;
                    }
                }
            }
            $("#fullScreen").modal('hide');
        }
        catch (err) {
            alert("Exception: {FILTER.FieldCustPopupClose} " + err.message);
        }
    },

    SaveFilterCustomizeFields: function (iFilterId, iSubFilterId, sFrom) {
        try {
            var Fields = document.getElementById("FilterFields_" + iFilterId + "_" + iSubFilterId).children;
            var arrFields = [];
            for (var count = 0; count < Fields.length; count++) {
                var chkbox = Fields[count].children[0].children[0].children[0];
                if (chkbox.checked == true) {
                    arrFields.push(chkbox.id);
                }
            }
            result = NETWORK.executeServerMethod(
                                    GLOBAL.getContextPath("SaveFilterCustomFields", "Home", ""),
                                    true,
                                    { CustomFields: { FilterId: iFilterId, SubFilterId: iSubFilterId, Fields: arrFields } },
                                    "",
                                    true,
                                    "FILTER.SaveFilterCustomizeFieldsSuccess",
                                    "GLOBAL.LoadingStart",
                                    "GLOBAL.LoadingEnd",
                                    { iFilterId: iFilterId, iSubFilterId: iSubFilterId, sFrom: sFrom }
                   );
        }
        catch (err) {
            alert("Exception: {FILTER.SaveFilterCustomizeFields} " + err.message);
        }
    },

    SaveFilterCustomizeFieldsSuccess: function (bSuccess, html, tag) {
        try {
            if (bSuccess == true) {
                var DefaultFilter = document.getElementById(FILTER.getDefaultFilterId(tag.iFilterId, tag.iSubFilterId, tag.sFrom));
                if (DefaultFilter != null) {
                    $(DefaultFilter).html(html);
                }
                FILTER.FieldCustPopupClose(tag.iFilterId, tag.iSubFilterId, tag.sFrom);
            }
        }
        catch (err) {
            alert("Exception: {FILTER.SaveFilterCustomizeFieldsSuccess} " + err.message);
        }
    },

    getDefaultFilterId: function (iFilterId, iSubFilterId, sFrom) {
        if (sFrom == undefined || sFrom == '') {
            return iFilterId + "_" + iSubFilterId + "_DefaultFilter";
        }
        else {
            return iFilterId + "_" + iSubFilterId + "_DefaultFilter" + "_" + sFrom;
        }
    },

    getAdvanceFilterId: function (iFilterId, iSubFilterId, sFrom) {
        if (sFrom == undefined || sFrom == '') {
            return iFilterId + "_" + iSubFilterId + "_AdvanceFilter";
        }
        else {
            return iFilterId + "_" + iSubFilterId + "_AdvanceFilter" + "_" + sFrom;
        }
    },

    getContainerId: function (iFilterId, iSubFilterId) {
        return "ControlDiv_" + iFilterId + "_" + iSubFilterId + "_AdvanceFilter";
    },

    getFilterId: function (iFilterId, iSubFilterId) {
        return iFilterId + "_" + iSubFilterId;
    },

    getFilterTreeId: function (iFilterId, iSubFilterId, sFrom) {
        return "filterTree_" + FILTER.getAdvanceFilterId(iFilterId, iSubFilterId, sFrom);
    },

    getFilterDataTreeId: function (iFilterId, iSubFilterId, sFrom) {
        return "filterDataTree_" + FILTER.getAdvanceFilterId(iFilterId, iSubFilterId, sFrom);
    },

    getFilterDateRangeTreeId: function (iFilterId, iSubFilterId, sFrom) {
        return "dateRangeTree_" + FILTER.getAdvanceFilterId(iFilterId, iSubFilterId, sFrom);
    },

    getMasterOptionControlId: function (iFilterId, iSubFilterId) {
        return "advancefilter_master_" + iFilterId + "_" + iSubFilterId;
    },

    getTableOptionControlId: function (iFilterId, iSubFilterId, sFrom) {
        return "advancefilter_TableOptionControl_" + FILTER.getAdvanceFilterId(iFilterId, iSubFilterId, sFrom);
    },

    getDatePickerControlId: function (iFilterId, iSubFilterId, sFrom) {
        return "DatePickerControl_" + FILTER.getAdvanceFilterId(iFilterId, iSubFilterId, sFrom);
    },

    getTimeControlId: function (iFilterId, iSubFilterId, sFrom) {
        return "TimePickerControl_" + FILTER.getAdvanceFilterId(iFilterId, iSubFilterId, sFrom);
    },

    getSelectControlId: function (iFilterId, iSubFilterId) {
        return "advancefilter_SelectOptionControl_" + iFilterId + "_" + iSubFilterId;
    },

    getControlDivId: function (sAdvanceFilterId) {
        return "ControlDiv_" + sAdvanceFilterId;
    },

    SetState: function (ele) {
        ele.dataset.ischanged = true;
    },

    getFilterTreePosition: function (element) {
        try {
            if (element.className.indexOf("modal-dialog") > -1) {
                return 32;
            }
            else if (element.id == GLOBAL.getMainPageId()) {
                return 0;
            }
            else {
                return FILTER.getFilterTreePosition(element.parentNode);
            }
        }
        catch (err) {
            alert("Exception: {FILTER.getFilterTreePosition} " + err.message);
        }
    },

    getFilterTreeScrollHeight: function (element) {
        var height = 0;
        if (element == undefined || element.id == "mainDiv")
            return height;
        if (element.scrollHeight > 0)
            return element.scrollHeight;
        else
            return FILTER.getFilterTreeScrollHeight(element.parentNode);

    },

    //MasterOptionControlOnLeave: function (controlId, data) {
    //    try {
    //        var CompareValue = "";
    //        var ComapreText = "";
    //        var ParentDiv = OPTIONCONTROL.getParent(controlId).data;
    //        var arrIds = ParentDiv.id.split('_');
    //        var iFilterId = arrIds[1];
    //        var iSubFilterId = arrIds[2];
    //        var ext = arrIds[3].substring('AdvanceFilter'.length);
    //        if (parseInt(OPTIONCONTROL.getControlValue(controlId)) > 0) {
    //            var optionData = OPTIONCONTROL.getControlData(controlId);
    //            if (optionData.length > 0) {
    //                CompareValue = COMMON.prototype.getObjectFirstPropertyValue(optionData[0]);
    //                ComapreText = COMMON.prototype.getObjectFirstPropertyValue(optionData[1]);
    //            }
    //        }
    //        var input = document.createElement("input");
    //        input.type = "text";
    //        input.id = "OptCtrlTxtbox_" + iFilterId + "_" + iSubFilterId + "_" + ext;
    //        input.value = ComapreText;
    //        input.dataset.value = CompareValue;
    //        input.dataset.subparentid = iSubParentId;
    //        input.className = "Ftxtbox";
    //        input.readOnly = true;
    //        input.dataset.mastertypeid = OPTIONCONTROL.getMasterTypeId(controlId);
    //        input.setAttribute("onclick", "FILTER.getMasterOptionControl(this)");
    //        input.setAttribute("onfocus", "FILTER.getMasterOptionControl(this)");
    //        if (typeof (controlId) === 'object') {
    //            var sAdvanceFilterId = controlId.id.substring('MasterOptionControl_'.length);
    //        }
    //        else {
    //            var sAdvanceFilterId = controlId.substring('MasterOptionControl_'.length);
    //        }
    //        var ControlDiv = document.getElementById(FILTER.getControlDivId(sAdvanceFilterId));
    //        if (ControlDiv != null) {
    //            OPTIONCONTROL.setParent(controlId, ControlDiv);
    //        }
    //        ParentDiv.appendChild(input);
    //    }
    //    catch (err) {
    //        alert("Exception: {FILTER.getFilterTreePosition} " + err.message);
    //    }
    //},

    //TableOptionControlOnLeave: function (controlId, data) {
    //    try {
    //        var CompareValue = "";
    //        var ComapreText = "";
    //        var ParentDiv = OPTIONCONTROL.getParent(controlId).data;
    //        var arrIds = ParentDiv.id.split('_');
    //        var iFilterId = arrIds[1];
    //        var iSubFilterId = arrIds[2];
    //        var ext = arrIds[3].substring('AdvanceFilter'.length);
    //        if (parseInt(OPTIONCONTROL.getControlValue(controlId)) > 0) {
    //            var optionData = OPTIONCONTROL.getControlData(controlId);
    //            if (optionData.length > 0) {
    //                CompareValue = COMMON.prototype.getObjectFirstPropertyValue(optionData[0]);
    //                ComapreText = COMMON.prototype.getObjectFirstPropertyValue(optionData[1]);
    //            }
    //        }
    //        var input = document.createElement("input");
    //        input.type = "text";
    //        input.id = "TblCtrlTxtbox_" + iFilterId + "_" + iSubFilterId + "_" + ext;
    //        input.value = ComapreText;
    //        input.dataset.value = CompareValue;
    //        input.dataset.subparentid = iSubParentId;
    //        input.dataset.tablename = OPTIONCONTROL.getTableName(controlId);
    //        input.dataset.primaryfield = OPTIONCONTROL.getPrimaryField(controlId);
    //        input.dataset.displayfield = OPTIONCONTROL.getDisplayField(controlId);
    //        input.className = "Ftxtbox";
    //        input.readOnly = true;
    //        input.setAttribute("onclick", "FILTER.getTableOptionControl(this)");
    //        input.setAttribute("onfocus", "FILTER.getTableOptionControl(this)");
    //        if (typeof (controlId) === 'object') {
    //            var sAdvanceFilterId = controlId.id.substring('advancefilter_TableOptionControl_'.length);
    //        }
    //        else {
    //            var sAdvanceFilterId = controlId.substring('advancefilter_TableOptionControl_'.length);
    //        }
    //        var ControlDiv = document.getElementById(FILTER.getControlDivId(sAdvanceFilterId));
    //        if (ControlDiv != null)
    //            OPTIONCONTROL.setParent(controlId, ControlDiv);
    //        ParentDiv.appendChild(input);
    //    }
    //    catch (err) {
    //        alert("Exception: {FILTER.getFilterTreePosition} " + err.message);
    //    }
    //},

    //DatePickerControlOnLeave: function (controlId, data) {
    //    try {
    //        var CompareValue = DATEPICKER.getDate(controlId);
    //        var ComapreText = DATEPICKER.getText(controlId);
    //        var ParentDiv = DATEPICKER.getParent(controlId).data;
    //        var arrIds = ParentDiv.id.split('_');
    //        var iFilterId = arrIds[1];
    //        var iSubFilterId = arrIds[2];
    //        var ext = arrIds[3].substring('AdvanceFilter'.length);
    //        var input = document.createElement("input");
    //        input.type = "text";
    //        input.id = "DateCtrlTxtbox_" + iFilterId + "_" + iSubFilterId + "_" + ext;
    //        input.value = ComapreText;
    //        input.dataset.value = CompareValue;
    //        input.dataset.subparentid = iSubParentId;
    //        input.className = "Ftxtbox";
    //        input.readOnly = true;
    //        input.setAttribute("onclick", "FILTER.getDatePickerControl(this)");
    //        input.setAttribute("onfocus", "FILTER.getDatePickerControl(this)");
    //        if (typeof (controlId) === 'object') {
    //            var sAdvanceFilterId = controlId.id.substring('DatePickerControl_'.length);
    //        }
    //        else {
    //            var sAdvanceFilterId = controlId.substring('DatePickerControl_'.length);
    //        }
    //        var ControlDiv = document.getElementById(FILTER.getControlDivId(sAdvanceFilterId));
    //        if (ControlDiv != null)
    //            DATEPICKER.setParent(controlId, ControlDiv);
    //        ParentDiv.appendChild(input);
    //    }
    //    catch (err) {
    //        alert("Exception: {FILTER.DatePickerControlOnLeave} " + err.message);
    //    }
    //},

    //TimeControlOnLeave: function (controlId, data) {
    //    try {
    //        var CompareValue = FTIMECONTROL.getTime(controlId);
    //        var ComapreText = FTIMECONTROL.getText(controlId);
    //        var ParentDiv = FTIMECONTROL.getParent(controlId).data;
    //        var arrIds = ParentDiv.id.split('_');
    //        var iFilterId = arrIds[1];
    //        var iSubFilterId = arrIds[2];
    //        var ext = arrIds[3].substring('AdvanceFilter'.length);
    //        var input = document.createElement("input");
    //        input.type = "text";
    //        input.id = "TimeCtrlTxtbox_" + iFilterId + "_" + iSubFilterId + "_" + ext;
    //        input.value = ComapreText;
    //        input.dataset.value = CompareValue;
    //        input.dataset.subparentid = iSubParentId;
    //        input.className = "Ftxtbox";
    //        input.readOnly = true;
    //        input.setAttribute("onclick", "FILTER.getTimeControl(this)");
    //        input.setAttribute("onfocus", "FILTER.getTimeControl(this)");
    //        if (typeof (controlId) === 'object') {
    //            var sAdvanceFilterId = controlId.id.substring('TimePickerControl_'.length);
    //        }
    //        else {
    //            var sAdvanceFilterId = controlId.substring('TimePickerControl_'.length);
    //        }
    //        var ControlDiv = document.getElementById(FILTER.getControlDivId(sAdvanceFilterId));
    //        if (ControlDiv != null)
    //            FTIMECONTROL.setParent(controlId, ControlDiv);
    //        ParentDiv.appendChild(input);
    //    }
    //    catch (err) {
    //        alert("Exception: {FILTER.TimeControlOnLeave} " + err.message);
    //    }
    //},

    getMasterOptionControl: function (element) {
        try {
            var arrIds = element.id.split('_');
            var iFilterId = arrIds[1];
            var iSubFilterId = arrIds[2];
            var MasterOptionControl = FILTER.getMasterOptionControlId(iFilterId, iSubFilterId);
            var ParentDiv = element.parentNode;
            OPTIONCONTROL.clear(MasterOptionControl, false);

            OPTIONCONTROL.setMasterTypeId(MasterOptionControl, element.dataset.mastertypeid);
            OPTIONCONTROL.setControlValue(MasterOptionControl, element.dataset.value);
            element.parentNode.removeChild(element);
            if (ParentDiv != null)
                OPTIONCONTROL.setParent(MasterOptionControl, ParentDiv);
        }
        catch (err) {
            alert("Exception: {FILTER.getMasterOptionControl} " + err.message);
        }
    },

    getTableOptionControl: function (element) {
        try {
            var arrIds = element.id.split('_');
            var iFilterId = arrIds[1];
            var iSubFilterId = arrIds[2];
            var TableOptionControl = FILTER.getTableOptionControlId(iFilterId, iSubFilterId);
            var ParentDiv = element.parentNode;
            OPTIONCONTROL.clear(TableOptionControl, false);
            OPTIONCONTROL.setTableName(TableOptionControl, element.dataset.tablename);
            OPTIONCONTROL.setPrimaryField(TableOptionControl, element.dataset.primaryfield);
            OPTIONCONTROL.setDisplayField(TableOptionControl, element.dataset.displayfield);
            OPTIONCONTROL.setControlValue(TableOptionControl, element.dataset.value);
            element.parentNode.removeChild(element);
            if (ParentDiv != null)
                OPTIONCONTROL.setParent(TableOptionControl, ParentDiv);
        }
        catch (err) {
            alert("Exception: {FILTER.getTableOptionControl} " + err.message);
        }
    },

    getDatePickerControl: function (element) {
        try {
            var arrIds = element.id.split('_');
            var iFilterId = arrIds[1];
            var iSubFilterId = arrIds[2];
            var DateControl = FILTER.getDatePickerControlId(iFilterId, iSubFilterId);
            var ParentDiv = element.parentNode;
            DATEPICKER.clear(DateControl, false);
            DATEPICKER.setDate(DateControl, element.dataset.value);
            element.parentNode.removeChild(element);
            if (ParentDiv != null)

                DATEPICKER.setParent(DateControl, ParentDiv);
        }
        catch (err) {
            alert("Exception: {FILTER.getDatePickerControl} " + err.message);
        }
    },

    getTimeControl: function (element) {
        try {
            var arrIds = element.id.split('_');
            var iFilterId = arrIds[1];
            var iSubFilterId = arrIds[2];
            var TimeControl = FILTER.getTimeControlId(iFilterId, iSubFilterId);
            var ParentDiv = element.parentNode;
            FTIMECONTROL.clear(TimeControl, false);
            FTIMECONTROL.setTime(TimeControl, element.dataset.value);
            element.parentNode.removeChild(element);
            if (ParentDiv != null)

                FTIMECONTROL.setParent(TimeControl, ParentDiv);
        }
        catch (err) {
            alert("Exception: {FILTER.getTimeControl} " + err.message);
        }
    },

    getDataType: function (arrData, parentId) {
        try {
            if (arrData != null && arrData != undefined) {
                for (var count = 0; count < arrData.length; count++) {
                    if (parseInt(parentId) == parseInt(arrData[count].iFieldId) && arrData[count].bGroup == true) {
                        return arrData[count].iDataTypeId;
                    }
                }
            }
            return 0;
        }
        catch (err) {
            alert("Exception: {FILTER.getDataType} " + err.message);
        }
    },

    getMasterId: function (arrData, parentId) {
        try {
            if (arrData != null && arrData != undefined) {
                for (var count = 0; count < arrData.length; count++) {
                    if (parseInt(parentId) == parseInt(arrData[count].iFieldId) && arrData[count].bGroup == true) {
                        return arrData[count].iMasterLink;
                    }
                }
            }
            return 0;
        }
        catch (err) {
            alert("Exception: {FILTER.getMasterId} " + err.message);
        }
    },

    CollapseFilterTree: function () {
        try {
            var dateRangeTree = document.getElementsByClassName("dateRangeTree");
            if (dateRangeTree != null) {
                for (var iCount = 0; iCount < dateRangeTree.length; iCount++) {
                    dateRangeTree[iCount].style.display = "none";
                }
            }
            var filterTree = document.getElementsByClassName("filterTree");
            if (filterTree != null) {
                for (var iCount = 0; iCount < filterTree.length; iCount++) {
                    filterTree[iCount].style.display = "none";
                }
            }
        }
        catch (err) {
            alert("Exception: {FILTER.CollapseFilterTree} " + err.message);
        }
    },

    GetDataTypeText: function (datatype) {
        try {
            if (DATATYPE.hasOwnProperty) {
                for (key in DATATYPE) {
                    if (DATATYPE[key] == parseInt(datatype)) {
                        return key.toString();
                    }
                }
            }
        }
        catch (err) {
            alert("Exception: {FILTER.GetDataTypeText} " + err.message);
        }
    },

    removeFilterFieldPopup: function () {
        var iCounter = 0;
        var arrAdvanceFilterTreeParent = null;
        var arrControlDiv = null;
        try {
            arrAdvanceFilterTreeParent = document.getElementsByClassName("FAdvanceFilterField open");
            if (arrAdvanceFilterTreeParent.length > 0 && arrAdvanceFilterTreeParent[0].children.length > 1) {
                while (iCounter < arrAdvanceFilterTreeParent.length) {
                    var filterTree = arrAdvanceFilterTreeParent[iCounter].children[1];
                    if (FCommon.UI.isValidObject(filterTree) == false) {
                        return;
                    }
                    arrAdvanceFilterTreeParent[iCounter].className = "FAdvanceFilterField";
                    arrControlDiv = document.getElementsByClassName("FAdvanceFilterFieldHideDiv");
                    if (FCommon.UI.isValidObject(arrControlDiv[iCounter])) {
                        arrControlDiv[iCounter].appendChild(filterTree);
                    }
                    iCounter += 1;
                }
            }
        }
        catch (err) {
            alert("Exception: {FILTER.removeFilterFieldPopup} " + err.message);
        }
    },

    setFilter: function (iFilterId, iSubFilterId, arrFilterobj, sFrom) {
        try {
            var sAdvanceFilterId = FILTER.getAdvanceFilterId(iFilterId, iSubFilterId, sFrom);
            var sDefaultFilterId = FILTER.getDefaultFilterId(iFilterId, iSubFilterId, sFrom);
            var defaulFilter = document.getElementById(sDefaultFilterId);
            if (arrFilterobj != null && defaulFilter != null && defaulFilter.style.display == "block") {
                var filterlabel = document.getElementById("filterLabel_" + sDefaultFilterId);
                if (filterlabel != null) {
                    filterlabel.textContent = arrFilterResourceMsgs.AdvanceFilter;
                    bAdvanceFilter = true;
                }
            }
            else {
                var filterlabel = document.getElementById("filterLabel_" + sDefaultFilterId);
                if (filterlabel != null)
                    filterlabel.textContent = arrFilterResourceMsgs.grbDefaultFilter;
                bAdvanceFilter = false;
            }
            FILTER.Clear(iFilterId, iSubFilterId, false);
            if (arrFilterobj != null && arrFilterobj != undefined && arrFilterobj.length > 0) {
                FILTER.displayAdvanceFilter(arrFilterobj, iFilterId, iSubFilterId, false, sFrom);
                document.getElementById(sAdvanceFilterId).style.display = "block";
                if (document.getElementById(sDefaultFilterId) != null)
                    document.getElementById(sDefaultFilterId).style.display = "none";
            }
            else {
                if (document.getElementById(sDefaultFilterId) != null) {
                    document.getElementById(sAdvanceFilterId).style.display = "none";
                    document.getElementById(sDefaultFilterId).style.display = "block";
                }
            }
        }
        catch (err) {
            alert("Exception: {FILTER.setFilter} " + err.message);
        }
    },

    ToggleField_Mouseover: function (ele, iFilterId, iSubFilterId, sFrom) {
        try {
            var defaulFilter = document.getElementById(FILTER.getDefaultFilterId(iFilterId, iSubFilterId, sFrom));
            if (FCommon.UI.isValidObject(defaulFilter) == true) {
                if (defaulFilter.getBoundingClientRect().top > 0) {
                    ele.title = ele.getAttribute('data-titleDef');
                }
                else {
                    ele.title = ele.getAttribute('data-titleAdv');
                }
            }
        }
        catch (err) {
            alert("Exception: {FILTER.ToggleField_Mouseover} " + err.message);
        }
    },

    ADVANCEFILTER: {

        // Internal
        getMasterOptionControlId: function (iFilterId, iSubFilterId) {
            return "advancefilter_master_" + iFilterId + "_" + iSubFilterId;
        },

        // Internal
        getTableOptionControlId: function (iFilterId, iSubFilterId) {
            return "advancefilter_TableOptionControl_" + iFilterId + "_" + iSubFilterId;
        },

        // Internal
        getDatePickerControlId: function (iFilterId, iSubFilterId) {
            return "advancefilter_date_" + iFilterId + "_" + iSubFilterId;
        },

        // Internal
        getTimeControlId: function (iFilterId, iSubFilterId) {
            return ("advancefilter_time_" + iFilterId + "_" + iSubFilterId);
        },

        // Internal
        getSelectControlId: function (iFilterId, iSubFilterId) {
            return "advancefilter_SelectOptionControl_" + iFilterId + "_" + iSubFilterId;
        },

        // Called when conjuction(where, and, or....) is changed
        conjuction_Change: function (eleSelect, evt) {
            var iIndex = 0;
            var eleTr = null;

            try {
                eleTr = eleSelect.parentElement.parentElement;
                iIndex = FCommon.UI.getElementPosition(eleTr);

                if (iIndex < 1) { // Some error
                    return;
                }
                iIndex--;

                if (iIndex == 0) {
                    eleSelect.selectedIndex = 1;
                }
                else if (eleSelect.selectedIndex < 3) {
                    eleSelect.selectedIndex = 3;
                }
            }
            catch (err) {
                alert("Exception: {FILTER.ADVANCEFILTER.conjuction_Change} " + err.message);
            }
        },

        // Called when compare type(value, formula, field, date range) is changed
        compareWith_Change: function (eleSelect, iFilterId, iSubFilterId, evt, sFrom) {
            var eleRow = null;
            var objField = null;
            var iValue = 0;
            try {
                FILTER.ADVANCEFILTER.setFieldValue(eleSelect.parentElement.parentElement, null, '');
                if (eleSelect.selectedIndex <= 0) {
                    return;
                }
                eleSelect.parentElement.nextElementSibling.children[0].readOnly = false;
                iValue = FConvert.toInt(eleSelect.options[eleSelect.selectedIndex].value);
                switch (iValue) {
                    case 0: // value
                        FILTER.ADVANCEFILTER.valueField_Click(eleSelect.parentElement.nextElementSibling.children[0], iFilterId, iSubFilterId, evt, sFrom);
                        break;
                    case 1: // formula                    
                        break;
                    case 2: // field
                        FILTER.ADVANCEFILTER.valueField_Click(eleSelect.parentElement.nextElementSibling.children[0], iFilterId, iSubFilterId, evt, sFrom);
                        break;
                    case 3: // date range
                        eleSelect.parentElement.nextElementSibling.children[0].readOnly = true;
                        break;
                }
            }
            catch (err) {
                alert("Exception: {FILTER.ADVANCEFILTER.compareWith_Change} " + err.message);
            }
        },

        // Called when operater(equal, notequal....) is changed in selection
        operator_Change: function (eleSelect, iFilterId, iSubFilterId, evt) {
            bchange = true;
            var eleTr = null;
            var eleTd = null;
            var iDataType = null;
            var fieldtype = null;
            var operator = null;
            var eleTxt = null;
            try {
                eleTr = eleSelect.parentElement.parentElement;
                eleTd = eleSelect.parentElement;
                eleTr.parentElement.dataset.parentid = undefined;
                iDataType = FConvert.toInt(eleTd.previousElementSibling.children[0].dataset.datatype);
                operator = parseInt(eleSelect.value);

                switch (iDataType) {
                    case MasterDataType.get('TEXT'):
                        if (operator != FilterOperator.get('Equalto') &&
                            operator != FilterOperator.get('NotEqualto') &&
                            operator != FilterOperator.get('IsBlank') &&
                            operator != FilterOperator.get('IsNotBlank') &&
                            operator != FilterOperator.get('BeginWith') &&
                            operator != FilterOperator.get('DoesNotBeginWith') &&
                            operator != FilterOperator.get('Contains')) {
                            COMMON.prototype.showMessage(arrFilterResourceMsgs.msgOperatorInvalid, "Error");
                            eleSelect.value = -1;
                            return true;
                        }
                        break;
                    case MasterDataType.get('NUMBER'):
                    case MasterDataType.get('FRACTION'):
                    case MasterDataType.get('BIGNUMBER'):
                    case MasterDataType.get('TINYNUMBER'):
                    case MasterDataType.get('SMALLNUMBER'):
                        if (operator != FilterOperator.get('Equalto') &&
                            operator != FilterOperator.get('NotEqualto') &&
                            operator != FilterOperator.get('Lessthan') &&
                            operator != FilterOperator.get('Greaterthan') &&
                             operator != FilterOperator.get('Lessthanorequalto') &&
                            operator != FilterOperator.get('Greaterthanorequalto')) {
                            COMMON.prototype.showMessage(arrFilterResourceMsgs.msgOperatorInvalid, "Error");
                            eleSelect.value = -1;
                            return true;
                        }
                        break;
                    case MasterDataType.get('NUMBERLIST'):
                        if (operator != FilterOperator.get('Equalto') &&
                            operator != FilterOperator.get('NotEqualto')) {
                            COMMON.prototype.showMessage(arrFilterResourceMsgs.msgOperatorInvalid, "Error");
                            eleSelect.value = -1;
                            return true;
                        }
                        break;
                    case MasterDataType.get('STRINGLIST'):
                        if (operator != FilterOperator.get('Equalto') &&
                            operator != FilterOperator.get('NotEqualto')) {
                            COMMON.prototype.showMessage(arrFilterResourceMsgs.msgOperatorInvalid, "Error");
                            eleSelect.value = -1;
                            return true;
                        }
                        break;
                    case MasterDataType.get('BOOLEAN'):
                        if (operator != FilterOperator.get('Equalto') &&
                            operator != FilterOperator.get('NotEqualto')) {
                            COMMON.prototype.showMessage(arrFilterResourceMsgs.msgOperatorInvalid, "Error");
                            eleSelect.value = -1;
                            return true;
                        }
                        break;
                    case MasterDataType.get('DATETIME'):
                    case MasterDataType.get('DATE'):
                    case MasterDataType.get('TIME'):
                        if (operator != FilterOperator.get('Equalto') &&
                            operator != FilterOperator.get('NotEqualto') &&
                            operator != FilterOperator.get('Lessthan') &&
                           operator != FilterOperator.get('Greaterthan') &&
                            operator != FilterOperator.get('Lessthanorequalto') &&
                           operator != FilterOperator.get('Greaterthanorequalto')) {
                            COMMON.prototype.showMessage(arrFilterResourceMsgs.msgOperatorInvalid, "Error");
                            eleSelect.value = -1;
                            return true;
                        }
                        break;
                    case MasterDataType.get('MASTER'):
                    case MasterDataType.get('EXTERNALTABLE'):
                        if (operator != FilterOperator.get('Equalto') &&
                          operator != FilterOperator.get('NotEqualto')) {
                            COMMON.prototype.showMessage(arrFilterResourceMsgs.msgOperatorInvalid, "Error");
                            eleSelect.value = -1;
                            return true;
                        }
                        break;
                }

                //Hide CompareWith and Value fields if selected operator is "IsBlank" or "IsNotBlank".
                if (operator == FilterOperator.get('IsBlank') || operator == FilterOperator.get('IsNotBlank')) {
                    eleTr.children[3].children[0].style.display = "none";
                    eleTr.children[4].children[0].style.display = "none";
                }
                else {
                    eleTr.children[3].children[0].style.display = "";
                    eleTr.children[4].children[0].style.display = "";
                }
            }
            catch (err) {
                alert("Exception: {FILTER.ADVANCEFILTER.operator_Change} " + err.message);
            }
        },

        //Internal
        getElementInsideContainer: function (container, childID, parentID) {
            try {
                var iParentID = 0;
                var ele = {};
                var eles = document.getElementById(container.id).getElementsByTagName("*");
                for (var i = 0; i < eles.length; i++) {
                    iParentID = eles[i].getAttribute('data-subparent');
                    if (eles[i].id === childID && iParentID == parentID) {
                        ele = eles[i];
                        break;
                    }
                }
                return ele;
            }
            catch (err) {
                alert("Exception: {FILTER.ADVANCEFILTER.getElementInsideContainer} " + err.message);
            }
        },

        //Internal
        collapsingElementsInsideContainer: function (container, tagname) {
            try {
                var eles = document.getElementById(container.id).getElementsByTagName(tagname);
                var eleParent = null;
                var eleCollapseIcon = null;
                var iMasterId = 0;
                if (eles.length > 0) {
                    for (var i = 1; i < eles.length; i++) {
                        if (FCommon.UI.isValidObject(eles[i])) {
                            iMasterId = eles[i].getAttribute('data-masterid');
                            if (iMasterId != null) {
                                eleParent = eles[i].parentElement;
                                if (eleParent.tagName == 'LI') {
                                    eleParent.parentElement.style.display = "none";
                                    eleCollapseIcon = eleParent.parentElement.parentElement;
                                    if (FCommon.UI.isValidObject(eleCollapseIcon)) {
                                        if (eleCollapseIcon.children.length > 0) {
                                            if (eleCollapseIcon.children[0].children[0].className == "icon-down-arrow") {
                                                eleCollapseIcon.children[0].children[0].className = "icon-right-arrow";
                                            }
                                        }
                                    }
                                }
                            }
                            $(eles[i]).css("background-color", "");
                        }
                    }
                    if (FCommon.UI.isValidObject(eles[0])) {
                        eleParent = eles[0].parentElement;
                        if (eleParent.tagName == 'LI') {
                            eleParent.parentElement.style.display = "";
                        }
                        $(eles[0]).focus();
                        $(eles[0]).css("background-color", "");
                    }
                }
            }
            catch (err) {
                alert("Exception: {FILTER.ADVANCEFILTER.collapsingElementsInsideContainer} " + err.message);
            }
        },

        // Called when click on field column
        getFiledsTree_Click: function (eleTxt, evt) {
            var eleTable = null;
            var FilterTree = null;
            var eleTreeField = null;
            var eleParentofeleTreeField = null;
            var eleCollapseIcon = null;
            var iFilterId = 0;
            var iSubFilterId = 0;
            var ieleTxtFieldId = 0;
            var ieleTxtParentId = 0;
            try {
                eleTable = eleTxt.parentElement.parentElement.parentElement.parentElement;
                iFilterId = eleTable.getAttribute('data-filterid');
                iSubFilterId = eleTable.getAttribute('data-subfilterid');
                var sFrom = eleTxt.getAttribute('data-sFrom');
                FilterTree = document.getElementById(FILTER.getFilterTreeId(iFilterId, iSubFilterId, sFrom));

                //Code to show the saved valued as selected in the tree.
                if (FCommon.UI.isValidObject(FilterTree) == false) {
                    return;
                }
                ieleTxtFieldId = eleTxt.getAttribute('data-fieldid');
                ieleTxtParentId = eleTxt.getAttribute('data-subparent');
                FILTER.ADVANCEFILTER.collapsingElementsInsideContainer(FilterTree, 'A');
                if (ieleTxtFieldId != 0) {
                    eleTreeField = FILTER.ADVANCEFILTER.getElementInsideContainer(FilterTree, ieleTxtFieldId, ieleTxtParentId);
                }
                //

                FilterTree.style.top = "auto";
                {
                    $(eleTxt.parentNode).toggleClass("open");
                    eleTxt.parentElement.appendChild(FilterTree);
                    FCommon.UI.setFocusDropdownPopupPosition(eleTxt, FilterTree);
                }
                FilterTree.style.display = "block";
                //Code to show the saved valued as selected in the tree.
                if (FCommon.UI.isValidObject(eleTreeField)) {
                    eleParentofeleTreeField = eleTreeField.parentElement;
                    if (FCommon.UI.isValidObject(eleParentofeleTreeField)) {
                        if (eleParentofeleTreeField.tagName == 'LI') {
                            eleParentofeleTreeField.parentElement.style.display = "";
                            eleCollapseIcon = eleParentofeleTreeField.parentElement.parentElement;
                            if (eleCollapseIcon.children[0].children[0].className == "icon-right-arrow") {
                                eleCollapseIcon.children[0].children[0].className = "icon-down-arrow";
                            }
                        }
                    }
                    $(eleTreeField).focus();
                    $(eleTreeField).css("background-color", "#9ecaed");
                }
                //
            }
            catch (err) {
                alert("Exception: {FILTER.ADVANCEFILTER.getFiledsTree_Click} " + err.message);
            }
        },

        // Called when click on field value
        valueField_Click: function (eleTxt, iFilterId, iSubFilterId, evt) {
            var eleRow = null;
            var sCtrlId = "";
            var value = null;
            var eleChild = null;
            var eleParent = null;
            var containerID = "";
            var arrNumberList = null;
            try {
                eleRow = eleTxt.parentElement.parentElement;
                var sFrom = eleRow.children[1].children[0].getAttribute('data-sFrom');
                var compareType = FILTER.ADVANCEFILTER.getCompareType(eleRow);
                var objFieldData = FILTER.ADVANCEFILTER.getField(eleRow);
                if (compareType == -1) {
                    COMMON.prototype.showMessage(arrFilterResourceMsgs.msgSelectCompareWith, "Error");
                }
                else {
                    switch (parseInt(compareType)) {
                        case RD_CompareWith.get('VALUE'):
                            switch (objFieldData.DataType) {
                                case MasterDataType.get("STRINGLIST"):
                                case MasterDataType.get("NUMBERLIST"):
                                    arrNumberList = eleRow.children[1].children[0].getAttribute('data-numberlist').split(',');
                                    sCtrlId = FILTER.ADVANCEFILTER.getSelectControlId(iFilterId, iSubFilterId);
                                    eleChild = document.getElementById(sCtrlId);
                                    FILTER.ADVANCEFILTER.removeOptions(eleChild);
                                    eleTxt.type = "text";
                                    eleTxt.style.display = "none";
                                    containerID = FILTER.getContainerId(iFilterId, iSubFilterId);
                                    eleChild.parentElement = eleTxt.parentElement;
                                    for (var i = 0; i < arrNumberList.length; i = i + 2) {
                                        var option = document.createElement("option");
                                        option.value = parseInt(arrNumberList[i]);
                                        option.textContent = arrNumberList[i + 1];
                                        eleChild.appendChild(option);
                                    }
                                    if (FCommon.String.isNullOrEmpty(eleTxt.getAttribute('data-value')) == false) {
                                        eleChild.selectedIndex = FConvert.toInt(eleTxt.getAttribute('data-value')) - 1;
                                    }
                                    else {
                                        eleChild.selectedIndex = -1;
                                    }
                                    eleParent = eleTxt.parentElement;
                                    eleParent.appendChild(eleChild);
                                    eleChild.style.display = "";
                                    eleChild.focus();
                                    break;
                                case MasterDataType.get("MASTER"):
                                    if (objFieldData.iMasterTypeId > 0) {
                                        if (sFrom == undefined || sFrom == '') {
                                            sCtrlId = "advancefilter_master_" + iFilterId + "_" + iSubFilterId;
                                        }
                                        else {
                                            sCtrlId = "advancefilter_master_" + iFilterId + "_" + iSubFilterId + "_" + sFrom;
                                        }
                                        eleTxt.type = "text";
                                        eleTxt.style.display = "none";
                                        OPTIONCONTROL.setParent(sCtrlId, eleTxt.parentElement);
                                        OPTIONCONTROL.setMasterTypeId(sCtrlId, objFieldData.iMasterTypeId);
                                        OPTIONCONTROL.clear(sCtrlId);                                        
                                        var sFilter = '';
                                        sFilter = eleRow.children[1].children[0].getAttribute('data-sfilter');
                                        if (sFilter != "undefined") {
                                            OPTIONCONTROL.setFilter(sCtrlId, sFilter);
                                        }
                                        OPTIONCONTROL.setControlValue(sCtrlId, FConvert.toInt(FILTER.ADVANCEFILTER.getFieldValue(eleRow)));
                                        FCommon.UI.setFocus(sCtrlId);
                                    }
                                    break;
                                case MasterDataType.get("EXTERNALTABLE"):
                                    if (objFieldData.tablename != "") {
                                        if (sFrom == undefined || sFrom == '') {
                                            sCtrlId = "advancefilter_TableOptionControl_" + iFilterId + "_" + iSubFilterId;
                                        }
                                        else {
                                            sCtrlId = "advancefilter_TableOptionControl_" + iFilterId + "_" + iSubFilterId + "_" + sFrom;
                                        }
                                        eleTxt.type = "text";
                                        eleTxt.style.display = "none";
                                        OPTIONCONTROL.setParent(sCtrlId, eleTxt.parentElement);
                                        OPTIONCONTROL.setTableName(sCtrlId, objFieldData.tablename);
                                        OPTIONCONTROL.setPrimaryField(sCtrlId, objFieldData.primaryfield);
                                        OPTIONCONTROL.setDisplayField(sCtrlId, objFieldData.displayfield);
                                        OPTIONCONTROL.clear(sCtrlId);
                                        OPTIONCONTROL.setControlValue(sCtrlId, FConvert.toInt(FILTER.ADVANCEFILTER.getFieldValue(eleRow)));
                                        FCommon.UI.setFocus(sCtrlId);
                                    }
                                    break;
                                case MasterDataType.get("DATE"):
                                    if (sFrom == undefined || sFrom == '') {
                                        sCtrlId = "advancefilter_date_" + iFilterId + "_" + iSubFilterId;
                                    }
                                    else {
                                        sCtrlId = "advancefilter_date_" + iFilterId + "_" + iSubFilterId + "_" + sFrom;
                                    }
                                    eleTxt.type = "text";
                                    eleTxt.style.display = "none";
                                    DATEPICKER.setParent(sCtrlId, eleTxt.parentElement);
                                    value = FConvert.toInt(FILTER.ADVANCEFILTER.getFieldValue(eleRow));
                                    if (value > 0) {
                                        DATEPICKER.setDate(sCtrlId, value, true);
                                    }
                                    FCommon.UI.setFocus(sCtrlId);
                                    break;
                                case MasterDataType.get("TIME"):
                                    sCtrlId = FILTER.ADVANCEFILTER.getTimeControlId(iFilterId, iSubFilterId);
                                    eleTxt.type = "text";
                                    eleTxt.style.display = "none";
                                    FTIMECONTROL.setParent(sCtrlId, eleTxt.parentElement);
                                    value = FConvert.toInt(FILTER.ADVANCEFILTER.getFieldValue(eleRow));
                                    if (value > 0) {
                                        FTIMECONTROL.setTime(sCtrlId, value);
                                    }
                                    FCommon.UI.setFocus(sCtrlId);
                                    break;
                                case MasterDataType.get("BOOLEAN"):
                                    eleTxt = FILTER.ADVANCEFILTER.getFieldValueColumn(eleRow).children[0];
                                    eleTxt.type = "checkbox";
                                    break;
                            }
                            bchange = false;
                            break;
                        case RD_CompareWith.get('FIELD'):
                            FILTER.getDataFieldsTree(eleTxt, iFilterId, iSubFilterId);
                            bchange = false;
                            eleTreeField = eleTxt.nextElementSibling;
                            if (FCommon.UI.isValidObject(eleTreeField)) {
                                $(eleTreeField).focus();
                            }
                            sCtrlId = "";
                            break;
                        case RD_CompareWith.get('DATERANGE'):
                            if (objFieldData.DataType != MasterDataType.get('DATETIME') && objFieldData.DataType != MasterDataType.get('DATE')) {
                                COMMON.prototype.showMessage(arrFilterResourceMsgs.msgInvalidSelectField + " " + FILTER.GetDataTypeText(objFieldData.DataType), "Error");
                            }
                            else {
                                FILTER.getDateRangeTree(eleTxt, iFilterId, iSubFilterId);
                                bchange = false;
                            }
                            break;
                    }
                }
            }
            catch (err) {
                alert("Exception: {FILTER.ADVANCEFILTER.valueField_Click} " + err.message);
            }
        },

        //called on placing mouse pointer over the remove button.
        removeFilterRow_mouseover: function (ele, evt) {
            try {
                $(ele).addClass("highlight");
            }
            catch (err) {
                alert("Exception: {FILTER.ADVANCEFILTER.removeFilterRow_mouseover} " + err.message);
            }
        },

        //called on removing mouse pointer out of the remove button.
        removeFilterRow_mouseout: function (ele, evt) {
            try {
                $(ele).removeClass("highlight");
            }
            catch (err) {
                alert("Exception: {FILTER.ADVANCEFILTER.removeFilterRow_mouseout} " + err.message);
            }
        },

        // Called when remove row button is clicked
        removeFilterRow_Click: function (eleSpan, evt) {
            var eleTr = null;
            var eleParent = null;
            try {
                //var retVal = confirm(document.getElementById('idmsgDeleteFilterConfirm').value);
                //if (retVal == false) {
                //    return;
                //}
                eleTr = eleSpan.parentElement.parentElement;
                eleParent = eleTr.parentElement.parentElement;
                FILTER.ADVANCEFILTER.removeRow(eleTr);
            }
            catch (err) {
                alert("Exception: {FILTER.ADVANCEFILTER.removeFilterRow_Click} " + err.message);
            }
        },

        // Called when plus symbol is clicked.
        addFilterRow_Click: function (eleSpan, evt) {
            var eleBody = null;
            var eleTd = null;

            eleTd = eleSpan.parentElement;
            eleBody = eleTd.parentElement.parentElement;
            FILTER.ADVANCEFILTER.addRow(eleBody);
        },

        // Called when leaf node is clicked in field tree
        selectField_Click: function (eleLeaf, iFilterId, iSubFilterId, sFrom) {
            var iIndex = 0;
            var eleBody = null;
            var arrTreeData = null;
            var objTreeData = null;
            var objData = null;
            var objTemp = null;
            var eleOperator = null;

            try {
                objTemp = FCommon.UI.findAncestorElementsUsingClass(eleLeaf, "FAdvanceFilterField", false);
                if (objTemp.length < 1) {
                    return;
                }
                eleRow = objTemp[0].parentElement;
                if (FCommon.UI.isValidObject(eleRow) == false) {
                    return;
                }
                eleBody = eleRow.parentElement;
                arrTreeData = FILTER.ADVANCEFILTER.getFieldTreeData(eleBody);
                objData = {};
                objData.FieldId = FConvert.toInt(eleLeaf.id);
                objData.FieldName = eleLeaf.textContent;
                objData.DataType = FConvert.toInt(eleLeaf.getAttribute("data-datatype"));
                objData.ParentId = FConvert.toInt(eleLeaf.dataset.parent);
                objData.SubParentId = FConvert.toInt(eleLeaf.dataset.subparent);
                objData.numberlist = eleLeaf.getAttribute("data-numberlist");
                objData.sFilter = eleLeaf.getAttribute('data-sfilter');//eleLeaf.parentElement.parentElement.previousElementSibling.getAttribute('data-sfilter');
                objData.FieldName = eleLeaf.getAttribute("data-extraFieldName");
                objTreeData = null;
                iIndex = FILTER.ADVANCEFILTER.getTreeDataIndex(objData.FieldId, objData.SubParentId, arrTreeData);
                if (iIndex >= 0) {
                    objTreeData = arrTreeData[iIndex];
                }

                FILTER.ADVANCEFILTER.setField(eleRow, objData, objTreeData);
                var filterTree = document.getElementById(FILTER.getFilterTreeId(iFilterId, iSubFilterId, sFrom));
                if (filterTree.parentNode.className == "dropdown open")
                    filterTree.parentNode.className = "dropdown";
                filterTree.style.display = "none";

                var filterDataTree = document.getElementById(FILTER.getFilterDataTreeId(iFilterId, iSubFilterId, sFrom));
                filterDataTree.style.display = "none";
                FILTER.ADVANCEFILTER.setFieldValue(eleRow, null, '');
                eleOperator = FILTER.ADVANCEFILTER.setOperator(eleRow, -1);
                eleOperator = FILTER.ADVANCEFILTER.setCompareType(eleRow, -1);
                FCommon.UI.setFocus(eleOperator);
            }
            catch (err) {
                alert("Exception: {FILTER.ADVANCEFILTER.selectField_Click} " + err.message);
            }
        },

        // Internal
        getConjuctionColumn: function (eleRow) {
            return (eleRow.children[0]);
        },

        // Internal
        getFieldColumn: function (eleRow) {
            return (eleRow.children[1]);
        },

        // Internal
        getCompareWithColumn: function (eleRow) {
            return (eleRow.children[3]);
        },

        // Internal
        getFieldValueColumn: function (eleRow) {
            return (eleRow.children[4]);
        },

        // Internal
        setConjuction: function (eleRow, iValue) {
            var eleSelect = null;

            try {
                eleSelect = eleRow.children[0].children[0];
                eleSelect.value = iValue;
            }
            catch (err) {
                alert("Exception: {FILTER.ADVANCEFILTER.setConjuction} " + err.message);
            }
        },

        // Internal
        setField: function (eleRow, obj, objTreeData) {
            var eleInput = null;
            var iFilterId = null;
            var iSubFilterId = null;
            var eleTreeId = null;
            try {
                iFilterId = eleRow.parentElement.parentElement.getAttribute('data-filterid');
                iSubFilterId = eleRow.parentElement.parentElement.getAttribute('data-subfilterid');
                eleTreeId = iFilterId + '_' + iSubFilterId + '_advancerfiltertreedata';
                eleInput = FILTER.ADVANCEFILTER.getFieldColumn(eleRow).children[0];
                if (FCommon.UI.isValidObject(obj) == false) {
                    return;
                }
                eleInput.setAttribute("data-datatype", FConvert.toInt(obj.DataType));
                if (obj.FieldName != undefined) {
                    eleInput.setAttribute("data-fieldname", obj.FieldName);
                }
                else {
                    if (objTreeData != null) {
                        eleInput.setAttribute("data-fieldname", objTreeData.sName);
                    }
                }

                eleInput.setAttribute("data-fieldid", FConvert.toInt(obj.FieldId));
                eleInput.setAttribute("data-subparent", FConvert.toInt(obj.SubParentId));
                eleInput.setAttribute("data-parent", FConvert.toInt(obj.ParentId));
                eleInput.setAttribute("data-sFilter", obj.sFilter);
                eleInput.setAttribute("data-extraFieldName", obj.FieldName);
                eleInput.setAttribute("data-datatype", FConvert.toInt(obj.datatype));
                varDataType = 0;
                if (obj != null && obj != '') {
                    //Running loop for checking the correct datatype of a field.
                    if (FCommon.UI.isValidObject(document.getElementById(eleTreeId))) {
                        var eleTree = FConvert.stringToObject(document.getElementById(eleTreeId).value).data;
                        if (eleTree.length > 0) {
                            for (var iRow = 0; iRow < eleTree.length; iRow++) {
                                if (eleTree[iRow].iFieldId == FConvert.toInt(obj.FieldId)) {
                                    eleInput.setAttribute("data-datatype", FConvert.toInt(eleTree[iRow].iDataTypeId));
                                    varDataType = FConvert.toInt(eleTree[iRow].iDataTypeId);
                                    break;
                                }
                            }
                        }
                    }
                }

                if (FCommon.UI.isValidObject(objTreeData) == true) {
                    eleInput.setAttribute("data-masterid", FConvert.toInt(objTreeData.iMasterLink));
                    eleInput.setAttribute("data-tablename", objTreeData.TableName);
                    eleInput.setAttribute("data-primaryfield", objTreeData.PrimaryField);
                    eleInput.setAttribute("data-displayfield", objTreeData.DisplayField);
                    eleInput.setAttribute("data-numberlist", objTreeData.sExtraValue);
                    eleInput.setAttribute("data-isgroup", obj.IsGroup);
                    eleInput.value = objTreeData.sName;
                }
                else {
                    eleInput.value = "";
                }
            }
            catch (err) {
                alert("Exception: {FILTER.ADVANCEFILTER.setField} " + err.message);
            }
        },

        // Internal
        getField: function (eleRow) {
            var eleTxt = null;
            var objField = null;

            try {
                eleTxt = FILTER.ADVANCEFILTER.getFieldColumn(eleRow).children[0];

                objField = {};
                objField.DataType = FConvert.toInt(eleTxt.getAttribute('data-datatype'));
                objField.FieldId = FConvert.toInt(eleTxt.getAttribute('data-fieldid'));
                objField.ParentId = FConvert.toInt(eleTxt.getAttribute('data-parent'));
                objField.SubParentId = FConvert.toInt(eleTxt.getAttribute('data-subparent'));
                objField.iMasterTypeId = FConvert.toInt(eleTxt.getAttribute('data-masterid'));
                objField.tablename = eleTxt.getAttribute('data-tablename');
                objField.primaryfield = eleTxt.getAttribute('data-primaryfield');
                objField.displayfield = eleTxt.getAttribute('data-displayfield');
                objField.sName = eleTxt.value;
            }
            catch (err) {
                alert("Exception: {FILTER.ADVANCEFILTER.getField} " + err.message);
            }

            return (objField);
        },

        // Internal
        setOperator: function (eleRow, iValue) {
            var eleSelect = null;

            try {
                eleSelect = eleRow.children[2].children[0];
                eleSelect.value = iValue;
            }
            catch (err) {
                alert("Exception: {FILTER.ADVANCEFILTER.setOperator} " + err.message);
            }

            return (eleSelect);
        },

        // Internal
        setCompareType: function (eleRow, iValue) {
            var eleSelect = null;

            try {
                eleSelect = FILTER.ADVANCEFILTER.getCompareWithColumn(eleRow).children[0];
                eleSelect.value = iValue;
            }
            catch (err) {
                alert("Exception: {FILTER.ADVANCEFILTER.setCompareType} " + err.message);
            }
        },

        // Internal
        getCompareType: function (eleRow) {
            var iValue = 0;
            try {
                iValue = FConvert.toInt(FILTER.ADVANCEFILTER.getCompareWithColumn(eleRow).children[0].value);
            }
            catch (err) {
                alert("Exception: {FILTER.ADVANCEFILTER.getCompareType} " + err.message);
            }

            return (iValue);
        },

        // Internal
        setFieldValue: function (eleRow, obj, eleCondition) {
            var iFilterId = 0;
            var iSubFilterId = 0;
            var eleContainer = null;
            var eleAdvanceFilter = null;
            var eleInput = null;
            var iFilterId = null;
            var iSubFilterId = null;
            var eleParentTable = null;
            try {
                eleInput = FILTER.ADVANCEFILTER.getFieldValueColumn(eleRow).children[0];
                eleInput.style.display = "";

                if (FCommon.UI.isValidObject(obj) == false) {
                    eleContainer = FILTER.ADVANCEFILTER.getControlContainer(eleRow.children[0]);
                    FILTER.ADVANCEFILTER.moveControl(FILTER.ADVANCEFILTER.getFieldValueColumn(eleRow), eleContainer);
                    FCommon.UI.removeDataAttribute(eleInput);
                    eleInput.type = "text";
                    eleInput.value = "";
                    if ((eleRow.children[2].children[0].value) == 6 || eleRow.children[2].children[0].value == 7) {
                        eleInput.style.display = "none";
                    }
                    return;
                }

                if (FCommon.UI.isValidObject(obj.DataType) == false) {
                    eleInput.type = "text";
                    eleInput.value = "";
                    return;
                }

                if (obj.Operator == 6 || obj.Operator == 7) {
                    eleInput.style.display = "none";
                    return;
                }
                varDataType = FConvert.toInt(obj.DataType);
                eleInput.setAttribute("data-datatype", FConvert.toInt(obj.DataType));
                switch (FConvert.toInt(varDataType)) {
                    case MasterDataType.get("NUMBER"):
                    case MasterDataType.get("FRACTION"):
                    case MasterDataType.get("BIGNUMBER"):
                    case MasterDataType.get("SMALLNUMBER"):
                    case MasterDataType.get("TINYNUMBER"):
                    case MasterDataType.get("TEXT"):
                        if (obj.CompareText != "" && obj.CompareText != null) {
                            eleInput.value = obj.CompareText;
                        } else {
                            eleInput.value = obj.CompareValue;
                        }
                        eleInput.setAttribute("data-value", eleInput.value);
                        eleInput.setAttribute("data-ivalue", obj.CompareValue);
                        break;
                    case MasterDataType.get("BOOLEAN"):
                        eleInput.type = "checkbox";
                        eleInput.checked = FConvert.toBoolean(obj.CompareValue);
                        eleInput.setAttribute("data-value", eleInput.checked);
                        break;
                    case MasterDataType.get("STRINGLIST"):
                    case MasterDataType.get("NUMBERLIST"):
                        eleInput.value = obj.CompareText;
                        eleInput.setAttribute("data-value", FConvert.toInt(obj.CompareValue));
                        break;
                    case MasterDataType.get("MASTER"):
                    case MasterDataType.get("EXTERNALTABLE"):
                        eleInput.value = obj.CompareText;
                        eleInput.setAttribute("data-value", FConvert.toInt(obj.CompareValue));
                        eleInput.setAttribute("data-ivalue", FConvert.toInt(obj.CompareValue));
                        eleInput.setAttribute("data-isgroup", FConvert.toBoolean(obj.IsGroup));
                        break;
                    case MasterDataType.get("DATE"):
                        obj.CompareValue = FConvert.toInt(obj.CompareValue);
                        if (FCommon.String.isNullOrEmpty(obj.CompareText) == true && obj.CompareValue > 0) {
                            eleAdvanceFilter = FCommon.UI.findAncestorElementsUsingClass(eleRow, FILTER.ADVANCEFILTER.getAdvanceFilterClassName(), false)[0];
                            iFilterId = FConvert.toInt(eleAdvanceFilter.getAttribute("data-filterid"));
                            iSubFilterId = FConvert.toInt(eleAdvanceFilter.getAttribute("data-subfilterid"));
                            obj.CompareText = DATEPICKER.convertDateIntoString("advancefilter_date_" + iFilterId + "_" + iSubFilterId, obj.CompareValue);
                        }
                        eleInput.value = obj.CompareText;
                        eleInput.setAttribute("data-value", obj.CompareValue);
                        break;
                    case MasterDataType.get("TIME"):
                        obj.CompareValue = FConvert.toInt(obj.CompareValue);
                        if (FCommon.String.isNullOrEmpty(obj.CompareText) == true && obj.CompareValue > 0) {
                            eleAdvanceFilter = FCommon.UI.findAncestorElementsUsingClass(eleRow, FILTER.ADVANCEFILTER.getAdvanceFilterClassName(), false)[0];
                            iFilterId = FConvert.toInt(eleAdvanceFilter.getAttribute("data-filterid"));
                            iSubFilterId = FConvert.toInt(eleAdvanceFilter.getAttribute("data-subfilterid"));
                            FTIMECONTROL.setTime(FILTER.ADVANCEFILTER.getTimeControlId(iFilterId, iSubFilterId), obj.CompareValue);
                            obj.CompareText = FTIMECONTROL.getText(FILTER.ADVANCEFILTER.getTimeControlId(iFilterId, iSubFilterId));
                        }
                        eleInput.value = obj.CompareText;
                        eleInput.setAttribute("data-value", FConvert.toInt(obj.CompareValue));
                        break;
                }
            }
            catch (err) {
                alert("Exception: {FILTER.ADVANCEFILTER.setFieldValue} " + err.message);
            }
        },

        // Internal
        getFieldValue: function (eleRow) {
            var eleInput = null;
            var value = null;

            try {
                eleInput = FILTER.ADVANCEFILTER.getFieldValueColumn(eleRow).children[0];
                value = eleInput.getAttribute("data-ivalue");
            }
            catch (err) {
                alert("Exception: {FILTER.ADVANCEFILTER.getFieldValue} " + err.message);
            }

            return (value);
        },

        // Internal - Returns body element of advance filter
        getRowContainer: function (iFilterId, iSubFilterId, sFrom) {
            var sAdvanceFilterId = "";
            var eleAdvance = null;
            var eleBody = null;
            var iCount = 0;
            var iTotal = 0;
            var sTagName = "";

            try {
                sAdvanceFilterId = FILTER.getAdvanceFilterId(iFilterId, iSubFilterId, sFrom);
                eleAdvance = document.getElementById(sAdvanceFilterId);
                if (FCommon.UI.isValidObject(eleAdvance)) {
                    iTotal = eleAdvance.children.length;
                    for (iCount = 0; iCount < iTotal; iCount++) {
                        sTagName = eleAdvance.children[iCount].tagName;
                        if (sTagName == "TABLE") {
                            eleBody = eleAdvance.children[iCount].children[1];
                            break;
                        }
                    }
                }
            }
            catch (err) {
                alert("Exception: {FILTER.ADVANCEFILTER.getRowContainer} " + err.message);
            }

            return (eleBody);
        },

        // Internal - Returns container of date,time,master etc. controls of advance filter
        getControlContainer: function (ele) {
            var sNodeName = "";
            var eleContainer = null;
            var eleTable = null;

            try {
                sNodeName = ele.nodeName.toLowerCase();
                if (sNodeName == "td") {
                    eleTable = ele.parentElement.parentElement.parentElement;
                }
                else if (sNodeName == "tr") {
                    eleTable = ele.parentElement.parentElement;
                }
                else if (sNodeName == "tbody") {
                    eleTable = ele.parentElement;
                }
                else if (sNodeName == "table") {
                    eleTable = ele;
                }

                if (FCommon.UI.isValidObject(eleTable) == true) {
                    eleContainer = eleTable.children[0].children[1].children[0];
                }
            }
            catch (err) {
                alert("Exception: {FILTER.ADVANCEFILTER.getControlContainer} " + err.message);
            }

            return (eleContainer);
        },

        // Internal - Returns total body rows of advance filter
        getTotalAdvanceRows: function (iFilterId, iSubFilterId) {
            var eleBody = null;
            var iValue = 0;

            try {
                eleBody = FILTER.ADVANCEFILTER.getRowContainer(iFilterId, iSubFilterId);
                iValue = eleBody.children.length;
            }
            catch (err) {
                alert("Exception: {FILTER.ADVANCEFILTER.getTotalAdvanceRows} " + err.message);
            }

            return (iValue);
        },

        // Internal - Deletes all advance filter rows
        resetAdvanceFilter: function (iFilterId, iSubFilterId) {
            var eleBody = null;
            try {
                eleBody = FILTER.ADVANCEFILTER.getRowContainer(iFilterId, iSubFilterId);
                if (FCommon.UI.isValidObject(eleBody)) {
                    while (eleBody.children.length > 1) {
                        FILTER.ADVANCEFILTER.removeRow(eleBody.children[1]);
                    }
                    FILTER.ADVANCEFILTER.removeRow(eleBody.children[0]);
                }
            }
            catch (err) {
                alert("Exception: {FILTER.ADVANCEFILTER.resetAdvanceFilter} " + err.message);
            }
        },

        // Internal - Moves advance filter controls like date, time, master etc. into given container
        moveControl: function (eleTd, eleContainer) {
            try {
                if (FCommon.UI.isValidObject(eleContainer) == false) {
                    eleContainer = FILTER.ADVANCEFILTER.getControlContainer(eleTd);
                }

                if (eleTd.children.length > 1) {
                    eleContainer.appendChild(eleTd.children[1]);
                }
            }
            catch (err) {
                alert("Exception: {FILTER.ADVANCEFILTER.moveControl} " + err.message);
            }
        },

        // Internal - Moves advance filter controls like date, time, master etc. into its original container.  
        moveControlbydefault: function (iFilterId, iSubFilterId) {
            try {
                var ContainerID = null;
                ContainerID = FILTER.getContainerId(iFilterId, iSubFilterId);
                var eleContainer = document.getElementById(ContainerID);
                var eleParent = null;
                var eleChild = null;
                if (FCommon.UI.isValidObject(eleContainer) == true) {
                    //OptionControl
                    eleChild = document.getElementById(FILTER.ADVANCEFILTER.getMasterOptionControlId(iFilterId, iSubFilterId));
                    eleParent = eleChild.parentElement;
                    if (eleParent.id != ContainerID) {
                        eleContainer.appendChild(eleChild);
                    }
                    //TableControl
                    eleChild = document.getElementById(FILTER.ADVANCEFILTER.getTableOptionControlId(iFilterId, iSubFilterId));
                    eleParent = eleChild.parentElement;
                    if (eleParent.id != ContainerID) {
                        eleContainer.appendChild(eleChild);
                    }
                    //Date Control
                    eleChild = document.getElementById(FILTER.ADVANCEFILTER.getDatePickerControlId(iFilterId, iSubFilterId));
                    eleParent = eleChild.parentElement;
                    if (eleParent.id != ContainerID) {
                        eleContainer.appendChild(eleChild);
                    }
                    //Time Control
                    eleChild = document.getElementById(FILTER.ADVANCEFILTER.getTimeControlId(iFilterId, iSubFilterId));
                    eleParent = eleChild.parentElement;
                    if (eleParent.id != ContainerID) {
                        eleContainer.appendChild(eleChild);
                    }
                    //Select Control
                    eleChild = document.getElementById(FILTER.ADVANCEFILTER.getSelectControlId(iFilterId, iSubFilterId));
                    eleParent = eleChild.parentElement;
                    if (eleParent.id != ContainerID) {
                        eleContainer.appendChild(eleChild);
                    }
                }
            }
            catch (err) {
                alert("Exception: {FILTER.ADVANCEFILTER.moveControlbydefault} " + err.message);
            }
        },

        // Internal
        removeRow: function (eleRow) {
            var eleContainer = null;
            var eleBody = null;
            var eleTd = null;
            var iIndex = 0;

            try {
                eleContainer = FILTER.ADVANCEFILTER.getControlContainer(eleRow.children[0]);

                FILTER.ADVANCEFILTER.moveControl(eleRow.children[1], eleContainer); // For field

                iIndex = FCommon.UI.getElementPosition(eleRow);
                if (iIndex < 1) { // Some error
                    return;
                }
                eleBody = eleRow.parentElement;
                if (eleBody.children.length == 1) { // If only one row
                    // Reset value
                    //Making the ContainsWith and Value fields visible.
                    eleRow.children[3].children[0].style.display = "";
                    eleRow.children[4].children[0].style.display = "";
                    //
                    FILTER.ADVANCEFILTER.setConjuction(eleRow, 0);
                    FILTER.ADVANCEFILTER.setField(eleRow, "");
                    FILTER.ADVANCEFILTER.setOperator(eleRow, -1);
                    FILTER.ADVANCEFILTER.setCompareType(eleRow, -1);
                    FILTER.ADVANCEFILTER.setFieldValue(eleRow, "", '');
                    return;
                }

                iIndex--;
                if (iIndex == 0) { // If first row delete
                    // Find next row add td
                    eleTd = eleRow.nextElementSibling.children[eleRow.children.length - 1]; // Get add row column
                    eleTd.children[0].style.display = ""; // Display add row column
                    eleTd = FILTER.ADVANCEFILTER.getFieldValueColumn(eleRow.nextElementSibling);
                    eleTd.children[0].type = "text";
                    FILTER.ADVANCEFILTER.setConjuction(eleRow.nextElementSibling, 0);
                }
                eleBody.removeChild(eleRow);
            }
            catch (err) {
                alert("Exception: {FILTER.ADVANCEFILTER.removeRow} " + err.message);
            }
        },

        // Internal - Adds a new row
        addRow: function (eleBody) {
            var eleHead = null;
            var eleRow = null;
            var eleTd = null;

            try {
                eleHead = eleBody.previousElementSibling;
                $(eleHead.children[0]).clone(true).appendTo(eleBody);

                // Hiding Add Row Image
                eleRow = eleBody.children[eleBody.children.length - 1];
                //Making the ContainsWith and Value fields visible.
                eleRow.children[3].children[0].style.display = "";
                eleRow.children[4].children[0].style.display = "";
                //
                eleTd = eleRow.children[eleRow.children.length - 1];
                eleTd.children[0].style.display = "none";
                FILTER.ADVANCEFILTER.setConjuction(eleRow, 2);
                FILTER.ADVANCEFILTER.setField(eleRow, "");
                FILTER.ADVANCEFILTER.setOperator(eleRow, -1);
                FILTER.ADVANCEFILTER.setCompareType(eleRow, -1);
                FILTER.ADVANCEFILTER.setFieldValue(eleRow, null, '');
            }
            catch (err) {
                alert("Exception: {FILTER.ADVANCEFILTER.addRow} " + err.message);
            }

            return (eleRow);
        },

        getDataContainerId: function (sAdvanceFilterId) {
            return (sAdvanceFilterId + "_data");
        },

        getDataContainer: function (ele) {
            var objTemp = null;
            var eleAdvanceContainer = null;
            var eleData = null;
            try {
                if (FCommon.UI.hasClass(ele, FILTER.ADVANCEFILTER.getAdvanceFilterClassName(), false) == true) {
                    eleAdvanceContainer = ele;
                }
                else {
                    eleAdvanceContainer = FCommon.UI.findAncestorElementsUsingClass(ele, FILTER.ADVANCEFILTER.getAdvanceFilterClassName(), false);
                    if (eleAdvanceContainer.length < 1) {
                        return;
                    }
                    eleAdvanceContainer = eleAdvanceContainer[0];
                }
                eleData = document.getElementById(FILTER.ADVANCEFILTER.getDataContainerId(eleAdvanceContainer.id));
            }
            catch (err) {
                alert("Exception: {FILTER.ADVANCEFILTER.getDataContainer} " + err.message);
            }

            return (eleData);
        },

        // Internal - Called whenever switch from advance filter to default filter
        setLastData: function (ele, arrData) {
            var eleData = null;
            try {
                eleData = FILTER.ADVANCEFILTER.getDataContainer(ele);
                if (FCommon.UI.isValidObject(eleData) == true) {
                    eleData.value = FConvert.toString(arrData);
                }
            }
            catch (err) {
                alert("Exception: {FILTER.ADVANCEFILTER.setLastData} " + err.message);
            }
        },

        // Internal - Called whenever switch from default filter to advance filter
        getLastData: function (ele) {
            var eleData = null;
            var result = null;

            try {
                eleData = FILTER.ADVANCEFILTER.getDataContainer(ele);
                if (FCommon.UI.isValidObject(eleData) == false) {
                    return ([]);
                }

                result = FConvert.stringToObject(eleData.value);
                if (result.lValue < 1) {
                    return ([]);
                }

                result = result.data;
            }
            catch (err) {
                alert("Exception: {FILTER.ADVANCEFILTER.getLastData} " + err.message);
                result = [];
            }

            return (result);
        },

        getRowElement: function (eleBody, iIndex) {
            var eleRow = null;

            try {
                if (iIndex >= 0 && iIndex < eleBody.children.length) {
                    eleRow = eleBody.children[iIndex];
                }
            }
            catch (err) {
                alert("Exception: {FILTER.ADVANCEFILTER.getRowElement} " + err.message);
            }

            return (eleRow);
        },

        getFieldTreeData: function (eleBody) {
            var iCounter = 0;
            var arrTreeData = null;
            var eleTreeData = null;
            var result = null;
            try {
                arrTreeData = [];
                eleTreeData = eleBody.parentElement.nextElementSibling;
                if (FCommon.String.isNullOrEmpty(eleTreeData.value, true) == false) {
                    result = FConvert.stringToObject(eleTreeData.value);
                    if (result.lValue > 0) {
                        arrTreeData = result.data;
                    }
                }

                for (iCounter = 0; iCounter < arrTreeData.length; iCounter++) {
                    arrTreeData[iCounter].iParentId = 0;
                }
            }
            catch (err) {
                alert("Exception: {FILTER.ADVANCEFILTER.getFieldTreeData} " + err.message);
            }

            return (arrTreeData);
        },

        getTreeDataIndex: function (iFieldId, iSubParentId, arrTreeData) {
            var iIndex = -1;
            var iCounter = 0;
            var objData = null;
            try {

                if (FCommon.Array.getLength(arrTreeData) == 0) {
                    return (-1);
                }

                for (iCounter = 0; iCounter < arrTreeData.length; iCounter++) {
                    objData = arrTreeData[iCounter];
                    if (objData.iSubParentId <= 0) {
                        if (objData.iFieldId == iFieldId) {
                            iIndex = iCounter;
                            break;
                        }
                    }
                    else if (objData.iFieldId == iFieldId && objData.iSubParentId == iSubParentId) {
                        iIndex = iCounter;
                        break;
                    }
                }
            }
            catch (err) {
                alert("Exception: {FILTER.ADVANCEFILTER.getTreeDataIndex} " + err.message);
            }

            return (iIndex);
        },

        onOptionControlLeave: function (id, data, tag) {
            var eleContainer = null;
            var eleBody = null;
            var eleRow = null;
            var eleTd = null;
            var objUserData = null;
            var obj = null;
            try {
                eleTd = OPTIONCONTROL.getParent(tag.Control.id).data;
                eleRow = eleTd.parentElement;

                objUserData = FConvert.stringToObject(tag.UserData).data;

                eleBody = FILTER.ADVANCEFILTER.getRowContainer(objUserData.iFilterId, objUserData.iSubFilterId);
                eleContainer = FILTER.ADVANCEFILTER.getControlContainer(eleBody);
                OPTIONCONTROL.setParent(tag.Control, eleContainer);

                obj = {};
                obj.DataType = MasterDataType.get("MASTER");
                obj.CompareValue = FConvert.toInt(OPTIONCONTROL.getControlValue(tag.Control));
                if (tag.Data.length > 0) {
                    if (tag.Data[1].name != undefined) {
                        obj.CompareText = tag.Data[1].name;
                    }
                    else if (tag.Data[1].sname != undefined) {
                        obj.CompareText = tag.Data[1].sname;
                    }
                    else if (tag.Data[1].code != undefined) {
                        obj.CompareText = tag.Data[1].code;
                    }
                    else if (tag.Data[1].alias != undefined) {
                        obj.CompareText = tag.Data[1].alias;
                    }
                    obj.IsGroup = obj.IsGroup = OPTIONCONTROL.getControlValue(id, "bgroup");
                }
                else {
                    obj.CompareText = OPTIONCONTROL.getControlText(tag.Control);
                }
                FILTER.ADVANCEFILTER.setFieldValue(eleRow, obj, '');
            }
            catch (err) {
                alert("Exception: {FILTER.ADVANCEFILTER.onOptionControlLeave} " + err.message);
            }
        },

        onTableOptionControlLeave: function (controlId, data, tag) {
            var eleContainer = null;
            var eleBody = null;
            var eleRow = null;
            var eleTd = null;
            var objUserData = null;
            var obj = null;

            try {
                eleTd = OPTIONCONTROL.getParent(tag.Control.id).data;
                eleRow = eleTd.parentElement;

                objUserData = FConvert.stringToObject(tag.UserData).data;

                eleBody = FILTER.ADVANCEFILTER.getRowContainer(objUserData.iFilterId, objUserData.iSubFilterId);
                eleContainer = FILTER.ADVANCEFILTER.getControlContainer(eleBody);
                OPTIONCONTROL.setParent(tag.Control, eleContainer);

                obj = {};
                obj.DataType = MasterDataType.get("MASTER");
                obj.CompareValue = FConvert.toInt(OPTIONCONTROL.getControlValue(tag.Control));
                obj.CompareText = OPTIONCONTROL.getControlText(tag.Control);
                obj.IsGroup = OPTIONCONTROL.getControlValue(tag.Control.id, "bGroup");
                FILTER.ADVANCEFILTER.setFieldValue(eleRow, obj, '');
            }
            catch (err) {
                alert("Exception: {FILTER.ADVANCEFILTER.onTableOptionControlLeave} " + err.message);
            }
        },

        onDatePickerControlLeave: function (ctrl, data) {
            var eleContainer = null;
            var eleBody = null;
            var eleRow = null;
            var eleTd = null;
            var obj = null;
            try {
                eleTd = DATEPICKER.getParent(ctrl).data;
                eleRow = eleTd.parentElement;

                eleBody = eleRow.parentElement;
                eleContainer = FILTER.ADVANCEFILTER.getControlContainer(eleBody);
                DATEPICKER.setParent(ctrl, eleContainer);

                obj = {};
                obj.DataType = MasterDataType.get("DATE");
                obj.CompareValue = FConvert.toInt(DATEPICKER.getDate(ctrl));
                obj.CompareText = DATEPICKER.getText(ctrl);
                FILTER.ADVANCEFILTER.setFieldValue(eleRow, obj, '');
            }
            catch (err) {
                alert("Exception: {FILTER.ADVANCEFILTER.onDatePickerControlLeave} " + err.message);
            }
        },

        onTimeControlLeave: function (ctrl, data) {
            var eleContainer = null;
            var eleBody = null;
            var eleRow = null;
            var eleTd = null;
            var obj = null;

            try {
                eleTd = FTIMECONTROL.getParent(ctrl).data;
                eleRow = eleTd.parentElement;


                eleBody = eleRow.parentElement;
                eleContainer = FILTER.ADVANCEFILTER.getControlContainer(eleBody);
                FTIMECONTROL.setParent(ctrl, eleContainer);

                obj = {};
                obj.DataType = MasterDataType.get("TIME");
                obj.CompareValue = FConvert.toInt(FTIMECONTROL.getTime(ctrl));
                obj.CompareText = DATEPICKER.getText(ctrl);
                FILTER.ADVANCEFILTER.setFieldValue(eleRow, obj, '');
            }
            catch (err) {
                alert("Exception: {FILTER.ADVANCEFILTER.onTimeControlLeave} " + err.message);
            }
        },

        onStringListNumberListLeave: function (ele) {
            try {
                var eleRow = null;
                var eleCol = null;
                eleRow = ele.parentElement.parentElement;
                eleCol = eleRow.children[1];;
                obj = {};
                obj.DataType = FConvert.toInt(eleCol.children[0].getAttribute('data-datatype'));
                obj.CompareValue = ele.value;
                obj.CompareText = ele[ele.selectedIndex].innerHTML;
                FILTER.ADVANCEFILTER.setFieldValue(eleRow, obj, '');
                ele.style.display = "none";
            }
            catch (err) {
                alert("Exception: {FILTER.ADVANCEFILTER.onStringListNumberListLeave} " + err.message);
            }
        },

        SelectDateRange: function (element, iFilterId, iSubFilterId) {
            try {
                var sAdvanceFilterId = FILTER.getAdvanceFilterId(iFilterId, iSubFilterId, '');
                var dateRangeTree = document.getElementById(FILTER.getFilterDateRangeTreeId(iFilterId, iSubFilterId));
                var filterFieldTxtbox = dateRangeTree.parentNode.children[0];
                filterFieldTxtbox.setAttribute("data-fieldId", element.id);
                filterFieldTxtbox.setAttribute("data-datatype", element.textContent == "Name" ? FILTER.getDataType(arrDataFilterTree, element.dataset.parent) : element.dataset.datatype);
                filterFieldTxtbox.setAttribute("data-masterid", element.textContent == "Name" ? FILTER.getMasterId(arrDataFilterTree, element.dataset.parent) : element.dataset.masterid);
                filterFieldTxtbox.setAttribute("data-parent", element.dataset.parent);
                filterFieldTxtbox.setAttribute("data-subparent", element.dataset.subparent);
                filterFieldTxtbox.setAttribute("data-numberlist", element.dataset.numberlist);
                filterFieldTxtbox.setAttribute("data-tablename", element.dataset.tablename);
                filterFieldTxtbox.setAttribute("data-primaryfield", element.dataset.primaryfield);
                filterFieldTxtbox.setAttribute("data-displayfield", element.dataset.displayfield);
                filterFieldTxtbox.value = element.textContent;
                if (dateRangeTree.parentNode.className == "FAdvanceFilterField open")
                    dateRangeTree.parentNode.className = "FAdvanceFilterField";
                document.getElementById(FILTER.getControlDivId(sAdvanceFilterId)).appendChild(dateRangeTree);
            }
            catch (err) {
                alert("Exception: {FILTER.ADVANCEFILTER.SelectDateRange} " + err.message);
            }
        },

        selectValueField: function (element, iFilterId, iSubFilterId) {
            try {
                bchange = true;
                var sAdvanceFilterId = FILTER.getAdvanceFilterId(iFilterId, iSubFilterId, sFrom);
                var filterFieldTxtbox = document.getElementById(FILTER.getFilterDataTreeId(iFilterId, iSubFilterId)).parentNode.children[0];
                var eleTd = null;
                eleTd = document.getElementById(FILTER.getFilterDataTreeId(iFilterId, iSubFilterId)).parentNode.parentNode.children[1];
                var fieldtype = FConvert.toInt(eleTd.children[0].getAttribute('data-datatype'));
                var fieldName = eleTd.children[0].value;
                var iValue1 = 0;
                var iValue2 = 0;
                switch (fieldtype) {
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 9:
                    case 10:
                    case 11:
                    case 12:
                    case 13:
                    case 14:
                    case 15:
                    case 16:
                        iValue1 = 0;
                        break;
                    case 0:
                    case 8:
                        iValue1 = 1;
                        break;
                }

                switch (FConvert.toInt(element.dataset.datatype)) {
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 9:
                    case 10:
                    case 11:
                    case 12:
                    case 13:
                    case 14:
                    case 15:
                    case 16:
                        iValue2 = 0;
                        break;
                    case 0:
                    case 8:
                        iValue2 = 1;
                        break;
                }

                if (iValue1 != iValue2) {
                    var filterTree = document.getElementById(FILTER.getFilterTreeId(iFilterId, iSubFilterId));
                    if (filterTree.parentNode.className == "dropdown open")
                        filterTree.parentNode.className = "dropdown";
                    document.getElementsByClassName(FILTER.ADVANCEFILTER.getAdvanceFilterClassName())[0].parentNode.appendChild(filterTree);
                    filterTree.style.display = "none";
                    COMMON.prototype.showMessage(arrFilterResourceMsgs.msgConditionAndCompareWithInvalid, "Error");
                    filterFieldTxtbox.removeAttribute("data-fieldId");
                    filterFieldTxtbox.removeAttribute("data-datatype");
                    filterFieldTxtbox.removeAttribute("data-masterid");
                    filterFieldTxtbox.removeAttribute("data-numberlist");
                    filterFieldTxtbox.removeAttribute("data-tablename");
                    filterFieldTxtbox.removeAttribute("data-primaryfield");
                    filterFieldTxtbox.removeAttribute("data-displayfield");
                    filterFieldTxtbox.value = "";
                    return;
                }
                if (fieldName == element.textContent) {
                    var filterTree = document.getElementById(FILTER.getFilterDataTreeId(iFilterId, iSubFilterId));
                    if (filterTree.parentNode.className == "dropdown open")
                        filterTree.parentNode.className = "dropdown";
                    document.getElementsByClassName(FILTER.ADVANCEFILTER.getAdvanceFilterClassName())[0].parentNode.appendChild(filterTree);
                    filterTree.style.display = "none";
                    COMMON.prototype.showMessage(arrFilterResourceMsgs.msgConitionAndCompareFieldNotSame, "Error");
                    return;
                }
                if (element.textContent.indexOf("@") > -1) {
                    filterFieldTxtbox.value = element.textContent;
                }
                else {
                    filterFieldTxtbox.setAttribute("data-fieldId", element.id);
                    filterFieldTxtbox.setAttribute("data-datatype", element.textContent == "Name" ? FILTER.getDataType(arrDataFilterTree, element.dataset.parent) : element.dataset.datatype);
                    filterFieldTxtbox.setAttribute("data-masterid", element.textContent == "Name" ? FILTER.getMasterId(arrDataFilterTree, element.dataset.parent) : element.dataset.masterid);
                    filterFieldTxtbox.setAttribute("data-parent", element.dataset.parent);
                    filterFieldTxtbox.setAttribute("data-subparent", element.dataset.subparent);
                    filterFieldTxtbox.setAttribute("data-numberlist", element.dataset.numberlist);
                    filterFieldTxtbox.setAttribute("data-tablename", element.dataset.tablename);
                    filterFieldTxtbox.setAttribute("data-primaryfield", element.dataset.primaryfield);
                    filterFieldTxtbox.setAttribute("data-displayfield", element.dataset.displayfield);
                    filterFieldTxtbox.setAttribute("data-sfilter", element.dataset.sFilter);
                    filterFieldTxtbox.value = element.textContent;
                }
                var filterTree = document.getElementById(FILTER.getFilterDataTreeId(iFilterId, iSubFilterId));
                if (filterTree.parentNode.className == "FAdvanceFilterField open")
                    filterTree.parentNode.className = "FAdvanceFilterField";
                document.getElementById(FILTER.getControlDivId(sAdvanceFilterId)).appendChild(filterTree);
            }
            catch (err) {
                alert("Exception: {FILTER.ADVANCEFILTER.selectValueField} " + err.message);
            }
        },

        getDataIndex: function (iFieldId, iSubParentId, arrData, sCompareText, sCompareValue) {
            var iCounter = 0;
            var iTotal = 0;
            var objData = null;
            try {
                iTotal = FCommon.Array.getLength(arrData);
                if (iTotal < 1) {
                    return (-1);
                }

                var iCounters = -1;
                var iExists = 0;
                objData = arrData[0];
                for (iCounter = 0; iCounter < iTotal; iCounter++) {
                    objData = arrData[iCounter];
                    if (objData.FieldId == iFieldId && objData.SubParentId == iSubParentId) {
                        //if (objData.CompareText == sCompareText && objData.CompareValue == sCompareValue) {
                        //    iExists = 1;
                        //    break;
                        //}
                        //else {
                        //    iExists = -1;
                        //}
                        iExists = 1;
                        if (iCounters == -1) {
                            iCounters = iCounter;
                        }
                        else {
                            iCounters = iCounters + ',' + iCounter;
                        }
                    }
                }
                if (iExists == 1) {
                    return (iCounters);
                }
                if (iExists == -1) {
                    return (-1);
                }
            }
            catch (err) {
                alert("Exception: {FILTER.ADVANCEFILTER.getDataIndex} " + err.message);
            }
            return (-2);
        },

        // Internal
        getAdvanceFilterClassName: function () {
            return ("AdvanceFilter");
        },

        removeOptions: function (selectbox) {
            var i;
            for (i = selectbox.options.length - 1 ; i >= 0 ; i--) {
                selectbox.remove(i);
            }
        }
    }
}

var DATATYPE = {
    "Text": 0,
    "Number": 1,
    "Boolean": 2,
    "DateTime": 3,
    "Date": 4,
    "Time": 5,
    "Fraction": 6,
    "Picture": 7,
    "StringList": 8,
    "NumberList": 9,
    "DocumentViewer": 10,
    "UpdatedTime": 11,
    "Master": 12,
    "BigNumber": 13,
    "ExternalTable": 14,
    "SmallNumber": 15,
    "TinyNumber": 16
}

var DateRange = {
    CurrentMonth: 10,
    PreviousMonth: 11,
    NextMonth: 12,
    CurrentAndNextMonth: 13,
    CurrentAndPreviousMonth: 14,
    CurrentWeek: 15,
    PreviousWeek: 16,
    NextWeek: 17,
    CurrentAndNextWeek: 18,
    CurrentAndPreviousWeek: 19,
    Today: 20,
    Yesterday: 21,
    Tomorrow: 22,
    Previous7Days: 23,
    Previous30Days: 24,
    Previous60Days: 25,
    Previous90Days: 26,
    Next7Days: 27,
    Next30Days: 28,
    Next60Days: 29,
    Next90Days: 30,
    MonthToDate: 31,
    YearToDate: 32
}
