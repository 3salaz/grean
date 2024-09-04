import React from 'react';
// import AdminPanel from '../components/AdminPanel';
import ViewMenuList from '../components/ViewMenuList';
import CreateMenuItem from '../components/CreateMenuItem';

function AdminPage() {
  return (
    <div className="h-[92svh] overflow-auto snap-y snap-mandatory hide-scroll overscroll-none w-full">
      <section className="h-full container w-full mx-auto">
        <ViewMenuList/>
        <CreateMenuItem/>
      </section>
    </div>
  );
}
export default AdminPage