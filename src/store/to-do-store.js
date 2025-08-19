const getDefaultState = () => ({
  form_dialog: false,
  form_type: '',
  tasks: [],
  current_task: {
    //-------------------- Model Properties --------------------
    task_id: null,
    name: '',
    description: '',
    start_date: '',
    status: null,
    //-------------------- Custom Properties --------------------
    // ...
  },
  delete_dialog: false
});

const toDoStore = {
  namespaced: true,
  state: getDefaultState(),
  mutations: {
    setFormStatus(state, formStatus){
      state.form_dialog = formStatus.form_dialog;

      if(state.form_dialog){
        state.form_type = formStatus.form_type;
      }else{
        setTimeout(() => {
          state.form_type = formStatus.form_type;
        }, 200);
      }
    },
    //-------------------- Reset data --------------------
    resetCurrentTask(state){
      state.current_task = getDefaultState().current_task;
    },
    resetStore(state){
      Object.assign(state, getDefaultState());
    }
  },
  actions: {
    resetStore(context){
      context.commit('resetStore');
    }
  }
}

export default toDoStore;
