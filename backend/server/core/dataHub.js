
// =====================
// 🚀 NEW FEATURE START: DATA HUB (UNIFIED DATA)
// =====================
let state = {
    users: [],
    revenue: 0,
    leads: [],
    events: []
};

const getState = () => state;

const addUser = (u)=> state.users.push(u);
const addLead = (l)=> state.leads.push(l);
const addRevenue = (r)=> state.revenue += r;
const trackEvent = (e)=> state.events.push(e);

module.exports = { getState, addUser, addLead, addRevenue, trackEvent };
// =====================
// 🚀 NEW FEATURE END
// =====================
