/* written by narendhar reddy */

//to load new view when user selected view from menu
var navigationText = [];
var formulaAbbrList = [];
var arrOperatorPos = [];
var checkedRows = [];
var formulaTextBoxVal = undefined;
var previousTime = undefined;
var lastSelectedRecentItem = undefined;
var TranactionCallbackFunc = undefined;
var className = undefined;
var liSelected;
GLOBAL = {
    GlobalCacheArrayForMasters: [],
    GlobalCacheForMasterEntryScreen: [],

    extractDataFromMenuURL: function (sURL) {
        var sType = "";
        var iIndex = 0;
        var obj = null;

        try {
            obj = {};
            obj.MenuType = 0;
            obj.TypeId = 0;
            obj.MenuId = 0;

            sType = sURL.substring(sURL.indexOf('type='));
            iIndex = sType.indexOf('&');
            obj.MenuType = FConvert.toInt(sType.substring(5, iIndex));

            sType = sURL.substring(sURL.indexOf('iTypeId='));
            iIndex = sType.indexOf('&');
            obj.TypeId = FConvert.toInt(sType.substring(8, iIndex));

            sType = sURL.substring(sURL.indexOf('iMenuId='));
            iIndex = sType.indexOf('&');
            obj.MenuId = FConvert.toInt(sType.substring(8, iIndex));
        }
        catch (err) {
            alert("Exception: {GLOBAL.extractDataFromMenuURL} " + err.message);
        }

        return (obj);
    },

    updateView: function (event, element) {
        var sURL = "";
        var sTargetURL = "";
        var objMenuInfo = null;
        var elePageContainer = null;
        var eleTemp = null;
        var objGlobal = null;

        if (event.preventDefault) {
            event.preventDefault();
        }
        GLOBAL.updateNavigation(element);
        // var nevigationMenuId = parseInt($(element).attr('data-bind'));
        if ($(element)[0] != undefined) {
            var nevigationMenuText = $(element)[0].innerText;

            if (nevigationMenuText == "Delete Company") {
                // if (nevigationMenuId == 6) {
                if (confirm("Are you sure you want to Delete the Company")) {
                    var urlPath = GLOBAL.getContextPath("DeleteCompany", "EditCompany", "Company");
                    var fnResult = NETWORK.executeServerMethod(urlPath, true, null, "JSON", true, "GLOBAL.DeleteCompanySuccess", "GLOBAL.LoadingStart", "GLOBAL.LoadingEnd");
                }
                else {
                    return false;
                }
            }
            else if (nevigationMenuText == "Create Duplicate Company") {
                var url = GLOBAL.getContextPath("DuplicateCompany", "EditCompany", "Company");
                var fnResult = NETWORK.executeServerMethod(url, true, null, "HTML", true, "GLOBAL.DuplicateSuccess", "GLOBAL.LoadingStart", "GLOBAL.LoadingEnd");
                $("#navigation_menu").find("li.openMenu").removeClass("openMenu");
                $(".quickaccess").removeClass("open");
            }
            else {
                sURL = $(element).attr('href');
                var sHCMURL = null;
                var sHCMsubURL = null;

                elePageContainer = GLOBAL.getPageContainer();

                objMenuInfo = GLOBAL.extractDataFromMenuURL(sURL);
                if (objMenuInfo.MenuType == 9) {
                    if (FCommon.UI.isValidObject(elePageContainer) == true) {
                        FCommon.UI.removeChildren(elePageContainer);

                        eleTemp = document.getElementById('hdnHCMHostName');
                        if (FCommon.UI.isValidObject(eleTemp) == false) {
                            return;
                        }

                        sHCMsubURL = eleTemp.value;
                        var iLength = FConvert.toInt(sHCMsubURL.indexOf('login'));
                        sHCMsubURL = sHCMsubURL.substring(0, iLength);
                        sHCMsubURL = sHCMsubURL + "HCM/OpenScreen" + "?MenuType=" + objMenuInfo.MenuType + "&TypeId=" + objMenuInfo.TypeId + "&MenuId=" + objMenuInfo.MenuId + "&iCallFromMenu=1";

                        sHCMURL = sHCMsubURL;
                        $(elePageContainer).html("<iframe width=100% height=100% src=' " + sHCMURL + "' frameborder='0' allowfullscreen></iframe>");
                        elePageContainer.style.display = "block";
                        document.getElementById("DashBoardScreen").style.display = "none";
                        $("#navigation_menu").find("li.openMenu").removeClass("openMenu");
                        $(".quickaccess").removeClass("open");
                        return;
                    }
                }
                else if (objMenuInfo.MenuType == 24) { // TDS
                    if (FCommon.UI.isValidObject(elePageContainer) == true) {
                        FCommon.UI.removeChildren(elePageContainer);

                        eleTemp = document.getElementById("id_tdshostname");
                        if (FCommon.UI.isValidObject(eleTemp) == false) {
                            return;
                        }

                        sURL = eleTemp.value;
                        if (FCommon.String.isNullOrEmpty(sURL, true) == true) {
                            return;
                        }

                        objGlobal = GLOBAL.getGlobalValue();

                        sTargetURL = sURL + "?MenuType=" + objMenuInfo.MenuType + "&TypeId=" + objMenuInfo.TypeId + "&MenuId=" + objMenuInfo.MenuId + "&SessionId=" + objGlobal.SessionId + "&LiteVersion" + objGlobal.LiteVersion;

                        $(elePageContainer).html("<iframe width=100% height=100% src=' " + sTargetURL + "' frameborder='0' allowfullscreen></iframe>");
                        elePageContainer.style.display = "block";
                        document.getElementById("DashBoardScreen").style.display = "none";
                        $("#navigation_menu").find("li.openMenu").removeClass("openMenu");
                        $(".quickaccess").removeClass("open");
                        return;
                    }
                }
                else if (objMenuInfo.MenuType == 27) { // GST
                    if (FCommon.UI.isValidObject(elePageContainer) == true) {
                        FCommon.UI.removeChildren(elePageContainer);

                        eleTemp = document.getElementById("id_gsthostname");
                        if (FCommon.UI.isValidObject(eleTemp) == false) {
                            return;
                        }

                        sURL = eleTemp.value;
                        if (FCommon.String.isNullOrEmpty(sURL, true) == true) {
                            return;
                        }

                        objGlobal = GLOBAL.getGlobalValue();

                        sTargetURL = sURL + "?MenuType=" + objMenuInfo.MenuType + "&TypeId=" + objMenuInfo.TypeId + "&MenuId=" + objMenuInfo.MenuId + "&SessionId=" + objGlobal.SessionId + "&LiteVersion" + objGlobal.LiteVersion;

                        $(elePageContainer).html("<iframe width=100% height=100% src=' " + sTargetURL + "' frameborder='0' allowfullscreen></iframe>");
                        elePageContainer.style.display = "block";
                        document.getElementById("DashBoardScreen").style.display = "none";
                        $("#navigation_menu").find("li.openMenu").removeClass("openMenu");
                        $(".quickaccess").removeClass("open");
                        return;
                    }
                }
                else {
                    var result = null;
                    result = NETWORK.executeServerMethod(sURL, true, null, "", true, "GLOBAL.LoadScreen", "GLOBAL.LoadingStart", "GLOBAL.LoadingEnd");
                    $("#navigation_menu").find("li.openMenu").removeClass("openMenu");
                    $(".quickaccess").removeClass("open");
                }
            }
        }
        NewDashboard.BackToDashboard();
    },
    DeleteCompanySuccess: function (flag, data) {
        GLOBAL.LoadingEnd();
        if (flag == true && data == "") {
            alert("Company deleted successfully");
            GENERAL.Logout();
            return false;
        }
        else {
            COMMON.prototype.showMessage(data);
            return false;
        }
    },
    DuplicateSuccess: function (flag, data) {
        var elePageContainer = null;

        if (flag) {
            elePageContainer = GLOBAL.getPageContainer();

            var element = document.createElement("div");
            element.setAttribute("id", "div_duplicateCompany");
            var check = document.getElementById("DashBoardScreen").style.display;
            if (check != "none") {
                document.getElementById("DashBoardScreen").appendChild(element);
                document.getElementById("DashBoardScreen").style.display = "block";
                elePageContainer.style.display = "none";
            }
            else {
                elePageContainer.style.display = "block";
                document.getElementById("DashBoardScreen").style.display = "none";
                elePageContainer.appendChild(element);

            }
            $("#div_duplicateCompany").html(data);
            $("#myModal").modal('show');
        }
    },
    updateNavigation: function (elment) {
        navigationText = [];
        //$("#navigationheader").html(""); //Commented on 11th Jun 2018.
        if (elment == null && elment == undefined) {
            return 0;
        }
        if ($(elment)[0] != undefined && $(elment)[0].tagName == "A") {
            $("#navigationheader").html("");
            if ($(elment).parent().parent().attr("id") == "searchULinMin") {
                elment = $("#navigation_menu").find("#" + $(elment).attr("id"));
            }
            GLOBAL.appendNavigation(elment, navigationText);
            navigationText.reverse();
            for (var i = 0; i < navigationText.length; i++) {
                $("#navigationheader").append("<span class='navText'>" + navigationText[i] + "  /</span>");
            }
            //$("#navigationheader").append("<span style='color:#34C3FB;font-weight:800;margin:5px 3px;font-size: 14px;'>" + navigationText[navigationText.length - 1] + "  </span>");
        }
        else {
            if ($(elment).attr("href") != undefined && $(elment).attr("href").indexOf("DashBoard") >= 0) {
                $("#navigationheader").html("");
                $("#navigationheader").append("");
            }
            else {
                if ($(elment).attr("href") != undefined) {
                    $("#navigationheader").html("");
                    var temp = $(elment).attr("href").replace("Focus8W/", "");
                    temp = temp.substring(1);
                    temp = temp.split("/");
                    $("#navigationheader").append("<span class='navText'>" + "Home" + "  /</span>");
                    for (var i = 0; i < temp.length - 2; i++) {
                        $("#navigationheader").append("<span class='navText'>" + temp[i] + "  /</span>");
                    }
                }
                //$("#navigationheader").append("<span style='color:#34C3FB;font-weight:800;margin:5px 3px;font-size: 14px;'>" + temp[temp.length - 1] + "  </span>");
            }
        }
    },

    //recurcive method for GLOBAL.updateNavigation
    appendNavigation: function (child, strNav) {
        if ($($(child).parent().parent())[0].id != "navigation_menu") {
            if ($($(child).parent().parent())[0].tagName == "UL") {
                var txt = $(child).parent().parent().parent().children("a").find(">span").text();
                strNav.push(txt);
                GLOBAL.appendNavigation($(child).parent().parent(), strNav);
            }
            else {
                GLOBAL.appendNavigation($(child).parent().parent(), strNav);
            }
        }
    },

    getnavigationHeader: function (id) {
        if (id != undefined && document.getElementById("navigationheader") != undefined && document.getElementById("navigationheader").innerHTML != "")
            if (document.getElementById(id) != null) {
                document.getElementById(id).innerHTML = document.getElementById("navigationheader").innerHTML;
            }
    },

    LoadScreen: function (bSuccess, html, arrData) {
        var elePageContainer = null;

        if (bSuccess == false) {
            return;
        }

        elePageContainer = GLOBAL.getPageContainer();
        if (elePageContainer != null) {
            $(elePageContainer).html(html);
            elePageContainer.style.display = "block";
            document.getElementById("DashBoardScreen").style.display = "none";
            //if (document.getElementById("createUserDiv") != null) {
            //    document.getElementById("createUserDiv").style.pointerEvents = "auto";
            //}

            if (document.getElementById("CancelCreateUser") != null) {
                document.getElementById("CancelCreateUser").style.pointerEvents = "auto";
            }
            //$(elePageContainer).addClass("animated flip").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
            //    $(elePageContainer).removeClass("animated flip");
            //});

            if (FCommon.UI.isValidObject(arrData) == true) {
                if (Array.isArray(arrData) == true) {
                    if (FCommon.String.includes(arrData[0], "(") == true) {
                        eval(arrData[0]);
                    }
                    else {
                        eval(arrData[0])(arrData);
                    }
                }
                else if ((typeof arrData).toLowerCase() == "string") {
                    if (FCommon.String.includes(arrData[0], "(") == true) {
                        eval(arrData);
                    }
                    else {
                        eval(arrData)();
                    }
                }
            }
        }
    },

    LoadingStart: function () {
        var loading = document.getElementById("loading")
        if (loading != null && loading != undefined) {
            loading.style.display = "block";
            if (document.getElementById('mainDiv') != null) {
                document.getElementById('mainDiv').style.pointerEvents = 'none';
            }

        }
    },

    LoadingEnd: function () {
        var loading = document.getElementById("loading")
        if (loading != null && loading != undefined) {
            loading.style.display = "none";
            if (document.getElementById('mainDiv') != null) {
                document.getElementById('mainDiv').style.pointerEvents = 'auto';
            }
            $('a').click(function (event) {
                event.preventDefault();
            });

            $('html, body').animate({
                scrollTop: 0
            }, 1);
        }
    },

    isLoadingContinue: function () {
        var bLoading = false;
        var ele = null;

        try {
            ele = document.getElementById("loading");
            if (FCommon.UI.isValidObject(ele) == true && FConvert.toString(ele.style.display).toLowerCase() != "none") {
                bLoading = true;
            }
        }
        catch (err) {
            alert("Exception: {GLOBAL.isLoadingContinue} " + err.message);
        }

        return (bLoading);
    },


    // Close existing screen and come back to home page
    gotoHomePage: function () {
        var ele = null;
        try {
            //ele = document.getElementById("DashBoardScreen");
            //if (FCommon.UI.isValidObject(ele) == true) {
            //    ele.style.display = "block";
            //}

            //ele = document.getElementById("page_Content");
            //if (FCommon.UI.isValidObject(ele) == true) {
            //    ele.style.display = "none";
            //    ele.innerHTML = "";
            //}

            //FWrapper.closePopup();

            //ele = document.getElementById("LeftSideDiv");
            //if (FCommon.UI.isValidObject(ele) == true) {
            //    ele.style.minHeight = (parseInt(document.getElementById("DashBoardScreen").style.height) - 100) + "px";
            //}
            //alert("Home");
            var result = NETWORK.executeServerMethod(
                GLOBAL.getContextPath("UpdateUserLogDet", "Focus", ""),
                true,
                { iMenuId: 0 },
                "",
                false);
            //alert(result);
            window.location.href = 'UserDashboard'
            //window.location.href = '@Url.Content("~/GSPApi/UserDashboard")';
        }
        catch (err) {
            alert("Exception: {GLOBAL.gotoHomePage} " + err.message);
        }
    },

    getFooterElement: function () {
        var arrElements = null;

        arrElements = document.getElementsByClassName("main-footer");

        return arrElements.length > 0 ? arrElements[0] : null;
    },

    getThemeColor: function () {
        //return '#34c4f9';
        return '#4689cf';

    },

    getContextPath: function (actionName, controllerName, areaName) {
        var protocol = document.location.protocol;
        var hostname = document.location.host;
        var pathname = document.location.pathname;
        if (pathname.indexOf("/", 1) < 0)
            pathname = pathname + "/";
        pathname = pathname.substring(0, pathname.indexOf("/", 1));
        if (areaName == "" || areaName == null || areaName == undefined)
            return protocol + "//" + hostname + pathname + "/" + controllerName + "/" + actionName;
        return protocol + "//" + hostname + pathname + "/" + areaName + "/" + controllerName + "/" + actionName;
    },

    getPageHeight: function () {
        try {

            var pageContainer = GLOBAL.getPageContainer();
            if (pageContainer.style.display != "none") {
                pageContainer = pageContainer.getBoundingClientRect();
            }
            else {
                pageContainer = document.getElementById("DashBoardScreen").getBoundingClientRect();
            }
            return parseInt(pageContainer.height);
        }
        catch (ex) {
            return (parseInt($(window).height()));
        }
    },

    getGlobalErrorContainer: function () {
        return document.getElementById("idGlobalError");
    },

    getExternalModuleContainer: function () {
        var ele = null;

        ele = document.getElementById("id_global_externalmodule_container");

        return (ele);
    },

    getPageContainer: function () {
        var ele = null;

        ele = document.getElementById(GLOBAL.getContentPageId());

        return (ele);
    },

    // It reloads the entire page. It is called from change language
    pageRefresh: function () {
        window.location.reload(true);
    },

    RefreshMenu: function () {
        lastEle = undefined;
        NETWORK.executeServerMethod(GLOBAL.getContextPath("GetMenus", "Home", ""),
           true,
           null,
           "",
           true,
           "GLOBAL.RefreshMenuSuccess",
           "GLOBAL.LoadingStart",
           "GLOBAL.LoadingEnd"
           );
    },

    RefreshMenuSuccess: function (bSuccess, html) {
        if (bSuccess == true) {
            $("#navigation_menu").html(html);
        }
    },

    // It is called when we click on main menu. It hides quick acess and all open menus.
    DisplayList: function (ele) {

        // It closes the quick access menu
        document.getElementsByClassName("quickaccess")[0].className = "dropdown quickaccess";


        if (ele.parentNode.className != "treeview openMenu") {
            // Hide all other sub menus
            $(ele).parent().parent().find("li.openMenu").removeClass("openMenu");

            // Displays clicked menu detail
            ele.parentNode.className = ele.parentNode.className + " openMenu";
        }
        else {
            // Hides other main menu which is opened
            ele.parentNode.className = "treeview";
        }
    },

    getNumericSeparatorValue: function () {
        var NumericSeparator = document.getElementById("NumericSeparator");
        if (NumericSeparator != null && NumericSeparator != undefined) {
            return parseInt(NumericSeparator.value)
        }
        return 0;
    },

    MakePopupDraggeble: function (id) {
        $("#" + id).draggable({
            handle: ".modal-header"
        });
    },

    updateRecentMenu: function (iMenuId) {
        var result = NETWORK.executeServerMethod(
                GLOBAL.getContextPath("UpdateUsageLog", "Home", ""),
                true,
                { iMenuId: iMenuId },
                "",
                false);
    },

    getLoginId: function () {
        var loginId = document.getElementById("loginId");
        if (loginId != null && !isNaN(loginId.value))
            return parseInt(loginId.value);
        else
            return 0;
    },

    getCalendarType: function () {
        var calendarType = document.getElementById("calendarType");
        if (calendarType != null && !isNaN(calendarType.value))
            return parseInt(calendarType.value);
        else
            return 0;
    },

    getAccountingDate: function () {
        var accountingDate = document.getElementById("accountingDate");
        if (accountingDate != null && !isNaN(accountingDate.value))
            return parseInt(accountingDate.value);
        else
            return 0;
    },

    getCompanyId: function () {
        var companyId = document.getElementById("companyId");
        if (companyId != null && !isNaN(companyId.value))
            return parseInt(companyId.value);
        else
            return 0;
    },

    getGlobalValue: function () {
        var ele = null;
        var obj = null;
        var result = null;

        try {
            obj = {};

            ele = document.getElementById("id_global_value");
            if (FCommon.UI.isValidObject(ele) == false) {
                return;
            }

            obj.CompanyId = FConvert.toInt(ele.getAttribute("data-companyid"));
            obj.LoginId = FConvert.toInt(ele.getAttribute("data-loginid"));
            obj.UserName = ele.getAttribute("data-username");
            obj.LanguageId = FConvert.toInt(ele.getAttribute("data-languageid"));
            obj.AltLanguageId = FConvert.toInt(ele.getAttribute("data-altlanguageid"));
            obj.ModulesImplemented = FConvert.toInt(ele.getAttribute("data-modulesimplemented"));
            obj.CalendarType = FConvert.toInt(ele.getAttribute("data-calendartype"));
            obj.AccountingDate = FConvert.toInt(ele.getAttribute("data-accountingdate"));
            obj.LogId = FConvert.toInt(ele.getAttribute("data-logid"));
            obj.SessionId = ele.getAttribute("data-sessionid");
            obj.LiteVersion = FConvert.toBoolean(ele.getAttribute("data-liteversion"));

            obj.CompanyPreferences = null;
            result = FConvert.stringToObject(ele.getAttribute("data-companypreferences"));
            if (result.lValue > 0) {
                obj.CompanyPreferences = result.data;
            }

            obj.CDID = null;
            result = FConvert.stringToObject(ele.getAttribute("data-cdid"));
            if (result.lValue > 0) {
                obj.CDID = result.data;
            }
        }
        catch (err) {
            COMMON.prototype.showMessage("Exception: {GLOBAL.getGlobalValue} " + err.message);
        }

        return (obj);
    },

    OpenVoucherWizard: function (voucherType, callBackFun) {
        if (callBackFun != undefined) {
            TranactionCallbackFunc = callBackFun;
        }
        result = NETWORK.executeServerMethod(
                                     GLOBAL.getContextPath("DocCustomization", "ConfigureTrans", "TranSettings"),
                                    true,
                                    { iVoucherType: voucherType, FromTransactions: true, objPresentVoucherData: null },
                                    "",
                                    true,
                                    "GLOBAL.LoadScreen",
                                    "GLOBAL.LoadingStart",
                                    "GLOBAL.LoadingEnd"
                                  );
        if (result.lValue > 0) {
            return result.data
        }
        else {
            return null;
        }
    },

    closeVoucherWizard: function (iVoucherType) {
        if (FCommon.String.isNullOrEmpty(TranactionCallbackFunc) == false) {
            if (FCommon.String.includes(TranactionCallbackFunc, "(") >= 0) {
                eval(TranactionCallbackFunc);
            }
            else {
                eval(TranactionCallbackFunc)(iVoucherType);
            }
        }
        else {
            GLOBAL.gotoHomePage();
        }
    },

    getMainPageId: function () {
        return "mainDiv";
    },

    getContentPageId: function () {
        return "page_Content";
    },

    resizeColumn: function (TableId, ExceptFirstColumn) {
        $(function () {
            var table = document.getElementById(TableId);
            if (ExceptFirstColumn == true) {
                var th = " th:not(:first-child)";
            }
            else {
                var th = " th";
            }

            if (table != null) {
                var thHeight = $("table#" + TableId + " th:first").height();
                $("table#" + TableId + th).resizable({
                    handles: "e",
                    minHeight: thHeight,
                    maxHeight: thHeight,
                    resize: function (event, ui) {
                        var sizerID = "#" + $(event.target).attr("id") + "-sizer";
                        $(sizerID).width(ui.size.width);
                    }
                });
            }
        });
    },

    ArrayToEnum: function (arrValues) {
        var arrStringProperties = null;
        var enumObject = {};
        //arrStringProperties = JSON.stringify(arrValues).replace(/[^a-zA-Z 0-9 :,]/g, '').split(',');
        for (var i = 0; i < arrValues.length; i++) {
            Object.defineProperty(
                enumObject,
                arrValues[i].Name,
                {
                    value: arrValues[i].Id,
                    enumerable: true,
                    configurable: true,
                    writable: false
                });
        }
        return enumObject;
    },

    CloseExternalScreen: function () {
        var frame = document.getElementById("ExternalFrame");
        frame.innerHTML = "";
        frame.parentNode.removeChild(frame);
    },
};
var alertsScreenId = 0;
var alertsHeaderId = new Array();
GENERAL = {
    //Update recent Menus in Recent Activities
    updateRecentMenu: function () {
        document.getElementsByClassName("quickaccess")[0].className = "dropdown quickaccess";
        var result = null;
        //var url = GLOBAL.getContextPath("RecentMenu", "Home", "");
        var result = NETWORK.executeServerMethod(GLOBAL.getContextPath("RecentMenu", "Home", ""),
            true,
            null,
            "",
            false);
        if (result.lValue > 0)
            $("#recentMenuUL").html(result.data);
    },

    searchMenu: function (ele, data, tag, evt) {
        try {
            if (COMMON.prototype.isBoolean(ele) == true) {
                if (ele == false) {
                    return;
                }
                if (tag == 'searchULinMin') {
                    $('#searchULinMin li:not(:first)').remove();
                }
                else {
                    $('#homeMenuRun li').remove();
                    if (tag != '') {
                        document.getElementById(tag).parentNode.className = 'dropdown searchBox hidden-xs open';
                        if (data.length == 0)
                            document.getElementById(tag).parentNode.className = 'dropdown searchBox hidden-xs';
                    }
                }
                for (var i = 0; i < data.length; i++) {
                    var li = document.createElement("li");
                    $(li).addClass("treeview");
                    var a = document.createElement("span");
                    a.setAttribute("id", data[i]["MenuId"]);
                    //a.setAttribute("text", data[i]["MenuText"]);
                    a.innerHTML = data[i]["MenuText"];


                    a.setAttribute("onclick", "SHORTCUT.openView(this,false,event)");
                    //a.setAttribute("title", "abc");           //Added to display tooltip for the li element.                
                    var url = GLOBAL.getContextPath("LoadView", "Home");
                    url = url + "?type=" + data[i]["MenuType"];
                    url = url + "&iTypeId=" + data[i]["TypeId"];
                    url = url + "&iMenuId=" + data[i]["MenuId"]
                    url = url + "&iCallFromMenu=1";
                    for (var j = 0; j < data[i]["ActionId"].length; j++) {
                        url = url + "&actionId=" + data[i]["ActionId"][j];
                    }
                    a.setAttribute("href", url);
                    li.setAttribute("tabindex", i);
                    li.appendChild(a);
                    document.getElementById(tag).appendChild(li);
                }
            }
            var lis = $('#homeMenuRun li');
            $("#homeMenuRun").scrollTop(0);//set to top
            if (FCommon.UI.isValidObject(evt) == true && evt.which) {
                //alert($("#homeMenuRun").scrollTop($('.selected:first').offset().top - $("#homeMenuRun").outerHeight()));
                if (evt.which === 40 || evt.keyCode === 40) {
                    if (liSelected) {
                        liSelected.removeClass('selected');
                        next = liSelected.next();
                        if (next.length > 0) {
                            liSelected = next.addClass('selected');


                            $("#homeMenuRun").scrollTop(($('.selected:first').offset().top - 30) - $("#homeMenuRun").outerHeight());
                            $('#homeMenuRun li:first').css("background-color", "");
                            return;
                        } else {
                            liSelected = lis.eq(0).addClass('selected');

                            return;
                            //$('#homeMenuRun li:first').css("background-color", "");
                        }
                    } else {
                        liSelected = lis.eq(0).addClass('selected');

                        return false;
                        //$('#homeMenuRun li:first').css("background-color", "");
                    }
                }
                else if (evt.which === 38 || evt.keyCode === 38) {
                    if (liSelected) {
                        liSelected.removeClass('selected');
                        next = liSelected.prev();
                        if (next.length > 0) {
                            liSelected = next.addClass('selected');

                            $("#homeMenuRun").scrollTop(($('.selected:first').offset().top - 30) - $("#homeMenuRun").outerHeight());

                            return false;
                        } else {
                            liSelected = lis.last().addClass('selected');
                            $("#homeMenuRun").scrollTop(($('.selected:first').offset().top));
                            return false;
                        }
                    }
                    else {
                        liSelected = lis.last().addClass('selected');
                        $('#homeMenuRun li:first').css("background-color", "");
                        return false;
                    }
                }
                if (evt.which === 13 || evt.keyCode === 13) {
                    if ($('#homeMenuRun li.selected').length == 0) {
                        liSelected = lis.eq(0).addClass('selected');
                    }
                    $('#homeMenuRun li.selected').find('span').trigger('click');
                    $(ele).val("");
                    $('#homeMenuRun li').remove();
                    if (tag != '') {
                        if (FCommon.UI.isValidObject(document.getElementById(tag))) {
                            document.getElementById(tag).parentNode.className = 'dropdown searchBox hidden-xs';
                        }
                    }
                }
            }

            if (FCommon.UI.isValidObject(evt) == true && FCommon.UI.isValidObject(ele.value) == true) {
                if (ele.value.replace(/\s/g, '').length > 0) {
                    result = NETWORK.executeServerMethod(GLOBAL.getContextPath("searchMenu", "Home", ""),
                                                        true,
                                                        { like: $(ele).val() },
                                                        "",
                                                        true,
                                                        "GENERAL.searchMenu", "", "", data, evt);
                    $(ele).focus();
                }
                else {
                    $('#searchULinMin li:not(:first)').remove();
                    $('#homeMenuRun li').remove();
                    document.getElementById('homeMenuRun').parentNode.className = 'dropdown searchBox hidden-xs';
                }
            }
            //if ($('#homeMenuRun li:first').length > 0) {
            //$('#homeMenuRun li:first').css("background-color", "rgb(222, 245, 253)");
            //$('#homeMenuRun li:first').setAttribute("onclick", "SHORTCUT.openView(this,false,event)");
            //$('#homeMenuRun li:first').css("background-color", "");
            //}
            if (document.getElementById('homeMenuRun').children.length > 0) {
                //$('#homeMenuRun li:first').css("background-color", "rgb(222, 245, 253)");
                document.getElementById('homeMenuRun').children[0].style.backgroundColor = "rgb(222, 245, 253)";
                document.getElementById('homeMenuRun').children[0].setAttribute("onclick", "SHORTCUT.openView(this,false,event)")
                //$('#homeMenuRun li:first').css("background-color", "");
            }
        }
        catch (err) {
            //alert("Exception: {GENERAL.searchMenu} " + err.message);
        }
    },

    Navigateli: function (ele, e) {
        var li = $(ele).find('li');
        if (e.which === 40) {
            if (liSelected) {
                liSelected.removeClass('selected');
                next = liSelected.next();
                if (next.length > 0) {
                    liSelected = next.addClass('selected');
                } else {
                    liSelected = li.eq(0).addClass('selected');
                }
            } else {
                liSelected = li.eq(0).addClass('selected');
            }
        } else if (e.which === 38) {
            if (liSelected) {
                liSelected.removeClass('selected');
                next = liSelected.prev();
                if (next.length > 0) {
                    liSelected = next.addClass('selected');
                } else {
                    liSelected = li.last().addClass('selected');
                }
            } else {
                liSelected = li.last().addClass('selected');
            }
        }
    },

    Logout: function () {
        var bResult = false;

        if (FCommon.UI.isValidObject(document.getElementById("id_transaction_entry_container")) == true) {
            try {
                bResult = TRANSACTION_ENTRY.isSafeForLogout();
                if (bResult == false) {
                    return;
                }
            }
            catch (err) { }
        }

        var url = GLOBAL.getContextPath("Logout", "Home", "");
        GLOBAL.LoadingStart();
        result = NETWORK.executeServerMethod(url, true);
        GLOBAL.LoadingEnd();
        $('#mainDiv').html(result.data);
        $('#mainDiv').addClass("animated flip").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
            $('#mainDiv').removeClass("animated flip");
        });
    },

    //alerts child expand
    expandChild: function (ele) {
        if (lastSelectedRecentItem != undefined && lastSelectedRecentItem != ele) {
            GENERAL.colapseRecentItems(ele);
            //if () {
            //    $(lastSelectedRecentItem.nextElementSibling).slideUp("slow");
            //    lastSelectedRecentItem.parentNode.className = "treeview";
            //    lastSelectedRecentItem.children[0].className = "icon-arrowhead5 icon-font7";
            //}
        }
        $(ele.nextElementSibling).slideToggle("slow");
        if (ele.children[0].className == "icon-right-arrow icon-font8") {
            ele.parentNode.className = ele.parentNode.className + " active";
            ele.children[0].className = "icon-down-arrow icon-font8";
            lastSelectedRecentItem = ele;

        }
        else {
            ele.parentNode.className = "treeview";
            ele.children[0].className = "icon-right-arrow icon-font8";
        }

    },

    colapseRecentItems: function (ele) {

        var previousele = document.getElementById("recentItems").children[0].children;
        if (previousele[0].className == "treeview active" && previousele[0] != ele.parentNode.parentNode.parentNode) {
            $(previousele[0].children[1]).slideToggle("slow");
            previousele[0].className = "treeview";
            previousele[0].children[0].children[0].className = "icon-right-arrow icon-font8";

        }
        else if (previousele[1].className == "treeview active" && previousele[1] != ele.parentNode.parentNode.parentNode) {
            $(previousele[1].children[1]).slideToggle("slow");
            previousele[1].className = "treeview";
            previousele[1].children[0].children[0].className = "icon-right-arrow icon-font8";
        }
        var childs = $(previousele[0]).find(".treeview.active");
        for (var count = 0; count < childs.length; count++) {
            if (childs[i].children[0] != ele) {
                $(childs[i].children[1]).slideUp("slow");
                childs[i].className = "treeview";
                childs[i].children[0].className = "treeview";
                childs[i].children[0].children[0].className = "icon-right-arrow icon-font8";
            }
        }
        var childs = $(previousele[1]).find(".treeview.active");
        for (var count = 0; count < childs.length; count++) {
            if (childs[i].children[0] != ele) {
                $(childs[i].children[1]).slideUp("slow");
                childs[i].className = "treeview";
                childs[i].children[0].className = "treeview";
                childs[i].children[0].children[0].className = "icon-right-arrow icon-font8";
            }
        }
    },

    clearSearchBox: function (ele) {
        $("#searchMin").val('');
        GENERAL.searchMenu(document.getElementById("searchMin"));
    },

    favouritesSettings: function (id) {
        var element = document.getElementById(id);
        if (element.className.indexOf("showMenu") > 0) {
            $("#" + id).removeClass("showMenu");
            document.getElementById("shortcutUl").children[0].style = "";
        }
        else {
            $("#" + id).addClass("showMenu");
            document.getElementById("shortcutUl").children[0].style = "border-left:solid 1px #B9B9B9;";
        }
    },

    AuthorizeGroup: function (element) {
        //GLOBAL.updateView(event, $("#navigation_menu").find("[data-bind='" + element.id + "']"));
        result = NETWORK.executeServerMethod(GLOBAL.getContextPath("OpenAuthorizationView", "TransHome", "Transactions"), true, { iVoucherType: parseInt(element.id), iPurpose: 1 }, "", true, "GLOBAL.LoadScreen", "GLOBAL.LoadingStart", "GLOBAL.LoadingEnd");
        $('li.notifications-menu').removeClass('open');
    },

    expandNextUL: function (ele, event) {
        event.stopPropagation();
        $('.notifications-menu').addClass('open');
        if ($(ele).next().css("display") == "none") {
            $(ele).next().css("display", "block");
            if ($(ele).find("i")[0].className.indexOf("icon-right-arrow") > -1) {
                className = "icon-right-arrow";
                $(ele).find("i").removeClass("icon-right-arrow").addClass("icon-down-arrow");
            }
            else {
                className = "icon-left-arrow";
                $(ele).find("i").removeClass("icon-left-arrow").addClass("icon-down-arrow");
            }

        }
        else {
            $(ele).next().css("display", "none");
            $(ele).find("i").removeClass("icon-down-arrow").addClass(className);
        }

    },



    // It opens change password. It is called from three places(Home Page > Change Password, Home > Security > Change Password, and at the time of login).
    changePassword: function (element, e) {
        e.preventDefault();
        GLOBAL.updateNavigation(element);
        var sURL = $(element).attr('href');
        $(".user-menu").removeClass("open");
        var result = null;
        result = NETWORK.executeServerMethod(sURL, true, null, "", true, "GLOBAL.LoadScreen", "GLOBAL.LoadingStart", "GLOBAL.LoadingEnd");
    },

    getSupportedGraphType: function () {
        var iCounter = 0;
        var data = null;
        var result = null;

        try {
            result = COMMON.prototype.getEmptyResultObject();
            result.lValue = 0;
            result.sValue = "";
            result.data = [];
            data = COMMON.prototype.getObjectPropertyValueArray(RD_GraphType.get(), true);
            for (iCounter = 0; iCounter < data.value.length; iCounter++) {
                switch (data.value[iCounter]) {
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 9:
                        result.data.push({ Id: data.value[iCounter], Name: data.property[iCounter] });
                        result.lValue++;
                        break;
                }
            }
        }
        catch (err) {
            result.lValue = -1;
            result.sValue = "{getSupportedGraphType} " + err.message;
            result.data = null;
        }

        return (result);
    },

    ValidateNumber: function (element) {
        var reg = /^\d+$/;
        var value = element.value;
        //var patt1 = /^\d+$/;
        var cursorPos = element.selectionStart;
        if (!reg.test(element.value)) {
            element.value = GENERAL.replaceAt(value, cursorPos - 1, '');
        }
        //iCaretPos = element.selectionStart;
        //var result = element.value.match(patt1);
        //element.value = result;
    },
    // replace the 'n'th character of 's' with 't'
    replaceAt: function (str, index, replaceChar) {
        return str.substring(0, index) + replaceChar + str.substring(index + 1);
    }
}
var parent_Presnt;
var parent_Prv;
var lastEle = undefined;
var parent_ele;
var flag = false;

LAYOUT = {
    //expanding collapsing menu when user click on sub menu 
    expandCollapse: function (ele, e) {
        e.preventDefault();
        if (lastEle != undefined) {
            if ($(lastEle).next()[0] != $(ele).parent().parent()[0]) {
                $(lastEle).next("ul").slideUp("slow");
                $(lastEle).parent().removeClass("active").addClass("treeview");
                LAYOUT.parent(lastEle, ele);
                ele.children[1].className = "fa fa-angle-right pull-right";
                lastEle[0].children[1].className = "fa fa-angle-right pull-right";
            }
        }
        // parent(this);
        if ($(ele).next("ul").css('display') == "none") {
            $(ele).next("ul").slideDown("slow");
            $(ele).parent().removeClass("treeview").addClass("active theme_button_color");
            // $(ele).children(".fa-angle-left").removeClass("fa-angle-left").addClass("fa-angle-down");
            ele.children[1].className = "fa fa-angle-down pull-right";
            lastEle = $(ele);
        }
        else if ($(ele).next("ul").css('display') == "block") {
            $(ele).next("ul").slideUp("slow");
            lastEle = $(ele);
        }
    },

    //recursive method collapses all sub menus which are opened
    parent: function (lastEle, prasent) {
        lastEle = $(lastEle).parent().parent()[0];
        if ($(lastEle).attr('id') != "navigation_menu" && $(lastEle)[0] != $(prasent).parent().parent()[0]) {
            $(lastEle).slideUp("slow");
            $(lastEle).parent().removeClass("active").addClass("treeview");
            $(lastEle).parent().find(".fa-angle-down").removeClass("fa-angle-down").addClass("fa-angle-right");
            LAYOUT.parent(lastEle, prasent);
        }
    },

    // It displays the quick access drop down. Home Page > Quick access
    getQuickAccess: function (event) {
        var sExpiryDate = document.getElementById("hdnsValidTillDate").value;
        var result = NETWORK.executeServerMethod(
             GLOBAL.getContextPath("GetQuickAccess", "Home", ""),
             true,
             { sExpiryDate: sExpiryDate },
             "",
             true,
             "LAYOUT.getQuickAccessSuccess",
             "GLOBAL.LoadingStart",
             "GLOBAL.LoadingEnd");
    },

    // Callback method of getQuickAccess
    getQuickAccessSuccess: function (bSuccess, html, event) {
        if (bSuccess == true) {
            $("#quickAccessDiv").html(html);
        }
    },

    RecentMasters: function (element) {
        document.getElementsByClassName("quickaccess")[0].className = "dropdown quickaccess";
        var mastertypeid = element.dataset.mastertypeid;
        var masterid = element.dataset.masterid;
        var isAuthurize = element.dataset.alerts;
        var alertId = element.dataset.alertid;

        result = NETWORK.executeServerMethod(
                        GLOBAL.getContextPath("OpenRecentMaster", "Home", ""),
                        true,
                        { iMasterTypeId: mastertypeid, iMasterId: masterid, isAuthorize: isAuthurize, iAlertId: alertId },
                        "",
                        true,
                        "GLOBAL.LoadScreen",
                        "GLOBAL.LoadingStart",
                        "GLOBAL.LoadingEnd"
                  );
    },

    RecentTransactions: function (element) {
        document.getElementsByClassName("quickaccess")[0].className = "dropdown quickaccess";
        GLOBAL.updateRecentMenu(element.getAttribute('data-vtype'));
        var sCallFrom = element.getAttribute('data-callFrom');
        var sModulename = '';
        if (sCallFrom != undefined && sCallFrom == 'RecentTransactions') {
            sModulename = 'Transactions';
        }
        else {
            sModulename = element.getAttribute('data-modulename');
        }
        if (sModulename == '') {
            var sModuleid = element.getAttribute('data-moduleid');
            switch (sModuleid) {
                case '0':
                    sModulename = 'Masters';
                    break;
                case '1':
                    sModulename = 'Transactions';
                    break;
                case '11':
                    sModulename = 'CreditManagement';
                    break;
                case '15':
                    sModulename = 'CoreTransactions';
                    break;
            }
        }
        if (sModulename == 'Transactions') {
            if (element.getAttribute('data-alertid') == null) {
                NETWORK.executeServerMethod(GLOBAL.getContextPath("EntryMain", "TransHome", "Transactions"),
                        true,
                        { iVoucherType: element.getAttribute('data-vtype'), lId: 0, iViewId: 0, sVoucherNo: element.getAttribute('data-headid') },
                        "html",
                        true,
                        "LAYOUT.RecentTransactionsSuccess",
                        "GLOBAL.LoadingStart",
                        "GLOBAL.LoadingEnd");
            }
            else {
                NETWORK.executeServerMethod(GLOBAL.getContextPath("EntryMain", "TransHome", "Transactions"),
                                    true,
                                    { iVoucherType: element.getAttribute('data-vtype'), lId: element.getAttribute('data-headid'), iViewId: 0, sVoucherNo: '' },
                                    "html",
                                    true,
                                    "LAYOUT.RecentTransactionsSuccess",
                                    "GLOBAL.LoadingStart",
                                    "GLOBAL.LoadingEnd");
            }
        }
        else if (sModulename == 'CreditManagement') {
            NETWORK.executeServerMethod(GLOBAL.getContextPath("PostRecurringJournal", "CreditManagement", "CreditManagement"),
                                   true,
                                   { iAlertId: element.getAttribute('data-alertid') },
                                   "html",
                                   true,
                                   "LAYOUT.RecentTransactionsSuccess",
                                   "GLOBAL.LoadingStart",
                                   "GLOBAL.LoadingEnd");
        }
        else if (sModulename == 'Masters') {

        }
        else if (sModulename == 'CoreTransactions') {
            NETWORK.executeServerMethod(GLOBAL.getContextPath("PDCConversion", "PDC", "CoreTransactions"),
                                  true,
                                  {},
                                  "html",
                                  true,
                                  "LAYOUT.RecentTransactionsSuccess",
                                  "GLOBAL.LoadingStart",
                                  "GLOBAL.LoadingEnd");
        }
    },

    RecentTransactionsSuccess: function (bSuccess, html) {
        if (bSuccess == true) {
            GLOBAL.LoadScreen(true, html);
            TRANSACTION_ENTRY.UI.setCloseCallback("LAYOUT.UpdateAlerts");
        }
    },

    CloseTransactions: function (element) {
        NETWORK.executeServerMethod(GLOBAL.getContextPath("CloseTransaction", "Home", ""),
                                    true,
                                    { AlertId: element.dataset.alertid },
                                    "",
                                    true,
                                    "LAYOUT.UpdateAlerts",
                                    "GLOBAL.LoadingStart",
                                    "GLOBAL.LoadingEnd");
    },

    copyToClipboard: function (ele) {
        ele = ele.previousElementSibling;
        Copied = ele.createTextRange();
        Copied.execCommand("Copy");
    },

    // It changes the entire page language(Home Page > Language).
    ChangeLang: function (ele) {
        var dblExpiryDays = 0;
        if (FCommon.UI.isValidObject(document.getElementById('hdnidblExpiryDays'))) {
            dblExpiryDays = document.getElementById('hdnidblExpiryDays').value;
        }
        var result = NETWORK.executeServerMethod(
                            GLOBAL.getContextPath("ChangeLangInHome", "Home", ""),
                            true,
                            { LanguageId: ele.value, dblExpiryDays: dblExpiryDays },
                            "",
                            false,
                            "",
                            "GLOBAL.LoadingStart",
                            "GLOBAL.LoadingEnd"
                   );
        if (result.lValue > 0 && result.data != "" && result.data != null) {
            if (result.data.length > 100) {
                GLOBAL.GlobalCacheArrayForMasters = [];
                GLOBAL.GlobalCacheForMasterEntryScreen = [];
                $('#mainDiv').html(result.data);
                $('#mainDiv').addClass("animated flip").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
                    $('#mainDiv').removeClass("animated flip");
                    $('#mainDiv').addClass("flipper");
                });
            }
        }
        //GLOBAL.pageRefresh();
    },

    UpdateAlerts: function () {
        GLOBAL.gotoHomePage();
        NETWORK.executeServerMethod(
                    GLOBAL.getContextPath("GetAlerts", "Home", ""),
                    true,
                    null,
                    "",
                    true,
                    "LAYOUT.UpdateAlertsSuccess",
                    "GLOBAL.LoadingStart",
                    "GLOBAL.LoadingEnd"
             );
    },


    // It is callback of UpdateAlerts
    UpdateAlertsSuccess: function (bSuccess, html) {
        if (bSuccess) {
            $("#alertsUL").html(html);
        }
    }
}

SHORTCUT = {
    update: function (flag, data) {
        if (flag == true) {
            $("#shortcutUl").html(data);
        }
    },

    //saving selected shortcut in Add Shortcut Dialog
    save: function (ele) {
        var items = [];
        var lsPreviousShortcuts = $("#shortcutUl li");
        for (var i = 0; i < lsPreviousShortcuts.length ; i++) {
            items.push(lsPreviousShortcuts[i].children[1].id)//find(">span").attr("id");
        }
        var count = 0;
        for (count = 0; count < items.length; count++) {
            if (items[count] == ele.id)
                break;
        }
        if (count >= items.length) {
            items.push(ele.id);
            var url = GLOBAL.getContextPath("listShortCut", "Home", "");
            var result = null;
            result = NETWORK.executeServerMethod(url, true, { arrShortcuts: items, iType: 0 }, "", true, "SHORTCUT.update", "GLOBAL.LoadingStart", "GLOBAL.LoadingEnd");
        }
    },

    //Delecte Selected shortcut in Delete Shortcut Dialog
    delete: function (id) {
        var items = [];
        items.push(id);
        var url = GLOBAL.getContextPath("listShortCut", "Home", "");
        result = NETWORK.executeServerMethod(url, true, { arrShortcuts: items, iType: 1 }, "", true, "SHORTCUT.update", "GLOBAL.LoadingStart", "GLOBAL.LoadingEnd");
    },

    //open selected shortcut in shoortMenu
    openView: function (ele, fromFavourites, event) {

        if (fromFavourites == true) {
            if ($("#favourites").hasClass("showMenu"))
                return 0;
        }
        GLOBAL.updateView(event, $("#navigation_menu").find("#" + $(ele).attr("id")));
        $(".quickaccess").removeClass("open");
        $(".quickaccess").find(">a").attr("aria-expanded", false);
    }

}

FORMULA = {
    setEvents: function (id) {
        $('#' + id + "_txtbox").on('click', function (event) {
            $('#' + id).toggleClass('open');
        });
        $(document).on('click', function (e) {
            if (!$('#' + id + "_formulaDiv").is(e.target)
                //&& $('li.dropdown.mega-dropdown').has(e.target).length === 0
                && $('.open').has(e.target).length === 0
            ) {
                $('#' + id).removeClass('open');
            }
        });
        //Formula ctrl focus on tab key press
        $("#" + id + "_formulaText").focusout(function () {
            $("#" + id + "_availableVariables").focus();
        });
        $("#" + id + "_availableVariables").focusout(function () {
            $("#" + id + "_PlusOpt").focus();
        });
        $("#" + id + "_Cancel").focusout(function () {
            $("#" + id + "_formulaText").focus();
        });
        $("#" + id + " .Fbutton").focusin(function () {
            $(this).css('background-color', '#34c4f9');
        }).focusout(function () {
            $(this).css('background-color', '');
        });
        $("#" + id + " td").css('white-space', 'normal');
        var Rows = FGRIDCONTROL.getTotalRows("formulaGrid" + id);
        for (var i = 1; i <= Rows; i++) {
            var cellObj = FGRIDCONTROL.getCellObject("formulaGrid" + id, i, 2);
            if (FGRIDCONTROL.getCellObject("formulaGrid" + id, i, 3).getCellText() == "")
                cellObj.cell.innerHTML = "<span class='icon-collepse icon-font8' style='padding:5px;cursor:pointer;' onclick='FORMULA.collaspeGrid(this," + id + "," + i + ")'></span>" + cellObj.cell.innerHTML;
            else
                cellObj.cell.style.paddingLeft = "25px";
        }

    },
    collaspeGrid: function (ele, id, iRow) {
        try {
            ele.className = $(ele).hasClass("icon-expand") ? "icon-collepse icon-font8" : "icon-expand icon-font8";
            var Rows = FGRIDCONTROL.getTotalRows("formulaGrid" + id.id);
            for (var i = iRow + 1; i <= Rows; i++) {
                if (FGRIDCONTROL.getCellObject("formulaGrid" + id.id, i, 3).getCellText() == "")
                    break;
                var rowEle = FGRIDCONTROL.getRowElement("formulaGrid" + id.id, i);
                rowEle.style.display = $(ele).hasClass("icon-expand") ? "none" : "";
            }
        } catch (e) {

        }
    },
    createControl: function (Id, ClassName, Value) {
        result = NETWORK.executeServerMethod(
            GLOBAL.getContextPath("CreateFormulaControl", "Home"),
            true,
            {
                sId: Id,
                sClassName: ClassName,
                sValue: Value
            },
            "",
            false);
        if (result.lValue > 0) {
            return result.data;
        }
        else
            return null;
    },

    toggleUl: function (element, event) {
        event.preventDefault();
        if (element.nextElementSibling.style.display == "block")
            element.nextElementSibling.style.display = "none";
        else
            element.nextElementSibling.style.display = "block";
    },
    toggleInput: function (ele, controlId) {
        try {
            var eleFtextBox = document.getElementById(controlId + "_formulaText");
            eleFtextBox.value = formulaTextBoxVal = ele.value;
            FORMULA.addToFormula(eleFtextBox, controlId);
        } catch (e) {

        }
    },
    addToFormula: function (ele, controlId) {
        if (ele.val != "")
            document.getElementById(controlId + "_textbox").value = ele.value;
        var inputValue = ele.value;
        for (var i = 0; i < inputValue.length; i++) {
            if (/^[a-zA-Z0-9]*$/.test(inputValue[i]) == false) {
                if (inputValue[i] == '+' ||
                    inputValue[i] == '-' ||
                    inputValue[i] == '*' ||
                    inputValue[i] == '/' ||
                    inputValue[i] == '\\' ||
                    inputValue[i] == '(' ||
                    inputValue[i] == ')' ||
                    inputValue[i] == '~' ||
                    inputValue[i] == '&' ||
                    inputValue[i] == '%' ||
                    inputValue[i] == '?' ||
                    inputValue[i] == ':' ||
                    inputValue[i] == '<' ||
                    inputValue[i] == '>' ||
                    inputValue[i] == '|' ||
                    inputValue[i] == '~' ||
                    inputValue[i] == ',' ||
                    inputValue[i] == '@') {
                    arrOperatorPos.push({ value: i, text: inputValue.charAt(i) });

                }
            }
        }
        document.getElementById(controlId + "_expandedFormula").innerHTML = ""//children[0].remove();
        var formulaLi = document.createElement("li");
        var li = document.getElementById(controlId + "_expandedFormula").appendChild(formulaLi);
        if (arrOperatorPos.length > 0) {
            var temp = inputValue.substring(0, arrOperatorPos[0].value);
            var exist = false;
            var Gridtotalrows = FGRIDCONTROL.getTotalRows("formulaGrid" + controlId);
            for (var irow = 1; irow <= Gridtotalrows; irow++) {
                RowValues = FGRIDCONTROL.getRowValue("formulaGrid" + controlId, irow);
                if (RowValues[2].Text.toLowerCase() == temp.toLowerCase()) {
                    exist = true;
                    li.textContent = RowValues[1].Text;
                    break;
                }
            }
            if (exist == false)
                li.textContent = temp;
            if (arrOperatorPos.length == 1) {
                var li = document.getElementById(controlId + "_expandedFormula").children[0];
                temp = inputValue.substring(arrOperatorPos[0].value + 1);
                var exist = false;
                var Gridtotalrows = FGRIDCONTROL.getTotalRows("formulaGrid" + controlId);
                for (var irow = 1; irow <= Gridtotalrows; irow++) {
                    RowValues = FGRIDCONTROL.getRowValue("formulaGrid" + controlId, irow);
                    if (RowValues[2].Text.toLowerCase() == temp.toLowerCase()) {
                        exist = true;
                        li.textContent = li.textContent + arrOperatorPos[0].text + RowValues[1].Text;
                        break;
                    }
                }

                if (exist == false) {
                    li.textContent = li.textContent + arrOperatorPos[0].text + temp;
                }
            }
            else {
                var li = document.getElementById(controlId + "_expandedFormula").children[0];
                for (var j = 0; j < arrOperatorPos.length; j++) {
                    if ((j + 1) == arrOperatorPos.length)
                        temp = inputValue.substring(arrOperatorPos[j].value + 1);
                    else
                        temp = inputValue.substring(arrOperatorPos[j].value + 1, arrOperatorPos[j + 1].value);
                    var exist = false;

                    var Gridtotalrows = FGRIDCONTROL.getTotalRows("formulaGrid" + controlId);
                    for (var irow = 1; irow <= Gridtotalrows; irow++) {
                        RowValues = FGRIDCONTROL.getRowValue("formulaGrid" + controlId, irow);
                        if (RowValues[2].Text.toLowerCase() == temp.toLowerCase()) {
                            exist = true;
                            li.textContent = li.textContent + arrOperatorPos[j].text + RowValues[1].Text;
                            break;
                        }
                    }

                    if (exist == false) {
                        li.textContent = li.textContent + arrOperatorPos[j].text + temp;
                    }
                }
            }
        }
        else {
            li = document.getElementById(controlId + "_expandedFormula").children[0];
            var exist = false;

            var Gridtotalrows = FGRIDCONTROL.getTotalRows("formulaGrid" + controlId);
            for (var irow = 1; irow <= Gridtotalrows; irow++) {
                RowValues = FGRIDCONTROL.getRowValue("formulaGrid" + controlId, irow);

                if (inputValue.toLowerCase() == RowValues[2].Text.toLowerCase()) {
                    exist = true;

                    if (li == undefined) {
                        var formulaLi = document.createElement("li");
                        formulaLi.textContent = RowValues[2].Text;
                        document.getElementById(controlId + "_expandedFormula").appendChild(formulaLi);
                        break;
                    }
                    else {
                        li.textContent = RowValues[1].Text;
                        break;
                    }
                } else {
                    li.textContent = inputValue;
                }
            }
        }
        arrOperatorPos = [];
    },

    addOperator: function (element, controlId) {
        document.getElementById(controlId + "_formulaText").value = document.getElementById(controlId + "_textbox").value = document.getElementById(controlId + "_formulaText").value + element.textContent;
        document.getElementById(controlId + "_expandedFormula").children[0].textContent = document.getElementById(controlId + "_expandedFormula").children[0].textContent + element.textContent;
        document.getElementById(controlId + "_formulaText").oninput;
    },

    addCoddition: function (operator, controlId) {
        if (document.getElementById(controlId + "_expandedFormula").children[0] != undefined)
            document.getElementById(controlId + "_expandedFormula").children[0].remove();
        var formulaLi = document.createElement("li");
        formulaLi.textContent = operator;
        document.getElementById(controlId + "_expandedFormula").appendChild(formulaLi);
        document.getElementById(controlId + "_formulaText").value = document.getElementById(controlId + "_textbox").value = operator;
        document.getElementById(controlId + "_formulaText").oninput;
    },

    returnFormula: function (controlId) {
        var controlTextBox = document.getElementById(controlId + "_textbox");
        controlTextBox.value = document.getElementById(controlId + "_formulaText").value;
        //controlTextBox.nextElementSibling.style.display = "none";
        document.getElementById(controlId).className = "form-group dropdown";
    },

    searchVariables: function (element, controlId) {

        var Gridtotalrows = FGRIDCONTROL.getTotalRows("formulaGrid" + controlId);

        for (var irow = 1; irow <= Gridtotalrows; irow++) {
            RowValues = FGRIDCONTROL.getRowValue("formulaGrid" + controlId, irow);
            var txtSearch = document.getElementById(controlId + "_availableVariables").value.toLowerCase();
            if (RowValues[2].Text.toLowerCase().indexOf(txtSearch) == -1 && RowValues[1].Text.toLowerCase().indexOf(txtSearch) == -1) {
                var FGridElement = FGRIDCONTROL.getRowElement("formulaGrid" + controlId, irow);
                FGridElement.style.display = "none";
            }
            else {
                var FGridElement = FGRIDCONTROL.getRowElement("formulaGrid" + controlId, irow);
                FGridElement.style.border = "0";
                FGridElement.style.display = "block";
            }
        }
    },

    getFocus: function (element, controlId) {
        $('#' + controlId).addClass('open');
        var formulatxtBox = document.getElementById(controlId + "_formulaText");
        formulatxtBox.value = formulaTextBoxVal = element.value;
        formulatxtBox.oninput();
    },

    cancelFormula: function (controlId) {
        document.getElementById(controlId + "_textbox").value = formulaTextBoxVal;
        document.getElementById(controlId).className = "form-group dropdown";
    }
}

//$(document).click(function (e) {
//    var container = $("#navigation_menu");

//    if (!container.is(e.target) // if the target of the click isn't the container...
//        && container.has(e.target).length === 0) // ... nor a descendant of the container
//    {
//        $("#navigation_menu").find("li.openMenu").removeClass("openMenu");
//    }

//});