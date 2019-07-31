// require 配置
require.config({
	paths: {
		"jquery": "lib/jquery.min"
	}
});
// 主程序
require(['jquery','player'], function($,Player) {
	// 播放器初始化
	Player.init();
});