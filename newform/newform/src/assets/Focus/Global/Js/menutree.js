var MENU_TREE = {
    getTreeClass: function () {
        return ("treemenu");
    },

    // {Internal} Unselect given element
    unselectElement: function (ele) {
        try {
            $(ele).removeClass("treemenu_item_selected");
            $(ele).removeClass("theme_color-inverse");

        }
        catch (err) {
            alert("Exception: {MENU_TREE.unselectElement} " + err.message);
        }
    },

    // {Internal} Selects given element
    selectElement: function (ele) {
        try {
            ele.className += " treemenu_item_selected theme_color-inverse";
        }
        catch (err) {
            alert("Exception: {MENU_TREE.selectElement} " + err.message);
        }
    },

    // {Internal} Return all parent elements of given element
    getParentElements: function (ele) {
        var bFound = false;
        var arrData = [];

        try {
            ele = ele.parentElement;
            while (FCommon.UI.isValidObject(ele) == true) {
                if ($(ele).hasClass(MENU_TREE.getTreeClass()) == true) {
                    bFound = true;
                    break;
                }

                if (FCommon.String.isNullOrEmpty(ele.nodeName) == false
                    && ele.nodeName.toLowerCase() == "li"
                    && ele.children.length > 0
                    && ele.children[0].nodeName.toLowerCase() == "a") {
                    arrData.push(ele.children[0]);
                }

                ele = ele.parentElement;
            }
        }
        catch (err) {
            alert("Exception: {MENU_TREE.getParentElements} " + err.message);
        }

        return (arrData);
    },

    // {Internal} Unslects all element
    unselectAll: function (ele) {
        var bFound = false;

        try {
            do {
                if ($(ele).hasClass(MENU_TREE.getTreeClass()) == true) {
                    bFound = true;
                    break;
                }

                ele = ele.parentElement;
            } while (FCommon.UI.isValidObject(ele) == true);

            if (bFound == true) {
                $("#" + ele.id + " li a").each(function () {
                    MENU_TREE.unselectElement(this);
                });
            }
        }
        catch (err) {
            alert("Exception: {MENU_TREE.unselectAll} " + err.message);
        }
    },

    // {Internal} Select given node(li)
    selectNode: function (ele) {
        var jqResult = null;
        var iCounter = 0;

        try {
            MENU_TREE.selectParentNodes(ele);
            currentEle = $(ele).children("a");
            MENU_TREE.selectElement(currentEle[0]);
        }
        catch (err) {
            alert("Exception: {MENU_TREE.selectNode} " + err.message);
        }
    },

    // {Internal} Select all parent nodes of given element
    selectParentNodes: function (ele) {
        var iCounter = 0;
        var arrParent = null;

        try {
            arrParent = MENU_TREE.getParentElements(ele);
            for (iCounter = 0; iCounter < arrParent.length; iCounter++) {
                MENU_TREE.selectElement(arrParent[iCounter]);
            }
        }
        catch (err) {
            alert("Exception: {MENU_TREE.selectParentNodes} " + err.message);
        }
    },

    // {Internal} Expand all parent nodes of given element
    expandAllParent: function (ele) {
        var iCounter = 0;
        var arrParent = null;
        try {
            arrParent = MENU_TREE.getParentElements(ele);
            for (iCounter = 0; iCounter < arrParent.length; iCounter++) {
                var eleI = arrParent[iCounter].children[0];
                MENU_TREE.toggleNodeState(eleI);
            }
        }
        catch (err) {
            alert("Exception: {MENU_TREE.expandAllParent} " + err.message);
        }
    },

    // {Handler} Toggles group node state
    toggleNodeState: function (ele, event) {
        try {
            if (event != null) {
                event.stopImmediatePropagation();
            }

            jqResult = $(ele.parentElement.parentElement).children("ul");
            if (jqResult.length > 0) { // has children
                for (iCounter = 0; iCounter < jqResult.length; iCounter++) {
                    if (jqResult[iCounter].style.display != "none") {
                        jqResult[iCounter].style.display = "none";
                    }
                    else {
                        jqResult[iCounter].style.display = "block";
                    }
                }
                //$(ele).toggleClass('icon-add139, icon-minus65');
                $(ele).toggleClass('icon-expand icon-collepse');
            }
        }
        catch (err) {
            alert("Exception: {MENU_TREE.toggleNodeState} " + err.message);
        }
    },

    // {Handler} Called when any li is clicked
    onElement_ClicK: function (ele, event) {
        try {
            if (event != null) {
                event.stopImmediatePropagation();
            }
            MENU_TREE.unselectAll(ele);
            MENU_TREE.selectNode(ele);
        }
        catch (err) {
            alert("Exception: {MENU_TREE.onElement_ClicK} " + err.message);
        }
    },

    // {Public} Returns selected menu id
    getSelectedMenuId: function (sMainMenuId) {
        var iMenuId = 0;

        try {
            $("#" + sMainMenuId + " li a").each(function () {
                if ($(this).hasClass('treemenu_item_selected')) {
                    iMenuId = parseInt(this.parentElement.getAttribute("data-menuid"));
                }
            });
        }
        catch (err) {
            alert("Exception: {MENU_TREE.getSelectedMenuId} " + err.message);
        }

        return (iMenuId);
    },

    // {Public} Selects given menu id in tree
    selectMenuId: function (iMenuId, sMainMenuId) {
        var eleLi = null;
        var sMenuId = ""

        try {
            sMenuId = "id_menu_tree_" + iMenuId;
            $("#" + sMainMenuId + " li").each(function () {
                if (this.getAttribute('id') == sMenuId) {
                    eleLi = this;
                }
            });

            if (FCommon.UI.isValidObject(eleLi) == true) {
                MENU_TREE.expandAllParent(eleLi);
                MENU_TREE.selectNode(eleLi);
            }
        }
        catch (err) {
            alert("Exception: {MENU_TREE.selectMenuId} " + err.message);
        }
    }
};
