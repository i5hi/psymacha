const server = 'https://test.satswala.com/admin';
//-------------------------------------------------------
const getHistory = (token) => {
  return new Promise((resolve, reject) => {
    try {
      const url = server + "/txs/history"
      const options = {
        method: "GET",
        headers: {
          "Allow": 'application/x-www-form-urlencoded',
          "Content-Type": "application/x-www-form-urlencoded",
          "Accept": "*/*",
          "Cache-Control": "no-cache",
          "Connection": "keep-alive",
          "Accept-Encoding": "gzip, deflate",
          "Access-Control-Allow-Credentials": false,
          "Authorization": `Bearer ${token}`
        },
        rejectUnauthorized: false,
      };

      fetch(url, options)
        .then(function (response) {
          console.log(response.status)
          if (response.status !== 200) {
            console.log(response.body);
          }
          if (response.status === 401) {
            window.location.replace(`${server}/`);
          } else {
            response.json()
              .then(function (data) {
                if (data.status) {
                  resolve((data.message));
                } else {
                  reject(data);
                }
              })
              .catch(e => {
                console.error(e);
                reject(e)
              });
          }
        })
        .catch(e => {
          console.error(e);
          reject(e)

        })
    } catch (e) {
      console.error(new Error(e))
      reject(e)
    };
  })
}
//-------------------------------------------------------
const populate = (history) => {
  try {
    console.log({
      history
    });
    document.getElementById('tableData').innerHTML = "";
    document.getElementById('txcount').innerHTML = history.btxs.length

    let txin = 0;
    let txout = 0;
    let fees = 0;
    let miner_fees = 0;
    let dust = 0;


    history.btxs.map((btx) => {
      if (btx.direction === "in") txin += btx.amount;
      if (btx.direction === "out") {
        txout += btx.amount;
        fees += btx.fees ? btx.fees : 0;
      }

      if (btx.txid.startsWith("s5fee")) {
        miner_fees += btx.amount;
        document.getElementById('tableData').innerHTML += `<tr><td style=\"font-size:9px\">${timeConverter(btx.timestamp)}</td><td>sats</td><td>${btx.direction}</td><td style=\"font-size: 9px\">${btx.from}</td><td style=\"font-size: 9px\">${btx.to}</td><td style=\"font-size: 21px; color: #AF125A\">${comma(btx.amount)}</td><td>${btx.fees?comma(btx.fees):0}</td><td style="font-size:12px">3</td><td style=\"font-size: 5px\">${btx.txid}</td></tr>`;
      }
      else {
        if (btx.direction === "in")
          document.getElementById('tableData').innerHTML += `<tr><td style=\"font-size:9px\">${timeConverter(btx.timestamp)}</td><td>sats</td><td>${btx.direction}</td><td style=\"font-size: 9px\">${btx.from}</td><td style=\"font-size: 9px\">${btx.to}</td><td style=\"font-size: 21px; color: #30B0AA\">${comma(btx.amount)}</td><td>${btx.fees?comma(btx.fees):0}</td><td style="font-size:12px">${btx.confirmations}</td><td><a href='https://blockstream.info/tx/${btx.txid}' target='_blank'>blockstream</td></tr>`;
        else if (btx.direction === "out")
          document.getElementById('tableData').innerHTML += `<tr><td style=\"font-size:9px\">${timeConverter(btx.timestamp)}</td><td>sats</td><td>${btx.direction}</td><td style=\"font-size: 9px\">${btx.from}</td><td style=\"font-size: 9px\">${btx.to}</td><td style=\"font-size: 21px; color: #AF125A\">${comma(btx.amount)}</td><td>${btx.fees?comma(btx.fees):0}</td><td style="font-size:12px">${btx.confirmations}</td><td><a href='https://blockstream.info/tx/${btx.txid}' target='_blank'>blockstream</td></tr>`;
          else if (btx.direction === "x")
          document.getElementById('tableData').innerHTML += `<tr><td style=\"font-size:9px\">${timeConverter(btx.timestamp)}</td><td>sats</td><td>${btx.direction}</td><td style=\"font-size: 9px\">${btx.from}</td><td style=\"font-size: 9px\">${btx.to}</td><td style=\"font-size: 21px; color: #1F5673\">${comma(btx.amount)}</td><td>${btx.fees?comma(btx.fees):0}</td><td style="font-size:12px">${btx.confirmations}</td><td style=\"font-size: 5px\>${btx.txid}'</td></tr>`;

      }
    });

    fees = fees * -1;
    dust = fees + miner_fees;

    document.getElementById('totalin').innerHTML = comma(txin);

    document.getElementById('totalout').innerHTML = comma(txout);

    document.getElementById('totalsec').innerHTML = comma(txin+txout);

    document.getElementById('feerev').innerHTML = comma(fees);

    document.getElementById('feecos').innerHTML = comma(miner_fees);

    document.getElementById('dust').innerHTML = comma(dust);

    // history.etxs.map((etx)=>{
    //   document.getElementById('txs').innerHTML+=`<div class='col-lg-1 col-sm-12'>${etx.direction}</div><div class='col-lg-1 col-sm-12'>EUR</div><div class='col-lg-3 col-sm-12'>${etx.beneficiaryName}</div><div class='col-lg-2 col-sm-12'>${etx.amount}</div><div class='col-lg-4 col-sm-12'>${etx.details}</div><div class='col-lg-1 col-sm-12'>${etx.paymentId}</div>`;

    // });

    // history.mtxs.txs.map((mtx)=>{
    //   document.getElementById('txs').innerHTML+=`<div class='col-lg-1 col-sm-12'>${mtx.direction}</div><div class='col-lg-1 col-sm-12'>${mtx.currency}</div><div class='col-lg-3 col-sm-12'>${((mtx.depositor)?mtx.depositor.name:mtx.details)}</div><div class='col-lg-2 col-sm-12'>${mtx.amount}</div><div class='col-lg-4 col-sm-12'>${mtx.details}</div><div class='col-lg-1 col-sm-12'>${mtx.transactionCode.substring(0,6) style="font-size:12px"}${btx.confirmations}<td></td></div>`;

    // });

    // history.mtxs.trades.map((mtrade)=>{
    //   document.getElementById('txs').innerHTML+=`<div class='col-lg-1 col-sm-12'>${mtrade.side}</div><div class='col-lg-1 col-sm-12'>BTC</div><div class='col-lg-3 col-sm-12'>Globitex Exchange</div><div class='col-lg-2 col-sm-12'>${mtrade.execQuantity}</div><div class='col-lg-4 col-sm-12'>Rate: <b>${mtrade.execPrice}</b></div><div class='col-lg-1 col-sm-12'>${mtrade.tradeId style="font-size:12px"}${btx.confirmations}<td></td></div>`;

    // });

    return;

  } catch (e) {
    console.error(e);
  }
}
//-------------------------------------------------------
const fx = () => {
  try {
    getHistory(sessionStorage.token).then((history) => {
      if (history === "Validated") {
        alert("Validated");
        return;
      } else {
        populate((history));
      }
    }).catch(e => {

      console.error(e)
      alert(e);
    });

  } catch (e) {
    console.error(e);
  }
}
//-------------------------------------------------------
async function checkAuthStatus(jwt) {
  try {
    const url = server + "/auth"
    const options = {
      method: "GET",
      headers: {
        "Allow": 'application/x-www-form-urlencoded',
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "*/*",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "Accept-Encoding": "gzip, deflate",
        "Access-Control-Allow-Credentials": false,
        "Authorization": `Bearer ${jwt}`,

      },
      rejectUnauthorized: false,

    };


    fetch(url, options)
      .then(function (response) {
        console.log(response.status)

        if (response.status === 401)
          window.location.replace(`${server}`);


        else {
          response.json()
            .then(function (data) {
              console.log(data);
              return (data.message)

            }).catch(e => {
              console.error(e)
              alert(e);
            })
        }
      })
      .catch(e => {
        console.error(e);
        reject(e)
      });

  }
  catch (e) {
    console.error(e)
  }

}
checkAuthStatus(sessionStorage.token).then((done) => {
  fx();

}).catch(e => {
  console.error("Auth status failed.")
})
// //-------------------------------------------------------


function logout() {
  try {
    sessionStorage.clear();
    window.location.replace(`${server}`);
  } catch (e) {
    console.error(e);
  }
}

function comma(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


function timeConverter(timestamp) {
  var a = new Date(timestamp);
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
  return time;
}