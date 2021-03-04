const server = 'https://test.satswala.com/admin';
const profile_ep = server + '/users/';
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


function logout() {
    try {
        sessionStorage.clear();
        window.location.replace(`${server}`);
    } catch (e) {
        console.error(e);
    }
}


checkAuthStatus(sessionStorage.token).then((done) => {
    console.log({ auth: true });
}).catch(e => {
    console.error("Auth status failed. Logging out.")
    logout();
})
//-------------------------------------------------------

//-------------------------------------------------------
const uids = JSON.parse(sessionStorage.uids);
const emails = Object.keys(uids);
//-------------------------------------------------------

//-------------------------------------------------------
const getUser = (token, email) => {
    return new Promise((resolve, reject) => {
        try {
            const url = (email.startsWith('s5id') ? profile_ep + email : profile_ep + uids[email])
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
                    }
                    if (response.status === 401) {
                        window.location.replace(`${profile_ep}/auth`);
                    } else {
                        response.json()
                            .then(function (data) {
                                if (data.status) {
                                    resolve(data.message);
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
const deleteTOTP = (token, email) => {
    return new Promise((resolve, reject) => {
        try {
            const url = profile_ep + uids[email] + "/totp"
            const options = {
                method: "DELETE",
                headers: {
                    "Allow": 'application/x-www-form-urlencoded',
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Accept": "*/*",
                    "Cache-Control": "no-cache",
                    "Connection": "keep-alive",
                    "Accept-Encoding": "gzip, deflate",
                    "Access-Control-Allow-Credentials": false,
                    "Authorization": `Bearer ${token}`,
                    "x-sats-totp": document.getElementById('search-deltfa-field').value,
                    "x-sats-admin": sessionStorage.admin
                },
                rejectUnauthorized: false,

            };
            //console.log(options)

            fetch(url, options)
                .then(function (response) {
                    console.log(response.status)
                    if (response.status !== 200) {
                        console.log(response.body);
                    }
                    if (response.status === 401) {
                        window.location.replace(base_url);
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
const unlockAccount = (token, email) => {
    return new Promise((resolve, reject) => {
        try {
            const url = profile_ep + uids[email] + "/pin"
            const options = {
                method: "DELETE",
                headers: {
                    "Allow": 'application/x-www-form-urlencoded',
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Accept": "*/*",
                    "Cache-Control": "no-cache",
                    "Connection": "keep-alive",
                    "Accept-Encoding": "gzip, deflate",
                    "Access-Control-Allow-Credentials": false,
                    "Authorization": `Bearer ${token}`,
                    "x-sats-totp": document.getElementById('search-unlock-field').value,
                    "x-sats-admin": sessionStorage.admin

                },
                rejectUnauthorized: false,

            };
            //console.log(options)

            fetch(url, options)
                .then(function (response) {
                    console.log(response.status)
                    if (response.status !== 200) {
                        console.log(response.body);
                    }
                    if (response.status === 401) {
                        window.location.replace(base_url);
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
const populate = (user) => {
    try {
        // console.log({
        //     user
        // });
        document.getElementById('tableUserTxData').innerHTML = "";
        let c_balance = 0;
        let uconf = 0;
        document.getElementById('email').innerHTML = user.profile.email;
        document.getElementById('uid').innerHTML = uids[user.profile.email];
        (user.profile.tfa) ? document.getElementById('tfa').innerHTML = "2FA Enabled" : document.getElementById('tfa').innerHTML = "2FA Unset";
        (user.profile.avatar) ? document.getElementById('avatar').innerHTML = "Avatar Selected" : document.getElementById('avatar').innerHTML = "Avatar Unset";
        (user.profile.locked) ? document.getElementById('locked').innerHTML = "Account Locked" : document.getElementById('locked').innerHTML = "Account Active";
        document.getElementById('genesis').innerHTML = timeConverter(user.profile.genesis);


        const bitcoin_history = user.wallet.bitcoin.history.map((element) => {
            c_balance = (element.confirmed) ? (c_balance + element.amount + ((element.fees) ? element.fees : 0)) : c_balance;
            element.c_balance = c_balance;
            uconf = (!element.confirmed) ? uconf + element.amount : uconf;
            return element;
        });

        bitcoin_history.sort(dynamicSort("-genesis"));
        bitcoin_history.map((element) => {

            if (element.type === "out" && element.confirmed === true)
                document.getElementById('tableUserTxData').innerHTML += `<tr><td style=\"font-size:9px\">${timeConverter(element.genesis)}</td><td>sats</td><td style=\"font-size: 21px; color: #AF125A\">${comma(element.amount)}</td><td>${element.fees ? comma(element.fees) : 0}</td><td>${comma(element.c_balance)}</td><td><a href='https://blockstream.info/tx/${element.txid}' target='_blank'>blockstream</td></tr>`;
            if (element.type === "out" && element.confirmed === false)
                document.getElementById('tableUserTxData').innerHTML += `<tr><td style=\"font-size:9px\">${timeConverter(element.genesis)}</td><td>sats</td><td style=\"font-size: 21px;color:#DDB967\">${comma(element.amount)}</td><td>${element.fees ? comma(element.fees) : 0}</td><td>${comma(element.c_balance)}</td><td><a href='https://blockstream.info/tx/${element.txid}' target='_blank'>blockstream</td></tr>`;

            else if (element.type === "in" && element.confirmed === true)
                document.getElementById('tableUserTxData').innerHTML += `<tr><td style=\"font-size:9px\">${timeConverter(element.genesis)}</td><td>sats</td><td style=\"font-size: 21px; color: #30B0AA\">${comma(element.amount)}</td><td>${element.fees ? comma(element.fees) : 0}</td><td>${comma(element.c_balance)}</td><td><a href='https://blockstream.info/tx/${element.txid}' target='_blank'>blockstream</td></tr>`;
            else if (element.type === "in" && element.confirmed === false)
                document.getElementById('tableUserTxData').innerHTML += `<tr><td style=\"font-size:9px\">${timeConverter(element.genesis)}</td><td>sats</td><td style=\"font-size: 21px;color:#DDB967\">${comma(element.amount)}</td><td>${element.fees ? comma(element.fees) : 0}</td><td>${comma(element.c_balance)}</td><td><a href='https://blockstream.info/tx/${element.txid}' target='_blank'>blockstream</td></tr>`;

            else if (element.type === "x")
                document.getElementById('tableUserTxData').innerHTML += `<tr><td style=\"font-size:9px\">${timeConverter(element.genesis)}</td><td>sats</td><td style=\"font-size: 21px; color: #1F5673\">${comma(element.amount)}</td><td>${element.fees ? comma(element.fees) : 0}</td><td>${comma(element.c_balance)}</td><td style=\"font-size:9px\>${element.txid}</td></tr>`;

        });

        document.getElementById('satsbal').innerHTML = `${comma(user.wallet.bitcoin.balance)} sats`;
        document.getElementById('uconf').innerHTML = `${comma(uconf)} sats`;


        // if (user.sessions) {
        //     user.sessions.actions.map((element) => {
        //         const local_time = `${new Date(element.timestamp).toLocaleDateString("nl-NL")}_${new Date(element.timestamp).toLocaleTimeString("nl-NL")}`

        //         document.getElementById('session_row').innerHTML += `<br><div class='col-sm-12 col-md-6 col-lg-6'><div class="row"><input value="${local_time}" readonly></div><div class="row"><input value="${element.service}" readonly></div><div class="row"><input value="${element.reference || element.ip}" readonly></div><div class="row"><br></div></div>`
        //     });
        // }

        return;
    } catch (e) {
        console.error(e);
    }
}

//-------------------------------------------------------
//-------------------------------------------------------
// console.log(JSON.stringify(sessionStorage.overview, null, 2));
const gogu = () => {
    try {
        console.log(9)
        const email = document.getElementById('search-user').value;
        if (emails.includes(email)) {
            getUser(sessionStorage.token, email).then((user) => {
                populate(user);
            }).catch(e => {
                console.error(e)
                alert(e);
            })
        } else {
            alert("User does not exist");
        }
    } catch (e) {
        console.error(e)
    }
}

//-------------------------------------------------------
const godeltfa = () => {
    try {
        console.log(9)
        const email = document.getElementById('search-user').value
        deleteTOTP(sessionStorage.token, email).then((user) => {
            console.log(1)
            console.log(user)
            gogu();
        }).catch(e => {
            console.error(e)
            alert(e);
        })
    } catch (e) {
        console.error(e)
    }
}

//-------------------------------------------------------
const gounlock = () => {
    try {
        console.log(8)
        const email = document.getElementById('search-user').value
        unlockAccount(sessionStorage.token, email).then((user) => {
            console.log(1)
            console.log(user)
            gogu();
        }).catch(e => {
            console.error(e)
            alert(e);
        })
    } catch (e) {
        console.error(e)
    }
}

function comma(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp);
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

function dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a, b) {
        /* next line works with strings and numbers, 
         * and you may want to customize it to your needs
         */
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}




// $('search-user').mdbAutocomplete({
//     data: emails
// });