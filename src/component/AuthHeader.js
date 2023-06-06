

function AuthHeader() {
    const user=JSON.parse(localStorage.getItem('user'));
    if(user){
        return {Authorization:  user};
    }
    else{
        return {};
    }
}

export default AuthHeader