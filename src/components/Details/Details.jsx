import React from 'react';
import {Card , CardHeader , CardContent , Typography} from '@material-ui/core'; 

import useStyles  from './styles';
import useTransactions from '../../useTransactions';
// import 'chart.js/auto'; // adding this line since in v4 of chart js Chart.js is treeshakable and we need to import and register all elements that we are using.

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const Details = ({ title, subheader }) => {
    const classes = useStyles();
    const {chartData , total} = useTransactions(title);
  return <div>
      <Card className={title==='Income' ? classes.income : classes.expense}>
          <CardHeader title={title} subheader={subheader}/>
          <CardContent>
              <Typography variant='h5'>{`₹${total}`}</Typography>
              <Doughnut data={chartData} />
          </CardContent>
      </Card>
  </div>;
};

export default Details;
