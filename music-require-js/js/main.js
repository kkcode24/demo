// require 配置
require.config({
	// baseUrl默认与main.js在同一个目录
	baseUrl: "js",
	paths: {
		"jquery": "lib/jquery.min"
	}
});


// 主程序
require(['jquery','lyrics','player'], function($,Lyrics,Player) {
	
	// 歌词测试
	var temp = Lyrics.lyricList.choubaguai;
	console.log( Lyrics.returnTimeLyric(temp));
	
	// 初始化播放器
	Player.perSecArrFn.push(Player.getCurTime);
	Player.perSecArrFn.push(Player.processCur);
	Player.perSecArrFn.push(Player.ifEnded);
	Player.getHash();
	Player.playerlist();
	Player.init();
});