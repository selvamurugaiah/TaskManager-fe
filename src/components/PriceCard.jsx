import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../api";

const PriceCard = (props) => {
  const navigate = useNavigate();
  const initPayment = (data) => {
    const options = {
      key: "rzp_test_N0wh9Kq61QhXvg",
      amount: data.amount,
      currency: data.currency,
      email: props.userEmail,
      description: "Test Transaction",
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyUrl = `${API}/payment/verify`;
          const res = await fetch(verifyUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({ ...response, user_id: props.user.userId }),
          });

          if (res.status == 200) {
            navigate("/");
          } else {
            alert("Something went wrong, Please try again");
          }
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handleSubmit = async (e) => {
    if (e.heading == "Free") return;
    try {
      const orderUrl = `${API}/payment/orders`;
      const res = await fetch(orderUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ amount: props.tier.perMonth }),
      });
      const data = await res.json();
      console.log(data);
      initPayment(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="col-lg-4">
      <div className="card mb-5 mb-lg-0">
        <div className="card-body">
          <h5 className="card-title text-muted text-uppercase text-center">
            {props.tier.heading}
          </h5>
          <h6 className="card-price text-center">
            ₹{props.tier.perMonth} <span className="period">/Month</span>
          </h6>
          <hr />
          <ul className="fa-ul">
            {props.tier.feature.map((item, i) => {
              const tier = props.tier.heading;
              let text = "";
              const toCheck = () => {
                if (tier === "Free" && i > 1) text = "text-muted";
                if (tier === "Plus" && i > 6) text = "text-muted";
              };
              toCheck();
              let icon = `fa-solid fa-${
                text === "text-muted" ? "times" : "check"
              }`;
              return (
                <li className={text} key={i}>
                  <span className="fa-li">
                    <i className={icon}></i>
                  </span>
                  {item}
                </li>
              );
            })}
          </ul>

          <div className="d-grid">
            <button
              disabled={props.tier.heading == "Free"}
              href="/"
              className="btn btn-primary text-uppercase"
              onClick={handleSubmit.bind(this, props.tier)}
            >
              Button
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceCard;
