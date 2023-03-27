import { supabase } from './supabase_api';

export const fetchMembers = async () => {
  let { data: members, error } = await supabase
    .from('members')
    .select('*')
    .order('id', { ascending: false });
  if (error) {
    console.log('error', error);
    return null;
  } else {
    return members;
  }
};

export const fetchMember = async (id) => {
  let { data: member, error } = await supabase.from('members').select('*').eq('id', id).single();
  if (error) {
    console.log('error', error);
    return null;
  } else {
    return member;
  }
};

export const addMember = async ({ name, tickets }) => {
  let { status, statusText, error } = await supabase
    .from('members')
    .insert({ name, tickets })
    .single();
  if (error) {
    console.log('error', error);
    return null;
  } else {
    console.log(`status:${status} statusText:${statusText}`);
    return status;
  }
};

export const updateTickets = async ({ id, tickets }) => {
  let { status, statusText, error } = await supabase
    .from('members')
    .update({ tickets })
    .eq('id', id)
    .single();
  if (error) {
    console.log('error', error);
    return null;
  } else {
    console.log(`status:${status} statusText:${statusText}`);
    return status;
  }
};

export const updateTicketsAndPrice = async ({ id, tickets, ticket_price }) => {
  let { status, statusText, error } = await supabase
    .from('members')
    .update({ tickets, ticket_price })
    .eq('id', id)
    .single();
  if (error) {
    console.log('error', error);
    return null;
  } else {
    console.log(`status:${status} statusText:${statusText}`);
    return status;
  }
};
