import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import TaskPage from './components/TaskPage'
import { createTask, editTask } from './actions'
import './App.css'

function App(props) {
  return (
    <div className="main-content">
      <TaskPage tasks={props.tasks} onCreateTask={props.createTask} onEditTask={props.editTask} />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    tasks: state.tasks
  }
}

const mapDispatchToProps = dispatch => ({
  createTask: bindActionCreators(createTask, dispatch),
  editTask: bindActionCreators(editTask, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
