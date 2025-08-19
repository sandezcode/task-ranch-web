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
    start_date_human: '',
    //-------------------- Model Relationships --------------------
    user: {
      user_id: null,
      name: '',
      email: ''
    }
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
    setTasks(state, tasks){
      state.tasks = tasks;
    },
    setTask(state, task){
      state.tasks.unshift(task);
    },
    setTaskUpdate(state, newTaskUpdate){
      state.tasks.forEach((task) => {
        if(task.task_id === newTaskUpdate.task_id){
          Object.entries(newTaskUpdate).forEach(([key, value]) => {
            task[key] = value;
          });
        }
      });
    },
    setTaskDelete(state, taskId){
      for(let i = 0; i < state.tasks.length; i++){
        if(state.tasks[i].task_id === taskId){
          state.tasks.splice(i, 1);
        }
      }
    },
    setCurrentTask(state, currentTask){
      state.current_task = currentTask;
    },
    setDeleteDialog(state, status){
      state.delete_dialog = status;
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
