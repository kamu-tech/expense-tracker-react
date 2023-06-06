import axios from 'axios'
import AuthHeader from '../component/AuthHeader'
const url="http://localhost:8081/profile"
class ProfileService{
    Edit(profile,id){
        return axios.post(url+'/edit/'+id,profile,{headers: AuthHeader()})
    }
    display(id){
        return axios.get(url+'/display/'+id,{headers: AuthHeader()})
    }
    changePassword(password,id){
        return axios.post(url+'/changePassword/'+id,password, {headers:AuthHeader()})
    }

}
export default new ProfileService();