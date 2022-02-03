import React , {useState , useContext, useEffect} from 'react';
import {TextField , Typography , Grid , Button , FormControl , InputLabel , Select , MenuItem} from '@material-ui/core';
import useStyles from './styles';
import {v4 as uuidv4} from 'uuid'
import { ExpenseTrackerContext } from '../../context/context';
import { incomeCategories , expenseCategories } from '../../constants/categories';
import { useSpeechContext } from '@speechly/react-client'
import formatDate from '../../utils/formatDate';
import CustomizedSnackbar from '../Snackbar/Snackbar';
const initialState = {
    type:"",
    category:"",
    amount:0,
    date: formatDate(new Date()) ,
}
const Form = () => {
 const classes = useStyles();
 const [formData, setformData] = useState(initialState);
 const [open, setOpen] = useState(false);
 const { addTransaction } = useContext(ExpenseTrackerContext);
 const { segment } = useSpeechContext(); 
 
 const createTransaction = ()=>{
    if(Number.isNaN(formData.amount) || !formData.date.includes('-')) return ; 
    if (incomeCategories.map((iC) => iC.type).includes(formData.category)) {
        setformData({ ...formData, type: 'Income' });
      } else if (expenseCategories.map((iC) => iC.type).includes(formData.category)) {
        setformData({ ...formData, type: 'Expense' });
    }
    const transaction = {...formData , amount:Number(formData.amount) , id:uuidv4()};
    setOpen(true);
    addTransaction(transaction);
    setformData(initialState);
 };

 useEffect(() => {
    if(segment){
        if(segment.intent.intent==='add_income'){
            setformData({...formData , type:'Income'});
        }
        else if(segment.intent.intent==='add_expense'){
            setformData({...formData , type:'Expense'});
        }else if(segment.isFinal && segment.intent.intent ==='create_transaction'){
            return createTransaction();
        }else if(segment.isFinal && segment.intent.intent ==='cancel_transaction'){
            setformData(initialState);
        }
        segment.entities.forEach((e)=>{
            const lower_case_category = `${e.value.charAt(0)}${e.value.slice(1).toLowerCase()}`; // converting all letters to lower case except first letter since all categories are defined like that
            switch (e.type) {
                case 'amount':
                    setformData({...formData , amount:e.value});
                    break;
                case 'category':
                    if(incomeCategories.map((e)=>e.type).includes(lower_case_category)){
                        setformData({...formData , type:'Income',category:lower_case_category});
                    }
                    else if(expenseCategories.map((e)=>e.type).includes(lower_case_category)){
                        setformData({...formData , type:'Expense',category:lower_case_category});
                    }
                    break;
                case 'date':
                    setformData({...formData , date:e.value});
                    break;
                default:
                    break;
            }
        });
        if(segment.isFinal && formData.type && formData.amount && formData.category && formData.date){
            return createTransaction();
        }
    }
 }, [segment]);
 
 const selectedCategories = formData.type==='Income' ? incomeCategories : expenseCategories ; 
  return(
      <Grid container spacing={2}>
          <CustomizedSnackbar open={open} setOpen={setOpen}/>
          <Grid item xs={12}>
                <Typography align='center' variant='subtitle2' gutterBottom> {segment && segment.words.map((w)=>w.value).join(" ")} </Typography>
          </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Type</InputLabel>
                    <Select value={formData.type} onChange={(e)=>setformData({...formData, type:e.target.value})}>
                        <MenuItem value='Income'> Income </MenuItem>
                        <MenuItem value='Expense'> Expense </MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select value={formData.category} onChange={(e)=>setformData({...formData, category:e.target.value})}>
                        {selectedCategories.map((category)=>(
                            <MenuItem key={category.type} value={category.type}> {category.type} </MenuItem>   
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <TextField type='number' label='Amount' value={formData.amount} onChange={(e)=>setformData({...formData, amount:e.target.value})} fullWidth />
            </Grid>
            <Grid item xs={6}>
                <TextField fullWidth type='date' value={formData.date} label='Date' onChange={(e)=>setformData({...formData, date:formatDate(e.target.value)})} />
            </Grid>
            <Button className={classes.button} variant='outlined' color='primary' onClick={createTransaction} fullWidth> Create </Button>
      </Grid>
  );
};

export default Form;
