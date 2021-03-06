document.write('<link rel="stylesheet" href="css/jquery-weui.css">');
document.write('<script src="js/jquery-weui.js"></script>');

var clerkid = localStorage.getItem("clerkid");

//判断clerkid是否正确
function checkClerkId() {
    if (!localStorage.getItem("clerk_id") || localStorage.getItem("clerk_id") == "") {
        //  alert("no clerkid");
        return false;
    }
    this.clerkid = localStorage.getItem("clerk_id");
    return true;
}

//当页面加载完成后调用
$(document).ready(() => {
    checkClerkId();
    if (!checkClerkId()) {
        window.location.href = "error.html";
        return;
    }
    //调用接口获取数据
    getClerkInfoWithCorpInfoByClerkId(clerkid, function (datas) {
        console.log(datas);
        if (datas.errmsg == "ok") {
            //渲染数据
            //头像
            $("#avatar").attr("src", datas.clerk.avatar);
            //名称
            $("#name").html(datas.clerk.name);
            //职位
            $("#position").html(datas.clerk.position);
            //电话
            $("#phone").html(datas.clerk.binding_mobile);
            //邮箱 
            $("#email").html(datas.clerk.email);
        }
        else {
            $.alert("数据加载失败");
        }
    });
});