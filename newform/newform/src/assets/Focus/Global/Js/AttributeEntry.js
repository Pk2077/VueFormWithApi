ATTRIBUTEENTRY = {
    //setHeight: function (id) {
    //    var control = document.getElementById(id + '_body');
    //    control.style.height = GLOBAL.getPageHeight() - 150 - (control.getBoundingClientRect().top) + 'px';
    //},

    getControl: function (sCtrlId, iMasterId, sCustomData) {
        try {
            sCustomData = FConvert.toString(sCustomData);

            FCommon.UI.setAttributeData(sCtrlId, "customdata", sCustomData);
            OPTIONCONTROL.clear(ATTRIBUTEENTRY.getItemControlId(sCtrlId));
            var controlbody = document.getElementById(sCtrlId + '_attributes');
            if (controlbody != null) {
                controlbody.innerHTML = "";
            }
            $('#' + sCtrlId).modal("show");
        }
        catch(err) {}
    },

    getProductAttr: function (ele, data) {
        if (data.length > 0) {
            result = NETWORK.executeServerMethod(
                           GLOBAL.getContextPath("GetAttributeEntryData", "Home", ""),
                           true,
                           { MasterId: (data[0].imasterid == "" ? 0 : data[0].imasterid), ControlId: ele.id.substring(0, ele.id.length - 24) },
                           "",
                           true,
                           "ATTRIBUTEENTRY.getProductAttrSuccess",
                           "GLOBAL.LoadingStart",
                           "GLOBAL.LoadingEnd",
                           ele.id.substring(0, ele.id.length - 24)
                      );
        }
    },

    getProductAttrSuccess: function (bSuccess, html, ctrlId) {
        if (bSuccess == true) {
            if (html.trim() != "") {
                $("#" + ctrlId + "_attributes").html(html);
            }
            else {
                //$("#" + ctrlId).modal("hide"); Commented for issue number F8W-8165.
                //iMasterId = FConvert.toInt(OPTIONCONTROL.getControlValue(ATTRIBUTEENTRY.getItemControlId(ctrlId)));
                ///var sCallback = ATTRIBUTEENTRY.getCallback(ctrlId);
                //eval(sCallback)(iMasterId, ATTRIBUTEENTRY.getCustomData(ctrlId), event);
            }
        }
    },

    onOk: function (sCtrlId, event) {
        debugger
        var sCallback = "";
        var iCounter = 0;
        var arrAttributes = [];
        var iMasterId = 0;
        var properties = null;
        var result = null;

        try {
            iMasterId = FConvert.toInt(OPTIONCONTROL.getControlValue(ATTRIBUTEENTRY.getItemControlId(sCtrlId)));
            if (iMasterId < 1) {
                COMMON.prototype.showMessage("Selecting item is mandatory.", "Error");
                return;
            }

            sCallback = ATTRIBUTEENTRY.getCallback(sCtrlId);

            $("#" + sCtrlId).modal("hide");
            
            properties = document.getElementsByName(sCtrlId + "_Combobox");
            for (iCounter = 0; iCounter < properties.length; iCounter++) {
                arrAttributes.push(properties[iCounter].selectedOptions[0].textContent);
            }
            if (arrAttributes != null && arrAttributes.length > 0) {
                result = NETWORK.executeServerMethod(
                                 GLOBAL.getContextPath("GetattributeValue", "Home", ""),
                                 true,
                                 { iMasterId: iMasterId, arrAttributes: arrAttributes },
                                 "",
                                 false
                            );

                if (result.lValue > 0) {
                    document.getElementById(sCtrlId).dataset.value = result.data;
                }
                else {
                    document.getElementById(sCtrlId).dataset.value = 0;
                }

                if (FCommon.String.isNullOrEmpty(sCallback, true) == false) {
                    eval(sCallback)(result.data, ATTRIBUTEENTRY.getCustomData(sCtrlId), event);
                }
            }
            else {
                sCallback = ATTRIBUTEENTRY.getCallback(sCtrlId);
                if (FCommon.String.isNullOrEmpty(sCallback, true) == false) {
                    eval(sCallback)(iMasterId, ATTRIBUTEENTRY.getCustomData(sCtrlId), event);
                }
            }
        }
        catch(err) {}
    },

    onCancel: function (sCtrlId, event) {
        var sCallback = "";

        try {
            $("#" + sCtrlId).modal("hide");

            sCallback = ATTRIBUTEENTRY.getCallback(sCtrlId);
            if (FCommon.String.isNullOrEmpty(sCallback, true) == false) {
                eval(sCallback)(0, ATTRIBUTEENTRY.getCustomData(sCtrlId), event);
            }
        }
        catch(err) {}
    },

    getControlValue: function (sCtrlId) {
        return document.getElementById(sCtrlId).dataset.value;
    },

    setControlValue: function (sCtrlId, Value) {
        OPTIONCONTROL.setControlValue(ATTRIBUTEENTRY.getItemControlId(sCtrlId), Value);
    },

    getCustomData: function (sCtrlId) {
        var sValue = "";

        sValue = FCommon.UI.getAttributeData(sCtrlId, "customdata");

        return (sValue);
    },

    getCallback: function(sCtrlId) {
        var sValue = "";

        sValue = FCommon.UI.getAttributeData(sCtrlId, "callback");

        return (sValue);
    },

    getItemControlId: function (sCtrlId) {
        var sValue = "";

        sValue = sCtrlId + "_attributeEntryOptinCtrl";

        return (sValue);
    }
}