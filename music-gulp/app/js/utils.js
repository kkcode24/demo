define(['Tween'],function(Tween){
	function getStyle (obj,attr) {
		var num=0;
		if (obj.currentStyle) {
			num = parseFloat(obj.currentStyle[attr]);
		}else {
			num = parseFloat(getComputedStyle(obj)[attr]);
		}
		if(attr == "opacity"){
			// console.log(num);
			return Math.round(num*100);
		}
		return num;
	}

	function scrollToMove(obj,target,time) {

		var scrollTopMax=0;
		if (document.documentElement.clientHeight<obj.offsetHeight) {
			scrollTopMax=obj.scrollHeight-document.documentElement.clientHeight;
		}else {
			scrollTopMax=obj.scrollHeight-obj.offsetHeight;
		}
		if (target<0) {
			target=0;
		}
		if (target>scrollTopMax) {
			target=scrollTopMax;
		}

		var nowScrollTop=obj.scrollTop;
		var disTop=target-nowScrollTop;
		var ci=time/20;
		var perDis=disTop/ci;
		var num=0;
		clearInterval(obj.timer);

		

		if (obj.scrollTop==scrollTopMax&&perDis>=0) {
			return;
		}
		if (obj.scrollTop==0&&perDis<=0) {
			return;
		}

		obj.timer=setInterval(function() {		
			num++;		
			var goal=nowScrollTop+Math.round(perDis*num); 
			// console.log(num,obj.scrollTop);
			if (goal<0) {
				goal=0;
			}else if(goal>scrollTopMax){
				goal=scrollTopMax;
			}
			obj.scrollTop=goal;		
			if (num==ci) {
				obj.scrollTop=target;
				clearInterval(obj.timer);
			}
		},20);
	}
	
	var utils = {
		// 小于10，前置添0
		toZero: function(num){
			return num<10?"0"+num:""+num;
		},
		minToSec: function(StrTime) {
			var arr=StrTime.split(':');
			var sec=parseFloat((parseFloat(arr[0])*60+parseFloat(arr[1])).toFixed(2));
			return sec;
		},
		// 秒向下取整，小于10做前置填0操作
		SecToMin: function(num){
			var min = Math.floor(num/60);
			var sec = Math.floor(num%60);
			var str = this.toZero (min) + ":" + this.toZero (sec);
			return str;
		},
		hashToJson: function(str) {
			var json = {}; console.log(str);
			// var arr=str.match(/[^\?^#^=^&]+=[^\?^#^=^&]+/g); 

			var arr=str.match(/\w+=\w+/g);

			console.log(arr);
			if (!arr) {return str.substr(1);}

			for (var i = 0; i < arr.length; i++) {
				json[arr[i].split("=")[0]]=arr[i].split("=")[1];
			}
			return json;
		},
		doMove: function (obj,attrs,time,type,fn) {
			var j={};
			for (var attr in attrs) {
				j[attr]={};
				j[attr].b=getStyle(obj,attr); // 开始位置
				j[attr].c=attrs[attr]-j[attr].b; // 目标距离
				j[attr].s=0;
			}
			var t=0;// 次数
			var d=time/20;  // 时间/20 -->次数
			clearInterval(obj.timer);
			obj.timer=setInterval(function () {
			t++;
			for (var attr in j) {
				j[attr].s=Tween[type](j[attr].b,j[attr].c,d,t);
			}

			if (t>=d) {
				for (var attr in j) {
					j[attr].s=attrs[attr];
				}
				clearInterval(obj.timer);			
			}

			for (var attr in j) {		
				if (attr=="opacity") {
					obj.style[attr]=j[attr].s/100;
					obj.style.filter='alpha(opacity='+j[attr].s+')';
				}else {
					obj.style[attr]=j[attr].s+'px';
				}
			}

			if(t>=d){
				fn&&fn.call(obj);
			}

			}, 20);
		}
	}
	
	return utils;
})