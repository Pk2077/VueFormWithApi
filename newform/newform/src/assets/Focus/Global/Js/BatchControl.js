var sControlName = "";
//var BatchOrder = ["BatchNo", "Quantity", "ManufacturingDate", "ExpiryDate", "Rate", "QtyAdjusted", "iBatchId", "fValue1", "fValue2", "bReserved", "ReservedQty", "PurchaseDate"]
var BOPTIONCONTROL = new function () {

    this.createControl = function (sControlId, iValue, sWidth, sURL, iMasterTypeId, iGroupType, sFilter, sMandatoryField, sOnLeave, sOnDataLoaded, sClassName,
        BodyId,
        ProductId,
        FromRefresh,
        NumExpiry,
        ExpUnit,
        TagId,
        AllowExpiredBatchs,
        BatchPick,
        VoucherDate,
        ReserveTransId,
        OtherRowBodyId,
        arrsBins,
        AdjustedBatchs
        ) {
        var parameter = "";
        var value = null;
        var data = null;

        try {
            if (FCommon.UI.isValidObject(sControlId) == false || COMMON.prototype.isNullOrEmpty(sControlId) == true) {
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
            if (FCommon.UI.isValidObject(sWidth) == true && COMMON.prototype.isNullOrEmpty(sWidth) == false) {
                value = sWidth;
            }
            parameter = NETWORK.createParameterForHTTPPostRequest("sWidth", value, parameter);

            //////// URL
            parameter = NETWORK.createParameterForHTTPPostRequest("sURL", COMMON.prototype.isNullOrEmpty(sURL) == true ? "" : sURL, parameter);

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
            if (FCommon.UI.isValidObject(sFilter) == true && COMMON.prototype.isNullOrEmpty(sFilter) == false) {
                value = sFilter;
            }
            parameter = NETWORK.createParameterForHTTPPostRequest("sFilter", value, parameter);

            /////////// Exact Match
            value = true;
            parameter = NETWORK.createParameterForHTTPPostRequest("bExactMatch", value, parameter);

            //////// Mandatory Field
            value = "";
            if (FCommon.UI.isValidObject(sMandatoryField) == true && COMMON.prototype.isNullOrEmpty(sMandatoryField) == false) {
                value = sMandatoryField;
            }
            parameter = NETWORK.createParameterForHTTPPostRequest("sMandatoryField", value, parameter);

            //////// Class Name
            value = "";
            if (FCommon.UI.isValidObject(sClassName) == true && COMMON.prototype.isNullOrEmpty(sClassName) == false) {
                value = sClassName;
            }
            parameter = NETWORK.createParameterForHTTPPostRequest("sClassName", value, parameter);

            //////// OnLeave
            value = "";
            if (FCommon.UI.isValidObject(sOnLeave) == true && COMMON.prototype.isNullOrEmpty(sOnLeave) == false) {
                value = sOnLeave;
            }
            parameter = NETWORK.createParameterForHTTPPostRequest("sOnLeave", value, parameter);

            //////// OnDataLoaded
            value = "";
            if (FCommon.UI.isValidObject(sOnDataLoaded) == true && COMMON.prototype.isNullOrEmpty(sOnDataLoaded) == false) {
                value = sOnDataLoaded;
            }
            parameter = NETWORK.createParameterForHTTPPostRequest("sOnDataLoaded", value, parameter);

            value = "";
            if (FCommon.UI.isValidObject(BodyId) == true && COMMON.prototype.isNullOrEmpty(BodyId) == false) {
                value = BodyId;
            }
            parameter = NETWORK.createParameterForHTTPPostRequest("BodyId", value, parameter);

            value = "";
            if (FCommon.UI.isValidObject(ProductId) == true && COMMON.prototype.isNullOrEmpty(ProductId) == false) {
                value = ProductId;
            }
            parameter = NETWORK.createParameterForHTTPPostRequest("ProductId", value, parameter);

            value = "";
            if (FCommon.UI.isValidObject(FromRefresh) == true && COMMON.prototype.isNullOrEmpty(FromRefresh) == false) {
                value = FromRefresh;
            }
            parameter = NETWORK.createParameterForHTTPPostRequest("FromRefresh", value, parameter);

            value = "";
            if (FCommon.UI.isValidObject(NumExpiry) == true && COMMON.prototype.isNullOrEmpty(NumExpiry) == false) {
                value = NumExpiry;
            }
            parameter = NETWORK.createParameterForHTTPPostRequest("NumExpiry", value, parameter);

            value = "";
            if (FCommon.UI.isValidObject(ExpUnit) == true && COMMON.prototype.isNullOrEmpty(ExpUnit) == false) {
                value = ExpUnit;
            }
            parameter = NETWORK.createParameterForHTTPPostRequest("ExpUnit", value, parameter);

            value = "";
            if (FCommon.UI.isValidObject(TagId) == true && COMMON.prototype.isNullOrEmpty(TagId) == false) {
                value = TagId;
            }
            parameter = NETWORK.createParameterForHTTPPostRequest("TagId", value, parameter);

            //value = "";
            //if (FCommon.UI.isValidObject(AllowExpiredBatchs) == true && COMMON.prototype.isNullOrEmpty(AllowExpiredBatchs) == false) {
            //    value = ExpUnit;
            //}
            parameter = NETWORK.createParameterForHTTPPostRequest("AllowExpiredBatchs", value, parameter);

            value = "";
            if (FCommon.UI.isValidObject(BatchPick) == true && COMMON.prototype.isNullOrEmpty(BatchPick) == false) {
                value = BatchPick;
            }
            parameter = NETWORK.createParameterForHTTPPostRequest("BatchPick", value, parameter);

            value = "";
            if (FCommon.UI.isValidObject(VoucherDate) == true && COMMON.prototype.isNullOrEmpty(VoucherDate) == false) {
                value = VoucherDate;
            }
            parameter = NETWORK.createParameterForHTTPPostRequest("VoucherDate", value, parameter);

            value = "";
            if (FCommon.UI.isValidObject(ReserveTransId) == true && COMMON.prototype.isNullOrEmpty(ReserveTransId) == false) {
                value = ReserveTransId;
            }
            parameter = NETWORK.createParameterForHTTPPostRequest("ReserveTransId", value, parameter);

            value = "";
            if (FCommon.UI.isValidObject(OtherRowBodyId) == true && COMMON.prototype.isNullOrEmpty(OtherRowBodyId) == false) {
                value = OtherRowBodyId;
            }
            parameter = NETWORK.createParameterForHTTPPostRequest("OtherRowBodyId", value, parameter);

            value = "";
            if (FCommon.UI.isValidObject(arrsBins) == true && COMMON.prototype.isNullOrEmpty(arrsBins) == false) {
                value = arrsBins;
            }
            parameter = NETWORK.createParameterForHTTPPostRequest("arrsBins", value, parameter);

            value = "";
            if (FCommon.UI.isValidObject(AdjustedBatchs) == true && COMMON.prototype.isNullOrEmpty(AdjustedBatchs) == false) {
                value = AdjustedBatchs;
            }
            parameter = NETWORK.createParameterForHTTPPostRequest("AdjustedBatchs", value, parameter);

            data = NETWORK.executeServerMethod('/Focus8W/RD/RD/CreateBatchOptionControl', true, parameter, 'json');
            if (data != null) {
                if (data.lValue < 1 && COMMON.prototype.isNullOrEmpty(data.sValue) == false) {
                    alert(data.sValue);
                }

                if (data.lValue > 0) {
                    //   data = data.data;
                }
                else {
                    data = null;
                }
            }
        }
        catch (err) {
            alert("Exception: {BOPTIONCONTROL::createControl} " + err.message);
        }

        return (data);
    },
    this.processInputs = function (id, sKey) {
        try {
            var Iid = GetContainerId(id.id);//id.id + "_optioncontainer";
            this.ProcessAutocomplete(Iid, sKey);
        }
        catch (err) {
            alert("Exception: {BOPTIONCONTROL.processInputs " + err.message);
        }
    },

    getWindowLeft = function () {
        try {
            var pageContainer = document.getElementById("page_Content").getBoundingClientRect();
            return parseInt(pageContainer.left);
        }
        catch (ex) {
            return (parseInt($(window).height()));
        }
    },
    getBatchLeft = function (id) {
        try {
            var BatchContainer = document.getElementById(id).getBoundingClientRect();
            return parseInt(BatchContainer.left);
        }
        catch (ex) {
            return (parseInt($(window).left()));
        }
    },
    getBatchwidth = function (id) {
        try {
            var BatchContainer = document.getElementById(id).getBoundingClientRect();
            return parseInt(BatchContainer.width);
        }
        catch (ex) {
            return (parseInt($(window).width()));
        }
    },
    getRight = function (id) {
        try {
            var BatchContainer = document.getElementById(id).getBoundingClientRect();
            return parseInt(BatchContainer.right);
        }
        catch (ex) {
            return (parseInt($(window).right()));
        }
    },
    getTop = function (id) {
        try {
            var BatchContainer = document.getElementById(id).getBoundingClientRect();
            return parseInt(BatchContainer.top);
        }
        catch (ex) {
            return (parseInt($(window).top()));
        }
    },
    getBottom = function (id) {
        try {
            var BatchContainer = document.getElementById(id).getBoundingClientRect();
            return parseInt(BatchContainer.bottom);
        }
        catch (ex) {
            return (parseInt($(window).bottom()));
        }
    },
    getHeight = function (id) {
        try {
            var BatchContainer = document.getElementById(id).getBoundingClientRect();
            return parseInt(BatchContainer.height);
        }
        catch (ex) {
            return (parseInt($(window).height()));
        }
    }
    this.ProcessAutocomplete = function (id, sKey) {
        try {
            //debugger
            document.getElementById(id).style.display = "table";
            if (document.getElementById(id).children == 0) {
                return;
            }
            var table = document.getElementById(id).childNodes[0].childNodes;
            if (table.length <= 0) {
                this.onFocus(document.getElementById(id), "");
                this.keypress(id, skey);
            }
            var tbody = table[1].children[1];
            var strString = "";
            if (sKey != "")
                strString = sKey.toUpperCase();
            if (tbody.children.length > 0) {
                //this.RemoveHighLight(tbody);
                tbody.children[0].className = "clsSelected";
                for (var i = 0; i < tbody.children.length; i++) {
                    var tr = tbody.children[i];
                    var stext = tr.children[0].innerText.trim().toUpperCase();
                    if (stext.indexOf(strString) == 0) {
                        tbody.children[i].style.display = "";
                    } else {
                        tbody.children[i].style.display = "none";
                    }
                }
                this.HightLight(id);
                if ($(tbody.children).find("clsSelected").length == 0)
                    tbody.children[0].className = "clsSelected";
            }
        } catch (err) {
            alert("RMA_POPUP: {BOPTIONCONTROL.ProcessAutocomplete " + err.message);
        }
    },

    this.RemoveHighLight = function (tbody) {
        for (var i = 0; i < tbody.children.length; i++) {
            if (tbody.children[i].className.trim() == "clsSelected") {
                tbody.children[i].className = " ";
            }
        }
    },

    this.RemoveHighLightOnlyRow = function (tbody, iindex) {
        if (tbody.children[iindex].className.trim() == "clsSelected") {
            tbody.children[iindex].className = " ";
        }

    }

    this.HightLight = function (id) {
        //debugger
        try {
            var table = document.getElementById(id).childNodes[0].childNodes;
            var tbody = table[1].children[1];
            this.RemoveHighLight(tbody);
            var iIndex = 0;
            for (var i = 0; i < tbody.children.length; i++) {
                if (tbody.children[i].style.display == "") {
                    if (iIndex == 0) {
                        var tr = tbody.children[i];
                        var siId = id.split('_optioncontainer')[0];
                        var element = document.getElementById(siId + "_data");
                        var BatchName = FCommon.UI.getAttributeData(element, "BatchNO");
                        var BatchId = FCommon.UI.getAttributeData(element, "iBatchId");
                        if (tr.children[6].innerHTML.trim() == BatchId && tr.children[0].innerHTML.trim() == BatchName) {
                            tbody.children[i].className = "clsSelected";
                            iIndex++;
                        }
                        if (tr.children[6].innerHTML.trim() == 0) {
                            tr.style.height = "25px";
                        }
                    }
                }
            }
        }
        catch (err) {
            alert("Exception: {BOPTIONCONTROL.HightLight " + err.message);
        }
    }

    this.NextRowSelection = function (id) {
        try {
            var table = document.getElementById(id).childNodes[0].childNodes;
            var tbody = table[1].children[1];
            var lLength = tbody.children.length;
            var iIndex = 0;
            for (var i = 0; i < lLength; i++) {
                if (tbody.children[i].style.display == "") {
                    if (tbody.children[i].className == "clsSelected") {
                        iIndex = i;
                        break;
                    }
                }
            }
            //iIndex + 1;  next row
            if (iIndex >= lLength) {
                return;
            } else {
                for (var i = iIndex ; i < lLength; i++) {
                    //if (tbody.children[i + 1].style.display == "") {
                    this.RemoveHighLightOnlyRow(tbody, iIndex);
                    if (i + 1 != lLength) {
                        tbody.children[i + 1].className = "clsSelected";
                    } else {
                        tbody.children[0].className = "clsSelected";
                    }
                    break;
                    // }
                }
            }
        } catch (err) {
            alert("Exception: {BOPTIONCONTROL.NextRowSelection " + err.message);
        }
    },

    this.PrievesRowSelection = function (id) {
        try {
            var table = document.getElementById(id).childNodes[0].childNodes;
            var tbody = table[1].children[1];
            var lLength = tbody.children.length;
            var iIndex = 0;
            for (var i = 0; i < lLength; i++) {
                if (tbody.children[i].style.display == "") {
                    if (tbody.children[i].className == "clsSelected") {
                        iIndex = i;
                        break;
                    }
                }
            }
            //iIndex + 1;  next row
            if (iIndex <= lLength && iIndex != 0) {
                for (var i = iIndex - 1; i < lLength; i--) {
                    if (tbody.children[i].style.display == "") {
                        this.RemoveHighLightOnlyRow(tbody, iIndex);
                        tbody.children[i].className = "clsSelected";
                        break;
                    }
                }
            } else {
                return;
            }
        } catch (err) {
            alert("Exception: {BOPTIONCONTROL.PrievesRowSelection " + err.message);
        }

    }
    GetContainerId = function (id) {
        try {
            return (id + "_optioncontainer");
        } catch (err) {
            return (id + "_optioncontainer");;
        }
    }
    this.keypress = function (id, event, sURL) {
        var sValue = "";
        try {
            //var Iid = id.id + "_optioncontainer";
            //if (id.value != "")
            sValue = id.value;
            if (FCommon.UI.isValidObject(event.keyCode) == true && this.isInvalidkeyCode(event.keyCode) == true) {
                this.FixContainer(id);
                $("#" + id.id).focus();
                return;
            }
            else if (FCommon.UI.isValidObject(event.charCode) == true && event.charCode) {
                sValue += String.fromCharCode(event.charCode);
            }
            else {
                sValue += String.fromCharCode(event.keyCode);
            }
            if (event.charCode == undefined || event.charCode == null)
                sValue = "";
            this.processInputs(id, sValue.trim());
            this.FixContainer(id)
        }
        catch (err) {
            alert("Exception: {keypress} " + err.message);
        }
    },
    this.FixContainer = function (id) {
        debugger
        var Iid = GetContainerId(id.id);
        FCommon.UI.setFocusDropdownPopupPosition(document.getElementById(id.id), document.getElementById(Iid));

        //var element = document.getElementById(Iid);
        //var OptionControl = FCommon.UI.getAttributeData(element, "OptionControl");
        //var BatchContainer = document.getElementById(Iid);//.getBoundingClientRect();

        //if (document.getElementById(Iid).scrollWidth > 0) {
        //    if (OptionControl == 0 || OptionControl == null) {
        //        BatchContainer.style.width = getBatchwidth(Iid) + 20 + "px";
        //        FCommon.UI.setAttributeData(element, "OptionControl", BatchContainer.style.width);
        //    }
        //}
        //var ParentInput = document.getElementById(id.id).getBoundingClientRect();
        //var reaminingHght = (GLOBAL.getPageHeight() - ParentInput.top);
        //var BContainer = document.getElementById(Iid).getBoundingClientRect();

        //if (reaminingHght < BContainer.height) {
        //    var grid = getTop(id.id);
        //    var page = getTop('mainDiv');
        //    BatchContainer.style.top = ParentInput.top - BContainer.height + "px";
        //}
        //var element = document.getElementById(id.id + "_data");
        //var iLanguageId = FCommon.UI.getAttributeData(element, "iLanguageId");
        //if (parseInt(iLanguageId) == 1) {
        //    BatchContainer.style.left = ParentInput.left + "px";
        //} else {
        //    var ileft = (ParentInput.left - (BContainer.width - ParentInput.width));
        //    var page_Content = document.getElementById('page_Content').getBoundingClientRect();
        //    if (ParentInput.left - page_Content.left >= BContainer.width)
        //        BatchContainer.style.left = ileft + "px";
        //    else
        //        BatchContainer.style.left = ParentInput.left + "px";
        //}


    },
    this.FillBatchObject = function (id) {
        //window[id + "_AdjustedBatchdata"] = obj;
        //java Script ::: Batch No-0,Quantity-1,Manufacturing Date-2,,Expiry Date-3,Rate-4,Qty Adjusted-5,iBatchId-6,
        //fVale1--7, FValue2--8,bReservation=9, ReservedQty--10, PurchaseDate--11
        debugger
        try {
            var element = document.getElementById(id + "_data");
            var obj = {};
            if (FCommon.UI.getAttributeData(element, "iBatchId") == undefined) { return null };
            if (FCommon.UI.getAttributeData(element, "iBatchId") == null) { return null };
            if (parseFloat(FCommon.UI.getAttributeData(element, "iBatchId")) > 0) {
                obj.BatchNo = FCommon.UI.getAttributeData(element, "BatchNo");
                obj.Qty = FCommon.UI.getAttributeData(element, "Quantity");
                obj.MfgDate = FCommon.UI.getAttributeData(element, "ManufacturingDate");
                obj.ExpDate = FCommon.UI.getAttributeData(element, "ExpiryDate");
                obj.BatchRate = FCommon.UI.getAttributeData(element, "Rate");
                //ObjBatch.QtyAdjusted = data[5];
                obj.BatchId = FCommon.UI.getAttributeData(element, "iBatchId");
                obj.Value1 = FCommon.UI.getAttributeData(element, "fValue1");
                obj.Value2 = FCommon.UI.getAttributeData(element, "fValue2");
                obj.FromReservation = FCommon.UI.getAttributeData(element, "bReserved");;
                //ObjBatch.ReservedQty = data[9];
                //ObjBatch.PurchaseDate = data[10];
                obj.InvTagId = FCommon.UI.getAttributeData(element, "InvTagValue");
                obj.BodyId = FCommon.UI.getAttributeData(element, "BodyId");
                //ReservationId
                obj.IReservationId = FCommon.UI.getAttributeData(element, "ReservationId");
                return obj;
            } else {
                return null;
            }
        }
        catch (err) {
            alert("Exception: {BOPTIONCONTROL.FillBatchObject " + err.message);
        }
    }

    this.getSelectedRow = function (id) {
        try {
            var Iid = GetContainerId(id.id);//id.id + "_optioncontainer";
            var table = document.getElementById(Iid).childNodes[0].childNodes;
            var tbody = table[1].children[1];
            document.getElementById(id.id + "_data").value = ""
            if (tbody.children.length > 0) {
                for (var i = 0; i < tbody.children.length; i++) {
                    if (tbody.children[i].className.trim() == "clsSelected") {
                        this.SetSelectedRowData(tbody.children[i], id.id);
                        break;
                    }

                }
            }
            document.getElementById(Iid).style.display = "none";
        } catch (err) {
            alert("Exception: {BOPTIONCONTROL.getSelectedRow " + err.message);
        }
    },

    this.setAttributeData_Data = function (element, tr) {
        try {
            var j = 0;
            FCommon.UI.setAttributeData(element, "BatchNO", tr.children[j].innerText.trim()); j++;
            FCommon.UI.setAttributeData(element, "Quantity", tr.children[j].innerText.trim()); j++;
            FCommon.UI.setAttributeData(element, "ManufacturingDate", tr.children[j].dataset.value); j++;
            FCommon.UI.setAttributeData(element, "ExpiryDate", tr.children[j].dataset.value); j++;
            FCommon.UI.setAttributeData(element, "Rate", tr.children[j].innerText.trim()); j++;
            FCommon.UI.setAttributeData(element, "QtyAdjusted", tr.children[j].innerText.trim()); j++;
            FCommon.UI.setAttributeData(element, "iBatchId", tr.children[j].innerText.trim()); j++;
            FCommon.UI.setAttributeData(element, "fValue1", tr.children[j].innerText.trim()); j++;
            FCommon.UI.setAttributeData(element, "fValue2", tr.children[j].innerText.trim()); j++;
            FCommon.UI.setAttributeData(element, "bReserved", tr.children[j].innerText.trim()); j++;
            FCommon.UI.setAttributeData(element, "ReservedQty", tr.children[j].innerText.trim()); j++;
            FCommon.UI.setAttributeData(element, "PurchaseDate", tr.children[j].dataset.value); j++;
            FCommon.UI.setAttributeData(element, "ReservationId", tr.children[j].innerText.trim());
        } catch (err) {
            alert("Exception: {BOPTIONCONTROL.setAttributeData_Data " + err.message);
        }
    }

    this.SetSelectedRowData = function (tr, id) {
        try {
            document.getElementById(id).value = tr.children[0].innerText.trim();
            var items = "";
            var Iid = GetContainerId(id)//id + "_optioncontainer";
            var element = document.getElementById(id + "_data");
            var table = document.getElementById(Iid).childNodes[0].childNodes;
            var theader = table[1].children[0].children[0];

            if (tr.children.length > 0) {
                items = tr.children[0].innerText.trim();
                this.setAttributeData_Data(element, tr);
                //for (var j = 1; j < tr.children.length; j++) {
                //    var idate = tr.children[j].dataset.value;
                //    if (!FCommon.String.isNullOrEmpty(idate, true) == true) {
                //        items = items + "," + idate.trim();
                //        //FCommon.UI.setAttributeData(element, BatchOrder[j], idate);
                //    } else {
                //        items = items + "," + tr.children[j].innerText.trim();
                //        //FCommon.UI.setAttributeData(element, BatchOrder[j], tr.children[j].innerText.trim());
                //    }
                //}
            }
        } catch (err) {
            alert("Exception: {BOPTIONCONTROL.SetSelectedRowData " + err.message);
        }
    }

    this.keydown = function (id, event, sURL) {
        var Iid = "";
        try {
            switch (event.keyCode) {
                case 9:
                    Iid = GetContainerId(id.id);//id.id + "_optioncontainer";
                    this.getSelectedRow(id);
                    break;
                case 13:
                    //If you need legacy property "keyCode"
                    // Note: In some browsers you can't overwrite "keyCode" property. (At least in Safari)
                    //delete e.keyCode;
                    break;
                case 27: // Esc key
                    FCommon.UI.stopKeyProcess(event);
                    //this.unselectRow(this.getSelectedRow(id));
                    return;
                case 35: // End key
                    FCommon.UI.stopKeyProcess(event);
                    //this.selectLastRow(id);
                    break;
                    break;
                case 36: // Home key
                    FCommon.UI.stopKeyProcess(event);
                    //this.selectFirstRow(id);
                    break;
                case 38: // up arrow
                    this.processUpKey(id, event);
                    break;
                case 40: // down arrow
                    this.processDownKey(id, event, sURL);
                    break;
            }
        }
        catch (err) {
            alert("Exception: {keydown} " + err.message);
        }
    },

    this.keyup = function (id, event, sURL) {
        var sValue = "";
        var row = null;
        try {
            switch (event.keyCode) {
                case 8: // backspace key
                    sValue = id.value;
                    this.processInputs(id, sValue.trim());
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
                    //sValue = id.value;
                    //this.processInputs(id, sValue, sURL, null);
                    //if (COMMON.prototype.isNullOrEmpty(sValue) == false && this.isPopupVisible(id, true) == false) {
                    //    this.showPopup(id, true);
                    //}
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
                    if (event.keyCode >= 96 && event.keyCode <= 105) { // Numeric pad number 0 to 9
                    }
                    else if (event.keyCode >= 48 && event.keyCode <= 57) { // Number key 0 to 9
                    }
                    else if (event.keyCode >= 65 && event.keyCode <= 90) { // key a to z in both case

                    }

                    break;
            }
        }
        catch (err) {
            alert("Exception: {keyup} " + err.message);
        }
    },

    this.getServerCommunicationParameterObject = function (id, sURL) {
        try {
            var obj = {};

            obj.id = id;
            obj.sURL = "";
            obj.sSearch = "";
            obj.iExistingDataCount = 0;
            obj.SelectedData = null;
            obj.sFilter = "";
            obj.tag = null;
            obj.bAsync = false;

            return (obj);
        } catch (err) {
            alert("Exception: {BOPTIONCONTROL.getServerCommunicationParameterObject " + err.message);
        }
    },

    this.getDataFromServer = function (obj) {
        try {
            var element = null;
            var value = null;
            var parameter = "";
            var sExistingFilter = "";
            element = document.getElementById(obj.id.id);
            var a = FCommon.UI.getAttributeData(element, "arrsBins").toString();
            var res = a.split(",");
            for (var i = 0; i < res.length; i++) {
                res[i] = parseInt(res[i], 10);
            }
            var ObjBatchs = window[obj.id.id + "_AdjustedBatchdata"];
            var model = [];
            debugger
            for (var i = 0; i < ObjBatchs.length; i++) {

                var Obj = {};
                Obj.BatchId = parseInt(ObjBatchs[i].BatchId);
                Obj.BatchNo = ObjBatchs[i].BatchNo.toString();
                Obj.BatchRate = parseFloat(ObjBatchs[i].BatchRate);
                Obj.BodyId = parseInt(ObjBatchs[i].BodyId);
                Obj.ExpDate = parseInt(ObjBatchs[i].ExpDate);
                Obj.FromReservation = ObjBatchs[i].FromReservation;
                Obj.InvTagId = parseInt(ObjBatchs[i].InvTagId);
                Obj.MfgDate = parseInt(ObjBatchs[i].MfgDate);
                Obj.Qty = parseFloat(ObjBatchs[i].Qty);
                Obj.Value1 = parseFloat(ObjBatchs[i].Value1);
                Obj.Value2 = parseFloat(ObjBatchs[i].Value2);
                Obj.ReservationId = parseFloat(ObjBatchs[i].ReservationId);
                model.push(Obj);
            }
            var AdjModel = window[obj.id.id + "_AdjustedBatchdata"];
            var param = {
                sURL: FCommon.UI.getAttributeData(element, "sURL"),
                iBodyId: FCommon.UI.getAttributeData(element, "BodyId"),
                iProductId: FCommon.UI.getAttributeData(element, "ProductId"),
                iNumExpiry: FCommon.UI.getAttributeData(element, "NumExpiry"),
                iExpUnit: FCommon.UI.getAttributeData(element, "ExpUnit"),
                iTagId: FCommon.UI.getAttributeData(element, "TagId"),
                bAllowExpiredBatchs: FCommon.UI.getAttributeData(element, "AllowExpiredBatchs"),
                iBatchPick: FCommon.UI.getAttributeData(element, "BatchPick"),
                iVoucherDate: FCommon.UI.getAttributeData(element, "VoucherDate"),
                iReserveTransId: FCommon.UI.getAttributeData(element, "ReserveTransId"),
                sOtherRowBodyId: FCommon.UI.getAttributeData(element, "OtherRowBodyId"),
                arrBins: res,
                AdjustedBatch: model,//window[obj.id.id + "_AdjustedBatchdata"],
                bFromRefresh: false,
                iExistingDataCount: 100,
                sSearchKey: "",
                sFilter: ""

            };
            this.GetDataFromServer(param, obj.id);
        } catch (err) {
            alert("Exception: {BOPTIONCONTROL.getDataFromServer " + err.message);
        }


    },

    this.onFocus = function (id, sURL) {
        //var element = document.getElementById(id.id + "_data");
    },

    // {Internal} Process up arrow key event
    this.processUpKey = function (id, event) {
        var row = null;

        try {
            FCommon.UI.stopKeyProcess(event);
            var sId = GetContainerId(id.id);//id.id + "_optioncontainer";
            this.PrievesRowSelection(sId);
        }
        catch (err) {
            err.message = "Exception: {processUpKey} " + err.message;
            throw err;
        }
    }

    // {Internal} Process down arrow key event
    this.processDownKey = function (id, event, sURL) {
        try {
            FCommon.UI.stopKeyProcess(event);
            var sId = GetContainerId(id.id);//id.id + "_optioncontainer";
            this.NextRowSelection(sId)
            return true;
        }
        catch (err) {
            err.message = "Exception: {processDownKey} " + err.message;
            throw err;
        }
    },

    this.GetDataFromServer = function (parameter, Id) {
        try {
            var url = GLOBAL.getContextPath("GetBatchOptionControlData", "TransHome", "");// "/Focus8W/Base/GetBatchOptionControlData";
            var selectMastersResult = NETWORK.executeServerMethod(url, true, parameter, "html", false);

            if (selectMastersResult.data.length > 0)
                $("#" + GetContainerId(Id.id)).empty().append(selectMastersResult.data);
            else $("#" + GetContainerId(Id.id)).empty();
        } catch (err) {
            alert("Exception: {BOPTIONCONTROL.GetDataFromServer " + err.message);
        }
    }

    this.leaveFocus = function (id, bShowError) {
        //document.getElementById(GetContainerId(id.id)).style.display = "none";
        //FCommon.UI.setAttributeData(document.getElementById(Iid), "OptionControl", 0);
        //this.getSelectedRow(document.getElementById(Iid));
        //var Objects = this.FillBatchObject(id.id);
    },

    this.inputBlurEvent = function (id, bShowError) {
        document.getElementById(Id.id).style.display = " ";
    },

   this.isInvalidkeyCode = function (keyCode) {
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
           err.message = "Exception: {isInvalidkeyCode} " + err.message;
           throw err;
       }
       return (false);
   },

   this.downImageClick = function (event, id) {
       try {
           var sId = GetContainerId(id);//id + "_optioncontainer";
           if (document.getElementById(id).value.trim() != "") {

               if (document.getElementById(sId).children.length == 0) {
                   this.onFocus(document.getElementById(id), "");
               }
               document.getElementById(sId).style.display = "table";
               this.FixContainer(document.getElementById(id));
               var adjustedbatch = this.FillBatchObject(id);
               if (adjustedbatch == null) {
                   this.HightLight(sId);
               } else {
                   var arrdata = [];
                   arrdata.push(adjustedbatch);
                   this.CheckForExist(id, arrdata);
               }
           }
       } catch (err) {
           alert("Exception: {BOPTIONCONTROL.downImageClick " + err.message);
       }
   }

    this.GetDataOfBatchOnFocus = function (parameter, Id) {
        debugger
        try {
            sControlName = "";
            sControlName = Id;
            var url = GLOBAL.getContextPath("GetBatchOptionControlData", "TransHome", "");// "/Focus8W/TransHome/GetBatchOptionControlData";
            var selectMastersResult = NETWORK.executeServerMethod(url, true, parameter, "html", false);
            if (selectMastersResult.data.length > 0) {
                $("#" + GetContainerId(Id)).empty().append(selectMastersResult.data);
                document.getElementById(Id).value = "";
                var element = document.getElementById(Id + "_data");
                FCommon.UI.setAttributeData(element, "InvTagValue", parameter.iInvTagValue);
                FCommon.UI.setAttributeData(element, "BodyId", parameter.iBodyId);
                FCommon.UI.setAttributeData(element, "iBatchId", 0)
                url = GLOBAL.getContextPath("GetiLanguage", "TransHome", "");// "/Focus8W/TransHome/GetBatchOptionControlData";
                selectMastersResult = NETWORK.executeServerMethod(url, true, "JSON", false);
                if (selectMastersResult.data != null && selectMastersResult.data != undefined) {
                    if (selectMastersResult.data >= 0) {
                        FCommon.UI.setAttributeData(element, "iLanguageId", selectMastersResult.data);
                    }
                }

                //InvTagId = parameter.iInvTagValue;
                if (parameter.AdjustedBatch.length > 0) {
                    if (parameter.AdjustedBatch[0].BatchId > 0) {
                        var sBatchNo = this.CheckForExist(Id, parameter.AdjustedBatch);
                        //element.value = sBatchNo;
                        document.getElementById(Id).value = sBatchNo;
                        //document.getElementById(GetContainerId(Id)).style.display = "table";
                        //this.FixContainer(document.getElementById(Id));
                        //document.getElementById(Id).trigger('keypress');
                    }
                    //this.FixContainer(document.getElementById(Id));
                }
            }
            //$("#" + Id).focus();
            //document.getElementById(Id).focus();
        } catch (err) {
            alert("Exception: {BOPTIONCONTROL.GetDataOfBatchOnFocus " + err.message);
        }
    }
    this.ScrollMainGrid = function (eve, data) {
        var Id = document.getElementsByClassName('Batchoption_container')[0].id;
        element = document.getElementById(Id);
        if (element != null)
            element.style.display = "none";
    }
    this.CheckForExist = function (id, AdjustedBatch) {
        try {
            var iBatchId = AdjustedBatch[0].BatchId;
            var sBatchNo = AdjustedBatch[0].BatchNo;
            var element = document.getElementById(id + "_data");
            id = GetContainerId(id);
            var table = document.getElementById(id).childNodes[0].childNodes;
            var tbody = table[1].children[1];
            var iValue = 0;
            for (var i = 0; i < tbody.children.length; i++) {
                var tr = tbody.children[i];
                //var idddd = tr.children[6].innerText.trim();
                //var str = tr.children[0].innerText.trim();
                if (iValue == 0) {
                    if (tr.children[6].innerText.trim() == iBatchId && tr.children[0].innerText.trim() == sBatchNo) {
                        //document.getElementById(id).style.display = 'table';
                        tr.className = "clsSelected";
                        this.setAttributeData_Data(element, tr);
                        //document.getElementById(id).value = "";
                        //break;
                    }
                }
                //var tr = tbody.children[i];
                var substr = sBatchNo.toUpperCase();
                var stext = tr.children[0].innerText.trim().toUpperCase();
                if (stext.indexOf(substr) == 0) {
                    tbody.children[i].style.display = "";
                } else {
                    tbody.children[i].style.display = "none";
                }
            }
            return sBatchNo;
        } catch (err) {
            alert("Exception: {BOPTIONCONTROL.CheckForExist " + err.message);
        }

    }

    this.setParent = function (ctrl, newParent) {
        var bResult = false;
        var child = null;
        try {
            if (FCommon.UI.isValidObject(ctrl) == false) {
                alert("Error: {BATCHOPTIONCONTROL::setParent} BATCH control id required");
                return (false);
            }

            ctrl = FCommon.UI.getValidElement(ctrl);
            if (FCommon.UI.isValidObject(ctrl) == false) {
                alert("Error: {BATCHOPTIONCONTROL::setParent} BATCH control id cannot be blank");
                return (false);
            }

            if (FCommon.UI.isValidObject(newParent) == false) {
                alert("Error: {BATCHOPTIONCONTROL::setParent} New parent object required");
                return (false);
            }

            newParent = FCommon.UI.getValidElement(newParent)
            if (FCommon.UI.isValidObject(newParent) == false) {
                alert("Error: {BATCHOPTIONCONTROL::setParent} New parent id cannot be blank");
                return (false);
            }

            child = document.getElementById(ctrl.id + "_input_container");
            newParent.appendChild(child);
            child = document.getElementById(GetContainerId(ctrl.id));
            newParent.appendChild(child);
            ctrl.focus();
            bResult = true;
        }
        catch (err) {
            alert("Exception: {BOPTIONCONTROL::setParent} " + err.message);
            bResult = false;
        }

        return (bResult);
    };

    this.GetEnterSelectedData = function (e, tr, iindex) {
        try {
            var id = tr.parentNode.parentNode.parentNode.parentNode.id;
            var iid = id.split('_optioncontainer')[0];
            document.getElementById(iid).value = tr.children[0].innerText.trim();
            var items = "";
            document.getElementById(iid + "_data").value = ""
            if (tr.children.length > 0) {
                SetSelectedRowData(tr, iid);
                var table = document.getElementById(id).childNodes[0].childNodes;
                var tbody = table[1].children[1];
                this.RemoveHighLight(tbody);
                tr.className = "clsSelected";
            }
            document.getElementById(id).style.display = "none";
            FCommon.UI.stopKeyProcess(e);
        } catch (err) {
            alert("Exception: {BOPTIONCONTROL.GetEnterSelectedData " + err.message);
        }

    }

    SetSelectedRowData = function (tr, iId) {
        try {
            document.getElementById(iId).value = tr.children[0].innerText.trim();
            var element = document.getElementById(iId + "_data");
            BOPTIONCONTROL.setAttributeData_Data(element, tr);
        } catch (err) {
            alert("Exception: {BOPTIONCONTROL.SetSelectedRowData " + err.message);
        }
    }
}();