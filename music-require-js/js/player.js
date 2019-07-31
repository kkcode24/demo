define(['audioTpl','lyrics','utils'],function(AudioTpl,Lyrics,UTILS){
	// 把html模板加载到body中
	$(AudioTpl.audioTpl).prependTo(document.body);
	
	// 播单
	var	play_list=[
			{
				song:"Burn",
				singer:"Angelika Vee",
				src:"mp3/1Angelika Vee - Burn.mp3",
				img:'img/1.jpg',
				lyric:'burn'
			},
			{
				song:"自卑情结",
				singer:"朴经,银河",
				src:"mp3/2朴经,银河.mp3",
				img:'img/2.jpg',
				lyric:'zbqingjie'
			},
			{
				song:"Say It Again",
				singer:"Frances",
				src:"mp3/3Frances - Say It Again.mp3",
				img:'img/3.jpg',
				lyric:'sayitagain'
			},
			{
				song:"Cry Wolf",
				singer:"Luna Shadows",
				src:"mp3/4Luna Shadows - Cry Wolf.mp3",
				img:'img/4.jpg',
				lyric:'crywolf'
			},
			{
				song:"虫儿飞",
				singer:"儿童歌曲",
				src:"mp3/5chong.mp3",
				img:'img/5.jpg',
				lyric:'chong'
			},
			{
				song:"DuDuDu",
				singer:"Standing Egg",
				src:"mp3/6Standing Egg.mp3",
				img:'img/6.jpg',
				lyric:'dududu'
			},
			{
				song:"丑八怪",
				singer:"薛之谦",
				src:"mp3/7choubaguai.mp3",
				img:'img/7.jpg',
				lyric:'choubaguai'
			},
			{
				song:"天使",
				singer:"五月天",
				src:"mp3/8angel-wuyue.mp3",
				img:'img/8.jpg',
				lyric:'angel',
				offset:-1.6
			},
			{
				song:"知足",
				singer:"五月天",
				src:"mp3/9enough- wuyue.mp3",
				img:'img/9.jpg',
				lyric:'zhizu'
			},
			{
				song:"突然好想你",
				singer:"五月天",
				src:"mp3/10turan-wuyue.mp3",
				img:'img/10.jpg',
				lyric:'turan'
			},
			{
				song:"温柔",
				singer:"五月天",
				src:"mp3/11wenrou-wuyue.mp3",
				img:'img/11.jpg',
				lyric:'wenrou',
				offset:-0.9
			}
	];
	
	/*
	oA.readyState
	0	HAVE_NOTHING	没有关于音频/视频是否就绪的信息
	1	HAVE_METADATA	关于音频/视频就绪的元数据
	2	HAVE_CURRENT_DATA	关于当前播放位置的数据是可用的，但没有足够的数据来播放下一帧/毫秒
	3	HAVE_FUTURE_DATA	当前及至少下一帧的数据是可用的
	4	HAVE_ENOUGH_DATA	可用数据足以开始播放
	*/

	var oA=document.getElementById('audio1');
	var oTotalTime=document.getElementById("total-time");
	var oCurrentTime=document.getElementById("currentTime");
	var aCtrls=document.querySelectorAll("#control span");
	var oSongName=document.getElementById('songName');
	var oArtist=document.getElementById('artist');
	var oCurBtn=document.getElementById('cur-btn');
	var oProcessCur=document.getElementById('process-cur');
	var oBg1=document.querySelector('.bg');
	var oDisk=document.querySelector('.disk');
	var oBg2=document.querySelector('.disk .disk-album-bg');
	var oCenter=document.querySelector('.center');
	var oPlayNeedle=document.querySelector(".center .play-needle");
	var oProcessBar=document.querySelector("#process-bar");
	var oBufferedBar=document.querySelector("#process-ready");
	var oLyric=document.querySelector(".lyric");
	var lyricUl=document.querySelector(".lyric ul");
	var lyricLi=lyricUl.getElementsByTagName("li");
	var oPlayListCount=document.getElementById('playListCount');
	var oPlayList=document.querySelector('#play-list');
	var oPlayListUl=document.querySelector('#play-list ul');
	var oPlayListLi=oPlayListUl.getElementsByTagName('li');
	var oListTitleClose=document.querySelector('#play-list .list-title-close');
	var oListMask=document.getElementById('list-mask');
	var olyricLine=document.getElementById('line');
	
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
	var player={
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
	};
		
	player.init=function () {
		player.loaddata(player.nowSong);
		player.load();
		player.getTotalTime();
		player.changeHash();
	};

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
				// clearInterval(timer);
				alert("歌曲加载超时!");
			}
		}, 20);
	};

	player.getCurTime=function () {
		if (!oA.currentTime||this.curDraging) {
			return;
		}
		// console.log(oA.buffered.start(0),oA.buffered.end(0));
		player.curtime = oA.currentTime;
		oCurrentTime.innerHTML=UTILS.SecToMin (player.curtime);
	};
	
	//从play_list加载数据
	player.loaddata=function (num) {
		this.song=play_list[num].song;
		this.singer=play_list[num].singer;
		this.src=play_list[num].src;
		this.img=play_list[num].img;
		if (play_list[num].lyric) {
			this.lyric=play_list[num].lyric;			
		}
		this.songCount=play_list.length;
		if (play_list[num].offset) {
			lyric.offset=play_list[num].offset;
		}else {
			lyric.offset=0;
		}
	};

	//加载歌曲src,song,singer
	player.load=function () {
		if (this.src&&this.song&&this.singer) {
			oA.src=this.src;
			oSongName.innerHTML=this.song;
			oArtist.innerHTML=this.singer;
			oBg1.style.backgroundImage="url("+this.img+")";
			oBg2.src=this.img;
			oPlayListCount.innerHTML=this.songCount;
		}
		if (this.lyric) {
			// console.log(this.lyric);
			loadLyric (this.lyric);
		}
	};


	//<li>Burn<span>  -Angelika Vee</span></li>
	player.playerlist=function () {
		for (var i = 0; i < play_list.length; i++) {			
			var li=document.createElement('li');
			var span=document.createElement('span');
			if (i==player.nowSong) {
				li.className="active";
			}
			li.index=i;
			li.onclick=function () {
				oPlayListLi[player.nowSong].className="";
				player.reset();
				player.nowSong=this.index;
				this.className="active";
				player.init();
				if (player.playing) {
					player.play();
				}
				lyReset ();
				scrollToMove(oPlayListUl,42*(this.index-2),400);
			}
			li.innerHTML=play_list[i].song;
			span.innerHTML="&nbsp;&nbsp;-"+play_list[i].singer;
			li.appendChild(span);
			oPlayListUl.appendChild(li);			
		}
	};

	player.preloadImg=function () {
		for (var i = 0; i < play_list.length; i++) {
			preLoad (play_list[i].img);
			// console.log(play_list[i].img);
		}
	};

	player.play=function (){
			oA.play();
			// oDisk.style.animationPlayState="running";
			oDisk.style.WebkitAnimationPlayState="running";		
	};

	player.pause=function (){
		oA.pause();
		// oDisk.style.animationPlayState="paused";
		oDisk.style.WebkitAnimationPlayState="paused";		
	};

	player.reset=function () {
		oA.currentTime=0.001;
		oBufferedBar.style.width="0px";
		player.buffered=0;
		player.getCurTime();
		player.processCur();
	};

	player.ifEnded=function () {
		if (oA.ended) {
			player.ended=true;
			player.preloadImg();
			lyReset ();
			player.reset();
			if (player.loopmodel==0) {
				oPlayListLi[player.nowSong].className="";				
				player.nowSong++;
				player.nowSong%=player.songCount;
				oPlayListLi[player.nowSong].className="active";
				player.init();
				player.play();
			}else if (player.loopmodel==1) {
				player.play();
			}else if (player.loopmodel==2){
				do{				
					var random=Math.round(Math.random()*player.songCount)-1;
					if (random<0) {
						random=0;
					}
				}
				while (random==player.nowSong);
				oPlayListLi[player.nowSong].className="";
				player.nowSong=random;
				oPlayListLi[player.nowSong].className="active";
				player.init();
				player.play();
			}

		}else {
			player.ended=false;
		}
	};

	player.getBuffered=function () {
		if (oA.readyState== 4) {
			player.buffered=oA.buffered.end(0);
			oBufferedBar.style.width=Math.round(player.buffered / player.duration) *100+"%";
		}
	};

	player.changeHash=function () {
		window.location.hash="song="+this.nowSong;
	};

	player.getHash=function () {
		if (window.location.hash) {
			var jsonHash= UTILS.hashToJson(window.location.hash);
			if (jsonHash.song&&play_list[jsonHash.song]) {
				player.nowSong=jsonHash.song;
			}else {
				player.nowSong=0;
				
			}
		}
	};

	player.processCur=function () {
		if (this.curDraging) {
			return;
		}
		if (this.curtime&&this.duration) {
			// console.log(this.curtime,this.duration);
			this.percent=this.curtime/this.duration;
			oCurBtn.style.left=this.percent*240+'px';
			oProcessCur.style.width=this.percent*100+'%';
		}
	};

	oA.ontimeupdate = player.getBuffered;
	
	//------------按钮-----------

	//单曲循环和列表循环切换
	aCtrls[0].onclick=function () {		
		if (player.loopmodel==0) {
			player.loopmodel=1;
			toggle(aCtrls[0],'solo');
		}else if(player.loopmodel==1){
			player.loopmodel=2;
			toggle(aCtrls[0],'solo');
			toggle(aCtrls[0],'random');
		}else if(player.loopmodel==2){
			player.loopmodel=0;
			toggle(aCtrls[0],'random');
		}
	};


	//上一首
	aCtrls[1].onmousedown=function () {
		player.preloadImg();
	};
	aCtrls[1].onclick=function () {
		if (oA.readyState==0) {
			return;
		}
		if (player.loopmodel==2) {
			do{				
				var random=Math.round(Math.random()*player.songCount)-1;
				if (random<0) {
					random=0;
				}
			}
			while (random==player.nowSong);
			oPlayListLi[player.nowSong].className="";
			player.nowSong=random;
			oPlayListLi[player.nowSong].className="active";
			player.init();
			if (player.playing) {
				player.play();
			}
			lyReset ();
			return;
		}
		player.reset();
		oPlayListLi[player.nowSong].className="";
		player.nowSong--;		
		if (player.nowSong<0) {
			player.nowSong=player.songCount-1;
		}
		oPlayListLi[player.nowSong].className="active";
		player.init();
		if (player.playing) {
			player.play();
		}
		lyReset ();

	};

	//播放按钮
	aCtrls[2].onclick=function () {
		if (oA.readyState==0) {
			return;
		}
		// player.getBuffered();
		lyricTimer ();
		player.ifEnded();
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
		clearInterval(player.CurTimer);
		player.pause();
		player.playing=false;		
		aCtrls[2].style.display="inline-block";
		aCtrls[3].style.display="none";
		toggle(oPlayNeedle,'stop');
		clearInterval(player.perSecTimer);
	};
	

	//下一首
	aCtrls[4].onmousedown=function () {
		player.preloadImg();		
	};
	aCtrls[4].onclick=function () {
		if (oA.readyState==0) {
			return;
		}
		if (player.loopmodel==2) {
			do{				
				var random=Math.round(Math.random()*player.songCount)-1;
				if (random<0) {
					random=0;
				}
			}
			while (random==player.nowSong);
			oPlayListLi[player.nowSong].className="";
			player.nowSong=random;
			oPlayListLi[player.nowSong].className="active";
			player.init();
			if (player.playing) {
				player.play();
			}
			lyReset ();
			return;
		}
		// console.log(oA.readyState);
		player.reset();
		oPlayListLi[player.nowSong].className="";
		player.nowSong++;
		player.nowSong%=player.songCount;
		oPlayListLi[player.nowSong].className="active";
		player.init();
		if (player.playing) {
			player.play();
		}
		lyReset ();
	};

	aCtrls[5].onclick=function () {
		oPlayListUl.scrollTop=42*(player.nowSong-2);
		UTILS.doMove (oPlayList,{bottom:0},150,'linear');
		player.listState=false;
		oListMask.style.display='block';
	};

	oListTitleClose.onclick=function () {
		UTILS.doMove (oPlayList,{bottom:-360},150,'linear');
		player.listState=true;
		oListMask.style.display='none';
	};

	oListMask.onclick=function () {
		UTILS.doMove (oPlayList,{bottom:-360},150,'linear');
		oListMask.style.display='none';
	};

	oProcessBar.onclick=function (ev) {
		ev=ev||window.event;
		var L1=this.getBoundingClientRect().left;
		var dis=ev.clientX-L1;
		dis=Math.round(dis);
		dis<0&&(dis=0);
		dis>240&&(dis=240);

		var btnTime=dis/240*player.duration;
		oCurrentTime.innerHTML=SecToMin (btnTime);
		oA.currentTime=(btnTime+0.001);
		lyMoveTo (btnTime);
		oCurBtn.style.left=dis+'px';
		oProcessCur.style.width=dis/240*100+'%';
		// console.log(dis);
	};

	//进度按钮拖拽
	oCurBtn.onclick=function (ev) {
		ev=ev||window.event;
		ev.stopPropagation();
	};
	oCurBtn.onmousedown=function (ev) {
		ev=ev||window.event;
		//offsetLeft从-10开始
		var L1=oCurBtn.offsetLeft+10;
		var ML1=ev.clientX;
		var tar=0;
		var btnTime=oA.currentTime;
		player.curDraging=true;
		document.onmousemove=function (ev) {
			ev=ev||window.event;
			var disX=ev.clientX-ML1;
			tar=L1+disX;
			tar<0&&(tar=0);
			tar>240&&(tar=240);
			oCurBtn.style.left=tar+'px';
			oProcessCur.style.width=tar/240*100+'%';
			btnTime=tar/240*player.duration;
			oCurrentTime.innerHTML=SecToMin (btnTime);
			lyMoveTo (btnTime+0.001);
		};
		document.onmouseup=function () {
			player.curDraging=false;
			// console.log(btnTime);
			oA.currentTime=(btnTime+0.001);			
			document.onmousemove=document.onmouseup=null;
		};

	};

	oLyric.onOff=true;
	oLyric.onclick=function () {
		if (oLyric.onOff) {
			oLyric.style.display='none';
			oCenter.style.opacity='1';		
		}
	};
	oCenter.onclick=function () {
		oLyric.style.display='block';
		oCenter.style.opacity='0.001';
	};
	oLyric.onmousedown=function (ev) {
		ev=ev||window.event;
		oLyric.onOff=true;
		var T1=ev.clientY;
		var ulTop1=lyricUl.offsetTop;
		var finalTar=lyricUl.offsetTop;
		document.onmousemove=function (ev) {
			ev=ev||window.event;
			if (Math.abs(ev.clientY-T1)<4) {
				return;
			}
			lyric.draging=true;
			oLyric.onOff=false;
			olyricLine.style.display="block";
			var target=ev.clientY-T1+ulTop1;
			if (target>lyric.lyricTop) {
				target=lyric.lyricTop;
			}
			if (target<(-lyricUl.offsetHeight+lyric.lyricTop+lyric.unitHeight)) {
				target=(-lyricUl.offsetHeight+lyric.lyricTop+lyric.unitHeight);
			}
			lyricUl.style.top=target+"px";
			var numTar=Math.round((target-lyric.lyricTop)/lyric.unitHeight);
			finalTar=numTar*lyric.unitHeight+lyric.lyricTop;
			if (lyric.lyPreNum>-1) {
				lyricLi[lyric.lyPreNum].className="";
				lyricLi[lyric.lyPreNum].style.cssText='';
			}
			lyric.lyNum=Math.abs(numTar);

			lyricLi[lyric.lyNum].className="active";
			lyricLi[lyric.lyNum].style.color=lyric.color;
			lyric.lyPreNum=lyric.lyNum;
		};
		document.onmouseup=function () {			
			if (lyric.draging) {
				lyric.draging=false;
				olyricLine.style.display="none";
				oA.currentTime=(lyric.lyMTime[lyric.lyNum]+0.001);
				oCurrentTime.innerHTML=SecToMin (lyric.lyMTime[lyric.lyNum]);
				oCurBtn.style.left=lyric.lyMTime[lyric.lyNum]/player.duration*240+'px';
				oProcessCur.style.width=lyric.lyMTime[lyric.lyNum]/player.duration*100+'%';
				UTILS.doMove (lyricUl,{top:finalTar},100,'linear');
			}			
			document.onmousemove=null;
			document.onmouseup=null;			
		};

	};

	
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

	//歌词清除样式,ul回到顶部
	function lyReset () {
		lyric.lyPreNum=-1;
		lyricUl.style.top=lyric.lyricTop+'px';//ul初始高度
		for (var i = 0; i < lyricLi.length; i++) {
			lyricLi[i].className="";
		}
	}


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

				lyMoveTo (oA.currentTime);

		}, 150);
	}
	
	function preLoad (src) {
		var image=new Image();
		image.src = src;
		if (image.complete) { // 如果图片已经存在于浏览器缓存，直接调用回调函数 
			// console.log('complete');
			return;
		}
		image.onload = function () { 
			// console.log('onload');
		};
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