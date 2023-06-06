import axios from 'axios'
import AuthHeader from '../component/AuthHeader';
const url="http://localhost:8081/dashboard"
class DashboardService{
    TotalIncome(id){
        return axios.get(url+'/TotalIncome/'+id,{headers: AuthHeader()});
    }
    TotalExpense(id){
        return axios.get(url+'/TotalExpense/'+id,{headers: AuthHeader()});
    }
    Balance(id){
        return axios.get(url+'/BalanceIncome/'+id,{headers: AuthHeader()});
    }
    LatestIncome(id){
        return axios.get(url+'/latestIncome/'+id,{headers: AuthHeader()});
    }
    LatestExpense(id){
        return axios.get(url+'/latestExpense/'+id,{headers: AuthHeader()});
    }
}
export default new DashboardService();