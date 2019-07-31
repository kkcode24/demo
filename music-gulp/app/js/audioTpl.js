define(function () {
	var audioTpl = [
		'<!--wrapper 最大的,包裹所有 -->',
		'<div id="wrapper">',
			'<!-- 背景图 -->',
			'<div class="bg"></div>',
			'<div class="bg-balck"></div>',
			'<!-- header  顶部歌曲名,歌手名 -->',
			'<div class="header">',
				'<div class="song" id="songName">Burn</div>',
				'<div class="artist" id="artist">Angelika Vee</div>',
			'</div>',
			'<!-- center  中间部分 -->',
			'<div class="center">',
				'<img class="play_needle stop" src="img/play_needle.png">',
				'<div class="disk-bg"></div>',
				'<div class="disk">',		
					'<img class="disk-album-bg" src="img/1.jpg">',
					'<img class="disk-music-bg" src="img/play_disc.png">',
				'</div>',
			'</div>',
			'<!-- 歌词部分 -->',
			'<div class="lyric">',
				'<div id="line"></div>',
				'<ul></ul>',
			'</div>',
			'<!-- footer 底部 -->',
			'<div class="footer">',
				'<!--process 进度条部分 -->',
				'<div id="process">',
					'<!--currentTime 当前时间 -->',
					'<span id="currentTime">00:00</span>',

					'<!--process-bar 进度条 -->',
					'<div id="process-bar">',
						'<div id="process-all"></div>',
						'<div id="process-ready"></div>',				
						'<div id="process-cur">',
							'<span id="cur-btn"></span>',
						'</div>',
					'</div>',

					'<!--total-time 总时间 -->',
					'<span id="total-time">00:00</span>',
				'</div>',
				'<div id="control">',
					'<!--loop 循环按钮  -->',
					'<span class="loop"></span>',

					'<!--pre 上一曲按钮  -->',
					'<span class="pre"></span>',

					'<!--play 播放按钮  -->',
					'<span class="play"></span>',

					'<!--pause 暂停按钮  -->',
					'<span class="pause"  style="display:none"></span>',

					'<!--next 下一曲按钮  -->',
					'<span class="next"></span>',

					'<!--list 列表按钮  -->',
					'<span class="list"></span>',
				'</div>',
			'</div>',
			'<div id="list-mask"></div>',
			'<div id="play-list">',
				'<div>',
					'<div class="list-title">播放列表(<span id="playListCount">0</span>)</div>',
					'<div class="list-title-close">×</div>',
				'</div>',
				'<ul>',
				'<!--',
					'<li class="active">Burn<span>  -Angelika Vee</span></li>',
				'-->',
				'</ul>',
			'</div>',
		'</div>',
		'<div style="display:none">',
			'<audio preload id="audio1"></audio>',
		'</div>'
	]

	return {
		audioTpl: audioTpl.join('')
	};
});