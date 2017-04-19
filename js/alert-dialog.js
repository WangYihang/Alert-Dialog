/**
 * 获取元素对象
 * @param {Object} id
 */
function getE(id){
    return document.getElementById(id);
}
/**
 * 使元素铺满全屏
 * @param {Object} e
 */
function fillScreen(e){
    //获取可视区域尺寸
    var vH = document.documentElement.clientHeight;
    var vW = document.documentElement.clientWidth;
    //设置铺满全屏
    e.style.height = vH + "px";
    e.style.width = vW + "px";
}
/**
 * 元素在可视区域中居中
 * @param {Object} e
 */
function toCenter(e){
    //获取可视区域尺寸
    var vH = document.documentElement.clientHeight;
    var vW = document.documentElement.clientWidth;
    //获取元素尺寸
    var eH = e.offsetHeight;
    var eW = e.offsetWidth;
    //调整居中
    e.style.top = (vH-eH)/2 + "px";
    e.style.left = (vW-eW)/2 + "px";
}
/**
 * 显示元素
 * @param {Object} e
 */
function showE(e){
    e.style.display = "block";
}
/**
 * 隐藏元素
 * @param {Object} e
 */
function hideE(e){
    e.style.display = "none";
}
function showDialog(){
    //获取对象
    var dialog = getE("alert-dialog");
    var mask = getE("dialog-mask");
    //显示dialog
    showE(dialog);
    //设置居中
    toCenter(dialog);
    //设置遮罩大小
    fillScreen(mask);
    //显示遮罩
    showE(mask);
}
function hideDialog(mask_id, dialog_id){
    //获取对象
    var mask = getE(mask_id);
    var dialog = getE(dialog_id);
    //隐藏登录框
    hideE(dialog);
    //隐藏遮罩层
    hideE(mask);
}
function alertDialog(dialog_title_id, dialog_id, mask_id) {
    var elem = getE(dialog_title_id);
    var dialog = getE(dialog_id);
    var mask = getE(mask_id);
    //开始处理拖动
    //鼠标按下位置
    var offsetX;
    var offsetY;
    //拖动状态标记
    var isDraging = false;
    //鼠标事件一(鼠标按下)
    elem.addEventListener("mousedown",function(e){
        var e = e || window.event;//兼容IE,IE的鼠标事件从window.event获得
        offsetX = e.pageX - dialog.offsetLeft;
        offsetY = e.pageY - dialog.offsetTop;
        isDraging = true;
    })
    //鼠标事件二(鼠标移动)
    document.onmousemove = function(e){
        var e = e || window.event;//兼容IE,IE的鼠标事件从window.event获得
        //定义移动距离
        var moveX = e.pageX - offsetX;
        var moveY = e.pageY - offsetY;
        //获得页面可视尺寸
        var vH = document.documentElement.clientHeight;
        var vW = document.documentElement.clientWidth;
        //获取元素尺寸
        var eH = dialog.offsetHeight;
        var eW = dialog.offsetWidth;
        //最大移动举例
        var maxX = vW - eW;
        var maxY = vH - eH;
        if(isDraging === true){
            //限制移动范围(厉害!)
            moveX = Math.min(maxX,Math.max(0, moveX));
            moveY = Math.min(maxY,Math.max(0, moveY));
            dialog.style.left = moveX + "px";
            dialog.style.top = moveY + "px";
        }
    }
    //鼠标事件三(鼠标松开)
    document.onmouseup = function(){
        isDraging = false;
    }
}
function create_mask(mask_id, dialog_id) {
    var e = document.createElement("div");
    e.setAttribute("id", mask_id);
    e.setAttribute("onclick", "hideDialog(\""+mask_id+"\",\""+dialog_id+"\")");
    document.body.appendChild(e);
}

function addOnClickListener(elem_class_name) {
    var elements = document.getElementsByClassName(elem_class_name);
    for (var i = elements.length - 1; i >= 0; i--) {
        elements[i].setAttribute("onclick", "showDialog()");
    }
}

var click_to_show_class_name = "click-to-alert-dialog"
var dialog_title_id = "alert-dialog-title";
var dialog_id = "alert-dialog";
var mask_id = "dialog-mask";
create_mask(mask_id, dialog_id);
addOnClickListener(click_to_show_class_name);
alertDialog(dialog_title_id, dialog_id, mask_id);
