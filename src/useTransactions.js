import {useContext} from 'react';
import { incomeCategories , expenseCategories ,resetCategories  } from './constants/categories';
import { ExpenseTrackerContext } from './context/context';

const useTransactions = (title)=>{
    resetCategories();
    const { transactions } = useContext(ExpenseTrackerContext);
    const transactionsPerType = transactions.filter((t)=> t.type===title);
    const total = transactionsPerType.reduce((acc,curVal)=> acc+=curVal.amount , 0);
    const categories = title==='Income' ? incomeCategories : expenseCategories ; 
    transactionsPerType.forEach((transaction)=>{
        const category = categories.find((c)=> c.type===transaction.category);
        if(category) category.amount+=transaction.amount ; 
    });

    const filteredCategories = categories.filter((c)=> c.amount>0);

    const chartData = {
        datasets:[{
            data:filteredCategories.map((c) => c.amount),
            backgroundColor:filteredCategories.map((c) => c.color)
        }],
        labels:filteredCategories.map((c) => c.type)
    }
    return {filteredCategories, chartData , total} ; 
};

export default useTransactions ; 