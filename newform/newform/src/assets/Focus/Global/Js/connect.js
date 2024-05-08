///*
//function addRowsToTable(oTBody , sResponseData)
//function removeAllRows(tBody)
//function fillTable(sResponse)
//function sendPostRequest(strURL, isPostMethod,sSubmitData,resHandler,readXML,statusId) ---var sStatusId=null;var responseHandler=null;var readXML=null;
//function processRequest()
//function clearControls(docForm)
//function formData2QueryString(docForm)
//*/

//var con = new function () {
//    this.RESPONSE_PLAIN = 0; // script
//    this.RESPONSE_HTML = 1; // html code
//    this.RESPONSE_XML = 2;


//    var objRequests = null, iActiveCnt = 0, CONNECTION_LIMIT = 5, iBackgrndCnt = 0;


//    this.getActiveCount = function () {
//        return iActiveCnt - iBackgrndCnt;
//    };

//    this.confirmCallback = function (iStatus) {
//        //  alert("--");
//        if (iStatus == Constants.YES) {
//            window.location.href = "/streamline/crmhome.do";
//        }
//    };
//    this.sendGetRequest = function (strURL, sSubmitData, handlerObject, resHandler, responseAsXML, statusId, sSubActivity, isSync, byActionType) {
//        return new sendRequest(strURL, false, sSubmitData, handlerObject, resHandler, responseAsXML, statusId, sSubActivity, isSync, byActionType, false)
//    };

//    this.sendPostRequest = function (strURL, sSubmitData, handlerObject, resHandler, responseAsXML, statusId, sSubActivity, isSync, isShowStatusMsg, byActionType) {
//        return new sendRequest(strURL, true, sSubmitData, handlerObject, resHandler, responseAsXML, statusId, sSubActivity, isSync, isShowStatusMsg, byActionType, false)
//    };
//    this.sendNonUItRequest = function (strURL, sSubmitData, handlerObject, resHandler, responseAsXML, statusId, sSubActivity, isSync, isShowStatusMsg, byActionType) {
//        return new sendRequest(strURL, true, sSubmitData, handlerObject, resHandler, responseAsXML, statusId, sSubActivity, isSync, isShowStatusMsg, byActionType, true)
//    };


//    /**
//    * Send request to servlet
//    @param strURL
//    @param isPostMethod
//    @param sSubmitData
//    @param resHandler
//    @param responseAsXML
//    @param statusId
//    **/
//    function sendRequest(strURL,
//                         isPostMethod,
//                         sSubmitData,
//                         handlerObj,
//                         resHandler,
//                         responseType,
//                         statusId,
//                         sSubActivity,
//                         isSync,
//                         isShowStatusMsg,
//                         byActionType,
//                         isNonUI

//            ) {
//        var me = this;
//        me.statusTag = null;
//        me.xmlHttpReq = null;
//        me.responseType = responseType;
//        me.handlerObject = handlerObj;
//        me.responseHandler = resHandler;
//        me.bShowStatusMsg = isShowStatusMsg;
//        me.byActionType = byActionType;
//        me.isNonUI = isNonUI;
//        if (statusId) {
//            if (typeof statusId == "object")
//                me.statusTag = statusId;
//            else
//                me.statusTag = document.getElementById(statusId);
//        }

//        if (!sSubmitData)
//            sSubmitData = "";

//        var iIndex = strURL.indexOf("?");
//        if (iIndex != -1) {
//            sSubmitData += "&" + strURL.substring(iIndex + 1);
//            strURL = strURL.substring(0, iIndex);
//        }

//        strURL = clAppBuffer.getContextPath() + "/" + strURL;
//        sSubmitData += "&isAjax=1&reqId=" + (new Date().getMilliseconds());

//        me.xmlHttpReq = getConnection(isNonUI);
//        showStatus(true);

//        if (isPostMethod) {
//            me.xmlHttpReq.open('POST', strURL, !isSync);
//            sSubmitData = util.trim(sSubmitData);
//        }
//        else {
//            me.xmlHttpReq.open('GET', (strURL + '?' + sSubmitData), !isSync);
//            sSubmitData = null;
//        }


//        //        me.xmlHttpReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
//        me.xmlHttpReq.setRequestHeader("isAjax", "1");
//        me.xmlHttpReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
//        //me.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

//        me.xmlHttpReq.onreadystatechange = processRequest;
//        me.xmlHttpReq.send(sSubmitData);



//        //ajax callback function
//        function processRequest() {
//            // showRequestStatus();

//            if (me.xmlHttpReq.readyState == 4) // 4=complete
//            {
//                var sResponse = null;


//                if (me.responseType == con.RESPONSE_XML)
//                    sResponse = me.xmlHttpReq.responseXML;
//                else
//                    sResponse = me.xmlHttpReq.responseText;
//                //alert("sResponse  "+sResponse);

//                if (me.xmlHttpReq.status == 200)// 200=request complete
//                {
//                    var iStatusCode = me.xmlHttpReq.getResponseHeader("SYS_SCODE");
//                    var appValue = me.xmlHttpReq.getResponseHeader("appValue");
//                    var sMsg = me.xmlHttpReq.getResponseHeader("SYS_SMSG");

//                    //   alert(sMsg+"--88888----"+iStatusCode);
//                    returnConnection(me.xmlHttpReq, me.isNonUI);

//                    if (iStatusCode == MSG_SUCCESS || iStatusCode == MSG_SUCCESS_STATUS_ONLY) {
//                        if (util.trim(sMsg).length > 0)// TOAST MSG display
//                            msg.showToastMsg(sMsg);
//                    }
//                    else if (iStatusCode == MSG_SECURITY_EXCEPTION || iStatusCode == MSG_BUSINESS_MESSAGE)
//                        msg.showBusinessMsg(sMsg);



//                    if (iStatusCode == MSG_SUCCESS) // after save displaying last page
//                        home.handleResponse(sResponse);
//                    else if (iStatusCode == ERROR_REDIRECT_LOGIN) {
//                        showStatus(false);
//                        app.showLoginDialog(strURL + "?" + sSubmitData);
//                    }
//                    else if (iStatusCode == IGNORE_SESSION_EXPIRED)
//                    { }
//                    else {
//                        showStatus(false);

//                        /*if(byActionType>0) // for setCenterUI it ll be 0, for others respective actions need to be passed
//                        toggleBackground(false);
//                        else
//                        showRequestStatus(false);*/


//                        if (me.handlerObject) {
//                            if (!me.responseType || me.responseType == con.RESPONSE_PLAIN)
//                                me.handlerObject.apply(this, eval("new Array(" + sResponse + ");"));
//                            else
//                                me.handlerObject.apply(this, [sResponse]);

//                        }
//                        else if (me.responseHandler)
//                            eval(me.responseHandler)(sResponse, iStatusCode, sMsg, appValue); //MsgHeader will be the messages
//                    }


//                }
//                else ///404= file not found,403=forbidden,405=method not found
//                {
//                    if (me.xmlHttpReq.status == 0) {  //con.()
//                        msg.showConfirm("Ajax request is aborted, status=" + me.xmlHttpReq.status + ", would you like to re-login again", "Ajax Error", "con.confirmCallback", null, 280, null, null, true);
//                        returnConnection(me.xmlHttpReq, me.isNonUI);
//                        //window.location.href

//                    }
//                    else {
//                        showStatus(false);
//                        util.toggleBackground(false);
//                        errorHandler(me.xmlHttpReq.status, me.xmlHttpReq.statusText, me.xmlHttpReq.responseText);
//                        returnConnection(me.xmlHttpReq, me.isNonUI);
//                    }

//                }
//                me.bShowStatusMsg = null;
//                me.responseHandler = null;
//                me.readXML = null;
//                me.statusTag = null;
//                //me.statusTag = null;
//                me.handlerObject = null;
//                me.byActionType = null;
//            }
//            else {
//                //if (me.xmlHttpReq.readyState == 1)
//                // writeToLog("readyState="+me.xmlHttpReq.readyState+"--"+iActiveCnt+"==="+ me.xmlHttpReq.status);
//            }
//        };



//        function showStatus(isShowStatus) {
//            debugger;
//            var sMessage = null;
//            if (me.byActionType == ACTION_SAVE)
//                sMessage = "Saving...";
//            else if (me.byActionType == ACTION_DELETE)
//                sMessage = "Deleting...";
//            else if (me.byActionType == ACTION_SORT)
//                sMessage = "Sorting...";
//            else if (me.byActionType == ACTION_UPDATE)
//                sMessage = "Upadating...";
//            else if (me.byActionType == ACTION_DISPALY)
//                sMessage = "Displaying...";
//            else if (me.byActionType == ACTION_DELETE)
//                sMessage = "Deleting...";
//            else if (me.byActionType == ACTION_CONVERT)
//                sMessage = "Converting...";
//            else if (me.byActionType == ACTION_REINDEX)
//                sMessage = "Reindexing...";
//            else if (me.byActionType == ACTION_SEARCH)
//                sMessage = "Searching...";
//            else if (me.byActionType == ACTION_SENDING)
//                sMessage = "Sending...";


//            //alert("--"+sMessage)
//            if (sMessage)
//                util.toggleBackground(isShowStatus, false, sMessage, true);
//            else {
//                showRequestStatus(isShowStatus); // for default  load image..........
//            }
//        }

//        function showRequestStatus(isShowStatus) // it is called for handling all the states of the con object....
//        {
//            if (me.statusTag) {
//                if (me.bShowStatusMsg) {
//                    if (me.xmlHttpReq.readyState == 0) // 0=unintialised
//                        me.statusTag.innerHTML = "unintialised....";
//                    else if (me.xmlHttpReq.readyState == 1) // 1=loading
//                        me.statusTag.innerHTML = "loading....";
//                    else if (me.xmlHttpReq.readyState == 2) // 2=loaded
//                        me.statusTag.innerHTML = "loaded....";
//                    else if (me.xmlHttpReq.readyState == 3) // 3=interactive
//                        me.statusTag.innerHTML = "interactive....";
//                    else if (me.xmlHttpReq.readyState == 4)
//                        me.statusTag.innerHTML = "";
//                }

//                if (isShowStatus)
//                    util.addClass(me.statusTag, "loadingImg");
//                else
//                    util.removeClass(me.statusTag, "loadingImg");
//            }
//        }
//    }




//    /**
//    * Forms URL parameters of form.
//    * docForm - form object
//    * arrPackChkboxNames - List of checkbox names. Checkbox values will be packed as single value when their names are same.
//    * callBackIgnoreElem - Callback function which will be invoked for each element. NUmber should returned from this function to indicate no. of elements to skip from current element. Ex: 0-include,1-skip current,2- skip current and next elements and so on...
//    * callBackCombo - querystring formation of combobox is given to callback function handler.     
//    * isIncludeHidden - Fields which has property 'display:none' will be ignore by default. To include these fields this value should be given true     
//    * Returns string value of form fields data, elemname1=elemvalue1&elemname2=elemvalue2&.....
//    */
//    this.formData2QueryString = function (docForm, arrPackChkboxNames, callBackIgnoreElem, callBackCombo, isIncludeHidden) {
//        debugger;
//        var strSubmitContent = '';
//        var formElem;
//        var iIgnoreElementsCount;
//        var isInvokeCallBack;
//        var arrPackChkboxValues = null;
//        var objComboHiddenFld;

//        if (callBackIgnoreElem && typeof [callBackIgnoreElem] == "object")
//            isInvokeCallBack = true;

//        if (arrPackChkboxNames) {
//            arrPackChkboxValues = new Array();
//            for (var i = 0; i < arrPackChkboxNames.length; i++)
//                arrPackChkboxValues[arrPackChkboxNames[i]] = 0;
//        }

//        var sValue;

//        for (var i = 0; i < docForm.elements.length; i++) {
//            debugger;
//            formElem = docForm.elements[i];
//            if (formElem.name && (formElem.style.display != "none" || isIncludeHidden)) {
//                if (formElem.getAttribute("isIgnore")) //disabled
//                {
//                    if (formElem.getAttribute("mastertype") != null) // && document.getElementById(formElem.getAttribute("hiddenname")))
//                    {
//                        if (getComboHiddenFld(formElem))
//                            i++;
//                    }
//                    continue;
//                }

//                if (isInvokeCallBack) {
//                    iIgnoreElementsCount = callBackIgnoreElem(formElem, i);
//                    if (iIgnoreElementsCount > 0) {
//                        if (iIgnoreElementsCount == 1)
//                            continue;
//                        i += iIgnoreElementsCount - 1;
//                        continue;
//                    }
//                }

//                sValue = util.trim(formElem.value);

//                if (formElem.getAttribute("mastertype") != null) {
//                    objComboHiddenFld = getComboHiddenFld(formElem);
//                    if (callBackCombo)
//                        strSubmitContent = callBackCombo(formElem, strSubmitContent);
//                    else if (objComboHiddenFld)//if(document.getElementById(formElem.getAttribute("hiddenName")))
//                    {
//                        strSubmitContent += objComboHiddenFld.name + '=';
//                        if (objComboHiddenFld.value == "" || objComboHiddenFld.value == -1)
//                            strSubmitContent += '0&'; //passing 0 for integer setter method
//                        else
//                            strSubmitContent += objComboHiddenFld.value + '&';
//                        //strSubmitContent += formElem.getAttribute("hiddenName")+'='+document.getElementById(formElem.getAttribute("hiddenName")).value+'&';
//                        i += 1;
//                        continue;
//                    }
//                    continue;
//                }
//                else if (util.hasClass(formElem, "bannerText")) {
//                    if (formElem.value == formElem.getAttribute("bannerText"))
//                        sValue = "";
//                    //continue;
//                }



//                switch (formElem.type) {
//                    case 'text':
//                    case 'hidden':
//                    case 'password':
//                    case 'textarea':
//                    case 'select-one':
//                        /*if(!sValue)
//                        {
//                        if(formElem.getAttribute("datatype")==TYPE_NUMERIC || formElem.getAttribute("datatype")==TYPE_FLOAT)
//                        sValue=0;
//                        }*/
//                        strSubmitContent += formElem.name + '=' + util.encodeURI(sValue) + '&';
//                        break;

//                    // Radio buttons    
//                    case 'radio':
//                        if (formElem.checked)
//                            strSubmitContent += formElem.name + '=' + util.encodeURI(sValue) + '&';
//                        break;

//                    // Checkboxes    
//                    case 'checkbox':
//                        if (formElem.checked) {
//                            if (arrPackChkboxValues != null && arrPackChkboxValues[formElem.name] >= 0)
//                                arrPackChkboxValues[formElem.name] = util.packBit(arrPackChkboxValues[formElem.name], sValue);
//                            else
//                                strSubmitContent += formElem.name + '=' + util.encodeURI(sValue) + '&';
//                        }
//                        else if (arrPackChkboxValues == null || arrPackChkboxValues[formElem.name] == null)
//                            strSubmitContent += formElem.name + '=0&'; //sending default value as '0' for checkbox if it is not checked

//                        break;
//                }
//            }
//            else if (formElem.getAttribute("mastertype") != null && getComboHiddenFld(formElem))
//                i++;
//        }

//        if (arrPackChkboxNames) {
//            for (var i = 0; i < arrPackChkboxNames.length; i++) {
//                if (arrPackChkboxValues[arrPackChkboxNames[i]] > 0)
//                    strSubmitContent += arrPackChkboxNames[i] + "=" + arrPackChkboxValues[arrPackChkboxNames[i]] + "&";
//            }
//        }
//        //Remove trailing separator
//        strSubmitContent = strSubmitContent.substr(0, strSubmitContent.length - 1);
//        return strSubmitContent;
//    };


//    /**
//    * Creates URL that can be used to invoke a struts action based on the parameters.
//    * @param sNamespace - package namespace without any slashes
//    * @param sAction - action name
//    * @param sMethod -
//    * @param sJspName
//    * @param isEmptyParams
//    */
//    this.getStruts2Url = function (sNamespace, sAction, sMethod, sJspName, isIncludeParams) {
//        var sUrl;
//        if (sNamespace)
//            sUrl = sNamespace + "/" + sAction; //  base/rule
//        else
//            sUrl = sAction;
//        if (sMethod) {
//            //sAction = sAction.substring(0, sAction.substring(".do"));
//            if (sUrl.indexOf(".do") != -1)
//                sUrl = sUrl.substring(0, sUrl.indexOf(".do"));
//            sUrl += "!" + sMethod + ".do"; // base/rule!getFieldRules
//            if (!isIncludeParams)
//                sUrl += "?"; // base/rule!getFieldRules?
//        }
//        else if (sJspName) {
//            sUrl += "?result=" + sJspName; // base/rule?result=rules
//            if (!isIncludeParams)
//                sUrl += "&"; // base/rule?result=rules&
//        }
//        return sUrl;
//    };

//    /**
//    * Clears form fields' data
//    @param form name
//    */
//    this.clearControls = function (docForm, isClearMsgs) {
//        var formElem, iMasterType;
//        var objCombo = null;
//        var sValue = null;

//        for (var i = 0; i < docForm.elements.length; i++) {
//            formElem = docForm.elements[i];
//            sValue = formElem.getAttribute('default');
//            if (!sValue)
//                sValue = "";

//            switch (formElem.type) {
//                // Text fields, hidden form elements    
//                case 'text':
//                case 'hidden':
//                case 'password':
//                case 'textarea':
//                    if (formElem.getAttribute("mastertype")) {
//                        iMasterType = formElem.getAttribute("mastertype");
//                        objCombo = objComboInstances[formElem.id];
//                        if (objCombo) {
//                            if (sValue)
//                                objCombo.checkAndAddItem(sValue, true);
//                            else
//                                objCombo.setSelectedIndex(-1);
//                            if (iMasterType > 0
//                                    && (!(iMasterType >= Constants.LISTMASTER && iMasterType < (Constants.LISTMASTER + Constants.MODULE_SLAB)))
//                                     && iMasterType != Constants.IStdMasters_GENERALMASTER
//                                     && iMasterType != Constants.IStdMasters_GENERAL_STATIC_VALUES)
//                                objCombo.removeAllItems();
//                            i++; //skipping combohidden field since its value will be set in checkAndAddItem
//                        }
//                    }
//                    else
//                        formElem.value = sValue;
//                    break;
//                //             case 'radio':    
//                case 'checkbox':
//                    formElem.checked = false;
//                    break;
//                case 'select-one':
//                    {
//                        formElem.value = sValue;
//                        break;
//                    }
//            }

//            if (isClearMsgs) {
//                if (formElem.className == "mandatoryInput") {
//                    Validation.clearMessage(formElem);
//                }
//            }
//        }


//    };

//    function errorHandler(iStatus, sMessage, sText) {
//        //  alert(iStatus+"::"+sMessage+"::"+sText);
//        //  toggleLoadStatus(true);
//        var objErrorDiv = document.getElementById("errorDiv");
//        sText = util.trim(sText);
//        if (sText.length > 0 && !objErrorDiv) {
//            objErrorDiv = document.createElement("DIV");
//            objErrorDiv.id = "objErrorDiv";
//            objErrorDiv.style.cssText = "z-index:10;overflow:fixed;background-color:white;border:3px solid #88a6fe;width:800px;height:500px;top:30px;left:150px;" +
//                                      "position:absolute";
//            //objErrorDiv.innerHTML="<div  id='dInnerMsgBox' style='height:20px;width:750px;  background-color:#becef9;border:1px solid #88a6fe'></div>";
//            //objErrorDiv.innerHTML+="<div align='right' style='background-color:#88a6fe;'><input type='button' style='height:20px;width:20px;' value='X' onclick='closeErrorDiv()'></div>"  ;
//            objErrorDiv.innerHTML = "<img align='right' src=" + app.getImagePath() + "closeDlg.gif onclick='con.closeErrorDiv()'>";
//            objErrorDiv.innerHTML += "<div style='background-color:#88a6fe;color:#1E3800;padding:3px;font-size:18px;'>&nbsp;&nbsp;Error Message</div>";
//            objErrorDiv.innerHTML += "<br><div style='overflow-y:auto; width=96%;height:454px;'><span >" + sText + "</span></div>";
//            document.body.appendChild(objErrorDiv);
//            loadResources(objErrorDiv, util.onScriptsLoad);
//        }
//    }

//    this.closeErrorDiv = function (objWindow) {
//        //toggleBackground(false);
//        try {
//            var objErrorDiv = null;
//            if (objWindow)
//                objErrorDiv = objWindow.document.getElementById("objErrorDiv");
//            else
//                objErrorDiv = document.getElementById("objErrorDiv");
//            if (objErrorDiv)
//                objErrorDiv.parentNode.removeChild(objErrorDiv);
//        }
//        catch (e) //added for handling cross-domain security exception
//        { }
//    };

//    function getRequestObject() {
//        try {
//            if (typeof XMLHttpRequest != 'undefined')
//                return new XMLHttpRequest();
//            else
//                return new ActiveXObject("MSXML3.XMLHTTP"); //Microsoft.XMLHTTP
//        }
//        catch (e) {
//            try {                 //Microsoft.XMLHTTP
//                return new ActiveXObject("MSXML2.XMLHTTP.3.0");
//            }
//            catch (e) {
//                try {                 //Microsoft.XMLHTTP
//                    return new ActiveXObject("MSXML2.XMLHTTP.3.0");
//                }
//                catch (e) {
//                    try {                 //Microsoft.XMLHTTP
//                        return new ActiveXObject("Msxml2.XMLHTTP");
//                    }
//                    catch (e) {
//                        try {
//                            return new ActiveXObject("Microsoft.XMLHTTP");
//                        }
//                        catch (E) { }
//                    }
//                }
//            }
//        }

//        if (window.createRequest)
//            return window.createRequest();

//        return null;
//        //if (!xmlHttpReq && typeof window.XMLHttpRequest != "undefined")
//        /*if (!xmlHttpReq && xmlHttpReq.overrideMimeType)   // it suports other than in IE 7
//        xmlHttpReq.overrideMimeType('text/plain');
//        return xmlHttpReq;*/

//    }


//    function getConnection(isNonUI) {
//        var httpReq;
//        if (!objRequests)
//            objRequests = new Array();
//        //// else
//        // writeToLog("objRequests.length="+objRequests.length);
//        // alert(Browser.isChrome)

//        for (var i = objRequests.length - 1; i >= 0; i--) {
//            // in case 2 cons connected to server and waiting got server, server entains one by one , so return only readyState=1 means just connected to server
//            if (objRequests[i]) {

//                if ((Browser.isSafari || Browser.isChrome) && objRequests[i].readyState == 2)// first state in safari is=2
//                { // writeToLog("bf return");
//                    returnConnection(objRequests[i], false);
//                }
//                else if (objRequests[i].readyState == 1)
//                    returnConnection(objRequests[i], false);
//                //  else if(objRequests[i].readyState==4)
//                //    returnConnection(objRequests[i]);

//            }
//        }

//        if ((iActiveCnt - iBackgrndCnt) > CONNECTION_LIMIT)
//            alert("Active Http Connections have exceeded limit [" + CONNECTION_LIMIT + "," + objRequests.length + "]");

//        //    if (iActiveCnt <= CONNECTION_LIMIT)
//        if (objRequests.length > 0)
//            httpReq = objRequests.shift(); //shift returns first element whereas pop() returns last element
//        else
//            httpReq = getRequestObject();

//        iActiveCnt++;
//        if (isNonUI)
//            iBackgrndCnt++;
//        // writeToLog("NEW con iActiveCnt=="+iActiveCnt);



//        //writeToLog(" con *********iActiveCnt="+iActiveCnt);
//        //    else
//        //        alert("Active Http Connections have exceeded limit " + CONNECTION_LIMIT)

//        return httpReq;
//    }


//    function returnConnection(httpReq, isNonUI) {
//        if (objRequests) {
//            if (httpReq && httpReq.readyState < 4 && Browser.isGecko) {
//                httpReq.abort(); //needed for FireFox
//                //  httpReq = null; //needed for FireFox

//            }
//            objRequests.push(httpReq);

//        }
//        if (iActiveCnt > 0)
//            iActiveCnt--;
//        if (isNonUI)
//            iBackgrndCnt--;
//        //   writeToLog("RETURN iActiveCnt=="+iActiveCnt);

//        // writeToLog(" return *********iActiveCnt="+iActiveCnt);
//    }


//};

/*
 function addRowsToTable(oTBody , sResponseData)
 function removeAllRows(tBody)
 function fillTable(sResponse)
 function sendPostRequest(strURL, isPostMethod,sSubmitData,resHandler,readXML,statusId) ---var sStatusId=null;var responseHandler=null;var readXML=null;
 function processRequest()
 function clearControls(docForm)
 function formData2QueryString(docForm)
 */

var con=new function()
{
   this.RESPONSE_PLAIN=0;// script
   this.RESPONSE_HTML=1; // html code
   this.RESPONSE_XML=2;


    var objRequests = null,iActiveCnt = 0,CONNECTION_LIMIT = 5,iBackgrndCnt=0 ;


    this.getActiveCount=function()
    {
        return iActiveCnt-iBackgrndCnt;
    };

    this.confirmCallback=function(iStatus)
        {
          //  alert("--");
            if(iStatus==Constants.YES)
            {
                window.location.href="/streamline/crmhome.do";
            }
        };
    this.sendGetRequest=function(strURL, sSubmitData, handlerObject, resHandler, responseAsXML, statusId, sSubActivity, isSync,byActionType)
    {
        return new sendRequest(strURL, false, sSubmitData, handlerObject, resHandler, responseAsXML, statusId, sSubActivity, isSync,byActionType,false)
    };

    this.sendPostRequest=function(strURL, sSubmitData, handlerObject, resHandler, responseAsXML, statusId, sSubActivity, isSync,isShowStatusMsg,byActionType)
    {
        return new sendRequest(strURL, true, sSubmitData, handlerObject, resHandler, responseAsXML, statusId, sSubActivity, isSync,isShowStatusMsg,byActionType,false)
    };
    this.sendNonUItRequest=function(strURL, sSubmitData, handlerObject, resHandler, responseAsXML, statusId, sSubActivity, isSync,isShowStatusMsg,byActionType)
    {
        return new sendRequest(strURL, true, sSubmitData, handlerObject, resHandler, responseAsXML, statusId, sSubActivity, isSync,isShowStatusMsg,byActionType,true)
    };


    /**
     * Send request to servlet
     @param strURL
     @param isPostMethod
     @param sSubmitData
     @param resHandler
     @param responseAsXML
     @param statusId
     **/
    function sendRequest(strURL,
                         isPostMethod,
                         sSubmitData,
                         handlerObj,
                         resHandler,
                         responseType,
                         statusId,
                         sSubActivity,
                         isSync,
                         isShowStatusMsg,
                         byActionType,
                         isNonUI

            )
    {
        var me=this;
        me.statusTag = null;
        me.xmlHttpReq=null;
        me.responseType = responseType;
        me.handlerObject = handlerObj;
        me.responseHandler = resHandler;
        me.bShowStatusMsg = isShowStatusMsg;
        me.byActionType = byActionType;
        me.isNonUI=isNonUI;
        if(statusId)
        {
            if(typeof statusId == "object")
                me.statusTag=statusId;
            else
                me.statusTag=document.getElementById(statusId);
        }

        if(!sSubmitData)
            sSubmitData="";

        var iIndex = strURL.indexOf("?");
        if (iIndex != -1)
        {
            sSubmitData += "&" + strURL.substring(iIndex + 1);
            strURL = strURL.substring(0, iIndex);
        }

        strURL=clAppBuffer.getContextPath()+"/"+strURL;
        sSubmitData += "&isAjax=1&reqId=" + (new Date().getMilliseconds());

        me.xmlHttpReq = getConnection(isNonUI);
        showStatus(true);

        if (isPostMethod)
        {
            me.xmlHttpReq.open('POST', strURL, !isSync);
            sSubmitData=util.trim(sSubmitData);
        }
        else
        {
            me.xmlHttpReq.open('GET', (strURL + '?' + sSubmitData), !isSync);
            sSubmitData=null;
        }


//        me.xmlHttpReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
         me.xmlHttpReq.setRequestHeader("isAjax","1");
         me.xmlHttpReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
        //me.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        me.xmlHttpReq.onreadystatechange = processRequest;
        me.xmlHttpReq.send(sSubmitData);



        //ajax callback function
        function processRequest()
        {
           // showRequestStatus();

            if (me.xmlHttpReq.readyState == 4) // 4=complete
            {
                var sResponse = null;


                if (me.responseType==con.RESPONSE_XML)
                    sResponse = me.xmlHttpReq.responseXML;
                else
                    sResponse = me.xmlHttpReq.responseText;
                //alert("sResponse  "+sResponse);

                if (me.xmlHttpReq.status == 200)// 200=request complete
                {
                    var iStatusCode=me.xmlHttpReq.getResponseHeader("SYS_SCODE");
                    var appValue=me.xmlHttpReq.getResponseHeader("appValue");
                    var sMsg=me.xmlHttpReq.getResponseHeader("SYS_SMSG");

                 //   alert(sMsg+"--88888----"+iStatusCode);
                    returnConnection(me.xmlHttpReq,me.isNonUI);

                    if(iStatusCode==MSG_SUCCESS || iStatusCode==MSG_SUCCESS_STATUS_ONLY)
                    {
                        if(util.trim(sMsg).length>0)// TOAST MSG display
                           msg.showToastMsg(sMsg);
                    }
                    else if(iStatusCode==MSG_SECURITY_EXCEPTION || iStatusCode==MSG_BUSINESS_MESSAGE)
                        msg.showBusinessMsg(sMsg);



                    if(iStatusCode==MSG_SUCCESS) // after save displaying last page
                        home.handleResponse(sResponse);
                    else if(iStatusCode==ERROR_REDIRECT_LOGIN)
                    {
                        showStatus(false);
                        app.showLoginDialog(strURL+"?"+sSubmitData);
                    }
                    else if(iStatusCode==IGNORE_SESSION_EXPIRED)
                    {    }
                    else
                    {
                        showStatus(false);

                       /*if(byActionType>0) // for setCenterUI it ll be 0, for others respective actions need to be passed
                          toggleBackground(false);
                       else
                         showRequestStatus(false);*/


                        if (me.handlerObject)
                        {
                          if(!me.responseType || me.responseType==con.RESPONSE_PLAIN)
                             me.handlerObject.apply(this, eval("new Array(" + sResponse + ");"));
                          else
                            me.handlerObject.apply(this, [sResponse]);

                        }
                        else if (me.responseHandler)
                          eval(me.responseHandler)(sResponse, iStatusCode,sMsg,appValue);//MsgHeader will be the messages
                    }


                }
                else ///404= file not found,403=forbidden,405=method not found
                {
                    if(me.xmlHttpReq.status==0)
                    {  //con.()
                       msg.showConfirm("Ajax request is aborted, status="+me.xmlHttpReq.status+", would you like to re-login again","Ajax Error","con.confirmCallback",null,280,null,null,true);
                      returnConnection(me.xmlHttpReq,me.isNonUI);
                     //window.location.href

                    }
                   else
                    {
                        showStatus(false);
                        util.toggleBackground(false);
                        errorHandler(me.xmlHttpReq.status, me.xmlHttpReq.statusText,me.xmlHttpReq.responseText);
                        returnConnection(me.xmlHttpReq,me.isNonUI);
                    }

                }
                me.bShowStatusMsg = null;
                me.responseHandler = null;
                me.readXML = null;
                me.statusTag=null;
                //me.statusTag = null;
                me.handlerObject = null;
                me.byActionType = null;
            }
           else
            {
             //if (me.xmlHttpReq.readyState == 1)
                   // writeToLog("readyState="+me.xmlHttpReq.readyState+"--"+iActiveCnt+"==="+ me.xmlHttpReq.status);
            }
        };



        function showStatus(isShowStatus)
        {
            var sMessage=null;
            if(me.byActionType==ACTION_SAVE)
                sMessage="Saving...";
            else if(me.byActionType==ACTION_DELETE)
                sMessage="Deleting...";
            else if(me.byActionType==ACTION_SORT)
                sMessage="Sorting...";
            else if(me.byActionType==ACTION_UPDATE)
                sMessage="Upadating...";
            else if(me.byActionType==ACTION_DISPALY)
                sMessage="Displaying...";
            else if(me.byActionType==ACTION_DELETE)
                sMessage="Deleting...";
           else if(me.byActionType==ACTION_CONVERT)
                sMessage="Converting...";
           else if(me.byActionType==ACTION_REINDEX)
                sMessage="Reindexing...";
            else if(me.byActionType==ACTION_SEARCH)
                sMessage="Searching...";
            else if(me.byActionType==ACTION_SENDING)
                sMessage="Sending...";


              //alert("--"+sMessage)
            if(sMessage)
              util.toggleBackground(isShowStatus,false,sMessage,true);
            else
            {
                showRequestStatus(isShowStatus);// for default  load image..........
            }
        }

        function showRequestStatus(isShowStatus) // it is called for handling all the states of the con object....
        {
            if (me.statusTag)
            {
                if(me.bShowStatusMsg)
                {
                    if (me.xmlHttpReq.readyState == 0) // 0=unintialised
                        me.statusTag.innerHTML = "unintialised....";
                    else if (me.xmlHttpReq.readyState == 1) // 1=loading
                        me.statusTag.innerHTML = "loading....";
                    else if (me.xmlHttpReq.readyState == 2) // 2=loaded
                        me.statusTag.innerHTML = "loaded....";
                    else if (me.xmlHttpReq.readyState == 3) // 3=interactive
                        me.statusTag.innerHTML = "interactive....";
                    else if(me.xmlHttpReq.readyState == 4)
                            me.statusTag.innerHTML = "";
                }

                if(isShowStatus)
                    util.addClass(me.statusTag,"loadingImg");
                else
                    util.removeClass(me.statusTag,"loadingImg");
            }
        }
    }




    /**
    * Forms URL parameters of form.
    * docForm - form object
    * arrPackChkboxNames - List of checkbox names. Checkbox values will be packed as single value when their names are same.
    * callBackIgnoreElem - Callback function which will be invoked for each element. NUmber should returned from this function to indicate no. of elements to skip from current element. Ex: 0-include,1-skip current,2- skip current and next elements and so on...
    * callBackCombo - querystring formation of combobox is given to callback function handler.     
    * isIncludeHidden - Fields which has property 'display:none' will be ignore by default. To include these fields this value should be given true     
    * Returns string value of form fields data, elemname1=elemvalue1&elemname2=elemvalue2&.....
    */
    this.formData2QueryString=function(docForm, arrPackChkboxNames, callBackIgnoreElem,callBackCombo,isIncludeHidden)
    {
    var strSubmitContent = '';
    var formElem;
    var iIgnoreElementsCount;
    var isInvokeCallBack;
    var arrPackChkboxValues = null;
    var objComboHiddenFld;

    if (callBackIgnoreElem && typeof[callBackIgnoreElem] == "object")
        isInvokeCallBack = true;

    if (arrPackChkboxNames)
    {
        arrPackChkboxValues = new Array();
        for (var i = 0; i < arrPackChkboxNames.length; i++)
            arrPackChkboxValues[arrPackChkboxNames[i]] = 0;
    }

    var sValue;

    for (var i = 0; i < docForm.elements.length; i++)
    {
        formElem = docForm.elements[i];
        if (formElem.name && (formElem.style.display != "none" || isIncludeHidden))
        {
            if(formElem.getAttribute("isIgnore") ) //disabled
            {
                if (formElem.getAttribute("mastertype") != null) // && document.getElementById(formElem.getAttribute("hiddenname")))
                {
                    if(getComboHiddenFld(formElem))
                        i++;
                }
                continue;
            }

            if (isInvokeCallBack)
            {
                iIgnoreElementsCount = callBackIgnoreElem(formElem,i);
                if (iIgnoreElementsCount > 0)
                {
                    if (iIgnoreElementsCount == 1)
                        continue;
                    i += iIgnoreElementsCount - 1;
                    continue;
                }
            }

            sValue=util.trim(formElem.value);

            if (formElem.getAttribute("mastertype") != null)
            {
                objComboHiddenFld=getComboHiddenFld(formElem);
                if(callBackCombo)
                    strSubmitContent = callBackCombo(formElem,strSubmitContent);
                else if(objComboHiddenFld)//if(document.getElementById(formElem.getAttribute("hiddenName")))
                {
                    strSubmitContent += objComboHiddenFld.name+'=';
                    if(objComboHiddenFld.value=="" || objComboHiddenFld.value==-1)
                        strSubmitContent += '0&'; //passing 0 for integer setter method
                    else
                        strSubmitContent += objComboHiddenFld.value+'&';
                    //strSubmitContent += formElem.getAttribute("hiddenName")+'='+document.getElementById(formElem.getAttribute("hiddenName")).value+'&';
                    i += 1;
                    continue;
                }
                continue;
            }
            else if(util.hasClass(formElem, "bannerText"))
            {
                if(formElem.value==formElem.getAttribute("bannerText"))
                    sValue="";
                //continue;
            }



            switch (formElem.type)
            {
                case 'text':
                case 'hidden':
                case 'password':
                case 'textarea':
                case 'select-one':
                    /*if(!sValue)
                    {
                        if(formElem.getAttribute("datatype")==TYPE_NUMERIC || formElem.getAttribute("datatype")==TYPE_FLOAT)
                            sValue=0;
                    }*/
                    strSubmitContent += formElem.name + '=' + util.encodeURI(sValue) + '&';
                    break;

                // Radio buttons
                case 'radio':
                    if (formElem.checked)
                        strSubmitContent += formElem.name + '=' + util.encodeURI(sValue) + '&';
                    break;

                // Checkboxes
                case 'checkbox':
                    if (formElem.checked)
                    {
                        if (arrPackChkboxValues != null && arrPackChkboxValues[formElem.name] >= 0)
                            arrPackChkboxValues[formElem.name] = util.packBit(arrPackChkboxValues[formElem.name],sValue);
                        else
                            strSubmitContent += formElem.name + '=' + util.encodeURI(sValue) + '&';
                    }
                    else if (arrPackChkboxValues == null || arrPackChkboxValues[formElem.name] ==null )
                        strSubmitContent += formElem.name + '=0&'; //sending default value as '0' for checkbox if it is not checked

                    break;
            }
        }
        else if (formElem.getAttribute("mastertype") != null && getComboHiddenFld(formElem))
            i++;
    }

    if (arrPackChkboxNames)
    {
        for (var i = 0; i < arrPackChkboxNames.length; i++)
        {
            if (arrPackChkboxValues[arrPackChkboxNames[i]] > 0)
                strSubmitContent += arrPackChkboxNames[i] + "=" + arrPackChkboxValues[arrPackChkboxNames[i]] + "&";
        }
    }
    //Remove trailing separator
    strSubmitContent = strSubmitContent.substr(0, strSubmitContent.length - 1);
    return strSubmitContent;
};


    /**
 * Creates URL that can be used to invoke a struts action based on the parameters.
 * @param sNamespace - package namespace without any slashes
 * @param sAction - action name
 * @param sMethod -
 * @param sJspName
 * @param isEmptyParams
 */
    this.getStruts2Url=function(sNamespace, sAction, sMethod, sJspName, isIncludeParams)
    {
        var sUrl;
        if (sNamespace)
            sUrl = sNamespace + "/" + sAction; //  base/rule
        else
            sUrl = sAction;
        if (sMethod)
        {
            //sAction = sAction.substring(0, sAction.substring(".do"));
            if(sUrl.indexOf(".do")!=-1)
                sUrl=sUrl.substring(0,sUrl.indexOf(".do"));
            sUrl += "!" + sMethod + ".do";// base/rule!getFieldRules
            if (!isIncludeParams)
                sUrl += "?"; // base/rule!getFieldRules?
        }
        else if (sJspName)
        {
            sUrl += "?result=" + sJspName; // base/rule?result=rules
            if (!isIncludeParams)
                sUrl += "&"; // base/rule?result=rules&
        }
        return sUrl;
    };

    /**
     * Clears form fields' data
     @param form name
     */
     this.clearControls=function(docForm,isClearMsgs)
     {
         var formElem,iMasterType;
         var objCombo = null;
         var sValue = null;

        for (var i = 0; i < docForm.elements.length; i++)
         {
             formElem = docForm.elements[i];
             sValue = formElem.getAttribute('default');
             if(!sValue)
                sValue="";

             switch (formElem.type)
             {
                 // Text fields, hidden form elements
                 case 'text':
                 case 'hidden':
                 case 'password':
                 case 'textarea':
                    if(formElem.getAttribute("mastertype"))
                    {
                        iMasterType = formElem.getAttribute("mastertype");
                        objCombo = objComboInstances[formElem.id];
                         if (objCombo)
                         {
                             if (sValue)
                                 objCombo.checkAndAddItem(sValue, true);
                             else
                                 objCombo.setSelectedIndex(-1);
                             if(iMasterType >0
                                    && (! (iMasterType >= Constants.LISTMASTER && iMasterType < (Constants.LISTMASTER+Constants.MODULE_SLAB)))
                                     && iMasterType != Constants.IStdMasters_GENERALMASTER
                                     && iMasterType != Constants.IStdMasters_GENERAL_STATIC_VALUES)
                                objCombo.removeAllItems();
                             i++; //skipping combohidden field since its value will be set in checkAndAddItem
                         }
                    }
                    else
                        formElem.value = sValue;
                    break;
    //             case 'radio':
                 case 'checkbox':
                     formElem.checked = false;
                     break;
                case 'select-one':
                 {
                    formElem.value = sValue;
                     break;
                 }
             }

             if(isClearMsgs)
             {
                 if(formElem.className=="mandatoryInput")
                 {
                     Validation.clearMessage(formElem);
                 }
             }
         }

         
     };

    function errorHandler(iStatus, sMessage, sText)
    {
      //  alert(iStatus+"::"+sMessage+"::"+sText);
      //  toggleLoadStatus(true);
        var objErrorDiv = document.getElementById("errorDiv");
        sText=util.trim(sText);
        if(sText.length>0 && !objErrorDiv)
        {
            objErrorDiv =  document.createElement("DIV");
            objErrorDiv.id = "objErrorDiv";
            objErrorDiv.style.cssText="z-index:10;overflow:fixed;background-color:white;border:3px solid #88a6fe;width:800px;height:500px;top:30px;left:150px;" +
                                      "position:absolute";
            //objErrorDiv.innerHTML="<div  id='dInnerMsgBox' style='height:20px;width:750px;  background-color:#becef9;border:1px solid #88a6fe'></div>";
            //objErrorDiv.innerHTML+="<div align='right' style='background-color:#88a6fe;'><input type='button' style='height:20px;width:20px;' value='X' onclick='closeErrorDiv()'></div>"  ;
            objErrorDiv.innerHTML="<img align='right' src="+app.getImagePath()+"closeDlg.gif onclick='con.closeErrorDiv()'>"  ;
            objErrorDiv.innerHTML+="<div style='background-color:#88a6fe;color:#1E3800;padding:3px;font-size:18px;'>&nbsp;&nbsp;Error Message</div>"  ;
            objErrorDiv.innerHTML+="<br><div style='overflow-y:auto; width=96%;height:454px;'><span >"+sText+"</span></div>"  ;
            document.body.appendChild(objErrorDiv);
            loadResources(objErrorDiv,util.onScriptsLoad);
        }
    }

    this.closeErrorDiv=function(objWindow)
    {
        //toggleBackground(false);
        try
        {
            var objErrorDiv=null;
            if(objWindow)
                objErrorDiv=objWindow.document.getElementById("objErrorDiv");
            else
                objErrorDiv=document.getElementById("objErrorDiv");
            if(objErrorDiv)
                objErrorDiv.parentNode.removeChild(objErrorDiv) ;
        }
        catch(e) //added for handling cross-domain security exception
        {   }
    };

    function getRequestObject()
    {
        try
        {
            if (typeof XMLHttpRequest != 'undefined')
                return new XMLHttpRequest();
            else
                return new ActiveXObject("MSXML3.XMLHTTP"); //Microsoft.XMLHTTP
        }
        catch (e)
        {
            try
            {                 //Microsoft.XMLHTTP
                return new ActiveXObject("MSXML2.XMLHTTP.3.0");
            }
            catch (e)
            {
                try
                {                 //Microsoft.XMLHTTP
                    return new ActiveXObject("MSXML2.XMLHTTP.3.0");
                }
                catch (e)
                {
                    try
                    {                 //Microsoft.XMLHTTP
                        return new ActiveXObject("Msxml2.XMLHTTP");
                    }
                    catch (e)
                    {
                        try
                        {
                            return new ActiveXObject("Microsoft.XMLHTTP");
                        }
                        catch (E){ }
                    }
                }
            }
        }

        if (window.createRequest)
            return window.createRequest();

        return null;
        //if (!xmlHttpReq && typeof window.XMLHttpRequest != "undefined")
        /*if (!xmlHttpReq && xmlHttpReq.overrideMimeType)   // it suports other than in IE 7
            xmlHttpReq.overrideMimeType('text/plain');
        return xmlHttpReq;*/

    }


    function getConnection(isNonUI)
    {
        var httpReq;
        if (!objRequests)
            objRequests = new Array();
       //// else
        // writeToLog("objRequests.length="+objRequests.length);
       // alert(Browser.isChrome)

       for(var i=objRequests.length-1;i>=0;i--)
        {
            // in case 2 cons connected to server and waiting got server, server entains one by one , so return only readyState=1 means just connected to server
             if(objRequests[i])
             {

                 if((Browser.isSafari || Browser.isChrome)  && objRequests[i].readyState==2)// first state in safari is=2
                 { // writeToLog("bf return");
                   returnConnection(objRequests[i],false);
                 }
                else if(objRequests[i].readyState==1)
                   returnConnection(objRequests[i],false);
              //  else if(objRequests[i].readyState==4)
               //    returnConnection(objRequests[i]);

             }
         }

        if ((iActiveCnt-iBackgrndCnt) > CONNECTION_LIMIT)
            alert("Active Http Connections have exceeded limit [" + CONNECTION_LIMIT+","+objRequests.length+"]");

    //    if (iActiveCnt <= CONNECTION_LIMIT)
            if (objRequests.length > 0)
                httpReq = objRequests.shift();//shift returns first element whereas pop() returns last element
            else
                httpReq = getRequestObject();

            iActiveCnt++;
          if(isNonUI)
            iBackgrndCnt++;
       // writeToLog("NEW con iActiveCnt=="+iActiveCnt);



       //writeToLog(" con *********iActiveCnt="+iActiveCnt);
    //    else
    //        alert("Active Http Connections have exceeded limit " + CONNECTION_LIMIT)

        return httpReq;
    }


    function returnConnection(httpReq,isNonUI)
    {
        if(objRequests)
        {
            if (httpReq && httpReq.readyState < 4 && Browser.isGecko)
            {
                       httpReq.abort(); //needed for FireFox
                     //  httpReq = null; //needed for FireFox

             }
            objRequests.push(httpReq);

        }
        if(iActiveCnt>0)
            iActiveCnt--;
        if(isNonUI)
            iBackgrndCnt--;
      //   writeToLog("RETURN iActiveCnt=="+iActiveCnt);

       // writeToLog(" return *********iActiveCnt="+iActiveCnt);
    }


};
































