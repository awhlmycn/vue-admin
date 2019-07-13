import bus from '../../src/components/common/bus.js';
import axios from 'axios';
import world from './world.js';

var host = process.env.API_ROOT;
// axios.defaults.baseURL = host;
axios.defaults.time = 3000;

/**
 * 1.重定向url
 */
function checkUrl( url ) {
	host = process.env.API_ROOT
	// 如果是管理员权限，则可以选择服务器列表
	var is_admin = world.storage.getItem( 'is_admin' );
	if( !url.includes( 'login' ) && is_admin ) {
		var cur_server = world.storage.getItem( 'cur_server' );
		if( cur_server ) {
			host = cur_server;
		}
	}
	return host;
}


// 拦截器
axios.interceptors.request.use( 
	function ( config ) {// 处理请求之前的配置
		config.headers = {
			'Content-Type' : 'application/x-www-form-urlencoded'
		}
 		return config;
 	},
	function( error ) { // 请求失败的处理
 		return Promise.reject( { code : 500, errMsg : error } );
 	}
);

// 响应拦截（配置请求回来的信息）
axios.interceptors.response.use( function ( response ) {
	if( response.status != 200 ) {
		bus.$emit( 'alert', '服务器异常' );
	}
	else if( response.data.code != 200 ) {
		bus.$emit( 'alert', response.data.errMsg );
	}
 	// 处理响应数据
 	return response;
 }, function (error){
  	// 处理响应失败
 	return Promise.reject( { code : 500, errMsg : error } );
 });

var apiRequest = {
	get( url, data ) {
		// checkUrl( url );
		return axios.get( host + url, { params : data } )
		.then( response => {
		    return response.data;
		})
		.catch( error => {
		    return { code : 500, errMsg : error };
		});
	},
	post( url, data ) {
		// checkUrl( url );
		return axios.post( host + url, formUrl( data ) )
		.then( response => {
		    return response.data;
		})
		.catch( error => {
		    return { code : 500, errMsg : error };
		});
	}
};

// 把post数据的data变为:username=1&password=1
function formUrl( data ) {
	var datStr = '';
	for( let name in data ) {
		if (typeof data[name] != 'function') {
            datStr += "&" + name + "=" + encodeURI( data[name] );
        }
	}
	return datStr;
}

export default apiRequest;