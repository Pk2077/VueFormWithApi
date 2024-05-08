MASTER = {
    MasterAlerts: function (element, bAlterstype) {
        debugger
        document.getElementsByClassName("quickaccess")[0].className = "dropdown quickaccess";
        var MasterTypeId = $(element)[0].dataset.mastertypeid == undefined ? $(element)[0].id : $(element)[0].dataset.mastertypeid;
        var objmasterArray = [];
        objmasterArray.push(element);
        objmasterArray.push(bAlterstype);
        result = NETWORK.executeServerMethod(GLOBAL.getContextPath("GetMasterLAndingScreen", "Landing", "Landing"), true, { typeId: MasterTypeId }, "", true, "MASTER.MasterAlertsSuccess", "GLOBAL.LoadingStart", "GLOBAL.LoadingEnd", objmasterArray);
    },
    MasterAlertsSuccess: function (bSuccess, data, objmasterArray) {
        if (bSuccess == true) {
            debugger
            if (data != "") {
                var element = objmasterArray[0];
              //  $(element)[0].dataset.mastertypeid == undefined ? $('#page_Content').removeClass('hidden') : $('#page_Content').addClass('hidden')
                $('#page_Content').html('').html(data)
              
                if (objmasterArray[1] == true) {
                    debugger
                    var event = true;
                    var url = GLOBAL.getContextPath("GetSearchOnLandingClick", "Landing", "Landing");
                    var reportView = 'False';
                    $("#divSecondsub").css({ "display": "none" });
                    GetAllUnauthorizedRecords(event, url, reportView)
                    $('#page_Content').css({ "display": "block" });
                    $("#DashBoardScreen").css({ "display": "none" });
                }
                if (objmasterArray[1] == false) {
                    debugger

                    //   var mastername = $("#ObjMasterScreenStructure_MasterName").val(); <span>"+mastername+"/</span>
                    var spantext = "<span> Home /</span><span> Masters / </span>"
                    $('#header').html(spantext);
                    if ($(element)[0].dataset.masterid != undefined) {
                        var masterId = $(element)[0].dataset.masterid;
                        for (var cnt = 0; cnt <= $('#hdnTotalNumberOfPages').val() ; cnt++) {
                            if (cnt > 0)
                            {
                                var path = GLOBAL.getContextPath("GridPartial", "Landing", "Landing")
                                GotoNextPage(cnt, $(element)[0].dataset.mastertypeid, path);
                            }
                            debugger
                            for (var i = 0; i < $('#landgridData tr').find('.ClsMaster').length; i++) {
                                var landingGridMasterId = $('#landgridData tr').find('.ClsMaster')[i].innerHTML.trim();
                                if (landingGridMasterId == masterId) {
                                    $($('#landgridData tr').find('.ClsMaster')[i].closest('tr')).addClass('LightYellowColor');
                                    var ele = $('#btnMasterEdit');
                                    $('#hndSelectedRowNo').val($('#landgridData tr').find('.ClsMaster')[i].closest('tr').dataset.rowindex);
                                    GenerateNewMaster(ele);
                                    $('#page_Content').removeClass('hidden')
                                    return false;
                                }
                            }
                        }
                      


                    }
                }

            }
            else {
                alert("error")
            }
        }
    },
    authorizeMaster: function () {
        debugger
        $("#fullScreen").modal("hide");
        var type = 0;
        if (document.getElementById("authorizeRadio").checked == true)
            type = 1;
        if (document.getElementById("rejectRadio").checked == true)
            type = 2;
        if (document.getElementById("stopRadio").checked == true)
            type = 3;
        var strReason = document.getElementById('txtAuthorizationReason').value;
        var masterTypeId = document.getElementById('hdnMasterTypeId').value;
        NETWORK.executeServerMethod(
            GLOBAL.getContextPath("saveMasterAuthorization", "Landing", "Landing"),
            true,
            { mastertypeId: masterTypeId, strAuthorizationReason: strReason, iStatus: type, checkedRows: checkedRows },
            "",
            true,
            "MASTER.authorizeMasterSuccess", "GLOBAL.LoadingStart", "GLOBAL.LoadingEnd");
    },

    authorizeMasterSuccess: function (status) {
        if (status == 1) {
            alert("Master authorized");
            GLOBAL.pageRefresh();
        }
        else
            alert("Error Occur while authorizing Master");
    },
}