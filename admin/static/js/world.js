var localKey = 'ms-';

var common = {
    /**
     * 3.设置本地存储(html5存储，浏览器必须支持)
     */
    storage:{
        setItem : function( key, value ) {
        	key = localKey + key;
            value = JSON.stringify( value );
            localStorage.setItem( key, value ); 
        },
        getItem:function( key ) {   
        	key = localKey + key;
            return JSON.parse( localStorage.getItem( key ) );
        },
        removeItem:function( key ) {
        	key = localKey + key;
            localStorage.removeItem( key );
        }
    },
    // 进入的时候设置数据
    loginSetStorage( username, result ) {
        common.storage.setItem( 'username',  username );
        common.storage.setItem( 'purview',  result.data );
    },
    // 退出的时候清除所有数据
    outClear() {
        common.storage.removeItem( 'username' );
        common.storage.removeItem( 'purview' );
    }
};
export default common ;