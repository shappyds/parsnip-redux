import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import TaskPage from './components/TaskPage'
import { createTask, editTask, fetchTasks } from './actions'
import './App.css'

class App extends React.Component {

  componentDidMount() {
    this.props.fetchTasks()
  }
  
  
  render() {
    const { tasks, createTask, editTask } = this.props

    return (
      <div className="main-content">
        <TaskPage tasks={tasks} onCreateTask={createTask} onEditTask={editTask} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    tasks: state.tasks
  }
}

const mapDispatchToProps = dispatch => ({
  createTask: bindActionCreators(createTask, dispatch),
  editTask: bindActionCreators(editTask, dispatch),
  fetchTasks: bindActionCreators(fetchTasks, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
