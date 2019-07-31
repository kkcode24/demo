define(['audioTpl','lyrics','utils'],function(AudioTpl,Lyrics,UTILS){
	// 把html模板加载到body中
	document.body.innerHTML =  AudioTpl.audioTpl;
	var play_list = [];

	// 获取播单
	$.ajax({
		async: false,
        url : 'js/playList.json',
        success : function (resp) {
        	play_list = resp;
        }
    });

    /*
	oA.readyState
	0	HAVE_NOTHING	没有关于音频/视频是否就绪的信息
	1	HAVE_METADATA	关于音频/视频就绪的元数据
	2	HAVE_CURRENT_DATA	关于当前播放位置的数据是可用的，但没有足够的数据来播放下一帧/毫秒
	3	HAVE_FUTURE_DATA	当前及至少下一帧的数据是可用的
	4	HAVE_ENOUGH_DATA	可用数据足以开始播放
	*/

	var oA=document.getElementById('audio1');
	var oSongName=document.getElementById('songName');
	var oArtist=document.getElementById('artist');
	// 歌词部分
	var oCenter=document.querySelector('.center');
	var oPlayNeedle=document.querySelector('.center .play_needle');
	var oBg1=document.querySelector('.bg');
	var oDisk=document.querySelector('.disk');
	var oBg2=document.querySelector('.disk .disk-album-bg');
	var oLyric=document.querySelector(".lyric");
	var lyricUl=document.querySelector(".lyric ul");
	var lyricLi=lyricUl.getElementsByTagName("li");
	
	// 时间进度条部分
	var oTotalTime=document.getElementById("total-time");
	var oCurrentTime=document.getElementById("currentTime");
	var oCurBtn=document.getElementById('cur-btn');
	var oProcessCur=document.getElementById('process-cur');
	// control按钮
	var aCtrls=document.querySelectorAll("#control span");

	// 播放列表
	var oPlayList=document.querySelector('#play-list');
	var oPlayListCount=document.getElementById('playListCount');
	var oPlayListUl=document.querySelector('#play-list ul');
	var oListMask=document.getElementById('list-mask');
	var oListTitleClose=document.querySelector('#play-list .list-title-close');

	//------------歌词部分变量-----------
	var lyric={
		lyricStr:'',
		unitHeight:42,
		lyricTop:147,//ul初始高度
		lyNum:0,
		lyMTime:[],
		lyMtext:[],
		timer:null,
		lyPreNum:-1,
		color:'#fff',
		offset:0,
		draging:false
	};
	
	// 播放器对象
	var player = {
		duration:0,
		song:'',
		singer:'',
		src:'',
		img:'',
		lyric:'',
		playing:false,
		loopmodel:0,
		curtime:0,
		perSecTimer:null,
		perSecArrFn:[],
		percent:0,
		curDraging:false,
		ended:false,
		songCount:0,
		nowSong:0,
		buffered:0,
		listState:false
	}

	player.init = function(){
		player.loaddata(player.nowSong);
		player.load();
		player.getTotalTime();
		player.changeHash();
	}

	player.loaddata = function(num){
		this.song = play_list[num].song;
		this.singer = play_list[num].singer;
		this.src = play_list[num].src;
		this.img = play_list[num].img;
		this.songCount = play_list.length;
		if (play_list[num].lyric) {
			this.lyric = play_list[num].lyric;		
		}
	}

	// 加载歌曲src,song,singer
	player.load = function(){
		if (this.src&&this.song&&this.singer) {
			oA.src = this.src;
			oSongName.innerHTML = this.song;
			oArtist.innerHTML = this.singer;
			oBg1.style.backgroundImage="url("+this.img+")";
			oBg2.src = this.img;
			oPlayListCount.innerHTML = this.songCount;
		}

		if (this.lyric) {
			loadLyric(this.lyric);
		}
	}

	// 获取歌曲的总时长
	player.getTotalTime=function () {
		var n=0;
		var timer=setInterval(function  () {
			n++;
			if (oA.duration&&oA.duration>1) {
				clearInterval(timer);
				player.duration = oA.duration;				
				oTotalTime.innerHTML= UTILS.SecToMin (player.duration);			
			}
			if (n>800) {
				n=0;
				alert("歌曲加载超时!");
			}
		}, 20);
	};

	player.getCurTime = function(){
		if (!oA.currentTime||this.curDraging) {
			return;
		}

		player.curtime = oA.currentTime;
		oCurrentTime.innerHTML=UTILS.SecToMin (player.curtime);
	}

	player.perSec=function () {
		clearInterval(this.perSecTimer);
		this.perSecTimer=setInterval(function () {
			for (var i = 0; i < player.perSecArrFn.length; i++) {
				if (typeof player.perSecArrFn[i]==="function") {
					player.perSecArrFn[i].call(player);
				}
			}
		},1000);
	};

	player.processCur=function () {
		if (this.curDraging) {
			return;
		}
		if (this.curtime&&this.duration) {
			this.percent=this.curtime/this.duration;
			oCurBtn.style.left=this.percent*240+'px';
			oProcessCur.style.width=this.percent*100+'%';
		}
	};

	// 歌曲播放
	player.play=function (){
		oA.play();
		oDisk.style.WebkitAnimationPlayState="running";
	};
	// 歌曲暂停
	player.pause=function (){
		oA.pause();
		oDisk.style.WebkitAnimationPlayState="paused";
	};

	// 播放列表
	player.playList=function (){
		for (var i = 0; i < play_list.length; i++) {			
			var li=document.createElement('li');
			var span=document.createElement('span');
			if (i==player.nowSong) {
				li.className="active";
			}
			li.index=i;
			li.innerHTML=play_list[i].song;
			span.innerHTML="&nbsp;&nbsp;-"+play_list[i].singer;
			li.appendChild(span);
			oPlayListUl.appendChild(li);
		}
	};

	player.changeHash=function () {
		window.location.hash="song="+this.nowSong;
	};

	//
	player.perSecArrFn.push(player.getCurTime);
	player.perSecArrFn.push(player.processCur);

	// 加载播放列表
	player.playList();

	//播放按钮
	aCtrls[2].onclick=function () {
		if (oA.readyState==0) {return false;}
		lyricTimer();
		player.play();
		player.playing=true;
		player.getCurTime();
		aCtrls[2].style.display="none";
		aCtrls[3].style.display="inline-block";
		toggle(oPlayNeedle,'stop');
		player.perSec();
	};

	//暂停按钮
	aCtrls[3].onclick=function () {
		player.pause();
		player.playing=false;
		aCtrls[2].style.display="inline-block";
		aCtrls[3].style.display="none";
		toggle(oPlayNeedle,'stop');
	};

	//下一曲
	aCtrls[4].onmousedown=function () {
		player.preloadImg();		
	};
	aCtrls[3].onclick=function () {

	};

	//播放列表
	aCtrls[5].onclick=function () {
		oPlayListUl.scrollTop=42*(player.nowSong-2);
		UTILS.doMove (oPlayList,{bottom:0},150,'linear');
		player.listState=false;
		oListMask.style.display='block';
	};
	// 关闭播放列表
	oListTitleClose.onclick=function () {
		UTILS.doMove (oPlayList,{bottom:-360},150,'linear');
		player.listState=true;
		oListMask.style.display='none';
	};

	oLyric.onOff=true;
	// 隐藏歌词
	oLyric.onclick=function () {
		if (oLyric.onOff) {
			oLyric.style.display='none';
			oCenter.style.opacity='1';			
		}
	};
	// 显示歌词
	oCenter.onclick=function () {
		oLyric.style.display='block';
		oCenter.style.opacity='0.001';
	};

	function lyMoveTo (time) {
		var last=true;
		for (var i = 0; i < lyric.lyMTime.length; i++) {
			if(lyric.lyMTime[i]>(time-lyric.offset)){
				lyric.lyNum=i-1;
				last=false;
				break;//显示第i个
			}
		}

		if (last) {
			lyric.lyNum=lyric.lyMTime.length-1;
		}

		if (lyric.lyNum<0) {
			lyric.lyNum=0;
		}
		if (!lyricLi[lyric.lyNum]) {
			return;
		}

		if (lyric.lyPreNum==lyric.lyNum) {
			return;
		}else {
			if (lyric.lyPreNum>-1) {
				lyricLi[lyric.lyPreNum].className="";
				lyricLi[lyric.lyPreNum].style.cssText='';
			}
			lyric.lyPreNum=lyric.lyNum;
		}
		

		lyricLi[lyric.lyNum].className="active";
		lyricLi[lyric.lyNum].style.color=lyric.color;


		// console.log(lyric.lyMtext[lyric.lyNum]);
		UTILS.doMove (lyricUl,{top:lyric.lyricTop-lyric.unitHeight*lyric.lyNum},150,'linear');
	}

	function lyricTimer () {
		clearInterval(lyric.timer);
		lyric.timer=setInterval(function () {			
				if (lyric.draging) {
					return;
				}
				if(player.curDraging){
					return;
				}
				if (!player.playing) {
					clearInterval(lyric.timer);
					return;
				}			
				if (!oA.currentTime) {
					return;
				}

				lyMoveTo(oA.currentTime);

		}, 150);
	}

	//--------歌词相关--------
	function loadLyric (name) {
		lyric.lyricStr=Lyrics.lyricList[name];
		lyric.lyMTime=Lyrics.returnTimeLyric(lyric.lyricStr)[0];
		lyric.lyMtext=Lyrics.returnTimeLyric(lyric.lyricStr)[1];
		lyricUl.innerHTML='';
		for (var i = 0; i < lyric.lyMtext.length; i++) {
			var li1=document.createElement('li');	
			if (lyric.lyMtext[i]=='') {
				li1.innerHTML='&nbsp;';
			}else {
				li1.innerHTML=lyric.lyMtext[i];
			}
			lyricUl.appendChild(li1);
		}
	}

	function toggle(obj,className) {
		var str=obj.className;
		var arr=str.split(" ");
		var onOff=true;
		for (var i = 0; i < arr.length; i++) {
			if(arr[i]===className){
				onOff=false;
				arr.splice(i,1);
				i--;
			}
		}
		if (onOff) {
			arr.push(className);
		}
		obj.className=arr.join(" ");
		return obj.className;
	}

	return player;
})