#  GAMECRYPTO - Crash Game Backend

A real-time multiplayer "Crash" game backend built with **Node.js**, **WebSockets**, and real-time **cryptocurrency price integration**.

Players bet in USD, which is converted to a cryptocurrency (like BTC or ETH) using a live API. They must cash out before the game "crashes" to win!

---

## 🛠️ Features

- Real-time multiplier updates with WebSockets
- Simulated cryptocurrency betting using live prices
- User wallet management (deposit, balance, etc.)
- Multiplayer crash game logic
- REST API + WebSocket support
- Basic WebSocket frontend client for testing

---

## ⚙️ Setup Instructions

### 1. Clone the Repository


git clone https://github.com/your-username/GAMECRYPTO.git
cd GAMECRYPTO



### 2.Install Dependencies


npm install

## 3. Configure .env File
PORT=5000
MONGO_URI=your_mongodb_connection_string
CRYPTO_API_URL=https://api.coingecko.com/api/v3/simple/price
CRYPTO_SYMBOL=bitcoin
### Run the Project
npm run dev

### **Populate Sample Data**

node populate.js

### Connect to WebSocket:
const socket = io("http://localhost:5000");
### const socket = io("http://localhost:5000");
socket.emit('place_bet', { userId: "USER_ID", amount: 100 });


### Crypto API
GET https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd



## API Testing with Postman

Base URL: http://localhost:5000
Create User (POST)
/api/users/create

Deposit (POST)
/api/users/deposit
Body: { "userId": "USER_ID", "amount": 100 }

Get Balance (GET)
/api/users/balance/:userId

## Folder Structure
GAMECRYPTO/
├── models/
├── routes/
├── services/
├── sockets/
├── .env (excluded)
├── server.js
├── README.md
└── index.html

