LISTCHECKBOX = {
    //id=string type and it should be unique mandatory
    //arrOptions=IdNamePair type and it mandatory
    //addEvent=string type and it is not mandatory
    //arrValue=string[] type and it is not mandatory
    updateOptions: function (id, arrOptions, addEvent, arrValue) {
        debugger;
        if (id != undefined && id != null) {
            var controlElement = document.getElementById("ul_" + id);
            if (controlElement != null) {
                controlElement.innerHTML = "";
                if (arrOptions != undefined && arrOptions != null && arrOptions.length > 0) {
                    for (var count = 0; count < arrOptions.length; count++) {
                        var li = document.createElement("li");
                        li.className = "treeview";
                        var div = document.createElement("div");
                        div.className = "Fcheckbox"
                        var label = document.createElement("label");
                        var input = document.createElement("input");
                        input.type = "checkbox";
                        input.className = "Fchkbox";
                        input.dataset.id = arrOptions[count].ID;
                        input.dataset.name = arrOptions[count].Name;
                        input.value = arrOptions[count].Name + "_" + arrOptions[count].ID;
                        input.setAttribute("onchange", "LISTCHECKBOX.setControlText('" + id + "')");
                        var span = document.createElement("span");
                        span.textContent = arrOptions[count].Name
                        label.appendChild(input);
                        label.appendChild(span);
                        div.appendChild(label);
                        li.appendChild(div);
                        controlElement.appendChild(li);
                    }
                }
            }
        }
        if (addEvent == 'true') {
            LISTCHECKBOX.setControlData(id, arrValue);
            $('#txtbox_' + id).on('click focusin keypress', function (event) {
                $('#' + id).addClass('open');
            });
            $(document).on('click', function (e) {
                if (!$('#ul_' + id).is(e.target)
                    && $('.open').has(e.target).length === 0
                ) {
                    $('#' + id).removeClass('open');
                }
            });
        }
    },

    //id=string type and it should be unique mandatory
    //arrValue=string[] type and it mandatory
    setControlData: function (id, arrValue) {
        var arrSelectedValues = [];
        if (id != undefined && id != null) {
            var controlEle = document.getElementById("ul_" + id);
            if (controlEle != null) {
                var lstCheckbox = controlEle.children;
                if (arrValue != undefined && arrValue != null && arrValue.length > 0) {
                    for (var count = 0; count < arrValue.length; count++) {
                        for (var count1 = 0; count1 < lstCheckbox.length; count1++) {
                            var checkbox = lstCheckbox[count1].children[0].children[0].children[0];
                            if ((arrValue[count].Name +"_"+ arrValue[count].ID) == checkbox.value) {
                                checkbox.checked = true;
                                arrSelectedValues.push(checkbox.nextElementSibling.textContent);
                                break;
                            }
                        }
                    }
                }
            }
        }
        document.getElementById("txtbox_" + id).value = arrSelectedValues.join(',');
    },

    getControlData: function (id) {
        var arrValues = [], iMasterTypeId;
        if (id == "doc_Accountdepandency")
            iMasterTypeId = 1;
        if (id == "doc_Productdepandency")
            iMasterTypeId = 2;
        if (id != undefined && id != null) {
            var controlEle = document.getElementById("ul_" + id);
            if (controlEle != null) {
                var lstCheckbox = controlEle.children;
                if (lstCheckbox != undefined && lstCheckbox != null && lstCheckbox.length > 0) {
                    for (var count = 0; count < lstCheckbox.length; count++) {
                        var checkbox = lstCheckbox[count].children[0].children[0].children[0];
                        if (checkbox.checked == true) {
                            arrValues.push({ID:checkbox.dataset.id,Name:checkbox.dataset.name,Tag:iMasterTypeId});
                        }
                    }
                }
                else {
                    return null;
                }
            }
            else {
                return null;
            }
            return arrValues;
        }
        else {
            return null;
        }
    },

    setControlText: function (id) {
        var arrSelectedValues = [];
        var controlEle = document.getElementById("ul_" + id);
        if (controlEle != null) {
            var lstCheckbox = controlEle.children;
            if (lstCheckbox != undefined && lstCheckbox != null && lstCheckbox.length > 0) {
                for (var count1 = 0; count1 < lstCheckbox.length; count1++) {
                    var checkbox = lstCheckbox[count1].children[0].children[0].children[0];
                    if (checkbox.checked == true) {
                        arrSelectedValues.push(checkbox.nextElementSibling.textContent);
                    }
                }
            }
        }
        document.getElementById("txtbox_" + id).value = arrSelectedValues.join(',');
    },

    getControlText: function (id) {
        var arrSelectedValues = [];
        var controlEle = document.getElementById("ul_" + id);
        if (controlEle != null) {
            var lstCheckbox = controlEle.children;
            if (lstCheckbox != undefined && lstCheckbox != null && lstCheckbox.length > 0) {
                for (var count1 = 0; count1 < lstCheckbox.length; count1++) {
                    var checkbox = lstCheckbox[count1].children[0].children[0].children[0];
                    if (checkbox.checked == true) {
                        arrSelectedValues.push(checkbox.nextElementSibling.textContent);
                    }
                }
            }
        }
        return arrSelectedValues.join(',');
    },
}