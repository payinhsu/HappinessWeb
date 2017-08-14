import _ from 'lodash';

export function index(state = {}, action) {
  switch(action.type) {
    case 'RECEIVE_PAGE_INDEX':
      return action.pageData;
    // case 'RECEIVE_VIDEOS':
    //   return videos(state.videos, action);
    default:
      return state;
  }
}

export function insurants(state = {}, action) {
	switch(action.type) {
    case 'RECEIVE_MEMBER_INSURANT_LIST':
      return action.insurants;
    default:
      return state;
  }
}

export function youtube(state = {}, action) {
  switch(action.type) {
    case 'RECEIVE_YOUTUBE_INFO': 
      return action.youtubeInfo ;
    default:
      return state ;
  }
}

export function insurantsChangeLogs(state = {}, action) {
  switch(action.type) {
    case 'RECEIVE_INSURANTS_CHANGE_LOGS': 
      return action.insurantsChangeLogs ;
    default:
      return state ;
  }
}
// export function videos(state = [], action) {
//   switch(action.type) {
//     case 'RECEIVE_VIDEOS':
//       return action.videos;
//     default:
//       return state;
//   }
// }