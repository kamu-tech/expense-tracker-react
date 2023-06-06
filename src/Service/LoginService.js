import axios from 'axios'
import AuthHeader from '../component/AuthHeader'
const url="http://localhost:8081/api/auth"
class LoginService {
    checkLogin(login){
       return axios.post(url+'/login',login);
    }
    Register(register){
        return axios.post(url+'/register',register);
    }
    display(name){
        return axios.get(url+'/display/'+name,{headers: AuthHeader()});
    }
    displayById(id){
        return axios.get(url+'/displayByid/'+id,{headers: AuthHeader()});
    }
}
export default new LoginService();
