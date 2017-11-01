const INITIAL_STATE = {
  formValues: {
    title: '',
    description: '',
    imageURI: ''
  },
  moods: []
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    default:
      return state;
  }
}
