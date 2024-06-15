const btn1 = document.getElementById('btn1'); // 确定起点
const btn2 = document.getElementById('btn2'); // 确定终点
const btn3 = document.getElementById('btn3'); // 开始导航

let activePoint = 0; // 0: 起点 1: 终点

btn1.addEventListener('click', () => {
    activePoint = 0;
});

btn2.addEventListener('click', () => {
    activePoint = 1;
});

var map = new BMapGL.Map("container");
map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
map.centerAndZoom(new BMapGL.Point(116.404, 39.915), 11);

let p1 = new BMapGL.Point(116.301934,39.977552);
let marker1 = new BMapGL.Marker(p1);
map.addOverlay(marker1);
let p2 = new BMapGL.Point(116.508328,39.919123);
let marker2 = new BMapGL.Marker(p2);
map.addOverlay(marker2);

map.addEventListener('click', function(e) {
    // 更新起点和终点 根据activePoint
    if (activePoint === 0) {
        p1 = new BMapGL.Point(e.latlng.lng, e.latlng.lat);
        marker1.setPosition(p1);
    } else if (activePoint === 1) {
        p2 = new BMapGL.Point(e.latlng.lng, e.latlng.lat);
        marker2.setPosition(p2);
    }
});

var driving = new BMapGL.DrivingRoute(map, {renderOptions:{map: map, autoViewport: false}});

var txtMenuItem = [
    {
        text:'修改起点',
        callback: function () {
            activePoint = 0;
        }           
    },
    {
        text:'修改终点',                             
        callback: function () {                
            activePoint = 1;
        }
    },
    {
        text:'最短路径',                             
        callback: function () {                
            driving.search(p1, p2);
        }
    },
];


let menu = new BMapGL.ContextMenu();                 // 创建右键菜单实例
for(var i = 0; i < txtMenuItem.length; i++){
    menu.addItem(new BMapGL.MenuItem(               // 定义菜单项实例
        txtMenuItem[i].text,                        // 传入菜单项的显示文本
        txtMenuItem[i].callback,                    // 传入菜单项的回调函数
        {
            width: 300,                             // 指定菜单项的宽度
            id: 'menu' + i                          // 指定菜单项dom的id
        }
    ));
}
map.addContextMenu(menu);                           // 给地图添加右键菜单

btn3.addEventListener('click', () => {
    driving.search(p1, p2);
});