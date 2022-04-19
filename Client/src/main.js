import App from './App.svelte';
import { user, rememberMe } from './stores'



// since rememberMe cookie, is not a httpOnly cookie,
//it is accessible with js. 
const value = getCookie('rememberMe');
if(value !== undefined) rememberMe.set(value === 'true' ? true : false);

//getCookie() a method to get the value of the cookie
function getCookie(name) {
	const value = `${document.cookie}`;
	const parts = value.split(`${name}=`);
	if (parts.length === 2) return parts.pop().split(';').shift();
  }


(async function(){
	
	try{
	const res = await fetch('/Auth');
	const data = await res.json();
		if(data.data){
			app.$set({
				_user: data.data
			})
			user.set(data.data);
		}
		else{
			app.$set({
				_user: {}
			})
		}
	}
	catch(e){
		console.warn(e)
	}
})()


const app = new App({
	//by giving the app component a _user prop,
	//the loading of the SSO will be smoother
	//meaning there will not be multiple visible loading, specially in case of slow network,
	//the screen will be blank until everything is ready
	target: document.body,
	props: {
		_user: null
	}
	
});

export default app;
