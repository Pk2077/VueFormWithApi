var HORIZONTALMENU=new function(){
    this.removeNext = function (ele) {
        //debugger
        $(ele).parent().nextAll().remove();
        lastSelectedele = $(ele).attr("id");
    }
    var lastSelectedele = "";
    this.getChild = function (id,ele, bDisplayNode) {
        //debugger
        $(ele).parent().parent().parent().nextAll().remove();
        var url = SaveGroup("GetChildData", "Home", "");
        $.ajax({
            url: url,
            type: "POST",
            data: {
                Id:id,
                iParentId: $(ele).attr("id"),
                bDisplayNode: bDisplayNode,
            },
            success: function (data) {
                //debugger
                if (data != "1")  {
                    $("#" + id).append(data);
                    $("#" + id).attr("data-bind", $(ele).attr("id"));
                    //$("#" + id).attr("name", $(ele).attr("id"));
                    }
                else {
                    // GLOBAL.updateView(event, $("#navigation_menu").find("#" + $(ele).attr("id")));
                }
            }
        });
    }
    this.setMenuId = function (Id, menuId) {
        //debugger
        var url = getContextPath("SetMenuId","Home","");
        $.ajax({
            url: url,
            data: { Id: Id, Menuid: menuId, bDisplayNode:$("#"+Id).attr("name") },
            type: "POST",
            success: function (res) {
                //debugger
                $("#" + Id).replaceWith(res);
                $("#" + Id).attr("data-bind", menuId);
            }
        })
    }

    this.getSelectedItem = function (Id) {
        //debugger
        return $("#" + Id).attr("data-bind");
    }
}
