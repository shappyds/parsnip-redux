import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import TaskPage from './components/TaskPage'
import FlashMessage from './components/FlashMessage'
import { createTask, editTask, fetchTasks } from './actions'
import './App.css'

class App extends React.Component {

  componentDidMount() {
    this.props.fetchTasks()
  }
  
  
  render() {
    const { tasks, createTask, editTask, isLoading } = this.props

    return (
      <div className="container">
        {
          this.props.error && <FlashMessage message={this.props.error}/>
        }
        <div className="main-content">
          <TaskPage tasks={tasks} onCreateTask={createTask} onEditTask={editTask} isLoading={isLoading} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    tasks: state.tasks.tasks,
    isLoading: state.tasks.isLoading,
    error: state.tasks.error
  }
}

const mapDispatchToProps = dispatch => ({
  createTask: bindActionCreators(createTask, dispatch),
  editTask: bindActionCreators(editTask, dispatch),
  fetchTasks: bindActionCreators(fetchTasks, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
