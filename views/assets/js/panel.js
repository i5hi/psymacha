const server = 'https://test.satswala.com/admin';

//-------------------------------------------------------

const getOverview = (token) => {
    return new Promise((resolve, reject) => {
      try {
        const url = server + "/overview"
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
        //console.log(options)
  
        fetch(url, options)
          .then(function (response) {
            console.log(response.status)
            if (response.status !== 200) {
              console.log(response.body);
              if (response.status === 401) {
                window.location.replace(`${server}/`);
              }
            } else if (response.status === 200) {
              response.json()
                .then(function (data) {
                  if (data.status) {
                    resolve((data.message));
                  } else {
                    console.error(data.message)
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
  const populateOverview = (overview) => {
    try {
      console.log(
        overview
      );
      sessionStorage.uids = JSON.stringify(overview.uids);
      sessionStorage.overview = overview

      document.getElementById('totalusers').innerHTML = overview.total_users;
      document.getElementById('txcount24h').innerHTML = overview.user_tx_count_24h;
      document.getElementById('txcount').innerHTML = overview.user_tx_count;
      document.getElementById('urectot').innerHTML = comma(overview.user_total_rec);
      document.getElementById('usentot').innerHTML = comma(overview.user_total_send);
      document.getElementById('usecd').innerHTML = comma(overview.user_total_rec - overview.user_total_send);

      document.getElementById('urecmax').innerHTML = comma(overview.user_max_rec);
      document.getElementById('usenmax').innerHTML = comma(overview.user_max_send);

      document.getElementById('liquidsats').innerHTML = comma(overview.liquid_sats);
  
      document.getElementById('coldsats').innerHTML = comma(overview.cold_sats);
     
      return;
  
    } catch (e) {
      console.error(e);
    }
  }
  //-------------------------------------------------------
  const fx = () => {
    try {
      getOverview(sessionStorage.token).then((overview) => {
        if (overview === "Validated") {
          alert("Validated");
          return;
        } else {
          populateOverview((overview));
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
    console.log({ auth: true });
    fx();
}).catch(e => {
    console.error("Auth status failed. Logging out.")
    logout();
})

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