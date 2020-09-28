// JavaScript Document
$(function(){
    var swiper = new Swiper('#index_banner', {
        autoplay:true,
        pagination: {
          el: '.swiper-pagination',
          dynamicBullets: true,
        },
      });
	var gouwuche=$(".shop_good ul").html()
//	$(".shop_good ul li").remove()
	
	$(".buy_right .add").click(function(){
		var parent_a=$(this).parents(".buy_good");
		var parent_b=parent_a.siblings(".good_sum");
		var sum=parent_a.find("input").val();
		var gross=$(".rule .text2").val();
		var good_price_1=parent_a.parents(".list_goods").siblings(".rule").find(".text1").val();
		var pri=parent_a.parents("li").find(".p").text()
		var price=parseInt(pri)
		gross++;
		sum++;
		$(".rule .text2").val(gross);
		parent_a.find("input").val(sum);
		parent_b.find("input").val(sum);		
		parent_a.parents(".list_goods").siblings(".rule").find(".shop_good ul").after(gouwuche)
		//alert(gouwuche)
		good_price=price*sum;
		good_price_1=Number(good_price_1)+Number(price);
		$(".rule .text1").val(good_price_1);
	})
	$(".buy_right .reduce").click(function(){
		var parent_a=$(this).parents(".buy_good");
		var parent_b=parent_a.siblings(".good_sum");
		var sum=parent_a.find("input").val();
		var gross=$(".rule .text2").val();
		var good_price_1=parent_a.parents(".list_goods").siblings(".rule").find(".text1").val();
		var pri=parent_a.parents("li").find(".p").text()
		var price=parseInt(pri)
		if(gross>0&&sum>0){
			gross--;
			$(".rule .text2").val(gross);
			good_price=price*sum;
			good_price_1=Number(good_price_1)-Number(price);
			$(".rule .text1").val(good_price_1);
			}
		if(sum>0){
			sum--;
			parent_a.find("input").val(sum);
			parent_b.find("input").val(sum);
			}
			
	})
	$(".list_goods li").mouseover(function(){
		var good=$(this).find(".buy_good")
		var good_sum=$(this).find(".good_sum")
		var sum=good_sum.find("input").val()
		good.show();
		if(good_sum.is(":visible")){
			good_sum.hide();
			}
		}).mouseout(function(){
			var good=$(this).find(".buy_good")
			var good_sum=$(this).find(".good_sum")
			var sum=good_sum.find("input").val()
			good.hide();
			if(sum>0){
				good_sum.show()
				}
				else{
					good_sum.hide()
					}
			})
		
		
	
	
})