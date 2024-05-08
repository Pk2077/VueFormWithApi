//function fnSuccess(bValid, data) {
//    debugger;
//    if (bValid != false) {
//        if (data != null) {
//            return data;
//            //alert(data);
//        }
//    }

//}


//var res = CheckFacebookLogin();
var newwindow = "";
var newwindow1 = "";
function CheckFacebookLogin() {
    debugger;
    var response = "";
    $.ajax({    
        url: '/Focus8W/Home/CheckFacebookAccessToken',
        method: "POST",
        async: false,
        success: function (data) {
            debugger;
            if (data != null) {
                if (data == true) {
                    debugger;
                    response = data;
                    if (newwindow != "") {
                        if (!newwindow.closed) {
                            newwindow.close();
                        }
                    }
                }
                else {
                    //alert("please login to facebook");
                    newwindow = window.open("https://www.facebook.com/dialog/oauth?client_id=1232884693389692&client_secret=e7d123c8f0b6130cf2d5b75d0ec53150&redirect_uri=http%3A%2F%2Flocalhost%2FFocus8W%2FHome%2FCheckFacebookAccessToken&response_type=code&scope=user_managed_groups%2C%20user_photos%2C%20email%2C%20manage_pages%2C%20publish_actions%2C%20public_profile%2Cpublish_pages", "_blank");
                    //debugger;
                    //var res = FacebookBacktrack();
                    debugger;
                    //if (newwindow.document.documentElement.innerText == "true")
                    //{
                    //    response = true;
                    //}
                    //else {
                    //    response = false;
                    //}
                    //newwindow.close();
                    response = res;
                }
            }
        },
        error: function () {
            alert('Error');
        }
    });

    //return response;
    //alert(response);
    //var result = NETWORK.executeServerMethod('/Focus8W/Home/CheckFacebookAccessToken', true,
    // "", false, "fnSuccess");
    //return result;
    //alert(result);
    return response;
}
function closeFacebookWindow() {
    debugger;
    newwindow.close();

}
function closetwitterWindow() {
    debugger;
    newwindow1.close();
}
function FacebookBacktrack() {
    debugger;
    //var responsecallback ="";
    //newwindow.document.body.innerHTML = "Demo";
    //var text = newwindow.document.documentElement.innerText;
    //var counter=0;
    //do {
    //    if (text == "true") {
    //        response = true;
    //        break;
    //    }
    //    else {
    //        response = false;
    //        break;
    //    }
    //    counter++;
    //}while(text !="true" ||text != "false");

    $.ajax({
        url: '/Focus8W/Home/CheckFacebookAccessToken',
        method: "POST",
        
        success: function (data) {
            debugger;
            if (data != null) {
                if (data == true) {
                    debugger;
                    newwindow.close();
                    //responsecallback = true;
                    return true;
                }
                else {
                    if (newwindow.closed == false) {
                        debugger;
                        FacebookBacktrack();
                    }
                    else {
                        debugger;
                        //responsecallback = false;
                        return false;
                    }
                }
            }
        },
        error: function () {
            alert("error");
        }
    });
    //return responsecallback;
}

function FBresponse(status) {
    var bResponse = false;
    if (status != "" && status != undefined) {
        bResponse = true;
    }
    return bResponse;
}
function CheckTwitterLogin() {
    debugger;
    var response = "";
    $.ajax({
        url: '/Focus8W/Home/TwitterCallback',
        method: "POST",
        async: false,
        success: function (data) {
            debugger;
            if (data != null) {
                if (data == true) {
                    debugger;
                    //alert(data);
                    response = data;

                }
                else {
                    newwindow1 = window.open(data, "_blank");
                    //if (newwindow.document.documentElement.innerText == "true") {
                    //    response = true;
                    //}
                    //else {
                    //    response = false;
                    //}
                    //newwindow.close();
                }

                //alert(response);

            }
        },
        error: function () {
            alert('Error');
        }

    });
    //return response;
    //alert(response);
    //var result = NETWORK.executeServerMethod('/Focus8W/Home/CheckFacebookAccessToken', true,
    // "", false, "fnSuccess");
    //return result;
    //alert(result);
    return response;

}

