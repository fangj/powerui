require('isomorphic-fetch');
var Frisbee =require( 'frisbee').default;

var api;


//等待函数
const wait =(ms)=> new Promise((resolve, reject) => {
  setTimeout(resolve, ms);
});


//取状态接口
function getStatus(mac){
	return api.get("/"+mac).then(res=>res.body)
	.catch(e=>{
		console.log(e)
	})
}

//取所有状态接口
function getAll(){
	return api.get("/all").then(res=>res.body)
}

//取所有状态接口
function getOnline(){
	return api.get("/online").then(res=>res.body)
}



//设置状态接口
const setCommand=(command)=>{
	return api.post('/set', {body:command}).then(res=>{
		console.log('设置成功',res.body)
	}).catch(e=>{
		console.log(e)
	})
}



const setCommandAndWait=(command)=>setCommand(command).then(_=>wait(100));//设置命令发出后等待0.1s


//批量设置状态
function setCommands(commands){
	commands.reduce((p,mac)=>p.then(_=>setCommandAndWait(mac)),Promise.resolve());
}

module.exports=function(host){
	api = new Frisbee({
	  // baseURI: 'http://localhost:3000',
	  baseURI: host,
	  headers: {
	    'Accept': 'application/json',
	    'Content-Type': 'application/json'
	  },
	  mode: "no-cors"
	});
	return {
		getStatus,
		getAll,
		setCommand,
		setCommands,
		getOnline
	}
}