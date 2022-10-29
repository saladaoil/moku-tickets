let returned_history = [];

const returned_history_db = {
  create_returned_history: (member_id, returned_date) => {
    returned_history.push({member_id, returned_date})
  },
  get_returned_histories: (member_id) => {
    const history = returned_history.filter((history) => history.member_id === member_id)
      .sort((a,b)=> b.returned_date - a.returned_date)
    return history;
  },
}

export default returned_history_db;

