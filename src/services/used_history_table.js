import { supabase } from './supabase_api';

export const fetchUsedHistories = async (member_id) => {
  let { data: used_histories, error } = await supabase
    .from('used_history')
    .select('*')
    .order('used_date', { ascending: false })
    .eq('member_id', member_id);
  if (error) {
    console.log('error', error);
    return null;
  } else {
    used_histories.forEach((history) => {
      history.used_date = new Date(history.used_date);
    });
    return used_histories;
  }
};

export const addUsedHistory = async ({ member_id, used_date }) => {
  let { status, statusText, error } = await supabase
    .from('used_history')
    .insert({ member_id, used_date })
    .single();
  if (error) {
    console.log('error', error);
    return null;
  } else {
    console.log(`status:${status} statusText:${statusText}`);
    return status;
  }
};
