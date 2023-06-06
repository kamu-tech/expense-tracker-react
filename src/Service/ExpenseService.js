import axios from 'axios'
import AuthHeader from '../component/AuthHeader'
const url="http://localhost:8081/expense"
class ExpenseService{
    display(id){
        return axios.get(url+'/display/'+id,{headers: AuthHeader()})
    }
    delete(id){
        return axios.delete(url+'/delete/'+id,{headers: AuthHeader()});
    }
    add(expense,id){
        return axios.post(url+'/add/'+id,expense,{headers: AuthHeader()});
    }
    edit(expense,id){
        return axios.put(url+'/edit/'+id,expense,{headers: AuthHeader()});
    }
    displayById(id){
        return axios.get(url+'/displayById/'+id,{headers: AuthHeader()});
    }
    filter(filter,id){
        return axios.post(url+'/filter/'+id,filter,{headers: AuthHeader()});
    }
    category(type){
        return axios.get(url+'/category/'+type,{headers:AuthHeader()});
    }
    
}
export default new ExpenseService();