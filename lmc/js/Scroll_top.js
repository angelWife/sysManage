// JavaScript Document
$(function(){
	
	$("a").focus( function() { this.blur(); } );//去除a标签的虚线
	$("input:button").focus( function() { this.blur(); } );//去除按钮虚线
	//$("input:text").focus( function() { this.blur(); } ); //去除输入框虚线
	var ssst=0;
	$(window).scroll(function(e){
		 var this_height=$(this).scrollTop();
			if(this_height>230){ 
				e.stopPropagation();
				clearTimeout(ssst);
				$(".menu").css({"position":"fixed","top":"0","z-index":"100000000"}).stop(true,true).fadeIn(600)
				
			}
			 else{
			 e.stopPropagation();
			 ssst=setTimeout(function(){$(".menu").css({"position":"fixed","top":"0","z-index":"100000000"}).fadeOut(600);},"fast")
			}
	})
	$(".input1").focus(function(){
		$(this).val("")
		}).blur(function(){
			$(this).val("马陆葡萄")
			})
	
	
	//选择时间下拉框
	$(".select").click(function(){
		$(this).siblings().slideDown("fast")
		})
	$(".selsct_con li").click(function(){
		var text=$(this).html();
		$(this).parents(".selsct_con").siblings(".select").html(text)
			$(this).parents(".selsct_con").slideUp("fast")
		})
	$(".time").mouseleave(function(){
		$(".time").find(".selsct_con").slideUp("fast")
		})
	})