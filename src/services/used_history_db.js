let used_history = [];

const used_history_db = {
  create_used_history: (member_id, used_date) => {
    used_history.push({member_id, used_date})
  },
  get_used_histories: (member_id) => {
    const history = used_history.filter((history) => history.member_id === member_id )
            .sort((a,b)=> b.used_date - a.used_date)
    return history;
  },
}

export default used_history_db;


