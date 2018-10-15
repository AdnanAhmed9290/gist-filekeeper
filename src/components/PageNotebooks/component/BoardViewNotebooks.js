
// @flow

// libs

import * as React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { omit } from "ramda";
import { Link } from 'react-router-dom'

// import ShareIcon from '@material-ui/icons/Share'
// import DeleteIcon from '@material-ui/icons/Delete'


import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';

// src


import * as gistsActions from './../../../actions/gistsActions'
import * as toastActions from './../../../actions/toastrActions'
import { CircularProgress } from '@material-ui/core';
import AddFileModal from './../../Modals/CreateFileModal'

// import NotebookModal from './../../Modals/NotebookModal'



const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    margin: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  card: {
    minWidth: 200,
    maxWidth: 200,
    marginRight: theme.spacing.unit
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  listStyle: {
    display: 'flex',
    flexDirection: 'row',
    overflowX: 'auto',
    padding: '1em 0.1em'
  }
});


// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  console.log(source, destination, droppableSource, droppableDestination)
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};


type Props = {
  //   gistsActions: Object,
  toastActions: Object,
  classes: Object,
  isLoading: bool,
  notebooks: Array<Object>,
}


class BoardViewNotebooks extends React.Component<Props, State> {

  state = {
    notebooks: []
  }

  componentDidMount() {
    this.setState({
      notebooks: this.props.notebooks
    })
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    this.setState({
      notebooks: nextProps.notebooks
    })
  }

  onDragEnd = result => {

    const { source, destination } = result;
    const fileName = source.index
    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {

      return

    } else {

      let sourceList = this.state.notebooks[source.droppableId]
      let destinationList = this.state.notebooks[destination.droppableId]

      destinationList.files[fileName] = sourceList.files[fileName]
      sourceList.files = omit([fileName], sourceList.files)
      console.log(sourceList, destinationList)

      let newNotebooks = this.state.notebooks
      newNotebooks[source.droppableId] = sourceList
      newNotebooks[destination.droppableId] = destinationList

      this.setState({
        notebooks: newNotebooks
      })

      this.props.gistsActions.moveNotebook(sourceList, destinationList, fileName)

    }

  };

  render() {
    const { classes, isLoading } = this.props;
    const { notebooks } = this.state

    return (
      <React.Fragment>
        {
          isLoading ?

            <div className="text-center my-4">
              <CircularProgress />
            </div>
            :

            <DragDropContext onDragEnd={this.onDragEnd}>
              {
                notebooks.map((item, index) => (
                  <React.Fragment key={`idx-${index}`}>
                    <Droppable droppableId={`${index}`} direction="horizontal">
                      {(provided, snapshot) => (
                        <div ref={provided.innerRef}>
                          <Paper className={classes.root} elevation={1} style={{ background: snapshot.isDraggingOver ? 'lightblue' : '' }} >

                            <Link to={`/notes/${item.id}`}>
                              <Typography variant="title" component="h3">
                                {item.description}
                              </Typography>
                            </Link>
                            <div className={classes.listStyle}>
                              <AddFileModal type="CREATE" data={{ name: '', content: '', description: item.description }} id={item.id} updateNotebook={this.props.updateNotebook} />
                              &nbsp;&nbsp;&nbsp;&nbsp;
                              {
                                Object.values(item.files).length === 0 ?

                                  <Typography color="textSecondary">No notes in this notebook</Typography>
                                  :

                                  Object.values(item.files).map((file, idx) => (

                                    <Draggable
                                      key={`item-${index}-file-${idx}`}
                                      draggableId={`item-${index}-file-${idx}`}
                                      index={file.filename}>
                                      {(provided, snapshot) => (
                                        <div
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                        // style={{background: snapshot.isDragging ? 'lightgreen' : ''}}
                                        >
                                          <Card className={classes.card} key={idx} >
                                            <CardContent>
                                              <Typography component="p">
                                                {file.filename}
                                              </Typography>
                                            </CardContent>
                                          </Card>
                                          {/* <h1 style={{padding: '1em', border: '1px solid'}}>{`item-${index}-file-${idx}`}</h1> */}

                                        </div>
                                      )}
                                    </Draggable>

                                  ))
                              }


                            </div>

                          </Paper>
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </React.Fragment>
                ))}
            </DragDropContext>

        }

      </React.Fragment>
    );
  }
}


// const mapStateToProps = state => ({
//   // isLoading: pathOr(false, ['gistsReducer', 'isLoading'], state),
//   notebooks: pathOr([], ['gistsReducer', 'notebookReducer', 'gists'], state),
//   // user: pathOr({}, ['userReducer', 'user'], state)
// })

const mapDispatchToProps = dispatch => ({
  gistsActions: bindActionCreators(gistsActions, dispatch),
  toastActions: bindActionCreators(toastActions, dispatch)
})

BoardViewNotebooks = connect(null, mapDispatchToProps)(BoardViewNotebooks)
BoardViewNotebooks = withStyles(styles)(BoardViewNotebooks)

export default BoardViewNotebooks;