// --------- OOP CLASSES ---------
class Stock {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }

    updatePrice() {
        const change = (Math.random() * 10 - 5).toFixed(2);
        this.price = Math.max(10, (this.price + Number(change)));
    }
}

class User {
    constructor(balance) {
        this.balance = balance;
        this.shares = 0;
        this.transactions = [];
    }

    buy(stock, qty) {
        const cost = stock.price * qty;
        if (this.balance >= cost) {
            this.balance -= cost;
            this.shares += qty;
            this.transactions.push(`Bought ${qty} shares at ₹${stock.price}`);
        } else {
            alert("Insufficient balance!");
        }
    }

    sell(stock, qty) {
        if (this.shares >= qty) {
            this.balance += stock.price * qty;
            this.shares -= qty;
            this.transactions.push(`Sold ${qty} shares at ₹${stock.price}`);
        } else {
            alert("Not enough shares!");
        }
    }
}

// --------- INITIALIZATION ---------
const stock = new Stock("ABC Corp", 100);
const user = new User(10000);

// --------- FUNCTIONS ---------
function updateMarket() {
    stock.updatePrice();
    document.getElementById("stockPrice").innerText = stock.price.toFixed(2);
    updatePortfolio();
}

function buyStock() {
    const qty = Number(document.getElementById("quantity").value);
    if (qty > 0) {
        user.buy(stock, qty);
        saveData();
        updatePortfolio();
    }
}

function sellStock() {
    const qty = Number(document.getElementById("quantity").value);
    if (qty > 0) {
        user.sell(stock, qty);
        saveData();
        updatePortfolio();
    }
}

function updatePortfolio() {
    document.getElementById("balance").innerText = `Balance: ₹${user.balance.toFixed(2)}`;
    document.getElementById("shares").innerText = `Shares Owned: ${user.shares}`;
    document.getElementById("value").innerText =
        `Portfolio Value: ₹${(user.shares * stock.price).toFixed(2)}`;

    const history = document.getElementById("history");
    history.innerHTML = "";
    user.transactions.forEach(t => {
        const li = document.createElement("li");
        li.innerText = t;
        history.appendChild(li);
    });
}

// --------- OPTIONAL FILE I/O (localStorage) ---------
function saveData() {
    localStorage.setItem("portfolio", JSON.stringify(user));
}

setInterval(updateMarket, 3000);
updateMarket();
