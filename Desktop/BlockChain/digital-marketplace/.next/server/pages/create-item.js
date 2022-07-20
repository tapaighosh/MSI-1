"use strict";
(() => {
var exports = {};
exports.id = 779;
exports.ids = [779];
exports.modules = {

/***/ 644:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ CreateItem),
  "getStaticProps": () => (/* binding */ getStaticProps)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(689);
// EXTERNAL MODULE: external "ethers"
var external_ethers_ = __webpack_require__(982);
;// CONCATENATED MODULE: external "ipfs-http-client"
const external_ipfs_http_client_namespaceObject = require("ipfs-http-client");
;// CONCATENATED MODULE: external "next/router"
const router_namespaceObject = require("next/router");
// EXTERNAL MODULE: external "web3modal"
var external_web3modal_ = __webpack_require__(840);
var external_web3modal_default = /*#__PURE__*/__webpack_require__.n(external_web3modal_);
// EXTERNAL MODULE: ./config.js
var config = __webpack_require__(838);
// EXTERNAL MODULE: ./artifacts/contracts/NFT.sol/NFT.json
var NFT = __webpack_require__(615);
// EXTERNAL MODULE: ./artifacts/contracts/NFTMarket.sol/NFTMarket.json
var NFTMarket = __webpack_require__(693);
;// CONCATENATED MODULE: ./pages/create-item.js

/* pages/create-item.js */ 







const client = (0,external_ipfs_http_client_namespaceObject.create)('https://ipfs.infura.io:5001/api/v0');
function CreateItem() {
    const { 0: fileUrl , 1: setFileUrl  } = (0,external_react_.useState)(null);
    const { 0: formInput , 1: updateFormInput  } = (0,external_react_.useState)({
        price: '',
        name: '',
        description: ''
    });
    const router = (0,router_namespaceObject.useRouter)();
    async function onChange(e) {
        const file = e.target.files[0];
        try {
            const added = await client.add(file, {
                progress: (prog)=>console.log(`received: ${prog}`)
            });
            const url = `https://ipfs.infura.io/ipfs/${added.path}`;
            setFileUrl(url);
        } catch (error) {
            console.log('Error uploading file: ', error);
        }
    }
    async function createMarket() {
        const { name , description , price  } = formInput;
        if (!name || !description || !price || !fileUrl) return;
        /* first, upload to IPFS */ const data = JSON.stringify({
            name,
            description,
            image: fileUrl
        });
        try {
            const added = await client.add(data);
            const url = `https://ipfs.infura.io/ipfs/${added.path}`;
            /* after file is uploaded to IPFS, pass the URL to save it on Polygon */ createSale(url);
        } catch (error) {
            console.log('Error uploading file: ', error);
        }
    }
    async function createSale(url) {
        const web3Modal = new (external_web3modal_default())();
        const connection = await web3Modal.connect();
        const provider = new external_ethers_.ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        /* next, create the item */ let contract = new external_ethers_.ethers.Contract(config/* nftaddress */.k, NFT/* abi */.Mt, signer);
        let transaction = await contract.createToken(url);
        let tx = await transaction.wait();
        console.log("trans  :  ", tx);
        let event = tx.events[0];
        console.log("event ", event);
        let value = event.args[2];
        let tokenId = value.toNumber();
        const price = external_ethers_.ethers.utils.parseUnits(formInput.price, 'ether');
        /* then list the item for sale on the marketplace */ contract = new external_ethers_.ethers.Contract(config/* nftmarketaddress */.A, NFTMarket/* abi */.Mt, signer);
        let listingPrice = await contract.getListingPrice();
        listingPrice = listingPrice.toString();
        transaction = await contract.createMarketItem(config/* nftaddress */.k, tokenId, price, {
            value: listingPrice
        });
        await transaction.wait();
        router.push('/');
    }
    return(/*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "flex justify-center",
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: "w-1/2 flex flex-col pb-12",
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx("input", {
                    placeholder: "Asset Name",
                    className: "mt-8 border rounded p-4",
                    onChange: (e)=>updateFormInput({
                            ...formInput,
                            name: e.target.value
                        })
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("textarea", {
                    placeholder: "Asset Description",
                    className: "mt-2 border rounded p-4",
                    onChange: (e)=>updateFormInput({
                            ...formInput,
                            description: e.target.value
                        })
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("input", {
                    placeholder: "Asset Price in Eth",
                    className: "mt-2 border rounded p-4",
                    onChange: (e)=>updateFormInput({
                            ...formInput,
                            price: e.target.value
                        })
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("input", {
                    type: "file",
                    name: "Asset",
                    className: "my-4",
                    onChange: onChange
                }),
                fileUrl && /*#__PURE__*/ jsx_runtime_.jsx("img", {
                    className: "rounded mt-4",
                    width: "350",
                    src: fileUrl
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("button", {
                    onClick: createMarket,
                    className: "font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg",
                    children: "Create Digital Asset"
                })
            ]
        })
    }));
};
async function getStaticProps(context) {
    console.log(context);
    // const res = await fetch('https://api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=50')
    // const data = await res.json()
    // console.log(data.assets)
    return {
        props: {
        }
    };
}


/***/ }),

/***/ 982:
/***/ ((module) => {

module.exports = require("ethers");

/***/ }),

/***/ 689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 840:
/***/ ((module) => {

module.exports = require("web3modal");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [828], () => (__webpack_exec__(644)));
module.exports = __webpack_exports__;

})();