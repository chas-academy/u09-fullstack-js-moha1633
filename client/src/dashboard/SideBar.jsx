import React, { useContext } from 'react';
import { Sidebar } from 'flowbite-react';
import { HiArrowSmRight, HiChartPie, HiInbox, HiOutlineCloudUpload, HiShoppingBag, HiSupport, HiTable, HiUser, HiViewBoards } from 'react-icons/hi';
import { AuthContext } from '../contects/AuthProvider';

export const SideBar = () => {
  const { user } = useContext(AuthContext);

  return (
    <Sidebar aria-label="Sidebar with content separator example">
      {/* Sidebar logo with user's display name or email fallback */}
      <Sidebar.Logo 
        href="#" 
        img={user?.photoURL || null}  // Show profile picture if available, else nothing
        imgAlt={user?.displayName || user?.email || "User profile"}  // Alt text for image
      >
        {user?.displayName || user?.email || "Demo User"}  {/* Show display name, or email, or fallback to 'Demo User' */}
      </Sidebar.Logo>
      
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="/admin/dashboard" icon={HiChartPie}>
            Dashboard
          </Sidebar.Item>
          <Sidebar.Item href="/admin/dashboard/upload" icon={HiOutlineCloudUpload}>
            Upload Book
          </Sidebar.Item>
          <Sidebar.Item href="/admin/dashboard/manage" icon={HiInbox}>
            Manage Books
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiUser}>
            Users
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiShoppingBag}>
            Products
          </Sidebar.Item>
          <Sidebar.Item href="/login" icon={HiArrowSmRight}>
            Sign In
          </Sidebar.Item>
          <Sidebar.Item href="/logout" icon={HiTable}>
            Log Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
        
        <Sidebar.ItemGroup>
          <Sidebar.Item href="#" icon={HiChartPie}>
            Upgrade to Pro
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiViewBoards}>
            Documentation
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiSupport}>
            Help
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};
