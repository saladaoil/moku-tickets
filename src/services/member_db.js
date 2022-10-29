let members = [
  {
    member_id: '1001',
    name: "Alice",
    tickets: 2
  },
  {
    member_id: '1002',
    name: "Bob",
    tickets: 10
  },
  {
    member_id: '1003',
    name: "John",
    tickets: 3
  },
  {
    member_id: '1004',
    name: "Rina",
    tickets: 0
  },
];

function generate_member_id(){
  return Math.random().toString(32).substring(2);
}

const member_db = {
  get_members: () => {
    return members;
  },
  get_member: (member_id) => {
    return members.find((member) => member.member_id === member_id)
  },
  update_member: (member) => {
    const index = members.findIndex((element) => element.member_id === member.member_id)
    if (index >= 0) {
      members[index] = member;
    }
  },
  create_member: (member) => {
    members.push( {...member, member_id: generate_member_id() } )
  }
}

export default member_db;
