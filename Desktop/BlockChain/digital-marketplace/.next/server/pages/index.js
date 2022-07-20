"use strict";
(() => {
var exports = {};
exports.id = 405;
exports.ids = [405];
exports.modules = {

/***/ 678:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getStaticProps": () => (/* binding */ getStaticProps),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(982);
/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ethers__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(167);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var web3modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(840);
/* harmony import */ var web3modal__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(web3modal__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(838);
/* harmony import */ var _artifacts_contracts_NFT_sol_NFT_json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(615);
/* harmony import */ var _artifacts_contracts_NFTMarket_sol_NFTMarket_json__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(693);








const Home = ({ nftData  })=>{
    const { 0: nfts , 1: setNfts  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)([]);
    const { 0: loadingState , 1: setLoadingState  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)('not-loaded');
    // console.log(nftData)
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        loadNFTs();
    }, []);
    async function loadNFTs() {
        /* create a generic provider and query for unsold market items */ const provider = new ethers__WEBPACK_IMPORTED_MODULE_1__.ethers.providers.JsonRpcProvider();
        const tokenContract = new ethers__WEBPACK_IMPORTED_MODULE_1__.ethers.Contract(_config__WEBPACK_IMPORTED_MODULE_7__/* .nftaddress */ .k, _artifacts_contracts_NFT_sol_NFT_json__WEBPACK_IMPORTED_MODULE_5__/* .abi */ .Mt, provider);
        const marketContract = new ethers__WEBPACK_IMPORTED_MODULE_1__.ethers.Contract(_config__WEBPACK_IMPORTED_MODULE_7__/* .nftmarketaddress */ .A, _artifacts_contracts_NFTMarket_sol_NFTMarket_json__WEBPACK_IMPORTED_MODULE_6__/* .abi */ .Mt, provider);
        const data = await marketContract.fetchMarketItems();
        /*
    *  map over items returned from smart contract and format 
    *  them as well as fetch their token metadata
    */ const items = await Promise.all(data.map(async (i)=>{
            const tokenUri = await tokenContract.tokenURI(i.tokenId);
            const meta = await axios__WEBPACK_IMPORTED_MODULE_3___default().get(tokenUri);
            let price = ethers__WEBPACK_IMPORTED_MODULE_1__.ethers.utils.formatUnits(i.price.toString(), 'ether');
            let item = {
                price,
                tokenId: i.tokenId.toNumber(),
                seller: i.seller,
                owner: i.owner,
                image: meta.data.image,
                name: meta.data.name,
                description: meta.data.description
            };
            return item;
        }));
        setNfts(items);
        setLoadingState('loaded');
    }
    async function buyNft(nft) {
        /* needs the user to sign the transaction, so will use Web3Provider and sign it */ const web3Modal = new (web3modal__WEBPACK_IMPORTED_MODULE_4___default())();
        const connection = await web3Modal.connect();
        const provider = new ethers__WEBPACK_IMPORTED_MODULE_1__.ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = new ethers__WEBPACK_IMPORTED_MODULE_1__.ethers.Contract(_config__WEBPACK_IMPORTED_MODULE_7__/* .nftmarketaddress */ .A, _artifacts_contracts_NFTMarket_sol_NFTMarket_json__WEBPACK_IMPORTED_MODULE_6__/* .abi */ .Mt, signer);
        /* user will be prompted to pay the asking proces to complete the transaction */ const price = ethers__WEBPACK_IMPORTED_MODULE_1__.ethers.utils.parseUnits(nft.price.toString(), 'ether');
        const transaction = await contract.createMarketSale(_config__WEBPACK_IMPORTED_MODULE_7__/* .nftaddress */ .k, nft.tokenId, {
            value: price
        });
        await transaction.wait();
        loadNFTs();
    }
    // if (loadingState === 'loaded' && !nfts.length) return (<h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>)
    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: "flex justify-center",
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            className: "px-4",
            style: {
                maxWidth: '1600px'
            },
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4",
                children: nfts.map((nft, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "border shadow rounded-xl overflow-hidden",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                src: nft.image_url
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "p-4",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                        style: {
                                            height: '64px'
                                        },
                                        className: "text-2xl font-semibold",
                                        children: nft.name
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        style: {
                                            height: '70px',
                                            overflow: 'hidden'
                                        },
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                            className: "text-gray-400",
                                            children: nft.description
                                        })
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "p-4 bg-black",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                        className: "text-2xl mb-4 font-bold text-white",
                                        children: [
                                            nft.price,
                                            " ETH"
                                        ]
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                        className: "w-full bg-pink-500 text-white font-bold py-2 px-12 rounded",
                                        onClick: ()=>buyNft(nft)
                                        ,
                                        children: "Buy"
                                    })
                                ]
                            })
                        ]
                    }, i)
                )
            })
        })
    }));
};
async function getStaticProps(context) {
    // const option={methode:'GET'}
    // console.log(context)
    // const res = await fetch('https://api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=50',option)
    // const data = await res.json()
    // console.log(data.assets)
    return {
        props: {
            nftData: ""
        }
    };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Home);


/***/ }),

/***/ 167:
/***/ ((module) => {

module.exports = require("axios");

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
var __webpack_exports__ = __webpack_require__.X(0, [828], () => (__webpack_exec__(678)));
module.exports = __webpack_exports__;

})();