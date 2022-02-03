import React, { useRef ,useEffect} from 'react';
import {Grid} from '@material-ui/core';

import {PushToTalkButtonContainer , PushToTalkButton , ErrorPanel} from '@speechly/react-ui';
import {SpeechState, useSpeechContext } from '@speechly/react-client';

import Details  from './components/Details/Details';
import Main  from './components/Main/Main';
import useStyles from './styles'

const App = () => {
  const classes = useStyles();
  const { speechState } = useSpeechContext();
  const main = useRef(null);
  const executeScroll = ()=>{
    main.current.scrollIntoView();
  }
  useEffect(() => {
    if(speechState === SpeechState.Recording){
      executeScroll();
    }
  }, [speechState]);
  
  return <div>
      <Grid className={classes.grid} container direction="row" spacing={0} alignItems="flex-start"  justifyContent='space-evenly' style={{ height:'100vh' }}>
        <Grid item xs={12} md={4} sm={3} className={classes.mobile}>
            <Details title='Income' />
        </Grid>
        <Grid ref={main} item md={3} xs={12} sm={3} className={classes.main}>
          <Main />
        </Grid>
        <Grid item xs={12} md={4} sm={3} className={classes.desktop}>
            <Details title='Income' />
        </Grid>
        <Grid item xs={12} md={4} sm={3} className={classes.last} >
            <Details title='Expense' />
        </Grid>
      </Grid>
          <PushToTalkButtonContainer>
            <PushToTalkButton />
            <ErrorPanel />
          </PushToTalkButtonContainer>
      
  </div>;
};

export default App;
