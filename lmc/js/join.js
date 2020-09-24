// JavaScript Document
$(function(){
	$("a").focus( function() { this.blur(); } );//去除a标签的虚线
	$("input:button").focus( function() { this.blur(); } );//去除按钮虚线
	
	$(".join_input2").click(function(){
		window.open("index.html","_new")
		})
	$(".join_input1").focus(function(){
		$(this).val("")
		}).blur(function(){
			$(this).val("输入地址，为您定位附近的菜场")
			})
	})