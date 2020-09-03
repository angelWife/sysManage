
function indexMap(id){
  var map = new BMap.Map(id);
  map.centerAndZoom(new BMap.Point(119.278012,26.084406), 14);
  map.enableScrollWheelZoom();

  function update() {
      var data = [
          new BMap.Point(119.269173,26.057599),
          new BMap.Point(119.263639,26.056301),
          new BMap.Point(119.268167,26.064156),
          new BMap.Point(119.251566,26.056366),
      ];
    
    for (var i = 0, len = data.length; i < len; i++) {
        var pt = data[i];
        var myIcon = new BMap.Icon("/images/mapicon/gai.png", new BMap.Size(32,32));
        var marker = new BMap.Marker(pt,{icon:myIcon});  // 创建标注
        map.addOverlay(marker); 
        var sContent =
        "<h5 style='margin:0 0 5px 0;padding:0.2em 0;'>编号：65156152224</h5>" + 
        "<img style='float:left;margin:4px 10px 4px 4px;' id='imgDemo'"+i+" src='/images/discount.png' width='100' height='90' title=''/>" + 
        "<p style='margin:0;line-height:1.5;font-size:13px;'>井盖状态：<span style='#FF4400'>非法开启</span></p>" + 
        "<p style='margin:0;line-height:1.5;font-size:13px;'>井盖类型：-</p>" + 
        "<p style='margin:0;line-height:1.5;font-size:13px;'>井盖地址：福建省福州市</p>" + 
        "<p style='margin:0;line-height:1.5;font-size:13px;'>备注：此为虚假数据</p>" + 
        "<p style='margin:0;line-height:1.5;font-size:13px;text-align:right;'><a style='display:inline-block;margin-left:10px;color:#4C8FF7;'>查看全景>></a>"+
        "<a style='display:inline-block;margin-left:10px;color:#4C8FF7;' onclick='openDetail()'>查看详情>></a></p>" + 
        "</div>";
        var infoWindow = new BMap.InfoWindow(sContent);
        marker.addEventListener("click", function(){       
            infoWindow.setWidth(300);
            this.openInfoWindow(infoWindow);
            //图片加载完毕重绘infowindow                    
            document.getElementById('imgDemo'+i).onload = function (){

                infoWindow.redraw();
            }
         });
      }
  }
  update();
}

function listMap(id){
    var map = new BMap.Map(id);
    map.centerAndZoom(new BMap.Point(119.278012,26.084406), 14);
    map.enableScrollWheelZoom();
  
    function update() {
        var data = [
            new BMap.Point(119.269173,26.057599),
            new BMap.Point(119.263639,26.056301),
            new BMap.Point(119.268167,26.064156),
            new BMap.Point(119.251566,26.056366),
        ];
      
      for (var i = 0, len = data.length; i < len; i++) {
          var pt = data[i];
          var myIcon = new BMap.Icon("/images/mapicon/gai.png", new BMap.Size(32,32));
          var marker = new BMap.Marker(pt,{icon:myIcon});  // 创建标注
          map.addOverlay(marker); 
        }
    }
    update();
}

function statuMap(id){
    var map = new BMap.Map(id);
    map.centerAndZoom(new BMap.Point(119.278012,26.084406), 14);
    map.enableScrollWheelZoom();
  
    function update() {
        var data = [
            new BMap.Point(119.269173,26.057599),
            new BMap.Point(119.263639,26.056301),
            new BMap.Point(119.268167,26.064156),
            new BMap.Point(119.251566,26.056366),
        ];
      
      for (var i = 0, len = data.length; i < len; i++) {
          var pt = data[i];
          var myIcon = new BMap.Icon("/images/mapicon/gai.png", new BMap.Size(32,32));
          var marker = new BMap.Marker(pt,{icon:myIcon});  // 创建标注
          map.addOverlay(marker); 
        }
    }
    update();
}

function openDetail(){
  var carousel = layui.carousel
    carousel.render({
        elem: '#prodList'
        ,arrow: 'always',
        width:'100%',
        height:'200',
        indicator:'none'
      });
    layer.open({
        type: 1,
        skin: 'layui-layer-blue', //样式类名
        closeBtn: 1, //不显示关闭按钮
        anim: 2,
        title:'产品属性',
        area: ['700px', '90%'],
        shadeClose: true, //开启遮罩关闭
        content: $("#detailModal")
      });
}

function openList(){
    layer.open({
        type: 1,
        skin: 'layui-layer-blue', //样式类名
        closeBtn: 1, //不显示关闭按钮
        anim: 2,
        title:'井盖列表',
        area: ['700px', '90%'],
        shadeClose: true, //开启遮罩关闭
        content: $("#listModal")
      });
      table.render({
        elem: '#listTable'
        ,cols: [[
          {field:'status', width:100, title: '状态',align:'center'}
          ,{field:'code', width:160, title: '井盖编号',align:'center'}
          ,{field:'lng', width:120, title: '经度',align:'center'}
          ,{field:'lat', width:120, title: '纬度',align:'center'}
          ,{field:'address', title: '地址', minWidth: 150,align:'center'}
        ]]
        ,data:[]
        ,page: true
        ,autoSort:false
      });
}