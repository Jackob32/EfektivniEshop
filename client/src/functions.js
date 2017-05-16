// fetch wrapper
import React  from 'react'

function MyFetch(url, opt) {
    let headers = new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    });
    let method = 'GET';
    let options = {
        method: method,
        headers: headers
    };

     if(opt!=null) {
         if (opt.method != null) {
             options.method = opt.method;
         }
         if (opt.headers != null) {
             options.headers = opt.headers;
         }
         if (opt.body != null) {
             options.body = opt.body;
         }
     }
    let baseurl = '';

    return fetch(baseurl+url, options)
        .then(handleResponse, handleNetworkError);
}

function handleResponse (response) {
  //  console.log( response);
    if (response.ok && response.status==204) {
        return response;
    }else if (response.ok) {
        return response.json();
    }else if (response.status==500) {
            throw response;
    }else{
        return response.json().then(function (error) {
            throw error;
        });
    }
}

function handleNetworkError (error) {
    throw {
        msg: error.message
    };
}

export default MyFetch;

/*

Tento disk obsahuje

-Text bakalářské práce ve formátu PDF ve složce /text
-Zdrojové kódy aplikace ve složce /src/impl
-Zdrojové soubory bakalářské práce ve složce /src/thesis

Zveřejněná aplikace : https://efektivni-eshop.herokuapp.com/

    Zdrojové kódy aktuální verze aplikace : https://github.com/Jackob32/EfektivniEshop
*/