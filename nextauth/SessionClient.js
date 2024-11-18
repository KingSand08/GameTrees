"use client";
import { useSession, getSession } from "next-auth/react";
import { useState, useEffect } from "react";

const SessionServer = () => {
  const [sessionValue, setSessionValue] = useState({});
  const { data: session, status } = useSession();
  useEffect(() => {
    const getSessionInfo = async () => {
      const session = await getSession();
      setSessionValue(session);
    };
    getSessionInfo();
  }, []);
  // console.log(session);
  return (
    <>
      <h3 className="text-2xl">Client Component for NextAuth Session</h3>
      {/* {console.log(session.user?.username)} */}
      <br />
      {JSON.stringify(session)}
      <br />
      {JSON.stringify(sessionValue)}
    </>
  );
};

export default SessionServer;
