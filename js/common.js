(function($){
	
})(jQuery);
jQuery.extend({
	/**
	 * 获取当前的iframe的id
	 */
	getIframeId:function() {
		var iframs = $('#mainIframe > .iframe', parent.document)
		var id = iframs.eq(0).attr('id')
		$.each(iframs, function (i, v) {
			if (!$(v).is(':hidden')) {
				id = $(v).attr('id')
			}
		})
		return id
	},
	/**
	 * 
	 * @param {string} title 标题 
	 * @param {string} href 路径
	 * @param {object} data 传参
	 * @param {fn} callback 回调
	 */
	addTab:function(title, href, data, callback) {
		if (!href) {
			layer.alert('正在努力建设中......')
			return false
		}
		var htm = ''
		var child = $('#headTree', parent.document).children('a')
		var hasChild = false
		var index = 0,
			a_ind = 0
		var src = href
		var c_href = setUrl(href);
		if (child.length > 0) {
			htm =
				'<a class="active" href="javascript:;" data-url="' +
				href +
				'" title="' +
				title +
				'">' +
				title +
				'<i class="closeNav iconfont icon-remove"></i></a>'
			for (var i = 0; i < child.length; i++) {
				var _a = child.eq(i)
				var _url = _a.data('url')
				var a_href = setUrl(_url)
				if (_a.hasClass('active')) {
					a_ind = i
				}
				if (a_href == c_href) {
					hasChild = true
					_a.addClass('active')
					index = i
					var s = $("#menuBox [data-name='" + title + "']", parent.document).eq(0)
					//console.log(s);
					if (s) {
						$('#menuBox', parent.document)
							.find('.active')
							.removeClass('active')
						s.addClass('active')
						var p = s
							.parent()
							.prev()
							.children()
							.eq(0)
						if (!p.hasClass('active')) {
							p.addClass('active')
						}
					}
				} else {
					_a.removeClass('active')
				}
			}
			$('#navHome', parent.document).removeClass('active')
			if (hasChild) {
				$('#mainIframe', parent.document)
					.children('.iframe')
					.eq(index)
					.removeClass('hidden')
					.siblings()
					.addClass('hidden')
			} else {
				child.eq(a_ind).after(htm)
			}
		} else {
			htm =
				'<a class="active" href="javascript:;" style="padding:0 10px;" data-url="' +
				href +
				'" title="' +
				title +
				'">' +
				title +
				'</a>'
			$('#headTree', parent.document).append(htm)
		}
		$('#headTree a', parent.document)
			.off('click')
			.on('click', function () {
				var ind = $(this).index()
				$(this)
					.addClass('active')
					.siblings()
					.removeClass('active')
				$('#mainIframe', parent.document)
					.children('.iframe')
					.addClass('hidden')
					.eq(ind)
					.removeClass('hidden')
				// addTab(title, href);
			});
	
		if (data) {
			src += src.indexOf("?") != -1 ? "&" : "?";
			var sparam = "";
			$.each(data, function (k, v) {
				if (sparam.length > 0) sparam += "&";
				sparam += k + "=" + v;
				console.log(k + "=" + v)
			});
			src += sparam;
		}
	
		// $.ajax({
		// 	url: src,
		// 	cache: true,
		// 	type: 'get',
		// 	dataType: 'html',
		// 	success: function(res) {
		var randomTime = new Date().getTime()
		href +='?radom'+randomTime
		var html = '<iframe id="iframe' + randomTime + '" class="iframe" data-url="' + href + '" width="100%" height="100%" frameBorder="0" src="' + href + '"></iframe>'
		var myframe = $('#mainIframe', parent.document).children('.iframe')
		if (hasChild) {
			// $.each(myframe, function (i, v) {
			// 	var n_url = $(v).data('url')
			// 	var n_href = setUrl(n_url)
			// 	if (n_href == c_href) {
			// 		$(v).html(res)
			// 		$(v).removeClass('hidden')
			// 		// $(v).append("<div class='red'>我刷行了</div>")
			// 	}
			// })
		} else {
			$('#mainIframe', parent.document)
				.children('.iframe')
				.addClass('hidden')
			if (myframe.length > 0) {
				myframe.eq(a_ind).after(html)
			} else {
				$('#mainIframe', parent.document).append(html)
			}
		}
		if (callback && typeof callback == 'function') {
			callback(data)
		}
		// },
		// error: function(error) {
		// 	layer.alert('正在努力建设中......')
		// 	$('#headTree .active').remove()
		// }
		// })
		$(".closeNav").off('click').on('click',function(){
			$.removeTab($(this));
		});
	},
	/**
	 * 
	 * @param {string} obj 需要移除的id节点
	 * @param {string} url 移除的url
	 */
	removeTab:function(obj, url) {
		var $a = $(obj).parent('a')
		var ind = $a.index()
		var next = $a.next()
		var prev = $a.prev()
		if ($a.hasClass('active')) {
			if (url) {
				var ts = $('#headTree > a', parent.document)
				ts.forEach(function (v, i) {
					var dom = $(v)
					if (dom.data('url') == url) {
						dom.addClass('active')
						$('#mainIframe', parent.document)
							.find('.iframe')
							.eq(i)
							.removeClass('hidden')
					} else {
						dom.removeClass('active')
					}
				})
			} else {
				if (prev.length > 0) {
					prev.addClass('active')
					$('#mainIframe', parent.document)
						.find('.iframe')
						.eq(prev.index())
						.removeClass('hidden')
				} else if (next.length > 0) {
					next.addClass('active')
					$('#mainIframe', parent.document)
						.find('.iframe')
						.eq(next.index())
						.removeClass('hidden')
				} else {
					// $("#defaultHome").removeClass('hidden');
				}
			}
			// $('#menuBox')
			// 	.find('.active')
			// 	.removeClass('active')
		}
		$('#mainIframe', parent.document)
			.children('.iframe')
			.eq(ind)
			.remove()
		$a.remove()
	},
	/***/
	layerOpen:function(url, title, width, height, data, callback) {
		var w = width || '800px'
		var h = height || '550px'
		if (typeof data == 'function') {
			callback = data
			data = {}
		}
		layer.open({
			type: 1,
			btn: false,
			area: [w, h],
			content: '',
			title: title || false,
			success: function (dom, index) {
				var a = $(dom).find('.layui-layer-content')
				if (a.size() == 1) {
					var t_id = 'temp_id' + new Date().getTime()
					a.eq(0).attr('id', t_id)
					a.eq(0).css('overflow-x', 'hidden')
					loadHtml(t_id, url, data, callback)
				}
			}
		})
	},
	/**
	 * 上传图片   返回base64
	 * @param {obj} file input选择的文件
	 * @param {string} id 存放图片的地方
	 * @param {string} type 上传图片位置
	 */
	preview:function(file, id, type) {
		var prevDiv = $('#' + id)
		if (file.files && file.files[0]) {
			var reader = new FileReader()
			reader.readAsDataURL(file.files[0])
			reader.onload = function (evt) {
				var li =
					'<li class="img">' +
					'<div  data-src="' + evt.target.result + '" style="background:url(' + evt.target.result + ') center center no-repeat;background-size:auto 100%;" onclick="showBigPIc(this)"></div>' +
					'<i class="closePic layui-icon layui-icon-close-fill" onclick="deletePic(this)"></i>' +
					'</li>'
				prevDiv.prepend(li)
			}
		} else {
			var li =
				'<li class="img">' +
				'<div style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src=\'' + file.value + '\'"></div>' +
				'<i class="closePic layui-icon layui-icon-close-fill" onclick="deletePic(this)"></i></li>'
			prevDiv.prepend(li)
		}
	},
	/**展示大图 */
	showBigPIc:function(obj) {
		var src = $(obj).data('src');
		if (src) {
			var html = '<div class="bigPicBox">'
			html += '<div class="bigPicModal"><img src="' + src + '"/><i class="closePic layui-icon layui-icon-close-fill" onclick="hideBigPic(this)"></i><div>'
			html += '</div>'
			$("body", parent.document).append(html)
		}
	},
	/**删除大图 */
	deletePic:function(obj) {
		$(obj).parent('li').remove();
	},
	hideBigPi:function(obj) {
		$(obj).parents('.bigPicBox').remove();
	},
	/**给必填项加上着重符号 */
	setFormInput:function() {
		var _html = $(".required");
		for (var i = 0; i < _html.length; i++) {
			if (_html.eq(i).html().indexOf('*') < 0) {
				var htm = '<span class="red">*</span>' + _html.eq(i).html();
				_html.eq(i).html(htm);
			}
		}
	}

});
function loadMenuAfter() {
	// 菜单缩小
	$('#menuClick')
		.off('click')
		.on('click', function () {
			if ($('#body_left').hasClass('showIcon')) {
				$('#body_left')
					.removeClass('showIcon')
					.animate({
						width: '250px'
					},300);
				$("#body_right").css("width","calc(100% - 250px)");
				$(this)
					.find('.glyphicon')
					.addClass('glyphicon-indent-right')
					.removeClass('glyphicon-indent-left')
				$('#menuBox li i').delay('fast').fadeIn()
				$('#menuClick').text('《')
			} else {
				$('#body_left')
					.addClass('showIcon')
					.animate({
						width: '35px'
					},
						300
					);
					$("#body_right").css("width","calc(100% - 45px)");
				$(this)
					.find('.glyphicon')
					.addClass('glyphicon-indent-left')
					.removeClass('glyphicon-indent-right')
				$('#menuBox li i').hide()
				// $('#menuBox .hasChild').hide()
				$('#menuClick').text('》')
			}
		})

	// 菜单的点击
	$('#menuBox li a')
		.off('click')
		.on('click', function () {
            var li = $(this).parent('li')
            var href = $(this).data('src');
            var title = $(this).data('name')
            var hasChild = li.hasClass('hasChild');
            if(hasChild){
                li.toggleClass('showMenu');
                if(!li.hasClass('showMenu')){
                    li.find(".showMenu").removeClass('showMenu');
                }
            }else{
                $('#menuBox li').removeClass('active');
                setTimeout(function(){
									li.addClass('active');
                                }, 100);
                                if(href){
                                    $.addTab(title, href);
                                }
                
            }
            return;
			
		});
	//头部菜单
	$('#headNav li.more').hover(
		function () {
			$(this)
				.find('.childNav')
				.stop()
				.slideDown()
		},
		function () {
			$(this)
				.find('.childNav')
				.stop()
				.slideUp()
		}
	)

	/*  $("#navHome").click(function() {
       // loadHtml('mainIframe');
        $(this).addClass('active');
        $("#headTree a").removeClass('active');
      })*/

	$('.closeAll').click(function () {
		$('#headTree')
			.children('a')
			.eq(0)
			.siblings()
			.remove()
		$('#mainIframe')
			.children('.iframe')
			.eq(0)
			.removeClass('hidden')
			.siblings()
			.remove()
		// $("#menuBox").find('.active').removeClass('active');
	})
}

function setUrl(url) {
	var _url = ''
	if (url.indexOf('&___time') != -1) {
		_url = url.substr(0, url.indexOf('&___time'))
	} else if (url.indexOf('?___time') != -1) {
		_url = url.substr(0, url.indexOf('?___time'))
	} else {
		_url = url
	}
	return _url;
}

function loadHtml(dom, url, data, callback, title) {
	if (callback && typeof callback == 'string') {
		title = callback
		callback = {}
	}
	if (url) {
		var src = url
		$.ajax({
			url: src,
			cache: true,
			// async: false,
			type: 'get',
			dataType: 'html',
			success: function (res) {
				$('#' + dom).html(res)
				if (callback && typeof callback == 'function') {
					callback()
				}
				// if(title){
				//     addTab(title, url);
				// }
			},
			error: function (error) {
				console.log()
			}
		})
	} else {
		$('#' + dom).html(
			"<div style='font-size:30px;text-align:center;line-height:200px;color:red;' >正在努力建设中......</div>"
		)
	}
}

function clickBack() {
	var tab = $('#headTree', parent.document)
		.children('a.active')
		.children('.closeNav')
	$.removeTab(tab)
}

function init_menu (menus,needFrist) {
	if(menus.length==0){
		loadMenuAfter();
		return false;
    }
    var active = 'active';
    if(needFrist){
        active = ''
    }
    var str = '<ul  class="menuItem">'
    for (var i = 0; i < menus.length; i++) {
        var item = menus[i];
        // if (i == 0) {
        //     str += '<li class="'+active+'"><a id="' + item.id + '" class="' + item.icon + '" href="javascript:void(0);" data-src="'+item.url+'" data-name="'+item.name+'"><span>' + item.name + '</span></a>'
        // } else {
            var li_c_class=item.children?'hasChild':'';
            if(i==0){
                li_c_class+=' '+active
            }
            if (item.icon) {
                str += '<li class="'+li_c_class+'"><a id="' + item.id + '" href="javascript:void(0);" class="' + item.icon + '" data-src="' +item.url + '" data-name="' + item.name + '"><span>'+ item.name + '</span>'
            } else {
                str += '<li class="'+li_c_class+'"><a id="' + item.id + '" href="javascript:void(0);" data-src="' +item.url + '" data-name="' + item.name + '"><span>'+ item.name + '</span>'
            }
            if (item.children) {
                str += '<i class="iconfont icon-down"></i></a>';
                str += '<ul class="childMenu">'
                for (var j = 0; j < item.children.length; j++) {
                    var item_c = item.children[j]
                    var li_class=item_c.children?'hasChild':'';
                    if (item_c.icon) {
                        str += '<li class="'+li_class+'"><a id="' + item_c.id + '" href="javascript:void(0);" class="hasIcon ' + item_c.icon + '" data-src="' +item_c.url + '" data-name="' + item_c.name + '"><span>'+ item_c.name + '</span>'
                    } else {
                        str += '<li class="'+li_class+'"><a id="' + item_c.id + '" href="javascript:void(0);" data-src="' +item_c.url + '" data-name="' + item_c.name + '"><span>'+ item_c.name + '</span>'
                    }

                    if (item_c.children) {
                        str += '<i class="iconfont icon-down"></i></a>'
                        str += '<ul class="childMenu">'
                        for (var k = 0; k < item_c.children.length; k++) {
                            var item_child = item_c.children[k]
                            str += '<li><a class="noIcon" id="' + item_child.id + '" href="javascript:void(0);" data-src="' + item_child.url + '" data-name="' + item_child.name + '">' +
                                '<span>' + item_child.name + '</span></a></li>'
                        }
                        str += '</ul>'
                    } else {
                        str += '</a>'
                    }
                    str += '</li>'

                }
                str += '</ul>'
            } else {
                str += '</a>'
            }
        // }
        str += '</li>'
    }
    str += '</ul>'
    $('#menuBox').html(str)
    loadMenuAfter()
}

function display_left_menu(id) {
	$('.left_m').addClass('none')
	$('#' + id).removeClass('none')
}

function init_left_menu(id, menus, active) {
	//var menus = left_menu[id];
	if (active) {
		var str = '<div id="' + id + '" class="left_m" >'
	} else {
		var str = '<div id="' + id + '"  class="left_m none" >'
	}

	for (var j = 0; j < menus.length; j++) {
		var mmmId = menus[j]['id']
		var mmmDomId = 'indexMenu' + mmmId

		str +=
			'<dl>' +
			'<dt style="font-weight:100;" >' +
			'<a  id="' +
			mmmDomId +
			'" class="' +
			menus[j]['icon'] +
			'" data-src="' +
			menus[j]['url'] +
			'" data-name="' +
			menus[j]['name'] +
			'">' +
			menus[j]['name'] +
			'</a>' +
			'</dt>'

		if (menus[j]['children'] && menus[j]['children'].length > 0) {
			str += '<dd>'
			for (var k = 0; k < menus[j]['children'].length; k++) {
				var a_menu = menus[j]['children'][k]
				var mmmId2 = a_menu['id']
				var mmmDomId2 = 'indexMenu' + mmmId2
				str +=
					'<a id="' +
					mmmDomId2 +
					'" href="javascript:;" data-src="' +
					a_menu['url'] +
					'" data-name="' +
					a_menu['name'] +
					'">' +
					a_menu['name'] +
					'</a>'
			}
			str += '</dd>'
		}
		str += '</dl>'
	}
	str += '</div>'
	$('#menuBox').append(str)
}


// 开关切换
function switchChange(obj){
	$(obj).toggleClass('on');
}

//切换iframe地址
function changeSrc(url){
	$("#mainIframe .iframe").attr('src',url);
}