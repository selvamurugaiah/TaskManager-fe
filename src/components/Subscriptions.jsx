import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../api";
import { MyContext } from "../context";
import "../styles/Subscriptions.css";
import PriceCard from "./PriceCard";

const tier = [
  {
    heading: "Free",
    perMonth: 0,
    feature: [
      "Free account",
      "Add Task",
      "Edit Task",
      "Delete Task",
      "Limited Access",
    ],
  },
  {
    heading: "Plus",
    perMonth: 1,
    feature: [
      "Premium Account",
      "Add Task",
      "Edit Task",
      "Delete Task",
      "Unlimited Access",
    ],
  },
];

const Subscriptions = () => {
  const [userEmail, setUserEmail] = useState("");
  const { user } = useContext(MyContext);

  useEffect(() => {
    fetch(`${API}/users/${user.userId}`)
      .then((res) => res.json())
      .then((data) => setUserEmail(data));
  }, []);
  return (
    <div className="subscription">
      <section className="pricing py-5">
        <div className="container">
          <div className="row">
            {tier.map((plan, i) => {
              return (
                <PriceCard
                  user={user}
                  userEmail={userEmail}
                  key={i}
                  tier={plan}
                />
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Subscriptions;
