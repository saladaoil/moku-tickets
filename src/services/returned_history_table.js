import { supabase } from './supabase_api';

export const fetchReturnedHistories = async (member_id) => {
  let { data: returned_histories, error } = await supabase
    .from('returned_history')
    .select('*')
    .order('return_date', { ascending: false })
    .eq('member_id', member_id)
    .limit(2);
  if (error) {
    console.log('error', error);
    return null;
  } else {
    returned_histories.forEach((history) => {
      history.return_date = new Date(history.return_date);
    });
    return returned_histories;
  }
};

export const addReturnedHistory = async ({ member_id, return_date, tickets, refund }) => {
  let { status, statusText, error } = await supabase
    .from('returned_history')
    .insert({ member_id, return_date, tickets, refund })
    .single();
  if (error) {
    console.log('error', error);
    return null;
  } else {
    console.log(`status:${status} statusText:${statusText}`);
    return status;
  }
};
