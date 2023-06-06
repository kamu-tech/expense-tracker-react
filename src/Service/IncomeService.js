import axios from 'axios'
import AuthHeader from '../component/AuthHeader'
const url="http://localhost:8081/income"
class IncomeService{
    display(id){
        return axios.get(url+'/display/'+id,{headers: AuthHeader()})
    }
    delete(id){
        return axios.delete(url+'/delete/'+id,{headers: AuthHeader()});
    }
    add(income,id){
        return axios.post(url+'/add/'+id,income,{headers: AuthHeader()});
    }
    edit(income,id){
        return axios.put(url+'/edit/'+id,income,{headers: AuthHeader()});
    }
    displayById(id){
        return axios.get(url+'/displayById/'+id,{headers: AuthHeader()});
    }
    filter(filter,id){
        return axios.post(url+'/filter/'+id,filter,{headers:AuthHeader()});
    }
    
}
export default new IncomeService();