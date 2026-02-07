'use client';

import { WorkbenchLayout } from "@/components/layout/workbench-layout";
import { EvidenceFeed } from "@/components/layout/evidence-feed";
import { useEffect, useState } from "react";

export default function Home() {
  const [userData, setUserData] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    fetch('http://127.0.0.1:8000/customers')
      .then(response => response.json())
      .then(data => {
        console.log(data)

        const usersById = data.reduce((acc, user) => {
          acc[user._id] = {
            first_name: user.first_name,
            last_name: user.last_name,
            address: JSON.stringify(user.address)
          };
          return acc;
        }, {});

        console.log(usersById)

        setSelectedUser(data[0]?._id);
        setUserData(usersById);
      });
  }, []);



  return (
    <WorkbenchLayout customers={userData} selectedUser={selectedUser} setSelectedUser={setSelectedUser}>
      <EvidenceFeed articles={[]} />
    </WorkbenchLayout>
  );
}
