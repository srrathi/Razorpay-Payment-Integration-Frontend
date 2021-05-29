import logo from "./logo.svg";
import "./App.css";

const loadRazorpay = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };

    document.body.appendChild(script);
  });
};

function App() {
  // https://checkout.razorpay.com/v1/checkout.js

  const displayRazorpay = async () => {
    const res = await loadRazorpay(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load, Error Occured!");
      return;
    }

    const data = await fetch("http://localhost:3001/razorpay", {
      method: "POST",
    }).then((e) => {
      return e.json();
    });

    console.log(data);

    const options = {
      key: process.env.RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      name: "Sitaram Rathi Payment Gateway Integration",
      description: "Test Transaction",
      image: "http://localhost:3001/logo.svg",
      order_id: data.id,
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      prefill: {
        name: "Sitaram Rathi",
      },
    };

    var paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  // handleSubmit();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Razorpay Payment Gateway Integration</p>
        <button
          className="App-link"
          onClick={displayRazorpay}
          rel="noopener noreferrer"
        >
          Donate $5
        </button>
      </header>
    </div>
  );
}

export default App;
