import { writable, readable, derived } from 'svelte/store';


export const user = writable({});
export const admin = writable({});
export const rememberMe = writable(false);

//returing user status
export const userLoggedIn = derived(user, (_user) => {
    if(_user !== null){
        if(Object.keys(_user).length > 0){
            return true;
        }
    }   
    return false
})

export const adminLoggedIn = derived(admin, (_admin) => {
    if(_admin !== null){
        if(Object.keys(_admin).length > 0){
            return true;
        }
    }   
    return false
})
