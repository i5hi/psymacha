const server = 'https://test.satswala.com/admin';
sessionStorage.overview = {};
//-------------------------------------------------------
function authenticate () {
    try {
      sessionStorage.admin= document.getElementById('admin').value;

      const url = server + "/auth"
      const options = {
        method: "POST",
        headers: {
          "x-sats-totp": document.getElementById('totp').value,
          "x-sats-admin": document.getElementById('admin').value
        },
        returnUnauthorized: false,
        body: new URLSearchParams({
          secret:document.getElementById('pass').value,
        })
      };
      console.log({headers:options.headers})

      fetch(url, options)
        .then(function (response) {
          console.log(response.status)
          if (response.status !== 200) {
            console.log(response.body);
            if (response.status === 403) alert("Mal 2FA")
            if (response.status === 401) alert("Mal Secret")
            return false;
          } else {
            response.json()
              .then(function (data) {
                if (data.status) {
                  sessionStorage.token = data.message;
                  window.location.replace(`${server}/panel`);
                  return(true);
                } else {
                  console.log("no data.");
                  return('no data from api');
                }
              })
              .catch(e => {
                console.error(e);
                return(e)
              });
          }
        })
        .catch(e => {
          console.error(e);
          return(e)

        })
    } catch (e) {
      console.error(new Error(e))
      return(e)
    };
}


//-------------------------------------------------------
