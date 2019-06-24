import { EventEmitter } from "events";
import Dispatcher from "../appDispatcher";

const CHANGE_EVENT = "change";

class CourseStore extends EventEmitter {
  // By convention each flux store should have 3 functions:

  /* 1) addChangeListener
     allows React components to subscribe to our store so that
     they're notified when changes occur */
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  /* 2) removeChangeListener
    allows React components to unsubscribe from the store */
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  /* 3) emitChange - emit a change event*/
  emitChange() {
    this.emit(CHANGE_EVENT);
  }
}

const store = new CourseStore();

// Register the store with the dispatcher
Dispatcher.register(action => {
  /* This gets called any time an action is dispatched
    Every store that registers with the dispatcher is notified
    of every single action by default - so we build logic to 
    swith based on actionType being passed*/
  switch (action.actionType) {
  }
});

export default store;
