const btn1 = document.getElementById('btn1'); // 确定起点
const btn2 = document.getElementById('btn2'); // 确定终点
const btn3 = document.getElementById('btn3'); // 开始导航
const btn4 = document.getElementById('btn4'); // 开始导航


let activePoint = -1; // 0: 起点 1: 终点

btn1.addEventListener('click', () => {
    activePoint = 0;
});

btn2.addEventListener('click', () => {
    activePoint = 1;
});

var map = new BMapGL.Map("container");
map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
map.centerAndZoom(new BMapGL.Point(120.129261,36.009343), 11);

let p1 = new BMapGL.Point(120.129261,36.009343);
let marker1 = new BMapGL.Marker(p1);

let p2 = new BMapGL.Point(120.259707,35.968925);
let marker2 = new BMapGL.Marker(p2);


map.addOverlay(marker1);
map.addOverlay(marker2);

map.addEventListener('click', function(e) {
    // 更新起点和终点 根据activePoint
    if (activePoint === 0) {
        p1 = new BMapGL.Point(e.latlng.lng, e.latlng.lat);
        marker1.setPosition(p1);
        activePoint = -1;
    } else if (activePoint === 1) {
        p2 = new BMapGL.Point(e.latlng.lng, e.latlng.lat);
        marker2.setPosition(p2);
        activePoint = -1;
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

const markerArr = [
    {
        title: "山科大",
        point: "120.129261,36.009343",
        address: "我不知道",
        tel: "我也不知道",
    },
    {
        title: "金沙滩",
        point: "120.259707,35.968925",
        address: "我不知道",
        tel: "我也不知道",
    },
    {
        title: "大珠山风景区",
        point: "119.991052,35.792369",
        address: "我不知道",
        tel: "我也不知道",
    },
    {
        title: "琅琊台",
        point: "119.90628,35.653327",
        address: "我不知道",
        tel: "我也不知道",
    },
    {
        title: "小珠山",
        point: "120.101917,35.966898",
        address: "我不知道",
        tel: "我也不知道",
    },
    {
        title: "唐家湾海云海上乐园",
        point: "120.2054,35.952363",
        address: "我不知道",
        tel: "我也不知道",
    },
    {
        title: "青岛森林野生动物世界",
        point: "120.064908,35.987489",
        address: "我不知道",
        tel: "我也不知道",
    },
    {
        title: "珠山国家森林公园",
        point: "120.088155,35.985282",
        address: "我不知道",
        tel: "我也不知道",
    },
    {
        title: "青岛西海岸生态观光园",
        point: "120.072201,35.924512",
        address: "我不知道",
        tel: "我也不知道",
    },
    {
        title: "青岛灵山湾度假区",
        point: "120.063505,35.875979",
        address: "我不知道",
        tel: "我也不知道",
    },
];

markerArr.forEach((item) => {
    let point = item.point.split(',');
    let blPoint = new BMapGL.Point(point[0], point[1]);
    addMarker(blPoint, item.title, item.address, item.tel);
    addLabel(blPoint, item.title);
});

function addMarker(point, title, address, tel) {
    let marker = new BMapGL.Marker(point);
    map.addOverlay(marker);

    let infoWindow = new BMapGL.InfoWindow(
        `<p style="font-size:14px; line-height: 1.8em">${title}</p>
        <p style="font-size:12px; line-height: 1.8em">地址：${address}</p>
        <p style="font-size:12px; line-height: 1.8em">电话：${tel}</p>`
    );
    marker.addEventListener('click', function() {
        map.openInfoWindow(infoWindow, point);
    });
}

function addLabel(point, title) {
    let label = new BMapGL.Label(title, {       // 创建文本标注
        position: point,                          // 设置标注的地理位置
        offset: new BMapGL.Size(5, 5)           // 设置标注的偏移量
    })
    label.setStyle({
        color: 'blue',
        fontFamily: '微软雅黑'
    });
    map.addOverlay(label);
}

btn4.addEventListener('click', () => {
    map.clearOverlays();
    // add marker1 and marker2
    map.addOverlay(marker1);
    map.addOverlay(marker2);
    markerArr.forEach((item) => {
        let point = item.point.split(',');
        let blPoint = new BMapGL.Point(point[0], point[1]);
        addMarker(blPoint, item.title, item.address, item.tel);
        addLabel(blPoint, item.title);
    });
});
