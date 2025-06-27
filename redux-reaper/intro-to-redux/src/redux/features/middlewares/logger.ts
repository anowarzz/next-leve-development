const logger = (state) => (next) => (action) => {
    console.group  (state.getState());
    console.info(action.type);
  console.info("Previous State", state.getState());
    
  const result =   next(action)
  console.info("Next State", state.getState())
  console.groupEnd();
  return result ;
  
}



export default  logger ;