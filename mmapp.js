var MM = {};

(function(MM){
  MM.perpage = 10;  // 每次拉取10张图
	MM.wrap = document.getElementById('wrap');

	MM.init = function() {
		MM.getDataByPage();
	};

	// 按分页拉取数据
	MM.getDataByPage = function(page, callback) {
		var cgi="http://image.baidu.com/channel/listjson?",
			params = {
				'fr'		: 'channel',
				'tag1'		: '美女',
				'tag2'		: '全部',
				'sorttype'	: 0,
				'pn'		: 0,
				'rn'		: 30,
				'ie'		: 'utf8',
				'oe'		: 'utf-8'
			},
			start,
			limit = MM.perpage;

		page = page || 1;

		params.pn = (page-1)*limit;
		params.rn = MM.perpage;

		MM.sendMessage('getdata', {
			url: cgi + MM._genHTTPParams(params),
			callback: 'MM.show'
		});
	};

	// 展示图片
	MM.show = function(d) {
		var imgsrc, w, h,
			data;
		console.log(d);
		if (d && d.data) {
			data = d.data;

			// imgsrc = data[0].image_url;  // 防盗链了
			imgsrc = data[0].obj_url;
			w = data[0].image_width;
			h = data[0].image_height;

			MM.wrap.innerHTML = '<img src="'+ imgsrc +'">';

		}
	};

	/**
	 * 创建JS与Client的gdtmsg通信器
	 * @return {object} 
	 */
	MM._sender = null;
	MM._getMessageSender = function() {
		var ifr;

		// 不存在则创建
		if (! (ifr=MM._sender)) {
			ifr = document.createElement('iframe');
			MM._sender = ifr;
			ifr.id = 'mmapp-notify-' + (new Date).getTime();
			ifr.style.display = 'none';
		}

		return ifr;
	};
	
	/**
	 * 生成请求串
	 * @param  {object} params	参数
	 * @return {string}     	请求串
	 */
	MM._genHTTPParams = function(params) {
		var req = [];

		for(var p in params) {
			req.push(p +'='+ encodeURIComponent(params[p]));
		}

		return req.join('&');
	};

	/**
	 * JS与Client的通信
	 * @param  {string} action 行为
	 * @param  {string} msg 需要传递的信息串
	 * @return {undefiend} 
	 */
	MM.sendMessage = function(action, params) {
		var requestUrl, ps
			sender = MM._getMessageSender();

		ps = typeof params==='object' ? MM._genHTTPParams(params) : '';

		requestUrl = 'zmsg://zoro.damon/'+ action + (ps ? '?' : '') + ps;
		sender.src = requestUrl;

		sender.parentNode || document.body.appendChild(sender);
	};

// TEST
	MM.sendMessage = function(action, params) {
		var data = {
	"tag1": "美女",
	"tag2": "全部",
	"totalNum": 49860,
	"start_index": 0,
	"return_number": 30,
	"data": [{
		"id": "4815017360",
		"pn": 0,
		"abs": "日韩,模特",
		"tags": ["模特", "日韩"],
		"image_url": "http://a.hiphotos.baidu.com/album/w%3D2048/sign=5ad59a260dd79123e0e09374990c5882/cf1b9d16fdfaaf51638b4b918d5494eef01f7ab0.jpg",
		"image_width": 710,
		"image_height": 1060,
		"thumbnail_url": "http://a.hiphotos.baidu.com/album/w%3D230/sign=c31604ecb3119313c743f8b355380c10/cf1b9d16fdfaaf51638b4b918d5494eef01f7ab0.jpg",
		"thumbnail_width": 230,
		"thumbnail_height": 343,
		"thumb_large_width": 310,
		"thumb_large_height": 462,
		"thumb_large_url": "http://a.hiphotos.baidu.com/album/w%3D310/sign=6ba74d0f9213b07ebdbd56093cd79113/cf1b9d16fdfaaf51638b4b918d5494eef01f7ab0.jpg",
		"site_name": "",
		"site_logo": "",
		"site_url": "http://www.mmlin.com",
		"from_url": "http://www.mmlin.com/meinvmote/447_7.html",
		"obj_url": "http://www.mmlin.com/uploads/allimg/c110817/13135554R04510-163634.jpg",
		"download_num": 1425,
		"collect_num": 189,
		"start_index": 0,
		"return_number": 30,
		"album_di": "",
		"can_album_id": "",
		"album_obj_num": "0",
		"user_id": "808309184",
		"app_id": "578130",
		"photo_id": "318222522"
	},
	{
		"id": "4814764211",
		"pn": 1,
		"abs": "写真 美女 美女帅哥",
		"tags": ["写真"],
		"image_url": "http://d.hiphotos.baidu.com/album/w%3D2048/sign=661a7e2be4dde711e7d244f693d7cf1b/18d8bc3eb13533fa31f35d00a9d3fd1f41345b53.jpg",
		"image_width": 505,
		"image_height": 735,
		"thumbnail_url": "http://d.hiphotos.baidu.com/album/w%3D230/sign=85a9d430b8389b5038ffe751b534e5f1/18d8bc3eb13533fa31f35d00a9d3fd1f41345b53.jpg",
		"thumbnail_width": 230,
		"thumbnail_height": 334,
		"thumb_large_width": 310,
		"thumb_large_height": 451,
		"thumb_large_url": "http://d.hiphotos.baidu.com/album/w%3D310/sign=9c5642269a504fc2a25fb604d5dce7f0/18d8bc3eb13533fa31f35d00a9d3fd1f41345b53.jpg",
		"site_name": "",
		"site_logo": "",
		"site_url": "http://www.22mm.cc",
		"from_url": "http://www.22mm.cc/mm/suren/giljjcecl_ljmimba.html",
		"obj_url": "http://srimg1.meimei22.com/pic/suren/2012-4-17/1/201203131246471042.jpg",
		"download_num": 640,
		"collect_num": 55,
		"start_index": 0,
		"return_number": 30,
		"album_di": "",
		"can_album_id": "",
		"album_obj_num": "0",
		"user_id": "812358586",
		"app_id": "578130",
		"photo_id": "318210688"
	},
	{
		"id": "5372206586",
		"pn": 2,
		"abs": "爆乳巨胸难遮难掩",
		"tags": ["诱惑"],
		"image_url": "http://c.hiphotos.baidu.com/album/w%3D2048/sign=532a0c52b21bb0518f24b4280242dbb4/f603918fa0ec08faab6013d758ee3d6d55fbda5a.jpg",
		"image_width": 446,
		"image_height": 670,
		"thumbnail_url": "http://c.hiphotos.baidu.com/album/w%3D230/sign=70df8c414b90f60304b09b440913b370/f603918fa0ec08faab6013d758ee3d6d55fbda5a.jpg",
		"thumbnail_width": 230,
		"thumbnail_height": 345,
		"thumb_large_width": 310,
		"thumb_large_height": 465,
		"thumb_large_url": "http://c.hiphotos.baidu.com/album/w%3D310/sign=435c7fd0f703738dde4a0a23831ab073/f603918fa0ec08faab6013d758ee3d6d55fbda5a.jpg",
		"site_name": "",
		"site_logo": "",
		"site_url": "http://tu.xiuna.com",
		"from_url": "http://tu.xiuna.com/20120604/15040.html",
		"obj_url": "http://imgs.xiuna.com/qianhou/2012-6-4/2/1.jpg",
		"download_num": 1284,
		"collect_num": 181,
		"start_index": 0,
		"return_number": 30,
		"album_di": "",
		"can_album_id": "",
		"album_obj_num": "0",
		"user_id": "778653918",
		"app_id": "578130",
		"photo_id": "318212598"
	}]
};
		MM.show(data);
	};
})(MM);

MM.init();
